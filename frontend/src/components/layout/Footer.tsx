import Link from 'next/link';
import { Container } from '@/components/ui/Container';

const footerColumns = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Research', href: '/research' },
      { label: 'Data', href: '/data' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Lab', href: '/lab' },
      { label: 'Insights', href: '/insights' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];

const socialLinks = [
  { 
    label: 'LinkedIn', 
    href: 'https://linkedin.com', 
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ),
  },
  { 
    label: 'Twitter', 
    href: 'https://twitter.com', 
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-white dark-bg">
      <Container>
        <div className="py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Link 
                href="/" 
                className="inline-block text-h4 font-bold text-white hover:text-teal-400 no-underline"
              >
                Applied Economics
              </Link>
              <p className="mt-4 text-small text-gray-400">
                Rigorous economic research and data-driven insights for better decision making.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-4 mt-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-caption uppercase tracking-wider text-gray-400 mb-4">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-small text-gray-300 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-navy-700">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-caption text-gray-500">
                © {currentYear} Applied Economics. All rights reserved.
              </p>
              <div className="flex gap-6">
                <Link
                  href="/privacy"
                  className="text-caption text-gray-500 hover:text-white transition-colors"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  className="text-caption text-gray-500 hover:text-white transition-colors"
                >
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
