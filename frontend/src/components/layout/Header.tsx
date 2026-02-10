'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key and trap focus
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      // Focus trap
      if (e.key === 'Tab' && mobileNavRef.current) {
        const focusableElements = mobileNavRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Focus first nav link when menu opens
  useEffect(() => {
    if (isMobileMenuOpen && mobileNavRef.current) {
      const firstLink = mobileNavRef.current.querySelector<HTMLElement>('a[href]');
      firstLink?.focus();
    }
  }, [isMobileMenuOpen]);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Research', href: '/research' },
    { name: 'Data', href: '/data' },
    { name: 'Lab', href: '/lab' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-[#F9F9FB] transition-all duration-300 ${
        isScrolled
          ? 'border-b border-[#E2E8F0]'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="max-w-[1440px] mx-auto px-8">
        <div className="flex items-center justify-between min-h-[80px] py-5">
          {/* 1. Logo (Left) */}
          <Link href="/" className="flex-shrink-0 text-[32px] font-display font-bold text-charcoal tracking-tight uppercase group">
            Applied <span className="text-slate-500 group-hover:text-charcoal transition-colors">Economics</span>
          </Link>

          {/* 2. Nav Links (Center) */}
          <div className="hidden md:flex items-center justify-center gap-8 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[26px] font-medium transition-colors duration-200 ${
                  pathname.startsWith(link.href)
                    ? 'text-black font-semibold'
                    : 'text-black hover:text-black'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* 3. "Get in Touch" Button (Right) */}
          <div className="hidden md:block flex-shrink-0">
            <Link
              href="/contact"
              className="btn-outline px-6 py-3 font-semibold uppercase tracking-wider border-slate-300 hover:border-charcoal hover:text-charcoal"
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            className="md:hidden p-2 text-slate-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
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
          <div
            id="mobile-nav"
            ref={mobileNavRef}
            role="navigation"
            aria-label="Mobile navigation"
            className="md:hidden mt-4 pt-4 border-t border-slate-200 animate-slide-up-fade"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[20px] font-medium text-slate-600 hover:text-charcoal"
                  onClick={closeMobileMenu}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="btn-primary w-full text-center mt-2"
                onClick={closeMobileMenu}
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
