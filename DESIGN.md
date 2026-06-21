---
version: beta-adaptive
name: BorderLine
themes:
  dark:
    background: "#030712"
    surface: "#0B0F19"
    surfaceElevated: "#0E1420"
    surfaceGreenBlock: "#05180D"
    border: "#1F2937"
    textPrimary: "#FFFFFF"
    textSecondary: "#9CA3AF"
    textTertiary: "#6B7280"
    accent: "#22C55E"
    accentHover: "#16A34A"
    accentSubtle: "rgba(34, 197, 94, 0.1)"
    accentSecondary: "#10B981"
    danger: "#EF4444"
    heroBg: "#030712"
  light:
    background: "#FFFFFF"
    surface: "#FAFAFA"
    surfaceElevated: "#FFFFFF"
    surfaceGreenBlock: "#F0FDF4"
    border: "#E5E7EB"
    textPrimary: "#111827"
    textSecondary: "#6B7280"
    textTertiary: "#9CA3AF"
    accent: "#16A34A"
    accentHover: "#15803D"
    accentSubtle: "#F0FDF4"
    accentSecondary: "#4F46E5"
    danger: "#DC2626"
    heroBg: "#FAFAFA"
typography:
  fontFamilyDisplay: "'DM Sans', system-ui, sans-serif"
  fontFamilyBody: "'Inter', system-ui, sans-serif"
  fontFamilyMono: "'JetBrains Mono', monospace"
  display:
    fontSize: "3.5rem"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  h1:
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  h2:
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  h3:
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0"
  body-lg:
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  caption:
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.02em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
  xxxl: "64px"
---

# BorderLine Design Language (Adaptive Dual-Theme)

This document specifies the adaptive dual-theme visual identity and styling parameters of BorderLine. AI coding agents generating CSS/HTML code MUST strictly align with these design tokens and guidelines.

---

## 1. Aesthetic Rationale: Global Theme Switcher

BorderLine features a **global dark and light mode selector** in the navigation header, allowing users to toggle the visual experience at any time across the entire application:
* **The Dark Mode Theme**: High-contrast, developer-focused aesthetic inspired by modern engineering platforms (Vercel, Linear, Supabase). Relies on deep black canvas, dark slate surface cards, and neon green accents.
* **The Light Mode Theme**: Clean, highly readable enterprise SaaS style inspired by classic business platforms (Andela, Mercor). Relies on white canvas, warm gray surface cards, and deep forest green accents.

---

## 2. CSS Custom Properties Structure

All components must consume CSS variables defined dynamically based on the active theme class (`.dark-theme` or `.light-theme`) attached to the body or root:

```css
:root {
  /* Common spacing, typography, and border radius properties */
  --font-display: 'DM Sans', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
}

body.dark-theme {
  --color-bg: #030712;
  --color-surface: #0B0F19;
  --color-surface-elevated: #0E1420;
  --color-surface-greenblock: #05180D;
  --color-border: #1F2937;
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #9CA3AF;
  --color-text-tertiary: #6B7280;
  --color-accent: #22C55E;
  --color-accent-hover: #16A34A;
  --color-accent-subtle: rgba(34, 197, 94, 0.1);
  --color-accent-secondary: #10B981;
  --color-danger: #EF4444;
}

body.light-theme {
  --color-bg: #FFFFFF;
  --color-surface: #FAFAFA;
  --color-surface-elevated: #FFFFFF;
  --color-surface-greenblock: #F0FDF4;
  --color-border: #E5E7EB;
  --color-text-primary: #111827;
  --color-text-secondary: #6B7280;
  --color-text-tertiary: #9CA3AF;
  --color-accent: #16A34A;
  --color-accent-hover: #15803D;
  --color-accent-subtle: #F0FDF4;
  --color-accent-secondary: #4F46E5;
  --color-danger: #DC2626;
}
```

---

## 3. Global Styling Guidelines

