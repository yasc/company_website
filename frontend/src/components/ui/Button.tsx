'use client';

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      children,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    // Map variant and size to CSS classes from globals.css
    const getButtonClasses = () => {
      let classes = [];
      
      // Variant classes
      if (variant === 'primary') {
        classes.push('btn-primary');
      } else if (variant === 'secondary') {
        classes.push('btn-secondary');
      } else if (variant === 'ghost') {
        // Ghost variant uses custom styles
        classes.push(`
          bg-transparent text-accent-primary border-none
          hover:bg-gray-100 hover:text-accent-hover
          transition-all duration-200 ease
          padding: 16px 32px
          border-radius: 6px
          font-family: var(--font-sans)
          font-size: 15px
          font-weight: 500
          letter-spacing: 0.01em
          cursor: pointer
        `);
      }
      
      // Size variants
      if (size === 'sm') {
        classes.push('btn-sm');
      }
      
      // Disabled state
      if (disabled || isLoading) {
        classes.push('disabled:opacity-50 disabled:cursor-not-allowed');
      }
      
      return classes.join(' ');
    };

    return (
      <button
        ref={ref}
        className={`${getButtonClasses()} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
