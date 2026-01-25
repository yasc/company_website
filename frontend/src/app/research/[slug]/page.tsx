import { getPaperBySlug } from '@/lib/strapiClient';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Hero, ContentBlock, CtaBand } from '@/components/sections';
import Link from 'next/link';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface StrapiResponse {
  data?: any[];
  meta?: any;
}

// Fallback paper data
const fallbackPapers: Record<string, any> = {
  'climate-policy-agriculture': {
    title: 'The Economic Impact of Climate Policy on Agricultural Markets',
    abstract: `This paper examines the effects of climate regulation on agricultural commodity prices and farm incomes across different regions. Using a novel dataset of state-level climate policies and farm-level economic data, we estimate the causal effects of carbon pricing and renewable energy mandates on agricultural production costs and output.

Our findings suggest that while climate policies impose short-term costs on agricultural producers, these effects are heterogeneous across regions and crop types. Farms in regions with greater renewable energy potential experience smaller cost increases, and some benefit from new income streams through renewable energy production.

We also find evidence of adaptation through technology adoption and crop switching, which partially offset the direct costs of climate regulation.`,
    status: 'published',
    publicationVenue: 'Journal of Environmental Economics',
    publicationDate: '2024-03-15',
    authors: ['Dr. Sarah Chen', 'Prof. Michael Torres'],
    keyFindings: [
      { finding: 'Carbon pricing increases production costs by 3-7% on average' },
      { finding: 'Effects are 40% smaller in regions with high solar/wind potential' },
      { finding: 'Technology adoption offsets 25% of direct cost increases within 5 years' },
      { finding: 'Crop switching reduces welfare losses by 15% in affected regions' },
    ],
    citationApa: 'Chen, S., & Torres, M. (2024). The Economic Impact of Climate Policy on Agricultural Markets. Journal of Environmental Economics, 45(2), 234-267.',
  },
  'labor-market-post-pandemic': {
    title: 'Labor Market Dynamics in the Post-Pandemic Economy',
    abstract: `This paper analyzes structural changes in employment patterns and wage dynamics following the COVID-19 pandemic. We document several key trends: the acceleration of remote work adoption, changes in occupational composition, and shifts in the geographic distribution of employment.

Using administrative data from unemployment insurance records matched with establishment surveys, we identify the sectors and occupations that experienced permanent changes versus temporary disruptions. Our analysis reveals that approximately 15% of pandemic-induced employment shifts have become permanent.

We also examine wage dynamics, finding evidence of compression at the bottom of the distribution as employers compete for workers in traditionally low-wage sectors.`,
    status: 'published',
    publicationVenue: 'American Economic Review',
    publicationDate: '2024-01-20',
    authors: ['Dr. James Wilson'],
    keyFindings: [
      { finding: '15% of pandemic employment shifts are permanent' },
      { finding: 'Remote work adoption increased from 5% to 25% in eligible occupations' },
      { finding: 'Wage compression reduced the 90-10 ratio by 8 percentage points' },
      { finding: 'Geographic employment dispersion increased by 12%' },
    ],
    citationApa: 'Wilson, J. (2024). Labor Market Dynamics in the Post-Pandemic Economy. American Economic Review, 114(1), 45-89.',
  },
  'ml-causal-inference': {
    title: 'Machine Learning Methods for Causal Inference in Economics',
    abstract: `This paper provides a methodological survey of machine learning approaches to causal inference, with applications to policy evaluation. We review recent advances in double/debiased machine learning, causal forests, and synthetic control methods enhanced by ML techniques.

We present a unified framework for understanding when and how ML methods can improve causal inference compared to traditional econometric approaches. Our analysis emphasizes the conditions under which ML methods provide advantages and the potential pitfalls of applying these methods without careful consideration.

We illustrate these methods through applications to program evaluation in education and labor markets.`,
    status: 'working_paper',
    publicationDate: '2024-06-01',
    authors: ['Dr. Emily Zhang', 'Dr. Robert Kim'],
    keyFindings: [
      { finding: 'ML methods reduce bias in high-dimensional settings by up to 40%' },
      { finding: 'Causal forests capture treatment effect heterogeneity missed by traditional methods' },
      { finding: 'Sample splitting essential for valid inference' },
    ],
    citationApa: 'Zhang, E., & Kim, R. (2024). Machine Learning Methods for Causal Inference in Economics. Working Paper.',
  },
};

