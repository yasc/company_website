import React from 'react';

export const ImpactSection = () => {
  // Data derived from source
  const stats = [
    { value: '£2B+', label: 'Value Delivered', version: 'v.24.01' },
    { value: '1M+', label: 'Patient Outcomes', version: 'v.24.02' },
    { value: '30%', label: 'Efficiency Gains', version: 'v.24.03' },
    { value: '50+', label: 'Trusts Supported', version: 'v.24.04' },
  ];

  return (
    <section className="bg-white py-20">
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="enterprise-card flex flex-col min-h-[180px]">
              <div className="flex justify-between items-start mb-4">
                <span className="text-metadata">{stat.label}</span>
                <span className="status-dot"></span>
              </div>
              <span className="font-mono text-4xl md:text-5xl font-bold text-[#111827] tracking-tighter mb-4">
                {stat.value}
              </span>
              <span className="text-metadata mt-auto">
                {stat.version}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
