# Tech Context: Applied Economics Website

## Technology Stack

### Backend (CMS)
| Technology | Purpose | Version |
|------------|---------|---------|
| Strapi | Headless CMS | Latest |
| PostgreSQL | Database | - |
| Node.js | Runtime | LTS (>= 20) |

### Frontend
| Technology | Purpose | Version |
|------------|---------|---------|
| Next.js | React framework (App Router) | Latest |
| React | UI library | Latest |
| TypeScript | Type safety | Latest |
| Tailwind CSS | Utility-first styling | Latest |
| D3 | Data visualization | Latest |

### Infrastructure
| Service | Purpose |
|---------|---------|
| GitHub | Version control, CI trigger |
| Render | Hosting (web services + managed Postgres) |
| **Attio** | CRM for lead capture (post-launch integration) |

## Development Setup

### Prerequisites
Developers must have installed:
- Node.js LTS (>= 20)
- pnpm or npm
- Git
- PostgreSQL (local or Docker) for Strapi dev
- Code editor with TypeScript, ESLint, Prettier support

### Local Development

**Backend (Strapi):**
```bash
cd backend
npm install
npm run develop
```
Strapi admin available at `http://localhost:1337/admin`

**Frontend (Next.js):**
```bash
cd frontend
npm install
npm run dev
```
Site available at `http://localhost:3000`

### Environment Variables

**Backend (`backend/.env`):**
```
DATABASE_HOST=
DATABASE_PORT=
DATABASE_NAME=
DATABASE_USERNAME=
DATABASE_PASSWORD=
STRAPI_ADMIN_JWT_SECRET=
APP_KEYS=
API_TOKEN_SALT=
ADMIN_JWT_SECRET=
JWT_SECRET=
```

**Frontend (`frontend/.env.local`):**
```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

## Dependencies

### Backend Dependencies
- `pg` – PostgreSQL client
- Strapi built-in plugins (users-permissions, upload)
- Optional: GraphQL plugin, S3 upload provider

### Frontend Dependencies
```json
{
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest",
    "d3": "latest"
  },
  "devDependencies": {
    "typescript": "latest",
    "tailwindcss": "latest",
    "postcss": "latest",
    "autoprefixer": "latest",
    "eslint": "latest",
    "prettier": "latest",
    "@types/react": "latest",
    "@types/node": "latest",
    "@types/d3": "latest",
    "jest": "latest",
    "@testing-library/react": "latest",
    "playwright": "latest"
  }
}
```

### Form Handling
- `react-hook-form` or similar for contact form

### Accessibility Dev Tools
- `@axe-core/react` (dev only)

## Code Quality Tools

### ESLint
- TypeScript support
- React/Next.js rules
- Consistent code patterns

### Prettier
- Automatic formatting
- Integrated with ESLint

### TypeScript
- Strict mode enabled
- Type definitions for all dependencies

## Testing Stack

### Unit & Integration
- Jest
- React Testing Library

### E2E
- Playwright

### Accessibility
- axe DevTools
- Manual screen reader testing (NVDA/VoiceOver)

### Performance
- Lighthouse audits

## Design Tokens (from Phase 4 Visual Design)

### Color Palette

**Primary (Navy):**
| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `navy-900` | `#0F1419` | 15, 20, 25 | Hero backgrounds, footer |
| `navy-800` | `#1A2332` | 26, 35, 50 | Primary dark background |
| `navy-700` | `#2D3748` | 45, 55, 72 | Secondary dark elements |
| `navy-600` | `#4A5568` | 74, 85, 104 | Dark text on light bg |

**Neutral (Gray):**
| Token | Hex | Usage |
|-------|-----|-------|
| `gray-500` | `#718096` | Secondary text, captions |
| `gray-400` | `#A0AEC0` | Placeholder text, disabled |
| `gray-300` | `#CBD5E0` | Borders, dividers |
| `gray-200` | `#E2E8F0` | Light borders, table lines |
| `gray-100` | `#EDF2F7` | Light backgrounds, cards |
| `gray-50` | `#F7FAFC` | Page background (light) |
| `white` | `#FFFFFF` | Card backgrounds, text on dark |

**Accent (Teal):**
| Token | Hex | Usage |
|-------|-----|-------|
| `teal-600` | `#2C7A7B` | Hover state for primary |
| `teal-500` | `#319795` | Primary accent, CTAs, links |
| `teal-400` | `#4FD1C5` | Light accent on dark bg |

**Semantic:**
| Token | Hex | Usage |
|-------|-----|-------|
| `amber-500` | `#D69E2E` | Warning, highlight |
| `red-500` | `#E53E3E` | Error states |
| `green-500` | `#38A169` | Success states |

**Chart Series:**
| Token | Hex |
|-------|-----|
| `series-1` | `#319795` |
| `series-2` | `#2B6CB0` |
| `series-3` | `#6B46C1` |
| `series-4` | `#D69E2E` |
| `series-5` | `#C53030` |
| `series-6` | `#2F855A` |

### Typography

**Typefaces:**
- **Primary:** Inter (system-ui, sans-serif fallback)
- **Monospace:** JetBrains Mono (for code, data labels, stats)

