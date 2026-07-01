'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useApp } from '../context/AppContext';

// Lazy-load heavy interactive components to improve First Contentful Paint (FCP)
const HeroMap = dynamic(
  () => import('../components/HeroMap').then((mod) => mod.HeroMap),
  {
    ssr: false,
    loading: () => (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-secondary)', fontSize: '0.9rem', opacity: 0.5 }}>
        Loading map…
      </div>
    ),
  }
);

const VerificationVisualizer = dynamic(
  () => import('../components/VerificationVisualizer').then((mod) => mod.VerificationVisualizer),
  {
    ssr: false,
    loading: () => (
      <div style={{ width: '100%', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-secondary)', fontSize: '0.9rem', opacity: 0.5 }}>
        Loading verification flow…
      </div>
    ),
  }
);

const WhatsAppDemo = dynamic(
  () => import('../components/WhatsAppDemo').then((mod) => mod.WhatsAppDemo),
  {
    ssr: false,
    loading: () => (
      <div style={{ width: '100%', minHeight: '480px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-secondary)', fontSize: '0.9rem', opacity: 0.5 }}>
        Loading chat demo…
      </div>
    ),
  }
);

// Reusable animated count-up card for survey statistics
const StatCard: React.FC<{ target: number; suffix?: string; desc: string }> = ({ target, suffix = '%', desc }) => {
  const [value, setValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let start = 0;
    const duration = 1500; // Animation duration in milliseconds
    const frameRate = 1000 / 60; // 60 FPS
    const totalFrames = Math.round(duration / frameRate);
    const increment = target / totalFrames;
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      start += increment;
      if (frame >= totalFrames) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.floor(start));
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [hasAnimated, target]);

  return (
    <div className="stat-card" ref={cardRef}>
      <div className="stat-number">
        {value}
        {suffix}
      </div>
      <p className="stat-desc">{desc}</p>
    </div>
  );
};


// Reusable partner logo component that displays the text name of the partner
const PartnerLogo: React.FC<{ domain: string; name: string }> = ({ name }) => {
  return (
    <div className="partner-logo-item" title={name}>
      <span className="partner-logo-text">{name}</span>
    </div>
  );
};

