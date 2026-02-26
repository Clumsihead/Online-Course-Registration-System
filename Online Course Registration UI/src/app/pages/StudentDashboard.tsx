import React from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { BookOpen, GraduationCap, Calendar, TrendingUp } from 'lucide-react';
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function StudentDashboard() {
  console.log("StudentDashboard mounted");
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const role = localStorage.getItem("role");

    if (!userId || role !== "student") {
      navigate("/login", { replace: true });
    }
  }, [navigate]);
  const stats = [
    {
      title: 'Registered Credits',
      value: '15',
      subtitle: 'Out of 18 max credits',
      icon: GraduationCap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Current Semester',
      value: 'Spring 2026',
      subtitle: 'Week 3 of 16',
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Enrolled Courses',
      value: '5',
      subtitle: '3 Core, 2 Elective',
      icon: BookOpen,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'CGPA',
      value: '3.75',
      subtitle: 'On track for honors',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];
  
  const upcomingClasses = [
    { course: 'Data Structures', time: '09:00 AM - 10:30 AM', room: 'Room 301', day: 'Monday' },
    { course: 'Database Systems', time: '11:00 AM - 12:30 PM', room: 'Room 205', day: 'Monday' },
    { course: 'Web Development', time: '02:00 PM - 03:30 PM', room: 'Lab 101', day: 'Monday' }
  ];
  
  const recentAnnouncements = [
    { title: 'Course Registration for Fall 2026', date: 'Feb 20, 2026', type: 'Registration' },
    { title: 'Mid-term Examination Schedule Released', date: 'Feb 18, 2026', type: 'Exam' },
    { title: 'Guest Lecture on AI/ML', date: 'Feb 15, 2026', type: 'Event' }
  ];
  
  return (
    <DashboardLayout userName="John Smith" userRole="student">
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardContent>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                      <h2 className="text-3xl mb-1">{stat.value}</h2>
                      <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Upcoming Classes & Announcements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Classes */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingClasses.map((class_item, index) => (
                  <div key={index} className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <div className="flex-1">
                      <h4 className="mb-1">{class_item.course}</h4>
                      <p className="text-sm text-muted-foreground">{class_item.time}</p>
                      <p className="text-xs text-muted-foreground">{class_item.room}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Recent Announcements */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Announcements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAnnouncements.map((announcement, index) => (
                  <div key={index} className="pb-4 border-b border-border last:border-0 last:pb-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="text-sm">{announcement.title}</h4>
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {announcement.type}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{announcement.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
