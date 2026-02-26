import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Button } from '../components/Button';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';

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

export default function ManageCourses() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    credits: '',
    faculty: '',
    department: '',
    semester: 'Spring 2026',
    totalSeats: ''
  });
  
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    fetch("http://https://online-course-registration-system.onrender.com/courses")
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error("Error fetching courses:", err));
  }, []);
  
  const filteredCourses = courses.filter(course =>
    course.course_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.course_code.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch("http://https://online-course-registration-system.onrender.com/admin/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      alert("Failed to add course");
      return;
    }

    const newCourse = await fetch("http://https://online-course-registration-system.onrender.com/courses")
      .then(res => res.json());

    setCourses(newCourse);

    setShowAddForm(false);
    alert("Course added successfully!");

  } catch (err) {
    console.error(err);
  }
};
  
  const handleDelete = async (courseId: number) => {
  if (!confirm("Are you sure?")) return;

  await fetch(`http://https://online-course-registration-system.onrender.com/admin/courses/${courseId}`, {
    method: "DELETE"
  });

  setCourses(courses.filter(c => c.course_id !== courseId));
};
  
  return (
    <DashboardLayout userName="Admin User" userRole="admin">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="w-4 h-4 mr-2" />
            Add New Course
          </Button>
        </div>
        
        {/* Add Course Form */}
        {showAddForm && (
          <Card>
            <CardHeader>
              <CardTitle>Add New Course</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Course Code"
                    placeholder="e.g., CS401"
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                    required
                  />
                  <Input
                    label="Course Name"
                    placeholder="e.g., Advanced Algorithms"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Credits"
                    type="number"
                    placeholder="e.g., 3"
                    value={formData.credits}
                    onChange={(e) => setFormData({...formData, credits: e.target.value})}
                    required
                  />
                  <Input
                    label="Total Seats"
                    type="number"
                    placeholder="e.g., 40"
                    value={formData.totalSeats}
                    onChange={(e) => setFormData({...formData, totalSeats: e.target.value})}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Department"
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="English">English</option>
                    <option value="Engineering">Engineering</option>
                  </Select>
                  
                  <Select
                    label="Semester"
                    value={formData.semester}
                    onChange={(e) => setFormData({...formData, semester: e.target.value})}
                    required
                  >
                    <option value="Spring 2026">Spring 2026</option>
                    <option value="Fall 2026">Fall 2026</option>
                  </Select>
                </div>
                
                <Input
                  label="Faculty Name"
                  placeholder="e.g., Dr. John Doe"
                  value={formData.faculty}
                  onChange={(e) => setFormData({...formData, faculty: e.target.value})}
                  required
                />
                
                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="secondary" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Course</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
        
        {/* Courses Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Courses ({filteredCourses.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm text-muted-foreground">Code</th>
                    <th className="text-left py-3 px-4 text-sm text-muted-foreground">Course Name</th>
                    <th className="text-left py-3 px-4 text-sm text-muted-foreground">Credits</th>
                    <th className="text-left py-3 px-4 text-sm text-muted-foreground">Faculty</th>
                    <th className="text-left py-3 px-4 text-sm text-muted-foreground">Department</th>
                    <th className="text-left py-3 px-4 text-sm text-muted-foreground">Seats</th>
                    <th className="text-left py-3 px-4 text-sm text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((course) => (
                    <tr key={course.course_id} className="border-b border-border last:border-0">
                      <td className="py-4 px-4">
                        <span className="px-2 py-1 text-xs rounded bg-primary/10 text-primary">
                          {course.course_code}
                        </span>
                      </td>
                      <td className="py-4 px-4">{course.course_name}</td>
                      <td className="py-4 px-4">{course.credits}</td>
                      <td className="py-4 px-4 text-sm">{course.faculty_name}</td>
                      <td className="py-4 px-4 text-sm">{course.department}</td>
                      <td className="py-4 px-4 text-sm">
                        {course.seats_available}/{course.total_seats}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDelete(course.course_id)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
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
      </div>
    </DashboardLayout>
  );
}
