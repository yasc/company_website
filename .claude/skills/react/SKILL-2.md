---
name: react
description: Build robust, performant React applications using modern patterns. Use this skill when creating components, managing state, handling side effects, composing UI hierarchies, or architecting React applications. Covers hooks, composition patterns, performance optimization, error handling, and testing strategies.
---

# React

This skill covers modern React development (React 18+/19+) with functional components, hooks, and server component awareness. All patterns assume TypeScript unless otherwise noted.

## Component Design Principles

### Composition Over Configuration

Prefer composable components over prop-heavy monoliths:

```tsx
// ❌ Prop explosion
<Card
  title="Revenue"
  subtitle="Q4 2025"
  icon={<TrendingUp />}
  footer={<Link href="/details">View</Link>}
  variant="highlighted"
  size="large"
/>

// ✅ Composable
<Card variant="highlighted" size="large">
  <Card.Header>
    <Card.Icon><TrendingUp /></Card.Icon>
    <Card.Title>Revenue</Card.Title>
    <Card.Subtitle>Q4 2025</Card.Subtitle>
  </Card.Header>
  <Card.Footer>
    <Link href="/details">View</Link>
  </Card.Footer>
</Card>
```

### Component Sizing Rules

- **< 50 lines**: Single file is fine
- **50–150 lines**: Consider extracting sub-components
- **> 150 lines**: Must break into multiple components or custom hooks
- **If a component has > 5 props**: Consider if it's doing too much

### File Organization

```
components/
├── ui/                    # Primitive, reusable atoms
│   ├── button.tsx
│   ├── input.tsx
│   └── card.tsx
├── features/              # Domain-specific, composed from ui/
│   ├── analytics-chart/
│   │   ├── index.tsx
│   │   ├── chart-tooltip.tsx
│   │   ├── chart-legend.tsx
│   │   └── use-chart-data.ts
│   └── case-study-card/
│       ├── index.tsx
│       └── types.ts
└── layout/                # Structural components
    ├── header.tsx
    ├── footer.tsx
    └── sidebar.tsx
```

## Hooks

### State Management

```tsx
// Simple state
const [count, setCount] = useState(0);

// Object state — always spread to avoid partial updates
const [form, setForm] = useState({ name: '', email: '' });
const updateField = (field: string, value: string) =>
  setForm(prev => ({ ...prev, [field]: value }));

// Complex state — useReducer for multi-field or conditional logic
type Action =
  | { type: 'SET_LOADING' }
  | { type: 'SET_DATA'; payload: Data }
  | { type: 'SET_ERROR'; payload: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_LOADING': return { ...state, loading: true, error: null };
    case 'SET_DATA':    return { loading: false, data: action.payload, error: null };
    case 'SET_ERROR':   return { loading: false, data: null, error: action.payload };
  }
}
```

### Side Effects

```tsx
// Data fetching / subscriptions
useEffect(() => {
  const controller = new AbortController();

  async function fetchData() {
    try {
      const res = await fetch(url, { signal: controller.signal });
      const data = await res.json();
      setData(data);
    } catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') return;
      setError(e);
    }
  }

  fetchData();
  return () => controller.abort(); // cleanup
}, [url]); // dependencies

// DOM measurement / sync (runs before paint)
useLayoutEffect(() => {
  const rect = ref.current?.getBoundingClientRect();
  setDimensions(rect);
}, []);
```

### Custom Hooks

Extract reusable logic into custom hooks:

```tsx
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
```

### Refs

```tsx
// DOM access
const inputRef = useRef<HTMLInputElement>(null);
const focusInput = () => inputRef.current?.focus();

// Mutable value that doesn't trigger re-render
const renderCount = useRef(0);
useEffect(() => { renderCount.current += 1; });

// Forwarding refs for component libraries
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => (
    <button ref={ref} {...props}>{children}</button>
  )
);
```

## Performance Optimization

### Memoization (use sparingly)

```tsx
// Memoize expensive computations
const sortedData = useMemo(
  () => data.sort((a, b) => a.value - b.value),
  [data]
);

// Memoize callbacks passed to optimized children
const handleClick = useCallback((id: string) => {
  setSelected(id);
}, []);

// Memoize components that receive stable props
const ExpensiveChart = memo(function ExpensiveChart({ data }: { data: Point[] }) {
  // ... heavy rendering
});
```

