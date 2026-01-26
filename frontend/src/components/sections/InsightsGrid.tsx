'use client';

import React from 'react';
import Link from 'next/link';

export const InsightsGrid = () => {
  return (
    <section className="w-full py-24 bg-section-alt">
      <div className="container-wide">
        {/* Section Header with View All Specs link */}
        <div className="flex justify-between items-baseline mb-12">
          <h2 className="section-header-enterprise">Key Insights</h2>
          <Link href="/research" className="link-specs">
            View All Specs
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Box 1: Key Metric */}
          <div className="enterprise-card flex flex-col justify-between min-h-[280px]">
            <div>
              <div className="flex justify-between items-start mb-4">
                <p className="text-metadata">Impact Delivered</p>
                <span className="status-dot"></span>
              </div>
              <h3 className="font-mono text-5xl font-bold text-[#111827] tracking-tighter">
                £1.2B+
              </h3>
            </div>
            <p className="text-[#475569] text-base leading-relaxed">
              Public sector value unlocked through data-driven efficiency improvements.
            </p>
          </div>

          {/* Box 2: Case Study */}
          <Link href="/services/infrastructure" className="enterprise-card flex flex-col justify-between min-h-[280px] group">
            <div>
              <div className="flex justify-between items-start mb-4">
                <p className="text-metadata">Case Study</p>
                <span className="status-dot"></span>
              </div>
              <h3 className="text-xl font-bold text-[#111827]">
                Optimizing National Infrastructure
              </h3>
            </div>
            <div className="link-explore">
              Explore
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </Link>

          {/* Box 3: Platform */}
          <div className="enterprise-card flex flex-col justify-between min-h-[280px]">
            <div>
              <div className="flex justify-between items-start mb-4">
                <p className="text-metadata">Methodology</p>
                <span className="status-dot"></span>
              </div>
              <h3 className="text-xl font-bold text-[#111827]">
                Scalable Growth
              </h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#475569]">Adoption Rate</span>
                <span className="text-metadata">v.24.01</span>
              </div>
              <div className="w-full bg-[#CBD5E1] h-1">
                <div className="bg-[#111827] h-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
