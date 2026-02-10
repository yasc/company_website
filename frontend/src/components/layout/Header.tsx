'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);

      // Hide on scroll down, show on scroll up
      if (currentScrollY > 80) {
        setIsHeaderVisible(currentScrollY < lastScrollY.current);
      } else {
        setIsHeaderVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

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
    { name: 'Services', href: '/services' },
    { name: 'Research', href: '/research' },
    { name: 'Data', href: '/data' },
    { name: 'Lab', href: '/lab' },
    { name: 'About', href: '/about' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled
            ? 'bg-[#F9F9FB]/80 backdrop-blur-xl border-b border-[#E2E8F0]/60'
            : 'bg-[#F9F9FB] border-b border-transparent'
        }`}
      >
        <nav className="max-w-[1440px] mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center">
              <img
                src="/assets/logo-black.svg"
                alt="Applied Economics"
                className="h-12 block translate-y-0.5"
              />
            </Link>

            {/* Nav Links */}
            <div className="hidden md:flex items-center justify-center gap-8 flex-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-[18px] font-medium tracking-wide transition-colors duration-200 py-1 text-black hover:underline underline-offset-4 decoration-[1.5px] ${
                    pathname.startsWith(link.href) ? 'underline' : ''
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center flex-shrink-0">
              <Link
                href="/contact"
                className="text-[15px] font-medium tracking-wide px-5 py-2.5 border border-slate-300 text-slate-600 hover:border-charcoal hover:text-charcoal transition-all duration-200"
              >
                Get in Touch
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              ref={menuButtonRef}
              className="md:hidden relative z-50 p-2 text-slate-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`block h-[1.5px] bg-current transition-all duration-300 origin-center ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-[9px]' : ''
                  }`}
                />
                <span
                  className={`block h-[1.5px] bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0 scale-x-0' : ''
                  }`}
                />
                <span
                  className={`block h-[1.5px] bg-current transition-all duration-300 origin-center ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen Mobile Overlay */}
      <div
        id="mobile-nav"
        ref={mobileNavRef}
        role="navigation"
        aria-label="Mobile navigation"
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-[#F9F9FB]/95 backdrop-blur-xl transition-opacity duration-500 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeMobileMenu}
        />

        {/* Menu Content */}
        <div className="relative flex flex-col justify-center items-start h-full px-10">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              className={`block text-[2rem] font-medium tracking-tight transition-all duration-500 py-3 ${
                pathname.startsWith(link.href)
                  ? 'text-charcoal'
                  : 'text-slate-400 hover:text-charcoal'
              } ${
                isMobileMenuOpen
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{
                transitionDelay: isMobileMenuOpen ? `${150 + index * 60}ms` : '0ms',
              }}
              onClick={closeMobileMenu}
            >
              {link.name}
            </Link>
          ))}
          <div
            className={`mt-8 transition-all duration-500 ${
              isMobileMenuOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
            style={{
              transitionDelay: isMobileMenuOpen ? `${150 + navLinks.length * 60}ms` : '0ms',
            }}
          >
            <Link
              href="/contact"
              className="text-base font-medium tracking-wide px-6 py-3 border border-slate-300 text-slate-600 hover:border-charcoal hover:text-charcoal transition-all duration-200"
              onClick={closeMobileMenu}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
