# Applied Economics Website

A professional website for an economics consulting firm. The site communicates rigorous economic research, data-driven insights, and consulting services through a modern, minimalist interface.

**Value Proposition:** "Precision Economics for a Complex World" - targeting Fortune 500 companies with algorithmic strategy and data-driven consulting.

## Tech Stack & Architecture

### Frontend
- **Next.js 16** with App Router (React 19, TypeScript 5)
- **Tailwind CSS 4** for styling
- **D3 v7** for data visualization
- **Google Fonts**: Inter, Inter Tight, JetBrains Mono

### Backend
- **Strapi v5** headless CMS
- **PostgreSQL** database

### Infrastructure
- **Render** for hosting (web services + managed PostgreSQL)
- **GitHub** for version control

### Architecture Pattern
```
Next.js Frontend → Strapi REST/GraphQL API → PostgreSQL
```

## Design Principles

### Aesthetic: "High-End Minimalism"
The site uses a **light, clinical, editorial aesthetic**:

| Principle | Implementation |
|-----------|----------------|
| **Minimalism** | Maximum whitespace, minimal decoration |
| **Authority** | High-contrast typography, sharp headers |
| **Clinical** | Monochromatic palette with strategic accent colors |
| **Enterprise** | Sharp corners (0-4px radius), no card shadows |

