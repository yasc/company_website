import React from 'react';
import { services } from '@/lib/services-data';

export const WhatWeDoSection: React.FC = () => {
  return (
    <section className="bg-white section-standard">
      <div className="container-wide">
        <div className="flex justify-between items-baseline mb-12">
          <h2 className="section-header-enterprise">What We Do</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={service.slug}
              className="enterprise-card flex flex-col min-h-[280px]"
            >
              {/* Meta row */}
              <div className="flex justify-between items-start mb-6">
                <span className="text-label">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="status-dot" aria-hidden="true" />
              </div>

              {/* Title */}
              <h3 className="text-h3 mb-3">
                {service.title}
              </h3>

              {/* Summary */}
              <p className="text-body">
                {service.summary}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
