import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-1.5">
          {label}
        </label>
      )}
      <input
        className={`w-full px-3 py-2.5 border rounded-lg bg-card backdrop-blur-md text-text-primary placeholder-text-secondary 
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300
          ${error ? 'border-danger' : 'border-border'}
          ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-danger">{error}</p>
      )}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className = '', ...props }: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-1.5">
          {label}
        </label>
      )}
      <textarea
        className={`w-full px-3 py-2.5 border rounded-lg bg-card backdrop-blur-md text-text-primary placeholder-text-secondary 
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300
          ${error ? 'border-danger' : 'border-border'}
          ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-danger">{error}</p>
      )}
    </div>
  );
}
