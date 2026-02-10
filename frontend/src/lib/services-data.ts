export interface ServiceSpec {
  label: string;
  value: string;
}

export interface Challenge {
  title: string;
  description: string;
}

export interface MethodStep {
  title: string;
  description: string;
  isCore?: boolean;
}

export interface Capability {
  title: string;
  description: string;
  deliverables: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface EngagementHighlightData {
  title: string;
  description: string;
  metrics: Metric[];
}

export interface RelatedProduct {
  name: string;
  description: string;
  slug: string;
}

export interface Service {
  title: string;
  slug: string;
  order: number;
  summary: string;
  proofPoint: string;
  headline: string;
  introduction: string;
  keySpecs: ServiceSpec[];
  challenges: Challenge[];
  methodology: MethodStep[];
  capabilities: Capability[];
  engagementHighlight: EngagementHighlightData;
  relatedDataProducts: RelatedProduct[];
  ctaHeadline: string;
  ctaDescription: string;
}

export const services: Service[] = [
  {
    title: 'Economic Consulting',
    slug: 'economic-consulting',
    order: 1,
    summary: 'Bespoke economic analysis for strategic, policy, and investment decisions. From macroeconomic forecasting to national accounts methodology, our work is built on evidence and academic rigour.',
    proofPoint: 'Advised G20 national statistics offices on AI adoption strategy',
    headline: 'Bespoke Economic Analysis for High-Stakes Decisions',
    introduction: 'We provide board-level economic advisory for governments, statistical agencies, central banks, and institutional investors. Our team combines PhD-level economic training with hands-on experience building and deploying analytical tools at scale.',
    keySpecs: [
      { label: 'MACRO FORECASTING', value: 'DSGE Models' },
      { label: 'NATIONAL ACCOUNTS', value: 'Statistical Methods' },
      { label: 'IMPACT ASSESSMENT', value: 'GDP & Fiscal Effects' },
      { label: 'CLIENT REACH', value: 'G20 Advisory' },
    ],
    challenges: [
      {
        title: 'Decisions That Outpace Traditional Analysis',
        description: 'Treasury departments and central banks face policy decisions where the relevant data does not yet exist in official statistics. Traditional economic indicators arrive with 6-12 month lags, leaving decision-makers to act on outdated information.',
      },
      {
        title: 'Methodology Questions That Consultancies Cannot Answer',
        description: 'When a national statistics office redesigns its capital expenditure survey or rebalances its supply-use tables, it needs academic-grade methodology — not a strategy deck. The Big 4 do not have the depth.',
      },
      {
        title: 'Evidence Standards Are Rising',
        description: 'Select committees, regulators, and institutional investors increasingly require peer-reviewed, reproducible evidence behind economic claims. Assertions without rigorous backing no longer satisfy.',
      },
    ],
    methodology: [
      {
        title: 'Scoping',
        description: 'We define the economic question, identify available data sources, and agree on deliverables and timeline.',
      },
      {
        title: 'Analysis',
        description: 'A focused team of 2–4 PhD economists conducts rigorous analysis using appropriate methods and data.',
        isCore: true,
      },
      {
        title: 'Translation',
        description: 'We translate technical findings into board-ready insights — policy briefs, strategic recommendations, or data products.',
      },
      {
        title: 'Delivery',
        description: 'Final deliverables, presentations, and ongoing support. Typical engagements run 8 weeks.',
      },
    ],
    capabilities: [
      {
        title: 'Macroeconomic Forecasting',
        description: 'DSGE and reduced-form models to forecast inflation, output, employment, and bond yields. We build models calibrated to specific economies and policy regimes, validated against historical episodes.',
        deliverables: 'DSGE models, Scenario analysis, Quarterly briefings',
      },
      {
        title: 'National Accounts Advisory',
        description: 'Methodology design for national statistics agencies, including balance sheet frameworks, capital expenditure surveys, and supply-use table balancing tools.',
        deliverables: 'Methodology reports, Balancing tools, Training',
      },
      {
        title: 'Economic Impact Assessment',
        description: 'Rigorous quantification of the GDP, employment, and fiscal effects of policy interventions. We model direct, indirect, and induced effects with full sensitivity analysis.',
        deliverables: 'Impact models, Policy briefs, Board presentations',
      },
      {
        title: 'Strategic Data Advisory',
        description: 'Identifying opportunities to improve data quality, reduce reporting burdens, and leverage novel data sources such as card transactions, satellite imagery, and administrative records.',
        deliverables: 'Data strategy, Gap analysis, Implementation roadmap',
      },
    ],
    engagementHighlight: {
      title: 'AI Strategy for a G20 National Statistics Office',
      description: 'We advised a G20 national statistics office on a comprehensive AI adoption strategy, including a 2- and 5-year transformation plan, data quality enhancements, and automated dissemination workflows. The engagement covered inter-agency data sharing, cost reduction through novel data sources, and development of interactive dashboards for economic structure visualisation.',
      metrics: [
        { value: '2+5', label: 'YEAR TRANSFORMATION PLAN' },
        { value: 'G20', label: 'CLIENT TIER' },
        { value: '40+', label: 'STAFF TRAINED' },
      ],
    },
    relatedDataProducts: [
      {
        name: 'AIPNET',
        description: 'A generative AI map of global production, revealing input-output connections across 5,000+ products.',
        slug: 'aipnet',
      },
      {
        name: 'Machinery of Progress',
        description: 'Tracking capital investment and technological progress through 50M+ administrative equipment transactions.',
        slug: 'machinery-of-progress',
      },
    ],
    ctaHeadline: 'Ready to bring rigour to your next decision?',
    ctaDescription: 'Tell us about your economic question. We will outline how our team, methods, and data can help.',
  },
  {
    title: 'Data & AI Solutions',
    slug: 'data-ai-solutions',
    order: 2,
    summary: 'We build structured datasets from unstructured sources using frontier AI. Financial documents, job postings, administrative archives — we transform raw data into analysis-ready economic intelligence.',
    proofPoint: '250M+ job postings and 40M+ loan documents processed',
    headline: 'Structured Datasets from Unstructured Sources',
    introduction: 'The vast majority of economically valuable data comes in unstructured formats — handwritten documents, PDF filings, free-text job postings, clinical records. We deploy large language models, NLP pipelines, and agentic AI workflows to extract structured, validated data from these sources at scale.',
    keySpecs: [
      { label: 'JOB POSTINGS', value: '250M+' },
      { label: 'LOAN DOCUMENTS', value: '40M+' },
      { label: 'EQUIPMENT TXNS', value: '50M+' },
      { label: 'COUNTRIES', value: '5' },
    ],
    challenges: [
      {
        title: 'Vast Archives, No Structure',
        description: 'Governments, banks, and research institutions hold decades of records in formats no machine can read — handwritten ledgers, scanned PDFs, free-text filings. The information exists but cannot be analysed.',
      },
      {
        title: 'AI Hype, Validation Gap',
        description: 'Off-the-shelf LLMs produce output that looks plausible but requires rigorous validation against ground truth before any analytical use. Most AI vendors ship outputs without quality guarantees.',
      },
      {
        title: 'Bespoke Requirements, Generic Tools',
        description: 'Each institution\'s data has unique structures, quality issues, and domain-specific vocabulary that generic data extraction tools cannot handle. Economic data demands economic understanding.',
      },
    ],
    methodology: [
      {
        title: 'Data Assessment',
        description: 'We evaluate your unstructured data sources and define the target structured output — schema, coverage, and quality standards.',
      },
      {
        title: 'Pipeline Design',
        description: 'We design the AI extraction pipeline: model selection, prompt engineering, validation strategy, and quality gates.',
      },
      {
        title: 'Build & Validate',
        description: 'We run the pipeline at scale, validating outputs against ground truth and iterating until quality thresholds are met.',
        isCore: true,
      },
      {
        title: 'Delivery & Documentation',
        description: 'Clean, documented datasets delivered with full methodology notes and reproducibility guarantees.',
      },
    ],
    capabilities: [
      {
        title: 'Document Digitisation',
        description: 'AI-powered extraction from archival, handwritten, and scanned documents — from loan records to administrative filings. We achieve production-grade accuracy through multi-agent validation.',
        deliverables: 'Structured datasets, Extraction pipelines, Quality reports',
      },
      {
        title: 'Text Classification',
        description: 'High-accuracy classification of large-scale text data using fine-tuned language models, validated against 30,000+ human labels. We built the system that classifies remote work in 250M job postings with 99% accuracy.',
        deliverables: 'Classification models, Labelled datasets, Accuracy benchmarks',
      },
      {
        title: 'Agentic AI Pipelines',
        description: 'Multi-agent AI workflows where specialised models collaborate to build, validate, and quality-check datasets. Our Machinery of Progress dataset was built entirely through agentic AI collaboration.',
        deliverables: 'Multi-agent pipelines, Automated QA, Documentation',
      },
      {
        title: 'Custom Dataset Construction',
        description: 'End-to-end design and delivery of bespoke structured datasets from unconventional sources. We work with your data, your domain, and your analytical needs.',
        deliverables: 'Bespoke datasets, Schema design, Methodology papers',
      },
    ],
    engagementHighlight: {
      title: 'Digitising America\'s Lending History',
      description: 'We deployed LLM tools to digitise 40 million archival loan documents, transforming handwritten records into the most granular dataset of US firm-lender relationships available to researchers and policymakers. The dataset covers 1.8 million firms and 179 bank failures from 1990 to 2023.',
      metrics: [
        { value: '40M+', label: 'DOCUMENTS DIGITISED' },
        { value: '1.8M', label: 'FIRMS COVERED' },
        { value: '33yr', label: 'TIME SPAN' },
      ],
    },
    relatedDataProducts: [
      {
        name: 'Work from Home Map',
        description: 'The definitive picture of remote work, built from 250M+ job postings across five countries.',
        slug: 'wfh-map',
      },
      {
        name: 'AIPNET',
        description: 'A generative AI map of global production, revealing input-output connections across 5,000+ products.',
        slug: 'aipnet',
      },
      {
        name: 'US Firm-Lender Credit Map',
        description: 'The hidden history of American credit, reconstructed from 40M+ archival loan documents.',
        slug: 'bad-bank',
      },
    ],
    ctaHeadline: 'Have unstructured data that needs structure?',
    ctaDescription: 'Describe your data challenge. We will assess feasibility and outline an extraction approach.',
  },
  {
    title: 'Policy Analysis',
    slug: 'policy-analysis',
    order: 3,
    summary: 'Evidence-based research for governments and policy institutions. We quantify the economic impact of policy interventions and translate findings into actionable recommendations.',
    proofPoint: 'Estimated £19.8B annual GDP boost from preventative health policy',
    headline: 'Evidence-Based Research for Government and Policy',
    introduction: 'We produce policy-relevant research that combines academic rigour with clear communication. Our work has informed decisions at central banks, treasury departments, and international policy institutions.',
    keySpecs: [
      { label: 'GDP BOOST IDENTIFIED', value: '0.74%' },
      { label: 'ANNUAL OUTPUT GAIN', value: '£19.8B' },
      { label: 'FISCAL SAVINGS/YR', value: '£10.2B' },
      { label: 'EVIDENCE PROVIDED', value: 'Select Committee' },
    ],
    challenges: [
      {
        title: 'Policy Without Evidence',
        description: 'Government departments design interventions worth billions of pounds without rigorous quantification of their economic effects. The cost-benefit analysis is often absent or superficial.',
      },
      {
        title: 'Disciplinary Silos',
        description: 'Health policy is made without macroeconomic modelling. Industrial policy is made without trade network analysis. The economic dimensions of policy decisions are routinely underweighted.',
      },
      {
        title: 'Communication Gap',
        description: 'Academic research that could inform policy sits in journals that policymakers never read. Translating rigorous findings into clear, actionable briefs requires a rare combination of skills.',
      },
    ],
    methodology: [
      {
        title: 'Question Definition',
        description: 'We work with policymakers to define the question precisely — what intervention, what outcomes, what time horizon.',
      },
      {
        title: 'Model & Data',
        description: 'We build or adapt economic models and assemble the required data, often combining multiple administrative and survey sources.',
        isCore: true,
      },
      {
        title: 'Analysis & Scenarios',
        description: 'We estimate baseline effects and run policy scenarios, with full sensitivity analysis and uncertainty quantification.',
      },
      {
        title: 'Policy Brief',
        description: 'Findings are translated into clear policy recommendations with supporting evidence, suitable for ministerial or board-level audiences.',
      },
    ],
    capabilities: [
      {
        title: 'Policy Impact Quantification',
        description: 'Rigorous estimation of GDP, employment, and fiscal effects of proposed policy interventions. We model direct, indirect, and induced effects with full uncertainty quantification.',
        deliverables: 'Impact estimates, Scenario models, Sensitivity analysis',
      },
      {
        title: 'Macro-Health Economics',
        description: 'Joint analysis of health and macroeconomic policy, modelling how improved population health affects employment, output, and government finances. Our framework was used to quantify the GDP case for preventative health.',
        deliverables: 'Joint models, GDP estimates, Fiscal projections',
      },
      {
        title: 'Regulatory Analysis',
        description: 'Economic assessment of regulatory proposals, including cost-benefit analysis, distributional effects, and dynamic impacts on investment and innovation.',
        deliverables: 'Cost-benefit analyses, Regulatory impact assessments',
      },
      {
        title: 'Board-Level Briefs',
        description: 'Clear, evidence-based communications for policymakers, central bank governors, and government ministers. We translate complex economic analysis into actionable recommendations.',
        deliverables: 'Policy briefs, Ministerial submissions, Presentations',
      },
    ],
    engagementHighlight: {
      title: 'The Economic Case for Preventative Health',
      description: 'We quantified the macroeconomic benefits of preventative health care for a leading policy institution, building a model that jointly analyses health and macroeconomic policy. We estimated that a 20% reduction in six major disease categories could raise GDP by 0.74% within five years — an annual boost of £19.8 billion.',
      metrics: [
        { value: '0.74%', label: 'GDP BOOST IN 5 YEARS' },
        { value: '£19.8B', label: 'ANNUAL OUTPUT GAIN' },
        { value: '£10.2B', label: 'FISCAL SAVINGS BY 2030' },
      ],
    },
    relatedDataProducts: [
      {
        name: 'Work from Home Map',
        description: 'The definitive picture of remote work, built from 250M+ job postings across five countries.',
        slug: 'wfh-map',
      },
      {
        name: 'AIPNET',
        description: 'A generative AI map of global production, revealing input-output connections across 5,000+ products.',
        slug: 'aipnet',
      },
    ],
    ctaHeadline: 'Need rigorous evidence for a policy decision?',
    ctaDescription: 'Describe your policy question. We will outline how evidence-based analysis can inform the decision.',
  },
  {
    title: 'Training & Workshops',
    slug: 'training-workshops',
    order: 4,
    summary: 'Hands-on training in AI tools, computational methods, and data analysis for economics teams. We help organisations build internal capacity in frontier analytical methods.',
    proofPoint: 'Delivered for national statistics agencies and research institutions',
    headline: 'Frontier Methods for Economics Teams',
    introduction: 'We design and deliver training programmes for economists, statisticians, and data teams who want to adopt frontier AI and computational methods. Our workshops are practical, hands-on, and grounded in real applications.',
    keySpecs: [
      { label: 'PROGRAMME DURATION', value: '1–5 Days' },
      { label: 'FORMAT', value: 'Hands-On' },
      { label: 'CURRICULUM', value: 'Custom' },
      { label: 'CLIENTS SERVED', value: 'National Agencies' },
    ],
    challenges: [
      {
        title: 'AI Tools Without AI Understanding',
        description: 'Economics teams are adopting AI tools without understanding their strengths, limitations, or appropriate use cases. This leads to misapplication and unreliable outputs.',
      },
      {
        title: 'Reproducibility Crisis',
        description: 'Research teams produce analysis that cannot be replicated, verified, or extended by colleagues. Version control, containerisation, and documentation practices lag behind other quantitative fields.',
      },
      {
        title: 'Cloud Skills Gap',
        description: 'Large-scale data processing requires cloud infrastructure that most economics teams have never used. The gap between desktop tools and production-grade data pipelines is widening.',
      },
    ],
    methodology: [
      {
        title: 'Needs Assessment',
        description: 'We assess your team\'s current capabilities, tools, and analytical needs to define learning objectives.',
      },
      {
        title: 'Programme Design',
        description: 'We design a hands-on curriculum using your team\'s actual data and tools where possible.',
        isCore: true,
      },
      {
        title: 'Delivery',
        description: 'Interactive workshops combining instruction with practical exercises. Typically 1–5 days.',
      },
      {
        title: 'Follow-Up',
        description: 'Post-workshop support, reference materials, and follow-up sessions to ensure adoption.',
      },
    ],
    capabilities: [
      {
        title: 'AI for Economics',
        description: 'Practical training on using LLMs, NLP, and generative AI for economic data construction and analysis. We cover prompt engineering, model selection, and validation strategies specific to economic data.',
        deliverables: 'Workshop materials, Code notebooks, Reference guides',
      },
      {
        title: 'Cloud Computing',
        description: 'Hands-on workshops for setting up and using cloud infrastructure for large-scale data processing. We cover AWS, GCP, and Azure with a focus on economics workloads.',
        deliverables: 'Cloud setup guides, Template infrastructure, Cost management',
      },
      {
        title: 'Reproducible Workflows',
        description: 'Best practices for version control, containerisation, and documentation in research teams. We teach Git, Docker, and modern documentation tools tailored for economists.',
        deliverables: 'Workflow templates, Git training, Docker setups',
      },
      {
        title: 'Custom Programmes',
        description: 'Bespoke training designed around your team\'s specific tools, data, and analytical needs. We work with your actual projects to ensure immediate applicability.',
        deliverables: 'Custom curriculum, Hands-on exercises, Follow-up support',
      },
    ],
    engagementHighlight: {
      title: 'AI Tools for a National Statistics Office',
      description: 'We designed and delivered a custom training programme for a G20 national statistics office, equipping their team to use large language models for automated data extraction from survey responses and administrative filings.',
      metrics: [
        { value: '3', label: 'DAY PROGRAMME' },
        { value: '40+', label: 'STATISTICIANS TRAINED' },
        { value: 'LLM', label: 'FOCUS AREA' },
      ],
    },
    relatedDataProducts: [],
    ctaHeadline: 'Want your team to work with frontier tools?',
    ctaDescription: 'Tell us about your team\'s needs. We will design a programme that builds real capability.',
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const allServiceLinks = services.map((s) => ({
  name: s.title,
  slug: s.slug,
}));

export const clientSegments = [
  {
    name: 'Governments',
    examples: 'Treasuries, policy units, and ministerial offices across the G7 and G20',
  },
  {
    name: 'Central Banks',
    examples: 'Monetary policy teams, research departments, and financial stability units',
  },
  {
    name: 'Statistical Agencies',
    examples: 'National statistics offices, survey methodology teams, and data dissemination units',
  },
  {
    name: 'Institutional Investors',
    examples: 'Asset managers, hedge funds, and sovereign wealth funds',
  },
];

export const engagementModel = {
  specs: [
    { label: 'TEAM SIZE', value: '2–4 PhD Economists' },
    { label: 'TYPICAL TIMELINE', value: '8 Weeks' },
    { label: 'DELIVERABLES', value: 'Models, Datasets, Board Briefs' },
    { label: 'ENGAGEMENT START', value: 'Scoping Call + Proposal' },
  ],
};
