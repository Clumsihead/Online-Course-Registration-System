import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm text-foreground">
          {label}
        </label>
      )}
      <input
        className={`w-full h-10 px-4 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-ring ${className}`}
        {...props}
      />
    </div>
  );
}
