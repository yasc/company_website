'use client';

import React from 'react';
import Link from 'next/link';

interface Initiative {
  title: string;
  description: string;
  link: string;
  icon: string;
}

const initiatives: Initiative[] = [
  {
    title: 'Climate Action',
    description: 'Committed to net-zero emissions and helping organizations achieve their sustainability goals through data-driven insights.',
    link: '/impact/climate',
    icon: '🌍'
  },
  {
    title: 'Privacy & Civil Liberties',
    description: 'Building technology that protects individual privacy while enabling institutions to leverage data responsibly.',
    link: '/impact/privacy',
    icon: '🛡️'
  },
  {
    title: 'Open Source Contributions',
    description: 'Contributing to the global developer community with open source tools and frameworks.',
    link: '/impact/opensource',
    icon: '💻'
  },
  {
    title: 'Education & Training',
    description: 'Partnering with universities to train the next generation of data scientists and engineers.',
    link: '/impact/education',
    icon: '🎓'
  }
];

export const SocietalImpactSection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Our Commitment to Society
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Technology should be a force for good. We're committed to using our capabilities 
            to address humanity's greatest challenges.
          </p>
        </div>
        
        {/* Initiatives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {initiatives.map((initiative) => (
            <Link
              key={initiative.title}
              href={initiative.link}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                <div className="text-4xl">{initiative.icon}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {initiative.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {initiative.description}
                  </p>
                  <div className="mt-4 text-blue-400 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                    Learn more
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Climate Pledge Banner */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg p-8 md:p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Climate Pledge Signatory
          </h3>
          <p className="text-xl text-green-100 mb-6 max-w-2xl mx-auto">
            We've committed to reaching net-zero carbon emissions by 2040, 
            10 years ahead of the Paris Agreement goals.
          </p>
          <Link
            href="/sustainability"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-green-600 bg-white hover:bg-green-50 rounded transition-all duration-200"
          >
            Read Our Sustainability Report
          </Link>
        </div>
      </div>
    </section>
  );
};