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
- **Charcoal** (#111827) - Headers/text
- **Klein Blue** (#0047AB) - Primary actions
- **Teal** (#006D77) - Secondary actions

### Typography
- **Display/Headlines**: Inter Tight (600-700 weight)
- **Body/UI**: Inter (400 weight)
- **Technical labels**: JetBrains Mono

### Spacing
- **120px** vertical spacing between major sections
- **1440px** max container width
- **32px** horizontal padding

### Component Patterns
- **Cards**: Flat white, light border, no shadows, border darkens on hover
- **Buttons**: Dark charcoal, lift effect on hover (-2px + scale 1.02)
- **Navigation**: Fixed header with scroll-triggered glass morphism

## Repository Structure

```
applied-economics-site/
├── backend/           # Strapi CMS
├── frontend/          # Next.js App
│   └── src/
│       ├── app/       # Pages (App Router)
│       └── components/
│           ├── ui/       # Button, Card, etc.
│           ├── layout/   # Header, Footer
│           ├── sections/ # Hero, InsightsGrid, etc.
│           └── charts/   # D3 visualizations
├── memory-bank/       # Project documentation
└── docs/              # Planning & implementation guides
```

## Development

### Running the Frontend
```bash
cd frontend
npm install
npm run dev
```

### Running the Backend (Strapi)
```bash
cd backend
npm install
npm run develop
```
