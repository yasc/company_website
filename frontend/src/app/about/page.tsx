import { getAboutPage } from '@/lib/strapiClient';
import { Container } from '@/components/ui/Container';
import { ContentBlock, StatGrid, CtaBand } from '@/components/sections';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface StrapiResponse {
  data?: any;
  meta?: any;
}

// --- Team bios ---

interface TeamMember {
  name: string;
  title: string;
  bio: string;
  photoUrl: string;
  affiliations: string[];
  selectedWork: string[];
  selectedPresentations: string[];
}

const teamMembers: TeamMember[] = [
  {
    name: 'Dr. Peter Lambert',
    title: 'Director and Co-Founder',
    bio: 'Peter is an economist studying organisations, industries, jobs, and economic growth. His research leverages large novel datasets — text, transactions, networks, images — and frontier AI tools to study behaviour within and across organisations. He holds a PhD in Economics from the London School of Economics.',
    photoUrl: '/images/team/peter_john_lambert.jpeg.webp',
    affiliations: [
      'University of Warwick',
      'London School of Economics',
      'Centre for Economic Performance (CEP)',
      'Centre for Macroeconomics (CfM)',
      'CAGE Research Centre',
    ],
    selectedWork: [
      'AI-Generated Production Networks: Measurement and Applications to Global Trade (2024)',
      'Remote Work across Jobs, Companies, and Space (NBER, 2023) — Best Paper Award, CESifo',
      'Bad Bank, Bad Luck? Evidence from 1 Million Firm-Bank Relationships (2024)',
      'Anatomy of Automation: CNC Machines and Industrial Robots in UK Manufacturing (2025)',
    ],
    selectedPresentations: [
      'Google DeepMind AI for Social Science Event — keynote on AI/LLMs for economics research',
      'EUR-CEPR Workshop: Trade, Geography, and Industrial Organisation',
    ],
  },
  {
    name: 'Dr. Yannick Schindler',
    title: 'Co-Founder',
    bio: 'Yannick is a macroeconomist whose research spans technological change, health economics, and financial markets. He deploys Big Data and AI tools to build novel measurements of the economy from administrative and archival sources. He holds a PhD in Economics from the London School of Economics and previously held positions at Princeton University and the European Central Bank.',
    photoUrl: '/images/team/yannick_schindler.webp',
    affiliations: [
      'London School of Economics',
      'Centre for Macroeconomics (CfM)',
    ],
    selectedWork: [
      'Machinery of Progress: Charting the Capabilities of Capital Equipment, 1998–2023 (2025)',
      'Bad Bank, Bad Luck? Evidence from 1 Million Firm-Lender Relationships (2024)',
      'The Macroeconomic Impact of Chronic Illness in the UK — Journal of the Economics of Ageing (2025)',
      'Prosperity Through Health — policy paper with Sir John Bell and Andrew Scott (2024)',
    ],
    selectedPresentations: [
      'FDIC, Federal Reserve Bank of Boston, Downing Street Data Science Unit',
      'Stockholm School of Economics, EEA Congress, HM Treasury',
    ],
  },
];

// --- Fallback content ---

const fallbackHero = {
  headline: 'About Applied Economics AI',
  subheadline: 'PhD economists building novel datasets and economic intelligence from unstructured data using frontier AI.',
};

const fallbackStats = [
  { value: '500M+', label: 'Records Processed' },
  { value: '4', label: 'Flagship Data Products' },
  { value: '5+', label: 'Countries Covered' },
  { value: 'LSE', label: 'Founded at' },
];

const fallbackStory = {
  title: 'Our Story',
  content: `Applied Economics AI was founded in 2022 by economists at the London School of Economics who saw that the digital age was generating vast quantities of data — but the majority of it was trapped in unstructured formats. Financial documents, job postings, administrative archives, clinical observations. Rich in information, but inaccessible to traditional economic analysis.

We built the tools to change that. Using frontier AI — large language models, natural language processing, and agentic AI pipelines — we extract structured, analysis-ready data from sources that were previously impossible to work with at scale. What began as a research lab at the LSE Centre for Economic Performance has grown into a consulting and data business serving governments, central banks, statistical agencies, and institutional investors.`,
};

const fallbackMission = {
  title: 'Our Mission',
  content: `We harness cutting-edge AI to unlock the wealth of information trapped in unstructured data sources, transforming raw information into actionable knowledge for academic research, policy analysis, and commercial decision-making.

Our work sits at the intersection of academic economics and commercial AI — too rigorous for most consultancies, too practical for most academic groups, and too bespoke for standard data vendors. We bring PhD-level economic thinking to real-world problems, and frontier AI methods to serious economic questions.`,
};

const fallbackApproach = {
  title: 'Our Approach',
  content: `We work in small, focused teams of 2–4 researchers and engineers on engagements typically lasting 8 weeks. Every project starts with an economic question and ends with a concrete deliverable — whether that's a novel dataset, a forecasting model, a policy paper, or a strategic recommendation.

Our methods combine traditional economic analysis with modern AI techniques: large language models for document processing, generative AI for data construction, and rigorous econometric methods for causal inference. We validate everything against ground truth. No black boxes, no hand-waving — just evidence.`,
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
      {/* Manifesto Hero */}
      <section className="bg-slate-50 pt-24 lg:pt-36 pb-16 lg:pb-24 border-b border-slate-200">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-label mb-6">About</p>
            <h1 className="text-display mb-8">
              Building the datasets the world is missing
            </h1>
            <p className="text-body-lg text-slate-600 max-w-2xl mx-auto">
              {hero.subheadline}
            </p>
          </div>
        </Container>
      </section>

      {/* Team Section — leads the page */}
      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <h2 className="text-h2 text-charcoal mb-12">Our Team</h2>

          <div className="space-y-16">
            {teamMembers.map((member) => (
              <article
                key={member.name}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12"
              >
                {/* Left column: name, title, bio */}
                <div className="lg:col-span-1">
                  {/* Photo */}
                  <div className="w-full aspect-[3/4] bg-slate-100 border border-slate-200 mb-6 overflow-hidden">
                    <img
                      src={member.photoUrl}
                      alt={`${member.name}, ${member.title}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-h3 text-charcoal">{member.name}</h3>
                  <p className="text-body text-teal mt-1 mb-4">{member.title}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {member.affiliations.map((aff) => (
                      <span
                        key={aff}
                        className="inline-block px-2 py-1 text-xs font-medium text-slate-600 bg-slate-100 border border-slate-200"
                      >
                        {aff}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right column: bio, selected work, presentations */}
                <div className="lg:col-span-2">
                  <p className="text-body-lg leading-relaxed text-slate-700 mb-8">
                    {member.bio}
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-label mb-3">Selected Research</h4>
                      <ul className="space-y-2">
                        {member.selectedWork.map((work, i) => (
                          <li key={i} className="text-body text-slate-600 pl-4 border-l-2 border-slate-200">
                            {work}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-label mb-3">Selected Presentations</h4>
                      <ul className="space-y-2">
                        {member.selectedPresentations.map((pres, i) => (
                          <li key={i} className="text-body text-slate-600 pl-4 border-l-2 border-slate-200">
                            {pres}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

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

      {/* CTA */}
      <CtaBand
        headline="Get in touch"
        subheadline="Tell us about your challenge. We'll outline how our team, methods, and data can help."
        primaryCta={{ label: 'Discuss a project', url: '/contact' }}
        variant="dark"
      />
    </>
  );
}
