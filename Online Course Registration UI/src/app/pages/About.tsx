import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Card, CardContent } from '../components/Card';
import { BookOpen, Users, Award, Globe } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: BookOpen,
      title: 'Quality Education',
      description: 'Committed to providing world-class education with cutting-edge curriculum and experienced faculty.'
    },
    {
      icon: Users,
      title: 'Diverse Community',
      description: 'A vibrant community of students from diverse backgrounds, fostering collaboration and innovation.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Recognized for academic excellence and research contributions across multiple disciplines.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Partnerships with leading universities worldwide, offering international opportunities.'
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-4xl mb-4">About State University</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Established in 1965, State University has been a beacon of academic excellence for over 60 years.
          </p>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-8">
              To provide accessible, affordable, and high-quality education that prepares students 
              for successful careers and meaningful lives. We are committed to fostering innovation, 
              critical thinking, and social responsibility in all our students.
            </p>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">Our Values</h2>
            <p className="text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <Card key={value.title}>
                  <CardContent>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl text-primary mb-2">15,000+</div>
              <p className="text-muted-foreground">Students Enrolled</p>
            </div>
            <div>
              <div className="text-4xl text-primary mb-2">500+</div>
              <p className="text-muted-foreground">Courses Offered</p>
            </div>
            <div>
              <div className="text-4xl text-primary mb-2">850+</div>
              <p className="text-muted-foreground">Faculty Members</p>
            </div>
            <div>
              <div className="text-4xl text-primary mb-2">60+</div>
              <p className="text-muted-foreground">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
