# Active Context: Applied Economics Website

## Current Focus
**Phase: Strapi Backend Running → Content Model Design**

All prerequisites satisfied. PostgreSQL database configured and Strapi v5.33.1 running successfully at `http://localhost:1337/admin`. Next step is to create the first admin user and build content types.

## Recent Changes
- Created Memory Bank documentation structure
- Documented project requirements from implementation guide v1
- Established system patterns and technical context
- **Updated Memory Bank with Phase 1-4 planning documents:**
  - Added personas, business goals, messaging pillars to `productContext.md`
  - Added page template inventory and homepage specs to `systemPatterns.md`
  - Added full design tokens (colors, typography, spacing, components) to `techContext.md`
  - Added explicit source document references to `projectbrief.md`
- **Completed Repository Setup (Implementation Guide Steps 1 & 2):**
  - Verified tooling: Node.js v25.2.1 (Strapi requires Node@22, installed via Homebrew)
  - Created monorepo structure: `backend/`, `frontend/`, `infra/`
  - Configured npm workspaces in root `package.json`
  - Added `README.md` with setup instructions
- **Completed Strapi Bootstrap (Implementation Guide Step 3.1-3.2):**
  - Strapi v5.33.1 initialized with TypeScript
  - PostgreSQL client (`pg`) installed
  - Environment files created (`.env`, `.env.example`)
  - Build verified successfully
- **Completed Section 2 "Tooling & Prerequisites":**
  - PostgreSQL 14.20 installed via Homebrew
  - All prerequisites now satisfied: Node.js v25.2.1, npm 11.6.2, Git 2.39.5, PostgreSQL 14.20

## Immediate Next Steps

### 1. Repository Setup ✅ COMPLETE
- [x] Set up monorepo structure (`backend/`, `frontend/`, `infra/`, `docs/`)
- [x] Configure npm workspaces
- [x] Add README with setup instructions
- [ ] Initialize Git repository and push to GitHub

### 2. Backend (Strapi) Bootstrap
- [ ] Initialize Strapi in `backend/`
- [ ] Configure PostgreSQL connection
- [ ] Set up environment variables
- [ ] Create initial content types

### 3. Frontend (Next.js) Bootstrap
- [ ] Initialize Next.js with TypeScript in `frontend/`
- [ ] Configure Tailwind CSS with design tokens
- [ ] Set up ESLint and Prettier
- [ ] Create basic layout structure

## Active Decisions

### Pending Decisions
1. **Workspace tooling:** pnpm vs npm workspaces
2. **Strapi uploads:** S3 provider vs Render disk
3. **Navigation model:** Strapi menu plugin vs custom Navigation single type

### Made Decisions
- Using Next.js App Router (not Pages Router)
- Using TypeScript across frontend
- Using Tailwind CSS for styling
- Deploying to Render (all services)
- **CRM: Attio** – Lead capture will integrate with Attio via direct API calls from Next.js

## Future Integration: Attio CRM

**Planned for end of project.** Lead capture from the contact form will flow into Attio CRM.

### Implementation Pattern (Option A - Direct API)
1. Contact form submits to Next.js API route
2. API route validates input
3. Optionally creates a "Lead" record in Strapi for internal tracking
4. Calls Attio REST API to:
   - **Upsert Person** (by email)
   - **Upsert Company** (by domain extracted from email)
   - Optionally **create Deal** and link to Person + Company

### Technical Notes
- Authenticate using Attio API key with scoped permissions
- API key stored as environment variable (`ATTIO_API_KEY`)
- No embedded form builder needed – use native Next.js form handling
- Attio Docs: https://developers.attio.com/

## Important Patterns & Preferences

### From Implementation Guide
- All content must come from Strapi CMS (no hard-coded content)
- Server components preferred for data fetching
- Centralized API client in `lib/strapiClient.ts`
- Design system components in organized directories (`ui/`, `layout/`, `content/`, `charts/`)

### Accessibility First
- Skip link required
- Focus states on all interactive elements
- Semantic HTML throughout
- ARIA labels where needed

### Code Quality
- TypeScript strict mode
- ESLint + Prettier enforced
- Test coverage for key components

## Current Blockers
None yet – project is in planning/setup phase.

## Notes & Learnings
- Implementation guide provides comprehensive developer checklist in Section 15
- Phase 1–4 documents contain detailed design specifications (need to reference for design tokens)
- Content model is well-defined with clear relations between types
