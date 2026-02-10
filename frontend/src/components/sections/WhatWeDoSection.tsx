import React from 'react';
import Link from 'next/link';
import { services } from '@/lib/services-data';

export const WhatWeDoSection: React.FC = () => {
  return (
    <section className="bg-white pt-12 pb-24 lg:pt-16 lg:pb-28">
      <div className="container-wide">
        <div className="flex justify-between items-baseline mb-12">
          <h2 className="section-header-enterprise">What We Do</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              aria-label={`Explore ${service.title} service`}
              className="enterprise-card flex flex-col min-h-[280px] group"
            >
              {/* Meta row */}
              <div className="flex justify-between items-start mb-6">
                <span className="font-mono text-sm font-medium text-[#64748B] group-hover:text-[#111827] transition-colors">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="w-2 h-2 rounded-full bg-[#CBD5E1] group-hover:bg-[#111827] transition-colors" aria-hidden="true" />
              </div>

              {/* Title */}
              <h3 className="text-h3 mb-3 group-hover:underline decoration-1 underline-offset-4">
                {service.title}
              </h3>

              {/* Summary */}
              <p className="text-body flex-grow">
                {service.summary}
              </p>

              {/* Explore link */}
              <div className="link-explore mt-6">
                Explore <span className="ml-2 transition-transform group-hover:translate-x-1 inline-block">&rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
