'use client';

import React from 'react';
import Link from 'next/link';

interface Initiative {
  title: string;
  description: string;
  link: string;
}

const initiatives: Initiative[] = [
  {
    title: 'Open-Access Data',
    description: 'We release preview datasets for academic researchers and the public, enabling replication and extending the frontier of economic measurement.',
    link: '/data'
  },
  {
    title: 'The AEAI Lab',
    description: 'Our research lab at the LSE advances economic measurement through published research, open-source tools, and a summer fellowship for early-career researchers.',
    link: '/lab'
  },
  {
    title: 'Guides & Training',
    description: 'Publicly available resources for using advanced computational tools, cloud infrastructure, and generative AI in economics research.',
    link: '/lab'
  },
  {
    title: 'Summer Fellowship',
    description: 'An annual programme training research fellows in cutting-edge AI and data methodologies for applied economics research.',
    link: '/lab'
  }
];

export const SocietalImpactSection: React.FC = () => {
  return (
    <section className="section-standard bg-white">
      <div className="container-wide">
        {/* Section Header */}
        <div className="flex justify-between items-baseline mb-12">
          <h2 className="section-header-enterprise">Economic Research for the Public Good</h2>
          <Link href="/lab" className="link-specs">
            Explore the Lab
          </Link>
        </div>

        <p className="text-body-lg leading-relaxed max-w-3xl mb-16">
          Our research creates public value beyond our client work. We build open datasets, publish methodological guides, and train the next generation of applied economists.
        </p>

        {/* Initiatives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {initiatives.map((initiative) => (
            <Link
              key={initiative.title}
              href={initiative.link}
              aria-label={`Explore ${initiative.title} initiative`}
              className="enterprise-card flex flex-col justify-between min-h-[280px] group"
            >
              <div>
                <div className="flex justify-end items-start mb-6">
                  <span className="status-dot"></span>
                </div>
                <h3 className="text-h3 mb-4">
                  {initiative.title}
                </h3>
                <p className="text-body leading-relaxed">
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

        {/* Research Commitment Banner */}
        <div className="enterprise-card p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-metadata">Research Commitment</span>
                <span className="status-dot status-dot--active"></span>
              </div>
              <h3 className="text-h2 mb-3">
                Academic Roots, Real-World Impact
              </h3>
              <p className="text-body leading-relaxed max-w-xl">
                Founded by PhD economists from the London School of Economics, our research is published in academic journals and presented at central banks, government agencies, and leading universities worldwide.
              </p>
            </div>
            <Link
              href="/lab"
              className="btn-primary whitespace-nowrap"
            >
              Visit the Lab
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
