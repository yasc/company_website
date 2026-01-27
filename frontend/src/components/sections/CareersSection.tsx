'use client';

import React from 'react';
import Link from 'next/link';

interface CareerHighlight {
  title: string;
  description: string;
}

const highlights: CareerHighlight[] = [
  {
    title: 'Mission-Driven Work',
    description: 'Solve the world\'s most important problems with cutting-edge technology'
  },
  {
    title: 'Global Impact',
    description: 'Work on projects that affect millions of lives across the globe'
  },
  {
    title: 'Technical Excellence',
    description: 'Push the boundaries of what\'s possible with data and AI'
  },
  {
    title: 'Collaborative Culture',
    description: 'Join a team of brilliant, passionate people from diverse backgrounds'
  }
];

interface JobListing {
  title: string;
  location: string;
  department: string;
  tag: string;
}

const jobListings: JobListing[] = [
  {
    title: 'Software Engineer, Frontend',
    location: 'London, UK',
    department: 'Engineering',
    tag: 'NEW'
  },
  {
    title: 'Data Scientist',
    location: 'Multiple Locations',
    department: 'Data',
    tag: 'REMOTE'
  },
  {
    title: 'Product Designer',
    location: 'London, UK',
    department: 'Design',
    tag: 'HYBRID'
  }
];

export const CareersSection: React.FC = () => {
  return (
    <section className="section-standard bg-white">
      <div className="container-wide">
        {/* Section Header */}
        <div className="flex justify-between items-baseline mb-12">
          <h2 className="section-header-enterprise">Careers</h2>
          <Link href="/careers" className="link-specs">
            View All Positions
          </Link>
        </div>

        {/* Main Content - 2 column grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* Left Column - Why Join Us */}
          <div className="enterprise-card p-8 lg:p-12">
            <h3 className="text-h2 mb-6">
              Build the Future with Us
            </h3>
            <p className="text-body-lg leading-relaxed mb-10">
              We're looking for exceptional engineers, designers, and problem-solvers
              who want to use their skills to make a real difference in the world.
            </p>
            
            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {highlights.map((highlight, index) => (
                <div key={index} className="border-l-2 border-[#CBD5E1] pl-4">
                  <h4 className="font-semibold text-[#111827] mb-1 text-sm">
                    {highlight.title}
                  </h4>
                  <p className="text-sm text-[#64748B] leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Link
                href="/careers"
                className="btn-primary"
              >
                View Open Positions
              </Link>
              <Link
                href="/careers/students"
                className="btn-outline"
              >
                Student Programs
              </Link>
            </div>
          </div>
          
          {/* Right Column - Job Listings */}
          <div className="enterprise-card p-8 lg:p-12">
            <div className="flex justify-between items-baseline mb-6">
              <span className="text-metadata">Featured Positions</span>
              <span className="status-dot status-dot--active"></span>
            </div>
            
            <div className="space-y-0">
              {jobListings.map((job, index) => (
                <div 
                  key={index} 
                  className={`p-6 ${index !== 0 ? 'border-t border-[#CBD5E1]' : ''} hover:bg-[#F8FAFC] transition-colors group`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-[#111827] group-hover:underline">
                      {job.title}
                    </h4>
                    <span className="text-label">{job.tag}</span>
                  </div>
                  <p className="text-sm text-[#64748B] mb-3">
                    {job.location} · {job.department}
                  </p>
                  <div>
                    <Link href="/careers" className="link-explore text-sm">
                      Explore
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            {/* View All Link */}
            <div className="mt-6 pt-6 border-t border-[#CBD5E1] text-right">
              <Link href="/careers" className="link-specs">
                View all 50+ positions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
