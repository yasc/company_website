import { getLabPage, getGuides } from '@/lib/strapiClient';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card, CardTitle, CardDescription } from '@/components/ui/Card';
import { ContentBlock, CtaBand } from '@/components/sections';
import { HeroGraphic } from '@/components/sections/HeroGraphic';
import Link from 'next/link';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface StrapiResponse {
  data?: any;
  meta?: any;
}

interface Guide {
  id: number;
  title: string;
  slug: string;
  summary: string;
}

// Fallback content
const fallbackHero = {
  headline: 'The AEAI Lab',
  subheadline: 'Advancing economic measurement with frontier AI. Open-access research, training resources, and a summer fellowship for early-career researchers.',
};

const fallbackAbout = {
  title: 'About the Lab',
  content: `The Applied Economics AI Lab was founded in 2022 at the LSE Centre for Economic Performance. Our mission is to advance research in economics using novel Big Data and AI/ML tools.

We build large open-access datasets from unconventional sources that help inform academic and policy research on a wide range of topics. We publish data insights, develop publicly available guides for using advanced computational tools and generative AI in economics research, and operate an annual summer fellowship programme to train research fellows in cutting-edge methodologies.`,
};

const fallbackFellowship = {
  title: 'Summer Fellowship',
  content: `Our annual summer fellowship programme brings together talented early-career researchers for intensive training in frontier AI and data methodologies applied to economics.

Fellows work alongside our senior researchers on real data construction and analysis projects, gaining hands-on experience with large language models, NLP pipelines, cloud computing, and reproducible research workflows. The programme is designed to bridge the gap between academic training and the practical skills needed to work with modern AI tools in economics research.`,
  ctaLabel: 'Enquire about the fellowship',
  ctaUrl: '/contact',
};

const fallbackGuides: Guide[] = [
  {
    id: 1,
    title: 'Using Generative AI in Economics Research',
    slug: 'generative-ai-economics',
    summary: 'A practical guide to deploying large language models for data extraction, classification, and construction in applied economics research.',
  },
  {
    id: 2,
    title: 'Cloud Computing for Economists',
    slug: 'cloud-computing',
    summary: 'Setting up and using cloud infrastructure for large-scale data processing — from basic compute instances to distributed pipelines.',
  },
  {
    id: 3,
    title: 'Working with Administrative Data',
    slug: 'administrative-data',
    summary: 'Best practices for using administrative records in economic research, including data access, linking, and common pitfalls.',
  },
  {
    id: 4,
    title: 'Reproducible Research Workflows',
    slug: 'reproducible-workflows',
    summary: 'How to structure your research project for reproducibility using version control, containerisation, and documentation standards.',
  },
];

export default async function LabPage() {
  let heroContent = fallbackHero;
  let aboutContent = fallbackAbout;
  let fellowshipContent = fallbackFellowship;
  let guides = fallbackGuides;

  try {
    const [labPageResponse, guidesResponse] = await Promise.all([
      getLabPage() as Promise<StrapiResponse>,
      getGuides({ sort: 'order:asc' }) as Promise<StrapiResponse>,
    ]);

    if (labPageResponse?.data?.hero) {
      heroContent = {
        headline: labPageResponse.data.hero.headline || fallbackHero.headline,
        subheadline: labPageResponse.data.hero.subheadline || fallbackHero.subheadline,
      };
    }

    if (labPageResponse?.data?.aboutTitle) {
      aboutContent = {
        title: labPageResponse.data.aboutTitle || fallbackAbout.title,
        content: labPageResponse.data.aboutContent || fallbackAbout.content,
      };
    }

    if (labPageResponse?.data?.fellowshipTitle) {
      fellowshipContent = {
        title: labPageResponse.data.fellowshipTitle || fallbackFellowship.title,
        content: labPageResponse.data.fellowshipContent || fallbackFellowship.content,
        ctaLabel: labPageResponse.data.fellowshipCta?.label || fallbackFellowship.ctaLabel,
        ctaUrl: labPageResponse.data.fellowshipCta?.url || fallbackFellowship.ctaUrl,
      };
    }

    if (guidesResponse?.data && guidesResponse.data.length > 0) {
      guides = guidesResponse.data.map((g: any) => ({
        id: g.id,
        title: g.title || 'Guide',
        slug: g.slug || '',
        summary: g.summary || '',
      }));
    }
  } catch (error) {
    console.log('Strapi not available, using fallback content');
  }

  return (
    <>
      {/* Mission Banner Hero */}
      <section className="relative bg-charcoal overflow-hidden">
        {/* D3 interactive mesh background */}
        <div className="absolute inset-0 opacity-30">
          <HeroGraphic />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 pt-28 lg:pt-40 pb-16 lg:pb-24">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <p className="font-mono text-2xl uppercase tracking-widest text-teal mb-6">
                The AEAI Lab
              </p>
              <h1 className="text-h1 text-white mb-6">
                {heroContent.headline === 'The AEAI Lab'
                  ? 'Advancing economic measurement with frontier AI'
                  : heroContent.headline}
              </h1>
              <p className="text-body-lg text-slate-400 max-w-2xl mx-auto mb-10">
                {heroContent.subheadline}
              </p>

            </div>
          </Container>
        </div>
      </section>

      {/* About Section */}
      <ContentBlock title={aboutContent.title} id="about">
        {aboutContent.content.split('\n\n').map((paragraph: string, i: number) => (
          <p key={i}>{paragraph}</p>
        ))}
      </ContentBlock>

      {/* Guides Section */}
      <section id="guides" className="py-16 lg:py-24 bg-gray-50">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-4">
            <div>
              <h2 className="text-h2 text-navy-800 mb-2">Methodological Guides</h2>
              <p className="text-body text-gray-500">
                Practical tutorials and reference materials for applied economists.
              </p>
            </div>
            <Link href="/lab/guides">
              <Button variant="secondary">View all guides</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.slice(0, 4).map((guide) => (
              <Link key={guide.id} href={`/lab/guides/${guide.slug}`}>
                <Card className="h-full hover:border-teal-500 transition-colors">
                  <CardTitle>{guide.title}</CardTitle>
                  <CardDescription className="mt-2">{guide.summary}</CardDescription>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Fellowship Section */}
      <section id="fellowship" className="py-16 lg:py-24">
        <Container size="narrow">
          <h2 className="text-h2 text-navy-800 mb-6">{fellowshipContent.title}</h2>
          <div className="prose prose-lg max-w-none text-gray-600 mb-8">
            {fellowshipContent.content.split('\n\n').map((paragraph: string, i: number) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <Link href={fellowshipContent.ctaUrl}>
            <Button variant="primary" size="lg">
              {fellowshipContent.ctaLabel}
            </Button>
          </Link>
        </Container>
      </section>

      {/* CTA Band */}
      <CtaBand
        headline="Want to contribute?"
        subheadline="We welcome contributions to our guides and open-source projects."
        primaryCta={{ label: 'Get in touch', url: '/contact' }}
      />
    </>
  );
}
