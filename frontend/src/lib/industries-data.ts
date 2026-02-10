export interface IndustrySpec {
  label: string;
  value: string;
}

export interface RelatedLink {
  name: string;
  slug: string;
}

export interface Industry {
  name: string;
  slug: string;
  headline: string;
  description: string;
  specs: IndustrySpec[];
  howWeHelp: string;
  relatedServices: RelatedLink[];
  relatedData: RelatedLink[];
  ctaHeadline: string;
  ctaDescription: string;
}

export const industries: Industry[] = [
  {
    name: 'Governments',
    slug: 'governments',
    headline: 'Evidence-Based Decision-Making for Government',
    description: 'We help treasuries, ministries, and government data units make policy decisions grounded in rigorous economic evidence and novel data.',
    specs: [
      { label: 'TYPICAL ENGAGEMENT', value: '8 Weeks' },
      { label: 'DELIVERABLES', value: 'Policy Briefs & Models' },
      { label: 'METHODS', value: 'Causal Inference & AI' },
      { label: 'REACH', value: 'G7 & G20' },
    ],
    howWeHelp: `Government departments face policy decisions where the relevant data often does not exist in official statistics. Traditional economic indicators arrive with long lags, leaving decision-makers to act on outdated information. We bridge that gap.

Our team provides board-level economic analysis for treasuries and policy units — from macroeconomic impact assessment to AI adoption strategy. We combine rigorous econometric methods with frontier AI to produce evidence that meets the standard required for parliamentary select committees, ministerial submissions, and inter-departmental review.

We have presented findings to senior government officials, contributed expert evidence to parliamentary inquiries on the use of AI in government, and advised on data strategy for national-level programmes. Every engagement produces a concrete deliverable: an impact model, a policy brief, or a strategic recommendation backed by reproducible analysis.`,
    relatedServices: [
      { name: 'Economic Consulting', slug: 'economic-consulting' },
      { name: 'Policy Analysis', slug: 'policy-analysis' },
    ],
    relatedData: [
      { name: 'AIPNET', slug: 'aipnet' },
      { name: 'Machinery of Progress', slug: 'machinery-of-progress' },
    ],
    ctaHeadline: 'Need rigorous evidence for a policy decision?',
    ctaDescription: 'Tell us about your challenge. We will outline how our team, methods, and data can help.',
  },
  {
    name: 'Central Banks',
    slug: 'central-banks',
    headline: 'Quantitative Tools for Monetary Policy and Financial Stability',
    description: 'We build macroeconomic forecasting models, alternative data products, and bespoke analytical tools for central bank research departments.',
    specs: [
      { label: 'FORECASTING', value: 'DSGE & Reduced-Form' },
      { label: 'ALTERNATIVE DATA', value: 'Labour & Credit' },
      { label: 'VALIDATION', value: 'Peer-Review Grade' },
      { label: 'COVERAGE', value: 'Multi-Country' },
    ],
    howWeHelp: `Central banks require economic analysis at a level of rigour that most consultancies cannot provide. Monetary policy committees need models calibrated to specific economies and validated against historical episodes. Research departments need alternative data that supplements — not replaces — official statistics.

We build DSGE and reduced-form forecasting models for inflation, output, employment, and bond yields. Our models are calibrated to specific policy regimes and stress-tested against known macroeconomic episodes, producing scenario analyses suitable for internal review and publication.

Our data products offer central banks a new lens on the economy. The Work from Home Map tracks structural shifts in labour markets across five countries. The US Firm-Lender Credit Map provides granular visibility into credit relationships across 1.8 million firms — a critical input for financial stability monitoring. Each dataset is built with the methodological transparency that central bank research departments expect.`,
    relatedServices: [
      { name: 'Economic Consulting', slug: 'economic-consulting' },
      { name: 'Data & AI Solutions', slug: 'data-ai-solutions' },
    ],
    relatedData: [
      { name: 'Work from Home Map', slug: 'wfh-map' },
      { name: 'US Firm-Lender Credit Map', slug: 'bad-bank' },
    ],
    ctaHeadline: 'Looking for analytical tools that meet central bank standards?',
    ctaDescription: 'Describe your research question. We will outline how our models and data can support your work.',
  },
  {
    name: 'Statistical Agencies',
    slug: 'statistical-agencies',
    headline: 'AI Adoption and Methodology for National Statistics',
    description: 'We advise national statistics offices on integrating frontier AI into their workflows — from survey methodology to automated data extraction and dissemination.',
    specs: [
      { label: 'TRAINING', value: 'Hands-On Workshops' },
      { label: 'AI STRATEGY', value: '2 & 5 Year Plans' },
      { label: 'SCOPE', value: 'Full Transformation' },
      { label: 'STAFF TRAINED', value: '40+' },
    ],
    howWeHelp: `National statistics offices are under pressure to modernise — to produce faster, more granular statistics while managing tighter budgets and rising respondent burden. AI offers a path forward, but adopting it requires deep domain expertise and a strategy tailored to the unique constraints of official statistics.

We have advised G20 national statistics offices on comprehensive AI adoption strategies, including multi-year transformation plans, data quality enhancement frameworks, and automated dissemination workflows. Our engagements cover the full scope: inter-agency data sharing, cost reduction through novel data sources, survey methodology redesign, and the development of interactive dashboards for economic structure visualisation.

We also deliver hands-on training programmes for statisticians, equipping teams to use large language models for automated data extraction from survey responses and administrative filings. Our workshops are built around the agency's own data and tools, ensuring immediate applicability.`,
    relatedServices: [
      { name: 'Training & Workshops', slug: 'training-workshops' },
      { name: 'Data & AI Solutions', slug: 'data-ai-solutions' },
    ],
    relatedData: [
      { name: 'AIPNET', slug: 'aipnet' },
      { name: 'Machinery of Progress', slug: 'machinery-of-progress' },
    ],
    ctaHeadline: 'Ready to modernise your statistical production?',
    ctaDescription: 'Tell us about your agency\'s challenges. We will outline a practical path to AI adoption.',
  },
  {
    name: 'Policy Institutions',
    slug: 'policy-institutions',
    headline: 'Rigorous Economic Evidence for Policy Impact',
    description: 'We produce research that quantifies the economic effects of policy interventions — translating complex analysis into clear, actionable recommendations.',
    specs: [
      { label: 'IMPACT MODELLING', value: 'GDP & Fiscal Effects' },
      { label: 'METHODS', value: 'Macro-Health Economics' },
      { label: 'OUTPUT', value: 'Board-Ready Briefs' },
      { label: 'EVIDENCE STANDARD', value: 'Publication Grade' },
    ],
    howWeHelp: `Policy institutions commission research to inform high-stakes decisions — but the gap between academic rigour and practical relevance is often wide. We bridge it. Our team produces policy-relevant research that combines the methodological standards of top economics journals with the clarity required for ministerial and board-level audiences.

Our work for policy institutions has quantified the macroeconomic benefits of preventative health care, estimating that targeted reductions in major disease categories could raise GDP by 0.74% within five years — an annual boost of £19.8 billion with fiscal savings of £10.2 billion by 2030. This required building a bespoke model that jointly analyses health and macroeconomic policy, validated against national accounts data.

We deliver impact estimates, scenario models, and policy briefs that meet the evidence standards increasingly demanded by regulators, select committees, and institutional investors. Every claim is backed by reproducible analysis.`,
    relatedServices: [
      { name: 'Policy Analysis', slug: 'policy-analysis' },
      { name: 'Economic Consulting', slug: 'economic-consulting' },
    ],
    relatedData: [
      { name: 'Work from Home Map', slug: 'wfh-map' },
      { name: 'AIPNET', slug: 'aipnet' },
    ],
    ctaHeadline: 'Need to quantify the economic case for a policy?',
    ctaDescription: 'Describe your policy question. We will outline how evidence-based analysis can support it.',
  },
  {
    name: 'Institutional Investors',
    slug: 'institutional-investors',
    headline: 'Alternative Data and Economic Models for Investment Decisions',
    description: 'We provide asset managers, hedge funds, and sovereign wealth funds with proprietary datasets and bespoke forecasting models built on economic fundamentals.',
    specs: [
      { label: 'DATA ADVANTAGE', value: 'Proprietary Datasets' },
      { label: 'FORECASTING', value: 'DSGE & Scenario Models' },
      { label: 'SIGNALS', value: 'Labour, Trade, Credit' },
      { label: 'UPDATE CYCLE', value: 'Ongoing' },
    ],
    howWeHelp: `Institutional investors need analytical edges that off-the-shelf data cannot provide. Standard economic indicators are priced in by the time they are published. We build proprietary datasets and bespoke models that give investors an informational advantage grounded in economic fundamentals — not statistical artefacts.

Our data products track structural shifts in the economy before they appear in official statistics. The Work from Home Map reveals labour market restructuring across 250 million job postings. The AIPNET production network maps input-output relationships across 5,000+ products, providing early signals on trade disruption, supply chain concentration, and industrial policy effects. The US Firm-Lender Credit Map covers 1.8 million firm-bank relationships — a granular view of credit risk that no other source provides.

We also build bespoke DSGE and reduced-form models calibrated to specific investment theses, producing scenario analyses for inflation, employment, output, and interest rates under alternative policy regimes.`,
    relatedServices: [
      { name: 'Economic Consulting', slug: 'economic-consulting' },
      { name: 'Data & AI Solutions', slug: 'data-ai-solutions' },
    ],
    relatedData: [
      { name: 'Work from Home Map', slug: 'wfh-map' },
      { name: 'AIPNET', slug: 'aipnet' },
      { name: 'US Firm-Lender Credit Map', slug: 'bad-bank' },
    ],
    ctaHeadline: 'Looking for data that moves ahead of official statistics?',
    ctaDescription: 'Tell us about your investment thesis. We will outline how our data and models can support it.',
  },
  {
    name: 'Global Trade',
    slug: 'global-trade',
    headline: 'Mapping the Structure of Global Production and Trade',
    description: 'We build AI-driven tools that reveal the hidden network connecting products, countries, and supply chains in the global economy.',
    specs: [
      { label: 'PRODUCT NODES', value: '5,000+' },
      { label: 'NETWORK TYPE', value: 'Directed Input-Output' },
      { label: 'COVERAGE', value: 'Global' },
      { label: 'VALIDATED AGAINST', value: 'Natural Experiments' },
    ],
    howWeHelp: `Global trade is structured by production networks — intricate webs of input-output relationships that determine how economic shocks propagate across products and countries. Traditional trade statistics capture bilateral flows but miss the underlying network structure. We map it.

Our flagship AIPNET dataset uses generative AI to construct a production network over 5,000+ product nodes, where directed edges represent input-output relationships. The network reveals which products are critical intermediates, which countries occupy central network positions, and how these positions have shifted during the 21st century.

We have used this network to study production network spillovers using the natural experiment presented by the 2017 blockade of Qatar, demonstrating how trade disruptions propagate through the network in predictable ways. This research informs governments designing on-shoring and industrial policy, investors assessing supply chain risk, and international organisations tracking structural change in the global economy.`,
    relatedServices: [
      { name: 'Economic Consulting', slug: 'economic-consulting' },
      { name: 'Policy Analysis', slug: 'policy-analysis' },
    ],
    relatedData: [
      { name: 'AIPNET', slug: 'aipnet' },
    ],
    ctaHeadline: 'Need to understand your position in the global production network?',
    ctaDescription: 'Tell us about your trade or supply chain question. We will outline how AIPNET and our analytical tools can help.',
  },
  {
    name: 'Healthcare',
    slug: 'healthcare',
    headline: 'The Macroeconomic Dimensions of Health',
    description: 'We quantify the economic effects of health interventions and disease burden — connecting population health to GDP, employment, and public finances.',
    specs: [
      { label: 'GDP IMPACT MODELLED', value: '0.74% Boost' },
      { label: 'FISCAL SAVINGS', value: '£10.2B by 2030' },
      { label: 'METHODS', value: 'Joint Health-Macro Models' },
      { label: 'PUBLISHED IN', value: 'Academic Journals' },
    ],
    howWeHelp: `Health policy is rarely designed with macroeconomic modelling. Industrial policy is rarely designed with health economics. We work at the intersection, building models that jointly analyse how population health affects employment, output, and government finances.

Our published research quantifies the macroeconomic consequences of chronic illness, combining health data with macroeconomic indicators to estimate the effects of disease burden on the economy. For policy institutions, we have estimated that a 20% reduction in six major disease categories could raise GDP by 0.74% within five years, generating annual fiscal savings of £10.2 billion.

This work requires a rare combination of skills: macroeconomic modelling, health data analysis, and the ability to translate findings into policy recommendations. Our team has published in academic journals on these topics and presented findings to government health and economic policy teams.`,
    relatedServices: [
      { name: 'Policy Analysis', slug: 'policy-analysis' },
      { name: 'Economic Consulting', slug: 'economic-consulting' },
    ],
    relatedData: [
      { name: 'Work from Home Map', slug: 'wfh-map' },
    ],
    ctaHeadline: 'Need to quantify the economic case for a health intervention?',
    ctaDescription: 'Describe your question. We will outline how our macro-health models can inform the analysis.',
  },
  {
    name: 'Logistics',
    slug: 'logistics',
    headline: 'Supply Chain Intelligence from Production Network Data',
    description: 'We provide data and analytical tools that map supply chain dependencies, identify critical intermediates, and model the propagation of disruptions.',
    specs: [
      { label: 'NETWORK SCOPE', value: '5,000+ Products' },
      { label: 'RELATIONSHIPS', value: 'Input-Output Edges' },
      { label: 'EQUIPMENT DATA', value: '50M Transactions' },
      { label: 'USE CASE', value: 'Risk & Resilience' },
    ],
    howWeHelp: `Modern supply chains are opaque. Companies and governments know their direct suppliers but rarely have visibility into the deeper network of dependencies that determine vulnerability to disruption. Our data makes this network visible.

The AIPNET production network maps directed input-output relationships across 5,000+ products, revealing which inputs are critical bottlenecks and how disruptions in one product category propagate to others. We have validated these network effects using natural experiments, demonstrating that production network structure predicts the real-world propagation of trade shocks.

Our Machinery of Progress dataset adds a complementary lens — tracking 50 million capital equipment transactions across the US economy, covering heavy machinery, vehicles, robotics, and IT equipment. Together, these datasets enable logistics and supply chain teams to assess concentration risk, model disruption scenarios, and identify strategic alternatives for critical inputs.`,
    relatedServices: [
      { name: 'Economic Consulting', slug: 'economic-consulting' },
      { name: 'Data & AI Solutions', slug: 'data-ai-solutions' },
    ],
    relatedData: [
      { name: 'AIPNET', slug: 'aipnet' },
      { name: 'Machinery of Progress', slug: 'machinery-of-progress' },
    ],
    ctaHeadline: 'Need visibility into your supply chain dependencies?',
    ctaDescription: 'Tell us about your supply chain challenge. We will outline how our network data can help.',
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
