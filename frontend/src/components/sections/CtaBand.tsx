import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

interface CtaBandProps {
  headline: string;
  subheadline?: string;
  primaryCta?: {
    label: string;
    url: string;
  };
  secondaryCta?: {
    label: string;
    url: string;
  };
  variant?: 'dark' | 'light';
}

export function CtaBand({
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  variant = 'dark',
}: CtaBandProps) {
  const isDark = variant === 'dark';

  return (
    <section
      className={`
        py-16
        ${isDark ? 'bg-navy-800 dark-bg' : 'bg-gray-50'}
      `}
    >
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2
              className={`
                text-h2 mb-2
                ${isDark ? 'text-white' : 'text-navy-800'}
              `}
            >
              {headline}
            </h2>
            {subheadline && (
              <p className={isDark ? 'text-gray-300' : 'text-gray-500'}>
                {subheadline}
              </p>
            )}
          </div>

          {(primaryCta || secondaryCta) && (
            <div className="flex flex-col sm:flex-row gap-4">
              {primaryCta && (
                <Link href={primaryCta.url}>
                  <Button variant="primary" size="lg">
                    {primaryCta.label}
                  </Button>
                </Link>
              )}
              {secondaryCta && (
                <Link href={secondaryCta.url}>
                  <Button
                    variant="ghost"
                    size="lg"
                    className={isDark ? 'text-white hover:bg-navy-700' : ''}
                  >
                    {secondaryCta.label}
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

export default CtaBand;
