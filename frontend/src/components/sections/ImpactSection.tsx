import React from 'react';

export const ImpactSection = () => {
  const stats = [
    { value: '£2B+', label: 'Value Delivered', context: 'Across 12 advisory engagements since 2018' },
    { value: '1M+', label: 'Lives Improved', context: 'Through healthcare and policy interventions' },
    { value: '30%', label: 'Efficiency Gains', context: 'Average improvement in client operations' },
    { value: '50+', label: 'Institutions Served', context: 'Governments, central banks, and enterprises' },
  ];

  return (
    <section className="bg-section-alt section-standard" aria-label="Impact statistics">
      <div className="container-wide">
        <div className="flex justify-between items-baseline mb-12">
          <h2 className="section-header-enterprise">Our Track Record</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="enterprise-card flex flex-col min-h-[180px]">
              <div className="flex justify-between items-start mb-4">
                <span className="text-metadata">{stat.label}</span>
                <span className="status-dot"></span>
              </div>
              <span className="font-mono text-3xl md:text-4xl font-semibold text-[#111827]">
                {stat.value}
              </span>
              <span className="text-label mt-auto pt-4 normal-case tracking-normal">
                {stat.context}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
