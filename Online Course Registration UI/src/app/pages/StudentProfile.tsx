import React from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { User, Mail, Phone, Calendar, MapPin, BookOpen } from 'lucide-react';
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function StudentProfile() {
  const navigate = useNavigate();

  useEffect(() => {
      const userId = localStorage.getItem("user_id");
      const role = localStorage.getItem("role");
  
      if (!userId || role !== "student") {
        navigate("/login", { replace: true });
      }
    }, [navigate]);
  return (
    <DashboardLayout userName="John Smith" userRole="student">
      <div className="max-w-4xl space-y-6">
        {/* Profile Overview */}
        <Card>
          <CardContent>
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-3xl text-primary">JS</span>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl mb-1">John Smith</h2>
                <p className="text-muted-foreground mb-4">Computer Science Major</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-muted-foreground" />
                    <span>Enrollment: CS2024-001234</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Year: Junior (3rd Year)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  defaultValue="John"
                />
                <Input
                  label="Last Name"
                  defaultValue="Smith"
                />
              </div>
              
              <Input
                label="Email Address"
                type="email"
                defaultValue="john.smith@university.edu"
                disabled
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Phone Number"
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                />
                <Input
                  label="Date of Birth"
                  type="date"
                  defaultValue="2003-05-15"
                />
              </div>
              
              <Input
                label="Address"
                defaultValue="123 Student Housing, Campus Road"
              />
              
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="secondary">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        {/* Academic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Academic Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Major</p>
                <p>Computer Science</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Minor</p>
                <p>Mathematics</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Expected Graduation</p>
                <p>May 2027</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Academic Advisor</p>
                <p>Dr. Sarah Johnson</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Current CGPA</p>
                <p className="text-primary">3.75 / 4.00</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Credits Completed</p>
                <p>78 / 120</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
