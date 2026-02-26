import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { GraduationCap, Menu, X } from 'lucide-react';

export function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <header className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-primary" />
            <span className="text-xl text-primary">State University</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className={`text-sm transition-colors ${
                location.pathname === '/' 
                  ? 'text-primary' 
                  : 'text-foreground hover:text-primary'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/courses" 
              className={`text-sm transition-colors ${
                location.pathname === '/courses' 
                  ? 'text-primary' 
                  : 'text-foreground hover:text-primary'
              }`}
            >
              Courses
            </Link>
            <Link 
              to="/about" 
              className={`text-sm transition-colors ${
                location.pathname === '/about' 
                  ? 'text-primary' 
                  : 'text-foreground hover:text-primary'
              }`}
            >
              About
            </Link>
            <Link 
              to="/login" 
              className="px-6 h-9 inline-flex items-center justify-center bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-2 border-t border-border">
            <Link 
              to="/" 
              className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                location.pathname === '/' 
                  ? 'bg-primary text-white' 
                  : 'text-foreground hover:bg-accent'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/courses" 
              className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                location.pathname === '/courses' 
                  ? 'bg-primary text-white' 
                  : 'text-foreground hover:bg-accent'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Courses
            </Link>
            <Link 
              to="/about" 
              className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                location.pathname === '/about' 
                  ? 'bg-primary text-white' 
                  : 'text-foreground hover:bg-accent'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/login" 
              className="block px-4 py-2 rounded-lg text-sm bg-primary text-white hover:bg-blue-700 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}