export default function Home() {
  const { theme, mounted } = useApp();

  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [activeProject, setActiveProject] = useState<any>(null);

  const showcaseProfiles = [
    {
      id: 'chidi',
      fullName: 'Chidi Chikwe',
      avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200',
      country: 'Nigeria',
      techFocus: 'Junior Frontend Developer',
      skills: ['React', 'TypeScript', 'TailwindCSS', 'Vite', 'HTML5', 'CSS3'],
      percentile: '92nd Percentile',
      buildScore: '1,240',
      projectsCount: '3 Verified',
      peerVouched: '8 Vouched',
      bio: 'Computer Science sophomore at UNN building lightweight, responsive web apps. Focused on optimizing bundle sizes and page performance for low-bandwidth networks.',
      projects: [
        {
          id: 'chidi-rideshare',
          title: 'Campus RideShare Dashboard',
          isAudited: true,
          verifiedSkills: ['React', 'TypeScript', 'TailwindCSS', 'Vite'],
          githubUrl: 'https://github.com/chidi-chikwe/campus-rideshare',
          aiSummary: `### Project Overview
A lightweight, mobile-first web dashboard designed for university students to coordinate ride-sharing and fuel splits on campus. Optimized for low-end mobile viewports and spotty campus networks.

### Technology & Architecture
* **Vite + React**: Chosen for lightning-fast build speeds, hot module replacement, and ultra-lightweight client bundles.
* **Local Storage Caching**: Keeps the user's active ride history available offline to survive campus Wi-Fi dropouts.

### Role & Individual Impact
* Engineered the responsive grid layouts and search filter controls.
* Handled local state management, decreasing redundant server data requests by 45%.`
        }
      ]
    },
    {
      id: 'naledi',
      fullName: 'Naledi Dube',
      avatarUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200',
      country: 'South Africa',
      techFocus: 'Junior UI/UX Designer',
      skills: ['Figma', 'UI/UX Design', 'User Research', 'Wireframing', 'Prototyping'],
      percentile: '95th Percentile',
      buildScore: '1,310',
      projectsCount: '3 Verified',
      peerVouched: '14 Vouched',
      bio: 'Information Systems student at UCT. Passionate about accessible mobile interfaces, high-contrast usability, and icon-driven layouts for informal retail merchants.',
      projects: [
        {
          id: 'naledi-merchant',
          title: 'MoMo Merchant App Design',
          isAudited: true,
          verifiedSkills: ['Figma', 'UI/UX Design', 'User Research'],
          figmaUrl: 'https://figma.com/file/momo-merchant-design',
          aiSummary: `### Project Overview
A clean, high-contrast mobile app prototype designed for small informal merchants to track mobile money cashouts and stock levels at their kiosks.

### Design & UX Decisions
* **High-Contrast Palette**: Optimized for readability on low-cost LCD screens under bright outdoor sunlight.
* **Frictionless Tap Targets**: Custom buttons designed at a minimum of 56px to ensure easy selection on the move.
* **Icon-Driven Navigation**: Minimizes language barriers for non-tech-savvy shop owners.

### Role & Individual Impact
* Conducted user research interviews with 5 local shop owners in Cape Town to identify layout blockers.
* Designed the complete high-fidelity mobile prototype, custom icons, and wireframe flows in Figma.`
        }
      ]
    },
    {
      id: 'kofi',
      fullName: 'Kofi Boateng',
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
      country: 'Ghana',
      techFocus: 'Junior Backend Developer',
      skills: ['Node.js', 'Express', 'SQLite', 'Git', 'REST APIs', 'SQL'],
      percentile: '88th Percentile',
      buildScore: '1,050',
      projectsCount: '4 Verified',
      peerVouched: '9 Vouched',
      bio: 'Self-taught backend builder and junior systems engineer. Focused on writing clean, self-contained Express APIs and lightweight database layers for local commerce.',
      projects: [
        {
          id: 'kofi-market',
          title: 'Campus Marketplace API',
          isAudited: true,
          verifiedSkills: ['Node.js', 'Express', 'SQLite', 'API Design'],
          githubUrl: 'https://github.com/kofi-boateng/campus-market-api',
          aiSummary: `### Project Overview
A lightweight, self-contained REST API powering a student-to-student marketplace for buying and selling textbooks, electronics, and dorm items.

### Technology & Architecture
* **Node.js & Express**: Provides a fast, minimal backend server with minimal memory footprint.
* **SQLite**: A self-contained, serverless database requiring zero-configuration, ideal for lightweight, low-cost hosting.
* **Joi Validation**: Strictly validates request body formats to prevent database injection or malformed data records.

### Role & Individual Impact
* Designed the database schema and implemented item CRUD endpoints.
* Wrote custom input validation middleware to block malformed requests, securing user submissions.`
        }
      ]
    },
    {
      id: 'fatou',
      fullName: 'Fatoumata Bah',
      avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200',
      country: 'Senegal',
      techFocus: 'Junior Full-Stack Developer',
      skills: ['React', 'JavaScript', 'MongoDB', 'CSS3', 'Node.js', 'Express'],
      percentile: '90th Percentile',
      buildScore: '1,180',
      projectsCount: '5 Verified',
      peerVouched: '11 Vouched',
      bio: 'Recent software engineering bootcamp graduate. Enjoys building interactive web portals, structured NoSQL schemas, and clean user-matching logic.',
      projects: [
        {
          id: 'fatou-buddy',
          title: 'Study Buddy Matcher',
          isAudited: true,
          verifiedSkills: ['React', 'JavaScript', 'MongoDB', 'CSS'],
          githubUrl: 'https://github.com/fatou-bah/study-buddy',
          aiSummary: `### Project Overview
A full-stack web application that helps students form peer study groups based on course codes, availability, and language preferences.

### Technology & Architecture
* **React Frontend**: Offers a dynamic, single-page interface for finding and matching peers.
* **MongoDB**: A flexible NoSQL database to store dynamic user profiles and group preferences.

### Role & Individual Impact
* Built the interactive group matching card deck and search filters.
* Structured the MongoDB collections and handled API integration for matching queries.`
        }
      ]
    }
  ];

  // Helper to render case study markdown
  const renderMarkdown = (text: string) => {
    if (!text) return null;
    let inList = false;
    const listItems: React.ReactNode[] = [];
    const elements: React.ReactNode[] = [];

    const lines = text.split('\n');

    lines.forEach((line, idx) => {
      const isHeader = line.startsWith('### ');
      const isBullet = line.startsWith('* ') || line.startsWith('- ');

      if (inList && !isBullet) {
        elements.push(<ul key={`list-${idx}`}>{[...listItems]}</ul>);
        listItems.length = 0;
        inList = false;
      }

      if (isHeader) {
        elements.push(<h5 key={idx} style={{ fontWeight: 700, margin: '10px 0 4px 0', borderBottom: '1px solid var(--color-border)', paddingBottom: '2px' }}>{line.substring(4)}</h5>);
      } else if (isBullet) {
        inList = true;
        listItems.push(<li key={idx} style={{ fontSize: '0.8rem', marginLeft: '12px' }}>{line.substring(2)}</li>);
      } else if (line.trim() === '') {
        // Skip
      } else {
        elements.push(<p key={idx} style={{ fontSize: '0.8rem', margin: '4px 0', color: 'var(--color-text-secondary)' }}>{line}</p>);
      }
    });

    if (inList) {
      elements.push(<ul key="list-final">{[...listItems]}</ul>);
    }

    return <div className="markdown-render">{elements}</div>;
  };

  // Scroll reveal trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.01, rootMargin: '0px 0px -20px 0px' }
    );

    const observe = () => {
      const elements = document.querySelectorAll('.scroll-reveal:not(.revealed)');
      elements.forEach((el) => observer.observe(el));
    };

    // Initial observe
    observe();

    // Delayed re-scan to catch any late-rendered elements
    const timer = setTimeout(observe, 500);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 'var(--spacing-lg) var(--spacing-md)' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '850px', margin: '0 auto' }}>


          <h1 style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(0.95rem, 5vw, 3.5rem)', fontWeight: 700, lineHeight: 1.15, color: 'var(--color-text-primary)', marginBottom: 'var(--spacing-md)', letterSpacing: '-0.02em' }}>
            Connecting Africa's Top Talent
            <br />
            <span style={{ color: 'var(--color-accent)', fontSize: '0.55em', fontStyle: 'normal', fontWeight: '600', fontFamily: 'var(--font-body), system-ui, sans-serif' }}>
              Create and verify your portfolio easily. Get hired by top African companies and StartUps.
            </span>
          </h1>

          <p style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', color: 'var(--color-text-primary)', lineHeight: 1.6, maxWidth: '750px', margin: '0 auto var(--spacing-xl) auto' }}>
            Africa has the talent and the demand, yet collaboration is at an all-time low. Borderline is building the trust layer for Africa's tech and creative talent, using AI to verify skills and making recruitment easier. Build your startup and hire teams, continentally.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', margin: '0 auto var(--spacing-xl) auto' }}>
            {[
              'Access to borderless opportunities',
              'AI powered Skill verification',
              'Apply and get hired easily'
            ].map((text, idx) => (
              <div key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>{text}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: 'var(--spacing-xl)' }}>
            <Link href="/recruiter" className="btn btn-primary" id="btn-hero-recruiter" style={{ borderRadius: '8px', padding: '12px 28px', fontSize: '0.95rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center' }}>
              <span className="hero-cta-desktop">Start Hiring</span>
              <span className="hero-cta-mobile">Start Hiring  </span>
              <span style={{ marginLeft: '8px' }}>➔</span>
            </Link>
            <Link href="/talent" className="btn btn-secondary" id="btn-hero-talent" style={{ borderRadius: '8px', padding: '12px 28px', fontSize: '0.95rem', fontWeight: 600 }}>
              Create Your Profile
            </Link>
          </div>

          {/* Dedicated Map Viewport Section */}
          <div className="hero-map-viewport" style={{
            width: '100%',
            maxWidth: '1400px',
            height: 'clamp(500px, 80vh, 900px)',
            margin: 'var(--spacing-md) auto 0 auto',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'visible',
          }}>
            <HeroMap />
          </div>
        </div>
      </section>

      {/* Scroll-Stacked Profile Cards Section */}
      <section className="card-stack-section" style={{ backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto var(--spacing-xl) auto' }}>
            <span className="feature-tag" style={{ color: 'var(--color-accent)', fontWeight: 'bold', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
              PROOF OF WORK
            </span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '8px', color: 'var(--color-text-primary)' }}>
              Meet Verified Builders & Creatives
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem', marginTop: '6px' }}>
              Scroll down to see real compiled portfolios — from full-stack engineers to brand designers — with automated verification audits and performance scores. Click a card to view their case studies.
            </p>
          </div>

          <div className="card-stack-container">
            {showcaseProfiles.map((profile) => (
              <div 
                key={profile.id} 
                className="sticky-stacked-card" 
                onClick={() => {
                  setSelectedProfile(profile);
                  setActiveProject(profile.projects[0]);
                }}
                style={{ padding: 'var(--spacing-lg)', textAlign: 'left' }}
              >
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span className="badge badge-verified" style={{ fontSize: '0.7rem', padding: '4px 8px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 11 2 2 4-4"/>
                    </svg>
                    AI & Peer-Verified
                  </span>
                  
                  {/* Small avatar group on top right */}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {['https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=40', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=40', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=40'].map((url, idx) => (
                      <img 
                        key={idx} 
                        src={url} 
                        alt="Auditor Avatar" 
                        style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid var(--color-surface-elevated)', marginLeft: idx > 0 ? '-6px' : '0', objectFit: 'cover' }} 
                      />
                    ))}
                  </div>
                </div>

                {/* Avatar and name */}
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '16px' }}>
                  <img 
                    src={profile.avatarUrl} 
                    alt={profile.fullName}
                    style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--color-border)' }}
                  />
                  <div>
                    <div style={{ fontWeight: '800', fontSize: '1.05rem', color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {profile.fullName}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 11 2 2 4-4"/>
                      </svg>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center' }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                      {profile.country} • {profile.techFocus}
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  {profile.skills.map((s, i) => (
                    <span key={i} className="badge badge-accent" style={{ fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px' }}>
                      {s}
                    </span>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="capability-bar-container">
                  <div className="capability-bar-label">
                    <span>AI & Peer-Verified Capability</span>
                    <span style={{ color: 'var(--color-accent)' }}>{profile.percentile}</span>
                  </div>
                  <div className="capability-bar-track">
                    <div className="capability-bar-fill" style={{ width: `${profile.percentile.replace(/\D/g, '') || '90'}%` }}></div>
                  </div>
                </div>

                {/* Stats columns */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginTop: '16px' }}>
                  <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.6rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', fontWeight: 700 }}>Build Score</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--color-text-primary)', marginTop: '2px' }}>{profile.buildScore}</div>
                  </div>
                  <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.6rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', fontWeight: 700 }}>Peer Reviews</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--color-accent-secondary)', marginTop: '2px' }}>{profile.peerVouched || '8 Vouched'}</div>
                  </div>
                  <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.6rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', fontWeight: 700 }}>Projects</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--color-accent)', marginTop: '2px' }}>{profile.projectsCount}</div>
                  </div>
                </div>
                {/* Crawlable link to the public profile for SEO optimization */}
                <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--color-border)', paddingTop: '12px' }}>
                  <Link 
                    href={`/in/${profile.id}`} 
                    style={{ fontSize: '0.8rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none', color: 'var(--color-accent)' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Public Profile <span style={{ marginLeft: '2px' }}>➔</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grayscale partner logos list */}
      <section className="scroll-reveal" style={{ borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', padding: 'var(--spacing-xl) 0' }}>
        <div className="container">
          <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-tertiary)', textAlign: 'center', letterSpacing: '0.15em', marginBottom: 'var(--spacing-md)' }}>
            Trusted by Leading Teams & Academic Institutions from San Francisco to Lusaka
          </div>
          <div className="partner-logos-marquee">
            <div className="partner-logos-track">
              <div className="partner-logos-set">
                {/* Tech Companies */}
                <PartnerLogo domain="google.com" name="Google" />
                <PartnerLogo domain="mtn.co.za" name="MTN" />
                <PartnerLogo domain="yango.com" name="Yango" />
                <PartnerLogo domain="telecel.com" name="Telecel" />
                <PartnerLogo domain="flywheel.com" name="Flywheel" />
                <PartnerLogo domain="alxafrica.com" name="ALX" />
                <PartnerLogo domain="kadamobility.com" name="KADA Mobility" />

                {/* Academic Institutions */}
                <PartnerLogo domain="gctu.edu.gh" name="GCTU" />
                <PartnerLogo domain="unza.zm" name="UNZA" />
                <PartnerLogo domain="uem.mz" name="UEM" />
                <PartnerLogo domain="inphb.ci" name="INPHB" />
              </div>
              <div className="partner-logos-set">
                {/* Tech Companies */}
                <PartnerLogo domain="google.com" name="Google" />
                <PartnerLogo domain="mtn.co.za" name="MTN" />
                <PartnerLogo domain="yango.com" name="Yango" />
                <PartnerLogo domain="telecel.com" name="Telecel" />
                <PartnerLogo domain="flywheel.com" name="Flywheel" />
                <PartnerLogo domain="alxafrica.com" name="ALX" />
                <PartnerLogo domain="kadamobility.com" name="KADA Mobility" />

                {/* Academic Institutions */}
                <PartnerLogo domain="gctu.edu.gh" name="GCTU" />
                <PartnerLogo domain="unza.zm" name="UNZA" />
                <PartnerLogo domain="uem.mz" name="UEM" />
                <PartnerLogo domain="inphb.ci" name="INPHB" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-us-section scroll-reveal">
        <div className="container">
          <div className="split-features-grid">
            {/* Left Column: Text Content */}
            <div>
              <span className="feature-tag" style={{ color: 'var(--color-accent-secondary)' }}>
                About Borderline
              </span>
              <h2 style={{ fontSize: '2.0rem', fontWeight: 800, marginTop: '8px', marginBottom: '16px', lineHeight: 1.2, color: 'var(--color-text-primary)' }}>
                Bridging the gap between capability and Pan-African opportunity.
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '24px' }}>
                We believe capability is evenly distributed across Africa, but trust and infrastructure are not. Borderline builds the trust network that enables pan-African talent to thrive continentally. Access Job opportunities, Hire teams from anywhere, and transact seamlessly across borders.
              </p>

              <ul className="about-checklist">
                <li className="about-checklist-item">
                  <div className="about-checklist-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div className="about-checklist-text">
                    <strong>Hire verified talent across the continent:</strong> Vetted code repos, live deployments, and verified creative portfolios ensuring that you get to work with only the most qualified individuals.
                  </div>
                </li>
                <li className="about-checklist-item">
                  <div className="about-checklist-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div className="about-checklist-text">
                    <strong>Access thousands of gigs:</strong> A frictionless pipeline connecting junior builders, designers, and freelancers to active contracts.
                  </div>
                </li>
                <li className="about-checklist-item">
                  <div className="about-checklist-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div className="about-checklist-text">
                    <strong>Partnerships with leaders:</strong> Backed by key academic hubs, tech ecosystems, and regional companies to build long-term pipelines.
                  </div>
                </li>
                <li className="about-checklist-item">
                  <div className="about-checklist-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div className="about-checklist-text">
                    <strong>AI Proactive Applications:</strong> Our platform's AI matches your validated capabilities to active micro-gigs and automatically applies on your behalf, guaranteeing you never miss an opening.
                  </div>
                </li>
              </ul>

              <div style={{ marginTop: '32px' }}>
                <Link href="/recruiter" className="about-learn-more">
                  Learn more about our hiring pipeline <span>➔</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Visual Showcase Card */}
            <div>
              <div className="about-image-wrapper">
                <div className="about-image-bg"></div>
                <img 
                  src="/green-coffee-borderline.jpeg" 
                  alt="Keziah Tsepiso - Freelancer, Creative Leader"
                />
                <div className="about-floating-card">
                  <span className="about-floating-name">Keziah Tsepiso</span>
                  <span className="about-floating-title">Freelancer, Creative Leader</span>
                  <div className="about-floating-links">
                    <a href="https://figma.com/@keziah" target="_blank" rel="noopener noreferrer" className="about-floating-link">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/>
                        <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/>
                        <path d="M12 9h3.5a3.5 3.5 0 1 1-3.5 3.5V9z"/>
                        <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/>
                        <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/>
                      </svg>
                      <span>Figma</span>
                    </a>
                    <a href="https://linkedin.com/in/keziah" target="_blank" rel="noopener noreferrer" className="about-floating-link">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                        <rect x="2" y="9" width="4" height="12"/>
                        <circle cx="4" cy="4" r="2"/>
                      </svg>
                      <span>LinkedIn</span>
                    </a>
                    <a href="https://instagram.com/keziah" target="_blank" rel="noopener noreferrer" className="about-floating-link">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                      </svg>
                      <span>Instagram</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Core Problem Block */}
      <section className="stats-section scroll-reveal">
        <div className="container">
          {/* --- Infrastructure Gap Story Block --- */}
          <div className="hero-badge" style={{ borderColor: 'var(--color-danger)', color: 'var(--color-danger)', backgroundColor: 'transparent', display: 'inline-flex', margin: '0 auto var(--spacing-sm) auto' }}>
            <span>The Infrastructure Gap</span>
          </div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            A Story of Untapped Potential<br />
            <span style={{ color: 'var(--color-accent)' }}>Africa’s talent pool is booming, but the ecosystem can’t keep up.</span>
          </h2>
          <p style={{ maxWidth: '700px', margin: '0 auto var(--spacing-lg)', color: 'var(--color-text-secondary)', textAlign: 'center' }}>
            <em>Our 2026 BorderLine survey of 100+ tech and creative students across 6 African nations uncovered three systemic choke points that hinder growth.</em> 
          </p>
          <div className="stats-grid">
            <StatCard
              target={70}
              desc="excluded by arbitrary years-of-experience requirements"
            />
            <StatCard
              target={92}
              desc="have no structured way to prove what they can build to outsiders"
            />
            <StatCard
              target={59}
              desc="face daily connectivity and power barriers that hide their output"
            />
          </div>
        </div>
      </section>

      {/* Feature Section: Protocol Split Block (Hunter Green BG) */}
      <section className="features-section-darkgreen scroll-reveal">
        <div className="container">
          <div className="split-features-grid">
            {/* Left side text */}
            <div>
              <div className="feature-tag" style={{ color: 'var(--color-accent)' }}>
                THE PROTOCOL APPROACH
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 'var(--spacing-md)', color: 'var(--color-text-primary)' }}>
                Solving trust at the protocol level
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: 'var(--spacing-lg)' }}>
                Traditional work platforms are failing the modern African market. BorderLine gives inexperienced but skilled talents a chance to prove themselves.
              </p>

              <div className="feature-bullet-list">
                <div className="feature-bullet-item">
                  <div className="feature-bullet-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 11 2 2 4-4"/>
                    </svg>
                  </div>
                  <div className="feature-bullet-text">
                    <h4>Proof of Skill (PoS)</h4>
                    <p>Our AI engine analyzes GitHub repositories, commits, designs and projects to verify technical and creative ability and assign a confidence score.</p>
                  </div>
                </div>

                <div className="feature-bullet-item">
                  <div className="feature-bullet-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </div>
                  <div className="feature-bullet-text">
                    <h4>Expert Endorsement</h4>
                    <p>Peer-vetted skills from top-tier engineers already in the global workforce ensure human quality control.</p>
                  </div>
                </div>

                <div className="feature-bullet-item">
                  <div className="feature-bullet-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                    </svg>
                  </div>
                  <div className="feature-bullet-text">
                    <h4>Instant Hireability</h4>
                    <p>Move from discovery to contract in under 24 hours with integrated legal and payroll infrastructure.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side metrics cards stack */}
            <div className="metrics-grid">
              <div className="metric-card-box">
                <div className="metric-card-num">10M+</div>
                <div className="metric-card-label"><strong>Potential Talents</strong>. Emerging digital builders across the continent.</div>
              </div>
              <div className="metric-card-box">
                <div className="metric-card-num green">$4B+</div>
                <div className="metric-card-label"><strong>Potential Earnings</strong>. Estimated addressable opportunity in the African digital economy.</div>
              </div>
              <div className="metric-card-box">
                <div className="metric-card-num">24h</div>
                <div className="metric-card-label"><strong>Estimated Match Time</strong> between job posting and candidate review.</div>
              </div>
              <div className="metric-card-box">
                <div className="metric-card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '8px', color: 'var(--color-accent)' }}>
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                </div>
                <div className="metric-card-num" style={{ fontSize: '1.2rem' }}>AI-Driven Discovery</div>
                <div className="metric-card-label">Semantic search across the entire verified repository.</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 'var(--spacing-xxxl)' }}>
            <VerificationVisualizer />
          </div>
        </div>
      </section>

      {/* Low-Infrastructure Access Section */}
      <section className="whatsapp-section scroll-reveal" style={{ backgroundColor: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)', padding: 'var(--spacing-xxl) 0' }}>
        <div className="container">
          <div className="split-features-grid" style={{ alignItems: 'center' }}>
            {/* Phone mockup on the left/top */}
            <div>
              <WhatsAppDemo />
            </div>
            {/* Text on the right/bottom */}
            <div>
              <div className="feature-tag" style={{ color: 'var(--color-accent)' }}>
                NO INFRASTRUCTURE REQUIRED
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 'var(--spacing-md)', color: 'var(--color-text-primary)' }}>
                Access global opportunities even on a 2G connection.
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: 'var(--spacing-lg)' }}>
                We built BorderLine for the realities of the African tech ecosystem. Not everyone has fiber internet or a high-end laptop open 24/7.
              </p>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
                Once your portfolio is AI-verified, you can manage your entire career via WhatsApp. Receive micro-gig alerts, accept contracts, and track Mobile Money payouts with simple text commands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Personas Value Props */}
      <section className="stats-section scroll-reveal" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container">
          <div className="section-label" style={{ color: 'var(--color-accent-secondary)' }}>Target Ecosystem Value</div>
          <h2 className="section-title">A Dual-Sided Workforce Bridge</h2>

          <div className="features-grid" style={{ gap: 'var(--spacing-xl)' }}>
            {/* Builders */}
            <div className="card">
              <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent)', marginBottom: 'var(--spacing-md)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-accent)' }}>
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                For Technologists, Creatives & Students
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                <li style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '3px', flexShrink: 0, color: 'var(--color-accent)' }}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  <span><strong>Turn projects into proof:</strong> AI converts your code repos, design files, and creative portfolios into structured case studies employers trust.</span>
                </li>
                <li style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '3px', flexShrink: 0, color: 'var(--color-accent)' }}><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/></svg>
                  <span><strong>Access without infrastructure:</strong> Update your profile, receive matches, and check payout stats via text.</span>
                </li>
                <li style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '3px', flexShrink: 0, color: 'var(--color-accent)' }}><rect x="2" y="4" width="20" height="16" rx="2" ry="2"/><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  <span><strong>Earn from day one:</strong> Instantly apply to verified regional micro-gigs and global remote contracts.</span>
                </li>
              </ul>
            </div>

            {/* Recruiters */}
            <div className="card">
              <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent-secondary)', marginBottom: 'var(--spacing-md)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-accent-secondary)' }}>
                  <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="22" x2="9" y2="16"/><line x1="15" y1="22" x2="15" y2="16"/><path d="M9 16h6"/><path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01"/>
                </svg>
                For Recruiters & Startups
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                <li style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '3px', flexShrink: 0, color: 'var(--color-accent-secondary)' }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 11 2 2 4-4"/></svg>
                  <span><strong>Zero vetting overhead:</strong> View AI-structured summaries and automated codebase audits directly on candidate cards.</span>
                </li>
                <li style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '3px', flexShrink: 0, color: 'var(--color-accent-secondary)' }}><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
                  <span><strong>HR as a Service:</strong> Cross-border compliance, remote contracts, and micro-payments supporting Mobile Money.</span>
                </li>
                <li style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '3px', flexShrink: 0, color: 'var(--color-accent-secondary)' }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <span><strong> Jobs & Internships:</strong> Build companies, hire verified talent, and access potential direct hiring channels.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container scroll-reveal" style={{ padding: '0 var(--spacing-lg)' }}>
        <div className="cta-banner-card" style={{ background: 'var(--color-accent-gradient)', color: '#ffffff', borderColor: 'transparent' }}>
          <h3 style={{ fontFamily: 'var(--font-serif), Georgia, serif', color: '#ffffff', fontWeight: '700', fontSize: '2rem' }}>
            Ready to bridge the gap between capability and opportunity?
          </h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: '500' }}>
            Join the trust layer bridging early-career engineers, designers, and creatives with the companies that need their firepower.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-md)', flexWrap: 'wrap' }}>
            <Link href="/talent" className="btn btn-secondary" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text-primary)', borderColor: 'transparent' }}>
              Build Your Profile
            </Link>
            <Link href="/recruiter" className="btn btn-secondary" style={{ color: 'var(--color-bg)', borderColor: 'var(--color-bg)', backgroundColor: 'transparent' }}>
              Hire Talent
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer" style={{ padding: 'var(--spacing-xxl) 0 var(--spacing-xl) 0', backgroundColor: 'var(--color-surface)', textAlign: 'left' }}>
        <div className="container">
          <div className="footer-cols-grid">
            {/* Col 1 */}
            <div className="footer-col">
              <div className="footer-logo" style={{ justifyContent: 'flex-start', margin: 0 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M6 3h7c2.76 0 5 2.24 5 5 0 1.83-1 3.43-2.5 4.25 1.5.82 2.5 2.42 2.5 4.25 0 2.76-2.24 5-5 5H6V3zm4 3v4h3c1.1 0 2-.9 2-2s-.9-2-2-2h-3zm0 7v4h3c1.1 0 2-.9 2-2s-.9-2-2-2h-3z" fill="currentColor"/>
                  <rect x="5" y="21" width="14" height="2.5" rx="1.25" fill="var(--color-accent)"/>
                </svg>
                <span className="logo-text" style={{ fontSize: '1.25rem' }}>Border<span>Line</span></span>
              </div>
              <p className="footer-desc">
                Creating the world's most trusted engineering talent marketplace by verifying raw capability with AI-driven proof of work.
              </p>
              <div className="footer-socials" style={{ display: 'flex', gap: '8px' }}>
                <a href="#" className="footer-social-icon" aria-label="GitHub">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                </a>
                <a href="#" className="footer-social-icon" aria-label="Twitter">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
                <a href="#" className="footer-social-icon" aria-label="LinkedIn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              </div>
            </div>

            {/* Col 2 */}
            <div className="footer-col">
              <h4>Product</h4>
              <div className="footer-col-links">
                <Link href="/recruiter">Talent Discovery</Link>
                <Link href="/development">Verification Protocol</Link>
                <Link href="/admin">Compliance Engine</Link>
                <Link href="/development">API for Hiring</Link>
              </div>
            </div>

            {/* Col 3 */}
            <div className="footer-col">
              <h4>Company</h4>
              <div className="footer-col-links">
                <Link href="/development">About Us</Link>
                <Link href="/manifesto">Our Manifesto</Link>
                <Link href="/development">Careers</Link>
                <Link href="/development">Newsroom</Link>
              </div>
            </div>

            {/* Col 4 */}
            <div className="footer-col">
              <h4>Join the Network</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                Get the latest updates on the African tech ecosystem and the future of global work.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="newsletter-form">
                <input 
                  type="email" 
                  className="newsletter-input" 
                  placeholder="name@company.com" 
                  required
                />
                <button type="submit" className="newsletter-submit">Subscribe</button>
              </form>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--spacing-md)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', fontSize: '0.8rem', color: 'var(--color-text-tertiary)' }}>
            <div>
              © 2026 BorderLine Technologies Inc. All rights reserved.
            </div>
            <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
              <Link href="/development">Privacy Policy</Link>
              <Link href="/development">Terms of Service</Link>
              <Link href="/development">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Slide-over/Inline Detail Drawer Panel */}
      {selectedProfile && (
        <div className="drawer-backdrop" id="recruiter-drawer-backdrop" onClick={() => setSelectedProfile(null)}>
          <div className="drawer-panel" id="recruiter-drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button className="drawer-close" id="btn-close-candidate-drawer" onClick={() => setSelectedProfile(null)}>✕</button>
              <span className="badge badge-verified" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                AI-Verified Portfolio
              </span>
            </div>

            <div style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--spacing-md)', marginTop: '10px' }}>
              <img 
                src={selectedProfile.avatarUrl} 
                alt={selectedProfile.fullName} 
                style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }}
                id="drawer-candidate-avatar"
              />
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ fontSize: '1.25rem' }} id="drawer-candidate-name">{selectedProfile.fullName}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{selectedProfile.techFocus}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }} id="drawer-candidate-contact">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>{selectedProfile.country}</span>
                </p>
                {/* Dynamic crawlable public link in the drawer */}
                <Link 
                  href={`/in/${selectedProfile.id}`}
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '4px', 
                    fontSize: '0.75rem', 
                    color: 'var(--color-accent)', 
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                  id={`link-view-public-profile-${selectedProfile.id}`}
                >
                  View Public Profile <span style={{ marginLeft: '2px' }}>➔</span>
                </Link>
              </div>
            </div>

            <div style={{ textAlign: 'left', marginTop: '15px' }}>
              <h4 className="switcher-title" style={{ marginBottom: '8px' }}>Developer Bio</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.5' }} id="drawer-candidate-bio">{selectedProfile.bio}</p>
            </div>

            <div style={{ textAlign: 'left', marginTop: '15px' }}>
              <h4 className="switcher-title" style={{ marginBottom: '8px' }}>Verified Skillset</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }} id="drawer-candidate-skills">
                {selectedProfile.skills.map((s: string, i: number) => (
                  <span key={i} className="badge badge-verified" style={{ fontSize: '0.7rem' }}>{s}</span>
                ))}
              </div>
            </div>

            {/* Case Studies */}
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--spacing-md)', marginTop: '20px', textAlign: 'left' }} id="drawer-case-studies-block">
              <h4 className="switcher-title" style={{ marginBottom: '10px' }}>AI-Verified Case Studies</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} id="drawer-case-studies-container">
                <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }} id="drawer-projects-tabs">
                  {selectedProfile.projects.map((p: any) => (
                    <button
                      key={p.id}
                      id={`btn-project-tab-${p.id}`}
                      onClick={() => setActiveProject(p)}
                      className={`btn ${activeProject?.id === p.id ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ padding: '4px 8px', fontSize: '0.75rem', whiteSpace: 'nowrap' }}
                    >
                      {p.title}
                    </button>
                  ))}
                </div>

                {activeProject && (
                  <div style={{ padding: '12px', backgroundColor: 'var(--color-surface-elevated)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', maxHeight: '250px', overflowY: 'auto' }} id="drawer-case-study-body">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <h5 style={{ fontWeight: 700, fontSize: '0.85rem' }}>{activeProject.title}</h5>
                      <span style={{ fontSize: '0.6rem', color: 'var(--color-accent)' }}>✓ Audited</span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                      {activeProject.verifiedSkills.map((s: string, i: number) => (
                        <span key={i} className="badge badge-accent" style={{ fontSize: '0.65rem', padding: '1px 4px' }}>{s}</span>
                      ))}
                    </div>
                    {renderMarkdown(activeProject.aiSummary)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
