# UX Audit Team

An adversarial review team focused on user experience quality. This team evaluates the complete user journey — from first impression to conversion — ensuring the website works for real users, not just in design files.

## Team Composition

| Role | Agent | Perspective |
|------|-------|-------------|
| **Creator** | Visual Designer + Interaction Designer | Present the designed experience |
| **Red Team: Usability Critic** | UX Researcher | Challenges usability, accessibility, cognitive load |
| **Red Team: Content Critic** | Content Strategist | Challenges messaging clarity and content hierarchy |
| **Red Team: Motion Critic** | Anime.js Motion Engineer | Challenges animation impact on UX |
| **Judge** | Human stakeholder (or coordinator) | Makes final call on UX tradeoffs |

## Protocol

### Round 1: Experience Walkthrough

The **Creators** present the experience as a user journey:

```markdown
## Experience Submission

### Page/Flow: [name]
### Target Persona: [Decision-Maker / Researcher / Talent]
### User Journey:
1. **Entry**: [How user arrives — direct, search, referral]
2. **First 5 seconds**: [What they see and understand]
3. **Primary path**: [Step-by-step through the intended flow]
4. **Conversion point**: [Where/how they take action]
5. **Exit/Next**: [What happens after conversion]

### Key Design Decisions:
1. [Decision + UX rationale]
2. [Decision + UX rationale]
```

### Round 2: Adversarial UX Critique

**Usability Critic** performs heuristic evaluation:

```markdown
## Usability Audit

### Heuristic Violations
1. **[Heuristic]** at **[location]**: [Violation description].
   Severity: [Cosmetic / Minor / Major / Catastrophic]
   → Recommendation: [Fix]

### Cognitive Load Issues
1. **[Location]**: [What's overloading the user]. Evidence: [principle/research].
   → Simplify: [How]

### Accessibility Issues
1. **[WCAG Criterion]** at **[location]**: [Failure description].
   Impact: [Who is affected, how]
   → Fix: [Specific remediation]

### User Journey Gaps
1. **Between [step] and [step]**: [Missing guidance/affordance].
   → Add: [What]
```

**Content Critic** evaluates messaging effectiveness:

```markdown
## Content Audit

### Comprehension Issues
1. **[Location]**: [What's unclear]. A first-time visitor would [misunderstand/miss].
   → Rewrite: [Suggested copy]

### Missing Content
1. **[Location]**: [What's missing]. The [persona] needs [information] here.
   → Add: [Content type + placement]

### Content Hierarchy Issues
1. **[Location]**: [What's out of order]. [Why the current order fails].
   → Reorder: [Suggested hierarchy]

### CTA Effectiveness
1. **[CTA text]** at **[location]**: [Problem]. [Why it won't convert].
   → Alternative: [Better CTA text + reasoning]
```

**Motion Critic** evaluates animation impact on usability:

```markdown
## Motion Audit

### Animation UX Issues
1. **[Animation]** at **[location]**: [How it hurts UX].
   Evidence: [Too slow / distracting / blocks content / no reduced-motion]
   → Fix: [Specific timing/behavior change]

### Missing Motion
1. **[Interaction]** at **[location]**: [Why animation would improve UX].
   → Add: [Specific animation + timing]

### Performance Concerns
1. **[Animation]**: [Performance impact].
   → Optimize: [Specific change]
```

### Round 3: User Story Testing

The team runs through specific user stories adversarially:

```markdown
## User Story Tests

### Story 1: "I'm a CEO evaluating consulting firms"
- Can I understand what this firm does in 5 seconds? [Pass/Fail + why]
- Can I find relevant case studies in my industry? [Pass/Fail + why]
- Can I contact someone in < 3 clicks? [Pass/Fail + why]
- Do I trust this firm based on the website? [Pass/Fail + why]

### Story 2: "I'm an analyst comparing 5 firms"
- Can I find methodology details? [Pass/Fail + why]
- Can I find team credentials? [Pass/Fail + why]
- Can I download something to share with my team? [Pass/Fail + why]
- Is the content differentiated from competitors? [Pass/Fail + why]

### Story 3: "I'm visiting on my phone during a commute"
- Does the page load quickly on 4G? [Pass/Fail + why]
- Can I navigate easily with one thumb? [Pass/Fail + why]
- Is the content readable without zooming? [Pass/Fail + why]
- Can I take the primary action on mobile? [Pass/Fail + why]
```

### Round 4: Resolution & Iteration

Creators respond to critiques and implement changes. Same accept/reject/dispute format as other teams.

### Round 5: Final UX Score

```markdown
## UX Quality Score

| Dimension | Score (1-10) | Notes |
|-----------|-------------|-------|
| First Impression (5-sec test) | | |
| Information Findability | | |
| Content Clarity | | |
| Visual Usability | | |
| Mobile Experience | | |
| Accessibility (WCAG AA) | | |
| Motion & Interactivity | | |
| Conversion Path Clarity | | |
| **Overall UX Score** | **[average]** | |
```

**Approval threshold**: Overall ≥ 7, no individual dimension ≤ 5.

## User Story Library

Maintain a growing set of user stories for regression testing:

1. First-time visitor from Google search
2. Referral from a satisfied client
3. Returning visitor checking for new case studies
4. Potential hire exploring the team page
5. Journalist looking for expert quotes
6. Investor evaluating the firm's capabilities
7. Mobile user on a slow connection
8. Screen reader user navigating the site
9. User with color vision deficiency viewing data charts
10. Non-English speaker encountering the site

## Iteration Limits

- **Maximum rounds**: 2 full audit cycles
- **Quick fixes**: Cosmetic and minor usability issues can be fixed without a full re-audit
- **Escalation**: If UX score < 6 after 2 rounds, the design direction needs fundamental rethinking

## When to Escalate to Human

- UX requirements conflict with brand aesthetic goals
- Accessibility compliance requires significant design changes
- User story testing reveals fundamental information architecture problems
- Performance constraints prevent desired UX patterns
- Content gaps require domain expert input
