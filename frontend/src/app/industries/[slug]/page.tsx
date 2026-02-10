import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ContentBlock, CtaBand } from '@/components/sections';
import { industries, getIndustryBySlug } from '@/lib/industries-data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return { title: 'Not Found' };

  return {
    title: `${industry.name} — Applied Economics AI`,
    description: industry.description,
  };
}

export default async function IndustryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    notFound();
  }

  return (
    <article>
      {/* Hero */}
      <section className="bg-charcoal pt-24 lg:pt-32 pb-16 lg:pb-24">
        <Container>
          <div className="max-w-4xl">
            <span className="font-mono text-[16px] uppercase tracking-widest text-teal mb-6 block">
              {industry.name}
            </span>

            <h1 className="text-h1 text-white mb-6">{industry.headline}</h1>
            <p className="text-body-lg text-slate-400">{industry.description}</p>

            <div className="mt-10">
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Discuss a Project
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Specs */}
      <section className="py-16 lg:py-24">
        <Container>
          <h2 className="text-h2 text-charcoal mb-8">At a Glance</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industry.specs.map((spec) => (
              <div key={spec.label} className="bg-slate-50 border border-slate-200 p-6">
                <h3 className="text-label mb-2">{spec.label}</h3>
                <p className="text-h3">{spec.value}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How We Help */}
      <ContentBlock title="How We Help" background="gray" size="default">
        {industry.howWeHelp.split('\n\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </ContentBlock>

      {/* Related Services & Data */}
      {(industry.relatedServices.length > 0 || industry.relatedData.length > 0) && (
        <section className="py-16 lg:py-24">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Related Services */}
              {industry.relatedServices.length > 0 && (
                <div>
                  <h2 className="text-h2 text-charcoal mb-6">Related Services</h2>
                  <div className="space-y-4">
                    {industry.relatedServices.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="block enterprise-card group hover:border-charcoal transition-colors"
                      >
                        <h3 className="text-h3 group-hover:underline decoration-1 underline-offset-4">
                          {service.name}
                        </h3>
                        <span className="link-explore mt-3 inline-flex">
                          Explore
                          <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Data Products */}
              {industry.relatedData.length > 0 && (
                <div>
                  <h2 className="text-h2 text-charcoal mb-6">Related Data Products</h2>
                  <div className="space-y-4">
                    {industry.relatedData.map((product) => (
                      <Link
                        key={product.slug}
                        href={`/data/${product.slug}`}
                        className="block enterprise-card group hover:border-charcoal transition-colors"
                      >
                        <h3 className="text-h3 group-hover:underline decoration-1 underline-offset-4">
                          {product.name}
                        </h3>
                        <span className="link-explore mt-3 inline-flex">
                          Explore
                          <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Container>
        </section>
      )}

      {/* Back link */}
      <section className="py-10 bg-slate-50">
        <Container>
          <Link href="/industries" className="link-explore text-body-lg">
            ← Back to all industries
          </Link>
        </Container>
      </section>

      {/* CTA Band */}
      <CtaBand
        headline={industry.ctaHeadline}
        subheadline={industry.ctaDescription}
        primaryCta={{ label: 'Get in touch', url: '/contact' }}
      />
    </article>
  );
}
