const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Test route
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ message: "Backend connected!", time: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection failed");
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});

app.get("/courses", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        c.course_id,
        c.course_code,
        c.course_name,
        c.credits,
        c.faculty_name,
        c.department,
        c.semester,
        c.total_seats,
        (c.total_seats - COUNT(e.course_id))::int AS seats_available
      FROM courses c
      LEFT JOIN enrollments e ON c.course_id = e.course_id
      GROUP BY c.course_id
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching courses");
  }
});

app.post("/enroll", async (req, res) => {
  const { student_id, course_id } = req.body;

  try {
    await pool.query(
      "INSERT INTO enrollments (student_id, course_id) VALUES ($1, $2)",
      [student_id, course_id]
    );

    res.json({ message: "Enrollment successful" });

  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).json({ error: "Already enrolled" });
    }

    console.error(err);
    res.status(500).json({ error: "Enrollment failed" });
  }
});

app.delete("/enroll", async (req, res) => {
  const { student_id, course_id } = req.body;

  try {
    const result = await pool.query(
      "DELETE FROM enrollments WHERE student_id = $1 AND course_id = $2",
      [student_id, course_id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Enrollment not found" });
    }

    res.json({ message: "Course dropped successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to drop course" });
  }
});

app.get("/my-courses/:studentId", async (req, res) => {
  const { studentId } = req.params;

  try {
    const result = await pool.query(`
      SELECT 
        c.course_id,
        c.course_code,
        c.course_name,
        c.credits,
        c.faculty_name
      FROM courses c
      JOIN enrollments e ON c.course_id = e.course_id
      WHERE e.student_id = $1
    `, [studentId]);

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch enrolled courses" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check students first
    const studentResult = await pool.query(
      "SELECT student_id, full_name FROM students WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (studentResult.rows.length > 0) {
      return res.json({
        role: "student",
        user_id: studentResult.rows[0].student_id,
        full_name: studentResult.rows[0].full_name
      });
    }

    // Check admins
    const adminResult = await pool.query(
      "SELECT admin_id, full_name FROM admins WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (adminResult.rows.length > 0) {
      return res.json({
        role: "admin",
        user_id: adminResult.rows[0].admin_id,
        full_name: adminResult.rows[0].full_name
      });
    }

    return res.status(401).json({ error: "Invalid credentials" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});

app.post("/admin/courses", async (req, res) => {
  const {
    code,
    name,
    credits,
    faculty,
    department,
    semester,
    totalSeats
  } = req.body;

  try {
    await pool.query(
      'INSERT INTO courses 
        (course_code, course_name, credits, faculty_name, department, semester, total_seats)
        VALUES ($1,$2,$3,$4,$5,$6,$7)',
      [code, name, credits, faculty, department, semester, totalSeats]
    );

    res.json({ message: "Course added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add course" });
  }
});

app.delete("/admin/courses/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(
      "DELETE FROM courses WHERE course_id = $1",
      [id]
    );

    res.json({ message: "Course deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete failed" });
  }
});

app.get("/admin/students", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        s.student_id,
        s.full_name,
        s.email,
        s.enrollment_no,
        s.department,
        s.semester,
        COUNT(e.course_id) AS registered_courses,
        COALESCE(SUM(c.credits), 0) AS total_credits
      FROM students s
      LEFT JOIN enrollments e ON s.student_id = e.student_id
      LEFT JOIN courses c ON e.course_id = c.course_id
      GROUP BY s.student_id
      ORDER BY s.student_id
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("ACTUAL ERROR:", err);
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

app.get("/admin/students/:id/courses", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(`
      SELECT c.course_code, c.course_name, c.credits
      FROM enrollments e
      JOIN courses c ON e.course_id = c.course_id
      WHERE e.student_id = $1
    `, [id]);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch student courses" });
  }
});

app.get("/admin/dashboard-stats", async (req, res) => {
  try {
    const students = await pool.query("SELECT COUNT(*) FROM students");
    const courses = await pool.query("SELECT COUNT(*) FROM courses");
    const enrollments = await pool.query("SELECT COUNT(*) FROM enrollments");

    const utilization = await pool.query(`
  SELECT 
    COALESCE(
      ROUND(
        SUM(COALESCE(e.enrolled_count, 0))::numeric /
        NULLIF(SUM(c.total_seats), 0) * 100,
      2),
    0) AS percentage
  FROM courses c
  LEFT JOIN (
    SELECT course_id, COUNT(*) AS enrolled_count
    FROM enrollments
    GROUP BY course_id
  ) e ON c.course_id = e.course_id
`);

    res.json({
    total_students: Number(students.rows[0].count),
    total_courses: Number(courses.rows[0].count),
    total_enrollments: Number(enrollments.rows[0].count),
    utilization_percentage: Number(utilization.rows[0].percentage)
  });

  } catch (err) {
    console.error("DASHBOARD ERROR:", err);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
});