**When to memoize:**
- Child components wrapped in `memo` receive the value as a prop
- The computation is genuinely expensive (> 1ms)
- The value is a dependency of another hook

**When NOT to memoize:**
- Primitive values (strings, numbers, booleans)
- Components that re-render anyway due to context or parent
- "Just in case" — measure first

### Virtualization

For long lists (> 100 items), use virtualization:

```tsx
// With @tanstack/react-virtual
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualList({ items }: { items: Item[] }) {
  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
  });

  return (
    <div ref={parentRef} style={{ height: 400, overflow: 'auto' }}>
      <div style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: virtualItem.start,
              height: virtualItem.size,
            }}
          >
            {items[virtualItem.index].name}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Code Splitting

```tsx
import { lazy, Suspense } from 'react';

const HeavyChart = lazy(() => import('./heavy-chart'));

function Dashboard() {
  return (
    <Suspense fallback={<Skeleton />}>
      <HeavyChart />
    </Suspense>
  );
}
```

## Patterns

### Render Props & Children as Function

```tsx
function DataProvider<T>({
  url,
  children,
}: {
  url: string;
  children: (data: T | null, loading: boolean) => React.ReactNode;
}) {
  const { data, loading } = useFetch<T>(url);
  return <>{children(data, loading)}</>;
}

// Usage
<DataProvider<User[]> url="/api/users">
  {(users, loading) =>
    loading ? <Spinner /> : <UserList users={users!} />
  }
</DataProvider>
```

### Controlled vs Uncontrolled Components

```tsx
// Controlled — parent owns state
function ControlledInput({ value, onChange }: Props) {
  return <input value={value} onChange={e => onChange(e.target.value)} />;
}

// Uncontrolled — component owns state, reports via callback
function UncontrolledInput({ defaultValue, onCommit }: Props) {
  const [value, setValue] = useState(defaultValue);
  return (
    <input
      value={value}
      onChange={e => setValue(e.target.value)}
      onBlur={() => onCommit(value)}
    />
  );
}
```

### Context for Cross-Cutting Concerns

```tsx
// Theme, auth, locale — NOT for frequently-changing data
const ThemeContext = createContext<Theme>('light');

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
```

**Context performance rule:** Split read and write contexts if consumers only need one or the other.

## Error Handling

### Error Boundaries

```tsx
'use client';

import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback: ReactNode | ((error: Error, reset: () => void) => ReactNode);
}

interface State { error: Error | null }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  reset = () => this.setState({ error: null });

  render() {
    if (this.state.error) {
      const { fallback } = this.props;
      return typeof fallback === 'function'
        ? fallback(this.state.error, this.reset)
        : fallback;
    }
    return this.props.children;
  }
}
```

## Accessibility Essentials

- Use semantic HTML (`<button>`, `<nav>`, `<main>`, `<article>`) over generic `<div>`
- All interactive elements must be keyboard-accessible
- Images need descriptive `alt` text (or `alt=""` for decorative)
- Use `aria-label`, `aria-describedby`, `role` only when semantic HTML is insufficient
- Focus management: trap focus in modals, restore focus on close
- Color contrast: minimum 4.5:1 for text, 3:1 for large text

## Common Pitfalls

1. **Don't use `useEffect` for derived state** — compute it during render with `useMemo` or inline
2. **Don't set state during render** — causes infinite loops
3. **Don't forget cleanup** in `useEffect` (timers, subscriptions, abort controllers)
4. **Don't use array index as key** when items can reorder
5. **Don't prop-drill more than 2-3 levels** — use Context or composition
6. **Don't put business logic in components** — extract to hooks or utility functions

## When to Ask for More Docs

Request additional documentation for:
- Server Components and React 19 `use()` patterns
- Concurrent features (useTransition, useDeferredValue)
- React Query / TanStack Query integration
- Form handling with react-hook-form or Conform
- Testing with React Testing Library
- Animation libraries (Framer Motion, anime.js integration)
