import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import {
  KeySpecsStrip,
  NumberedChallenges,
  MethodologySteps,
  CapabilityGrid,
  EngagementHighlight,
  CrossServiceNav,
} from '@/components/sections';
import { services, getServiceBySlug, allServiceLinks } from '@/lib/services-data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: 'Not Found' };

  return {
    title: service.title,
    description: service.introduction,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <article>
      {/* Section 1: Service Hero */}
      <section className="bg-white pt-24 pb-20 lg:pt-24 lg:pb-20">
        <div className="container-wide">
          <Breadcrumb
            items={[
              { label: 'Services', href: '/services' },
              { label: service.title },
            ]}
          />

          <div className="max-w-[720px]">
            <span className="text-label mt-8 block">SERVICE</span>
            <h1 className="text-display mt-3">{service.headline}</h1>
            <p
              className="text-body-lg mt-6 max-w-[640px]"
              style={{ lineHeight: 1.6 }}
            >
              {service.introduction}
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link href="/contact" className="btn-primary">
                Discuss a Project
              </Link>
              <Link href="/data" className="btn-outline">
                View Our Data
              </Link>
            </div>
          </div>

          {/* Key specs strip */}
          <div className="mt-12">
            <KeySpecsStrip specs={service.keySpecs} />
          </div>
        </div>
      </section>

      {/* Section 2: The Problem Context */}
      <section className="bg-section-alt section-standard">
        <div className="container-wide">
          <h2 className="section-header-enterprise mb-12">The Challenge</h2>
          <NumberedChallenges challenges={service.challenges} />
        </div>
      </section>

      {/* Section 3: Our Approach */}
      <section className="bg-white section-standard">
        <div className="container-wide">
          <h2 className="section-header-enterprise mb-12">Our Approach</h2>
          <MethodologySteps steps={service.methodology} />
        </div>
      </section>

      {/* Section 4: Capabilities */}
      <section className="bg-section-alt section-standard">
        <div className="container-wide">
          <h2 className="section-header-enterprise mb-12">Capabilities</h2>
          <CapabilityGrid capabilities={service.capabilities} />
        </div>
      </section>

      {/* Section 5: Engagement Highlight */}
      <section className="bg-white section-standard">
        <div className="container-wide">
          <EngagementHighlight
            title={service.engagementHighlight.title}
            description={service.engagementHighlight.description}
            metrics={service.engagementHighlight.metrics}
          />
        </div>
      </section>

      {/* Section 6: Related Data Products (conditional) */}
      {service.relatedDataProducts.length > 0 && (
        <section className="bg-section-alt section-standard">
          <div className="container-wide">
            <div className="flex justify-between items-baseline mb-12">
              <h2 className="section-header-enterprise">
                Related Data Products
              </h2>
              <Link href="/data" className="link-specs">
                View All Data
              </Link>
            </div>

            <div
              className={`grid grid-cols-1 gap-6 ${
                service.relatedDataProducts.length >= 3
                  ? 'md:grid-cols-3'
                  : 'md:grid-cols-2'
              }`}
            >
              {service.relatedDataProducts.map((product) => (
                <Link
                  key={product.slug}
                  href={`/data/${product.slug}`}
                  aria-label={`Explore ${product.name} data product`}
                  className="enterprise-card group flex flex-col border-l-[3px] border-l-[#006D77]"
                >
                  <div className="flex justify-end mb-4">
                    <span className="status-dot" aria-hidden="true" />
                  </div>
                  <h3 className="text-h3 mb-3 group-hover:underline decoration-1 underline-offset-4">
                    {product.name}
                  </h3>
                  <p className="text-body flex-grow">{product.description}</p>
                  <div className="mt-6">
                    <span className="link-explore">
                      Explore
                      <span className="transition-transform group-hover:translate-x-1">
                        &rarr;
                      </span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section 7: Cross-Service Navigation */}
      <section className="bg-white py-12">
        <div className="container-wide">
          <CrossServiceNav
            services={allServiceLinks}
            currentSlug={service.slug}
          />
        </div>
      </section>

      {/* Section 8: CTA Band */}
      <section className="bg-white pt-8 pb-30">
        <div className="container-wide">
          <div className="enterprise-card p-12 text-center">
            <span className="text-label">GET IN TOUCH</span>
            <h2 className="text-h2 mt-4">{service.ctaHeadline}</h2>
            <p className="text-body mt-4 max-w-[480px] mx-auto">
              {service.ctaDescription}
            </p>
            <div className="mt-8">
              <Link href="/contact" className="btn-primary">
                Discuss a Project
              </Link>
            </div>
            <p className="font-mono text-[13px] text-[#64748B] mt-6">
              Typical response time: 24 hours
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
