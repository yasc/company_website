# Homepage Aesthetic Redesign — Implementation Plan

## Overview

This document outlines the implementation plan for updating the Applied Economics homepage to achieve a premium, modern aesthetic comparable to Palantir, BCG, and DeepMind. The site uses a light background with dark text.

---

## Phase 1: Foundation

### 1.1 Colour Palette Update

Replace the current colour system with the following:

| Role | Hex | Usage |
|------|-----|-------|
| Background Primary | `#FFFFFF` | Main page background |
| Background Secondary | `#F8FAFA` | Alternate sections, cards |
| Background Accent | `#E8F5F3` | Subtle highlight areas |
| Text Primary | `#1A1A1A` | Headlines, body text |
| Text Secondary | `#4A5568` | Subheadlines, captions |
| Accent Primary | `#0D9488` | Buttons, links, highlights |
| Accent Hover | `#0F766E` | Button hover states |
| Border | `#E2E8F0` | Card borders, dividers |
| Footer Background | `#1A1A1A` | Footer section |
| Footer Text | `#E2E8F0` | Footer text |

### 1.2 Typography System

**Headline Font**: Source Serif 4 (Google Fonts) or similar serif
- H1: 56px / 64px line-height / 600 weight
- H2: 40px / 48px line-height / 600 weight
- H3: 24px / 32px line-height / 600 weight

**Body Font**: Inter (Google Fonts)
- Body: 18px / 28px line-height / 400 weight
- Body Small: 16px / 24px line-height / 400 weight
- Caption: 14px / 20px line-height / 400 weight
- Navigation: 15px / 400 weight

**Button Text**: Inter
- 15px / 500 weight / slight letter-spacing (0.01em)

---

## Phase 2: Hero Section

### 2.1 Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo]     About  Services  Research  Data  ...  [Contact] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Economics research                    ┌─────────────────┐ │
│   that drives real-world                │                 │ │
│   impact                                │   HERO IMAGE    │ │
│                                         │   (abstract     │ │
│   Subheadline text here describing      │    flowing      │ │
│   the value proposition in one or       │    teal forms)  │ │
│   two lines maximum.                    │                 │ │
│                                         └─────────────────┘ │
│   [Work with us]  [View our research]                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Hero Specifications

- **Section height**: 90vh minimum, with content vertically centred
- **Content width**: Max 1280px, centred with horizontal padding of 24px (mobile) / 48px (tablet) / 80px (desktop)
- **Text block**: Left-aligned, max-width 560px
- **Image placement**: Right side, can extend beyond content container to edge of viewport
- **Vertical padding**: 120px top (below nav), 80px bottom

### 2.3 Hero Image Implementation

- Use provided hero image (abstract teal flowing forms)
- Image should scale responsively, maintaining aspect ratio
- On mobile: Image moves above text, full width
- Consider subtle parallax effect on scroll (optional enhancement)

### 2.4 Hero Text Styling

```css
/* Headline */
.hero-headline {
  font-family: 'Source Serif 4', serif;
  font-size: clamp(40px, 5vw, 56px);
  font-weight: 600;
  line-height: 1.15;
  color: #1A1A1A;
  margin-bottom: 24px;
}

/* Subheadline */
.hero-subheadline {
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  line-height: 1.6;
  color: #4A5568;
  margin-bottom: 40px;
  max-width: 480px;
}
```

### 2.5 Button Styling

**Primary Button (filled)**
- Background: `#0D9488`
- Text: `#FFFFFF`
- Padding: 16px 32px
- Border-radius: 6px
- Hover: Background `#0F766E`, subtle lift shadow

**Secondary Button (outline)**
- Background: transparent
- Border: 1px solid `#1A1A1A`
- Text: `#1A1A1A`
- Padding: 16px 32px
- Border-radius: 6px
- Hover: Background `#1A1A1A`, Text `#FFFFFF`

---

## Phase 3: Navigation

### 3.1 Navigation Bar

- **Position**: Fixed at top
- **Background**: `#FFFFFF` with subtle shadow on scroll
- **Height**: 72px
- **Logo**: Left-aligned, current "Applied Economics" text mark
- **Links**: Centre or right-aligned, 15px Inter, `#1A1A1A`
- **CTA Button**: Right-aligned, primary button style (smaller padding: 12px 24px)

### 3.2 Navigation Behaviour

- Starts transparent or white
- On scroll: Adds subtle box-shadow (`0 1px 3px rgba(0,0,0,0.08)`)
- Mobile: Hamburger menu with slide-in drawer

---

## Phase 4: "What We Do" Section

### 4.1 Section Layout

- **Background**: `#FFFFFF`
- **Vertical padding**: 120px top and bottom
- **Section title**: "What we do" — H2, centred or left-aligned
- **Section intro**: One line of supporting text, `#4A5568`

### 4.2 Service Cards Redesign

Replace bordered cards with elevated card style:

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│   ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│   │     [icon]      │  │     [icon]      │  │     [icon]      │ │
│   │                 │  │                 │  │                 │ │
│   │   Economic      │  │   Data          │  │   Policy        │ │
│   │   Consulting    │  │   Products      │  │   Research      │ │
│   │                 │  │                 │  │                 │ │
│   │   Description   │  │   Description   │  │   Description   │ │
│   │   text here     │  │   text here     │  │   text here     │ │
│   │                 │  │                 │  │                 │ │
│   └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│                                                                  │
│   [Explore all services]                                         │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### 4.3 Card Specifications

