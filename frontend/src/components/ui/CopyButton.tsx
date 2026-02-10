'use client';

import { useState, useCallback } from 'react';

interface CopyButtonProps {
  text: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
}

export function CopyButton({
  text,
  label = 'Copy',
  copiedLabel = 'Copied',
  className = '',
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  return (
    <>
      <button
        onClick={handleCopy}
        className={`btn-outline ${className}`}
        type="button"
      >
        {copied ? (
          <span className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {copiedLabel}
          </span>
        ) : (
          label
        )}
      </button>
      <div aria-live="polite" className="sr-only">
        {copied ? 'Copied to clipboard' : ''}
      </div>
    </>
  );
}
