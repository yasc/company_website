'use client';

import React from 'react';
import Link from 'next/link';

interface NewsItem {
  date: string;
  title: string;
  description: string;
  link: string;
  version?: string;
}

const newsItems: NewsItem[] = [
  {
    date: '15 January 2025',
    title: 'Palantir Partners with NHS England for Digital Transformation',
    description: 'New partnership aims to revolutionize patient care through advanced data analytics and AI-powered insights.',
    link: '/news/nhs-partnership',
    version: 'v.25.01'
  },
  {
    date: '10 January 2025',
    title: 'AIP Platform Drives 40% Efficiency Gains in Healthcare Operations',
    description: 'Latest case study reveals significant improvements in resource allocation and patient outcomes.',
    link: '/news/aip-healthcare',
    version: 'v.25.02'
  },
  {
    date: '5 January 2025',
    title: 'Foundry Selected for Major Government Initiative',
    description: 'Platform to power nationwide data integration effort across multiple agencies.',
    link: '/news/government-initiative',
    version: 'v.25.03'
  }
];

export const NewsSection: React.FC = () => {
  return (
    <section className="py-24 bg-section-alt">
      <div className="container-wide">
        {/* Section Header */}
        <div className="flex justify-between items-baseline mb-12">
          <h2 className="section-header-enterprise">In the News</h2>
          <Link href="/news" className="link-specs">
            View All News
          </Link>
        </div>
        
        {/* News Grid - 3 columns with gap */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems.map((item, index) => (
            <article 
              key={index}
              className="enterprise-card flex flex-col justify-between min-h-[320px] group"
            >
              {/* Top Section */}
              <div>
                {/* Meta Row */}
                <div className="flex justify-between items-start mb-6">
                  <span className="text-metadata">
                    {item.date}
                  </span>
                  <span className="status-dot"></span>
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-[#111827] mb-4 leading-tight">
                  {item.title}
                </h3>
                
                {/* Description */}
                <p className="text-[#475569] text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
              
              {/* Bottom Section */}
              <div className="flex justify-between items-center pt-6">
                <Link 
                  href={item.link}
                  className="link-explore group-hover:gap-3"
                >
                  Explore
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
                {item.version && (
                  <span className="text-metadata">{item.version}</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
