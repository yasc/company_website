# System Patterns: Applied Economics Website

*Source: Phase 2 Strategy, Phase 3 UX Wireframing, Implementation Guide v1*

## High-Level Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Next.js       │────▶│    Strapi       │────▶│   PostgreSQL    │
│   Frontend      │ API │    Backend      │     │   Database      │
│   (Render)      │     │   (Render)      │     │   (Render)      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Architecture Pattern
- **Strapi** as headless CMS exposing REST/GraphQL APIs
- **Next.js** (App Router) consuming Strapi APIs for SSR/SSG
- **Render** hosting all three services (frontend, backend, database)

## Repository Structure

```
applied-economics-site/
├── backend/           # Strapi CMS
├── frontend/          # Next.js + React
├── infra/             # Render config, environment docs
├── docs/              # Project docs, runbook
├── package.json       # (optional) workspace root
└── README.md
```

Can be configured as **pnpm/npm workspace** for shared tooling.

## Content Model Design

### Collection Types (Multi-entry)
| Type | Purpose | Key Relations |
|------|---------|---------------|
| Service | Service pages | → Client Type, Case Study, Paper |
| Client Type | Who we work with | ← Service |
| Case Study | Project examples | → Service, Client Type |
| Paper | Research publications | → Tag, Person |
| Dataset | Data products | → Paper |
| Insight (Post) | Blog/news | → Tag |
| Person | Team members | → Paper |
| Job | Career openings | - |
| Guide | Lab guides | → Tag |
| Tag | Shared taxonomy | ← Paper, Insight, Dataset, Guide |

### Single Types (One-off pages)
- Home Page
- About Page
- Lab Page
- Careers Page Content
- Contact Page Content
- Navigation

### Strapi Components (Reusable blocks)
- `cta.button` – label, url, variant
- `layout.section_header` – heading, subheading, optional link
- `content.callout` – type (info/highlight/quote), body
- `content.stat_block` – label, value
- `content.key_finding` – single bullet text
- `content.external_link` – label, url
- `content.education_item` – degree, institution
- `content.office_location` – city, address, email

### Dynamic Zones
Used in Single Types where marketing may reorder blocks (e.g., homepage sections).

## Frontend Routing Pattern

Using Next.js App Router (`app/` directory):

```
app/
├── page.tsx                    # /
├── about/
│   ├── page.tsx               # /about
│   ├── story/page.tsx         # /about/story
│   ├── leadership/page.tsx    # /about/leadership
│   ├── approach/page.tsx      # /about/approach
│   └── team/page.tsx          # /about/team
├── services/
│   ├── page.tsx               # /services
│   └── [slug]/page.tsx        # /services/[slug]
├── research/
│   ├── page.tsx               # /research
│   └── [slug]/page.tsx        # /research/[slug]
├── data/
│   ├── page.tsx               # /data
│   ├── open/page.tsx          # /data/open
│   ├── products/page.tsx      # /data/products
│   ├── methodology/page.tsx   # /data/methodology
│   └── [slug]/page.tsx        # /data/[slug]
├── lab/
│   ├── page.tsx               # /lab
│   ├── about/page.tsx         # /lab/about
│   ├── fellowship/page.tsx    # /lab/fellowship
│   └── guides/
│       ├── page.tsx           # /lab/guides
│       └── [slug]/page.tsx    # /lab/guides/[slug]
├── insights/
│   ├── page.tsx               # /insights
│   └── [slug]/page.tsx        # /insights/[slug]
├── careers/
│   ├── page.tsx               # /careers
│   └── [slug]/page.tsx        # /careers/[slug]
├── contact/page.tsx           # /contact
└── not-found.tsx              # 404
```

## Data Fetching Pattern

### Client Layer (`lib/strapiClient.ts`)
- Centralized API client for Strapi interaction
- Environment variables:
  - `NEXT_PUBLIC_STRAPI_URL` – base URL
  - Server-side API token (not exposed client-side)

### Helper Functions
```typescript
// Example pattern
getHomePage()
getServices() / getServiceBySlug(slug)
getPapers(filters) / getPaperBySlug(slug)
getDatasets(filters) / getDatasetBySlug(slug)
getInsights(filters) / getInsightBySlug(slug)
getPeople() / getPersonBySlug(slug)
getJobs() / getJobBySlug(slug)
```

### Server Components
- Use Next.js server components for data-driven pages
- Filtering support for archives (by topic, type, year)

## Component Architecture

