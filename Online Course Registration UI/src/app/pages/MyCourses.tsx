import React from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Trash2 } from 'lucide-react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

interface RegisteredCourse {
  course_id: number;
  course_code: string;
  course_name: string;
  credits: number;
  faculty_name: string;
}

export default function MyCourses() {
  const [registeredCourses, setRegisteredCourses] = useState<RegisteredCourse[]>([]);

  const studentId = 2; // temporary hardcoded

  const navigate = useNavigate();

  useEffect(() => {
  const userId = localStorage.getItem("user_id");
  const role = localStorage.getItem("role");

  if (!userId || role !== "student") {
    navigate("/login");
  }
}, []);

const fetchMyCourses = async () => {
  const response = await fetch(`http://https://online-course-registration-system.onrender.com/my-courses/${studentId}`);
  const data = await response.json();
  setRegisteredCourses(data);
};

useEffect(() => {
  fetchMyCourses();
}, []);
  
  const totalCredits = registeredCourses.reduce((sum, course) => sum + course.credits, 0);
  
  const handleDrop = async (courseId: number) => {
  if (!confirm("Are you sure you want to drop this course?")) return;

  try {
    await fetch("http://https://online-course-registration-system.onrender.com/enroll", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        student_id: studentId,
        course_id: courseId
      })
    });

    fetchMyCourses();

  } catch (error) {
    console.error("Drop failed:", error);
  }
};
  
  return (
    <DashboardLayout userName="John Smith" userRole="student">
      <div className="space-y-6">
        {/* Summary Card */}
        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Registered Credits</p>
                <h2 className="text-3xl text-primary">{totalCredits}</h2>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground mb-1">Total Courses</p>
                <h2 className="text-3xl">{registeredCourses.length}</h2>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Courses Table */}
        <Card>
          <CardHeader>
            <CardTitle>Registered Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm text-muted-foreground">Course Code</th>
                    <th className="text-left py-3 px-4 text-sm text-muted-foreground">Course Name</th>
                    <th className="text-left py-3 px-4 text-sm text-muted-foreground">Credits</th>
                    <th className="text-left py-3 px-4 text-sm text-muted-foreground">Faculty</th>
                    <th className="text-left py-3 px-4 text-sm text-muted-foreground">Schedule</th>
                    <th className="text-left py-3 px-4 text-sm text-muted-foreground">Room</th>
                    <th className="text-left py-3 px-4 text-sm text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {registeredCourses.map((course) => (
                    <tr key={course.course_id} className="border-b border-border last:border-0">
                      <td className="py-4 px-4">
                        <span className="px-2 py-1 text-xs rounded bg-primary/10 text-primary">
                          {course.course_code}
                        </span>
                      </td>
                      <td className="py-4 px-4">{course.course_name}</td>
                      <td className="py-4 px-4">{course.credits}</td>
                      <td className="py-4 px-4 text-sm">{course.faculty_name}</td>
                      <td className="py-4 px-4">
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDrop(course.course_id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Drop
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
