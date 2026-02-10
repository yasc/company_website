'use client';

import React from 'react';

export const TrustBar = () => {
  // Placeholder logos - in a real app these would be SVGs or Images
  const clients = [
    { name: 'NHS England' },
    { name: 'HM Treasury' },
    { name: 'World Bank' },
    { name: 'Department for Transport' },
    { name: 'Office for National Statistics' },
  ];

  return (
    <section className="w-full py-16 border-b border-[#E2E8F0] bg-white">
      <div className="container-wide">
        <p className="text-metadata mb-10 text-center">
          Trusted by leading organizations
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
          {clients.map((client) => (
            <div 
              key={client.name}
              className="text-[#94A3B8] font-semibold text-sm uppercase tracking-widest hover:text-[#111827] transition-colors duration-200 cursor-default"
            >
              {client.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
