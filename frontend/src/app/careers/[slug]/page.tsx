import { getJobBySlug } from '@/lib/strapiClient';
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

// Fallback job data
const fallbackJobs: Record<string, any> = {
  'data-analyst': {
    title: 'Data Analyst',
    location: 'London',
    type: 'full_time',
    department: 'Data Products',
    description: `We are looking for a Data Analyst to join our team building novel economic datasets from unconventional sources. You will work directly with our founders on data construction, validation, and analysis for both commercial data products and consulting engagements.

This role involves processing and analysing large-scale datasets — from millions of archival documents to hundreds of millions of job postings. You will develop and run data pipelines, perform quality assurance on AI-extracted data, conduct exploratory analysis, and produce visualisations and summary statistics for clients and research papers.

This is an opportunity to work at the intersection of academic economics and frontier AI, producing datasets that are used by governments, central banks, and investors worldwide.`,
    requirements: `**Required Qualifications:**
- Bachelor's or Master's degree in Economics, Statistics, Data Science, or a related quantitative field
- Strong programming skills in Python or R
- Experience with data manipulation and analysis (pandas, tidyverse, or similar)
- Familiarity with SQL and working with large datasets
- Strong attention to detail and commitment to data quality

**Preferred Qualifications:**
- Experience with NLP or text data
- Familiarity with cloud computing (AWS, GCP, or Azure)
- Knowledge of econometric methods
- Interest in applied economics or policy research`,
    applyUrl: 'mailto:team@appliedeconomics.ai?subject=Data%20Analyst%20Application',
  },
  'data-engineer': {
    title: 'Data Engineer',
    location: 'London',
    type: 'full_time',
    department: 'Data Products',
    description: `We are hiring a Data Engineer to build and maintain the infrastructure behind our flagship data products. Our datasets are constructed from hundreds of millions of records using AI pipelines — and we need someone to make these pipelines robust, scalable, and reproducible.

You will design data architectures, build ETL pipelines for processing large-scale unstructured data, deploy and monitor AI extraction workflows, and ensure our data products meet the quality and reliability standards expected by institutional clients. You will work closely with our economists and researchers to translate analytical requirements into production-grade data systems.

Our current stack involves Python, cloud infrastructure, LLM APIs, and both structured and unstructured data stores. We value pragmatic engineering over theoretical perfection — systems that work reliably at scale.`,
    requirements: `**Required Qualifications:**
- Bachelor's or Master's degree in Computer Science, Data Engineering, or a related technical field
- 2+ years of professional experience in data engineering or backend development
- Strong Python skills and experience building data pipelines
- Experience with cloud platforms (AWS, GCP, or Azure)
- Familiarity with SQL and NoSQL databases

**Preferred Qualifications:**
- Experience with LLM APIs and AI/ML pipelines
- Knowledge of containerisation (Docker) and orchestration tools
- Experience processing unstructured data (text, PDFs, scanned documents)
- Familiarity with data quality frameworks and monitoring
- Interest in economics, social science, or policy`,
    applyUrl: 'mailto:team@appliedeconomics.ai?subject=Data%20Engineer%20Application',
  },
  'summer-research-fellow': {
    title: 'Summer Research Fellow',
    location: 'London',
    type: 'fellowship',
    department: 'AEAI Lab',
    description: `The AEAI Lab summer fellowship is an intensive research programme for early-career economists and data scientists who want to gain hands-on experience with frontier AI methods applied to economics research.

Fellows work alongside our senior researchers on real data construction and analysis projects. Past projects have involved deploying large language models to extract structured data from archival documents, building classification pipelines for large-scale text data, and conducting causal inference analysis on novel datasets.

The programme provides training in practical skills that are increasingly essential for applied economics research: LLM deployment, cloud computing, reproducible workflows, and working with unconventional data sources at scale.`,
    requirements: `**Required Qualifications:**
- Currently enrolled in or recently completed a Master's or PhD programme in Economics, Data Science, or a related quantitative field
- Programming experience in Python or R
- Strong interest in applied economics research
- Intellectual curiosity and willingness to learn new tools

**Preferred Qualifications:**
- Experience with machine learning or NLP
- Familiarity with cloud computing
- Prior research experience
- Interest in labour economics, trade, macro, or financial economics`,
    applyUrl: 'mailto:team@appliedeconomics.ai?subject=Summer%20Fellowship%20Application',
  },
};

