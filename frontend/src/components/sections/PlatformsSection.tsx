import React from 'react';

export const PlatformsSection = () => {
  const platforms = [
    { name: 'AIP', desc: 'Artificial Intelligence Platform for operational decision making.' },
    { name: 'Foundry', desc: 'The operating system for the modern enterprise.' },
    { name: 'Gotham', desc: 'Global decision making and operating system.' },
    { name: 'Apollo', desc: 'Continuous delivery and autonomous management.' },
  ];

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Core Platforms
          </h2>
          <a href="#" className="text-sm font-bold text-slate-900 border-b border-slate-900 pb-1 hover:text-slate-600 hover:border-slate-600 transition">
            VIEW ALL SPECS
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platforms.map((p) => (
            <div key={p.name} className="group border border-[#CBD5E1] p-6 hover:border-slate-900 transition-colors duration-300 cursor-pointer bg-white">
              {/* Technical Header */}
              <div className="flex justify-between items-center mb-8">
                <span className="text-xs text-slate-400 font-mono">v.24.01</span>
                <div className="h-2 w-2 bg-[#CBD5E1] group-hover:bg-slate-900 rounded-full transition-colors"></div>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:underline decoration-2 underline-offset-4">
                {p.name}
              </h3>
              
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {p.desc}
              </p>

              <div className="flex items-center text-slate-900 text-sm font-bold mt-auto">
                Explore <span className="ml-2">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
