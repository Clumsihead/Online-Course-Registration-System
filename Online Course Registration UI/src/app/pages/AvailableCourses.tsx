import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Button } from '../components/Button';
import { Search, Filter } from 'lucide-react';
import { useNavigate } from "react-router";

interface Course {
  course_id: number;
  course_code: string;
  course_name: string;
  credits: number;
  faculty_name: string;
  department: string;
  semester: number;
  total_seats: number;
  seats_available: number;
}

export default function AvailableCourses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [semesterFilter, setSemesterFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
  const userId = localStorage.getItem("user_id");
  const role = localStorage.getItem("role");

  if (!userId || role !== "student") {
    navigate("/login");
  }
}, []);
  
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
  fetch("http://localhost:5000/courses")
    .then(res => res.json())
    .then(data => setCourses(data))
    .catch(err => console.error("Error fetching courses:", err));
}, []);
  
  
  const filteredCourses: Course[] = courses.filter((course) => {
  const matchesSearch =
    course.course_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.course_code.toLowerCase().includes(searchQuery.toLowerCase());

  const matchesDepartment =
    departmentFilter === 'all' || course.department === departmentFilter;

  const matchesSemester =
    semesterFilter === 'all' ||
    course.semester.toString() === semesterFilter;

  return matchesSearch && matchesDepartment && matchesSemester;
});
  
  const handleRegister = async (courseId: number) => {
  console.log("Sending enrollment request...");

  try {
    const response = await fetch("http://localhost:5000/enroll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
      student_id: 2,
      course_id: courseId
    })
    });

    console.log("Response status:", response.status);

    const data = await response.json();
    console.log("Response data:", data);

    const updated = await fetch("http://localhost:5000/courses");
    const updatedData = await updated.json();
    console.log("Updated courses:", updatedData);

    setCourses(updatedData);

  } catch (error) {
    console.error("Enrollment failed:", error);
  }
};
  
  return (
    <DashboardLayout userName="John Smith" userRole="student">
      <div className="space-y-6">
        {/* Search and Filters */}
        <Card>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative md:col-span-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <option value="all">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="English">English</option>
              </Select>
              
              <Select
                value={semesterFilter}
                onChange={(e) => setSemesterFilter(e.target.value)}
              >
                <option value="all">All Semesters</option>
                <option value="1">Semester 1</option>
                <option value="2">Semester 2</option>
                <option value="3">Semester 3</option>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        {/* Course Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.course_id}>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-1 text-xs rounded bg-primary/10 text-primary">
                          {course.course_code}
                        </span>
                        <span className="px-2 py-1 text-xs rounded bg-accent text-accent-foreground">
                          {course.credits} Credits
                        </span>
                      </div>
                      <h3 className="mb-2">{course.course_name}</h3>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Faculty:</span>
                      <span>{course.faculty_name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Department:</span>
                      <span>{course.department}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Seats Available:</span>
                      <span className={course.seats_available < 10 ? 'text-destructive' : 'text-green-600'}>
                        {course.seats_available} / {course.total_seats}
                      </span>
                    </div>
                  </div>
                  
                  <Button
                    className="w-full cursor-pointer"
                    onClick={() => handleRegister(course.course_id)}
                  >
                    Register
                  </Button>
                </div>
              </CardContent> 
            </Card>
          ))}
        </div>
        
        {filteredCourses.length === 0 && (
          <Card>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">No courses found matching your criteria</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
