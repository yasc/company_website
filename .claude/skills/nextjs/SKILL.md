---
name: nextjs
description: Build production-grade Next.js applications using the App Router. Use this skill when creating pages, layouts, route handlers, server components, middleware, data fetching patterns, or configuring Next.js projects. Covers App Router conventions, server vs client components, streaming, caching, and deployment optimization.
---

# Next.js (App Router)

This skill covers building production-grade Next.js applications using the App Router architecture (Next.js 14+). All guidance assumes the App Router unless explicitly stated otherwise.

## Core Architecture

### File-System Routing

Next.js App Router uses a file-system based router within the `app/` directory:

```
app/
├── layout.tsx          # Root layout (required)
├── page.tsx            # Home route (/)
├── loading.tsx         # Loading UI (Suspense boundary)
├── error.tsx           # Error boundary
├── not-found.tsx       # 404 page
├── global-error.tsx    # Root error boundary
├── (marketing)/        # Route group (no URL segment)
│   ├── about/page.tsx
│   └── contact/page.tsx
├── blog/
│   ├── page.tsx        # /blog
│   └── [slug]/
│       └── page.tsx    # /blog/:slug (dynamic segment)
├── api/
│   └── route.ts        # API route handler
└── [...catchAll]/
    └── page.tsx        # Catch-all route
```

**Key conventions:**
- `page.tsx` — makes a route publicly accessible
- `layout.tsx` — shared UI that preserves state across navigations
- `template.tsx` — like layout but re-mounts on navigation
- `loading.tsx` — instant loading UI via React Suspense
- `error.tsx` — error boundary (must be `'use client'`)
- `route.ts` — API endpoint (GET, POST, PUT, DELETE, PATCH)
- `default.tsx` — fallback for parallel routes

### Server Components vs Client Components

**Server Components** (default — no directive needed):
- Render on the server; zero JS shipped to client
- Can directly access databases, file systems, env secrets
- Cannot use hooks, browser APIs, or event handlers
- Ideal for: data fetching, static content, SEO-critical markup

**Client Components** (opt-in with `'use client'` at top of file):
- Render on client; hydrated with interactivity
- Can use hooks (`useState`, `useEffect`, etc.), event handlers, browser APIs
- Ideal for: interactive forms, animations, real-time updates, anything using `onClick`/`onChange`

**Decision framework:**
1. Start every component as a Server Component
2. Only add `'use client'` when you need interactivity or browser APIs
3. Push `'use client'` boundaries as far down the tree as possible
4. Server Components can import Client Components, but NOT vice versa
5. Pass Server Component data to Client Components via props (serializable only)

```tsx
// app/dashboard/page.tsx — Server Component (fetches data)
import { InteractiveChart } from './chart';

export default async function DashboardPage() {
  const data = await fetchAnalytics(); // direct server-side fetch
  return (
    <main>
      <h1>Dashboard</h1>
      <InteractiveChart data={data} /> {/* Client boundary only here */}
    </main>
  );
}
```

```tsx
// app/dashboard/chart.tsx — Client Component (handles interaction)
'use client';
import { useState } from 'react';

export function InteractiveChart({ data }: { data: AnalyticsData }) {
  const [filter, setFilter] = useState('all');
  // ... interactive chart logic
}
```

## Data Fetching

### Server-Side Fetching (Preferred)

Fetch data directly in Server Components using `async/await`:

```tsx
// Direct database access in Server Components
import { db } from '@/lib/db';

export default async function Page() {
  const posts = await db.post.findMany();
  return <PostList posts={posts} />;
}
```

### Caching & Revalidation

Next.js extends `fetch` with caching controls:

```tsx
// Cache indefinitely (default for static data)
const data = await fetch(url);

// Revalidate every 60 seconds (ISR)
const data = await fetch(url, { next: { revalidate: 60 } });

// No cache (always fresh)
const data = await fetch(url, { cache: 'no-store' });
```

**Route segment config** for non-fetch data sources:

```tsx
// Force dynamic rendering for the entire route
export const dynamic = 'force-dynamic';

// Revalidate all data in this route every N seconds
export const revalidate = 60;
```

### On-Demand Revalidation

```tsx
// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: Request) {
  revalidatePath('/blog');           // revalidate a path
  revalidateTag('blog-posts');       // revalidate by cache tag
  return Response.json({ revalidated: true });
}
```

### Server Actions

For mutations (forms, data writes), use Server Actions:

```tsx
// app/actions.ts
'use server';

import { revalidatePath } from 'next/cache';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  await db.post.create({ data: { title } });
  revalidatePath('/blog');
}
```

```tsx
// Used in a Server Component form
import { createPost } from './actions';

export default function NewPost() {
  return (
    <form action={createPost}>
      <input name="title" />
      <button type="submit">Create</button>
    </form>
  );
}
```

## Layouts & Metadata

### Nested Layouts

Layouts wrap child routes and persist across navigations:

```tsx
// app/layout.tsx — Root layout
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { default: 'My App', template: '%s | My App' },
  description: 'Professional web application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### Dynamic Metadata

```tsx
// app/blog/[slug]/page.tsx
import type { Metadata } from 'next';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { images: [post.coverImage] },
  };
}
```

### Static Generation with Dynamic Routes

```tsx
// Generate static params at build time
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
```

## Middleware

```tsx
// middleware.ts (root of project)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Auth check, redirects, headers, geolocation, etc.
  if (!request.cookies.get('session')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};
```

## Performance Patterns

### Image Optimization

```tsx
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority          // LCP image — preload
  placeholder="blur" // blur-up loading
/>
```

### Font Optimization

```tsx
// app/layout.tsx
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

### Streaming & Suspense

```tsx
import { Suspense } from 'react';

export default function Page() {
  return (
    <main>
      <h1>Dashboard</h1>
      <Suspense fallback={<ChartSkeleton />}>
        <SlowChart />  {/* Streams in when ready */}
      </Suspense>
    </main>
  );
}
```

### Parallel Data Fetching

```tsx
export default async function Page() {
  // Fire all fetches simultaneously
  const [posts, analytics, user] = await Promise.all([
    getPosts(),
    getAnalytics(),
    getUser(),
  ]);
  // ...
}
```

## Project Configuration

### next.config.ts

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.example.com' },
    ],
  },
  experimental: {
    typedRoutes: true,  // type-safe links
  },
};

export default nextConfig;
```

### Environment Variables

- `.env.local` — local development (gitignored)
- `.env` — all environments
- `NEXT_PUBLIC_*` prefix — exposed to browser
- Non-prefixed — server-only (never leaked to client)

## Common Pitfalls

1. **Don't use `'use client'` on pages** — push client boundaries to leaf components
2. **Don't fetch in Client Components if avoidable** — fetch in Server Components and pass data down
3. **Don't put secrets in `NEXT_PUBLIC_*` variables** — they're exposed to the browser
4. **Don't import Server Components into Client Components** — pass them as `children` props instead
5. **Don't forget `loading.tsx`** — users see blank screens without it
6. **Don't use `useEffect` for data fetching** — use Server Components or React Query
7. **Always handle the `params` and `searchParams` promises** — in Next.js 15+ these are async

## When to Ask for More Docs

If you encounter any of the following, request additional documentation:
- Parallel routes or intercepting routes (`@modal`, `(.)photo`)
- Internationalization (i18n) with App Router
- Edge runtime configuration
- Advanced caching strategies (cache tags, router cache)
- Auth patterns (middleware + server actions)
- Deployment to specific platforms (Vercel, AWS, Docker)
