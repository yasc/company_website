import { getGuideBySlug } from '@/lib/strapiClient';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { CtaBand } from '@/components/sections';
import Link from 'next/link';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface StrapiResponse {
  data?: any[];
  meta?: any;
}

// Fallback guide data
const fallbackGuides: Record<string, any> = {
  'intro-causal-inference': {
    title: 'Introduction to Causal Inference',
    summary: 'A practical guide to causal inference methods for applied economists, covering selection on observables, instrumental variables, regression discontinuity, and difference-in-differences.',
    body: `# Introduction

Causal inference is at the heart of empirical economics. This guide provides a practical introduction to the core methods used by applied economists to identify causal effects from observational data.

## Why Causal Inference Matters

Most interesting economic questions are causal in nature: Does education increase earnings? Do minimum wage increases reduce employment? Does access to credit help businesses grow?

Answering these questions requires more than establishing correlations—we need to identify causal effects. This guide will help you understand when and how different methods can help achieve causal identification.

## Selection on Observables

The simplest approach to causal inference assumes that, conditional on observed covariates, treatment assignment is as good as random. This is sometimes called "selection on observables" or the "conditional independence assumption."

**Key methods:**
- Regression adjustment
- Matching estimators
- Propensity score methods
- Inverse probability weighting

**When to use:** When you have rich data on all relevant confounders and believe unobserved confounding is minimal.

## Instrumental Variables

Instrumental variables (IV) methods identify causal effects using variation in treatment induced by an "instrument"—a variable that affects treatment but has no direct effect on the outcome.

**Key requirements:**
- Relevance: The instrument affects treatment
- Exclusion: The instrument affects outcomes only through treatment
- Independence: The instrument is as good as randomly assigned

**Common applications:** Natural experiments, policy changes, geographic variation.

## Regression Discontinuity

Regression discontinuity (RD) designs exploit situations where treatment assignment changes discontinuously at some threshold. By comparing units just above and below the threshold, we can identify local treatment effects.

**Key requirements:**
- Treatment assignment based on a continuous running variable with a cutoff
- Units cannot precisely manipulate the running variable
- No other treatments change at the same threshold

## Difference-in-Differences

Difference-in-differences (DiD) compares changes over time between treated and untreated groups. The key assumption is that, absent treatment, both groups would have followed parallel trends.

**Key requirements:**
- Pre-treatment parallel trends
- No anticipation of treatment
- Stable composition of treatment and control groups

## Conclusion

Each method has its strengths and limitations. The best approach depends on your specific setting, data availability, and the assumptions you're willing to make. Good applied work involves carefully thinking through identification and being transparent about potential threats to validity.`,
    authors: ['Dr. Emily Zhang', 'Dr. Robert Kim'],
  },
  'administrative-data': {
    title: 'Working with Administrative Data',
    summary: 'Best practices for using administrative records in economic research, including data access, linking, and common pitfalls.',
    body: `# Working with Administrative Data

Administrative data—records collected for administrative purposes like tax records, social security data, and health insurance claims—has revolutionized empirical economics. This guide covers best practices for working with these powerful but complex datasets.

## Advantages of Administrative Data

**Coverage and scale:** Administrative data often covers entire populations, enabling studies of rare events and subgroups.

**Accuracy:** Some variables (like earnings from tax records) are measured with less error than survey responses.

**Longitudinal structure:** Administrative records often span long time periods, enabling studies of lifecycle dynamics.

## Common Data Sources

- Tax records (IRS, SSA)
- Social security and retirement data
- Health insurance claims (Medicare, Medicaid, private)
- Education records (transcript data, student loans)
- Court and criminal justice records
- Unemployment insurance records

## Data Access Considerations

**Restricted access:** Most administrative data requires formal data use agreements and secure computing environments.

**IRB approval:** Research involving identifiable data typically requires Institutional Review Board approval.

**Disclosure review:** Results must often pass disclosure review before publication to prevent re-identification.

## Data Linking

Linking records across datasets and over time is both a key advantage and a major challenge with administrative data.

**Best practices:**
- Use deterministic linking on Social Security Numbers when available
- Apply probabilistic linking methods (e.g., Fellegi-Sunter) when exact identifiers are missing
- Document linking procedures and assess match quality
- Be transparent about linking rates and potential selection

## Common Pitfalls

**Missing data:** Administrative data may have systematic gaps (e.g., self-employed individuals in wage records).

**Measurement concerns:** Administrative definitions may not match economic concepts of interest.

**Selection:** Coverage may change over time or across jurisdictions.

## Conclusion

Administrative data offers tremendous opportunities for economic research, but requires careful attention to data quality, measurement, and access considerations.`,
    authors: ['Dr. Sarah Chen'],
  },
  'reproducible-workflows': {
    title: 'Reproducible Research Workflows',
    summary: 'How to structure your research project for reproducibility using version control, containerization, and documentation standards.',
    body: `# Reproducible Research Workflows

Reproducibility is essential for credible science. This guide provides practical recommendations for organizing your research project to ensure that others (and your future self) can reproduce your results.

## Why Reproducibility Matters

- Verification: Others can check your work
- Extension: Researchers can build on your methods
- Efficiency: You can easily revisit and update analyses
- Credibility: Reproducible work is more trustworthy

## Project Organization

A well-organized project structure makes reproducibility easier:

\`\`\`
project/
├── README.md
├── data/
│   ├── raw/           # Original, immutable data
│   └── processed/     # Cleaned/transformed data
├── code/
│   ├── 01_clean.R     # Data cleaning
│   ├── 02_analyze.R   # Main analysis
│   └── 03_tables.R    # Output generation
├── output/
│   ├── figures/
│   └── tables/
└── docs/
    └── codebook.md
\`\`\`

## Version Control with Git

Version control is essential for reproducibility. Use Git to:

- Track all changes to code and documentation
- Create a clear history of your project
- Collaborate with coauthors
- Link your code to specific results

**Key practices:**
- Commit frequently with descriptive messages
- Use branches for experimental work
- Tag releases that correspond to paper versions

## Environment Management

Your code should run the same way on any machine. Tools for managing environments include:

- **R:** renv for package management
- **Python:** conda or virtualenv
- **Cross-language:** Docker containers

## Documentation Standards

Good documentation is essential:

- README with project overview and instructions
- Codebook describing all variables
- Comments in code explaining logic
- Clear mapping from code to results

## Automation

Automate your workflow so results can be regenerated with a single command:

- Use makefiles or build tools
- Scripts should run end-to-end without manual intervention
- Document any manual steps that cannot be automated

## Conclusion

Investing in reproducibility pays off through increased credibility, easier collaboration, and reduced time spent recreating analyses.`,
    authors: ['Dr. James Wilson'],
  },
};

