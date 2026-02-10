---
name: animejs
description: Create smooth, performant web animations using Anime.js. Use this skill when building scroll-triggered animations, page transitions, micro-interactions, staggered reveals, text animations, or any motion design for web interfaces. Covers Anime.js v4 API, React integration with createScope, timelines, spring physics, and accessible motion patterns.
---

# Anime.js

This skill covers Anime.js v4 for building subtle, professional micro-interactions and scroll-triggered animations. Focus is on performance, accessibility, and integration with React/Next.js projects.

## Installation & Setup

### NPM (Recommended for bundled projects)

```bash
npm install animejs
```

### Import Patterns

```ts
// Main module (tree-shakeable with bundler)
import { animate, stagger, createTimeline, createScope, spring } from 'animejs';

// Subpath imports (no bundler / manual tree-shaking)
import { animate } from 'animejs/animation';
import { createTimeline } from 'animejs/timeline';
import { createScope } from 'animejs/scope';
import { createDraggable } from 'animejs/draggable';
import { splitText } from 'animejs/text';
import { stagger, random } from 'animejs/utils';
import * as easings from 'animejs/easings';
```

### CDN (for quick prototyping only)

```html
<!-- ES Modules -->
<script type="module">
  import { animate } from 'https://esm.sh/animejs';
</script>

<!-- UMD Global -->
<script src="https://cdn.jsdelivr.net/npm/animejs/dist/bundles/anime.umd.min.js"></script>
<script>
  const { animate } = anime;
</script>
```

## Core API

### animate()

The primary function. Animates CSS properties, transforms, SVG attributes, or JS object properties.

```ts
// Basic animation
animate('.element', {
  translateX: 250,
  opacity: [0, 1],         // from → to
  duration: 800,
  ease: 'outExpo',
});

// With keyframes (multi-step)
animate('.element', {
  translateY: [
    { to: -20, duration: 300, ease: 'outQuad' },
    { to: 0, duration: 500, ease: spring({ bounce: 0.5 }) },
  ],
});

// Function-based values (per-element)
animate('.item', {
  translateX: (el, i) => i * 50,       // index-based offset
  opacity: () => random(0.5, 1, 2),    // random per element
  delay: stagger(100),                  // staggered delay
  duration: 600,
});
```

### Stagger

Creates incremental delays or values across multiple targets:

```ts
// Linear stagger (100ms between each)
animate('.card', {
  opacity: [0, 1],
  translateY: [30, 0],
  delay: stagger(100),
});

// Stagger from center
animate('.grid-item', {
  scale: [0.8, 1],
  delay: stagger(50, { from: 'center' }),
});

// Stagger with range
animate('.bar', {
  scaleY: [0, 1],
  delay: stagger([0, 500]),   // spread 0–500ms across all elements
});
```

### Timelines

Sequence and orchestrate multiple animations:

```ts
const tl = createTimeline({
  defaults: { duration: 600, ease: 'outExpo' },
});

tl.add('.hero-title', {
  opacity: [0, 1],
  translateY: [40, 0],
})
.add('.hero-subtitle', {
  opacity: [0, 1],
  translateY: [30, 0],
}, '-=400')                    // overlap by 400ms
.add('.hero-cta', {
  opacity: [0, 1],
  scale: [0.9, 1],
}, '-=300');
```

### Spring Physics

```ts
import { spring } from 'animejs';

animate('.element', {
  translateX: 200,
  ease: spring({
    mass: 1,          // default 1
    stiffness: 100,   // default 100
    damping: 10,      // default 10
    velocity: 0,      // default 0
    bounce: 0.5,      // shorthand (0 = no bounce, 1 = max bounce)
  }),
});
```

### Easing Reference

```ts
// Built-in easings (use string names)
'linear'
'inQuad'    'outQuad'    'inOutQuad'
'inCubic'   'outCubic'   'inOutCubic'
'inExpo'    'outExpo'    'inOutExpo'
'inCirc'    'outCirc'    'inOutCirc'
'inBack'    'outBack'    'inOutBack'
'inElastic' 'outElastic' 'inOutElastic'
'inBounce'  'outBounce'  'inOutBounce'

// Parametric
'inOut(3)'   // custom power easing
spring({ bounce: 0.7 })  // spring physics
```

### Text Animation

```ts
import { splitText } from 'animejs/text';

const split = splitText('.hero-heading');

// Animate individual characters
animate(split.chars, {
  opacity: [0, 1],
  translateY: [20, 0],
  delay: stagger(30),
  ease: 'outExpo',
});

// Animate words
animate(split.words, {
  opacity: [0, 1],
  translateX: [-10, 0],
  delay: stagger(80),
});
```

## React Integration

### createScope Pattern (Required for React)

Anime.js must be scoped within React's lifecycle to avoid memory leaks and stale references:

```tsx
import { animate, createScope, spring, stagger } from 'animejs';
import { useEffect, useRef } from 'react';

function AnimatedSection({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const scope = useRef<ReturnType<typeof createScope> | null>(null);

  useEffect(() => {
    scope.current = createScope({ root }).add((self) => {
      // All anime.js instances here are scoped to <div ref={root}>

      // Staggered fade-in for child elements
      animate('.animate-in', {
        opacity: [0, 1],
        translateY: [20, 0],
        delay: stagger(100),
        duration: 600,
        ease: 'outExpo',
      });

      // Register methods callable from outside useEffect
      self.add('reveal', (selector: string) => {
        animate(selector, {
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 800,
          ease: 'outExpo',
        });
      });
    });

    return () => scope.current?.revert(); // cleanup all animations
  }, []);

  return <div ref={root}>{children}</div>;
}
```

