import { getPapers } from '@/lib/strapiClient';
import { Container } from '@/components/ui/Container';
import { CtaBand } from '@/components/sections';
import Link from 'next/link';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface StrapiResponse {
  data?: any[];
  meta?: any;
}

interface Paper {
  id: number;
  title: string;
  slug: string;
  abstract?: string;
  status: 'working_paper' | 'published' | 'policy_brief';
  publicationVenue?: string;
  publicationDate?: string;
  authors?: string[];
  featured?: boolean;
}

// Fallback papers
const fallbackPapers: Paper[] = [
  {
    id: 1,
    title: 'AI-Generated Production Networks: Measurement and Applications to Global Trade',
    slug: 'aipnet',
    abstract: 'This paper leverages generative AI to build a network structure over 5,000 product nodes, where directed edges represent input-output relationships in production. We lay out a two-step build-prune approach using an ensemble of prompt-tuned generative AI classifications, document shifts in the network position of products and countries during the 21st century, and study production network spillovers using the 2017 blockade of Qatar.',
    status: 'working_paper',
    publicationDate: '2024-01-01',
    authors: ['Peter Lambert', 'Thiemo Fetzer', 'Bennet Feld', 'Prashant Garg'],
    featured: true,
  },
  {
    id: 2,
    title: 'Remote Work across Jobs, Companies, and Space',
    slug: 'remote-work',
    abstract: 'We examine more than 250 million job vacancy postings across five English-speaking countries to measure the pandemic-driven shift to remote work. Our state-of-the-art NLP framework achieves 99% accuracy in flagging postings that advertise remote work, greatly outperforming dictionary and other ML methods. From 2019 to early 2023, remote work postings rose more than three-fold in the US and by a factor of five or more in Australia, Canada, New Zealand and the UK.',
    status: 'working_paper',
    publicationVenue: 'NBER Working Paper',
    publicationDate: '2023-01-01',
    authors: ['Peter Lambert', 'Stephen Hansen', 'Nick Bloom', 'Steven Davis', 'Raffaella Sadun', 'Bledi Taska'],
    featured: true,
  },
  {
    id: 3,
    title: 'Bad Bank, Bad Luck? Evidence from 1 Million Firm-Lender Relationships',
    slug: 'bad-bank',
    abstract: 'We deploy Big Data and LLM tools to digitise 36 million loan records, building a novel dataset on the credit relationships of 1.8 million US firms. Using 179 bank failures from 1990 to 2023, we find that firms banking with a subsequently failed institution are 6.7 percentage points more likely to fail themselves within five years, with surviving firms exhibiting 25% lower employment growth.',
    status: 'working_paper',
    publicationDate: '2024-01-01',
    authors: ['Peter Lambert', 'Yannick Schindler'],
    featured: true,
  },
  {
    id: 4,
    title: 'Machinery of Progress: Charting the Capabilities of Capital Equipment, 1998–2023',
    slug: 'machinery-of-progress',
    abstract: 'This paper charts technological progress embodied in capital equipment. We digitise archival administrative filings from 1998 to 2024 and extract 50 million capital equipment transactions from five large US states. We deploy an agentic AI measurement approach where multiple AI agents collaborate to build and validate the data, producing equipment-level characteristics including time-varying prices.',
    status: 'working_paper',
    publicationDate: '2025-01-01',
    authors: ['Yannick Schindler', 'Peter Lambert'],
    featured: true,
  },
  {
    id: 5,
    title: 'The Macroeconomic Impact of Chronic Illness in the United Kingdom',
    slug: 'chronic-illness-uk',
    abstract: 'We quantify the macroeconomic consequences of chronic illness in the UK, combining health data with macroeconomic indicators to estimate the effects of disease burden on employment, output, and government finances.',
    status: 'published',
    publicationVenue: 'Journal of the Economics of Ageing',
    publicationDate: '2025-01-01',
    authors: ['Yannick Schindler', 'Andrew Scott'],
    featured: false,
  },
  {
    id: 6,
    title: 'Anatomy of Automation: CNC Machines and Industrial Robots in UK Manufacturing, 2005–2023',
    slug: 'anatomy-of-automation',
    abstract: 'We study the adoption and impact of CNC machines and industrial robots in UK manufacturing using novel granular data on automation equipment.',
    status: 'working_paper',
    publicationDate: '2025-01-01',
    authors: ['Peter Lambert', 'Aniket Baksy', 'Daniel Chandler'],
    featured: false,
  },
];

