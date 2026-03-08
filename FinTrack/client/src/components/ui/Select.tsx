import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, error, options, className = '', ...props }: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-1.5">
          {label}
        </label>
      )}
      <select
        className={`w-full px-3 py-2.5 border rounded-lg bg-card backdrop-blur-md text-text-primary
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 cursor-pointer
          ${error ? 'border-danger' : 'border-border'}
          ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-background text-text-primary">
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-danger">{error}</p>
      )}
    </div>
  );
}
