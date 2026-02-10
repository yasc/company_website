'use client';

import React, { useState } from 'react';

const highlights = [
  {
    label: 'DATA HIGHLIGHT',
    title: 'Digitising America\'s Lending History',
    description: 'We deployed LLM tools to digitise 40 million archival loan documents, transforming handwritten records into the most granular dataset of US firm-lender relationships available to researchers and policymakers. The dataset covers 1.8 million firms and 179 bank failures from 1990 to 2023. It is now used by academic researchers and financial institutions to study the causal effects of bank distress on firm outcomes, employment, and local economic activity.',
    metrics: [
      { value: '40M+', label: 'DOCUMENTS DIGITISED' },
      { value: '1.8M', label: 'FIRMS COVERED' },
      { value: '33yr', label: 'TIME SPAN' },
    ],
  },
  {
    label: 'ENGAGEMENT HIGHLIGHT',
    title: 'DSGE Forecasting for a US Hedge Fund',
    description: 'We designed and implemented DSGE forecasting models for a leading US asset manager, producing forecasts for inflation, output, and employment. The models combined structural macroeconomic theory with Bayesian estimation to generate scenario-based projections. These informed bond yield positioning and macroeconomic strategy across the fund\'s fixed income portfolio.',
    metrics: [
      { value: 'DSGE', label: 'MODEL CLASS' },
      { value: '3', label: 'MACRO VARIABLES' },
      { value: 'US', label: 'ECONOMY' },
    ],
  },
  {
    label: 'DATA HIGHLIGHT',
    title: 'Mapping Global Production with Generative AI',
    description: 'We built AIPNET, a generative AI map of global production connecting 5,000+ products through their input-output relationships. Using an ensemble of prompt-tuned AI classifications, we document shifts in the network position of products and countries during the 21st century — revealing how global supply chains have restructured.',
    metrics: [
      { value: '5,000+', label: 'PRODUCT NODES' },
      { value: 'AI', label: 'CLASSIFICATION METHOD' },
      { value: 'Global', label: 'COVERAGE' },
    ],
  },
];

export const HighlightsCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const highlight = highlights[current];

  return (
    <section className="bg-white section-standard">
      <div className="container-wide">
        <div className="flex justify-between items-baseline mb-12">
          <h2 className="section-header-enterprise">Selected Highlights</h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrent((prev) => (prev - 1 + highlights.length) % highlights.length)}
              aria-label="Previous highlight"
              className="text-[#64748B] hover:text-[#111827] transition-colors text-lg"
            >
              &larr;
            </button>
            <span className="font-mono text-sm text-[#64748B]">
              {String(current + 1).padStart(2, '0')} / {String(highlights.length).padStart(2, '0')}
            </span>
            <button
              onClick={() => setCurrent((prev) => (prev + 1) % highlights.length)}
              aria-label="Next highlight"
              className="text-[#64748B] hover:text-[#111827] transition-colors text-lg"
            >
              &rarr;
            </button>
          </div>
        </div>

        <div className="enterprise-card p-12 md:p-16">
          {/* Grid-stack: all cards in same cell, tallest sets height */}
          <div className="grid" style={{ gridTemplateColumns: '1fr', gridTemplateRows: '1fr' }}>
            {highlights.map((h, index) => (
              <div
                key={index}
                className={index === current ? '' : 'invisible'}
                style={{ gridArea: '1 / 1' }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  {/* Left: narrative */}
                  <div className="lg:col-span-5">
                    <span className="text-label">{h.label}</span>
                    <h3 className="text-h2 mt-4">{h.title}</h3>
                    <p className="text-body mt-4">{h.description}</p>
                  </div>

                  {/* Right: metrics */}
                  <div className="lg:col-span-6 lg:col-start-7 flex items-center">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full">
                      {h.metrics.map((metric, mi) => (
                        <div key={mi}>
                          <dd className="font-mono text-3xl md:text-4xl font-semibold tracking-tight text-[#111827] leading-none">
                            {metric.value}
                          </dd>
                          <dt className="text-metadata mt-1">{metric.label}</dt>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {highlights.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              aria-label={`Go to highlight ${index + 1}`}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === current ? 'bg-[#111827]' : 'bg-[#CBD5E1]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
