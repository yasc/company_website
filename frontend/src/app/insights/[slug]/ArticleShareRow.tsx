'use client';

import { ShareRow } from '@/components/ui/ShareRow';

interface ArticleShareRowProps {
  title: string;
}

export function ArticleShareRow({ title }: ArticleShareRowProps) {
  const url = typeof window !== 'undefined' ? window.location.href : '';
  return <ShareRow url={url} title={title} />;
}
