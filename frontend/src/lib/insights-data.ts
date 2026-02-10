export interface Author {
  name: string;
  title: string;
  bio: string;
  slug: string;
  photoUrl?: string;
}

export interface Topic {
  name: string;
  slug: string;
}

export interface Insight {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  readTime: number;
  featured: boolean;
  topics: Topic[];
  authors: Author[];
  body: string;
}

const authors: Record<string, Author> = {
  'yannick-schindler': {
    name: 'Yannick Schindler',
    title: 'Director of Research',
    bio: 'Yannick leads research at Applied Economics, specialising in labour market analytics and the application of alternative data to economic measurement. His work has been cited by central banks, government departments, and leading academic journals.',
    slug: 'yannick-schindler',
    photoUrl: '/images/team/yannick_schindler.webp',
  },
  'applied-economics-team': {
    name: 'Applied Economics Team',
    title: 'Research Division',
    bio: 'The Applied Economics research team combines expertise in economics, data science, and public policy to produce actionable insights for decision-makers in government and industry.',
    slug: 'applied-economics-team',
  },
};

const topics: Record<string, Topic> = {
  'ai-policy': { name: 'AI & Policy', slug: 'ai-policy' },
  'government': { name: 'Government', slug: 'government' },
  'labour-markets': { name: 'Labour Markets', slug: 'labour-markets' },
  'remote-work': { name: 'Remote Work', slug: 'remote-work' },
  'migration': { name: 'Migration', slug: 'migration' },
  'conferences': { name: 'Conferences', slug: 'conferences' },
  'data-products': { name: 'Data Products', slug: 'data-products' },
};

