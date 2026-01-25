import { getPapers } from '@/lib/strapiClient';
import { Container } from '@/components/ui/Container';
import { Hero, CtaBand } from '@/components/sections';
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
    title: 'The Economic Impact of Climate Policy on Agricultural Markets',
    slug: 'climate-policy-agriculture',
    abstract: 'This paper examines the effects of climate regulation on agricultural commodity prices and farm incomes across different regions.',
    status: 'published',
    publicationVenue: 'Journal of Environmental Economics',
    publicationDate: '2024-03-15',
    authors: ['Dr. Sarah Chen', 'Prof. Michael Torres'],
    featured: true,
  },
  {
    id: 2,
    title: 'Labor Market Dynamics in the Post-Pandemic Economy',
    slug: 'labor-market-post-pandemic',
    abstract: 'An analysis of structural changes in employment patterns and wage dynamics following the COVID-19 pandemic.',
    status: 'published',
    publicationVenue: 'American Economic Review',
    publicationDate: '2024-01-20',
    authors: ['Dr. James Wilson'],
    featured: true,
  },
  {
    id: 3,
    title: 'Machine Learning Methods for Causal Inference in Economics',
    slug: 'ml-causal-inference',
    abstract: 'A methodological survey of machine learning approaches to causal inference, with applications to policy evaluation.',
    status: 'working_paper',
    publicationDate: '2024-06-01',
    authors: ['Dr. Emily Zhang', 'Dr. Robert Kim'],
    featured: false,
  },
  {
    id: 4,
    title: 'The Distributional Effects of Monetary Policy',
    slug: 'distributional-effects-monetary-policy',
    abstract: 'How do interest rate changes affect different income groups? This paper provides new evidence using household-level data.',
    status: 'policy_brief',
    publicationDate: '2024-05-10',
    authors: ['Dr. Sarah Chen'],
    featured: false,
  },
  {
    id: 5,
    title: 'Infrastructure Investment and Regional Economic Development',
    slug: 'infrastructure-regional-development',
    abstract: 'Examining the long-term economic effects of public infrastructure spending on regional growth and employment.',
    status: 'published',
    publicationVenue: 'Journal of Urban Economics',
    publicationDate: '2023-11-05',
    authors: ['Prof. Michael Torres', 'Dr. Amanda Lee'],
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

  return (
    <>
      {/* Hero */}
      <Hero
        headline="Research"
        subheadline="Our research spans labor economics, environmental policy, industrial organization, and applied econometrics. All publications are available for download."
      />

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
                    className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                      statusColors[paper.status]
                    }`}
                  >
                    {statusLabels[paper.status]}
                  </span>

                  {/* Date */}
                  {paper.publicationDate && (
                    <span className="text-small text-gray-500">
                      {formatDate(paper.publicationDate)}
                    </span>
                  )}

                  {/* Venue */}
                  {paper.publicationVenue && (
                    <span className="text-small text-gray-500">
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
                  <p className="text-small text-gray-600 mb-3">
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
                  className="inline-block mt-4 text-small font-medium text-teal-600 hover:text-teal-700"
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