### Scroll-Triggered Animations (Intersection Observer + Anime.js)

```tsx
function useScrollReveal(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animate(element, {
            opacity: [0, 1],
            translateY: [40, 0],
            duration: 800,
            ease: 'outExpo',
          });
          observer.disconnect();
        }
      },
      { threshold: 0.15, ...options }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return ref;
}

// Usage
function CaseStudyCard({ study }: Props) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} style={{ opacity: 0 }}>
      <h3>{study.title}</h3>
      <p>{study.excerpt}</p>
    </div>
  );
}
```

### Staggered Grid Reveal

```tsx
function StaggeredGrid({ items }: { items: Item[] }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = createScope({ root }).add(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            animate('.grid-card', {
              opacity: [0, 1],
              translateY: [30, 0],
              scale: [0.95, 1],
              delay: stagger(80, { from: 'first' }),
              duration: 700,
              ease: 'outExpo',
            });
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      if (root.current) observer.observe(root.current);
    });

    return () => scope.revert();
  }, []);

  return (
    <div ref={root} className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {items.map((item) => (
        <div key={item.id} className="grid-card" style={{ opacity: 0 }}>
          {item.content}
        </div>
      ))}
    </div>
  );
}
```

## Professional Animation Patterns

### Page Load Hero Sequence

```tsx
useEffect(() => {
  const scope = createScope({ root }).add(() => {
    const tl = createTimeline({
      defaults: { duration: 800, ease: 'outExpo' },
    });

    tl.add('.hero-badge', {
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 500,
    })
    .add('.hero-heading', {
      opacity: [0, 1],
      translateY: [30, 0],
    }, '-=400')
    .add('.hero-description', {
      opacity: [0, 1],
      translateY: [20, 0],
    }, '-=500')
    .add('.hero-cta', {
      opacity: [0, 1],
      translateY: [15, 0],
      scale: [0.95, 1],
    }, '-=400')
    .add('.hero-visual', {
      opacity: [0, 1],
      scale: [0.9, 1],
    }, '-=600');
  });

  return () => scope.revert();
}, []);
```

### Hover Micro-Interaction

```tsx
function AnimatedCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    animate(cardRef.current!, {
      translateY: -4,
      boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
      duration: 300,
      ease: 'outExpo',
    });
  };

  const handleMouseLeave = () => {
    animate(cardRef.current!, {
      translateY: 0,
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      duration: 400,
      ease: spring({ bounce: 0.3 }),
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
```

### Number Counter (Data Visualization)

```tsx
function AnimatedCounter({ value, prefix = '', suffix = '' }: Props) {
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obj = { count: 0 };
    animate(obj, {
      count: value,
      duration: 2000,
      ease: 'outExpo',
      update: () => {
        if (countRef.current) {
          countRef.current.textContent =
            `${prefix}${Math.round(obj.count).toLocaleString()}${suffix}`;
        }
      },
    });
  }, [value]);

  return <span ref={countRef}>{prefix}0{suffix}</span>;
}
```

## Accessibility

### Respect prefers-reduced-motion

Always check the user's motion preference:

```tsx
function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return reduced;
}

// In animation code:
const reducedMotion = useReducedMotion();

animate('.element', {
  opacity: [0, 1],
  translateY: reducedMotion ? 0 : [30, 0],  // skip movement
  duration: reducedMotion ? 0 : 800,         // instant if reduced
});
```

### Animation wrapper with motion preference

```tsx
function useAnimateOnScroll(animationProps: Record<string, any>) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current) return;

    if (reducedMotion) {
      // Just show immediately
      ref.current.style.opacity = '1';
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(ref.current!, {
            opacity: [0, 1],
            duration: 600,
            ease: 'outExpo',
            ...animationProps,
          });
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return ref;
}
```

## Performance Guidelines

1. **Animate only `transform` and `opacity`** — these are GPU-composited and don't trigger layout
2. **Avoid animating `width`, `height`, `top`, `left`** — causes layout thrashing
3. **Use `will-change: transform` sparingly** — only on elements about to animate
4. **Clean up with `scope.revert()`** — prevents memory leaks in React
5. **Disconnect IntersectionObservers** — stop observing once animation fires
6. **Batch animations with timelines** — more efficient than independent `animate()` calls
7. **Limit simultaneous animations** — aim for 3-5 concurrent animations max on page load

## Common Pitfalls

1. **Don't forget `createScope` in React** — without it, animations leak across re-renders
2. **Don't set initial styles in CSS and anime.js** — use `style={{ opacity: 0 }}` for pre-animation state
3. **Don't animate layout properties** — stick to transforms and opacity
4. **Don't ignore reduced-motion** — always respect `prefers-reduced-motion`
5. **Don't over-animate** — professional sites use 2-3 animation patterns consistently, not dozens
6. **Don't forget cleanup** — always `return () => scope.revert()` in `useEffect`

## When to Ask for More Docs

Request additional documentation for:
- SVG path morphing and drawing animations
- createDraggable for drag interactions
- createLayout for FLIP animations
- Complex timeline orchestration with labels
- WAAPI (Web Animations API) bridge
- Engine-level control (pause, seek, playback rate)