### Directory Structure
```
frontend/components/
├── ui/           # Base primitives (Button, Card, Input, etc.)
├── layout/       # Header, Footer, Breadcrumb
├── content/      # Hero, SectionHeader, Cards, CalloutBox, etc.
└── charts/       # D3 visualization components
```

### Design System Components

**UI Primitives:**
- Typography (`Heading`, `Text`)
- `Button` (primary, secondary, ghost variants)
- `Card` (padding, radius, shadow, hover)
- Form elements (`Input`, `Textarea`, `Select`, etc.)

**Layout Components:**
- `Header` (logo, nav, mobile menu, sticky behavior)
- `Footer` (3-column layout, legal links)
- `Breadcrumb` (accessible nav element)

**Content Components:**
- `Hero` (dark/light variants)
- `SectionHeader`
- Card variants (`ServiceCard`, `PaperCard`, `InsightCard`, etc.)
- `CalloutBox`, `StatBlock`, `TagChip`, `FilterBar`

## Data Visualization Pattern

### D3 + React Integration
- D3 for scales, axes, and layout logic
- SVG rendering via React components
- Components in `frontend/components/charts/`

### Chart Components
- `LineChart`
- `BarChart`
- `AreaChart`
- `StatGrid`

### Chart Standards
- Color palette: Series 1–6 from design system
- Gridlines: Gray 200 dashed
- Axis lines: Gray 300 solid
- Titles: H4 style
- Axis labels: caption style
- Data labels: monospace, 12px

## Accessibility Patterns

- Semantic HTML throughout
- Skip link as first focusable element
- Focus ring: 2px accent color with offset
- Keyboard navigation for all interactive elements
- ARIA labels where needed
- Form labels and error announcements
- Color contrast per WCAG 2.1 AA

## Page Template Inventory (from Phase 2)

The site requires 12 distinct page templates:

| Template | Type | Used For | Key Sections |
|----------|------|----------|--------------|
| T1: Homepage | Static | `/` | Hero, Credibility bar, Services grid, Featured work, Latest insights, CTA band |
| T2: Section Landing | Static | `/about`, `/services`, `/data`, `/lab` | Page header, Overview, Entry points to sub-pages |
| T3: Content Page | Static | `/about/story`, `/about/approach`, `/services/*` | Rich text content, Related links |
| T4: Team Directory | Dynamic | `/about/team`, `/about/leadership` | Grid of Person cards with filters |
| T5: Person Profile | Dynamic | `/about/team/[slug]` | Photo, bio, education, publications |
| T6: Research Archive | Dynamic | `/research` | Search, Filters (type/topic/year/author), Paper cards, Pagination |
| T7: Paper Detail | Dynamic | `/research/[slug]` | Header, Actions bar (PDF/citation), Key findings, Abstract, Related |
| T8: Data Archive | Dynamic | `/data/open`, `/data/products` | Dataset cards with access type badges |
| T9: Dataset Detail | Dynamic | `/data/[slug]` | Coverage, methodology, access, license, related papers |
| T10: Insights Archive | Dynamic | `/insights` | Filterable post list |
| T11: Post Detail | Dynamic | `/insights/[slug]` | Rich text body, metadata, related posts |
| T12: Careers | Dynamic | `/careers` | Hero, Why join, Open roles (ATS), Fellowship banner |

## Homepage Section Specifications (from Phase 3)

| Section | Specification |
|---------|---------------|
| **Nav Bar** | Fixed on scroll. Logo left. Primary nav centre. Contact + Search right. Mobile: Hamburger menu |
| **Hero** | Full-width, dark background. H1 headline. Subhead. Primary CTA. Height: 70-80vh desktop, 50vh mobile |
| **Credibility Bar** | 'Featured in:' with 4-6 logos (VoxEU, HBR, Parliament) |
| **Services Grid** | 3-column grid (1-col mobile). Icon/graphic, title, description, link per card |
| **Featured Work** | 2-3 featured papers/projects. Horizontal scroll mobile, grid desktop |
| **Latest Insights** | 3 most recent posts (auto-populated). Thumbnail, title, date, excerpt |
| **CTA Band** | Full-width dark band. Split CTAs: 'Work with us' | 'Join the team' |
| **Footer** | 4-column: Nav links (2 cols), Contact info, Newsletter. Bottom: copyright, legal, social |

## SEO Patterns

- Next.js `metadata` per page
- Structured data (Organization, Person, Article, Dataset)
- XML sitemap generation
- Canonical URLs
- Robots.txt configuration
