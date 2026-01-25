import { getLabPage, getGuides } from '@/lib/strapiClient';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card, CardTitle, CardDescription } from '@/components/ui/Card';
import { Hero, ContentBlock, CtaBand } from '@/components/sections';
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
  headline: 'Economics Lab',
  subheadline: 'A hub for applied research methods, reproducible workflows, and open-source tools for economists and data scientists.',
};

const fallbackAbout = {
  title: 'About the Lab',
  content: `The Applied Economics Lab is our initiative to advance the practice of applied economics through open science, reproducible research, and knowledge sharing.

We develop and maintain open-source tools, publish methodological guides, and run fellowship programs for early-career researchers. Our goal is to make rigorous economic analysis more accessible and transparent.`,
};

const fallbackFellowship = {
  title: 'Fellowship Program',
  content: `Our fellowship program brings together talented early-career economists for intensive research collaborations. Fellows work alongside our senior researchers on real projects while developing their technical and methodological skills.

The program runs annually, with applications opening each January. Fellows receive a competitive stipend and access to our computing resources and data products.`,
  ctaLabel: 'Learn about fellowship',
  ctaUrl: '/contact',
};

const fallbackGuides: Guide[] = [
  {
    id: 1,
    title: 'Introduction to Causal Inference',
    slug: 'intro-causal-inference',
    summary: 'A practical guide to causal inference methods for applied economists, covering selection on observables, instrumental variables, regression discontinuity, and difference-in-differences.',
  },
  {
    id: 2,
    title: 'Working with Administrative Data',
    slug: 'administrative-data',
    summary: 'Best practices for using administrative records in economic research, including data access, linking, and common pitfalls.',
  },
  {
    id: 3,
    title: 'Reproducible Research Workflows',
    slug: 'reproducible-workflows',
    summary: 'How to structure your research project for reproducibility using version control, containerization, and documentation standards.',
  },
  {
    id: 4,
    title: 'Machine Learning for Economists',
    slug: 'ml-for-economists',
    summary: 'An introduction to machine learning methods relevant for economic research, with emphasis on prediction vs. causal inference.',
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
      {/* Hero */}
      <Hero
        headline={heroContent.headline}
        subheadline={heroContent.subheadline}
        variant="dark"
      />

      {/* About Section */}
      <ContentBlock title={aboutContent.title}>
        {aboutContent.content.split('\n\n').map((paragraph: string, i: number) => (
          <p key={i}>{paragraph}</p>
        ))}
      </ContentBlock>

      {/* Guides Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
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
      <section className="py-16 lg:py-24">
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
        variant="dark"
      />
    </>
  );
}
