'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';

export default function DevelopmentPage() {
  const { theme } = useApp();

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--spacing-xxl) var(--spacing-md)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Dynamic Background Radial Glow */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        height: '60%',
        background: 'radial-gradient(ellipse at 50% 0%, var(--color-accent-subtle) 0%, transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      <div className="card" style={{
        maxWidth: '550px',
        width: '100%',
        textAlign: 'center',
        padding: 'var(--spacing-xxl) var(--spacing-xl)',
        boxShadow: theme === 'dark' 
          ? '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 50px var(--color-accent-subtle)' 
          : '0 20px 40px rgba(0, 0, 0, 0.05)',
        position: 'relative',
        zIndex: 1,
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      }}>
        {/* Animated Construction/Audit Icon */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-accent-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto var(--spacing-lg) auto',
          border: '2px solid var(--color-accent)',
          animation: 'pulse 2s infinite',
        }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 8s linear infinite' }}>
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </div>

        <span className="badge badge-accent" style={{
          textTransform: 'uppercase',
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.05em',
          marginBottom: 'var(--spacing-md)',
          padding: '6px 12px',
        }}>
          Coming Soon
        </span>

        <h2 style={{
          fontSize: '2rem',
          fontWeight: 800,
          marginBottom: 'var(--spacing-md)',
          color: 'var(--color-text-primary)',
          lineHeight: 1.2,
        }}>
          Under Development
        </h2>

        <p style={{
          fontSize: '0.95rem',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.6,
          marginBottom: 'var(--spacing-xl)',
        }}>
          This section of the platform is currently under development. We are building new features to help you upskill, grow, and connect with peer circles and opportunities across the continent.
        </p>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          alignItems: 'center',
        }}>
          <Link href="/" className="btn btn-primary" style={{
            width: '100%',
            maxWidth: '240px',
            borderRadius: '8px',
            padding: '10px 20px',
            fontSize: '0.9rem',
          }}>
            Back to Home
          </Link>
          
          <button 
            onClick={() => window.history.back()} 
            className="btn btn-secondary"
            style={{
              width: '100%',
              maxWidth: '240px',
              borderRadius: '8px',
              padding: '10px 20px',
              fontSize: '0.9rem',
            }}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
