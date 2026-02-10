import { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  align?: 'left' | 'center';
}

export function SectionHeader({
  title,
  subtitle,
  children,
  align = 'left',
}: SectionHeaderProps) {
  return (
    <div
      className={`mb-12 ${align === 'center' ? 'text-center' : ''}`}
    >
      <h2 className="text-h2 text-navy-800 mb-4">{title}</h2>
      {subtitle && (
        <p
          className={`text-body-lg text-gray-500 ${
            align === 'left' ? 'max-w-2xl' : 'max-w-2xl mx-auto'
          }`}
        >
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}

export default SectionHeader;
