'use client';

import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';

export default function FoundationPage() {
  const { theme } = useApp();
  const [partnerName, setPartnerName] = useState('');
  const [partnerEmail, setPartnerEmail] = useState('');
  const [partnerType, setPartnerType] = useState('Organization');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerName || !partnerEmail) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setPartnerName('');
      setPartnerEmail('');
    }, 3000);
  };

  return (
    <div style={{
      minHeight: '90vh',
      padding: 'var(--spacing-xxl) var(--spacing-md) var(--spacing-xxxl) var(--spacing-md)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Radial Glow */}
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
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
          <span className="feature-tag" style={{ color: 'var(--color-accent)', fontWeight: 'bold', fontSize: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            BORDERLINE FOUNDATION
          </span>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 2.5rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginTop: '8px',
            marginBottom: 'var(--spacing-md)',
            color: 'var(--color-text-primary)'
          }}>
            Incentivizing the Builders of Tomorrow
          </h1>
          <p style={{
            fontSize: '1.05rem',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.6,
            maxWidth: '620px',
            margin: '0 auto'
          }}>
            We believe that talent is evenly distributed across Africa, but resources, access, and credentials are not. BorderLine Foundation works to reduce the systemic friction points that hold builders back.
          </p>
        </div>

        {/* Impact Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginBottom: 'var(--spacing-xxl)'
        }}>
          <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: 'var(--spacing-lg)', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-accent)', marginBottom: '4px' }}>$45k+</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '4px' }}>Direct Student Income</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', lineHeight: 1.3 }}>Paid directly to early-career builders through verified escrow micro-gigs.</div>
          </div>

          <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: 'var(--spacing-lg)', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-accent)', marginBottom: '4px' }}>850+</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '4px' }}>Audited Projects</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', lineHeight: 1.3 }}>Repositories evaluated and verified via our AI-assisted peer review framework.</div>
          </div>

          <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: 'var(--spacing-lg)', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-accent)', marginBottom: '4px' }}>98%</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '4px' }}>Transaction Fees Saved</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', lineHeight: 1.3 }}>Bypassing traditional banking rails in favor of local Mobile Money integrations.</div>
          </div>
        </div>

        {/* Initiatives List */}
        <div style={{ marginBottom: 'var(--spacing-xxl)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '24px', textAlign: 'center' }}>
            Our Primary Initiatives
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Initiative 1 */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: 'var(--spacing-lg)', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', alignItems: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '10px', backgroundColor: 'var(--color-accent-subtle)', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M13 2L3 14h9l-1 8 10-10h-9l1-8z" />
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: '260px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 750, color: 'var(--color-text-primary)', marginBottom: '6px' }}>
                  Connectivity & Power Subsidies
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                  Many student builders face daily electricity load-shedding and high internet data costs. We distribute micro-grants directly via MTN Mobile Money and AirtelTigo to keep their rigs running and dashboards active.
                </p>
              </div>
            </div>

            {/* Initiative 2 */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: 'var(--spacing-lg)', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', alignItems: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '10px', backgroundColor: 'var(--color-accent-subtle)', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: '260px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 750, color: 'var(--color-text-primary)', marginBottom: '6px' }}>
                  Open-Source Peer Audits
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                  We incentivize senior African engineers to conduct deep code audits on student repositories. This peer review process strengthens our automated AI verification scoring system with human oversight.
                </p>
              </div>
            </div>

            {/* Initiative 3 */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: 'var(--spacing-lg)', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', alignItems: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '10px', backgroundColor: 'var(--color-accent-subtle)', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <line x1="12" y1="4" x2="12" y2="20" />
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: '260px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 750, color: 'var(--color-text-primary)', marginBottom: '6px' }}>
                  Mobile Money Escrow Pool
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                  Funding micro-escrows to eliminate fee percentages. When a global client deposits a project budget, we absorb MTN/Wave transit fees so 100% of the funds go directly into the student&apos;s wallet.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Support / Partnership Form */}
        <div style={{
          backgroundColor: 'var(--color-surface-elevated)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--spacing-xl)',
          maxWidth: '520px',
          margin: '0 auto'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '8px', textAlign: 'center' }}>
            Partner With the Foundation
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', textAlign: 'center', marginBottom: '20px', lineHeight: 1.4 }}>
            Interested in sponsoring internet data, funding audits, or hiring a cohort of student builders? Drop your details below.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '6px', textTransform: 'uppercase' }}>Your Name / Company</label>
                <input
                  type="text"
                  required
                  placeholder="SusuPay Tech"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg)',
                    color: 'var(--color-text-primary)',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                />
              </div>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '6px', textTransform: 'uppercase' }}>Contact Email</label>
                <input
                  type="email"
                  required
                  placeholder="partner@company.com"
                  value={partnerEmail}
                  onChange={(e) => setPartnerEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg)',
                    color: 'var(--color-text-primary)',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '6px', textTransform: 'uppercase' }}>Partnership Type</label>
              <select
                value={partnerType}
                onChange={(e) => setPartnerType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text-primary)',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              >
                <option value="Organization">Educational Institution / University</option>
                <option value="Sponsor">Sponsor (Internet/Power grants)</option>
                <option value="Hiring">Hiring Partner (Cohort training)</option>
                <option value="Individual">Individual Donor</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 600,
                fontSize: '0.85rem',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {submitted ? '✓ Submission Received' : 'Submit Partner Request'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
