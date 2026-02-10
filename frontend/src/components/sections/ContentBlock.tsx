import { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';

interface ContentBlockProps {
  title?: string;
  children: ReactNode;
  background?: 'white' | 'gray';
  id?: string;
  size?: 'narrow' | 'default' | 'wide';
}

export function ContentBlock({
  title,
  children,
  background = 'white',
  id,
  size = 'narrow',
}: ContentBlockProps) {
  return (
    <section
      id={id}
      className={`py-16 lg:py-24 ${
        background === 'gray' ? 'bg-gray-50' : 'bg-white'
      }`}
    >
      <Container size={size}>
        {title && (
          <h2 className="text-h2 text-charcoal mb-8">{title}</h2>
        )}
        <div className="max-w-none text-body-lg space-y-6">
          {children}
        </div>
      </Container>
    </section>
  );
}

export default ContentBlock;
