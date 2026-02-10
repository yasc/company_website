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
}

export function CtaBand({
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
}: CtaBandProps) {
  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-h2 mb-2 text-[#111827]">
              {headline}
            </h2>
            {subheadline && (
              <p className="text-body text-[#111827]">
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
                  <Button variant="ghost" size="lg">
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
