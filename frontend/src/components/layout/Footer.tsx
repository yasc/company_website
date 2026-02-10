import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company — logo element, not a column header */}
          <div>
            <Link href="/" className="block mb-4">
              <img
                src="/assets/logo-black.svg"
                alt="Applied Economics"
                className="h-7"
              />
            </Link>
            <p className="text-slate-500 text-base leading-relaxed">
              Precision economics for a complex world.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-label mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services/economic-consulting" className="text-slate-600 hover:text-slate-900 text-base font-medium transition">
                  Economic Consulting
                </Link>
              </li>
              <li>
                <Link href="/services/data-ai-solutions" className="text-slate-600 hover:text-slate-900 text-base font-medium transition">
                  Data & AI Solutions
                </Link>
              </li>
              <li>
                <Link href="/services/policy-analysis" className="text-slate-600 hover:text-slate-900 text-base font-medium transition">
                  Policy Analysis
                </Link>
              </li>
              <li>
                <Link href="/services/training-workshops" className="text-slate-600 hover:text-slate-900 text-base font-medium transition">
                  Training & Workshops
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-label mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/research" className="text-slate-600 hover:text-slate-900 text-base font-medium transition">
                  Research Papers
                </Link>
              </li>
              <li>
                <Link href="/data" className="text-slate-600 hover:text-slate-900 text-base font-medium transition">
                  Datasets
                </Link>
              </li>
              <li>
                <Link href="/lab" className="text-slate-600 hover:text-slate-900 text-base font-medium transition">
                  Lab Guides
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-600 hover:text-slate-900 text-base font-medium transition">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-label mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-slate-900 text-base font-medium transition">
                  Get in Touch
                </Link>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-slate-900 text-base font-medium transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-slate-900 text-base font-medium transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-label">
              &copy; {new Date().getFullYear()} Applied Economics AI Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
