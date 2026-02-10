# Code Quality Review Team

An adversarial review team focused on code quality, performance, and implementation fidelity. This team ensures the codebase is production-grade, maintainable, and faithfully implements the design.

## Team Composition

| Role | Agent | Perspective |
|------|-------|-------------|
| **Creator** | Implementing engineer (Next.js, React, D3, or Anime.js) | Produces the code |
| **Red Team: Architecture Critic** | React Architect | Challenges component design and patterns |
| **Red Team: Type Safety Critic** | TypeScript Engineer | Challenges type correctness and safety |
| **Red Team: Design Fidelity Critic** | Visual Designer | Challenges implementation accuracy vs design |
| **Judge** | Human stakeholder (or coordinator) | Makes final call on tradeoffs |

## Protocol

### Round 1: Implementation Submission

The **Creator** submits code with context:

```markdown
## Implementation Submission

### Component/Feature: [name]
### Approach: [brief description of technical decisions]
### Key Decisions:
1. [Decision + rationale] (e.g., "Server Component because data is fetched at page level")
2. [Decision + rationale] (e.g., "Used D3 for math, React for DOM rendering")

### Files:
- [file path]: [purpose]
- [file path]: [purpose]

### Known Tradeoffs:
1. [Tradeoff + reasoning]
```

### Round 2: Adversarial Review

Each Red Team member reviews from their perspective:

**Architecture Critic** evaluates:
- Component size and decomposition (< 150 lines per component?)
- State management (proper location? minimal lifting?)
- Props API design (composable? extensible? typed?)
- Hook patterns (custom hooks for reusable logic? proper deps/cleanup?)
- Server/client boundary placement
- Error handling and edge cases

**Type Safety Critic** evaluates:
- No `any` types, `as` assertions, or `!` non-null assertions without justification
- Discriminated unions for state machines
- Proper typing at API boundaries
- Generic components preserve type inference
- Strict config compliance

**Design Fidelity Critic** evaluates:
- Spacing matches the design system (tokens, not magic numbers)
- Colors from the defined palette only
- Typography follows the type scale
- Responsive behavior matches design intent
- Interactive states (hover, focus, active) implemented correctly
- Animation timing and easing match specifications

### Critique Format

```markdown
## Code Review: [Agent Name]

### Bugs / Correctness Issues
1. **[File:Line]**: [Issue]. This will cause [consequence].
   → Fix: [specific code suggestion]

### Architecture Issues
1. **[File]**: [Pattern problem]. Violates [principle].
   → Refactor: [specific suggestion]

### Style / Maintainability
1. **[File:Line]**: [Concern]. Future impact: [explanation].
   → Improve: [suggestion]

### Design Fidelity Issues (Visual Designer only)
1. **[Component]**: [Discrepancy from design]. Should be [specification].
   → Fix: [specific CSS/Tailwind change]

### What's Done Well
1. **[File/Pattern]**: [Positive observation]
```

### Round 3: Resolution

The Creator addresses each issue:

```markdown
## Resolution

### Fixed
1. [Issue] — Fixed in [commit/change description]

### Acknowledged (will fix in follow-up)
1. [Issue] — Valid but out of scope. Created TODO at [file:line]

### Disputed
1. [Issue] — Disagree because [technical reasoning]. [Alternative considered].
```

### Round 4: Verification

Critics verify fixes and check for regressions. Each provides:

```markdown
## Verification: [Agent Name]

**Status**: ✅ Approved / ⚠️ Approved with TODOs / ❌ Needs revision

**Verified fixes**: [list]
**Regressions found**: [list or "none"]
**Remaining concerns**: [list or "none"]
```

## Quality Gates

Code must pass ALL of these to be approved:

### Non-Negotiable (blocking)
- [ ] TypeScript compiles with zero errors under strict mode
- [ ] No `any` types without explicit justification comment
- [ ] All components have proper error boundaries
- [ ] Loading states exist for async data
- [ ] `prefers-reduced-motion` respected in animations
- [ ] Images use `next/image`
- [ ] Fonts use `next/font`

### High Priority (should fix before merge)
- [ ] Components under 150 lines
- [ ] Custom hooks extract reusable logic
- [ ] Design tokens used (no hardcoded colors, spacing, or font sizes)
- [ ] Responsive behavior verified at all breakpoints
- [ ] Keyboard navigation works
- [ ] Proper cleanup in useEffect

### Nice to Have (can be follow-up)
- [ ] Unit tests for utility functions
- [ ] Storybook stories for components
- [ ] Performance profiling for heavy components
- [ ] JSDoc on exported interfaces

## Iteration Limits

- **Maximum rounds**: 2 (code either passes or the pattern needs rethinking)
- **Escalation**: If the same issue recurs, it's a skill/understanding gap — pair on it rather than iterate

## When to Escalate to Human

- Performance requirement conflicts with design intent
- Accessibility requirement conflicts with interaction design
- Technical debt tradeoff needs product decision
- Third-party library limitation blocks implementation