**Type Scale (1.25 ratio, 16px base):**
| Name | Size | Weight | Line Height | Usage |
|------|------|--------|-------------|-------|
| Display | 48px / 3rem | 700 | 1.1 | Hero headlines |
| H1 | 36px / 2.25rem | 700 | 1.2 | Page titles |
| H2 | 28px / 1.75rem | 600 | 1.3 | Section headings |
| H3 | 22px / 1.375rem | 600 | 1.4 | Card titles |
| H4 | 18px / 1.125rem | 600 | 1.5 | Minor headings |
| Body Large | 18px / 1.125rem | 400 | 1.7 | Lead paragraphs |
| Body | 16px / 1rem | 400 | 1.6 | Default body |
| Small | 14px / 0.875rem | 400 | 1.5 | Captions, metadata |
| Caption | 12px / 0.75rem | 500 | 1.4 | Labels, tags, badges |
| Stat | 40px / 2.5rem | 700 | 1.1 | Impact stats (JetBrains Mono) |

**Responsive Typography:**
| Style | Desktop (≥1024px) | Tablet (768-1023px) | Mobile (<768px) |
|-------|-------------------|---------------------|-----------------|
| Display | 48px | 40px | 32px |
| H1 | 36px | 32px | 28px |
| H2 | 28px | 24px | 22px |
| Body | 16px | 16px | 16px |

### Spacing Scale (4px base)

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Tight spacing, icon gaps |
| `space-2` | 8px | Inline elements, small gaps |
| `space-3` | 12px | Button padding (vertical) |
| `space-4` | 16px | Default component padding |
| `space-6` | 24px | Card padding, element spacing |
| `space-8` | 32px | Section internal spacing |
| `space-12` | 48px | Between components |
| `space-16` | 64px | Section padding (vertical) |
| `space-24` | 96px | Large section breaks |

### Grid System

| Property | Desktop | Tablet | Mobile |
|----------|---------|--------|--------|
| Columns | 12 | 8 | 4 |
| Gutter | 24px | 24px | 16px |
| Margin | 64px | 32px | 16px |
| Max width | 1200px | 100% | 100% |

### Breakpoints

| Name | Value | Description |
|------|-------|-------------|
| `sm` | 640px | Large phones, small tablets |
| `md` | 768px | Tablets portrait |
| `lg` | 1024px | Tablets landscape, small laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large monitors |

### Component Tokens

**Buttons:**
| Property | Primary | Secondary | Ghost |
|----------|---------|-----------|-------|
| Background | teal-500 | transparent | transparent |
| Border | none | 1px navy-600 | none |
| Text | white | navy-700 | teal-500 |
| Padding | 12px 24px | 12px 24px | 12px 16px |
| Border radius | 6px | 6px | 6px |
| Hover bg | teal-600 | gray-100 | gray-100 |

**Cards:**
| Property | Value |
|----------|-------|
| Background | white |
| Border | 1px gray-200 |
| Border radius | 8px |
| Padding | 24px |
| Shadow (default) | 0 1px 3px rgba(0,0,0,0.1) |
| Shadow (hover) | 0 4px 12px rgba(0,0,0,0.1) |
| Hover transform | translateY(-2px) |

**Form Inputs:**
| Property | Value |
|----------|-------|
| Height | 44px |
| Border (default) | 1px gray-300 |
| Border (focus) | 2px teal-500 |
| Border (error) | 2px red-500 |
| Border radius | 6px |
| Font size | 16px (prevents iOS zoom) |

## Deployment Configuration

### Render Services

**1. Postgres Database:**
- Managed PostgreSQL instance
- Connection string provided to Strapi

**2. Strapi Backend (Web Service):**
- Runtime: Node
- Build: `npm install && npm run build`
- Start: `npm run start`
- Health check endpoint configured

**3. Next.js Frontend (Web Service):**
- Build: `npm install && npm run build`
- Start: `npm run start`
- Environment: `NEXT_PUBLIC_STRAPI_URL` pointing to Strapi

### CI/CD
- Auto-deploy on push to `main` branch
- GitHub → Render integration

### Storage
Options for Strapi uploads:
- S3-compatible storage via upload provider
- Render disk (if acceptable)

## Attio CRM Integration (Post-Launch)

### Overview
Lead capture from the contact form will integrate with **Attio CRM** via direct API calls from Next.js. No embedded form builder needed.

### Implementation Pattern
```
Contact Form → Next.js API Route → Strapi (optional) + Attio API
```

### API Flow
1. Contact form submits to Next.js API route (`/api/contact`)
2. API route validates input
3. Optionally creates a "Lead" record in Strapi for internal tracking
4. Calls Attio REST API to:
   - **Upsert Person** (by email)
   - **Upsert Company** (by domain extracted from email)
   - Optionally **create Deal** and link to Person + Company

### Environment Variables
```
ATTIO_API_KEY=          # Scoped API key from Attio
```

### Attio API Reference
- Docs: https://developers.attio.com/
- Authentication: Bearer token with scoped permissions
- Key endpoints:
  - `POST /v2/objects/people/records` – Create/upsert person
  - `POST /v2/objects/companies/records` – Create/upsert company
  - `POST /v2/objects/deals/records` – Create deal

### Data Mapping (Contact Form → Attio)
| Form Field | Attio Object | Attio Attribute |
|------------|--------------|-----------------|
| Name | Person | `name` |
| Email | Person | `email_addresses` |
| Organisation | Company | `name` |
| Enquiry Type | Deal | Custom attribute |
| Message | Deal | `description` or note |

## Technical Constraints

1. **No hard-coded content** – All production content from Strapi
2. **WCAG 2.1 AA** – Accessibility compliance required
3. **Design system adherence** – Colors, typography, spacing from Phase 4
4. **SEO requirements** – Structured data, sitemaps, meta tags
5. **TypeScript throughout** – Frontend must be fully typed
