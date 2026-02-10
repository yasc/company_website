import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { industries } from '@/lib/industries-data';

export default function IndustriesPage() {
  return (
    <>
      {/* Editorial Hero */}
      <section className="bg-white pt-20 lg:pt-32 pb-12 lg:pb-16">
        <Container>
          <p className="font-mono text-[16px] uppercase tracking-widest text-teal mb-6">Industries</p>
          <h1 className="text-h1 max-w-4xl mb-8">
            Sectors where our economics and data make an impact
          </h1>
          <p className="text-body-lg max-w-2xl text-slate-600">
            We work with governments, central banks, statistical agencies, investors, and policy institutions — anywhere rigorous economic evidence and novel data can improve decisions.
          </p>
        </Container>
      </section>

      {/* Industry Grid */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="enterprise-card group hover:border-charcoal transition-colors flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <div className="flex justify-end mb-4">
                    <div className="h-2 w-2 bg-slate-300 group-hover:bg-charcoal rounded-full transition-colors" />
                  </div>
                  <h2 className="text-h3 mb-3 group-hover:underline decoration-1 underline-offset-4">
                    {industry.name}
                  </h2>
                  <p className="text-body-lg">
                    {industry.description}
                  </p>
                </div>
                <div className="link-explore mt-6">
                  Explore
                  <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
