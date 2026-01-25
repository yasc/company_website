import Link from 'next/link';
import Image from 'next/image';
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
}

export function Hero({
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
}: HeroProps) {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content - Left Side */}
          <div className="max-w-[560px]">
            <h1 className="hero-headline mb-6">
              {headline}
            </h1>

            {subheadline && (
              <p className="hero-subheadline max-w-[480px] mb-10">
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
                    <Button variant={secondaryCta.variant || 'secondary'} size="lg">
                      {secondaryCta.label}
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Hero Image - Right Side */}
          <div className="relative">
            <div className="relative w-full aspect-square lg:aspect-auto lg:h-[500px]">
              <Image
                src="/images/hero_greyscale.png"
                alt="Economics research and data visualization abstract representation"
                fill
                className="object-contain lg:object-cover rounded-lg"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;