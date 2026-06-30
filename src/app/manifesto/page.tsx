'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';

/* ── Animated stat card (same pattern as homepage) ── */
const StatCard: React.FC<{ target: number; suffix?: string; desc: string; color?: string }> = ({
  target,
  suffix = '%',
  desc,
  color,
}) => {
  const [value, setValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) setHasAnimated(true);
      },
      { threshold: 0.1 },
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;
    const duration = 1500;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    const increment = target / totalFrames;
    let frame = 0;
    let current = 0;
    const timer = setInterval(() => {
      frame++;
      current += increment;
      if (frame >= totalFrames) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.floor(current));
      }
    }, frameRate);
    return () => clearInterval(timer);
  }, [hasAnimated, target]);

  return (
    <div className="stat-card" ref={cardRef}>
      <div className="stat-number" style={color ? { color } : undefined}>
        {value}
        {suffix}
      </div>
      <p className="stat-desc">{desc}</p>
    </div>
  );
};

/* ── Lifecycle Step ── */
const LifecycleStep: React.FC<{ step: number; title: string; desc: string }> = ({ step, title, desc }) => (
  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
    <div
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: 'var(--color-accent-subtle)',
        border: '2px solid var(--color-accent)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        fontWeight: 800,
        fontSize: '1rem',
        color: 'var(--color-accent)',
      }}
    >
      {step}
    </div>
    <div>
      <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '4px' }}>{title}</h4>
      <p style={{ fontSize: '0.92rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{desc}</p>
    </div>
  </div>
);

/* ── Friction Point Card ── */
const FrictionCard: React.FC<{ icon: string; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div
    className="card"
    style={{
      padding: 'var(--spacing-lg)',
      backgroundColor: 'var(--color-surface)',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    }}
  >
    <div style={{ fontSize: '2rem' }}>{icon}</div>
    <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{title}</h4>
    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{desc}</p>
  </div>
);

export default function ManifestoPage() {
  const { theme } = useApp();

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text-primary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '50%',
          background: 'radial-gradient(ellipse at 50% 0%, var(--color-accent-subtle) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <main className="container" style={{ position: 'relative', zIndex: 1, padding: 'var(--spacing-xxl) var(--spacing-lg)' }}>
        {/* ─── Hero ─── */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
          <span
            className="badge badge-accent"
            style={{
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              padding: '6px 14px',
              borderRadius: '8px',
            }}
          >
            Our Manifesto
          </span>
        </div>

        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto var(--spacing-xxl) auto' }}>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.04em',
              marginBottom: 'var(--spacing-md)',
              background:
                theme === 'dark'
                  ? 'linear-gradient(135deg, #FFFFFF 40%, var(--color-text-secondary) 100%)'
                  : 'var(--color-text-primary)',
              WebkitBackgroundClip: theme === 'dark' ? 'text' : undefined,
              WebkitTextFillColor: theme === 'dark' ? 'transparent' : undefined,
            }}
          >
            Africans Hiring Africans
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, maxWidth: '680px', margin: '0 auto' }}>
            Traditional work platforms have failed the African market. They were designed for Western dynamics, focusing on legacy credentials, platform reviews, and costly bidding processes. This creates an insurmountable trust wall for Africa&apos;s emerging builders.
          </p>
          <p
            style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              color: 'var(--color-accent)',
              marginTop: 'var(--spacing-md)',
              lineHeight: 1.6,
            }}
          >
            BorderLine is not just a job board. We are the trust and payment protocol for intra-continental tech hiring.
          </p>
        </div>

        {/* ─── Survey Stats ─── */}
        <section style={{ marginBottom: 'var(--spacing-xxxl)' }}>
          <h2 style={{ textAlign: 'center', fontSize: '1.6rem', fontWeight: 800, marginBottom: '8px' }}>
            What Our Research Found
          </h2>
          <p
            style={{
              textAlign: 'center',
              maxWidth: '620px',
              margin: '0 auto var(--spacing-lg)',
              color: 'var(--color-text-secondary)',
              fontSize: '0.95rem',
            }}
          >
            <em>
              Our 2026 BorderLine survey of 37 tech and creative students across Zambia, Ghana, South Africa, and
              Nigeria uncovered three systemic choke points.
            </em>
          </p>
          <div className="stats-grid">
            <StatCard target={70} desc="excluded by arbitrary years-of-experience requirements" color="var(--color-danger)" />
            <StatCard target={92} desc="have no structured way to prove what they can build to outsiders" color="var(--color-accent)" />
            <StatCard target={59} desc="face daily connectivity and power barriers that hide their output" color="var(--color-accent-secondary)" />
          </div>
        </section>

        {/* ─── The Three Friction Points (from manifesto.md §1) ─── */}
        <section style={{ marginBottom: 'var(--spacing-xxxl)' }}>
          <h2 style={{ textAlign: 'center', fontSize: '1.6rem', fontWeight: 800, marginBottom: '8px' }}>
            Three Pan-African Friction Points We Solve
          </h2>
          <p
            style={{
              textAlign: 'center',
              maxWidth: '680px',
              margin: '0 auto var(--spacing-xl)',
              color: 'var(--color-text-secondary)',
              fontSize: '0.95rem',
            }}
          >
            The fastest-growing tech hubs in Africa — Lagos, Cape Town, Nairobi, Cairo, Accra, and Kigali — are
            teeming with brilliant, self-taught junior talent. Yet, hiring across borders within Africa has
            historically been broken.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--spacing-lg)',
            }}
          >
            <FrictionCard
              icon="💸"
              title="The Pan-African Payment Rail"
              desc="Sending fiat between African nations is notoriously slow and expensive, often requiring double-conversion through USD. BorderLine integrates direct, low-cost cross-border currency routing (e.g., ZAR to NGN) settled instantly via Mobile Money wallets — M-Pesa, Wave, MTN Momo."
            />
            <FrictionCard
              icon="🛡️"
              title="The Unified Trust Standard"
              desc="Startups in South Africa have no visibility into university or bootcamp ecosystems in Nigeria or Uganda. By replacing subjective resumes with our automated Proof of Skill (PoS) audit, we establish a standardized Build Score that guarantees technical capability across borders."
            />
            <FrictionCard
              icon="🔒"
              title="Cross-Border Escrow"
              desc="Because cross-border legal action is impossible for small contracts, we protect both parties with integrated milestone-based escrow. Startups only pay for verified, delivered code, and developers are guaranteed secure payouts."
            />
          </div>
        </section>

        {/* ─── Gig-to-Career Lifecycle (from manifesto.md §2) ─── */}
        <section
          className="card"
          style={{
            maxWidth: '850px',
            margin: '0 auto var(--spacing-xxxl) auto',
            padding: 'var(--spacing-xl)',
            backgroundColor: 'var(--color-surface)',
          }}
        >
          <h2 style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px' }}>
            The Career Engine: Gig-to-Career Lifecycle
          </h2>
          <p
            style={{
              textAlign: 'center',
              maxWidth: '650px',
              margin: '0 auto var(--spacing-xl)',
              color: 'var(--color-text-secondary)',
              fontSize: '0.92rem',
              lineHeight: 1.6,
            }}
          >
            We do not force immediate, long-term remote hires. For startups, hiring junior developers across borders
            carries high training and commitment risk. For juniors, getting that first long-term contract is
            incredibly difficult without experience.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <LifecycleStep
              step={1}
              title="Proof of Skill (PoS) Vetting"
              desc="Our AI parser and peer networks audit raw project files and GitHub repositories, translating capability into a standardized Build Score and eliminating recruiter hiring risk."
            />
            <LifecycleStep
              step={2}
              title="Low-Risk Micro-Gigs & Internships"
              desc="Startups hire emerging builders for targeted, short-term tasks or 3-month structured internships. This lowers the entry barrier for students and provides an affordable trial for cash-constrained startups."
            />
            <LifecycleStep
              step={3}
              title="Build Score & Credibility Escalator"
              desc="Every completed gig, commit, and project is audited by our protocol, dynamically increasing the developer's Build Score. Reputation is accumulated on-platform, creating a verified, undeniable professional track record."
            />
            <LifecycleStep
              step={4}
              title="Try-Before-You-Buy Career Graduation"
              desc="Once a developer successfully delivers multiple gigs, trust is established naturally. Startups graduate them into long-term monthly retainers or full-time roles, managing pan-African payroll compliantly under our protocol."
            />
          </div>
        </section>

        {/* ─── Market Projection ─── */}
        <section style={{ marginBottom: 'var(--spacing-xxxl)' }}>
          <div
            className="card"
            style={{
              background: 'linear-gradient(135deg, var(--color-surface-greenblock) 0%, var(--color-surface-elevated) 100%)',
              border: '1px solid var(--color-accent)',
              padding: 'var(--spacing-xl)',
              textAlign: 'center',
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                color: 'var(--color-accent)',
                marginBottom: '8px',
                textTransform: 'uppercase',
              }}
            >
              The Pan-African Market Projection
            </h3>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--color-text-primary)' }}>
              Africa&apos;s digital economy surpassed{' '}
              <strong>$180 Billion by 2025</strong> and is projected to reach{' '}
              <a
                href="https://www.mastercard.com/news/eemea/en/newsroom/press-releases/en/2025-1/march/digital-payments-economy-in-africa-expected-to-reach-1-5-trillion-by-2030-according-to-new-report/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                <strong>$1.5 Trillion by 2030</strong>
              </a>
              . Over{' '}
              <strong>5 million high-capability builders</strong> will enter the regional tech pipeline over the next
              decade. BorderLine is the transactional protocol connecting this human capital with continental startups,
              ensuring wealth and opportunity remain within Africa.
            </p>
          </div>
        </section>

        {/* ─── Our Commitment (from manifesto.md §3) ─── */}
        <section style={{ maxWidth: '850px', margin: '0 auto var(--spacing-xxxl) auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '1.6rem', fontWeight: 800, marginBottom: 'var(--spacing-xl)' }}>
            Our Commitment
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 'var(--spacing-lg)',
            }}
          >
            <div
              className="card"
              style={{ padding: 'var(--spacing-lg)', backgroundColor: 'var(--color-surface)', textAlign: 'center' }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🚫</div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>No Resume Walls</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                We verify raw capability, not years of corporate experience or institutional brand names.
              </p>
            </div>
            <div
              className="card"
              style={{ padding: 'var(--spacing-lg)', backgroundColor: 'var(--color-surface)', textAlign: 'center' }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📱</div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>Low-Infrastructure Access</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                We meet builders where they are, providing complete platform utility over lightweight WhatsApp-native
                text interfaces to bypass high mobile data costs and power constraints.
              </p>
            </div>
            <div
              className="card"
              style={{ padding: 'var(--spacing-lg)', backgroundColor: 'var(--color-surface)', textAlign: 'center' }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🌍</div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>
                Intra-Continental Prosperity
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                We keep capital, opportunity, and talent within the continent, building a self-sustaining digital
                economy.
              </p>
            </div>
          </div>
        </section>

        {/* ─── CTAs ─── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'var(--spacing-md)',
            flexWrap: 'wrap',
            marginBottom: 'var(--spacing-xxxl)',
          }}
        >
          <Link href="/talent" className="btn btn-primary" style={{ borderRadius: '8px', padding: '12px 28px', fontSize: '1rem' }}>
            Build Your Profile
          </Link>
          <Link href="/" className="btn btn-secondary" style={{ borderRadius: '8px', padding: '12px 28px', fontSize: '1rem' }}>
            Back to Home
          </Link>
        </div>
      </main>

      {/* ─── Footer ─── */}
      <footer
        className="site-footer"
        style={{
          padding: 'var(--spacing-xxl) 0 var(--spacing-xl) 0',
          backgroundColor: 'var(--color-surface)',
          borderTop: '1px solid var(--color-border)',
          textAlign: 'left',
        }}
      >
        <div className="container">
          <div className="footer-cols-grid">
            {/* Col 1 */}
            <div className="footer-col">
              <div className="footer-logo" style={{ justifyContent: 'flex-start', margin: 0 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6 3h7c2.76 0 5 2.24 5 5 0 1.83-1 3.43-2.5 4.25 1.5.82 2.5 2.42 2.5 4.25 0 2.76-2.24 5-5 5H6V3zm4 3v4h3c1.1 0 2-.9 2-2s-.9-2-2-2h-3zm0 7v4h3c1.1 0 2-.9 2-2s-.9-2-2-2h-3z"
                    fill="currentColor"
                  />
                  <rect x="5" y="21" width="14" height="2.5" rx="1.25" fill="var(--color-accent)" />
                </svg>
                <span className="logo-text" style={{ fontSize: '1.25rem' }}>
                  Border<span>Line</span>
                </span>
              </div>
              <p className="footer-desc">
                Creating the world&apos;s most trusted engineering talent marketplace by verifying raw capability with
                AI-driven proof of work.
              </p>
              <div className="footer-socials" style={{ display: 'flex', gap: '8px' }}>
                <a href="#" className="footer-social-icon" aria-label="GitHub">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </a>
                <a href="#" className="footer-social-icon" aria-label="Twitter">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </a>
                <a href="#" className="footer-social-icon" aria-label="LinkedIn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Col 2 */}
            <div className="footer-col">
              <h4>Product</h4>
              <div className="footer-col-links">
                <Link href="/recruiter">Talent Discovery</Link>
                <Link href="/development">Verification Protocol</Link>
                <Link href="/development">Compliance Engine</Link>
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
                <input type="email" className="newsletter-input" placeholder="name@company.com" required />
                <button type="submit" className="newsletter-submit">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div
            style={{
              borderTop: '1px solid var(--color-border)',
              paddingTop: 'var(--spacing-md)',
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '10px',
              fontSize: '0.8rem',
              color: 'var(--color-text-tertiary)',
            }}
          >
            <div>© {new Date().getFullYear()} BorderLine. Built by Team 4 (Africoded) for the Yango Fellowship.</div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Link href="/development">Privacy Policy</Link>
              <Link href="/development">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
