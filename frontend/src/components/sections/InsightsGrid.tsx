'use client';

import React from 'react';
import Link from 'next/link';

export const InsightsGrid = () => {
  const industries = [
    // Row 1
    { name: 'Governments', link: '/industries/governments' },
    { name: 'Central Banks', link: '/industries/central-banks' },
    { name: 'Statistical Agencies', link: '/industries/statistical-agencies' },
    { name: 'Policy Institutions', link: '/industries/policy-institutions' },
    // Row 2
    { name: 'Institutional Investors', link: '/industries/institutional-investors' },
    { name: 'Global Trade', link: '/industries/global-trade' },
    { name: 'Healthcare', link: '/industries/healthcare' },
    { name: 'Logistics', link: '/industries/logistics' },
  ];

  return (
    <section className="w-full section-standard bg-section-alt">
      <div className="container-wide">
        {/* Section Header */}
        <div className="flex justify-between items-baseline mb-12">
          <h2 className="section-header-enterprise">Industries</h2>
          <Link href="/industries" className="link-specs">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {industries.map((industry) => (
            <Link
              key={industry.name}
              href={industry.link}
              className="enterprise-card group hover:border-slate-900 transition-colors duration-300 flex flex-col justify-between min-h-[160px]"
            >
              <div className="flex justify-end">
                <div className="h-2 w-2 bg-[#CBD5E1] group-hover:bg-slate-900 rounded-full transition-colors"></div>
              </div>
              <div>
                <h3 className="text-h3 mb-4 group-hover:underline decoration-1 underline-offset-4">
                  {industry.name}
                </h3>
                <div className="link-explore">
                  Explore <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
