'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '../context/AppContext';

// Reusable animated count-up card for survey statistics
const StatCard: React.FC<{ target: number; suffix?: string; desc: string }> = ({ target, suffix = '%', desc }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
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
  }, [target]);

  return (
    <div className="stat-card">
      <div className="stat-number">
        {value}
        {suffix}
      </div>
      <p className="stat-desc">{desc}</p>
    </div>
  );
};

export default function Home() {
  const { theme, mounted } = useApp();

  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [activeProject, setActiveProject] = useState<any>(null);

  const showcaseProfiles = [
    {
      id: 'kwame',
      fullName: 'Kwame Mensah',
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150',
      country: 'Ghana',
      techFocus: 'Senior Software Engineer',
      skills: ['React', 'Node.js', 'AWS', 'System Architecture'],
      percentile: '98th Percentile',
      buildScore: '2,480',
      projectsCount: '14 Verified',
      bio: 'Experienced full-stack engineer specializing in cloud systems design and reliable fintech APIs. Leading development teams across Accra.',
      projects: [
        {
          id: 'kwame-momo',
          title: 'Enterprise Payment Ledger',
          isAudited: true,
          verifiedSkills: ['AWS', 'Node.js', 'PostgreSQL', 'API Design'],
          githubUrl: 'https://github.com/kwame-mensah/payment-ledger',
          aiSummary: `### Project Overview
An enterprise-grade payment reconciliation ledger designed for pan-African merchant corridors. It aggregates transaction statuses from MTN, Vodafone, and Airtel Money APIs in real-time.

### Architecture & Technology Choices
* **AWS Serverless**: Utilizes Lambda and API Gateway for zero-idle hosting costs and automated scale triggers.
* **PostgreSQL (RDS)**: Implements database row-locking for absolute transactional consistency.

### Role & Individual Impact
* Architected the distributed queue parsing system for webhook payloads.
* Designed the database indexes to support fast query times during monthly audits.`
        }
      ]
    },
    {
      id: 'godwin',
      fullName: 'Godwin Asante',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      country: 'Ghana',
      techFocus: 'Full-Stack Developer',
      skills: ['React', 'Node.js', 'Express', 'PostgreSQL'],
      percentile: '94th Percentile',
      buildScore: '1,950',
      projectsCount: '8 Verified',
      bio: 'Self-taught software engineer and systems builder. Focused on building high-performance APIs and interactive web experiences for regional fintech setups.',
      projects: [
        {
          id: 'godwin-escrow',
          title: 'Momo Escrow API',
          isAudited: true,
          verifiedSkills: ['Node.js', 'Express', 'PostgreSQL', 'API Design'],
          githubUrl: 'https://github.com/godwin-asante/momo-escrow',
          aiSummary: `### Project Overview
A secure, transactional escrow server specifically tailored for Mobile Money (MoMo) corridors in West Africa. It prevents buyer/seller fraud by locking transaction funds in a secure pool.

### Architecture & Technology Choices
* **Express & Node.js**: Chosen for lightweight execution to keep hosting costs minimal.
* **PostgreSQL**: Implements strict ACID transactions to ensure zero record loss.

### Role & Individual Impact
* Engineered the core database ledger schema and transaction locking state machine.
* Optimized API payload sizes to enable reliable response parsing on 2G/3G client applications.`
        }
      ]
    },
    {
      id: 'titos',
      fullName: 'Titos Kibet',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      country: 'Kenya',
      techFocus: 'UI/UX Designer',
      skills: ['Figma', 'UI/UX Design', 'Design Systems', 'React'],
      percentile: '95th Percentile',
      buildScore: '2,120',
      projectsCount: '6 Verified',
      bio: 'Passionate about mobile-first layouts, local design patterns, and micro-interactions. Designing experiences that work on low-spec screens and bright sunlight.',
      projects: [
        {
          id: 'titos-boda',
          title: 'BodaSafe Driver UI',
          isAudited: true,
          verifiedSkills: ['Figma', 'UI/UX Design', 'Accessibility'],
          figmaUrl: 'https://figma.com/file/bodasafe-mockup',
          aiSummary: `### Project Overview
A high-contrast mobile driver interface designed for Boda Boda (motorcycle) logistics operators. The application UI optimizes speed and safety.

### Design & Technology Choices
* **Figma UI Kit**: Crafted with a rigid 8px grid and component variables.
* **Ultra-High Contrast Palette**: Optimized to prevent glare readability loss under direct sunlight.

### Role & Individual Impact
* Led the user research phase, interviewing 12 riders at Nairobi transit hubs.
* Formulated the custom component library and mobile prototype flow.`
        }
      ]
    },
    {
      id: 'amina',
      fullName: 'Amina Diallo',
      avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200',
      country: 'Senegal',
      techFocus: 'Brand Designer & Creative Director',
      skills: ['Branding', 'Illustration', 'After Effects', 'Figma'],
      percentile: '96th Percentile',
      buildScore: '2,260',
      projectsCount: '10 Verified',
      bio: 'Multidisciplinary creative specializing in African-forward brand identities, motion design, and visual storytelling for startups and NGOs across Francophone West Africa.',
      projects: [
        {
          id: 'amina-brand',
          title: 'Dakar Fintech Rebrand',
          isAudited: true,
          verifiedSkills: ['Branding', 'Illustration', 'Motion Design', 'Figma'],
          figmaUrl: 'https://figma.com/file/dakar-fintech-rebrand',
          aiSummary: `### Project Overview
A complete visual identity overhaul for a Series A fintech startup, encompassing logo system, typography hierarchy, brand guidelines, and animated social media kit.

### Design & Technology Choices
* **Figma + Illustrator**: Built a modular token-based design system supporting both French and English locales.
* **After Effects**: Produced 12 branded motion loops for social campaigns reaching 1.2M impressions.

### Role & Individual Impact
* Directed the creative vision from concept through final delivery across 40+ brand assets.
* Increased brand recognition scores by 38% within 3 months of launch according to client survey data.`
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
      <section className="hero-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 'var(--spacing-xxxl) var(--spacing-md)' }}>
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div className="hero-badge" id="hero-badge-container" style={{ margin: '0 auto var(--spacing-lg) auto', display: 'inline-flex', borderRadius: '9999px', padding: '6px 16px', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.03em', textTransform: 'none' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', color: 'var(--color-accent)' }}>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <span>Pitching at Yango Fellowship Finals — September 17th</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: '3.8rem', fontWeight: 700, lineHeight: 1.15, color: 'var(--color-text-primary)', marginBottom: 'var(--spacing-md)', letterSpacing: '-0.02em' }}>
            The Trust Layer <br />
            <span style={{ color: 'var(--color-accent)', fontStyle: 'italic', fontWeight: '500', fontFamily: 'var(--font-serif), Georgia, serif' }}>for Africa's Tech & Creative Talent</span>
          </h1>

          <p style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, maxWidth: '750px', margin: '0 auto var(--spacing-xl) auto' }}>
            BorderLine is the opportunity pipeline and skill verification system for Africa's technologists and creatives — compiling code repos, design portfolios, and creative work into verified, hire-ready profiles.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', margin: '0 auto var(--spacing-xl) auto' }}>
            {[
              'Auto-verify portfolios',
              'Tech & creative talent',
              'HR-as-a-Service'
            ].map((text, idx) => (
              <div key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>{text}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/recruiter" className="btn btn-primary" id="btn-hero-recruiter" style={{ borderRadius: '9999px', padding: '12px 28px', fontSize: '0.95rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center' }}>
              Book a discovery call <span style={{ marginLeft: '8px' }}>➔</span>
            </Link>
            <Link href="/talent" className="btn btn-secondary" id="btn-hero-talent" style={{ borderRadius: '9999px', padding: '12px 28px', fontSize: '0.95rem', fontWeight: 600 }}>
              Create Your Profile
            </Link>
          </div>
        </div>
      </section>

      {/* Scroll-Stacked Profile Cards Section */}
      <section className="card-stack-section" style={{ backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto var(--spacing-xl) auto' }}>
            <span className="feature-tag" style={{ color: 'var(--color-accent)', fontWeight: 'bold', fontSize: '0.8rem', letterSpacing: '0.05em' }}>
              PROOF OF WORK
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '8px', color: 'var(--color-text-primary)' }}>
              Meet Verified Builders & Creatives
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', marginTop: '6px' }}>
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
                    Verified Profile
                  </span>
                  
                  {/* Small avatar group on top right */}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {['https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=40', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=40', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=40'].map((url, idx) => (
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
                    <span>Proof of Capability</span>
                    <span style={{ color: 'var(--color-accent)' }}>{profile.percentile}</span>
                  </div>
                  <div className="capability-bar-track">
                    <div className="capability-bar-fill" style={{ width: profile.percentile.includes('98') ? '98%' : profile.percentile.includes('95') ? '95%' : '94%' }}></div>
                  </div>
                </div>

                {/* Stats columns */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '16px' }}>
                  <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '10px', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.65rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', fontWeight: 700 }}>Build Score</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-text-primary)', marginTop: '2px' }}>{profile.buildScore}</div>
                  </div>
                  <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '10px', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.65rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', fontWeight: 700 }}>Projects</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-accent)', marginTop: '2px' }}>{profile.projectsCount}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grayscale partner logos list */}
      <section className="scroll-reveal" style={{ borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', padding: 'var(--spacing-xl) 0' }}>
        <div className="container">
          <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-tertiary)', textAlign: 'center', letterSpacing: '0.1em', marginBottom: 'var(--spacing-md)' }}>
            Trusted by Teams from San Francisco to Lagos
          </div>
          <div className="partner-logos-grid">
            {/* Telecel Logo */}
            <svg className="partner-logo-svg logo-telecel" viewBox="0 0 90 24" width="90" stroke="currentColor">
              <circle cx="12" cy="12" r="8" strokeWidth="2" fill="none" />
              <path d="M12 7V17M9 10H15" strokeWidth="2" strokeLinecap="round" />
              <text x="26" y="16" fontFamily="var(--font-display)" fontWeight="800" fontSize="11" letterSpacing="-0.5px" stroke="none">telecel</text>
            </svg>
            {/* Flywheel Logo */}
            <svg className="partner-logo-svg logo-flywheel" viewBox="0 0 95 24" width="95" stroke="currentColor">
              <path d="M4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20C7.58 20 4 16.42 4 12Z" strokeWidth="1.5" fill="none" />
              <path d="M12 4L12 20M4 12L20 12" strokeWidth="1" />
              <text x="28" y="16" fontFamily="var(--font-display)" fontWeight="800" fontSize="11" letterSpacing="-0.5px" stroke="none">flywheel</text>
            </svg>
            {/* Yango Logo */}
            <svg className="partner-logo-svg logo-yango" viewBox="0 0 80 24" width="80" stroke="currentColor">
              <polygon points="4,5 18,5 11,18" />
              <text x="26" y="16" fontFamily="var(--font-display)" fontWeight="800" fontSize="12" letterSpacing="0.2px" stroke="none">YANGO</text>
            </svg>
            {/* KADA Mobility Logo */}
            <svg className="partner-logo-svg logo-kada" viewBox="0 0 115 24" width="115" stroke="currentColor">
              <path d="M4 4L12 12L4 20" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M9 4L17 12L9 20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <text x="26" y="16" fontFamily="var(--font-display)" fontWeight="800" fontSize="11" letterSpacing="-0.5px" stroke="none">KADA mobility</text>
            </svg>
            {/* MTN Logo */}
            <svg className="partner-logo-svg logo-mtn" viewBox="0 0 70 24" width="70" stroke="currentColor">
              <ellipse cx="14" cy="12" rx="10" ry="7" strokeWidth="2" fill="none" />
              <text x="30" y="16" fontFamily="var(--font-display)" fontWeight="800" fontSize="12" letterSpacing="-0.5px" stroke="none">MTN</text>
            </svg>
            {/* ALX Logo */}
            <svg className="partner-logo-svg logo-alx" viewBox="0 0 70 24" width="70" stroke="currentColor">
              <rect x="4" y="4" width="16" height="16" rx="3" strokeWidth="2.5" fill="none" />
              <text x="28" y="16" fontFamily="var(--font-display)" fontWeight="800" fontSize="12" letterSpacing="-0.5px" stroke="none">alx</text>
            </svg>
            {/* Google Logo */}
            <svg className="partner-logo-svg logo-google" viewBox="0 0 85 24" width="85" stroke="currentColor">
              <path d="M12 12H19C19.2 10.9 18.8 9.8 18 9C16.8 7.8 14.8 7.3 13.2 7.8C11.6 8.3 10.3 9.7 10 11.4C9.6 13.5 10.6 15.6 12.5 16.5C14.3 17.3 16.5 16.8 17.8 15.4C18.4 14.8 18.8 14 18.9 13.2H14.5" strokeWidth="2" fill="none" />
              <text x="26" y="16" fontFamily="var(--font-display)" fontWeight="800" fontSize="12" letterSpacing="-0.5px" stroke="none">Google</text>
            </svg>
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
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '8px', marginBottom: '16px', lineHeight: 1.2, color: 'var(--color-text-primary)' }}>
                Bridging the gap between raw capability and global opportunity.
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '24px' }}>
                We believe capability is evenly distributed, but trust and infrastructure are not. Borderline builds the trust network that enables pan-African talent to thrive internationally.
              </p>

              <ul className="about-checklist">
                <li className="about-checklist-item">
                  <div className="about-checklist-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div className="about-checklist-text">
                    <strong>Hire verified talent across the continent:</strong> Vetted code repos, live deployments, and verified creative portfolios ready to deploy.
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
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600" 
                  alt="Kwame Mensah - Senior Developer"
                />
                <div className="about-floating-card">
                  <span className="about-floating-name">Kwame M.</span>
                  <span className="about-floating-title">Senior Developer</span>
                  <a href="https://github.com/kwame-mensah" target="_blank" rel="noopener noreferrer" className="about-floating-link">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                    <span>GitHub Profile</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Core Problem Block */}
      <section className="stats-section scroll-reveal">
        <div className="container">
          <div className="hero-badge" style={{ borderColor: 'var(--color-danger)', color: 'var(--color-danger)', backgroundColor: 'transparent', display: 'inline-flex', margin: '0 auto var(--spacing-sm) auto' }}>
            <span>The Infrastructure Gap</span>
          </div>
          <h2 className="section-title">
            Africa has the talent. The world has the demand. <span style={{ color: 'var(--color-accent)' }}>The infrastructure doesn't exist yet.</span>
          </h2>

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
                Traditional CVs are failing the modern global market. BorderLine replaces subjective resumes with immutable proof of work.
              </p>

              <div className="feature-bullet-list">
                <div className="feature-bullet-item">
                  <div className="feature-bullet-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 11 2 2 4-4"/>
                    </svg>
                  </div>
                  <div className="feature-bullet-text">
                    <h4>Proof of Build (PoB)</h4>
                    <p>Our AI engine analyzes GitHub repositories, commits, and project architecture to verify technical depth automatically.</p>
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
                <div className="metric-card-num">10k+</div>
                <div className="metric-card-label"><strong>Verified Builders</strong>. Active engineers across 12 African nations.</div>
              </div>
              <div className="metric-card-box">
                <div className="metric-card-num green">$4M+</div>
                <div className="metric-card-label"><strong>Talent Earnings</strong> generated through regional and global contracts.</div>
              </div>
              <div className="metric-card-box">
                <div className="metric-card-num">24h</div>
                <div className="metric-card-label"><strong>Avg. Match Time</strong> between job posting and candidate review.</div>
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
                  <span><strong>Yango Jobs & Pipelines:</strong> Build companies, hire verified talent, and access potential direct hiring channels.</span>
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
                <Link href="/">Verification Protocol</Link>
                <Link href="/admin">Compliance Engine</Link>
                <Link href="/recruiter">API for Hiring</Link>
              </div>
            </div>

            {/* Col 3 */}
            <div className="footer-col">
              <h4>Company</h4>
              <div className="footer-col-links">
                <a href="#">About Us</a>
                <a href="#">The Manifesto</a>
                <a href="#">Careers</a>
                <a href="#">Newsroom</a>
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
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookies</a>
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
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }} id="drawer-candidate-contact">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>{selectedProfile.country}</span>
                </p>
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
