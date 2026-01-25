import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide';
}

const sizeStyles = {
  narrow: 'max-w-3xl',    // 768px
  default: 'max-w-6xl',   // 1200px (per design spec)
  wide: 'max-w-7xl',      // 1280px
};

export function Container({ 
  children, 
  className = '',
  size = 'default' 
}: ContainerProps) {
  return (
    <div 
      className={`
        mx-auto w-full
        px-4 sm:px-8 lg:px-16
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Container;
