# Product Context: Applied Economics Website

*Source: Phase 1 Discovery, Phase 2 Strategy*

## Why This Project Exists
Applied Economics is repositioning from an academic research lab to a **data-driven economic consulting firm** serving governments, central banks, multilateral institutions (World Bank, IMF), and hedge funds. The website must signal this evolution while preserving the academic rigour that differentiates them.

### Positioning Statement
> "Applied Economics combines frontier AI and novel large-scale data sources with economic expertise to deliver actionable insights for policy-makers and investors."

### Brand Character
- **High-End Minimalism** — "Less is more" approach common among luxury brands and top-tier consultancy firms
- **Editorial Authority** — Typography and layout inspired by high-end magazines and newspapers, conveying sophistication and credibility
- **Generous Whitespace** — Massive margins and breathing room communicate luxury, clarity, and confidence
- **Intellectual depth** — Not surface-level data viz, but genuine analytical rigour with elegant presentation
- **Evidence-first** — Let the research speak; restrained on marketing language

### Visual Language (Updated: Light Design)
- **Monochromatic Base** — UI framework strictly black and white, allowing photography and visualizations to pop
- **Typography Strategy:**
  - **Serif Headlines** — Distinct serif typeface for main headlines to convey authority, tradition, and sophistication
  - **Sans-Serif Pairings** — Clean, geometric sans-serif for navigation, buttons, and UI elements
- **Imagery Style:**
  - **Mixed Media** — Blend of realistic photography with high-fidelity 3D digital renderings
  - **The Hero Card** — Central cards with distinctive backgrounds (e.g., black with green AI graphics) break patterns to draw attention
  - **Diverse Color Palette in Images** — While UI is monochromatic, images introduce deep greens, blues, warm tones representing various industries
- **Layout Principles:**
  - **Asymmetrical Balance** — Varying card heights and widths create dynamic, staggered rhythm
  - **Subtle Navigation** — Pill-shaped buttons and understated controls that don't distract from content

## Business Goals (from Phase 1)

| Goal | Description |
|------|-------------|
| **Establish credibility** | Communicate that Applied Economics is a serious consultancy (30 people, scaling), not just a university lab |
| **Generate inbound leads** | Attract enquiries from target client segments |
| **Showcase differentiation** | Demonstrate novel data + AI capability vs. traditional economic consultancies |
| **Support talent acquisition** | Attract PhD-level researchers and data scientists; compete with Quantco and tech firms |
| **Maintain academic reputation** | Keep Lab (R&D arm) and summer fellowship visible to preserve intellectual credibility |

## Value Proposition Pillars (from Phase 2)

| Pillar | Message |
|--------|---------|
| **Data** | We build and analyse datasets that don't exist elsewhere—from 36 million loan records to 250 million job postings |
| **AI/ML** | We deploy cutting-edge AI—from LLMs to causal ML—not as buzzwords but as tools to unlock insights |
| **Rigour** | Our methods meet academic publication standards. We publish in NBER, VoxEU, and peer-reviewed journals |
| **Impact** | We provide expert evidence to Parliament, shape World Bank programs, and inform investment strategy |

## Target Audience Personas (from Phase 1)

### Persona 1: Policy Economist (Government/Central Bank)
| Attribute | Details |
|-----------|---------|
| **Role** | Senior economist at a Treasury, Finance Ministry, or Central Bank |
| **Needs** | Rigorous evidence for policy decisions; novel data not available internally; defensible methodology |
| **Concerns** | Credibility (will this survive scrutiny?); procurement complexity; political sensitivity |
| **Journey** | Referred by colleague/conference → Checks team credentials → Reviews published research → Initiates procurement discussion |
| **Key Content** | Team bios with academic credentials; published papers; case studies with policy impact |

### Persona 2: Investment Analyst (Hedge Fund)
| Attribute | Details |
|-----------|---------|
| **Role** | Quantitative researcher or macro strategist at a hedge fund |
| **Needs** | Alpha-generating insights; alternative data; speed; proprietary analysis |
| **Concerns** | Exclusivity (who else has this data?); turnaround time; signal vs noise |
| **Journey** | Sees VoxEU/HBR article → Explores data products → Requests sample/demo → Scopes custom engagement |
| **Key Content** | Data products overview; methodology previews; insights/blog with market-relevant angles |

### Persona 3: Multilateral Program Officer (World Bank/IMF)
| Attribute | Details |
|-----------|---------|
| **Role** | Research economist or program manager at an international organization |
| **Needs** | Cross-country data; development-relevant analysis; capacity to handle complex procurements |
| **Concerns** | Publication standards; replicability; institutional approval processes |
| **Journey** | Encounters paper in working paper series → Checks team expertise → Reviews open data → Initiates TOR process |
| **Key Content** | Academic publications; open-access data; team CVs; past projects with multilaterals |

### Persona 4: PhD Candidate / Early-Career Researcher
| Attribute | Details |
|-----------|---------|
| **Role** | Economics PhD student or pre-doc considering next career step |
| **Needs** | Intellectually stimulating work; publication opportunities; training in AI/ML; career progression |
| **Concerns** | Is this 'real' research or just consulting? Will I publish? How does it compare to Quantco or academia? |
| **Journey** | Sees paper by team member → Explores Lab/fellowship → Applies for summer program → Converts to full-time |
| **Key Content** | Lab page; fellowship program; team publications; guides/training resources; careers page |

## Problems It Solves

### For Potential Clients (Personas 1-3)
- Discover Applied Economics' service offerings
- Understand the approach and methodology
- View case studies and evidence of expertise
- Easily initiate contact for project inquiries

### For Researchers & Academics
- Access research papers and publications
- Download datasets (open and commercial)
- Understand methodology and data coverage
- Find citation information

### For Job Seekers (Persona 4)
- Learn about company culture and values
- View open positions
- Discover fellowship opportunities
- Meet the team

### For the Organization
- Centralized content management via Strapi CMS
- Consistent brand presentation across all pages
- SEO-optimized content for discoverability
- Scalable architecture for future growth

## How It Should Work

### Content Management
- Marketing and content teams manage all content through Strapi admin
- No developer involvement needed for content updates
- Rich text editing, media management, and structured content
- Draft/publish workflow for content review

### User Journeys
1. **Services Journey:** Services → Case Study → Contact
2. **Research Journey:** Research archive → Paper detail → Download/Citation
3. **Recruiting Journey:** Careers → Team → Lab/Fellowship → Apply

### Key Interactions
- Filtering and search on archive pages (Research, Insights, Data)
- Contact form submission
- PDF downloads for research papers
- Citation copying (BibTeX, APA formats)
- Newsletter signup (if implemented)

## User Experience Goals

### Professional & Credible
- Clean, modern design reflecting economic expertise
- Data visualizations that demonstrate analytical capability
- Clear presentation of credentials and case studies

### Accessible & Inclusive
- WCAG 2.1 AA compliance
- Keyboard navigation throughout
- Screen reader compatibility
- Sufficient color contrast

### Fast & Responsive
- Optimized performance (target high Lighthouse scores)
- Mobile-first responsive design
- Server-side rendering for SEO and performance

### Intuitive Navigation
- Clear information architecture
- Breadcrumbs for orientation
- Consistent patterns across sections
- Sticky header for easy navigation
