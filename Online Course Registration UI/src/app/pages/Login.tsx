import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { GraduationCap } from 'lucide-react';

export default function Login() {
  useEffect(() => {
  console.log("Login page mounted");
}, []);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();   // VERY IMPORTANT

  try {
    const response = await fetch("http://https://online-course-registration-system.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error);
      return;
    }

    localStorage.setItem("user_id", data.user_id);
    localStorage.setItem("full_name", data.full_name);
    localStorage.setItem("role", data.role);

    if (data.role === "student") {
      navigate("/student/dashboard", { replace: true });
    } else {
      navigate("/admin/dashboard", { replace: true });
    }

  } catch (error) {
    console.error("Login failed:", error);
  }
};

  
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <GraduationCap className="w-10 h-10 text-primary" />
            <span className="text-2xl text-primary">State University</span>
          </Link>
          <h1 className="text-3xl mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to access your account</p>
        </div>
        
        <Card>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <Input
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="w-4 h-4 rounded border-border" />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                
                <Link to="#" className="text-sm text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>
              
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
            
            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Demo credentials:</p>
              <p className="mt-1">Student: student@university.edu</p>
              <p>Admin: admin@university.edu</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
