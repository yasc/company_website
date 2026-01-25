import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({ 
  children, 
  className = '',
  hover = true,
  padding = 'md'
}: CardProps) {
  return (
    <div 
      className={`
        bg-white
        border border-gray-200
        rounded-lg
        shadow-sm
        ${hover ? `
          transition-all duration-200 ease-in-out
          hover:shadow-md
          hover:-translate-y-0.5
        ` : ''}
        ${paddingStyles[padding]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

// Card subcomponents for structured content
export function CardHeader({ 
  children, 
  className = '' 
}: { children: ReactNode; className?: string }) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ 
  children, 
  className = '' 
}: { children: ReactNode; className?: string }) {
  return (
    <h3 className={`text-h3 text-navy-800 ${className}`}>
      {children}
    </h3>
  );
}

export function CardDescription({ 
  children, 
  className = '' 
}: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-body text-gray-500 mt-2 ${className}`}>
      {children}
    </p>
  );
}

export function CardContent({ 
  children, 
  className = '' 
}: { children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export function CardFooter({ 
  children, 
  className = '' 
}: { children: ReactNode; className?: string }) {
  return (
    <div className={`mt-4 pt-4 border-t border-gray-200 ${className}`}>
      {children}
    </div>
  );
}

export default Card;