- **Background**: `#FFFFFF`
- **Border**: None (remove current borders)
- **Shadow**: `0 1px 3px rgba(0,0,0,0.04)` default
- **Shadow hover**: `0 8px 24px rgba(0,0,0,0.08)`
- **Border-radius**: 12px
- **Padding**: 40px
- **Transition**: All 0.2s ease

### 4.4 Card Content

- **Icon**: Custom line icon, 48px, stroke colour `#0D9488`
- **Title**: H3, Source Serif 4, `#1A1A1A`
- **Description**: Body text, Inter, `#4A5568`
- **Spacing**: 24px between icon and title, 16px between title and description

### 4.5 Icons Required

Commission or source three custom icons:
1. **Economic Consulting**: Abstract chart/analysis symbol
2. **Data Products**: Database or data flow symbol  
3. **Policy Research**: Document or institution symbol

Style: Line icons, 2px stroke, rounded caps, minimal detail

---

## Phase 5: CTA Band ("Ready to work together?")

### 5.1 Section Styling

- **Background**: `#1A1A1A` (full-width dark band)
- **Vertical padding**: 80px
- **Text colour**: `#FFFFFF`
- **Layout**: Flexbox, space-between, items centred vertically

### 5.2 Content

Left side:
- Headline: "Ready to work together?" — H2, white
- Subtext: "Let's discuss how we can help your organisation." — Body, `#A0AEC0`

Right side:
- Two buttons: "Contact us" (primary, inverted colours) and "Join our team" (outline, white border)

---

## Phase 6: Footer

### 6.1 Footer Structure

- **Background**: `#111111`
- **Text colour**: `#A0AEC0` (muted), `#FFFFFF` (headings)
- **Vertical padding**: 80px top, 40px bottom
- **Max-width**: Same as content (1280px), centred

### 6.2 Footer Layout

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   Applied Economics          COMPANY        RESOURCES       │
│                              About          Lab             │
│   Rigorous economic          Services       Insights        │
│   research and data-driven   Research       Careers         │
│   insights for better        Data           Contact         │
│   decision making.                                          │
│                                                             │
│   [LinkedIn] [X]                                            │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│   © 2026 Applied Economics          Privacy  ·  Terms       │
└─────────────────────────────────────────────────────────────┘
```

### 6.3 Footer Typography

- **Brand name**: 18px, 600 weight, white
- **Tagline**: 14px, 400 weight, `#A0AEC0`
- **Column headers**: 13px, 600 weight, white, uppercase, letter-spacing 0.05em
- **Column links**: 15px, 400 weight, `#A0AEC0`, hover white
- **Copyright**: 14px, `#718096`

---

## Phase 7: Global Enhancements

### 7.1 Spacing Scale

Use consistent spacing throughout:
- 8px (xs)
- 16px (sm)
- 24px (md)
- 32px (lg)
- 48px (xl)
- 80px (2xl)
- 120px (3xl)

### 7.2 Scroll Animations

Add subtle entrance animations using Intersection Observer:
- Elements fade in and translate up slightly (20px) as they enter viewport
- Duration: 0.6s
- Easing: ease-out
- Stagger: 0.1s between sequential elements

### 7.3 Link Styling

- Default: `#0D9488`, no underline
- Hover: `#0F766E`, underline

### 7.4 Selection Colour

```css
::selection {
  background: #0D9488;
  color: #FFFFFF;
}
```

---

## Implementation Checklist

### Phase 1: Foundation
- [ ] Update CSS variables / design tokens for colours
- [ ] Import and configure fonts (Source Serif 4, Inter)
- [ ] Set base typography styles

### Phase 2: Hero
- [ ] Restructure hero HTML for new layout
- [ ] Implement hero image (provided asset)
- [ ] Style headline and subheadline
- [ ] Style buttons (primary and secondary)
- [ ] Responsive behaviour for tablet and mobile

### Phase 3: Navigation
- [ ] Update navigation styling
- [ ] Add scroll behaviour (shadow on scroll)
- [ ] Mobile hamburger menu

### Phase 4: Services Section
- [ ] Remove current card borders
- [ ] Implement new card shadow and hover states
- [ ] Add/integrate service icons
- [ ] Update typography within cards

### Phase 5: CTA Band
- [ ] Update background to dark
- [ ] Restyle text and buttons for dark background
- [ ] Adjust layout to flexbox space-between

### Phase 6: Footer
- [ ] Update footer background and typography
- [ ] Restructure footer columns if needed
- [ ] Style social icons

### Phase 7: Polish
- [ ] Implement scroll animations
- [ ] Test all hover states
- [ ] Cross-browser testing
- [ ] Performance check (image optimisation, font loading)

---

## Assets Required

| Asset | Status | Notes |
|-------|--------|-------|
| Hero image | ✅ Complete | Abstract teal flowing forms |
| Service icon: Economic Consulting | ⏳ Needed | Line icon style |
| Service icon: Data Products | ⏳ Needed | Line icon style |
| Service icon: Policy Research | ⏳ Needed | Line icon style |
| Social icons (LinkedIn, X) | ⏳ Needed | Match footer style |

---

## Timeline Estimate

| Phase | Estimated Duration |
|-------|-------------------|
| Phase 1: Foundation | 2-3 hours |
| Phase 2: Hero | 3-4 hours |
| Phase 3: Navigation | 2 hours |
| Phase 4: Services | 3 hours |
| Phase 5: CTA Band | 1 hour |
| Phase 6: Footer | 2 hours |
| Phase 7: Polish | 3-4 hours |
| **Total** | **16-19 hours** |

---

## Questions for Developer

1. What framework/tech stack is the current site built with?
2. Are there any existing CSS variables or design token systems in place?
3. Is there a preferred animation library, or should we use CSS transitions?
4. Any constraints on font loading approach?