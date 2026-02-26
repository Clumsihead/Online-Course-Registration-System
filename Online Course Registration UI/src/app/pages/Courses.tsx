import React from 'react';
import { Link } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';

export default function Courses() {
  const departments = [
    {
      name: 'Computer Science',
      courses: 85,
      description: 'From algorithms to AI, explore the world of computing',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      name: 'Engineering',
      courses: 120,
      description: 'Build the future with hands-on engineering programs',
      color: 'bg-green-50 text-green-600'
    },
    {
      name: 'Business Administration',
      courses: 95,
      description: 'Develop leadership and management skills',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      name: 'Mathematics',
      courses: 65,
      description: 'Master the language of science and analytics',
      color: 'bg-orange-50 text-orange-600'
    },
    {
      name: 'Life Sciences',
      courses: 78,
      description: 'Explore the mysteries of life and nature',
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      name: 'Arts & Humanities',
      courses: 92,
      description: 'Discover culture, history, and human expression',
      color: 'bg-pink-50 text-pink-600'
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-4xl mb-4">Explore Our Courses</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Discover over 500 courses across multiple departments. Find the perfect program to advance your career and achieve your goals.
          </p>
        </div>
      </section>
      
      {/* Departments Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">Browse by Department</h2>
            <p className="text-muted-foreground">
              Select a department to view available courses
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <Card key={dept.name}>
                <CardContent>
                  <div className={`w-12 h-12 rounded-lg ${dept.color} flex items-center justify-center mb-4`}>
                    <span className="text-2xl">{dept.courses}</span>
                  </div>
                  <h3 className="mb-2">{dept.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {dept.description}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {dept.courses} courses available
                  </p>
                  <Link to="/login">
                    <Button variant="secondary" className="w-full">
                      View Courses
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-3xl mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Log in to your student portal to browse available courses, check prerequisites, and register for the upcoming semester.
          </p>
          <Link to="/login">
            <Button size="lg">Access Student Portal</Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
