import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Search, Eye, Mail } from 'lucide-react';

interface Student {
  student_id: number;
  full_name: string;
  email: string;
  enrollment_number: string;
  department: string;
  year: string;
  cgpa: number;
  registered_courses: number;
  total_credits: number;
  semester: number;

  courses?: {
    course_code: string;
    course_name: string;
    credits: number;
  }[];
}

export default function ManageStudents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const [students, setStudents] = useState<Student[]>([]);
  useEffect(() => {
  fetch("http://https://online-course-registration-system.onrender.com/admin/students")
    .then(res => res.json())
    .then(data => {
      console.log("STUDENTS DATA:", data);
      setStudents(data);
    })
    .catch(err => console.error("Error fetching students:", err));
}, []);

    const handleViewStudent = async (student: Student) => {
    const res = await fetch(`http://https://online-course-registration-system.onrender.com/admin/students/${student.student_id}/courses`);
    const courses = await res.json();

    setSelectedStudent({
      ...student,
      courses
    });
  };
  
  const filteredStudents = students.filter(student =>
    student.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.enrollment_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <DashboardLayout userName="Admin User" userRole="admin">
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {/* Students Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Students ({filteredStudents.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm text-muted-foreground">Enrollment No.</th>
                    <th className="text-left py-3 px-4 text-sm text-muted-foreground">Name</th>
                    <th className="text-left py-3 px-4 text-sm text-muted-foreground">Email</th>
                    <th className="text-left py-3 px-4 text-sm text-muted-foreground">Department</th>
                    <th className="text-left py-3 px-4 text-sm text-muted-foreground">Year</th>
                    <th className="text-left py-3 px-4 text-sm text-muted-foreground">Courses</th>
                    <th className="text-left py-3 px-4 text-sm text-muted-foreground">Credits</th>
                    <th className="text-left py-3 px-4 text-sm text-muted-foreground">CGPA</th>
                    <th className="text-left py-3 px-4 text-sm text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.student_id} className="border-b border-border last:border-0">
                      <td className="py-4 px-4">
                        <span className="px-2 py-1 text-xs rounded bg-primary/10 text-primary">
                          {student.enrollment_number}
                        </span>
                      </td>
                      <td className="py-4 px-4">{student.full_name}</td>
                      <td className="py-4 px-4 text-sm">{student.email}</td>
                      <td className="py-4 px-4 text-sm">{student.department}</td>
                      <td className="py-4 px-4 text-sm">{student.semester}</td>
                      <td className="py-4 px-4 text-center">{student.registered_courses}</td>
                      <td className="py-4 px-4 text-center">{student.total_credits}</td>
                      <td className="py-4 px-4 text-center">{student.cgpa}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewStudent(student)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Mail className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        {/* Student Detail Modal */}
        {selectedStudent && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-8 z-50">
            <Card className="max-w-2xl w-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Student Details</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedStudent(null)}>
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Name</p>
                      <p>{selectedStudent.full_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Enrollment Number</p>
                      <p>{selectedStudent.enrollment_number}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <p>{selectedStudent.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Department</p>
                      <p>{selectedStudent.department}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Year</p>
                      <p>{selectedStudent.year}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">CGPA</p>
                      <p>{selectedStudent.cgpa}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="mb-3">Registered Courses</h4>

                    {selectedStudent?.courses && selectedStudent.courses.length > 0 ? (
                      selectedStudent.courses.map((course, index) => (
                        <div key={index} className="p-3 bg-accent rounded-lg mb-2">
                          <p className="text-sm">
                            {course.course_code} - {course.course_name} ({course.credits} credits)
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No registered courses
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
