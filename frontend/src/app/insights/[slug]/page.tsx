import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { TopicTags } from '@/components/ui/TopicTags';
import { insights, getInsightBySlug, getRelatedInsights, formatDate } from '@/lib/insights-data';
import { renderBody } from '@/lib/render-body';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) return { title: 'Not Found' };

  return {
    title: insight.title,
    description: insight.excerpt,
    openGraph: {
      type: 'article',
      publishedTime: insight.publishedAt,
    },
  };
}

export default async function InsightDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);

  if (!insight) {
    notFound();
  }

  const relatedInsights = getRelatedInsights(slug, 3);
  const bodyHtml = renderBody(insight.body);
  const formattedDate = formatDate(insight.publishedAt);

  return (
    <article>
      {/* Section 1: Article Header */}
      <section className="bg-white pt-24 lg:pt-24 pb-0">
        <Container size="narrow">
          {/* Topic Tags */}
          <div>
            <TopicTags topics={insight.topics} />
          </div>

          {/* Title */}
          <h1 className="text-display mt-6 max-w-[660px]" style={{ lineHeight: 1.1 }}>
            {insight.title}
          </h1>

          {/* Excerpt */}
          <p className="text-body-lg mt-6 max-w-[660px]" style={{ lineHeight: 1.6 }}>
            {insight.excerpt}
          </p>

          {/* Meta line */}
          <p className="text-metadata mt-8">
            <time dateTime={insight.publishedAt}>
              {formattedDate.toUpperCase()}
            </time>
            {' '}&middot;{' '}
            {insight.readTime} MIN READ
          </p>

          {/* Divider */}
          <hr className="mt-12 border-t border-[#CBD5E1]" />
        </Container>
      </section>

      {/* Section 2: Article Body */}
      <section className="bg-white pt-12 pb-0">
        <Container size="narrow">
          <div
            className="article-prose max-w-[660px]"
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />
        </Container>
      </section>

      {/* Section 3: Tags */}
      <section className="bg-white pt-16 pb-20">
        <Container size="narrow">
          <hr className="mb-12 border-t border-[#CBD5E1]" />
          <TopicTags topics={insight.topics} />
        </Container>
      </section>

      {/* Section 4: Related Articles */}
      {relatedInsights.length > 0 && (
        <section className="bg-section-alt section-standard">
          <div className="container-wide">
            {/* Section Header */}
            <div className="flex justify-between items-baseline mb-12">
              <h2 className="section-header-enterprise">Related Insights</h2>
              <Link href="/insights" className="link-specs">
                View All
              </Link>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedInsights.map((related) => (
                <Link
                  key={related.slug}
                  href={`/insights/${related.slug}`}
                  aria-label={`Read more: ${related.title}`}
                  className="enterprise-card flex flex-col justify-between min-h-[320px] group"
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-metadata">
                        {formatDate(related.publishedAt)}
                      </span>
                      <span className="status-dot" aria-hidden="true"></span>
                    </div>
                    <h3 className="text-h3 mb-4 leading-snug">
                      {related.title}
                    </h3>
                    <p className="text-body leading-relaxed">
                      {related.excerpt}
                    </p>
                  </div>
                  <div className="pt-6">
                    <span className="link-explore group-hover:gap-3">
                      Explore
                      <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section 5: CTA Band */}
      <section className="bg-white pt-20 pb-30">
        <div className="container-wide">
          <div className="enterprise-card p-12 text-center">
            <span className="text-label">Stay Informed</span>
            <h2 className="text-h2 mt-4">Stay informed.</h2>
            <p className="text-body mt-4 max-w-[480px] mx-auto">
              Receive our latest research and data insights.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <Link href="/subscribe" className="btn-primary">
                Subscribe to Updates
              </Link>
              <Link href="/contact" className="btn-outline">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
