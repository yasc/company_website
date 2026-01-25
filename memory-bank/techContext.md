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

## Design Tokens (Updated: High-End Minimalism)

### Color Palette

**Monochromatic Base (UI Framework):**
| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `black` | `#000000` | 0, 0, 0 | Headlines, primary text, strong emphasis |
| `gray-900` | `#111111` | 17, 17, 17 | Near-black for softer text |
| `gray-800` | `#1A1A1A` | 26, 26, 26 | Secondary headings |
| `gray-700` | `#333333` | 51, 51, 51 | Body text |
| `gray-600` | `#4A4A4A` | 74, 74, 74 | Secondary body text |
| `gray-500` | `#6B6B6B` | 107, 107, 107 | Tertiary text, captions |
| `gray-400` | `#9CA3AF` | 156, 163, 175 | Placeholder text, disabled |
| `gray-300` | `#D1D5DB` | 209, 213, 219 | Subtle borders, dividers |
| `gray-200` | `#E5E7EB` | 229, 231, 235 | Very light borders |
| `gray-100` | `#F3F4F6` | 243, 244, 246 | Light backgrounds for variation |
| `gray-50` | `#F9FAFB` | 249, 250, 251 | Near-white backgrounds |
| `white` | `#FFFFFF` | 255, 255, 255 | Primary background, reverse text |

**Accent Colors (Used sparingly in content/imagery):**
| Token | Hex | Usage |
|-------|-----|-------|
| `green-500` | `#10B981` | AI/tech imagery accent (e.g., Hero Card) |
| `blue-500` | `#3B82F6` | Links, interactive elements |
| `blue-600` | `#2563EB` | Link hover states |

**Semantic (Minimal use):**
| Token | Hex | Usage |
|-------|-----|-------|
| `red-500` | `#EF4444` | Error states only |
| `green-600` | `#059669` | Success states only |

**Chart/Visualization Colors:**
| Token | Hex | Usage |
|-------|-----|-------|
| `series-1` | `#000000` | Primary data series |
| `series-2` | `#4A4A4A` | Secondary data series |
| `series-3` | `#10B981` | Accent series (green) |
| `series-4` | `#3B82F6` | Accent series (blue) |
| `series-5` | `#9CA3AF` | Supporting series |
| `series-6` | `#E5E7EB` | Background series |

### Typography

**Typefaces:**
- **Serif (Headlines):** Playfair Display or Georgia (editorial authority)
- **Sans-serif (Body/UI):** Inter (clean, geometric, system-ui fallback)
- **Monospace:** JetBrains Mono (for code, data labels, stats)

**Type Scale (Editorial approach):**
| Name | Font | Size | Weight | Line Height | Usage |
|------|------|------|--------|-------------|-------|
| Display | Serif | 64px / 4rem | 400 | 1.1 | Hero headlines (editorial) |
| H1 | Serif | 48px / 3rem | 400 | 1.2 | Page titles |
| H2 | Serif | 36px / 2.25rem | 400 | 1.3 | Section headings |
| H3 | Sans-serif | 24px / 1.5rem | 600 | 1.4 | Card titles |
| H4 | Sans-serif | 20px / 1.25rem | 600 | 1.5 | Minor headings |
| Body Large | Sans-serif | 18px / 1.125rem | 400 | 1.7 | Lead paragraphs |
| Body | Sans-serif | 16px / 1rem | 400 | 1.6 | Default body |
| Small | Sans-serif | 14px / 0.875rem | 400 | 1.5 | Captions, metadata |
| Caption | Sans-serif | 12px / 0.75rem | 500 | 1.4 | Labels, tags, badges |
| Stat | Monospace | 40px / 2.5rem | 700 | 1.1 | Impact stats |

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

**Buttons (Pill-shaped, Understated):**
| Property | Primary | Secondary | Ghost |
|----------|---------|-----------|-------|
| Background | black | white | transparent |
| Border | none | 1px black | none |
| Text | white | black | black |
| Padding | 14px 28px | 14px 28px | 14px 20px |
| Border radius | 24px | 24px | 24px |
| Hover bg | gray-900 | gray-50 | gray-50 |
| Transition | all 0.2s ease | all 0.2s ease | all 0.2s ease |

**Cards (Asymmetrical Heights):**
| Property | Value |
|----------|-------|
| Background | white |
| Border | none or 1px gray-200 (subtle) |
| Border radius | 0px (sharp) or 4px (minimal) |
| Padding | 32px (generous) |
| Shadow (default) | none or 0 1px 2px rgba(0,0,0,0.05) |
| Shadow (hover) | 0 4px 8px rgba(0,0,0,0.08) |
| Hover transform | translateY(-4px) |
| Min height | Varies for asymmetry |

**Form Inputs (Minimal):**
| Property | Value |
|----------|-------|
| Height | 48px |
| Border (default) | 1px gray-300 |
| Border (focus) | 1px black |
| Border (error) | 1px red-500 |
| Border radius | 0px (sharp) or 4px (minimal) |
| Font size | 16px (prevents iOS zoom) |
| Padding | 16px |
| Background | white |

**Navigation Elements:**
| Property | Value |
|----------|-------|
| Font | Sans-serif (Inter) |
| Weight | 400 (regular) |
| Size | 14px |
| Letter spacing | 0.02em |
| Text transform | None (sentence case) |
| Color | black |
| Hover | gray-600 with underline |

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
