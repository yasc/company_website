'use client';

import React from 'react';
import Link from 'next/link';

export const PalantirHero = () => {
  return (
    <section className="hero-split-layout">
      {/* Left Column: Content */}
      <div className="hero-content px-8 md:px-12 lg:pl-32 flex flex-col justify-center animate-slide-up-fade">
        <h1 className="text-display mb-6 leading-[1.1] text-charcoal">
          Precision Economics for a <br /> Complex World
        </h1>
        <p className="text-body-lg max-w-xl mb-10 leading-relaxed">
          Algorithmic strategy for the Fortune 500.
        </p>
        <div className="cta-group flex gap-4">
          <Link href="/services" className="btn-primary">
            Our Services
          </Link>
        </div>
      </div>

      {/* Right Column: Video Visual */}
      <div className="hero-visual-container opacity-0 animate-slide-up-fade delay-200">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="auto"
          poster="/assets/hero-poster.jpg" 
          className="hero-video"
          aria-hidden="true"
        >
          <source src="/assets/hero-visual.webm" type="video/webm" />
          <source src="/assets/hero-visual.mp4" type="video/mp4" />
        </video>
        <div className="video-gradient-mask"></div>
      </div>
    </section>
  );
};