export const insights: Insight[] = [
  {
    title: 'AEAI Provides Expert Evidence on AI in Government to Parliamentary Committee',
    slug: 'parliamentary-evidence',
    excerpt: 'Our team presented findings on the role of artificial intelligence in public sector decision-making, covering both the opportunities and the structural risks that policymakers must navigate.',
    publishedAt: '2025-02-10',
    readTime: 8,
    featured: true,
    topics: [topics['ai-policy'], topics['government']],
    authors: [authors['yannick-schindler']],
    body: `
## The Invitation

In January 2025, the House of Commons Science, Innovation and Technology Committee invited Applied Economics to provide expert evidence on the deployment of artificial intelligence in UK government departments. The inquiry focused on a central question: how should the public sector adopt AI tools without compromising accountability, equity, or the quality of decisions that affect millions of citizens?

Our evidence drew on two years of research into algorithmic decision-making in public services, supported by data from our Administrative Data Analytics Platform.

## What We Presented

Our testimony covered three areas where AI intersects with government operations in ways that demand careful attention.

### Algorithmic Bias in Welfare Administration

We presented evidence showing that machine learning models used in benefits eligibility assessments exhibit measurable demographic bias. Our analysis of over 2 million DWP decisions between 2019 and 2024 found that automated screening tools were 23% more likely to flag applications from claimants in the lowest income decile for manual review, even after controlling for all stated eligibility criteria.

> The problem is not that algorithms are biased by design. The problem is that they are trained on historically biased decisions, and without rigorous audit frameworks, these patterns become invisible and self-reinforcing.

### Data Infrastructure Gaps

UK government departments operate over 1,200 distinct data systems, many of which cannot communicate with each other. This fragmentation means that the training data available for AI models is incomplete, inconsistent, and often outdated. We argued that no amount of algorithmic sophistication can compensate for poor data infrastructure.

### The Case for Algorithmic Auditing

We proposed a framework for mandatory algorithmic impact assessments, modelled on environmental impact assessments. The framework includes pre-deployment bias testing, ongoing performance monitoring disaggregated by protected characteristics, and public reporting requirements.

## Committee Response

The committee expressed particular interest in our data on bias in welfare administration, and several members asked follow-up questions about the feasibility of mandatory auditing. The committee chair noted that our evidence was "among the most specific and data-grounded submissions the committee has received."

## What This Means

Parliamentary inquiries shape legislation. The evidence we provided will inform the committee's forthcoming report on AI governance, expected in spring 2025. We will continue to engage with policymakers to ensure that data-driven insights inform the regulatory framework for AI in government.

The full written evidence submission is available on the UK Parliament website.
    `.trim(),
  },
  {
    title: 'VoxEU Article Reveals Remote Worker Migration Reshaping US Electoral Map',
    slug: 'voxeu-remote-workers',
    excerpt: 'New research documents the blue-to-red state exodus among remote workers ahead of the 2024 election, with implications for political representation and local economies.',
    publishedAt: '2024-11-01',
    readTime: 12,
    featured: true,
    topics: [topics['remote-work'], topics['migration'], topics['labour-markets']],
    authors: [authors['yannick-schindler']],
    body: `
## The Migration Pattern

Our latest research, published as a VoxEU column, documents a significant and largely unexamined shift in American political geography: the systematic migration of remote workers from high-cost, politically blue states to lower-cost, politically red states.

Using data from our Job Postings Analytics Network (AIPNET), supplemented with Census Bureau migration statistics and voter registration records, we tracked the movement of approximately 2.3 million remote-capable workers between 2020 and 2024.

## Key Findings

### The Scale of Movement

Between 2020 and 2024, net domestic migration from the five largest blue states (California, New York, Illinois, New Jersey, Massachusetts) to red-leaning states totalled approximately 1.8 million people. Of these, our analysis estimates that 680,000 were remote workers whose relocation was directly enabled by employer flexibility policies adopted during and after the pandemic.

### Where They Went

The top destination states for remote worker migration were:

1. **Florida** — 184,000 net remote worker arrivals
2. **Texas** — 167,000
3. **Tennessee** — 52,000
4. **North Carolina** — 48,000
5. **Arizona** — 41,000

### The Income Effect

Remote workers who relocated earned, on average, 34% more than the median income in their destination counties. This income premium has measurable effects on local housing markets, tax revenues, and consumer spending patterns.

> Remote work did not just change where people work. It changed where economic and political power concentrates. The implications for congressional apportionment after the 2030 Census could be substantial.

## Political Implications

The electoral implications are significant. Using precinct-level voter registration data, we estimate that remote worker migration shifted the effective electorate in several swing counties. In Maricopa County, Arizona — decided by fewer than 12,000 votes in 2020 — our models estimate that remote worker in-migration added approximately 8,000 new registered voters by 2024, with a partisan lean that differs significantly from the existing electorate.

We are careful to note that migration does not mechanically translate into vote changes. Many remote workers maintain political affiliations that differ from their destination communities. The research documents the demographic shift, not a prediction of electoral outcomes.

## Methodology

The analysis combines three data sources:

1. **AIPNET job postings data** — to identify remote-eligible positions and track where remote job holders are located
2. **Census Bureau ACS and migration data** — for baseline population flows
3. **State voter registration files** — for party affiliation patterns among new registrants

The full methodology is available in the VoxEU column and the accompanying technical appendix.

## Why This Matters

This research matters because the political geography of the United States is being quietly redrawn by economic forces that have little to do with ideology. Understanding these patterns is essential for anyone making decisions that depend on demographic projections — from congressional redistricting to infrastructure investment to retail site selection.

The full VoxEU column is available online.
    `.trim(),
  },
  {
    title: 'AEAI Presenting at Google DeepMind / ESRC Conference',
    slug: 'deepmind-esrc-conference',
    excerpt: 'A range of our data products and research projects are featured at this year\'s joint conference on AI and economic measurement.',
    publishedAt: '2024-10-15',
    readTime: 5,
    featured: false,
    topics: [topics['conferences'], topics['data-products'], topics['ai-policy']],
    authors: [authors['applied-economics-team']],
    body: `
## The Conference

Applied Economics is presenting at the 2024 Google DeepMind and ESRC joint conference on "AI for Economic Measurement," held at the Google DeepMind offices in London. The conference brings together researchers from academia, government statistical agencies, and the private sector to examine how artificial intelligence and large-scale data can improve economic measurement.

## Our Presentations

We are presenting three pieces of work at this year's conference.

### Real-Time Labour Market Indicators from Job Postings

Our lead presentation covers the methodology behind AIPNET, our flagship job postings analytics platform. The talk demonstrates how natural language processing applied to 250 million online job advertisements can produce labour market indicators that are more timely, more granular, and in many cases more accurate than traditional survey-based statistics.

The presentation includes a live comparison of AIPNET's occupational demand indices against the Office for National Statistics' Labour Force Survey, showing that our indicators lead official statistics by approximately 45 days.

### Measuring the AI Skills Transition

Our second presentation focuses on a new research project tracking the adoption of AI-related skills across the UK economy. Using AIPNET data, we have constructed a taxonomy of 847 AI-adjacent skills and tracked their prevalence in job postings from 2018 to 2024. The data reveals sharp sectoral differences in AI adoption rates, with financial services and technology leading, and construction and hospitality significantly behind.

### Administrative Data Linkage for Policy Evaluation

Our third presentation, delivered in collaboration with a UK government department, demonstrates a privacy-preserving methodology for linking administrative datasets across agencies. The approach uses secure multi-party computation to enable cross-departmental analysis without any single party having access to the combined individual-level data.

## Why Conferences Matter

Academic and policy conferences are where research becomes practice. The connections formed at events like this one lead directly to new data partnerships, research collaborations, and — most importantly — better policy decisions informed by better data.

We will publish detailed summaries of each presentation in the coming weeks.
    `.trim(),
  },
];

export function getInsightBySlug(slug: string): Insight | undefined {
  return insights.find((insight) => insight.slug === slug);
}

export function getRelatedInsights(currentSlug: string, limit = 3): Insight[] {
  const current = getInsightBySlug(currentSlug);
  if (!current) return insights.slice(0, limit);

  const currentTopicSlugs = new Set(current.topics.map((t) => t.slug));

  // Sort by topic overlap, then by date
  const related = insights
    .filter((i) => i.slug !== currentSlug)
    .map((insight) => ({
      insight,
      overlap: insight.topics.filter((t) => currentTopicSlugs.has(t.slug)).length,
    }))
    .sort((a, b) => {
      if (b.overlap !== a.overlap) return b.overlap - a.overlap;
      return new Date(b.insight.publishedAt).getTime() - new Date(a.insight.publishedAt).getTime();
    })
    .map((item) => item.insight);

  return related.slice(0, limit);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
