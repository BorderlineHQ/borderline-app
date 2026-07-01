'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../../context/AppContext';

interface BlogPost {
  id: string;
  title: string;
  category: 'Insights' | 'Tech' | 'Product' | 'Growth';
  date: string;
  readTime: string;
  author: { name: string; avatar: string; role: string };
  excerpt: string;
  content: string[];
  image: string;
}

const mockPosts: BlogPost[] = [
  {
    id: 'post-1',
    title: "Bypassing the Resume Wall: How Africa's Builders Win Global Gigs",
    category: 'Insights',
    date: 'June 28, 2026',
    readTime: '5 min read',
    author: {
      name: 'Godwin Okronipa',
      role: 'Founder, BorderLine',
      avatar: '/godwin_okronipa.jpg'
    },
    excerpt: 'Traditional hiring systems favor legacy credentials. Here\'s how verifiable proof-of-work is enabling early-career talent across Africa to secure gigs they actually deserve.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    content: [
      'I got rejected from 47 job applications before I turned 22. Not because I couldn\'t code — I had three deployed apps, a full-stack portfolio, and a GitHub contribution streak longer than most people\'s LinkedIn bios. The reason? "We\'re looking for candidates with 3+ years of professional experience."',
      'That line haunts thousands of African developers every single day.',
      '## The Resume Is a Broken Filter',
      'Traditional hiring portals rank candidates by years of experience, brand-name schools, and corporate pedigree. If you graduated from KNUST, not Stanford — if your internship was at a local startup, not Google — the algorithm buries you on page 12.',
      'But here\'s the thing: a developer in Accra who\'s shipped a working Mobile Money integration has more relevant production skill than a CS graduate who\'s only written academic Java.',
      '## Enter Proof-of-Work Hiring',
      'At BorderLine, we replaced the resume with something better: **automated code audits**. When you upload a project, our system analyzes your code structure, deployment config, API architecture, and test coverage. It generates a "Build Score" — a verifiable, portable credential that speaks louder than any bullet point.',
      'A recruiter in Berlin doesn\'t need to trust your CV. They can see that you deployed a React dashboard with real-time WebSocket updates, handled M-Pesa callback flows, and wrote 84% test coverage. That\'s not a claim. That\'s proof.',
      '## What This Means for You',
      'Stop optimizing your resume. Start shipping. Every project you deploy, every API you integrate, every bug you fix in production — that\'s your real credential.',
      '*Focus on what you build, not what you say you built.*'
    ]
  },
  {
    id: 'post-2',
    title: 'Designing for the Sun: UX Lessons from Open-Air Markets',
    category: 'Product',
    date: 'June 22, 2026',
    readTime: '6 min read',
    author: {
      name: 'Titos',
      role: 'Design & Validation, BorderLine',
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=100'
    },
    excerpt: 'Your beautiful glassmorphism UI is invisible at noon in Makola Market. Here\'s what we learned about designing for real conditions.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
    content: [
      'I spent two weeks following mobile money agents through Makola Market in Accra and Kariakoo in Dar es Salaam. I watched them squint at their screens in 34°C heat, tap buttons with wet fingers, and lose transactions because a loading spinner blended into a white background.',
      'That field research changed everything about how I design.',
      '## The Sunlight Problem',
      'Most design systems are built for air-conditioned offices with calibrated monitors. In Africa, your primary user might be standing in direct sunlight, holding a cracked Tecno phone with 30% brightness to save battery.',
      'Glassmorphism? Invisible. Subtle gray text on white? Gone. That trendy thin-line icon set? Untappable.',
      '## Principles That Actually Work',
      '**1. Contrast is king.** We moved to a minimum contrast ratio of 7:1 (WCAG AAA). Black text on white. White text on deep blue. No pastels.',
      '**2. Big touch targets.** Our minimum tap target is 48×48px. In Makola, people tap with their thumbs while carrying bags. Fat fingers need fat buttons.',
      '**3. Offline-first flows.** Network drops mid-transaction. Every critical flow saves state locally and syncs when connectivity returns. Users should never lose their work.',
      '**4. Data-light by default.** Compress images aggressively. Lazy-load everything. Our landing page loads in under 200KB. A market vendor on 2G shouldn\'t wait 15 seconds to see their balance.',
      '## The Takeaway',
      'If your app doesn\'t work at noon in an open-air market, it doesn\'t work in Africa. Design for the hardest conditions first. Everyone else benefits.'
    ]
  },
  {
    id: 'post-3',
    title: 'USSD Is Not Dead: Building Bridges Between Old and New Tech',
    category: 'Tech',
    date: 'June 18, 2026',
    readTime: '8 min read',
    author: {
      name: 'Luse',
      role: 'Core Systems & APIs, BorderLine',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100'
    },
    excerpt: 'Over 400 million Africans still rely on feature phones. Here\'s how we connect USSD menus to modern React dashboards.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80&w=800',
    content: [
      'At a hackathon in Kumasi last year, a team of computer science students built a beautiful React Native app for farmers to check crop prices. Sleek animations, dark mode, the works. The judges loved it.',
      'Then someone asked: "How do the farmers use this? Most of them have Nokia 3310s."',
      'The room went quiet.',
      '## The Feature Phone Reality',
      'As of 2026, over 400 million people in Sub-Saharan Africa access mobile services exclusively through USSD — that *#123# menu system on basic phones. No app store. No browser. No internet.',
      'If your product only exists as an app, you\'ve excluded the majority of your potential users.',
      '## The Architecture: USSD ↔ REST ↔ React',
      'Here\'s the pattern we use at BorderLine to bridge both worlds:',
      '**Layer 1: USSD Gateway** — We register a shortcode with Africa\'s Talking. When a user dials *384*123#, the gateway sends a webhook to our backend with the session ID, phone number, and their menu selection.',
      '**Layer 2: Backend API** — A Node.js service processes the USSD session state. It maps menu selections to database queries. "Press 1 for available gigs" triggers the same query that powers the React dashboard.',
      '**Layer 3: React Dashboard** — Recruiters and admins see real-time updates via WebSockets. When a farmer checks crop prices via USSD, the dashboard reflects that interaction instantly.',
      '## Why This Matters',
      'The future of African tech isn\'t about choosing between old and new. It\'s about building bridges. USSD gives you reach. React gives you richness. The API layer makes them speak the same language.',
      '*The best product serves the user with a Nokia 3310 and the user with an iPhone 16. Simultaneously.*'
    ]
  },
  {
    id: 'post-4',
    title: 'Why We Built Escrow Into the Platform',
    category: 'Product',
    date: 'June 14, 2026',
    readTime: '4 min read',
    author: {
      name: 'Braima',
      role: 'Product & Research, BorderLine',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100'
    },
    excerpt: 'Cross-border freelancing without trust is impossible. Here\'s how Mobile Money escrow protects both builders and clients.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800',
    content: [
      'A developer in Nairobi finishes a two-week project for a client in London. She sends the invoice. Silence. Two weeks later, an email: "We\'ve decided to go in a different direction." The code is already deployed on their staging server.',
      'This isn\'t a hypothetical. This happened to three builders in our community last quarter alone.',
      '## The Trust Gap',
      'When a recruiter in Europe hires a student developer in West Africa, neither party has leverage. The recruiter fears paying for unfinished work. The developer fears doing free labor. Without a neutral third party, someone always loses.',
      '## How Our Escrow Works',
      'BorderLine holds the project budget in a neutral Mobile Money wallet. Here\'s the flow:',
      '**Step 1:** The recruiter deposits the agreed budget. Funds are held — not transferred.',
      '**Step 2:** The builder completes milestones and submits deliverables through the platform.',
      '**Step 3:** The recruiter reviews and approves. Only then do funds release to the builder\'s mobile wallet.',
      '**Step 4:** If there\'s a dispute, our community peer review panel arbitrates. Three senior builders review the code and deliverables, and make a binding decision within 72 hours.',
      '## The Technical Plumbing',
      'Budget is deposited via Stripe (international) or MTN MoMo (local). Funds sit in a pooled custodial wallet managed by our licensed payment partner. On milestone approval, we trigger an automated B2C disbursement.',
      'No builder should have to chase invoices. No recruiter should have to trust blindly. Escrow makes both sides safe.'
    ]
  },
  {
    id: 'post-5',
    title: 'Load-Shedding Proof: Building Apps That Survive Blackouts',
    category: 'Tech',
    date: 'June 8, 2026',
    readTime: '7 min read',
    author: {
      name: 'Kwame Asante',
      role: 'Backend Developer',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100'
    },
    excerpt: 'Your API call fails at 2pm because Eskom cut the power. Again. Here\'s how to build offline-first apps that keep working.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    content: [
      'I was debugging a payment flow when my power cut at 1:47 PM. No warning. My IDE froze. My local database crashed. Three hours of unsaved migration work — gone.',
      'If you\'ve lived in South Africa, Nigeria, or Ghana, you know this isn\'t a bug report. It\'s Tuesday.',
      '## The Infrastructure Reality',
      'In South Africa, load-shedding can cut power for 4-6 hours daily. In Lagos, you plan your sprint around generator fuel costs. In Accra, "light off" is such a common phrase it\'s basically a Slack status.',
      'If your app assumes always-on connectivity and stable power, you\'ve already failed.',
      '## The Offline-First Stack',
      '**Service Workers** — Cache your entire app shell and critical API responses. When the user\'s connection drops, they still see their dashboard, their balance, their last 10 transactions.',
      '**IndexedDB** — Store user data locally with automatic conflict resolution. When power returns and the device reconnects, sync pending changes without losing anything.',
      '**Background Sync API** — Queue failed network requests (form submissions, transaction confirmations) and replay them automatically when connectivity resumes.',
      '## The Results',
      'Apps built with this architecture see 3x higher daily active usage in regions with unreliable connectivity. Users trust apps that don\'t lose their data.',
      'Build for the blackout. Your users will thank you when the lights come back on.'
    ]
  },
  {
    id: 'post-6',
    title: 'From Campus Project to Paid Gig: Chidi\'s Story',
    category: 'Growth',
    date: 'May 30, 2026',
    readTime: '5 min read',
    author: {
      name: 'Fatima Hassan',
      role: 'Community Manager',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'
    },
    excerpt: 'He turned a university carpooling app into a verified portfolio piece that landed him his first international micro-gig. No connections. No degree flex. Just code.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
    content: [
      'Chidi was a second-year CS student at the University of Nigeria, Nsukka. He didn\'t have an internship. He didn\'t know anyone in tech outside his campus. What he had was a problem: getting from his hostel to the engineering faculty was a 40-minute walk in the rain.',
      'So he built a carpooling app.',
      '## Starting Small',
      'It was dead simple: React frontend, Vite bundler, local storage for state. No backend. No auth. Just a form where students could post rides and others could request seats. He deployed it on Vercel and shared it on the department WhatsApp group.',
      '47 students signed up in the first week.',
      '## Uploading to BorderLine',
      'After hearing about BorderLine from a friend, Chidi uploaded his GitHub repo. Our automated audit parsed the codebase and generated a structured case study: tech stack breakdown, component architecture, deployment config, and a Build Score of 87/100.',
      'The system flagged that he\'d used custom React hooks for state management, implemented responsive mobile layouts, and handled edge cases for empty ride lists. Things a recruiter would never catch from a resume line that says "Built a React app."',
      '## The Gig That Changed Everything',
      'Susu Pay, a fintech startup in Accra, was looking for a junior React developer to build a merchant ledger UI. They found Chidi through our recruiter feed, reviewed his verified case study, and offered him a GHS 2,500 micro-gig.',
      'He completed it in 10 days. They hired him for three more projects.',
      'Today, Chidi freelances part-time while finishing his degree. He\'s earned more from code than most of his professors earn from teaching.',
      '*Your campus project isn\'t just coursework. It\'s your ticket.*'
    ]
  }
];

