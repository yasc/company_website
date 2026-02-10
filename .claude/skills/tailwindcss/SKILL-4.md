---
name: tailwindcss
description: Style web applications using Tailwind CSS utility classes. Use this skill when writing utility classes, configuring themes, creating responsive layouts, building component variants, implementing dark mode, or optimizing CSS output. Covers Tailwind v3/v4 configuration, responsive design, custom themes, animation utilities, and patterns for design systems.
---

# Tailwind CSS

This skill covers Tailwind CSS for building professional, maintainable design systems. Emphasis on utility-first methodology, custom theming, responsive patterns, and avoiding common anti-patterns.

## Core Philosophy

Tailwind is a utility-first CSS framework. Instead of writing custom CSS, you compose designs using small, single-purpose utility classes directly in your markup.

**Key principle:** Every design decision should be expressible through Tailwind's constraint-based system (spacing scale, color palette, type scale). Escape hatches like arbitrary values (`[32px]`) should be rare.

## Configuration

### tailwind.config.ts (v3)

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // or 'media'
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc8fb',
          400: '#36aaf5',
          500: '#0c8ee6',
          600: '#0070c4',
          700: '#01599f',
          800: '#064c83',
          900: '#0b406d',
          950: '#072849',
        },
        surface: {
          DEFAULT: '#ffffff',
          secondary: '#f8fafc',
          tertiary: '#f1f5f9',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.4s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
};

export default config;
```

### CSS Variables Integration

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-background: 0 0% 100%;
    --color-foreground: 222 47% 11%;
    --color-primary: 210 100% 45%;
    --color-muted: 210 40% 96%;
    --radius: 0.5rem;
  }

  .dark {
    --color-background: 222 47% 5%;
    --color-foreground: 210 40% 98%;
    --color-primary: 210 100% 55%;
    --color-muted: 215 25% 15%;
  }
}
```

## Layout Patterns

### Responsive Grid

```html
<!-- Responsive card grid: 1 col → 2 col → 3 col -->
<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
  <div class="rounded-lg border p-6">...</div>
  <div class="rounded-lg border p-6">...</div>
  <div class="rounded-lg border p-6">...</div>
</div>

<!-- Auto-fit grid (cards fill available space) -->
<div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
  ...
</div>
```

### Container & Max-Width

```html
<!-- Centered content container -->
<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  <!-- Full-width hero within constrained container -->
  <section class="py-24 lg:py-32">
    <h1 class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
      ...
    </h1>
  </section>
</div>
```

### Sticky Header

```html
<header class="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-lg">
  <nav class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
    ...
  </nav>
</header>
```

### Flexbox Patterns

```html
<!-- Space between with centered items -->
<div class="flex items-center justify-between">...</div>

<!-- Centered content (horizontal + vertical) -->
<div class="flex min-h-screen items-center justify-center">...</div>

<!-- Stack with gap -->
<div class="flex flex-col gap-4">...</div>

<!-- Inline items with wrap -->
<div class="flex flex-wrap gap-2">...</div>
```

## Component Patterns

### Button Variants (with clsx/tailwind-merge)

```tsx
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles
        'inline-flex items-center justify-center rounded-md font-medium',
        'transition-colors focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        // Variant
        {
          'bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800':
            variant === 'primary',
          'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50':
            variant === 'secondary',
          'text-gray-600 hover:bg-gray-100 hover:text-gray-900':
            variant === 'ghost',
          'bg-red-600 text-white hover:bg-red-700':
            variant === 'destructive',
        },
        // Size
        {
          'h-8 px-3 text-sm': size === 'sm',
          'h-10 px-4 text-sm': size === 'md',
          'h-12 px-6 text-base': size === 'lg',
        },
        className
      )}
      {...props}
    />
  );
}
```

### The `cn()` Utility

```ts
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

This merges Tailwind classes intelligently — `cn('px-4', 'px-6')` → `'px-6'` (last wins).

## Responsive Design

### Breakpoint Reference

| Prefix | Min-Width | Typical Target |
|--------|-----------|---------------|
| `sm:` | 640px | Large phones, landscape |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Laptops |
| `xl:` | 1280px | Desktops |
| `2xl:` | 1536px | Large displays |

**Mobile-first:** Unprefixed classes apply to all sizes. Add prefixed classes to override at larger breakpoints.

```html
<!-- Mobile: stack, Tablet: 2-col, Desktop: 3-col with sidebar -->
<div class="flex flex-col gap-6 md:flex-row">
  <aside class="md:w-64 lg:w-72">Sidebar</aside>
  <main class="flex-1">Content</main>
</div>
```

### Container Queries

```html
<!-- Parent defines the container -->
<div class="@container">
  <!-- Children respond to parent width -->
  <div class="flex flex-col @md:flex-row @lg:gap-8">
    ...
  </div>
</div>
```

## Typography

### Prose Styling (for CMS/blog content)

```html
<article class="prose prose-lg prose-gray max-w-none
  prose-headings:font-display prose-headings:tracking-tight
  prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline
  prose-img:rounded-xl prose-img:shadow-lg">
  {/* Rendered markdown/HTML content */}
</article>
```

### Custom Type Scale

```html
<!-- Hero headline -->
<h1 class="text-4xl font-bold leading-tight tracking-tight
  sm:text-5xl lg:text-6xl xl:text-7xl">
  Data-Driven Insights
</h1>

<!-- Subtitle -->
<p class="mt-4 text-lg text-gray-600 sm:text-xl lg:text-2xl">
  Transforming complexity into clarity.
</p>
```

## Dark Mode

```html
<!-- Toggle class on <html> element -->
<div class="bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
  <div class="border border-gray-200 dark:border-gray-800">
    <h2 class="text-gray-900 dark:text-white">...</h2>
    <p class="text-gray-600 dark:text-gray-400">...</p>
  </div>
</div>
```

## Animation & Transitions

### Transition Utilities

```html
<!-- Smooth hover transition -->
<a class="text-gray-600 transition-colors duration-200 hover:text-brand-600">
  Link
</a>

<!-- Scale on hover -->
<div class="transition-transform duration-300 hover:scale-105">
  Card
</div>

<!-- Combined transitions -->
<button class="transform transition-all duration-200
  hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-md">
  Button
</button>
```

### Scroll-Triggered Animations (with Intersection Observer)

```tsx
// Use with custom animation classes defined in tailwind.config.ts
<div className="opacity-0 animate-fade-in [animation-delay:200ms]">
  Fades in
</div>
```

## Performance

1. **Purge unused CSS** — Tailwind does this automatically via `content` config
2. **Avoid arbitrary values** — use the design token scale (`p-4` not `p-[17px]`)
3. **Use `@apply` sparingly** — only for highly-repeated patterns like base typography
4. **Prefer `cn()` over string concatenation** — avoids class conflicts

## Common Pitfalls

1. **Don't nest utility classes in CSS** — compose in markup
2. **Don't use `@apply` for component variants** — use the component pattern with `cn()`
3. **Don't forget `content` paths** — missing paths = missing styles in production
4. **Don't mix Tailwind with external CSS libraries** — specificity conflicts
5. **Don't use `!important` modifiers** — fix the specificity issue instead
6. **Don't forget `sr-only`** for accessible hidden labels

## When to Ask for More Docs

Request additional documentation for:
- Tailwind v4 CSS-first configuration (alpha/beta features)
- Custom plugin development
- Complex animation sequences (prefer anime.js skill)
- Tailwind + CSS Modules coexistence
- Print stylesheet utilities
