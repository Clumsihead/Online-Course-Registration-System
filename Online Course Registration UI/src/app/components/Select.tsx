import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export function Select({ label, className = '', children, ...props }: SelectProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm text-foreground">
          {label}
        </label>
      )}
      <select
        className={`w-full h-10 px-4 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-ring ${className}`}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}
