---
name: typescript
description: Write robust, type-safe TypeScript for web applications. Use this skill when defining types, interfaces, generics, utility types, or when debugging type errors. Covers strict configuration, advanced type patterns, generic constraints, discriminated unions, and TypeScript-specific patterns for React and Next.js.
---

# TypeScript

This skill covers TypeScript best practices for production web applications, with emphasis on strict type safety, maintainable type definitions, and patterns common in React/Next.js codebases.

## Configuration

### Strict tsconfig.json

Always enable strict mode. A recommended base for Next.js projects:

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "module": "esnext",
    "moduleResolution": "bundler",
    "jsx": "preserve",
    "incremental": true,
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "paths": {
      "@/*": ["./src/*"]
    },
    "plugins": [{ "name": "next" }]
  }
}
```

**Critical flags:**
- `strict: true` — enables all strict checks (non-negotiable)
- `noUncheckedIndexedAccess: true` — array/object access returns `T | undefined`
- `exactOptionalPropertyTypes: true` — `?:` means "may be absent", not "may be undefined"

## Type Design Principles

### 1. Prefer Interfaces for Object Shapes, Types for Unions/Utilities

```tsx
// Interface for object shapes (extendable, better error messages)
interface User {
  id: string;
  name: string;
  email: string;
}

// Type for unions, intersections, mapped types
type Status = 'active' | 'inactive' | 'suspended';
type UserWithRole = User & { role: Role };
type ReadonlyUser = Readonly<User>;
```

### 2. Discriminated Unions for State Machines

```tsx
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

function renderState<T>(state: AsyncState<T>) {
  switch (state.status) {
    case 'idle':    return <Placeholder />;
    case 'loading': return <Spinner />;
    case 'success': return <DataView data={state.data} />;  // data narrowed
    case 'error':   return <ErrorView error={state.error} />; // error narrowed
  }
}
```

### 3. Branded Types for Domain Safety

```tsx
type UserId = string & { readonly __brand: 'UserId' };
type PostId = string & { readonly __brand: 'PostId' };

function createUserId(id: string): UserId { return id as UserId; }
function createPostId(id: string): PostId { return id as PostId; }

function getUser(id: UserId): Promise<User> { /* ... */ }
function getPost(id: PostId): Promise<Post> { /* ... */ }

const userId = createUserId('usr_123');
const postId = createPostId('pst_456');

getUser(userId); // ✅
getUser(postId); // ❌ Type error — PostId is not assignable to UserId
```

### 4. Const Assertions for Literal Types

```tsx
// Routes as a const object
const ROUTES = {
  home: '/',
  about: '/about',
  blog: '/blog',
  contact: '/contact',
} as const;

type Route = typeof ROUTES[keyof typeof ROUTES];
// Type: '/' | '/about' | '/blog' | '/contact'
```

## Generics

### Constrained Generics

```tsx
// Ensure T has an id field
function findById<T extends { id: string }>(items: T[], id: string): T | undefined {
  return items.find(item => item.id === id);
}

// Generic with default
function createStore<T = Record<string, unknown>>(initial: T) {
  let state = initial;
  return {
    get: () => state,
    set: (next: T) => { state = next; },
  };
}
```

### Generic React Components

```tsx
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, i) => (
        <li key={keyExtractor(item)}>{renderItem(item, i)}</li>
      ))}
    </ul>
  );
}

// Usage — T is inferred as User
<List
  items={users}
  renderItem={(user) => <span>{user.name}</span>}
  keyExtractor={(user) => user.id}
/>
```

## Utility Types Reference

| Type | Purpose | Example |
|------|---------|---------|
| `Partial<T>` | All props optional | `Partial<User>` — partial update |
| `Required<T>` | All props required | `Required<Config>` — fully specified |
| `Pick<T, K>` | Select specific props | `Pick<User, 'id' \| 'name'>` |
| `Omit<T, K>` | Remove specific props | `Omit<User, 'password'>` |
| `Record<K, V>` | Object with key type K, value type V | `Record<string, number>` |
| `Readonly<T>` | All props readonly | `Readonly<State>` |
| `ReturnType<F>` | Infer function return type | `ReturnType<typeof getUser>` |
| `Parameters<F>` | Infer function parameters | `Parameters<typeof fetch>` |
| `Awaited<T>` | Unwrap Promise type | `Awaited<Promise<User>>` → `User` |
| `Extract<T, U>` | Types in T assignable to U | `Extract<Status, 'active' \| 'inactive'>` |
| `Exclude<T, U>` | Types in T not assignable to U | `Exclude<Status, 'suspended'>` |
| `NonNullable<T>` | Remove null and undefined | `NonNullable<string \| null>` → `string` |

## Advanced Patterns

### Template Literal Types

```tsx
type EventName = `on${Capitalize<'click' | 'hover' | 'focus'>}`;
// 'onClick' | 'onHover' | 'onFocus'

type CSSProperty = `--${string}`;
// Any string starting with '--'
```

### Mapped Types

```tsx
// Make all properties optional and nullable
type Draft<T> = {
  [K in keyof T]?: T[K] | null;
};

// Create event handlers from a state shape
type Handlers<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

type UserHandlers = Handlers<{ name: string; age: number }>;
// { setName: (value: string) => void; setAge: (value: number) => void }
```

### Conditional Types

```tsx
type IsArray<T> = T extends readonly unknown[] ? true : false;

// Infer element type from array
type ElementOf<T> = T extends readonly (infer E)[] ? E : never;

type A = ElementOf<string[]>;  // string
type B = ElementOf<[1, 2, 3]>; // 1 | 2 | 3
```

### Type Guards

```tsx
// User-defined type guard
function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'email' in value
  );
}

// Assertion function
function assertNonNull<T>(value: T, message?: string): asserts value is NonNullable<T> {
  if (value == null) {
    throw new Error(message ?? 'Expected non-null value');
  }
}
```

## React + TypeScript Patterns

### Component Props

```tsx
// Basic props
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

// Extending HTML element props
interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  label: string;
  error?: string;
}

// Polymorphic "as" prop
interface BoxProps<C extends React.ElementType = 'div'> {
  as?: C;
  children: React.ReactNode;
}

type PolymorphicProps<C extends React.ElementType> =
  BoxProps<C> & Omit<React.ComponentPropsWithoutRef<C>, keyof BoxProps>;

function Box<C extends React.ElementType = 'div'>({
  as,
  children,
  ...props
}: PolymorphicProps<C>) {
  const Component = as || 'div';
  return <Component {...props}>{children}</Component>;
}
```

### Event Handlers

```tsx
// Typed event handlers
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // ...
};

const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') submit();
};
```

## Common Pitfalls

1. **Don't use `any`** — use `unknown` and narrow, or use generics
2. **Don't use `as` assertions** unless you've validated the shape (prefer type guards)
3. **Don't use `enum`** — use `as const` objects or union types instead
4. **Don't ignore `strict: true` errors** — fix them; they prevent real bugs
5. **Don't type everything as `string`** — use literal unions for finite sets
6. **Don't use `!` (non-null assertion)** casually — it silences real errors
7. **Don't create god types** — break large interfaces into composable pieces

## When to Ask for More Docs

Request additional documentation for:
- Zod / Valibot schema-driven type inference
- tRPC end-to-end type safety
- TypeScript compiler API or custom transformers
- Declaration files for untyped libraries
- Module augmentation and global type extensions
- TypeScript 5.x decorators
