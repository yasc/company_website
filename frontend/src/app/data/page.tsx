import { getDatasets } from '@/lib/strapiClient';
import { Container } from '@/components/ui/Container';
import { Card, CardTitle, CardDescription } from '@/components/ui/Card';
import { Hero, CtaBand } from '@/components/sections';
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
    title: 'US Labor Market Indicators',
    slug: 'us-labor-market-indicators',
    description: 'Comprehensive monthly indicators of US labor market conditions including employment, wages, and job openings across industries and regions.',
    accessType: 'open',
    coverageTimePeriod: '2000-present',
    coverageGeography: 'United States (state-level)',
    updateFrequency: 'Monthly',
    featured: true,
  },
  {
    id: 2,
    title: 'Global Trade Flow Database',
    slug: 'global-trade-flow-database',
    description: 'Bilateral trade flows between countries covering goods and services, with harmonized product classifications and value/volume measures.',
    accessType: 'commercial',
    coverageTimePeriod: '1990-present',
    coverageGeography: 'Global (190+ countries)',
    updateFrequency: 'Annual',
    featured: true,
  },
  {
    id: 3,
    title: 'Housing Market Index',
    slug: 'housing-market-index',
    description: 'Metropolitan-level housing price indices, inventory, and market activity indicators for major US markets.',
    accessType: 'open',
    coverageTimePeriod: '2010-present',
    coverageGeography: 'United States (metro areas)',
    updateFrequency: 'Quarterly',
    featured: false,
  },
  {
    id: 4,
    title: 'Industry Concentration Metrics',
    slug: 'industry-concentration-metrics',
    description: 'Measures of market concentration including HHI, CR4, and markup estimates across NAICS industries.',
    accessType: 'commercial',
    coverageTimePeriod: '2005-present',
    coverageGeography: 'United States',
    updateFrequency: 'Annual',
    featured: false,
  },
  {
    id: 5,
    title: 'Climate Policy Database',
    slug: 'climate-policy-database',
    description: 'Comprehensive tracking of climate policies at federal, state, and local levels including carbon pricing, renewable mandates, and efficiency standards.',
    accessType: 'open',
    coverageTimePeriod: '2000-present',
    coverageGeography: 'United States',
    updateFrequency: 'Quarterly',
    featured: false,
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

  const openDatasets = datasets.filter(d => d.accessType === 'open');
  const commercialDatasets = datasets.filter(d => d.accessType === 'commercial');

  return (
    <>
      {/* Hero */}
      <Hero
        headline="Data Products"
        subheadline="Access our curated economic datasets. From open-access research data to premium commercial products, we provide the data economists and analysts need."
        variant="dark"
      />

      {/* Open Access Section */}
      <section className="py-16 lg:py-24">
        <Container>
          <h2 className="text-h2 text-navy-800 mb-4">Open Access Data</h2>
          <p className="text-body text-gray-500 mb-8 max-w-3xl">
            These datasets are freely available for research and non-commercial use.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {openDatasets.map((dataset) => (
              <Link key={dataset.id} href={`/data/${dataset.slug}`}>
                <Card className="h-full hover:border-teal-500 transition-colors">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
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
                        <span>📅 {dataset.coverageTimePeriod}</span>
                      )}
                      {dataset.coverageGeography && (
                        <span>🌍 {dataset.coverageGeography}</span>
                      )}
                    </div>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Commercial Data Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <Container>
          <h2 className="text-h2 text-navy-800 mb-4">Commercial Data Products</h2>
          <p className="text-body text-gray-500 mb-8 max-w-3xl">
            Premium datasets with enhanced coverage, granularity, and support. Contact us for licensing information.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {commercialDatasets.map((dataset) => (
              <Link key={dataset.id} href={`/data/${dataset.slug}`}>
                <Card className="h-full hover:border-teal-500 transition-colors">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
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
                        <span>📅 {dataset.coverageTimePeriod}</span>
                      )}
                      {dataset.coverageGeography && (
                        <span>🌍 {dataset.coverageGeography}</span>
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
        headline="Need custom data?"
        subheadline="We can create tailored datasets for your specific research or business needs."
        primaryCta={{ label: 'Contact us', url: '/contact' }}
        variant="dark"
      />
    </>
  );
}
