import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { services, clientSegments, engagementModel } from '@/lib/services-data';

export default function ServicesPage() {
  return (
    <>
      {/* Section 1: Services Hero */}
      <section className="bg-white pt-24 pb-20 lg:pt-24 lg:pb-20">
        <div className="container-wide">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Services' },
            ]}
          />

          <div className="max-w-[720px]">
            <span className="text-label mt-8 block">OUR SERVICES</span>
            <h1 className="text-display mt-3">
              Precision Economics for a Complex World
            </h1>
            <p className="text-body-lg mt-6 max-w-[640px]" style={{ lineHeight: 1.6 }}>
              We combine rigorous economics with frontier AI to deliver
              consulting, datasets, and policy analysis for governments,
              investors, and enterprises.
            </p>
            <div className="mt-10">
              <Link href="/contact" className="btn-primary">
                Discuss a Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Service Cards Grid */}
      <section className="bg-section-alt section-standard">
        <div className="container-wide">
          <div className="flex justify-between items-baseline mb-12">
            <h2 className="section-header-enterprise">What We Do</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                aria-label={`Explore ${service.title} service`}
                className="enterprise-card flex flex-col min-h-[280px] group"
              >
                {/* Meta row */}
                <div className="flex justify-between items-start mb-6">
                  <span className="text-label">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="status-dot" aria-hidden="true" />
                </div>

                {/* Title */}
                <h3 className="text-h3 mb-3 group-hover:underline decoration-1 underline-offset-4">
                  {service.title}
                </h3>

                {/* Summary */}
                <p className="text-body-lg">
                  {service.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Engagement Model */}
      <section className="bg-white section-standard">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left: description */}
            <div className="lg:col-span-5">
              <h2 className="section-header-enterprise">How We Work</h2>
              <p className="text-body-lg mt-6" style={{ lineHeight: 1.6 }}>
                A typical engagement begins with a scoping conversation and
                concludes with board-ready deliverables. Our teams are small —
                usually 2–4 PhD economists — and our timelines are focused:
                most projects complete within 8 weeks.
              </p>
            </div>

            {/* Right: specs list */}
            <div className="lg:col-span-6 lg:col-start-7">
              <dl>
                {engagementModel.specs.map((spec, index) => (
                  <div
                    key={index}
                    className={`py-6 border-b border-[#CBD5E1] ${
                      index === 0 ? 'border-t' : ''
                    }`}
                  >
                    <dt className="text-label">{spec.label}</dt>
                    <dd className="text-h3 mt-1">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Client Types */}
      <section className="bg-section-alt section-standard">
        <div className="container-wide">
          <h2 className="section-header-enterprise mb-12">Who We Serve</h2>

          {/* Desktop: horizontal row with dividers */}
          <div className="hidden md:flex">
            {clientSegments.map((segment, index) => (
              <div
                key={index}
                className={`flex-1 px-8 first:pl-0 last:pr-0 ${
                  index < clientSegments.length - 1
                    ? 'border-r border-[#CBD5E1]'
                    : ''
                }`}
              >
                <h3 className="text-h3">{segment.name}</h3>
                <p className="text-body text-[#64748B] mt-2">
                  {segment.examples}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile: vertical stack */}
          <div className="md:hidden space-y-0">
            {clientSegments.map((segment, index) => (
              <div
                key={index}
                className={`py-6 ${
                  index < clientSegments.length - 1
                    ? 'border-b border-[#CBD5E1]'
                    : ''
                }`}
              >
                <h3 className="text-h3">{segment.name}</h3>
                <p className="text-body text-[#64748B] mt-2">
                  {segment.examples}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: CTA Band */}
      <section className="bg-white pt-20 pb-30">
        <div className="container-wide">
          <div className="enterprise-card p-12 text-center">
            <span className="text-label">GET IN TOUCH</span>
            <h2 className="text-h2 mt-4">
              Every project starts with a conversation
            </h2>
            <p className="text-body mt-4 max-w-[480px] mx-auto">
              Tell us about your challenge. We will outline how our team,
              methods, and data can help.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <Link href="/contact" className="btn-primary">
                Discuss a Project
              </Link>
              <Link href="/data" className="btn-outline">
                Explore Our Data
              </Link>
            </div>
            <p className="font-mono text-[14px] text-[#64748B] mt-6">
              Typical response time: 24 hours
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
