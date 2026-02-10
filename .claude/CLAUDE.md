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
