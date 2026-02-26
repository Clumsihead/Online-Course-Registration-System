import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useEffect } from "react";
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  User, 
  LogOut,
  Bell,
  Menu,
  X
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userName: string;
  userRole: 'student' | 'admin';
}

export function DashboardLayout({ children, userName, userRole }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();


  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const studentNav = [
    { path: '/student/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/student/available-courses', icon: BookOpen, label: 'Available Courses' },
    { path: '/student/my-courses', icon: GraduationCap, label: 'My Courses' },
    { path: '/student/profile', icon: User, label: 'Profile' },
  ];
  
  const adminNav = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/manage-courses', icon: BookOpen, label: 'Manage Courses' },
    { path: '/admin/manage-students', icon: User, label: 'Manage Students' },
  ];
  
  const navItems = userRole === 'student' ? studentNav : adminNav;
  
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white border-r border-border flex flex-col
        transform transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-primary" />
            <span className="text-lg text-primary">State University</span>
          </Link>
          <button 
            className="lg:hidden w-8 h-8 flex items-center justify-center"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 h-11 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-foreground hover:bg-accent'
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-border">
          <div
            onClick={() => {
              localStorage.removeItem("user_id");
              localStorage.removeItem("role");
              localStorage.removeItem("full_name");
              navigate("/login", { replace: true });
            }}
            className="flex items-center gap-3 px-4 h-11 rounded-lg text-destructive hover:bg-red-50 transition-colors cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Logout</span>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-border flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden w-10 h-10 flex items-center justify-center"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-lg">
              {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full hover:bg-accent flex items-center justify-center relative">
              <Bell className="w-5 h-5 text-foreground" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full"></span>
            </button>
            
            <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-border">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm text-primary">{userName.charAt(0)}</span>
              </div>
              <div>
                <p className="text-sm">{userName}</p>
                <p className="text-xs text-muted-foreground">
                  {userRole === 'student' ? 'Student' : 'Administrator'}
                </p>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}