# Applied Economics Website

Modern website for Applied Economics built with a headless CMS architecture.

## Tech Stack

- **Backend (CMS):** Strapi with PostgreSQL
- **Frontend:** Next.js (App Router) + React + TypeScript
- **Styling:** Tailwind CSS
- **Data Visualization:** D3
- **Deployment:** Render (web services + managed Postgres)

## Project Structure

```
applied-economics-site/
├── backend/          # Strapi CMS
├── frontend/         # Next.js + React
├── infra/            # Render config, environment docs
├── docs/             # Project documentation
│   ├── implementation_guides/
│   └── planning_docs/
├── memory-bank/      # Project context documentation
├── package.json      # Workspace root
└── README.md
```

## Prerequisites

- **Node.js:** LTS version >= 20
- **npm:** >= 10 (or pnpm)
- **Git:** For version control
- **PostgreSQL:** Local instance or Docker for Strapi development

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/applied-economics/applied-economics-site.git
cd applied-economics-site
```

### 2. Install dependencies

```bash
npm install
```

This will install dependencies for both `backend` and `frontend` workspaces.

### 3. Set up environment variables

**Backend (`backend/.env`):**
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=strapi
STRAPI_ADMIN_JWT_SECRET=<generate-secret>
APP_KEYS=<generate-keys>
API_TOKEN_SALT=<generate-salt>
ADMIN_JWT_SECRET=<generate-secret>
JWT_SECRET=<generate-secret>
```

**Frontend (`frontend/.env.local`):**
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

### 4. Start development servers

**Backend (Strapi):**
```bash
npm run dev:backend
# or
cd backend && npm run develop
```
Strapi admin panel: http://localhost:1337/admin

**Frontend (Next.js):**
```bash
npm run dev:frontend
# or
cd frontend && npm run dev
```
Website: http://localhost:3000

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev:backend` | Start Strapi in development mode |
| `npm run dev:frontend` | Start Next.js dev server |
| `npm run build:backend` | Build Strapi for production |
| `npm run build:frontend` | Build Next.js for production |
| `npm run start:backend` | Start Strapi in production mode |
| `npm run start:frontend` | Start Next.js in production mode |

## Documentation

- **Implementation Guide:** `docs/implementation_guides/implementation_guide_v1`
- **Planning Documents:** `docs/planning_docs/`
  - Phase 1: Discovery
  - Phase 2: Strategy
  - Phase 3: UX Wireframing
  - Phase 4: Visual Design
- **Memory Bank:** `memory-bank/` - Project context and progress tracking

## Deployment

The site is deployed to Render with:
- PostgreSQL managed database
- Strapi web service
- Next.js web service

Auto-deployment is configured from the `main` branch.

## License

Proprietary - All rights reserved.
