# Progress: Applied Economics Website

## Overall Status
**Phase:** Pre-development (Planning & Documentation Complete)

## What Works
- ✅ Implementation guide documented in Memory Bank
- ✅ Project requirements clearly defined
- ✅ Architecture and patterns established
- ✅ Technology stack selected
- ✅ **Repository structure created** (backend/, frontend/, infra/)
- ✅ **npm workspaces configured** (package.json)
- ✅ **README.md with setup instructions**
- ✅ **Tooling verified** (Node v25.2.1, npm 11.6.2, Git 2.39.5, PostgreSQL 14.20)
- ✅ **Strapi v5.33.1 bootstrapped** (TypeScript)
- ✅ **PostgreSQL client installed** (`pg`)
- ✅ **Environment files created** (.env, .env.example)
- ✅ **Strapi build verified**
- ✅ **Phase 1: Premium Visual Foundation** implemented (Light Theme, Inter Tight, Charcoal)
- ✅ **Phase 2: UI Elements & Tech Accents** (Glassmorphism, D3 Hero Graphic, Micro-interactions)
- ✅ **Phase 3: Structural Layout** (Sticky Header, Split Hero, Trust Bar, Insights Grid)

## What's Left to Build
Content types need to be created in Strapi, then frontend bootstrap. See checklist below.

## Known Issues
None yet – project hasn't started implementation.

---

## Developer Checklist
*(From Implementation Guide v1, Section 15)*

### Backend (Strapi)

- [x] Strapi app created in `backend/`
- [x] Database configured to use Postgres via env vars
- [x] Local Strapi environment running without errors
- [x] Required collection types created:
  - [x] Service
  - [x] Client Type
  - [x] Case Study
  - [x] Paper
  - [x] Dataset
  - [x] Insight (Post)
  - [x] Person (Team Member)
  - [x] Job
  - [x] Guide
  - [x] Tag
- [x] Required single types created:
  - [x] Home Page
  - [x] About Page (and related)
  - [x] Lab Page
  - [x] Careers Page
  - [x] Contact Page
  - [x] Navigation
- [x] Components defined for CTAs, sections, callouts, stats, education, office, external links
- [x] UID slugs configured and enforced
- [ ] Public role permissions configured for read-only content
- [ ] API tokens created and documented
- [ ] Local Strapi environment running without errors

### Frontend (Next.js + React)

- [x] Next.js TypeScript project created in `frontend/`
- [x] Tailwind configured with "Premium" design tokens (Paper White, Charcoal, Inter Tight)
- [x] Global layout implemented with:
  - [x] Skip link
  - [x] Header
  - [x] Footer
  - [x] `<main>` and basic structure
- [ ] UI primitives implemented:
  - [x] Typography components (via CSS classes)
  - [x] Buttons (all variants & states)
  - [x] Cards
  - [ ] Form inputs & error messages
- [ ] Layout components implemented:
  - [ ] Header with nav + mobile menu
  - [ ] Footer with correct columns
  - [ ] Breadcrumb component
- [x] Content components implemented:
  - [x] Hero (Split Screen + D3 Graphic)
  - [x] TrustBar (Client logos)
  - [x] InsightsGrid (Bento box value prop)
  - [ ] SectionHeader
  - [ ] ServiceCard / PaperCard / InsightCard / PersonCard / JobCard / DatasetCard / CaseStudyCard
  - [ ] CalloutBox
  - [ ] StatBlock
  - [ ] TagChip
  - [ ] FilterBar
- [ ] Routes created per sitemap:
  - [ ] `/`
  - [ ] `/about`, `/about/story`, `/about/leadership`, `/about/approach`, `/about/team`
  - [ ] `/services`, `/services/[slug]`
  - [ ] `/research`, `/research/[slug]`
  - [ ] `/data`, `/data/open`, `/data/products`, `/data/methodology`, `/data/[slug]`
  - [ ] `/lab`, `/lab/about`, `/lab/fellowship`, `/lab/guides`, `/lab/guides/[slug]`
  - [ ] `/insights`, `/insights/[slug]`
  - [ ] `/careers`, `/careers/[slug]`
  - [ ] `/contact`
- [x] Data fetching functions implemented for all content types
- [ ] All pages wired to Strapi data (no hard-coded production content)

### Data Visualization

- [ ] D3 installed and configured
- [ ] Core chart components implemented using standards:
  - [ ] LineChart
  - [ ] BarChart
  - [ ] AreaChart
  - [ ] StatGrid (stat blocks)
- [ ] Visual design of charts matches palette, gridlines, typography
- [ ] Charts used in relevant pages where data visualizations are needed
- [ ] Accessible descriptions / ARIA attributes applied

### Accessibility & SEO

- [ ] Keyboard navigation works across:
  - [ ] Header (including dropdowns)
  - [ ] Mobile menu
  - [ ] Forms
  - [ ] Modals
- [ ] Focus states visible on all interactive elements
- [ ] Forms:
  - [ ] Labels and required indicators implemented
  - [ ] Error messages accessible
- [ ] Basic screen reader tests completed
- [ ] Axe or similar audit run; critical issues fixed
- [ ] Meta titles & descriptions pulled from CMS implemented
- [ ] Canonical URLs, robots.txt, sitemap.xml configured
- [ ] Structured data implemented for Organization, Person, Article, Dataset

### Testing

- [ ] Unit tests written for key components
- [ ] Integration tests for critical pages
- [ ] Playwright E2E tests for:
  - [ ] Services → Case Study → Contact flow
  - [ ] Research browsing flow
  - [ ] Careers / recruiting funnel flow
- [ ] Test suite passing in CI

### Deployment (Render)

- [ ] `.env.example` files created and committed (no secrets)
- [ ] Render Postgres instance created and linked to Strapi
- [ ] Strapi web service created:
  - [ ] Build and start commands working
  - [ ] All env vars set
- [ ] Next.js web service created:
  - [ ] Build and start commands working
  - [ ] `NEXT_PUBLIC_STRAPI_URL` set
- [ ] Auto-deploy configured from GitHub main branch
- [ ] Smoke tests performed on staging / production:
  - [ ] All main routes load
  - [ ] Content visible and correct
  - [ ] Contact form works as expected

---

## Project Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| - | Next.js App Router | Modern React patterns, better server components |
| - | TypeScript | Type safety, better DX |
| - | Tailwind CSS | Rapid styling, design token integration |
| - | Strapi | Flexible headless CMS, good React ecosystem support |
| - | Render | Integrated hosting for all services |
| - | D3 for charts | Industry standard, full control over visualizations |
| - | **Attio CRM** | Direct API integration for lead capture; no embedded form builder needed |

## Milestones

| Milestone | Status | Notes |
|-----------|--------|-------|
| Memory Bank Setup | ✅ Complete | Documentation initialized |
| Repository Setup | ✅ Complete | Monorepo structure, npm workspaces, README |
| Strapi Backend | ✅ Complete | All content types and components created |
| Frontend Bootstrap | ✅ Complete | Next.js initialized, Strapi client created |
| Design System | 🟡 In Progress | Base components done, forms remaining |
| Page Implementation | ⬜ Not Started | |
| Data Visualization | ⬜ Not Started | |
| Testing | ⬜ Not Started | |
| Deployment | ⬜ Not Started | |
| Content Migration | ⬜ Not Started | |
| Launch | ⬜ Not Started | |
| **Attio CRM Integration** | ⬜ Not Started | Post-launch: Connect contact form to Attio |
