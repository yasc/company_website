import { getAboutPage } from '@/lib/strapiClient';
import { Hero, ContentBlock, StatGrid, CtaBand } from '@/components/sections';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface StrapiResponse {
  data?: any;
  meta?: any;
}

// Fallback content
const fallbackHero = {
  headline: 'About Applied Economics',
  subheadline: 'We are a team of economists, data scientists, and researchers dedicated to producing work that matters.',
};

const fallbackStats = [
  { value: '20+', label: 'Years Experience' },
  { value: '500+', label: 'Research Projects' },
  { value: '50+', label: 'Team Members' },
  { value: '100+', label: 'Publications' },
];

const fallbackStory = {
  title: 'Our Story',
  content: `Applied Economics was founded on a simple premise: rigorous economic research can and should drive real-world change. What started as a small consultancy has grown into a leading research organization with a global reach.

We believe that evidence-based decision making is the foundation of progress. Our work spans industries and geographies, but our commitment remains the same—producing research that is methodologically sound, practically relevant, and accessible to those who need it most.`,
};

const fallbackMission = {
  title: 'Our Mission',
  content: `Our mission is to bridge the gap between academic economics and practical application. We work with governments, businesses, and nonprofits to translate complex economic insights into actionable strategies.

We are committed to methodological rigor, transparency in our processes, and making our work accessible to diverse audiences. Every project we undertake aims to create measurable, positive impact.`,
};

const fallbackApproach = {
  title: 'Our Approach',
  content: `We combine traditional economic analysis with modern data science techniques to deliver insights that are both theoretically grounded and practically applicable.

Our interdisciplinary team brings together expertise in econometrics, machine learning, policy analysis, and strategic consulting. This diversity of perspectives enables us to tackle complex problems from multiple angles and deliver comprehensive solutions.`,
};

export default async function AboutPage() {
  let aboutPageData: StrapiResponse | null = null;

  try {
    aboutPageData = (await getAboutPage()) as StrapiResponse;
  } catch (error) {
    console.log('Strapi not available, using fallback content');
  }

  const hero = aboutPageData?.data?.hero
    ? {
        headline: aboutPageData.data.hero.headline || fallbackHero.headline,
        subheadline: aboutPageData.data.hero.subheadline || fallbackHero.subheadline,
      }
    : fallbackHero;

  const story = aboutPageData?.data
    ? {
        title: aboutPageData.data.storyTitle || fallbackStory.title,
        content: aboutPageData.data.storyContent || fallbackStory.content,
      }
    : fallbackStory;

  const mission = aboutPageData?.data
    ? {
        title: aboutPageData.data.missionTitle || fallbackMission.title,
        content: aboutPageData.data.missionContent || fallbackMission.content,
      }
    : fallbackMission;

  const approach = aboutPageData?.data
    ? {
        title: aboutPageData.data.approachTitle || fallbackApproach.title,
        content: aboutPageData.data.approachContent || fallbackApproach.content,
      }
    : fallbackApproach;

  const stats =
    aboutPageData?.data?.stats && aboutPageData.data.stats.length > 0
      ? aboutPageData.data.stats.map((s: any) => ({
          value: s.value || '',
          label: s.label || '',
        }))
      : fallbackStats;

  return (
    <>
      {/* Hero */}
      <Hero
        headline={hero.headline}
        subheadline={hero.subheadline}
        variant="dark"
      />

      {/* Stats */}
      <StatGrid stats={stats} background="gray" />

      {/* Story Section */}
      <ContentBlock title={story.title}>
        {story.content.split('\n\n').map((paragraph: string, i: number) => (
          <p key={i}>{paragraph}</p>
        ))}
      </ContentBlock>

      {/* Mission Section */}
      <ContentBlock title={mission.title} background="gray">
        {mission.content.split('\n\n').map((paragraph: string, i: number) => (
          <p key={i}>{paragraph}</p>
        ))}
      </ContentBlock>

      {/* Approach Section */}
      <ContentBlock title={approach.title}>
        {approach.content.split('\n\n').map((paragraph: string, i: number) => (
          <p key={i}>{paragraph}</p>
        ))}
      </ContentBlock>

      {/* CTA */}
      <CtaBand
        headline="Join our team"
        subheadline="We're always looking for talented economists and researchers."
        primaryCta={{ label: 'View open positions', url: '/careers' }}
        secondaryCta={{ label: 'Contact us', url: '/contact' }}
        variant="dark"
      />
    </>
  );
}
