import { getDatasetBySlug } from '@/lib/strapiClient';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ContentBlock, CtaBand } from '@/components/sections';
import Link from 'next/link';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface StrapiResponse {
  data?: any[];
  meta?: any;
}

// Fallback dataset data
const fallbackDatasets: Record<string, any> = {
  'us-labor-market-indicators': {
    title: 'US Labor Market Indicators',
    description: 'Comprehensive monthly indicators of US labor market conditions including employment, wages, and job openings across industries and regions.',
    accessType: 'open',
    coverageTimePeriod: '2000-present',
    coverageGeography: 'United States (state-level)',
    granularity: 'Monthly, State × Industry',
    updateFrequency: 'Monthly',
    methodology: `This dataset combines data from multiple official sources including the Bureau of Labor Statistics (BLS), Current Employment Statistics (CES), and Job Openings and Labor Turnover Survey (JOLTS).

We apply seasonal adjustment using X-13ARIMA-SEATS and harmonize industry classifications across time to ensure consistent time series.

The dataset includes employment levels, employment changes, average hourly earnings, average weekly hours, job openings, hires, and separations.`,
    license: 'Creative Commons Attribution 4.0 International (CC BY 4.0)',
    downloadLink: '#',
  },
  'global-trade-flow-database': {
    title: 'Global Trade Flow Database',
    description: 'Bilateral trade flows between countries covering goods and services, with harmonized product classifications and value/volume measures.',
    accessType: 'commercial',
    coverageTimePeriod: '1990-present',
    coverageGeography: 'Global (190+ countries)',
    granularity: 'Annual, Country-pair × HS6 Product',
    updateFrequency: 'Annual',
    methodology: `The Global Trade Flow Database combines data from UN Comtrade, Eurostat, and national statistical agencies. We apply mirror trade imputation to fill gaps and reconcile discrepancies between reported imports and exports.

Product classifications are harmonized to HS 2017 across all years. Value data is reported in current USD and constant 2015 USD.

The database includes bilateral trade values, trade quantities (where available), estimated tariff rates, and distance and common-language indicators.`,
    license: 'Commercial license required. Contact us for pricing.',
  },
  'housing-market-index': {
    title: 'Housing Market Index',
    description: 'Metropolitan-level housing price indices, inventory, and market activity indicators for major US markets.',
    accessType: 'open',
    coverageTimePeriod: '2010-present',
    coverageGeography: 'United States (metro areas)',
    granularity: 'Quarterly, Metropolitan Statistical Area',
    updateFrequency: 'Quarterly',
    methodology: `Our Housing Market Index combines data from the Federal Housing Finance Agency (FHFA), Zillow, and Census Bureau sources.

The price index uses a repeat-sales methodology to control for housing quality changes. We also calculate inventory metrics including months of supply, days on market, and listing-to-sale price ratios.

All metropolitan areas with populations over 500,000 are included.`,
    license: 'Creative Commons Attribution 4.0 International (CC BY 4.0)',
    downloadLink: '#',
  },
};

const genericFallback = {
  title: 'Dataset',
  description: 'Economic dataset providing valuable insights for research and analysis.',
  accessType: 'open',
  methodology: 'Methodology documentation coming soon.',
  license: 'Please contact us for licensing information.',
};

const accessTypeLabels: Record<string, string> = {
  open: 'Open Access',
  commercial: 'Commercial',
};

const accessTypeColors: Record<string, string> = {
  open: 'bg-green-100 text-green-800',
  commercial: 'bg-purple-100 text-purple-800',
};

interface DatasetPageProps {
  params: Promise<{ slug: string }>;
}

export default async function DatasetDetailPage({ params }: DatasetPageProps) {
  const { slug } = await params;
  
  let dataset = null;

  try {
    const response = (await getDatasetBySlug(slug)) as StrapiResponse;
    if (response?.data && response.data.length > 0) {
      const d = response.data[0];
      dataset = {
        title: d.title,
        description: d.description,
        accessType: d.accessType,
        coverageTimePeriod: d.coverageTimePeriod,
        coverageGeography: d.coverageGeography,
        granularity: d.granularity,
        updateFrequency: d.updateFrequency,
        methodology: d.methodology,
        license: d.license,
        downloadLink: d.downloadLink,
      };
    }
  } catch (error) {
    console.log('Strapi not available, using fallback data');
  }

  // Use fallback if no Strapi data
  if (!dataset) {
    dataset = fallbackDatasets[slug] || {
      ...genericFallback,
      title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    };
  }

  if (!dataset) {
    notFound();
  }

  const isOpen = dataset.accessType === 'open';

  return (
    <>
      {/* Hero */}
      <section className="bg-navy-900 dark-bg py-16 lg:py-24">
        <Container>
          <div className="max-w-4xl">
            {/* Access Badge */}
            <span
              className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-4 ${
                accessTypeColors[dataset.accessType]
              }`}
            >
              {accessTypeLabels[dataset.accessType]}
            </span>

            <h1 className="text-display text-white mb-6">{dataset.title}</h1>
            <p className="text-body-large text-gray-300">{dataset.description}</p>

            {/* Action button */}
            <div className="mt-8">
              {isOpen && dataset.downloadLink ? (
                <a href={dataset.downloadLink}>
                  <Button variant="primary" size="lg">
                    Download Dataset
                  </Button>
                </a>
              ) : (
                <Link href="/contact">
                  <Button variant="primary" size="lg">
                    Request Access
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Data Specifications */}
      <section className="py-16 lg:py-24">
        <Container>
          <h2 className="text-h2 text-navy-800 mb-8">Data Specifications</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dataset.coverageTimePeriod && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-caption uppercase tracking-wider text-gray-500 mb-2">
                  Time Coverage
                </h3>
                <p className="text-h4 text-navy-800">{dataset.coverageTimePeriod}</p>
              </div>
            )}
            {dataset.coverageGeography && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-caption uppercase tracking-wider text-gray-500 mb-2">
                  Geographic Coverage
                </h3>
                <p className="text-h4 text-navy-800">{dataset.coverageGeography}</p>
              </div>
            )}
            {dataset.granularity && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-caption uppercase tracking-wider text-gray-500 mb-2">
                  Granularity
                </h3>
                <p className="text-h4 text-navy-800">{dataset.granularity}</p>
              </div>
            )}
            {dataset.updateFrequency && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-caption uppercase tracking-wider text-gray-500 mb-2">
                  Update Frequency
                </h3>
                <p className="text-h4 text-navy-800">{dataset.updateFrequency}</p>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Methodology */}
      {dataset.methodology && (
        <ContentBlock title="Methodology" background="gray">
          {dataset.methodology.split('\n\n').map((paragraph: string, i: number) => (
            <p key={i}>{paragraph}</p>
          ))}
        </ContentBlock>
      )}

      {/* License */}
      {dataset.license && (
        <section className="py-16 lg:py-24">
          <Container size="narrow">
            <h2 className="text-h2 text-navy-800 mb-6">License & Terms</h2>
            <div className="bg-gray-100 rounded-lg p-6">
              <p className="text-body text-gray-700">{dataset.license}</p>
            </div>
          </Container>
        </section>
      )}

      {/* Back link */}
      <section className="py-8 bg-gray-50">
        <Container>
          <Link href="/data">
            <Button variant="ghost">← Back to all datasets</Button>
          </Link>
        </Container>
      </section>

      {/* CTA Band */}
      <CtaBand
        headline="Questions about this data?"
        subheadline="Our team can help you understand and work with this dataset."
        primaryCta={{ label: 'Contact us', url: '/contact' }}
      />
    </>
  );
}