### Color Palette
- **Paper** (#F9F9FB) - Primary background
- **Charcoal** (#111827) - Headers/text and primary actions
- **Teal** (#006D77) - Secondary actions
- *Note: An indigo token (#4361EE) exists in tailwind config but is currently unused*

### Typography
- **Display/Headlines**: Inter Tight (600-700 weight)
- **Body/UI**: Inter (400 weight)
- **Technical labels**: JetBrains Mono

### Spacing
- **120px** vertical spacing between major sections
- **Container widths**: CSS `.container-wide` = 1440px; `Container.tsx` component uses Tailwind — default=max-w-6xl (1152px), wide=max-w-7xl (1280px), narrow=max-w-3xl (768px)
- **32px** horizontal padding

### Component Patterns
- **Cards**: Flat white, light border, no shadows, border darkens on hover
- **Buttons**: Dark charcoal, background darkens on hover (200ms ease)
- **Navigation**: Fixed header with scroll-triggered glass morphism

## Repository Structure

```
applied-economics-site/
├── backend/           # Strapi v5 CMS
├── frontend/          # Next.js App
│   └── src/
│       ├── app/       # Pages (App Router)
│       ├── components/
│       │   ├── ui/       # Button, Card, Container
│       │   ├── layout/   # Header, Footer, PalantirHeader, PalantirFooter
│       │   └── sections/ # Hero, InsightsGrid, PlatformsSection, etc.
│       └── lib/       # strapiClient.ts
├── elements/          # Media assets (hero images, video)
├── scripts/           # Dev utility scripts
├── infra/             # Infrastructure (placeholder)
├── do_not_use/        # Archived docs from earlier tooling
└── docs/              # Planning & implementation guides
```

## Development

This project uses **npm workspaces** with a root `package.json`. Requires **Node.js >=20.0.0**.

### Monorepo Scripts (from project root)
```bash
npm install              # Install all workspace dependencies
npm run dev:frontend     # Start Next.js dev server
npm run dev:backend      # Start Strapi dev server
```

### Per-Directory (alternative)
```bash
cd frontend && npm run dev       # Next.js
cd backend && npm run develop    # Strapi
```

## Workflow Preferences

### Git Commits
- Do **not** include `Co-Authored-By` lines or any AI/Anthropic attribution in commit messages

# Web Development Agent System

Be sure to make use of the multi-agent web development system that is available to you and described below.

Summary: A multi-agent system for building production-grade professional websites using Claude Code. This system provides general-purpose web development skills, specialized sub-agents, and adversarial review teams.

## Directory Structure

```
.claude/
├── CLAUDE.md                           ← You are here
├── skills/                             ← Core technology skills
│   ├── nextjs/SKILL.md                 ← Next.js App Router
│   ├── react/SKILL-2.md               ← React components & hooks
│   ├── typescript/SKILL-3.md           ← Type safety & patterns
│   ├── tailwindcss/SKILL-4.md          ← Utility-first CSS
│   ├── d3/SKILL-5.md                   ← Data visualization
│   ├── animejs/SKILL-6.md              ← Web animations
│   ├── branding/                       ← (empty placeholder)
│   └── content-strategy/               ← (empty placeholder)
├── agents/                             ← Specialized sub-agents
│   ├── technical/
│   │   ├── nextjs-engineer.md          ← App architecture & routing
│   │   ├── react-architect.md          ← Component design & state
│   │   ├── typescript-engineer.md      ← Type system & safety
│   │   ├── d3-visualization-engineer.md ← Charts & data graphics
│   │   └── animejs-motion-engineer.md  ← Micro-interactions & motion
│   ├── branding/
│   │   ├── brand-strategist.md         ← Brand identity & positioning
│   │   └── content-strategist.md       ← Messaging & copy
│   └── design/
│       ├── visual-designer.md          ← Visual design & art direction
│       ├── typography-specialist.md    ← Typeface selection & typesetting
│       ├── ux-researcher.md            ← Usability & accessibility
│       └── interaction-designer.md     ← Interactive behaviors & states
└── teams/                              ← Adversarial review teams
    ├── design-critique.md              ← Visual design quality review
    ├── code-quality-review.md          ← Implementation quality review
    └── ux-audit.md                     ← User experience quality review
```

## How to Use

### 1. Skills

Skills are reference documentation that agents read before working. They contain best practices, patterns, and anti-patterns for each technology. Reference them in your `CLAUDE.md`:

When working using a specific technology, read the respective skills first. For example, if working with next.js, react, and Tailwind CSS, then read the relevant skills here first:
- skills/nextjs/SKILL.md
- skills/react/SKILL.md
- skills/tailwindcss/SKILL.md

### 2. Agents

Agents are role-specific prompts that can be used as sub-agent instructions in Claude Code. Each agent has defined responsibilities, a review checklist, and collaboration protocols.

To invoke an agent, reference its file in a task:

```
Act as the Visual Designer (agents/design/visual-designer.md).
Read the relevant skills first, then design the hero section.
```

### 3. Teams

Teams are adversarial review protocols. They define multi-agent critique-and-iterate cycles that improve quality through structured disagreement.

To run a team review:

```
Run the Design Critique team (teams/design-critique.md) on the hero section.
The Visual Designer presents, Brand Strategist and Typography Specialist critique.
```

## Agent Dependency Map

```
Brand Strategist ──→ Visual Designer ──→ All Technical Agents
       │                    │
       ↓                    ↓
Content Strategist   Typography Specialist
       │
       ↓
  All Pages/Copy

UX Researcher ──→ Interaction Designer ──→ Anime.js Motion Engineer
       │
       ↓
  All Components

TypeScript Engineer ──→ React Architect ──→ Next.js Engineer
                              │
                              ↓
                   D3 Visualization Engineer
```

## Adversarial Review Flow

```
1. CREATOR produces work
      ↓
2. RED TEAM independently critiques (2-3 critics)
      ↓
3. CREATOR responds (accept / modify / reject with reasoning)
      ↓
4. CREATOR implements changes
      ↓
5. RED TEAM verifies (approve / request another round)
      ↓
6. JUDGE resolves disputes (human stakeholder)
```

Maximum 3 rounds per review. Escalate to human if no consensus.

## Quality Standards

All work must meet these thresholds:

| Dimension | Minimum Score |
|-----------|--------------|
| Visual Design Quality | 7/10 |
| Brand Alignment | 7/10 |
| Code Quality | All non-negotiable gates pass |
| UX Score | 7/10 overall, no dimension ≤ 5 |
| Accessibility | WCAG 2.1 AA compliant |
| Performance | LCP < 2.5s, CLS < 0.1 |

## Extending the System

### Adding a New Skill
Create `skills/[name]/SKILL.md` with the frontmatter format:
```yaml
---
name: skill-name
description: When to use this skill...
---
```

### Adding a New Agent
Create `agents/[category]/[name].md` with sections: Role, Skills, Responsibilities, Review Checklist, Collaboration, When to Escalate.

### Adding a New Team
Create `teams/[name].md` with sections: Team Composition, Protocol (rounds), Scoring Rubric, Iteration Limits, When to Escalate.
