import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

interface HeroProps {
  headline: string;
  subheadline?: string;
  primaryCta?: {
    label: string;
    url: string;
    variant?: 'primary' | 'secondary' | 'ghost';
  };
  secondaryCta?: {
    label: string;
    url: string;
    variant?: 'primary' | 'secondary' | 'ghost';
  };
  variant?: 'dark' | 'light';
}

export function Hero({
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  variant = 'dark',
}: HeroProps) {
  const isDark = variant === 'dark';

  return (
    <section
      className={`
        py-24 lg:py-32
        ${isDark ? 'bg-navy-900 dark-bg' : 'bg-gray-50'}
      `}
    >
      <Container>
        <div className="max-w-3xl">
          <h1
            className={`
              text-display mb-6
              ${isDark ? 'text-white' : 'text-navy-800'}
            `}
          >
            {headline}
          </h1>

          {subheadline && (
            <p
              className={`
                text-body-large mb-8
                ${isDark ? 'text-gray-300' : 'text-gray-500'}
              `}
            >
              {subheadline}
            </p>
          )}

          {(primaryCta || secondaryCta) && (
            <div className="flex flex-col sm:flex-row gap-4">
              {primaryCta && (
                <Link href={primaryCta.url}>
                  <Button variant={primaryCta.variant || 'primary'} size="lg">
                    {primaryCta.label}
                  </Button>
                </Link>
              )}
              {secondaryCta && (
                <Link href={secondaryCta.url}>
                  <Button
                    variant={secondaryCta.variant || 'ghost'}
                    size="lg"
                    className={isDark ? 'text-white hover:bg-navy-800' : ''}
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

export default Hero;