const genericFallback = {
  title: 'Research Paper',
  abstract: 'This research paper examines important economic questions using rigorous empirical methods.',
  status: 'working_paper',
  authors: ['Applied Economics Research Team'],
  keyFindings: [],
};

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
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

interface PaperPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PaperDetailPage({ params }: PaperPageProps) {
  const { slug } = await params;
  
  let paper = null;

  try {
    const response = (await getPaperBySlug(slug)) as StrapiResponse;
    if (response?.data && response.data.length > 0) {
      const p = response.data[0];
      paper = {
        title: p.title,
        abstract: p.abstract,
        status: p.status,
        publicationVenue: p.publicationVenue,
        publicationDate: p.publicationDate,
        authors: p.authors?.map((a: any) => a.name) || [],
        keyFindings: p.keyFindings || [],
        citationApa: p.citationApa,
        citationBibtex: p.citationBibtex,
        pdfLink: p.pdfLink,
      };
    }
  } catch (error) {
    console.log('Strapi not available, using fallback data');
  }

  // Use fallback if no Strapi data
  if (!paper) {
    paper = fallbackPapers[slug] || {
      ...genericFallback,
      title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    };
  }

  if (!paper) {
    notFound();
  }

  return (
    <>
      {/* Hero with metadata */}
      <section className="bg-navy-900 dark-bg py-16 lg:py-24">
        <Container>
          <div className="max-w-4xl">
            {/* Status Badge */}
            <span
              className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-4 ${
                statusColors[paper.status]
              }`}
            >
              {statusLabels[paper.status]}
            </span>

            <h1 className="text-display text-white mb-6">{paper.title}</h1>

            {/* Authors */}
            {paper.authors && paper.authors.length > 0 && (
              <p className="text-body-large text-gray-300 mb-4">
                {paper.authors.join(', ')}
              </p>
            )}

            {/* Publication info */}
            <div className="flex flex-wrap gap-4 text-small text-gray-400">
              {paper.publicationDate && (
                <span>{formatDate(paper.publicationDate)}</span>
              )}
              {paper.publicationVenue && (
                <span>• {paper.publicationVenue}</span>
              )}
            </div>

            {/* Download button */}
            {paper.pdfLink && (
              <div className="mt-8">
                <a href={paper.pdfLink} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" size="lg">
                    Download PDF
                  </Button>
                </a>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Abstract */}
      <ContentBlock title="Abstract">
        {paper.abstract.split('\n\n').map((paragraph: string, i: number) => (
          <p key={i}>{paragraph}</p>
        ))}
      </ContentBlock>

      {/* Key Findings */}
      {paper.keyFindings && paper.keyFindings.length > 0 && (
        <section className="py-16 lg:py-24 bg-gray-50">
          <Container>
            <h2 className="text-h2 text-navy-800 mb-8">Key Findings</h2>
            <div className="space-y-4">
              {paper.keyFindings.map((finding: any, index: number) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <p className="text-body text-gray-700 pt-1">
                    {finding.finding}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Citation */}
      {paper.citationApa && (
        <section className="py-16 lg:py-24">
          <Container size="narrow">
            <h2 className="text-h2 text-navy-800 mb-6">Citation</h2>
            <div className="bg-gray-100 rounded-lg p-6">
              <p className="text-body text-gray-700 font-mono text-sm">
                {paper.citationApa}
              </p>
            </div>
          </Container>
        </section>
      )}

      {/* Back link */}
      <section className="py-8 bg-gray-50">
        <Container>
          <Link href="/research">
            <Button variant="ghost">← Back to all research</Button>
          </Link>
        </Container>
      </section>

      {/* CTA Band */}
      <CtaBand
        headline="Questions about this research?"
        subheadline="Contact us to discuss this paper or explore collaboration opportunities."
        primaryCta={{ label: 'Contact us', url: '/contact' }}
      />
    </>
  );
}
