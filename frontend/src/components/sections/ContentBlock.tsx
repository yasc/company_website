import { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';

interface ContentBlockProps {
  title?: string;
  children: ReactNode;
  background?: 'white' | 'gray';
  id?: string;
}

export function ContentBlock({
  title,
  children,
  background = 'white',
  id,
}: ContentBlockProps) {
  return (
    <section
      id={id}
      className={`py-16 lg:py-24 ${
        background === 'gray' ? 'bg-gray-50' : 'bg-white'
      }`}
    >
      <Container size="narrow">
        {title && (
          <h2 className="text-h2 text-navy-800 mb-8">{title}</h2>
        )}
        <div className="max-w-none text-body space-y-6">
          {children}
        </div>
      </Container>
    </section>
  );
}

export default ContentBlock;
