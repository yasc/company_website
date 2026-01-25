'use client';

import React from 'react';
import Link from 'next/link';

interface ImpactArea {
  title: string;
  subtitle: string;
  description: string;
  stats: { value: string; label: string }[];
  image?: string;
  link: string;
}

const impactAreas: ImpactArea[] = [
  {
    title: 'Healthcare',
    subtitle: 'NHS England',
    description: 'Transforming patient care through data-driven insights, enabling clinicians to make better decisions faster.',
    stats: [
      { value: '1M+', label: 'Patient records analyzed' },
      { value: '30%', label: 'Reduction in wait times' }
    ],
    link: '/impact/healthcare'
  },
  {
    title: 'Government',
    subtitle: 'UK Public Sector',
    description: 'Empowering government agencies to deliver better services while protecting citizen privacy and security.',
    stats: [
      { value: '50+', label: 'Agencies served' },
      { value: '£2B', label: 'Cost savings delivered' }
    ],
    link: '/impact/government'
  },
  {
    title: 'Defence',
    subtitle: 'National Security',
    description: 'Supporting critical defense operations with real-time intelligence and operational planning capabilities.',
    stats: [
      { value: '24/7', label: 'Operational support' },
      { value: '100%', label: 'Mission success rate' }
    ],
    link: '/impact/defence'
  }
];

export const ImpactSection: React.FC = () => {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Impact
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Delivering transformative outcomes across critical sectors
          </p>
        </div>
        
        {/* Impact Areas */}
        <div className="space-y-24">
          {impactAreas.map((area, index) => (
            <div 
              key={area.title}
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image/Visual Placeholder */}
              <div className="flex-1 w-full">
                <div className="relative aspect-video bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 backdrop-blur-sm bg-black/30"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-white/20 mb-2">
                        {area.title}
                      </div>
                      <div className="text-xl text-white/40">
                        {area.subtitle}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 space-y-6">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {area.title}
                  </h3>
                  <p className="text-xl text-blue-400">
                    {area.subtitle}
                  </p>
                </div>
                
                <p className="text-gray-300 text-lg leading-relaxed">
                  {area.description}
                </p>
                
                {/* Stats */}
                <div className="grid grid-cols-2 gap-6 py-6">
                  {area.stats.map((stat) => (
                    <div key={stat.label}>
                      <div className="text-3xl font-bold text-white">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-500 uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* CTA */}
                <Link
                  href={area.link}
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold text-lg group transition-colors"
                >
                  Learn more about our {area.title.toLowerCase()} solutions
                  <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};