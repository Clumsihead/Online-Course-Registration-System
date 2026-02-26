import React from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Users, BookOpen, Calendar, TrendingUp } from 'lucide-react';
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const userId = localStorage.getItem("user_id");
  const role = localStorage.getItem("role");

  console.log("AdminDashboard check:");
  console.log("userId:", userId);
  console.log("role:", role);

  useEffect(() => {
    console.log("useEffect running");
    console.log("userId inside effect:", userId);
    console.log("role inside effect:", role);

    if (!userId || role !== "admin") {
      console.log("Redirecting to login...");
      navigate("/login", { replace: true });
    }
  }, [navigate, userId, role]);

  if (!userId || role !== "admin") {
    console.log("Returning null before render");
    return null;
  }
  const [statsData, setStatsData] = React.useState<any>(null);
  useEffect(() => {
    fetch("http://localhost:5000/admin/dashboard-stats")
      .then(res => res.json())
      .then(data => {
        console.log("Dashboard stats:", data);
        setStatsData(data);
      })
      .catch(err => console.error("Dashboard fetch error:", err));
  }, []);
  const stats = statsData ? [
  {
    title: 'Total Students',
    value: statsData.total_students,
    subtitle: 'Registered in system',
    icon: Users,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    title: 'Total Courses',
    value: statsData.total_courses,
    subtitle: 'Available courses',
    icon: BookOpen,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    title: 'Active Registrations',
    value: statsData.total_enrollments,
    subtitle: 'Total enrollments',
    icon: Calendar,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    title: 'Seat Utilization',
    value: `${statsData.utilization_percentage}%`,
    subtitle: 'Capacity used',
    icon: TrendingUp,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  }
] : [];
  
  const recentActivities = [
    { action: 'New student registration', user: 'Jane Doe (CS2024-5678)', time: '5 minutes ago' },
    { action: 'Course added', user: 'Prof. Michael Chen', time: '1 hour ago' },
    { action: 'Student dropped course', user: 'Robert Johnson (EE2023-3456)', time: '2 hours ago' },
    { action: 'Bulk registration processed', user: 'System', time: '3 hours ago' },
    { action: 'New faculty added', user: 'Dr. Emily Rodriguez', time: '5 hours ago' }
  ];
  
  const popularCourses = [
    { name: 'Introduction to AI', enrolled: 120, capacity: 120, percentage: 100 },
    { name: 'Web Development', enrolled: 115, capacity: 120, percentage: 96 },
    { name: 'Data Structures', enrolled: 110, capacity: 120, percentage: 92 },
    { name: 'Database Systems', enrolled: 105, capacity: 120, percentage: 88 },
    { name: 'Mobile App Development', enrolled: 98, capacity: 100, percentage: 98 }
  ];
  
  return (
    <DashboardLayout userName="Admin User" userRole="admin">
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
        
        {/* Recent Activity & Popular Courses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm mb-1">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.user}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Popular Courses */}
          <Card>
            <CardHeader>
              <CardTitle>Most Popular Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {popularCourses.map((course, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{course.name}</span>
                      <span className="text-muted-foreground">
                        {course.enrolled}/{course.capacity}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-accent rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${course.percentage === 100 ? 'bg-destructive' : 'bg-primary'}`}
                        style={{ width: `${course.percentage}%` }}
                      ></div>
                    </div>
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