const genericFallback = {
  title: 'Open Position',
  location: 'London',
  type: 'full_time',
  department: 'Applied Economics AI',
  description: 'We are looking for talented individuals to join our team. Please contact us at team@appliedeconomics.ai for more information about this position.',
  requirements: 'Requirements will be discussed during the application process.',
};

const typeLabels: Record<string, string> = {
  full_time: 'Full-time',
  part_time: 'Part-time',
  internship: 'Internship',
  fellowship: 'Fellowship',
  contract: 'Contract',
};

const typeColors: Record<string, string> = {
  full_time: 'bg-green-100 text-green-800',
  part_time: 'bg-blue-100 text-blue-800',
  internship: 'bg-purple-100 text-purple-800',
  fellowship: 'bg-amber-100 text-amber-800',
  contract: 'bg-gray-100 text-gray-800',
};

interface JobPageProps {
  params: Promise<{ slug: string }>;
}

export default async function JobDetailPage({ params }: JobPageProps) {
  const { slug } = await params;
  
  let job = null;

  try {
    const response = (await getJobBySlug(slug)) as StrapiResponse;
    if (response?.data && response.data.length > 0) {
      const j = response.data[0];
      job = {
        title: j.title,
        location: j.location,
        type: j.type,
        department: j.department,
        description: j.description,
        requirements: j.requirements,
        applyUrl: j.applyUrl,
        closingDate: j.closingDate,
      };
    }
  } catch (error) {
    console.log('Strapi not available, using fallback data');
  }

  // Use fallback if no Strapi data
  if (!job) {
    job = fallbackJobs[slug] || {
      ...genericFallback,
      title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    };
  }

  if (!job) {
    notFound();
  }

  return (
    <>
      {/* Hero with job metadata */}
      <section className="bg-navy-900 dark-bg py-16 lg:py-24">
        <Container>
          <div className="max-w-4xl">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span
                className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                  typeColors[job.type]
                }`}
              >
                {typeLabels[job.type]}
              </span>
              {job.department && (
                <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-navy-700 text-gray-300">
                  {job.department}
                </span>
              )}
            </div>

            <h1 className="text-display text-white mb-4">{job.title}</h1>
            <p className="text-body-lg text-gray-300">📍 {job.location}</p>

            {/* Apply button */}
            <div className="mt-8">
              {job.applyUrl ? (
                <a href={job.applyUrl}>
                  <Button variant="primary" size="lg">
                    Apply Now
                  </Button>
                </a>
              ) : (
                <Link href="/contact">
                  <Button variant="primary" size="lg">
                    Apply Now
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Description */}
      <ContentBlock title="About the Role">
        {job.description.split('\n\n').map((paragraph: string, i: number) => (
          <p key={i}>{paragraph}</p>
        ))}
      </ContentBlock>

      {/* Requirements */}
      {job.requirements && (
        <section className="py-16 lg:py-24 bg-gray-50">
          <Container size="narrow">
            <h2 className="text-h2 text-navy-800 mb-8">Requirements</h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              {job.requirements.split('\n\n').map((section: string, i: number) => {
                // Handle markdown-style headers
                if (section.startsWith('**') && section.includes(':**')) {
                  const [title, ...content] = section.split('\n');
                  return (
                    <div key={i} className="mb-6">
                      <h3 className="text-h3 text-navy-800 mb-3">
                        {title.replace(/\*\*/g, '').replace(':', '')}
                      </h3>
                      <ul className="list-disc pl-6 space-y-2">
                        {content.map((item, j) => (
                          <li key={j}>{item.replace(/^- /, '')}</li>
                        ))}
                      </ul>
                    </div>
                  );
                }
                return <p key={i}>{section}</p>;
              })}
            </div>
          </Container>
        </section>
      )}

      {/* Apply CTA */}
      <section className="py-12 bg-white">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-h3 text-navy-800">Ready to apply?</h3>
              <p className="text-body text-gray-500">Send us your resume and cover letter.</p>
            </div>
            {job.applyUrl ? (
              <a href={job.applyUrl}>
                <Button variant="primary" size="lg">
                  Apply Now
                </Button>
              </a>
            ) : (
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Apply Now
                </Button>
              </Link>
            )}
          </div>
        </Container>
      </section>

      {/* Back link */}
      <section className="py-8 bg-gray-50">
        <Container>
          <Link href="/careers">
            <Button variant="ghost">← Back to all positions</Button>
          </Link>
        </Container>
      </section>

      {/* CTA Band */}
      <CtaBand
        headline="Have questions?"
        subheadline="Reach out to learn more about this position or our team."
        primaryCta={{ label: 'Contact us', url: '/contact' }}
      />
    </>
  );
}
