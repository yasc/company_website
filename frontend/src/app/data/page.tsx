import { getDatasets } from '@/lib/strapiClient';
import { Container } from '@/components/ui/Container';
import { Card, CardTitle, CardDescription } from '@/components/ui/Card';
import { CtaBand } from '@/components/sections';
import Link from 'next/link';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface StrapiResponse {
  data?: any[];
  meta?: any;
}

interface Dataset {
  id: number;
  title: string;
  slug: string;
  description: string;
  accessType: 'open' | 'commercial';
  coverageTimePeriod?: string;
  coverageGeography?: string;
  updateFrequency?: string;
  featured?: boolean;
}

// Fallback datasets
const fallbackDatasets: Dataset[] = [
  {
    id: 1,
    title: 'AIPNET — AI-Generated Production Network',
    slug: 'aipnet',
    description: 'A generative AI map of global production, connecting 5,000+ products through their input-output relationships. Built using an ensemble of prompt-tuned generative AI classifications.',
    accessType: 'commercial',
    coverageTimePeriod: 'Updated annually',
    coverageGeography: 'Global (5,000+ product classifications)',
    updateFrequency: 'Annual',
    featured: true,
  },
  {
    id: 2,
    title: 'Work from Home Map',
    slug: 'wfh-map',
    description: 'The definitive measurement of remote work, built from 250M+ job vacancy postings across five English-speaking countries. Uses a state-of-the-art NLP framework achieving 99% classification accuracy.',
    accessType: 'commercial',
    coverageTimePeriod: '2019–present',
    coverageGeography: 'US, UK, Canada, Australia, New Zealand',
    updateFrequency: 'Ongoing',
    featured: true,
  },
  {
    id: 3,
    title: 'Machinery of Progress',
    slug: 'machinery-of-progress',
    description: 'A highly granular measurement of capital equipment transactions in the US economy. 50 million transactions extracted from administrative filings using agentic AI, covering IT equipment, heavy machinery, agricultural tools, vehicles, robotics, and more.',
    accessType: 'commercial',
    coverageTimePeriod: '1998–2024',
    coverageGeography: 'United States (5 large states)',
    updateFrequency: 'Annual',
    featured: true,
  },
  {
    id: 4,
    title: 'Bad Bank, Bad Luck',
    slug: 'bad-bank',
    description: 'A novel dataset on the credit relationships of 1.8 million US firms, predominantly small and medium-sized enterprises. Built by digitising and standardising 40M+ archival loan documents using LLM tools.',
    accessType: 'commercial',
    coverageTimePeriod: '2000–present',
    coverageGeography: 'United States',
    updateFrequency: 'Annual',
    featured: true,
  },
];

const accessTypeLabels: Record<string, string> = {
  open: 'Open Access',
  commercial: 'Commercial',
};

const accessTypeColors: Record<string, string> = {
  open: 'bg-green-100 text-green-800',
  commercial: 'bg-purple-100 text-purple-800',
};

export default async function DataPage() {
  let datasets = fallbackDatasets;

  try {
    const response = (await getDatasets()) as StrapiResponse;
    if (response?.data && response.data.length > 0) {
      datasets = response.data.map((d: any) => ({
        id: d.id,
        title: d.title || 'Dataset',
        slug: d.slug || '',
        description: d.description || '',
        accessType: d.accessType || 'open',
        coverageTimePeriod: d.coverageTimePeriod || '',
        coverageGeography: d.coverageGeography || '',
        updateFrequency: d.updateFrequency || '',
        featured: d.featured || false,
      }));
    }
  } catch (error) {
    console.log('Strapi not available, using fallback datasets');
  }

  return (
    <>
      {/* Showcase Hero */}
      <section className="bg-white pt-20 lg:pt-32 pb-16 lg:pb-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Text — Left */}
            <div>
              <p className="text-label mb-6">Data Products</p>
              <h1 className="text-h1 mb-6">
                Datasets built at a scale traditional statistics cannot reach
              </h1>
              <p className="text-body-lg text-slate-600 max-w-xl">
                Novel economic measurement from hundreds of millions of records, constructed with frontier AI and validated by domain experts.
              </p>
            </div>

            {/* Key Stats — Right */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:pt-4">
              <div>
                <span className="block font-mono text-4xl lg:text-5xl font-semibold text-teal tracking-tight">250M+</span>
                <span className="text-label mt-2 block">Records processed</span>
              </div>
              <div>
                <span className="block font-mono text-4xl lg:text-5xl font-semibold text-teal tracking-tight">5,000+</span>
                <span className="text-label mt-2 block">Product nodes</span>
              </div>
              <div>
                <span className="block font-mono text-4xl lg:text-5xl font-semibold text-teal tracking-tight">1.8M</span>
                <span className="text-label mt-2 block">Firms mapped</span>
              </div>
              <div>
                <span className="block font-mono text-4xl lg:text-5xl font-semibold text-teal tracking-tight">5</span>
                <span className="text-label mt-2 block">Countries covered</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* All Datasets */}
      <section className="py-16 lg:py-24">
        <Container>
          <h2 className="text-h2 text-navy-800 mb-4">Flagship Datasets</h2>
          <p className="text-body text-gray-500 mb-8 max-w-3xl">
            Each dataset is built from unconventional, large-scale sources using frontier AI. Available via licensing and subscription, with public preview datasets for researchers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {datasets.map((dataset) => (
              <Link key={dataset.id} href={`/data/${dataset.slug}`}>
                <Card className="h-full hover:border-teal-500 transition-colors">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span
                      className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                        accessTypeColors[dataset.accessType]
                      }`}
                    >
                      {accessTypeLabels[dataset.accessType]}
                    </span>
                    {dataset.updateFrequency && (
                      <span className="text-small text-gray-500">
                        Updated {dataset.updateFrequency}
                      </span>
                    )}
                  </div>
                  <CardTitle>{dataset.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {dataset.description}
                  </CardDescription>
                  {(dataset.coverageTimePeriod || dataset.coverageGeography) && (
                    <div className="mt-4 flex flex-wrap gap-4 text-small text-gray-500">
                      {dataset.coverageTimePeriod && (
                        <span>{dataset.coverageTimePeriod}</span>
                      )}
                      {dataset.coverageGeography && (
                        <span>{dataset.coverageGeography}</span>
                      )}
                    </div>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Band */}
      <CtaBand
        headline="Need a custom dataset?"
        subheadline="We build bespoke structured datasets from unstructured sources. Tell us about your data challenge."
        primaryCta={{ label: 'Get in touch', url: '/contact' }}
      />
    </>
  );
}
