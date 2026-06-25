# Technical SEO & Dynamic Profile Architecture

This document provides a comprehensive overview of the search engine optimization (SEO) architecture implemented in BorderLine, explaining the design patterns, conventions, and guidelines for future agents.

---

## 1. Core SEO Philosophy

BorderLine's SEO system is designed to maximize search visibility and organic indexing of dynamic talent profiles, replicating the crawlability and snippet-rich presence of professional platforms like LinkedIn. This is achieved through:
1. **Server-Side Rendering (SSR)**: Dynamic routes are server-rendered so that web crawlers get complete HTML documents with fully populated content, bypassing client-side rendering delays.
2. **Crawlable Navigation Rails**: Every dynamic profile page is linked naturally from the home page using Next.js `<Link>` elements, providing clear path navigation for search crawlers.
3. **Structured Data (JSON-LD)**: Schema.org schemas are injected into pages to enable rich results and snippets (e.g., job titles, skills, and locations in Google search results).
4. **Comprehensive Meta Tags**: Custom titles, descriptions, canonical alternates, and social tags are defined dynamically per route.

---

## 2. Dynamic Profiles Route (`/in/[id]`)

The public profile route is located at `src/app/in/[id]/page.tsx`. It acts as the public portfolio showcase for Africa's digital builders.

### A. Next.js 16 / React 19 Parameter Awaiting
In Next.js 16 and React 19, route `params` are **Promises** and must be awaited asynchronously. We adhere strictly to this in both metadata and page rendering:

```tsx
type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params; // Must await!
  const profile = getProfile(id);
  // ...
}

export default async function PublicProfilePage({ params }: Props) {
  const { id } = await params; // Must await!
  const profile = getProfile(id);
  // ...
}
```

### B. Normalized Slug Resolution
To provide user-friendly URLs, the profile page supports both the full platform ID (e.g., `/in/talent-chidi`) and short slugs (e.g., `/in/chidi`). The resolver normalizes the lookup:
```typescript
function getProfile(id: string) {
  const profileId = id.startsWith("talent-") ? id : `talent-${id}`;
  return mockProfiles.find((p) => p.id === profileId);
}
```
*Note: To prevent search engines from treating these as duplicate content, a canonical alternate URL is configured in the metadata, pointing exclusively to the full ID URL:*
```typescript
alternates: {
  canonical: `/in/${profile.id}`,
}
```

### C. JSON-LD Structured Data
To let search engines parse our talent assets, we inject a Schema.org `Person` and `ProfilePage` structured schema:
```tsx
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "dateCreated": profile.createdAt,
  "mainEntity": {
    "@type": "Person",
    "name": profile.fullName,
    "jobTitle": profile.techFocus,
    "description": profile.bio,
    "image": profile.avatarUrl,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": profile.country,
    },
    "knowsAbout": profile.skills,
  },
};
```
This is injected directly inside the page body inside a `<script type="application/ld+json">` tag.

---

## 3. Dynamic Metadata Files

We generate all essential crawler files dynamically using the Next.js App Router conventions:

### A. Robots File (`src/app/robots.ts`)
Generates the `robots.txt` instructions dynamically. It directs crawlers to index the site but blocks private dashboard/admin URLs and backend API routes. It also lists the dynamic sitemap URL:
- Location: `src/app/robots.ts`
- Output path: `/robots.txt`

### B. Sitemap File (`src/app/sitemap.ts`)
Generates the `sitemap.xml` file dynamically. It lists all static pages and loops over `mockProfiles` to output sitemap entries for every dynamic profile route. This ensures search engines discover new profile pages instantly without relying on crawler discovery:
- Location: `src/app/sitemap.ts`
- Output path: `/sitemap.xml`

### C. Web App Manifest (`src/app/manifest.ts`)
Configures the progressive web app (PWA) manifest parameters, aligning background and theme colors with our design system tokens.
- Location: `src/app/manifest.ts`
- Output path: `/manifest.json`

---

## 4. Sub-Layout Wrappers for Client Components

In Next.js, Client Components (marked with `'use client'`) cannot export static or dynamic metadata. To keep these pages indexable and SEO-optimized, we wrap them in Server Component layouts.
- **Manifesto Page (`src/app/manifesto/`)**: Wrapped with `src/app/manifesto/layout.tsx` which exports static metadata describing the manifesto's focus, while the page itself (`page.tsx`) remains a highly interactive client component.
- **Development Page (`src/app/development/`)**: Wrapped with `src/app/development/layout.tsx` which exports metadata instructing bots not to index the placeholder route.

---

## 5. Maintenance Guidelines for Future Agents

When modifying this repository, follow these guidelines to preserve SEO health:
1. **Never import `metadata` in client files**: Always declare page-specific metadata in layouts or server-side pages.
2. **Keep sitemaps updated**: If a new dynamic entity is added (e.g. dynamic recruiter profiles, gig detail pages), update `src/app/sitemap.ts` to include them.
3. **Preserve `params` promises**: In layouts or pages, always await `params` and `searchParams` to maintain compatibility with Next.js 16 and React 19.
4. **Test Schema Markup**: If updating the candidate profile structure, verify the JSON-LD schemas using the Schema.org Validator.