### A. Surface Architecture & Elevation
* **Background**: `background: var(--color-surface-elevated)`.
* **Border**: `1px solid var(--color-border)`.
* **Shadows & Glows**:
  * *Dark Mode*: Sharp, high-contrast borders and low-opacity green glows (e.g. `box-shadow: 0 0 15px rgba(34, 197, 94, 0.05)`) on hover.
  * *Light Mode*: Soft, warm drop shadows: `box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08)`.

### B. Typography & Text Hierarchy
* **Headers**: `DM Sans`, bold, tight letter spacing. Color is `var(--color-text-primary)`.
* **Paragraphs**: `Inter`, readable gray/slate `var(--color-text-secondary)`.
* **Contrasting Gradients**: Display headings on landing pages can apply text gradients (e.g., green-to-blue or white-to-slate) to draw emphasis in both themes.

### C. Layout & Spacing Rules
* **Whitespace**: Use consistent spacing variables (`spacing.xxl`, `spacing.xxxl`) to divide page sections.
* **Responsive Design**: All components must be designed mobile-first, adapting clean multi-column layouts into single-column structures on screens `< 768px`.

---

## 4. Micro-Animations & Interaction States

* **Interactive Cards**: Elevate and shift border and shadow on hover:
  ```css
  .card-interactive {
    transition: box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
  }
  .card-interactive:hover {
    border-color: var(--color-accent);
    box-shadow: 0 4px 15px var(--color-accent-subtle);
    transform: translateY(-2px);
  }
  ```
* **Buttons**: Background transition on hover to `var(--color-accent-hover)`. Secondary outline buttons change border and text color to matching accent green on hover.
* **Stat Odometer Effect**: Scroll-triggered flip-up odometer animation for survey numbers (70%, 92%, 59%) to highlight the data dynamically.

---

## 5. Landing Page Adaptive Patterns

* **Navigation Bar**: Transparent or colored (`var(--color-bg)`) with bottom border (`1px solid var(--color-border)`). Features the global theme-toggle slider (sun/moon icon).
* **Hero Section**:
  * *Dark Mode*: Deep black background with white text, neon green CTAs, and dark verified card preview widget on the right.
  * *Light Mode*: Warm gray background (`#FAFAFA`) with dark text, forest green CTAs, and white verified card preview widget.
* **Core Problem Block**: Header red badge ("The Infrastructural Gap"). Headline highlights in accent green. The three stats cards (70%, 92%, 59%) use the active theme's card color and border.
* **Protocol Feature Section**:
  * *Dark Mode*: In deep green background (`#05180D`) with neon green highlights and dark metric cards.
  * *Light Mode*: In light green background (`#F0FDF4`) with forest green highlights and white metric cards.
* **Call-to-Action Banner**: Solid neon green (`#22C55E`) or forest green (`#16A34A`) container with text and pill outline buttons.

---

## 6. Recruiter Dashboard Adaptive Patterns

* **Theme Adaptation**:
  * *Light Mode (Standard)*: Recruiter search portals, candidate lists, and sidebar filters default to the crisp, clean light mode (relying on white grids and gray borders for dashboard layout clarity).
  * *Dark Mode*: Seamlessly shifts canvas to dark charcoal, borders to `#1F2937`, and cards to `#0E1420` with neon green highlights, allowing developers and recruiters to manage dashboard views in low-light environments.
* **Three-Column Grid Structure**:
  1. **Sidebar Filters**: Left panel containing checkmarks for locations, skill types, and verified badge filters.
  2. **Main Feed**: Center grid showing developer portfolio summary cards.
  3. **Detail Drawer**: Slide-over drawer detailing the AI-Verified case studies.

---

## 7. Talent Mobile Matches Feed Adaptive Patterns

* **Theme Adaptation**:
  * *Dark Mode (Default)*: High-impact developer-native styling on mobile. Matches cards use slate background and neon green badge highlights.
  * *Light Mode*: Automatically shifts card backgrounds to pure white with light gray borders and forest green badges, optimizing readability under bright sunlight.
* **Mobile Layout**:
  * Single-column vertical list with a sticky header.
  * Each card displays the organization logo, match percentage, job title, budget stats, and required skill chips.
