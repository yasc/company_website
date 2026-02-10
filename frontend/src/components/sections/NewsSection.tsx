'use client';

import React from 'react';
import Link from 'next/link';

interface NewsItem {
  date: string;
  title: string;
  description: string;
  link: string;
}

const newsItems: NewsItem[] = [
  {
    date: '10 February 2025',
    title: 'AEAI Provides Expert Evidence on AI in Government to Parliamentary Committee',
    description: 'Our team presented findings on the role of artificial intelligence in public sector decision-making.',
    link: '/insights/parliamentary-evidence'
  },
  {
    date: '1 November 2024',
    title: 'VoxEU Article Reveals Remote Worker Migration Reshaping US Electoral Map',
    description: 'New research documents the blue-to-red state exodus among remote workers ahead of the 2024 election.',
    link: '/insights/voxeu-remote-workers'
  },
  {
    date: '15 October 2024',
    title: 'AEAI Presenting at Google DeepMind / ESRC Conference',
    description: 'A range of our data products and research projects featured at this year\'s joint conference.',
    link: '/insights/deepmind-esrc-conference'
  }
];

export const NewsSection: React.FC = () => {
  return (
    <section className="section-standard bg-section-alt">
      <div className="container-wide">
        {/* Section Header */}
        <div className="flex justify-between items-baseline mb-12">
          <h2 className="section-header-enterprise">In the News</h2>
          <Link href="/insights" className="link-specs">
            View All Insights
          </Link>
        </div>

        {/* News Grid - 3 columns with gap */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              aria-label={`Read more: ${item.title}`}
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
                <h3 className="text-h3 mb-4 leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-body leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom Section */}
              <div className="pt-6">
                <span className="link-explore group-hover:gap-3">
                  Explore
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
