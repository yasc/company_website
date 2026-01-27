'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const PalantirHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '/services' },
    { name: 'Research', href: '/research' },
    { name: 'Data', href: '/data' },
    { name: 'Lab', href: '/lab' },
    { name: 'About', href: '/about' },
    { name: 'Careers', href: '/careers' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-panel py-3' 
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <nav className="max-w-[1440px] mx-auto px-8">
        <div className="flex items-center justify-between">
          {/* 1. Logo (Left) */}
          <Link href="/" className="text-lg font-bold text-charcoal tracking-tight uppercase group">
            Applied<span className="text-slate-500 group-hover:text-charcoal transition-colors">Economics</span>
          </Link>

          {/* 2. Clean Links (Center) */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className={`text-sm font-medium transition-colors duration-200 ${
                  pathname.startsWith(link.href)
                    ? 'text-charcoal font-semibold'
                    : 'text-slate-600 hover:text-charcoal'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* 3. "Get in Touch" Button (Right) */}
          <div className="hidden md:block">
            <Link 
              href="/contact" 
              className="btn-outline px-6 py-3 text-xs font-semibold uppercase tracking-wider border-slate-300 hover:border-charcoal hover:text-charcoal"
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-slate-200 animate-slide-up-fade">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href} 
                  className="text-sm font-medium text-slate-600 hover:text-charcoal uppercase tracking-wide"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                href="/contact" 
                className="btn-primary w-full text-center mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get in Touch
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
