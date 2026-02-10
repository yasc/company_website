import { getJobs, getCareersPage } from '@/lib/strapiClient';
import { Container } from '@/components/ui/Container';
import { Card, CardTitle, CardDescription } from '@/components/ui/Card';
import { Hero, CtaBand } from '@/components/sections';
import Link from 'next/link';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface StrapiResponse {
  data?: any;
  meta?: any;
}

interface Job {
  id: number;
  title: string;
  slug: string;
  location: string;
  type: 'full_time' | 'part_time' | 'internship' | 'fellowship' | 'contract';
  department?: string;
  featured?: boolean;
}

// Fallback jobs
const fallbackJobs: Job[] = [
  {
    id: 1,
    title: 'Data Analyst',
    slug: 'data-analyst',
    location: 'London',
    type: 'full_time',
    department: 'Data Products',
    featured: true,
  },
  {
    id: 2,
    title: 'Data Engineer',
    slug: 'data-engineer',
    location: 'London',
    type: 'full_time',
    department: 'Data Products',
    featured: true,
  },
  {
    id: 3,
    title: 'Summer Research Fellow',
    slug: 'summer-research-fellow',
    location: 'London',
    type: 'fellowship',
    department: 'AEAI Lab',
    featured: false,
  },
];

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

export default async function CareersPage() {
  let jobs = fallbackJobs;
  let heroContent = {
    headline: 'Join Our Team',
    subheadline: 'Work at the intersection of academic economics and frontier AI. We are looking for talented data analysts and engineers to help build novel economic datasets.',
  };

  try {
    const [jobsResponse, careersPageResponse] = await Promise.all([
      getJobs() as Promise<StrapiResponse>,
      getCareersPage() as Promise<StrapiResponse>,
    ]);

    if (jobsResponse?.data && jobsResponse.data.length > 0) {
      jobs = jobsResponse.data.map((j: any) => ({
        id: j.id,
        title: j.title || 'Position',
        slug: j.slug || '',
        location: j.location || 'TBD',
        type: j.type || 'full_time',
        department: j.department || '',
        featured: j.featured || false,
      }));
    }

    if (careersPageResponse?.data?.hero) {
      heroContent = {
        headline: careersPageResponse.data.hero.headline || heroContent.headline,
        subheadline: careersPageResponse.data.hero.subheadline || heroContent.subheadline,
      };
    }
  } catch (error) {
    console.log('Strapi not available, using fallback data');
  }

  // Group jobs by department
  const departments = [...new Set(jobs.map(j => j.department).filter(Boolean))];

  return (
    <>
      {/* Hero */}
      <Hero
        headline={heroContent.headline}
        subheadline={heroContent.subheadline}
      />

      {/* Job Listings */}
      <section className="py-16 lg:py-24">
        <Container>
          <h2 className="text-h2 text-navy-800 mb-8">Open Positions</h2>

          <div className="space-y-6">
            {jobs.map((job) => (
              <Link key={job.id} href={`/careers/${job.slug}`}>
                <Card className="hover:border-teal-500 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span
                          className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                            typeColors[job.type]
                          }`}
                        >
                          {typeLabels[job.type]}
                        </span>
                        {job.department && (
                          <span className="text-small text-gray-500">
                            {job.department}
                          </span>
                        )}
                      </div>
                      <CardTitle>{job.title}</CardTitle>
                      <CardDescription className="mt-1">
                        📍 {job.location}
                      </CardDescription>
                    </div>
                    <div className="text-teal-600 font-medium text-small">
                      View position →
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {jobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-body text-gray-500">
                No open positions at this time. Check back soon!
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* CTA Band */}
      <CtaBand
        headline="Don't see the right role?"
        subheadline="We're always interested in hearing from talented people. Send us your resume."
        primaryCta={{ label: 'Contact us', url: '/contact' }}
        variant="dark"
      />
    </>
  );
}
