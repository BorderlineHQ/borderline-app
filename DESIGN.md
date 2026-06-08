---
version: alpha
name: BorderLine
colors:
  background: "#070913"
  surface: "rgba(15, 20, 39, 0.6)"
  border: "rgba(255, 255, 255, 0.08)"
  textPrimary: "#F8FAFC"
  textSecondary: "#94A3B8"
  accentTeal: "#0D9488"
  accentAmber: "#D97706"
  accentOrange: "#EA580C"
typography:
  fontFamily: "'Inter', 'Plus Jakarta Sans', system-ui, sans-serif"
  h1:
    fontSize: "2.5rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  h2:
    fontSize: "1.75rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body-md:
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: "6px"
  md: "12px"
  lg: "20px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
---

# BorderLine Design Language

This document specifies the visual identity and styling parameters of BorderLine. AI coding agents generating CSS/HTML code MUST strictly align with the design tokens in the front matter and the guidelines below.

---

## 1. Aesthetic Rationale: Glassmorphism Meets African Innovation

The aesthetic borrows from the **frictionless reliability of Uber**, the **empowering, high-yield talent validation of Andela**, and the **warm, human-centric belonging of Airbnb**.

The interface is built around **Glassmorphism (Frosted Glass UI)**. This styling communicates modernity, clean spacing, and a digital-native atmosphere.
* **Midnight Foundation (`colors.background`)**: Deep, space-like contrast to represent high-end security and professional trust to global employers.
* **Translucent Surfaces (`colors.surface`)**: All panels, cards, and dialogue blocks float over the background using transparent overlays and backdrop filters.
* **Accents**: Pair professional trust (`colors.accentTeal`) with energetic youth-centric culture (`colors.accentOrange` and `colors.accentAmber`).

---

## 2. Global Styling Guidelines

### A. Surface Architecture & Glassmorphism
All cards and dialogue modules should apply the following properties:
* **Background**: `background: var(--color-surface)` (semi-transparent navy).
* **Blur**: `backdrop-filter: blur(12px) saturate(180%)`.
* **Border**: `1px solid var(--color-border)` (thin white-transparent line for border definition).
* **Corner Radius**: Use `var(--radius-md)` (`12px`) for standard cards and `var(--radius-lg)` (`20px`) for large panels.
* **Depth**: Use a subtle box shadow: `box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37)`.

### B. Typography & Text Hierarchy
* **Primary Headers (H1)**: Bold, tight letter spacing, and off-white.
* **Sub-Headers (H2)**: Clear, secondary anchors.
* **Paragraphs (Body)**: Readable cool slate text (`#94A3B8`) to minimize eye strain and establish text hierarchy.
* **Don'ts**: Never use browser-default serif fonts. Avoid pure black text on light elements, and never use raw `#000000` or `#ffffff` for general text.

### C. Layout & Spacing Rules
* **Generous White Space**: Maintain breathing room between layout blocks.
* **System Elements Margin**: Use `{spacing.lg}` (`24px`) for grid gap values and `{spacing.md}` (`16px`) for padding within cards.
* **Responsive Layouts**: Design mobile-first. Many users in Ghana, Senegal, and Ethiopia access the web via data-constrained mobile devices. Ensure elements stack logically on screens `< 768px`.

---

## 3. Micro-Animations & Interaction States

All interactive elements (buttons, inputs, cards) must have smooth, hardware-accelerated transitions:
* **Cards**: Translate slightly upwards (`-3px`) and expand background glow on hover:
  ```css
  .card-interactive {
    transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), 
                border-color 0.3s ease, 
                box-shadow 0.3s ease;
  }
  .card-interactive:hover {
    transform: translateY(-3px);
    border-color: rgba(13, 148, 136, 0.3); /* Accent Teal Glow */
    box-shadow: 0 12px 40px 0 rgba(13, 148, 136, 0.15);
  }
  ```
* **Buttons**: Clean scale-down states (`transform: scale(0.98)`) on press.
