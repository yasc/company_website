'use client';

import React from 'react';
import Link from 'next/link';

interface Initiative {
  title: string;
  description: string;
  link: string;
  version: string;
}

const initiatives: Initiative[] = [
  {
    title: 'Climate Action',
    description: 'Committed to net-zero emissions and helping organizations achieve their sustainability goals through data-driven insights.',
    link: '/impact/climate',
    version: 'v.24.01'
  },
  {
    title: 'Privacy & Civil Liberties',
    description: 'Building technology that protects individual privacy while enabling institutions to leverage data responsibly.',
    link: '/impact/privacy',
    version: 'v.24.02'
  },
  {
    title: 'Open Source Contributions',
    description: 'Contributing to the global developer community with open source tools and frameworks.',
    link: '/impact/opensource',
    version: 'v.24.03'
  },
  {
    title: 'Education & Training',
    description: 'Partnering with universities to train the next generation of data scientists and engineers.',
    link: '/impact/education',
    version: 'v.24.04'
  }
];

export const SocietalImpactSection: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container-wide">
        {/* Section Header */}
        <div className="flex justify-between items-baseline mb-12">
          <h2 className="section-header-enterprise">Our Commitment to Society</h2>
          <Link href="/sustainability" className="link-specs">
            View Full Report
          </Link>
        </div>
        
        <p className="text-[#475569] text-lg leading-relaxed max-w-3xl mb-16">
          Technology should be a force for good. We're committed to using our capabilities 
          to address humanity's greatest challenges.
        </p>
        
        {/* Initiatives Grid - 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {initiatives.map((initiative) => (
            <Link
              key={initiative.title}
              href={initiative.link}
              className="enterprise-card flex flex-col justify-between min-h-[280px] group"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="text-metadata">{initiative.version}</span>
                  <span className="status-dot"></span>
                </div>
                <h3 className="text-xl font-bold text-[#111827] mb-4">
                  {initiative.title}
                </h3>
                <p className="text-[#475569] text-base leading-relaxed">
                  {initiative.description}
                </p>
              </div>
              <div className="link-explore pt-6">
                Explore
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Climate Pledge Banner - Minimal Enterprise Style */}
        <div className="enterprise-card p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-metadata">Climate Pledge Signatory</span>
                <span className="status-dot status-dot--active"></span>
              </div>
              <h3 className="text-2xl font-bold text-[#111827] mb-3">
                Net-Zero by 2040
              </h3>
              <p className="text-[#475569] text-base leading-relaxed max-w-xl">
                We've committed to reaching net-zero carbon emissions by 2040, 
                10 years ahead of the Paris Agreement goals.
              </p>
            </div>
            <Link
              href="/sustainability"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white bg-[#111827] hover:bg-[#0F172A] transition-colors whitespace-nowrap"
            >
              Read Sustainability Report
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
