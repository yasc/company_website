import { getServiceBySlug } from '@/lib/strapiClient';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Hero, ContentBlock, CapabilityList, ProcessTimeline, CtaBand } from '@/components/sections';
import Link from 'next/link';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface StrapiResponse {
  data?: any[];
  meta?: any;
}

// Fallback service data for demo purposes
const fallbackServices: Record<string, any> = {
  'economic-consulting': {
    title: 'Economic Consulting',
    summary: 'Expert economic analysis and strategic advisory services for complex business and policy challenges.',
    overview: `Our economic consulting practice combines rigorous analytical methods with deep industry expertise to help organizations navigate complex challenges.

We work with businesses, governments, and nonprofits to provide the economic insights needed for strategic decision-making. Our approach emphasizes practical, actionable recommendations grounded in solid economic theory and empirical evidence.`,
    capabilities: [
      { title: 'Market Analysis', description: 'Comprehensive analysis of market dynamics, competition, and pricing strategies.' },
      { title: 'Economic Impact Assessment', description: 'Quantify the economic effects of projects, policies, and business decisions.' },
      { title: 'Demand Forecasting', description: 'Data-driven predictions of future demand using advanced econometric methods.' },
      { title: 'Cost-Benefit Analysis', description: 'Rigorous evaluation of the costs and benefits of proposed initiatives.' },
    ],
    processSteps: [
      { stepTitle: 'Discovery', stepDescription: 'We begin by understanding your specific challenge, objectives, and constraints through in-depth discussions.', order: 1 },
      { stepTitle: 'Analysis', stepDescription: 'Our team conducts rigorous economic analysis using appropriate methods and data sources.', order: 2 },
      { stepTitle: 'Insights', stepDescription: 'We translate technical findings into clear, actionable insights tailored to your audience.', order: 3 },
      { stepTitle: 'Implementation', stepDescription: 'We support you in implementing recommendations and measuring outcomes.', order: 4 },
    ],
  },
  'litigation-support': {
    title: 'Litigation Support',
    summary: 'Rigorous economic analysis and expert testimony for legal proceedings.',
    overview: `Our litigation support practice provides economic expertise for complex legal matters including antitrust, damages calculation, and regulatory proceedings.

Our economists have extensive experience as expert witnesses and have provided testimony in federal and state courts, arbitrations, and regulatory proceedings.`,
    capabilities: [
      { title: 'Damages Analysis', description: 'Calculate economic damages in commercial disputes, IP cases, and class actions.' },
      { title: 'Antitrust Analysis', description: 'Evaluate competitive effects of mergers, conduct, and market practices.' },
      { title: 'Expert Testimony', description: 'Clear, credible expert testimony grounded in rigorous economic analysis.' },
      { title: 'Discovery Support', description: 'Assist with economic aspects of discovery, including data requests and document review.' },
    ],
    processSteps: [
      { stepTitle: 'Case Assessment', stepDescription: 'We evaluate the economic issues and develop an analytical strategy.', order: 1 },
      { stepTitle: 'Data & Analysis', stepDescription: 'We conduct thorough analysis using appropriate economic methods.', order: 2 },
      { stepTitle: 'Report Preparation', stepDescription: 'We prepare clear, defensible expert reports suitable for litigation.', order: 3 },
      { stepTitle: 'Testimony', stepDescription: 'We provide deposition and trial testimony as needed.', order: 4 },
    ],
  },
};

// Generic fallback for any service
const genericFallback = {
  title: 'Service',
  summary: 'Professional economic consulting services tailored to your needs.',
  overview: `We provide comprehensive economic consulting services to help organizations make better decisions.

Our team of experienced economists combines rigorous analysis with practical business insight to deliver actionable recommendations.`,
  capabilities: [
    { title: 'Expert Analysis', description: 'Rigorous economic analysis using proven methodologies.' },
    { title: 'Strategic Advice', description: 'Actionable recommendations based on solid economic foundations.' },
    { title: 'Custom Solutions', description: 'Tailored approaches to meet your specific needs.' },
  ],
  processSteps: [
    { stepTitle: 'Consultation', stepDescription: 'Initial discussion to understand your needs.', order: 1 },
    { stepTitle: 'Analysis', stepDescription: 'In-depth economic analysis of your situation.', order: 2 },
    { stepTitle: 'Delivery', stepDescription: 'Clear presentation of findings and recommendations.', order: 3 },
  ],
};

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  
  let service = null;

  try {
    const response = (await getServiceBySlug(slug)) as StrapiResponse;
    if (response?.data && response.data.length > 0) {
      const s = response.data[0];
      service = {
        title: s.title,
        summary: s.summary,
        overview: s.overview,
        capabilities: s.capabilities || [],
        processSteps: s.processSteps || [],
      };
    }
  } catch (error) {
    console.log('Strapi not available, using fallback data');
  }

  // Use fallback if no Strapi data
  if (!service) {
    service = fallbackServices[slug] || { ...genericFallback, title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') };
  }

  if (!service) {
    notFound();
  }

  return (
    <>
      {/* Hero */}
      <Hero
        headline={service.title}
        subheadline={service.summary}
        primaryCta={{ label: 'Get in touch', url: '/contact' }}
      />

      {/* Overview */}
      <ContentBlock title="Overview">
        {service.overview.split('\n\n').map((paragraph: string, i: number) => (
          <p key={i}>{paragraph}</p>
        ))}
      </ContentBlock>

      {/* Capabilities */}
      {service.capabilities.length > 0 && (
        <CapabilityList
          title="What we do"
          capabilities={service.capabilities}
          background="gray"
        />
      )}

      {/* Process */}
      {service.processSteps.length > 0 && (
        <ProcessTimeline
          title="How we work"
          steps={service.processSteps}
          background="white"
        />
      )}

      {/* Back to services */}
      <section className="py-8 bg-gray-50">
        <Container>
          <Link href="/services">
            <Button variant="ghost">← Back to all services</Button>
          </Link>
        </Container>
      </section>

      {/* CTA Band */}
      <CtaBand
        headline="Ready to get started?"
        subheadline="Let's discuss how our services can help your organization."
        primaryCta={{ label: 'Contact us', url: '/contact' }}
        secondaryCta={{ label: 'View case studies', url: '/research' }}
      />
    </>
  );
}
