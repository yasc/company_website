import { getServices } from '@/lib/strapiClient';
import { Container } from '@/components/ui/Container';
import { Card, CardTitle, CardDescription } from '@/components/ui/Card';
import { Hero, CtaBand } from '@/components/sections';
import Link from 'next/link';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface StrapiResponse {
  data?: any[];
  meta?: any;
}

// Fallback services when Strapi is empty
const fallbackServices = [
  {
    id: 1,
    title: 'Economic Consulting',
    slug: 'economic-consulting',
    summary: 'Expert economic analysis and strategic advisory services for complex business and policy challenges. We help clients navigate uncertainty with data-driven insights.',
  },
  {
    id: 2,
    title: 'Litigation Support',
    slug: 'litigation-support',
    summary: 'Rigorous economic analysis and expert testimony for legal proceedings. Our economists provide clear, defensible analysis for antitrust, damages, and regulatory matters.',
  },
  {
    id: 3,
    title: 'Policy Analysis',
    slug: 'policy-analysis',
    summary: 'Evidence-based research to inform public policy decisions. We work with government agencies and nonprofits to evaluate programs and design effective interventions.',
  },
  {
    id: 4,
    title: 'Data Products',
    slug: 'data-products',
    summary: 'High-quality economic datasets and analytical tools. Our data products enable researchers and practitioners to conduct their own rigorous analysis.',
  },
  {
    id: 5,
    title: 'Industry Research',
    slug: 'industry-research',
    summary: 'Deep-dive industry studies and market analysis. We provide the economic context organizations need to make strategic decisions.',
  },
  {
    id: 6,
    title: 'Training & Workshops',
    slug: 'training-workshops',
    summary: 'Professional development in applied economics and data analysis. Our workshops help teams build analytical capacity.',
  },
];

export default async function ServicesPage() {
  let services = fallbackServices;

  try {
    const response = (await getServices({ sort: 'order:asc' })) as StrapiResponse;
    if (response?.data && response.data.length > 0) {
      services = response.data.map((s: any) => ({
        id: s.id,
        title: s.title || 'Service',
        slug: s.slug || '',
        summary: s.summary || '',
      }));
    }
  } catch (error) {
    console.log('Strapi not available, using fallback services');
  }

  return (
    <>
      {/* Hero */}
      <Hero
        headline="Our Services"
        subheadline="We offer a comprehensive suite of economic consulting and research services tailored to your organization's needs."
      />

      {/* Services Grid */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link key={service.id} href={`/services/${service.slug}`}>
                <Card className="h-full">
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.summary}</CardDescription>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Band */}
      <CtaBand
        headline="Need help choosing?"
        subheadline="Our team can help you identify the right services for your organization."
        primaryCta={{ label: 'Contact us', url: '/contact' }}
        secondaryCta={{ label: 'View case studies', url: '/research' }}
      />
    </>
  );
}
