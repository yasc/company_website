# Design Critique Team

An adversarial review team focused on visual design quality. This team ensures every visual element meets the standard of a premium professional services firm through structured critique and iteration.

## Team Composition

| Role | Agent | Perspective |
|------|-------|-------------|
| **Creator** | Visual Designer | Produces the design |
| **Red Team: Brand Critic** | Brand Strategist | Challenges brand alignment |
| **Red Team: Type Critic** | Typography Specialist | Challenges typographic quality |
| **Red Team: UX Critic** | UX Researcher | Challenges usability and accessibility |
| **Judge** | Human stakeholder (or coordinator) | Makes final call on disputed points |

## Protocol

### Round 1: Design Presentation

The **Visual Designer** presents the design with rationale:

```markdown
## Design Submission

### Component/Page: [name]
### Design Direction: [brief description of aesthetic choices]
### Key Decisions:
1. [Decision + rationale]
2. [Decision + rationale]
3. [Decision + rationale]

### Files: [links to design files or components]
```

### Round 2: Adversarial Critique

Each Red Team member independently reviews the design against their domain. Critiques must be:
- **Specific**: Point to exact elements, not vague feelings
- **Evidenced**: Reference principles, heuristics, or standards
- **Actionable**: Include a concrete suggestion for improvement
- **Prioritized**: Classify as Critical / Major / Minor

```markdown
## Critique: [Agent Name]

### Critical Issues (must fix)
1. **[Element]**: [Problem]. Violates [principle/standard].
   → Suggested fix: [specific recommendation]

### Major Issues (should fix)
1. **[Element]**: [Problem]. [Evidence/reasoning].
   → Suggested fix: [specific recommendation]

### Minor Issues (nice to fix)
1. **[Element]**: [Observation]. [Why it matters].
   → Suggested fix: [specific recommendation]

### Praise (what works well)
1. **[Element]**: [What's good and why]
```

**Critique Rules:**
- Each critic must identify at least 1 critical or major issue (if none exist, explicitly state "no critical or major issues found — design passes review")
- Each critic must also identify at least 1 thing that works well (balanced feedback)
- Critics may not agree with each other for the sake of consensus — honest independent assessment only
- Critics should challenge each other's critiques if they disagree

### Round 3: Creator Response

The **Visual Designer** responds to each critique:

```markdown
## Response to Critiques

### Accepted (will implement)
1. [Critique point] — Agreed. Will [specific change].

### Partially Accepted (will modify approach)
1. [Critique point] — Valid concern, but [alternative approach] because [reason].

### Rejected (with justification)
1. [Critique point] — Disagree because [evidence/reasoning]. [Design principle] supports current approach.

### Questions for Judge
1. [Disputed point that needs human decision]
```

### Round 4: Iteration

The Visual Designer implements accepted and partially-accepted changes. Modified design is reviewed for:
- Regression: Did fixes introduce new problems?
- Completeness: Were all accepted changes implemented?
- Coherence: Does the design still feel unified after changes?

### Round 5: Sign-Off

Each Red Team member provides final assessment:

```markdown
## Final Assessment: [Agent Name]

**Status**: ✅ Approved / ⚠️ Approved with reservations / ❌ Needs another round

**Remaining concerns** (if any):
1. [Concern + severity]

**Overall quality**: [1-10 score with brief justification]
```

**Approval threshold**: All critics must be ✅ or ⚠️. Any ❌ triggers another round.

## Scoring Rubric

| Dimension | 1-3 (Poor) | 4-6 (Adequate) | 7-8 (Good) | 9-10 (Exceptional) |
|-----------|-----------|----------------|------------|-------------------|
| Visual Hierarchy | Unclear focal points, flat layout | Some hierarchy but inconsistent | Clear hierarchy, good flow | Masterful composition, editorial quality |
| Brand Alignment | Off-brand, generic | Partially aligned, some drift | Consistent with brand system | Perfectly embodies brand identity |
| Typography | Poor readability, no system | Functional but unremarkable | Well-set with clear scale | Beautiful, distinctive, flawless |
| Color & Contrast | Inaccessible, random | Functional, WCAG-compliant | Strategic, brand-aligned | Sophisticated, memorable palette |
| Whitespace & Rhythm | Cramped or wasteful | Generally adequate | Intentional breathing room | Premium, editorial spacing |
| Responsiveness | Broken at breakpoints | Functions but redesigned | Deliberately designed per breakpoint | Seamless, optimized at every size |
| Distinctiveness | Template-like, generic | Some unique elements | Clearly differentiated | Unforgettable, category-defining |

## Iteration Limits

- **Maximum rounds**: 3 (if no consensus after 3, escalate to human)
- **Time budget per round**: Respect that perfection is the enemy of shipping
- **Diminishing returns**: If scoring > 7 across all dimensions, approve and move on

## When to Escalate to Human

- Red Team members fundamentally disagree on direction (not details)
- Brand direction is undefined or contradictory
- Technical constraints prevent the desired visual outcome
- Score stalls below 7 after 2 rounds of iteration
