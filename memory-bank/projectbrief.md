# Project Brief: Applied Economics Website

## Overview
Build a modern, professional website for Applied Economics using a headless CMS architecture. The project implements approved UX, IA, and visual design from Phase 1–4 project documents.

## Core Requirements

### Technical Stack
- **Headless CMS:** Strapi
- **Frontend:** React + Next.js (App Router, TypeScript)
- **Data Visualization:** React + D3
- **Deployment:** GitHub → Render (Strapi backend + Next.js frontend + Managed Postgres)

### Primary Goals
1. Implement the approved sitemap and information architecture
2. Build a design system matching the Visual Design specifications
3. Create content-managed pages for all site sections
4. Deploy a production-ready site on Render

## Site Sections
The website includes the following main sections:
- **Home** - Hero, featured services, work, insights
- **About** - Story, leadership, approach, team
- **Services** - Service details, case studies, client types
- **Research** - Papers archive with filtering, paper details
- **Data** - Open data, products, methodology, dataset details
- **Lab** - About, fellowship, guides
- **Insights** - Blog/posts archive and details
- **Careers** - Job listings, role details
- **Contact** - Inquiry form

## Success Criteria
- All routes render correctly with CMS-managed content
- Navigation and footer match the approved sitemap
- Full test suite passes (unit, integration, E2E)
- Accessibility and performance audits pass
- Forms work correctly (Contact, applications)
- Analytics and tracking installed

## Constraints
- Must follow WCAG 2.1 AA accessibility standards
- **NEW: Must implement High-End Minimalism aesthetic with light design** (Previous Phase 4 dark mode specifications are deprecated)
- Must use editorial typography approach: Serif headlines, Sans-serif UI elements
- Must implement SEO requirements from Strategy document
- No hard-coded production content; all content from Strapi CMS

### Design Direction Note
**Important:** The project has pivoted from the original dark design to a **High-End Minimalism** aesthetic with:
- Monochromatic base (black and white UI)
- Generous whitespace
- Editorial typography (serif headlines)
- Mixed media imagery
- Asymmetrical layouts

Any outdated references to dark design in older documentation should be ignored in favor of this light design approach.

## Source Documents

### Planning Documents (`docs/planning_docs/`)
| Document | Path | Contents |
|----------|------|----------|
| Phase 1: Discovery | `Applied_Economics_Phase1_Discovery.docx` | Vision, goals, personas, competitive context, success metrics |
| Phase 2: Strategy | `Applied_Economics_Phase2_Strategy.docx` | Value proposition, sitemap, content governance, page templates, SEO |
| Phase 3: UX Wireframing | `Applied_Economics_Phase3_UX_Wireframing.docx` | Wireframe specs, user flows, component library, accessibility patterns |
| Phase 4: Visual Design | `Applied_Economics_Phase4_Visual_Design.docx` | Design system, color/typography tokens, component specs, data viz standards |

### Implementation Guide (`docs/implementation_guides/`)
| Document | Path | Contents |
|----------|------|----------|
| Implementation Guide v1 | `implementation_guide_v1` | Developer runbook with technical architecture, Strapi models, Next.js routing, deployment |
