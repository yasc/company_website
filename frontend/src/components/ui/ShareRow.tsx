'use client';

import { useState, useCallback } from 'react';

interface ShareRowProps {
  url: string;
  title: string;
}

export function ShareRow({ url, title }: ShareRowProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silent fail — non-critical action
    }
  }, [url]);

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;

  return (
    <div className="flex items-center gap-4">
      <span className="text-label">Share</span>

      {/* LinkedIn */}
      <a
        href={linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn (opens in new window)"
        className="text-[#64748B] transition-colors duration-150 hover:text-[#111827]"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M13.6 0H2.4C1.08 0 0 1.08 0 2.4v11.2C0 14.92 1.08 16 2.4 16h11.2c1.32 0 2.4-1.08 2.4-2.4V2.4C16 1.08 14.92 0 13.6 0zM4.96 13.6H2.56V6.08h2.4v7.52zM3.76 5.04c-.8 0-1.44-.64-1.44-1.44s.64-1.44 1.44-1.44 1.44.64 1.44 1.44-.64 1.44-1.44 1.44zm10.08 8.56h-2.4V9.92c0-.88-.016-2-.1.24-2s-1.36.56-1.36 1.76v3.92H6.56V6.08h2.32v1.04h.032c.32-.608 1.104-1.248 2.272-1.248 2.432 0 2.88 1.6 2.88 3.68v4.032z" />
        </svg>
      </a>

      {/* Twitter/X */}
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X (opens in new window)"
        className="text-[#64748B] transition-colors duration-150 hover:text-[#111827]"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" />
        </svg>
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        type="button"
        aria-label={copied ? 'Link copied' : 'Copy link'}
        className="text-[#64748B] transition-colors duration-150 hover:text-[#111827]"
      >
        {copied ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6.5 9.5L9.5 6.5M7 4L8.5 2.5a2.828 2.828 0 1 1 4 4L11 8M5 8L3.5 9.5a2.828 2.828 0 1 0 4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
      <div aria-live="polite" className="sr-only">
        {copied ? 'Link copied to clipboard' : ''}
      </div>
    </div>
  );
}
