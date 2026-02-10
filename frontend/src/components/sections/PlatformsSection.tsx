import React from 'react';
import Link from 'next/link';

export const PlatformsSection = () => {
  const dataProducts = [
    {
      name: 'AIPNET',
      desc: 'A generative AI map of global production, revealing input-output connections across 5,000+ products.',
      link: '/data/aipnet'
    },
    {
      name: 'Work from Home Map',
      desc: 'The definitive picture of remote work, built from 250M+ job postings across five countries.',
      link: '/data/wfh-map'
    },
    {
      name: 'Machinery of Progress',
      desc: 'A real-time pulse on economic expansion, tracking capital investment through administrative data and AI.',
      link: '/data/machinery-of-progress'
    },
    {
      name: 'US Firm-Lender Credit Map',
      desc: 'The hidden history of American credit, reconstructed from 40M+ archival loan documents.',
      link: '/data/bad-bank'
    },
  ];

  return (
    <section className="bg-section-alt section-standard">
      <div className="container-wide">
        <div className="flex justify-between items-end mb-12">
          <h2 className="section-header-enterprise">
            Data Products
          </h2>
          <Link href="/data" className="link-specs">
            View All Data
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dataProducts.map((product) => (
            <Link
              key={product.name}
              href={product.link}
              aria-label={`Explore ${product.name} data product`}
              className="enterprise-card group hover:border-slate-900 transition-colors duration-300 flex flex-col"
            >
              {/* Technical Header */}
              <div className="flex justify-end items-center mb-6">
                <div className="h-2 w-2 bg-[#CBD5E1] group-hover:bg-slate-900 rounded-full transition-colors"></div>
              </div>

              <h3 className="text-h3 mb-3 group-hover:underline decoration-1 underline-offset-4">
                {product.name}
              </h3>

              <p className="text-body mb-6 flex-grow">
                {product.desc}
              </p>

              <div className="link-explore mt-auto">
                Explore <span className="ml-2">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
