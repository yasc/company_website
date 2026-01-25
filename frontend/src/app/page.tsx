import { getHomePage, getServices } from '@/lib/strapiClient';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card, CardTitle, CardDescription } from '@/components/ui/Card';
import { Hero, CtaBand, SectionHeader } from '@/components/sections';
import Link from 'next/link';

// Strapi response types (simplified)
/* eslint-disable @typescript-eslint/no-explicit-any */
interface StrapiResponse {
  data?: any;
  meta?: any;
}

// Fallback content when Strapi is empty
const fallbackHero = {
  headline: 'Economics research that drives real-world impact',
  subheadline:
    'We combine rigorous economic analysis with data science to help organizations make better decisions and create measurable outcomes.',
  primaryCta: { label: 'Work with us', url: '/contact' },
  secondaryCta: { label: 'View our research', url: '/research' },
};

const fallbackServices = [
  {
    id: 1,
    title: 'Economic Consulting',
    shortDescription: 'Expert analysis and strategic advice for complex economic challenges.',
    slug: 'consulting',
  },
  {
    id: 2,
    title: 'Data Products',
    shortDescription: 'High-quality datasets and analytical tools for evidence-based decisions.',
    slug: 'data-products',
  },
  {
    id: 3,
    title: 'Policy Research',
    shortDescription: 'Rigorous research that informs public policy and industry practice.',
    slug: 'policy-research',
  },
];

const fallbackCta = {
  headline: 'Ready to work together?',
  subheadline: "Let's discuss how we can help your organization.",
  primaryCta: { label: 'Contact us', url: '/contact' },
  secondaryCta: { label: 'Join our team', url: '/careers' },
};

export default async function Home() {
  // Try to fetch data from Strapi
  let homePageData: StrapiResponse | null = null;
  let services = fallbackServices;

  try {
    homePageData = await getHomePage() as StrapiResponse;
    const servicesResponse = await getServices({ pagination: { pageSize: 3 } }) as StrapiResponse;
    if (servicesResponse?.data?.length > 0) {
      services = servicesResponse.data.map((s: any) => ({
        id: s.id,
        title: s.title || 'Service',
        shortDescription: s.shortDescription || '',
        slug: s.slug || '',
      }));
    }
  } catch (error) {
    console.log('Strapi not available, using fallback content');
  }

  // Extract data from Strapi response or use fallbacks
  const hero = homePageData?.data?.hero
    ? {
        headline: homePageData.data.hero.headline || fallbackHero.headline,
        subheadline: homePageData.data.hero.subheadline || fallbackHero.subheadline,
        primaryCta: homePageData.data.hero.primaryCta
          ? {
              label: homePageData.data.hero.primaryCta.label,
              url: homePageData.data.hero.primaryCta.url,
            }
          : fallbackHero.primaryCta,
        secondaryCta: homePageData.data.hero.secondaryCta
          ? {
              label: homePageData.data.hero.secondaryCta.label,
              url: homePageData.data.hero.secondaryCta.url,
            }
          : fallbackHero.secondaryCta,
      }
    : fallbackHero;

  const servicesSection = homePageData?.data?.servicesSection
    ? {
        title: homePageData.data.servicesSection.title || 'What we do',
        subtitle: homePageData.data.servicesSection.subtitle || 'Our expertise spans economic consulting, data analysis, and policy research.',
      }
    : {
        title: 'What we do',
        subtitle: 'Our expertise spans economic consulting, data analysis, and policy research.',
      };

  const ctaBand = homePageData?.data
    ? {
        headline: homePageData.data.ctaBandHeadline || fallbackCta.headline,
        subheadline: fallbackCta.subheadline,
        primaryCta: homePageData.data.ctaBandPrimaryCta
          ? {
              label: homePageData.data.ctaBandPrimaryCta.label,
              url: homePageData.data.ctaBandPrimaryCta.url,
            }
          : fallbackCta.primaryCta,
        secondaryCta: homePageData.data.ctaBandSecondaryCta
          ? {
              label: homePageData.data.ctaBandSecondaryCta.label,
              url: homePageData.data.ctaBandSecondaryCta.url,
            }
          : fallbackCta.secondaryCta,
      }
    : fallbackCta;

  return (
    <>
      {/* Hero Section */}
      <Hero
        headline={hero.headline}
        subheadline={hero.subheadline}
        primaryCta={hero.primaryCta}
        secondaryCta={hero.secondaryCta}
        variant="dark"
      />

      {/* Services Preview Section */}
      <section className="py-16 lg:py-24">
        <Container>
          <SectionHeader
            title={servicesSection.title}
            subtitle={servicesSection.subtitle}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link key={service.id} href={`/services/${service.slug}`}>
                <Card className="h-full">
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.shortDescription}</CardDescription>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <Link href="/services">
              <Button variant="secondary">Explore all services</Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* CTA Band */}
      <CtaBand
        headline={ctaBand.headline}
        subheadline={ctaBand.subheadline}
        primaryCta={ctaBand.primaryCta}
        secondaryCta={ctaBand.secondaryCta}
        variant="dark"
      />
    </>
  );
}
