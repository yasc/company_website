'use client';

import React from 'react';
import Link from 'next/link';

interface CareerHighlight {
  icon: string;
  title: string;
  description: string;
}

const highlights: CareerHighlight[] = [
  {
    icon: '🚀',
    title: 'Mission-Driven Work',
    description: 'Solve the world\'s most important problems with cutting-edge technology'
  },
  {
    icon: '🌍',
    title: 'Global Impact',
    description: 'Work on projects that affect millions of lives across the globe'
  },
  {
    icon: '🎯',
    title: 'Technical Excellence',
    description: 'Push the boundaries of what\'s possible with data and AI'
  },
  {
    icon: '🤝',
    title: 'Collaborative Culture',
    description: 'Join a team of brilliant, passionate people from diverse backgrounds'
  }
];

export const CareersSection: React.FC = () => {
  return (
    <section className="py-24 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Build the Future
              <br />
              with Us
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We're looking for exceptional engineers, designers, and problem-solvers 
              who want to use their skills to make a real difference in the world.
            </p>
            
            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex gap-4">
                  <div className="text-3xl">{highlight.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {highlight.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/careers"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded transition-all duration-200"
              >
                View Open Positions
              </Link>
              <Link
                href="/careers/students"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-gray-900 border-2 border-gray-900 hover:bg-gray-900 hover:text-white rounded transition-all duration-200"
              >
                Student Programs
              </Link>
            </div>
          </div>
          
          {/* Right Content - Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-1">
              <div className="bg-gray-100 rounded-2xl p-12">
                <div className="space-y-4">
                  {/* Job Cards Preview */}
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900">Software Engineer, Frontend</h4>
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">NEW</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">London, UK • Engineering</p>
                    <p className="text-sm text-gray-500">Build user interfaces that help analysts make critical decisions...</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900">Data Scientist</h4>
                      <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">REMOTE</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Multiple Locations • Data</p>
                    <p className="text-sm text-gray-500">Apply machine learning to solve complex real-world problems...</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900">Product Designer</h4>
                      <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded">HYBRID</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">London, UK • Design</p>
                    <p className="text-sm text-gray-500">Design intuitive experiences for complex data workflows...</p>
                  </div>
                </div>
                
                {/* View All Link */}
                <div className="mt-6 text-center">
                  <Link href="/careers" className="text-blue-600 hover:text-blue-800 font-semibold">
                    View all 50+ open positions →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};