const statusLabels: Record<string, string> = {
  working_paper: 'Working Paper',
  published: 'Published',
  policy_brief: 'Policy Brief',
};

const statusColors: Record<string, string> = {
  working_paper: 'bg-amber-100 text-amber-800',
  published: 'bg-green-100 text-green-800',
  policy_brief: 'bg-teal-100 text-teal-800',
};

function formatDate(dateString: string | undefined): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}

export default async function ResearchPage() {
  let papers = fallbackPapers;

  try {
    const response = (await getPapers({ sort: 'publicationDate:desc' })) as StrapiResponse;
    if (response?.data && response.data.length > 0) {
      papers = response.data.map((p: any) => ({
        id: p.id,
        title: p.title || 'Untitled',
        slug: p.slug || '',
        abstract: p.abstract || '',
        status: p.status || 'working_paper',
        publicationVenue: p.publicationVenue || '',
        publicationDate: p.publicationDate || '',
        authors: p.authors?.map((a: any) => a.name) || [],
        featured: p.featured || false,
      }));
    }
  } catch (error) {
    console.log('Strapi not available, using fallback papers');
  }

  const workingPaperCount = papers.filter(p => p.status === 'working_paper').length;
  const publishedCount = papers.filter(p => p.status === 'published').length;

  return (
    <>
      {/* Editorial Hero */}
      <section className="bg-white pt-20 lg:pt-32 pb-12 lg:pb-16">
        <Container>
          <p className="font-mono text-[16px] uppercase tracking-widest text-teal mb-6">Research</p>
          <h1 className="text-h1 max-w-4xl mb-8">
            Novel AI-driven methods to measure economic activity
          </h1>
          <p className="text-body-lg max-w-2xl text-slate-600 mb-12">
            From global trade networks to labour markets, capital investment, and credit relationships — we build the measurement tools that economics has been missing.
          </p>
        </Container>
      </section>

      {/* Papers List */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="space-y-8">
            {papers.map((paper) => (
              <article
                key={paper.id}
                className="border-b border-gray-200 pb-8 last:border-b-0"
              >
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  {/* Status Badge */}
                  <span
                    className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                      statusColors[paper.status]
                    }`}
                  >
                    {statusLabels[paper.status]}
                  </span>

                  {/* Date */}
                  {paper.publicationDate && (
                    <span className="text-sm text-gray-500">
                      {formatDate(paper.publicationDate)}
                    </span>
                  )}

                  {/* Venue */}
                  {paper.publicationVenue && (
                    <span className="text-sm text-gray-500">
                      • {paper.publicationVenue}
                    </span>
                  )}
                </div>

                {/* Title */}
                <Link href={`/research/${paper.slug}`}>
                  <h2 className="text-h3 text-navy-800 hover:text-teal-600 transition-colors mb-2">
                    {paper.title}
                  </h2>
                </Link>

                {/* Authors */}
                {paper.authors && paper.authors.length > 0 && (
                  <p className="text-sm text-gray-600 mb-3">
                    {paper.authors.join(', ')}
                  </p>
                )}

                {/* Abstract excerpt */}
                {paper.abstract && (
                  <p className="text-body text-gray-500 line-clamp-2">
                    {paper.abstract.replace(/<[^>]*>/g, '').substring(0, 250)}
                    {paper.abstract.length > 250 ? '...' : ''}
                  </p>
                )}

                <Link
                  href={`/research/${paper.slug}`}
                  className="inline-block mt-4 text-sm font-medium text-teal-600 hover:text-teal-700"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Band */}
      <CtaBand
        headline="Interested in collaboration?"
        subheadline="We welcome research partnerships with academic institutions and policy organizations."
        primaryCta={{ label: 'Contact us', url: '/contact' }}
      />
    </>
  );
}
