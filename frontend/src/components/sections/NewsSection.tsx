'use client';

import React from 'react';
import Link from 'next/link';

interface NewsItem {
  date: string;
  title: string;
  description: string;
  link: string;
  type: 'article' | 'press' | 'announcement';
}

const newsItems: NewsItem[] = [
  {
    date: '15 January 2025',
    title: 'Palantir Partners with NHS England for Digital Transformation',
    description: 'New partnership aims to revolutionize patient care through advanced data analytics and AI-powered insights.',
    link: '/news/nhs-partnership',
    type: 'press'
  },
  {
    date: '10 January 2025',
    title: 'AIP Platform Drives 40% Efficiency Gains in Healthcare Operations',
    description: 'Latest case study reveals significant improvements in resource allocation and patient outcomes.',
    link: '/news/aip-healthcare',
    type: 'article'
  },
  {
    date: '5 January 2025',
    title: 'Foundry Selected for Major Government Initiative',
    description: 'Platform to power nationwide data integration effort across multiple agencies.',
    link: '/news/government-initiative',
    type: 'announcement'
  }
];

export const NewsSection: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            In the News
          </h2>
          <div className="flex justify-between items-center">
            <p className="text-xl text-gray-600">
              Latest updates and announcements
            </p>
            <Link 
              href="/news" 
              className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2 transition-colors"
            >
              View all news
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
        
        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <article 
              key={index}
              className="group border-t-2 border-gray-200 pt-8 hover:border-blue-500 transition-all duration-300"
            >
              {/* Date and Type */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm text-gray-500 uppercase tracking-wider">
                  {item.date}
                </span>
                <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded
                  ${item.type === 'press' ? 'bg-blue-100 text-blue-700' : 
                    item.type === 'article' ? 'bg-green-100 text-green-700' : 
                    'bg-purple-100 text-purple-700'}`}
                >
                  {item.type}
                </span>
              </div>
              
              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                <Link href={item.link}>
                  {item.title}
                </Link>
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 mb-4 leading-relaxed">
                {item.description}
              </p>
              
              {/* Read More Link */}
              <Link 
                href={item.link}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold group-hover:gap-3 transition-all"
              >
                Read more
                <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};