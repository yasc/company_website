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

## Design Tokens (Updated: "Clinical & Intellectual")

### Color Palette

**Core Brand Colors:**
| Token | Hex | Usage |
|-------|-----|-------|
| `paper` | `#F9F9FB` | Base background (warm light gray) |
| `charcoal` | `#111827` | Primary headers/text (Slate-900) |
| `slate` | `#374151` | Body text (Slate-700) |
| `klein` | `#0047AB` | Primary actions ("International Klein Blue") |
| `indigo` | `#4361EE` | Tech accent (Data points, "Palantir vibes") |
| `teal` | `#006D77` | Secondary actions/accents |

**Utility Scale (Slate Extended):**
| Token | Hex | Usage |
|-------|-----|-------|
| `slate-50` | `#f8fafc` | |
| `slate-100` | `#f1f5f9` | Tertiary backgrounds |
| `slate-200` | `#e2e8f0` | Light borders |
| `slate-300` | `#cbd5e1` | Medium borders |
| `slate-500` | `#64748b` | Muted text |
| `white` | `#ffffff` | Card backgrounds |

### Typography

**Typefaces:**
- **Headlines:** `Inter Tight` (Google Font) - High-contrast Sans-Serif (Swiss Style)
- **Body:** `Inter` (Google Font) - Clean, highly readable
- **Monospace:** `JetBrains Mono` (Google Font) - Data, charts, labels

**Type Scale:**
| Role | Font | Size | Weight | Tracking |
|------|------|------|--------|----------|
| Display | Inter Tight | 48-80px | 700 | -0.03em |
| H1 | Inter Tight | 36-56px | 600 | -0.02em |
| H2 | Inter Tight | 28-40px | 600 | -0.01em |
| Body | Inter | 16-18px | 400 | Normal |
| Label | JetBrains Mono | 12px | 500 | +0.05em |

### Spacing & Layout

- **Grid:** 12-column grid system
- **Macro-Whitespace:** 120px vertical spacing between major sections
- **Container:** Max-width 1440px with 32px padding

### Components

**Buttons:**
- **Primary:** `bg-klein` text-white, rounded-md (4px), 14px/500 font
- **Outline:** `border-slate-300` text-charcoal, hover `bg-slate-100`

**Cards:**
- **Background:** White (`#ffffff`)
- **Border:** Light Slate (`#e2e8f0`)
- **Padding:** 32px
- **Hover:** Border `indigo`, subtle shadow

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
