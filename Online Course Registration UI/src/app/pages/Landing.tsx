import React from 'react';
import { Link } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';
import { Card, CardContent } from '../components/Card';
import { CheckCircle, BookOpen, Calendar, Users } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl mb-6 text-foreground">
              Register for Your Semester Courses Easily
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Streamline your course registration process with our modern, intuitive platform. 
              Browse available courses, manage your schedule, and track your credits all in one place.
            </p>
            <Link to="/login">
              <Button size="lg">Register Now</Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">Why Choose Our Platform</h2>
            <p className="text-muted-foreground">
              Everything you need for a seamless course registration experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="mb-2">Easy Registration</h3>
                <p className="text-sm text-muted-foreground">
                  Register for courses with just a few clicks. Our intuitive interface makes the process quick and simple.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <h3 className="mb-2">Track Credits</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor your credit hours in real-time and ensure you meet graduation requirements.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="mb-2">View Schedule</h3>
                <p className="text-sm text-muted-foreground">
                  Access your complete course schedule and stay organized throughout the semester.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl text-primary mb-2">500+</div>
              <p className="text-muted-foreground">Available Courses</p>
            </div>
            <div className="text-center">
              <div className="text-4xl text-primary mb-2">15,000+</div>
              <p className="text-muted-foreground">Active Students</p>
            </div>
            <div className="text-center">
              <div className="text-4xl text-primary mb-2">98%</div>
              <p className="text-muted-foreground">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
