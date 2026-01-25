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
  'senior-economist': {
    title: 'Senior Economist',
    location: 'Washington, DC',
    type: 'full_time',
    department: 'Research',
    description: `We are seeking a Senior Economist to join our research team. In this role, you will lead complex economic analyses, mentor junior researchers, and contribute to our growing body of published work.

The ideal candidate has a strong background in applied microeconomics, experience with causal inference methods, and excellent communication skills. You will work on a variety of projects spanning labor economics, industrial organization, and public policy.`,
    requirements: `**Required Qualifications:**
- PhD in Economics or related field
- 5+ years of experience in applied economic research
- Strong publication record in peer-reviewed journals
- Proficiency in Stata, R, or Python
- Excellent written and oral communication skills

**Preferred Qualifications:**
- Experience with large administrative datasets
- Background in machine learning methods
- Prior consulting or policy experience`,
    applyUrl: 'mailto:careers@appliedeconomics.com?subject=Senior%20Economist%20Application',
  },
  'research-analyst': {
    title: 'Research Analyst',
    location: 'New York, NY',
    type: 'full_time',
    department: 'Research',
    description: `We are looking for a Research Analyst to support our team's economic research projects. This is an excellent opportunity for someone with strong quantitative skills who wants to develop expertise in applied economics.

You will work closely with senior economists on data collection, cleaning, and analysis. This role offers significant exposure to cutting-edge research methods and the opportunity to contribute to published work.`,
    requirements: `**Required Qualifications:**
- Master's degree in Economics, Statistics, or related quantitative field
- Strong programming skills in Stata, R, or Python
- Experience with econometric analysis
- Excellent attention to detail

**Preferred Qualifications:**
- Experience with web scraping and data collection
- Familiarity with SQL and database management
- Interest in labor economics or industrial organization`,
    applyUrl: 'mailto:careers@appliedeconomics.com?subject=Research%20Analyst%20Application',
  },
  'data-scientist': {
    title: 'Data Scientist',
    location: 'Remote',
    type: 'full_time',
    department: 'Data Products',
    description: `Join our Data Products team as a Data Scientist. You will help build and maintain our suite of economic data products, develop new analytical tools, and support internal research with advanced data science techniques.

This role combines traditional econometric methods with modern machine learning approaches. You will work at the intersection of economics and technology, helping to translate complex data into actionable insights.`,
    requirements: `**Required Qualifications:**
- Master's degree in Data Science, Statistics, Computer Science, or Economics
- 3+ years of professional data science experience
- Proficiency in Python and SQL
- Experience with machine learning frameworks (scikit-learn, TensorFlow, or PyTorch)

**Preferred Qualifications:**
- Experience with cloud platforms (AWS, GCP)
- Background in causal inference
- Prior experience with economic data`,
    applyUrl: 'mailto:careers@appliedeconomics.com?subject=Data%20Scientist%20Application',
  },
};

const genericFallback = {
  title: 'Open Position',
  location: 'TBD',
  type: 'full_time',
  department: 'Various',
  description: 'We are looking for talented individuals to join our team. Please contact us for more information about this position.',
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
                className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                  typeColors[job.type]
                }`}
              >
                {typeLabels[job.type]}
              </span>
              {job.department && (
                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-navy-700 text-gray-300">
                  {job.department}
                </span>
              )}
            </div>

            <h1 className="text-display text-white mb-4">{job.title}</h1>
            <p className="text-body-large text-gray-300">📍 {job.location}</p>

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
                      <h3 className="text-h4 text-navy-800 mb-3">
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
