import React from 'react';

export const ImpactSection = () => {
  // Data derived from source
  const stats = [
    { value: '£2B+', label: 'Value Delivered' },
    { value: '1M+', label: 'Patient Outcomes' },
    { value: '30%', label: 'Efficiency Gains' },
    { value: '50+', label: 'Trusts Supported' },
  ];

  return (
    <section className="bg-section-alt section-standard">
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="enterprise-card flex flex-col min-h-[180px]">
              <div className="flex justify-between items-start mb-4">
                <span className="text-metadata">{stat.label}</span>
                <span className="status-dot"></span>
              </div>
              <span className="font-mono text-3xl md:text-4xl font-semibold text-[#111827] tracking-tight">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
