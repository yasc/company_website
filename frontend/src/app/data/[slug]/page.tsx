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
  'aipnet': {
    title: 'AIPNET — AI-Generated Production Network',
    description: 'A generative AI map of global production, connecting 5,000+ products through their input-output relationships in a directed network.',
    accessType: 'commercial',
    coverageTimePeriod: 'Updated annually',
    coverageGeography: 'Global (5,000+ product classifications)',
    granularity: 'Product-pair level, directed edges',
    updateFrequency: 'Annual',
    methodology: `AIPNET uses a two-step "build-prune" approach with an ensemble of prompt-tuned generative AI classifications to construct a production network over 5,000+ product nodes.

In the "build" step, generative AI provides an initial distribution of edge predictions representing input-output relationships between products. The "prune" step then re-evaluates all edges to improve precision. The resulting network captures directed relationships — which products serve as inputs to which other products in the global production process.

The dataset enables research on production network spillovers, global trade structure, on-shoring dynamics, industrial policy, and other shifts in the global economy. We document shifts in the network position of products and countries during the 21st century, and validate the network using the natural experiment presented by the 2017 blockade of Qatar.`,
    license: 'Commercial license. Public preview dataset available for academic research. Contact us for full licensing.',
  },
  'wfh-map': {
    title: 'Work from Home Map',
    description: 'The definitive measurement of remote and hybrid work, built from 250M+ job vacancy postings across five English-speaking countries using state-of-the-art NLP.',
    accessType: 'commercial',
    coverageTimePeriod: '2019–present',
    coverageGeography: 'US, UK, Canada, Australia, New Zealand',
    granularity: 'City × Industry × Occupation × Company level',
    updateFrequency: 'Ongoing',
    methodology: `The Work from Home Map analyses more than 250 million job vacancy postings across five English-speaking countries. Our state-of-the-art language-processing framework was fit, tested, and refined using 30,000 human classifications.

The classifier achieves 99% accuracy in flagging job postings that advertise hybrid or fully remote work, greatly outperforming dictionary methods and other machine learning approaches.

The data reveals that from 2019 to early 2023, the share of postings offering remote work rose more than three-fold in the US and by a factor of five or more in Australia, Canada, New Zealand, and the UK. These developments are highly non-uniform across and within cities, industries, occupations, and companies.`,
    license: 'Commercial license. Contact us for pricing and academic access.',
  },
  'machinery-of-progress': {
    title: 'Machinery of Progress',
    description: 'A highly granular measurement of capital equipment transactions across the US economy — 50 million transactions extracted from administrative filings using agentic AI.',
    accessType: 'commercial',
    coverageTimePeriod: '1998–2024',
    coverageGeography: 'United States (5 large states)',
    granularity: 'Equipment-level (make, model, characteristics, prices)',
    updateFrequency: 'Annual',
    methodology: `The Machinery of Progress dataset is constructed by digitising archival administrative filings from 1998 to 2024 and extracting 50 million capital equipment transactions from five large US states.

We deploy an "agentic AI" measurement approach, where multiple AI agents collaborate to build and validate the data. Specialised agents handle document parsing, entity extraction, classification, and quality checking in a coordinated pipeline.

The final dataset contains the make and model of millions of pieces of equipment — IT equipment, heavy machinery, agricultural tools, vehicles, robotics, CNC machines, and more — along with equipment-level characteristics including time-varying prices. This enables research on technological progress, innovation diffusion, and capital investment patterns at unprecedented granularity.`,
    license: 'Commercial license. Public preview dataset available soon. Contact us for licensing.',
  },
  'bad-bank': {
    title: 'US Firm-Lender Credit Map',
    description: 'A novel dataset on the credit relationships of 1.8 million US firms, built by digitising and standardising 40M+ archival loan documents using LLM tools.',
    accessType: 'commercial',
    coverageTimePeriod: '2000–present',
    coverageGeography: 'United States',
    granularity: 'Firm × Lender relationship level',
    updateFrequency: 'Annual',
    methodology: `We deploy Big Data and Large Language Model tools to digitise and standardise over 40 million archival loan documents containing detailed information on lending relationships between firms and their creditors in the United States.

The resulting dataset covers 1.8 million US firms, predominantly composed of small and medium-sized enterprises (SMEs) — a firm size segment that has been historically difficult to study due to data limitations.

The data includes detailed information on credit relationships, enabling research on the real effects of financial shocks on firm performance. Our analysis of 179 bank failures from 1990 to 2023 reveals that firms with a credit relationship to a failed bank are 6.7 percentage points (44.3%) more likely to fail themselves within five years, with surviving firms exhibiting 25% lower employment growth.`,
    license: 'Commercial license. Contact us for pricing and academic access.',
  },
};

const genericFallback = {
  title: 'Dataset',
  description: 'Novel economic dataset built using frontier AI methods.',
  accessType: 'commercial',
  methodology: 'Methodology documentation coming soon.',
  license: 'Contact us at team@appliedeconomics.ai for licensing information.',
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
      <section className="bg-charcoal pt-24 lg:pt-32 pb-16 lg:pb-24">
        <Container>
          <div className="max-w-4xl">
            {/* Access Badge */}
            <span
              className={`inline-block px-3 py-1 text-sm font-medium rounded-full mb-6 ${
                accessTypeColors[dataset.accessType]
              }`}
            >
              {accessTypeLabels[dataset.accessType]}
            </span>

            <h1 className="text-display text-white mb-6">{dataset.title}</h1>
            <p className="text-body-lg text-slate-400">{dataset.description}</p>

            {/* Action button */}
            <div className="mt-10">
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
          <h2 className="text-h2 text-charcoal mb-8">Data Specifications</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dataset.coverageTimePeriod && (
              <div className="bg-slate-50 border border-slate-200 p-6">
                <h3 className="text-label mb-2">Time Coverage</h3>
                <p className="text-h3">{dataset.coverageTimePeriod}</p>
              </div>
            )}
            {dataset.coverageGeography && (
              <div className="bg-slate-50 border border-slate-200 p-6">
                <h3 className="text-label mb-2">Geographic Coverage</h3>
                <p className="text-h3">{dataset.coverageGeography}</p>
              </div>
            )}
            {dataset.granularity && (
              <div className="bg-slate-50 border border-slate-200 p-6">
                <h3 className="text-label mb-2">Granularity</h3>
                <p className="text-h3">{dataset.granularity}</p>
              </div>
            )}
            {dataset.updateFrequency && (
              <div className="bg-slate-50 border border-slate-200 p-6">
                <h3 className="text-label mb-2">Update Frequency</h3>
                <p className="text-h3">{dataset.updateFrequency}</p>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Methodology */}
      {dataset.methodology && (
        <ContentBlock title="Methodology" background="gray" size="default">
          {dataset.methodology.split('\n\n').map((paragraph: string, i: number) => (
            <p key={i}>{paragraph}</p>
          ))}
        </ContentBlock>
      )}

      {/* License */}
      {dataset.license && (
        <section className="py-16 lg:py-24">
          <Container>
            <h2 className="text-h2 text-charcoal mb-6">License & Terms</h2>
            <div className="bg-slate-50 border border-slate-200 p-8">
              <p className="text-body-lg">{dataset.license}</p>
            </div>
          </Container>
        </section>
      )}

      {/* Back link */}
      <section className="py-10 bg-slate-50">
        <Container>
          <Link href="/data" className="link-explore text-body-lg">
            ← Back to all datasets
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
