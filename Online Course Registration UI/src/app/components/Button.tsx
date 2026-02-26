import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg transition-colors disabled:opacity-50 disabled:pointer-events-none';
  
  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-blue-700',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-slate-200',
    danger: 'bg-destructive text-destructive-foreground hover:bg-red-700',
    ghost: 'hover:bg-accent text-foreground'
  };
  
  const sizeClasses = {
    sm: 'h-9 px-4',
    md: 'h-10 px-6',
    lg: 'h-12 px-8'
  };
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
