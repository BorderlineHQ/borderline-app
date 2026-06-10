---
version: beta
name: BorderLine
colors:
  background: "#FFFFFF"
  surface: "#FAFAFA"
  surfaceElevated: "#FFFFFF"
  border: "#E5E7EB"
  textPrimary: "#111827"
  textSecondary: "#6B7280"
  textTertiary: "#9CA3AF"
  accent: "#16A34A"
  accentHover: "#15803D"
  accentSubtle: "#F0FDF4"
  accentSecondary: "#4F46E5"
  danger: "#DC2626"
  heroBg: "#111827"
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

# BorderLine Design Language

This document specifies the visual identity and styling parameters of BorderLine. AI coding agents generating CSS/HTML code MUST strictly align with the design tokens in the front matter and the guidelines below.

---

## 1. Aesthetic Rationale: Clean, Professional, Enterprise-Ready

The aesthetic borrows from the **restrained, data-forward interface of Mercor** and the **enterprise-credible trust of Andela**.

The interface is built around a **Clean Light Mode**. This styling communicates trust, precision, and an enterprise-ready atmosphere, shifting away from experimental/student-hacker aesthetics.
* **Clean Foundation (`colors.background`)**: Pure white to represent clarity and professional trust.
* **Subtle Elevation (`colors.surfaceElevated`)**: Cards and panels use subtle borders and extremely soft drop-shadows rather than glassmorphism or heavy shadows.
* **Accents**: Forest green (`colors.accent`) serves as the primary trust/growth signal, used sparingly for primary actions and badges. Indigo (`colors.accentSecondary`) provides secondary contrast.

---

## 2. Global Styling Guidelines

### A. Surface Architecture & Elevation
All cards and dialogue modules should apply the following properties:
* **Background**: `background: var(--color-surfaceElevated)` (pure white).
* **Border**: `1px solid var(--color-border)` (light gray `#E5E7EB`).
* **Corner Radius**: Use `var(--radius-sm)` (`8px`) for standard cards and `var(--radius-lg)` (`16px`) for large panels.
* **Depth**: Use a subtle box shadow: `box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08)`.

### B. Typography & Text Hierarchy
* **Display Headers**: `DM Sans`, bold, very tight letter spacing, used in hero sections.
* **Primary Headers (H1-H3)**: `DM Sans`, clear anchors, dark gray (`#111827`).
* **Paragraphs (Body)**: `Inter`, highly readable gray (`#6B7280`) to establish text hierarchy.
* **Don'ts**: Never use browser-default serif fonts. Avoid pure black text (`#000000`).

### C. Layout & Spacing Rules
* **Whitespace over Decoration**: Use whitespace (`spacing.xxl`, `spacing.xxxl`) to separate sections instead of lines or alternating backgrounds.
* **System Elements Margin**: Use `{spacing.lg}` (`24px`) for grid gap values and `{spacing.md}` (`16px`) for padding within cards.
* **Responsive Layouts**: Design mobile-first. Ensure elements stack logically on screens `< 768px` for data-constrained mobile devices.

---

## 3. Micro-Animations & Interaction States

Interactions must be crisp, fast, and restrained:
* **Cards**: Elevate slightly and deepen border color on hover:
  ```css
  .card-interactive {
    transition: box-shadow 0.2s ease, border-color 0.2s ease;
  }
  .card-interactive:hover {
    border-color: #D1D5DB;
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
  }
  ```
* **Buttons**: Background color shift on hover (`#16A34A` to `#15803D`). No heavy scaling.
* **Scroll Animations (Odometer/Flip Wheels)**: When statistics or survey data numbers scroll into view, they MUST use a flip-up wheel or odometer-style animation rather than appearing statically. This adds a highly dynamic, data-centric feel.

---

## 4. Landing Page Component Patterns

When building or updating the landing page, agents MUST follow these patterns:

* **Navigation Bar**: White background, subtle bottom border (`1px solid #E5E7EB`). Use the user's logo in `docs/assets/borderline_logo.jpg` or a `DM Sans Bold` text mark. Nav links in `Inter 500` (`#6B7280`). CTA button: solid green.
* **Hero Section (Contrast Block)**: Dark background (`#111827`). Includes a metrics ticker bar (e.g., `Builders verified: X | Jobs matched: X`). Display heading in white `DM Sans 700`, sub-text in gray-300 `Inter 400`.
* **Social Proof Bar**: Clean grayscale logos of partner organizations on a light background.
* **Problem/Stats Section**: Three-column grid with large green stat numbers (`DM Sans 700`). No icons, let the numbers speak. *These numbers must use the flip-up wheel animation on scroll to reveal the survey analysis data (e.g., 70% experience barriers, 92% unverified, 59% connectivity issues).*
* **Features Section**: Two-column layout (text left, UI mockup right). Titles in `DM Sans 600`, body in `Inter 400` gray-600. Subtle screenshot frames.
* **Testimonials / Builder Stories**: Clean card grid (white cards, 1px border, 8px radius) with photo, name, country, skill tags, and quote.
* **Footer**: Light gray background (`#F9FAFB`), multi-column links, social icons, copyright.