const genericFallback = {
  title: 'Guide',
  summary: 'A methodological guide for applied economists.',
  body: 'Content coming soon.',
  authors: [],
};

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export default async function GuideDetailPage({ params }: GuidePageProps) {
  const { slug } = await params;
  
  let guide = null;

  try {
    const response = (await getGuideBySlug(slug)) as StrapiResponse;
    if (response?.data && response.data.length > 0) {
      const g = response.data[0];
      guide = {
        title: g.title,
        summary: g.summary,
        body: g.body,
        authors: g.authors?.map((a: any) => a.name) || [],
      };
    }
  } catch (error) {
    console.log('Strapi not available, using fallback data');
  }

  // Use fallback if no Strapi data
  if (!guide) {
    guide = fallbackGuides[slug] || {
      ...genericFallback,
      title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    };
  }

  if (!guide) {
    notFound();
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-navy-900 dark-bg py-16 lg:py-24">
        <Container size="narrow">
          <div className="text-small text-teal-400 uppercase tracking-wider mb-4">
            Lab Guide
          </div>
          <h1 className="text-display text-white mb-6">{guide.title}</h1>
          <p className="text-body-large text-gray-300">{guide.summary}</p>

          {guide.authors && guide.authors.length > 0 && (
            <p className="text-small text-gray-400 mt-6">
              By {guide.authors.join(', ')}
            </p>
          )}
        </Container>
      </section>

      {/* Guide Content */}
      <section className="py-16 lg:py-24">
        <Container size="narrow">
          <article className="prose prose-lg max-w-none prose-headings:text-navy-800 prose-p:text-gray-600 prose-strong:text-navy-800 prose-code:text-teal-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded">
            {/* Simple markdown-like rendering */}
            {guide.body.split('\n\n').map((block: string, i: number) => {
              // Handle headers
              if (block.startsWith('# ')) {
                return (
                  <h1 key={i} className="text-h1 text-navy-800 mt-12 mb-6 first:mt-0">
                    {block.replace('# ', '')}
                  </h1>
                );
              }
              if (block.startsWith('## ')) {
                return (
                  <h2 key={i} className="text-h2 text-navy-800 mt-10 mb-4">
                    {block.replace('## ', '')}
                  </h2>
                );
              }
              if (block.startsWith('**') && block.endsWith('**')) {
                return (
                  <p key={i} className="font-semibold text-navy-800">
                    {block.replace(/\*\*/g, '')}
                  </p>
                );
              }
              // Handle code blocks
              if (block.startsWith('```')) {
                const lines = block.split('\n');
                const code = lines.slice(1, -1).join('\n');
                return (
                  <pre key={i} className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-base">
                    <code>{code}</code>
                  </pre>
                );
              }
              // Handle lists
              if (block.startsWith('- ')) {
                const items = block.split('\n').filter((l) => l.startsWith('- '));
                return (
                  <ul key={i} className="list-disc pl-6 space-y-2">
                    {items.map((item, j) => (
                      <li key={j}>{item.replace('- ', '')}</li>
                    ))}
                  </ul>
                );
              }
              // Regular paragraph
              return <p key={i}>{block}</p>;
            })}
          </article>
        </Container>
      </section>

      {/* Back link */}
      <section className="py-8 bg-gray-50">
        <Container>
          <Link href="/lab">
            <Button variant="ghost">← Back to Lab</Button>
          </Link>
        </Container>
      </section>

      {/* CTA Band */}
      <CtaBand
        headline="Found this helpful?"
        subheadline="Check out our other guides and resources in the Economics Lab."
        primaryCta={{ label: 'View all guides', url: '/lab' }}
      />
    </>
  );
}
