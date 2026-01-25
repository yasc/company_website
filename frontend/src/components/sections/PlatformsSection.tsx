'use client';

import React from 'react';
import Link from 'next/link';

interface Platform {
  name: string;
  description: string;
  icon?: string;
  color: string;
  link: string;
}

const platforms: Platform[] = [
  {
    name: 'AIP',
    description: 'Artificial Intelligence Platform - Harness the power of large language models with your enterprise data',
    color: 'from-blue-500 to-cyan-500',
    link: '/platforms/aip'
  },
  {
    name: 'Foundry',
    description: 'The operating system for the modern enterprise - Transform how your organization uses data',
    color: 'from-green-500 to-emerald-500',
    link: '/platforms/foundry'
  },
  {
    name: 'Gotham',
    description: 'Intelligence and defense platform - Support critical operations with real-time decision advantage',
    color: 'from-orange-500 to-red-500',
    link: '/platforms/gotham'
  },
  {
    name: 'Apollo',
    description: 'Continuous deployment and infrastructure platform - Power production-ready systems at scale',
    color: 'from-purple-500 to-pink-500',
    link: '/platforms/apollo'
  }
];

export const PlatformsSection: React.FC = () => {
  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`,
        }}></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Platforms
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our software platforms power critical decision-making and operations for organizations worldwide
          </p>
        </div>
        
        {/* Platforms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {platforms.map((platform) => (
            <Link
              key={platform.name}
              href={platform.link}
              className="group relative bg-black/50 border border-gray-800 rounded-lg p-8 backdrop-blur-sm hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              {/* Gradient Accent */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${platform.color} rounded-t-lg`}></div>
              
              {/* Platform Icon/Logo Placeholder */}
              <div className={`w-16 h-16 mb-4 rounded-lg bg-gradient-to-br ${platform.color} opacity-80 group-hover:opacity-100 transition-opacity`}></div>
              
              {/* Content */}
              <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {platform.name}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {platform.description}
              </p>
              
              {/* Arrow Icon */}
              <div className="absolute bottom-8 right-8 text-gray-600 group-hover:text-blue-400 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};