const categoryColors: Record<string, { bg: string; text: string }> = {
  Insights: { bg: 'rgba(59, 130, 246, 0.1)', text: '#3b82f6' },
  Tech: { bg: 'rgba(168, 85, 247, 0.1)', text: '#a855f7' },
  Product: { bg: 'rgba(245, 158, 11, 0.1)', text: '#f59e0b' },
  Growth: { bg: 'rgba(52, 211, 153, 0.1)', text: '#34d399' },
};

export default function BlogPage() {
  const { theme } = useApp();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [filter, setFilter] = useState<'All' | 'Insights' | 'Tech' | 'Product' | 'Growth'>('All');
  const readerRef = useRef<HTMLDivElement>(null);

  const filtered = filter === 'All' ? mockPosts : mockPosts.filter(p => p.category === filter);

  // Lock body scroll when reader is open
  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedPost]);

  const renderContent = (blocks: string[]) => {
    return blocks.map((block, idx) => {
      // H2
      if (block.startsWith('## ')) {
        return (
          <h2 key={idx} style={{
            fontSize: '1.3rem',
            fontWeight: 800,
            color: 'var(--color-text-primary)',
            marginTop: idx === 0 ? 0 : '32px',
            marginBottom: '12px',
            lineHeight: 1.3,
            letterSpacing: '-0.02em',
          }}>
            {block.replace('## ', '')}
          </h2>
        );
      }

      // Italic paragraph (starts with *)
      if (block.startsWith('*') && block.endsWith('*')) {
        return (
          <p key={idx} style={{
            fontSize: '1.05rem',
            fontStyle: 'italic',
            color: 'var(--color-accent)',
            fontWeight: 600,
            lineHeight: 1.6,
            margin: '24px 0 8px 0',
            padding: '16px 20px',
            borderLeft: '3px solid var(--color-accent)',
            backgroundColor: 'var(--color-accent-subtle)',
            borderRadius: '0 8px 8px 0',
          }}>
            {block.replace(/^\*|\*$/g, '')}
          </p>
        );
      }

      // Bold-started paragraphs (numbered steps or key points)
      if (block.startsWith('**')) {
        const boldEnd = block.indexOf('**', 2);
        const boldText = block.substring(2, boldEnd);
        const rest = block.substring(boldEnd + 2);
        return (
          <p key={idx} style={{
            fontSize: '1rem',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.75,
            margin: '8px 0',
            paddingLeft: '16px',
            borderLeft: '2px solid var(--color-border)',
          }}>
            <strong style={{ color: 'var(--color-text-primary)', fontWeight: 700 }}>{boldText}</strong>
            {rest}
          </p>
        );
      }

      // Regular paragraph
      return (
        <p key={idx} style={{
          fontSize: '1.05rem',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.8,
          margin: '0 0 16px 0',
        }}>
          {block}
        </p>
      );
    });
  };

  return (
    <div style={{
      minHeight: '90vh',
      padding: 'var(--spacing-xxl) var(--spacing-md) var(--spacing-xxxl) var(--spacing-md)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        height: '50%',
        background: 'radial-gradient(ellipse at 50% 0%, var(--color-accent-subtle) 0%, transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '960px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
          <span style={{ color: 'var(--color-accent)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            BLOG & INSIGHTS
          </span>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 2.5rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginTop: '8px',
            marginBottom: 'var(--spacing-sm)',
            color: 'var(--color-text-primary)'
          }}>
            Stories From the Build
          </h1>
          <p style={{
            fontSize: '1rem',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.6,
            maxWidth: '540px',
            margin: '0 auto'
          }}>
            Real lessons from African builders shipping real products. No fluff. No theory. Just what works.
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: 'var(--spacing-xl)' }}>
          {['All', 'Insights', 'Tech', 'Product', 'Growth'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              style={{
                borderRadius: '20px',
                padding: '6px 16px',
                fontSize: '0.8rem',
                fontWeight: 600,
                backgroundColor: filter === cat ? 'var(--color-accent)' : 'transparent',
                color: filter === cat ? '#000' : 'var(--color-text-secondary)',
                border: filter === cat ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post (first) */}
        {filtered.length > 0 && (
          <div
            onClick={() => setSelectedPost(filtered[0])}
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr)',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              cursor: 'pointer',
              marginBottom: 'var(--spacing-xl)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.transform = 'none'; }}
          >
            {/* Hero Image */}
            <div style={{
              width: '100%',
              height: '240px',
              backgroundImage: `url(${filtered[0].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }} />
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: '10px',
                  backgroundColor: categoryColors[filtered[0].category]?.bg,
                  color: categoryColors[filtered[0].category]?.text,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}>
                  {filtered[0].category}
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)' }}>
                  {filtered[0].date} · {filtered[0].readTime}
                </span>
              </div>
              <h2 style={{
                fontSize: '1.4rem',
                fontWeight: 800,
                color: 'var(--color-text-primary)',
                lineHeight: 1.25,
                marginBottom: '10px',
                letterSpacing: '-0.02em',
              }}>
                {filtered[0].title}
              </h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '14px' }}>
                {filtered[0].excerpt}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                  src={filtered[0].author.avatar}
                  alt={filtered[0].author.name}
                  style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-primary)', fontWeight: 600 }}>{filtered[0].author.name}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-text-tertiary)' }}>{filtered[0].author.role}</span>
              </div>
            </div>
          </div>
        )}

        {/* Grid of remaining posts */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px',
        }}>
          {filtered.slice(1).map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.transform = 'none'; }}
            >
              <div style={{
                width: '100%',
                height: '160px',
                backgroundImage: `url(${post.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }} />
              <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <span style={{
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '8px',
                    backgroundColor: categoryColors[post.category]?.bg,
                    color: categoryColors[post.category]?.text,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}>
                    {post.category}
                  </span>
                  <span style={{ fontSize: '0.68rem', color: 'var(--color-text-tertiary)' }}>{post.readTime}</span>
                </div>
                <h3 style={{
                  fontSize: '1.02rem',
                  fontWeight: 750,
                  color: 'var(--color-text-primary)',
                  lineHeight: 1.3,
                  marginBottom: '8px',
                }}>
                  {post.title}
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, flex: 1, marginBottom: '14px' }}>
                  {post.excerpt}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <span style={{ fontSize: '0.72rem', color: 'var(--color-text-primary)', fontWeight: 600 }}>{post.author.name}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Reader Overlay */}
      {selectedPost && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedPost(null); }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            overflowY: 'auto',
            padding: '40px 16px',
          }}
        >
          <div
            ref={readerRef}
            style={{
              width: '100%',
              maxWidth: '680px',
              backgroundColor: 'var(--color-bg)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
              animation: 'fadeInUp 0.25s ease-out',
            }}
          >
            {/* Close Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px 20px 0' }}>
              <button
                onClick={() => setSelectedPost(null)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-surface)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-text-secondary)',
                  fontSize: '1.1rem',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-accent-subtle)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-surface)'; }}
              >
                ✕
              </button>
            </div>

            {/* Hero Image */}
            <div style={{
              width: '100%',
              height: '280px',
              backgroundImage: `url(${selectedPost.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              margin: '12px 0 0 0',
            }} />

            {/* Article Content */}
            <div style={{ padding: '32px 32px 40px' }}>
              {/* Category + Date */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <span style={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: '10px',
                  backgroundColor: categoryColors[selectedPost.category]?.bg,
                  color: categoryColors[selectedPost.category]?.text,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}>
                  {selectedPost.category}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                  {selectedPost.date} · {selectedPost.readTime}
                </span>
              </div>

              {/* Title */}
              <h1 style={{
                fontSize: 'clamp(1.4rem, 4vw, 1.8rem)',
                fontWeight: 800,
                color: 'var(--color-text-primary)',
                lineHeight: 1.2,
                letterSpacing: '-0.03em',
                marginBottom: '20px',
              }}>
                {selectedPost.title}
              </h1>

              {/* Author Card */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 16px',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '10px',
                marginBottom: '32px',
              }}>
                <img
                  src={selectedPost.author.avatar}
                  alt={selectedPost.author.name}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{selectedPost.author.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{selectedPost.author.role}</div>
                </div>
              </div>

              {/* Rendered Content */}
              <div>
                {renderContent(selectedPost.content)}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
