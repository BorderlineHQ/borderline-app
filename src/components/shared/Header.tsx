'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '../../context/AppContext';

const Header: React.FC = () => {
  const pathname = usePathname();
  const { theme, setTheme, resetDatabase, mounted } = useApp();

  if (!mounted) return null;

  const isActive = (path: string) => {
    if (path === '/' && pathname !== '/') return false;
    return pathname?.startsWith(path);
  };

  return (
    <header className="site-header">
      <div className="header-container">
        <Link href="/" className="logo-link" style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontWeight: 700, fontSize: '1.3rem', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="logo-icon" style={{ display: 'flex', alignItems: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M6 3h7c2.76 0 5 2.24 5 5 0 1.83-1 3.43-2.5 4.25 1.5.82 2.5 2.42 2.5 4.25 0 2.76-2.24 5-5 5H6V3zm4 3v4h3c1.1 0 2-.9 2-2s-.9-2-2-2h-3zm0 7v4h3c1.1 0 2-.9 2-2s-.9-2-2-2h-3z" fill="currentColor"/>
              <rect x="5" y="21" width="14" height="2.5" rx="1.25" fill="var(--color-accent)"/>
            </svg>
          </div>
          <span className="logo-text">Border<span style={{ color: 'var(--color-accent)' }}>Line</span></span>
        </Link>

        <nav className="header-nav">
          <Link href="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
            Home
          </Link>
          <Link href="/recruiter" className={`nav-item ${isActive('/recruiter') ? 'active' : ''}`}>
            Recruiter Feed
          </Link>
          <Link href="/talent" className={`nav-item ${isActive('/talent') ? 'active' : ''}`}>
            Talent Portal
          </Link>
          <Link href="/whatsapp" className={`nav-item ${isActive('/whatsapp') ? 'active' : ''} spec-sandbox`}>
            Try our Whatsapp Bot
          </Link>
        </nav>

        <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Theme & DB Reset buttons grouped together */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button 
              onClick={resetDatabase} 
              className="theme-toggle"
              title="Reset Database to initial mock data"
              aria-label="Reset Database"
              style={{ width: '32px', height: '32px', padding: 0 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
            </button>
            
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="theme-toggle"
              aria-label="Toggle Theme"
              style={{ width: '32px', height: '32px', padding: 0 }}
            >
              {theme === 'dark' ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4"/>
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                </svg>
              )}
            </button>
          </div>

          {/* Premium call to action pills */}
          <Link href="/recruiter" className="btn btn-secondary btn-header-login" style={{ borderRadius: '9999px', padding: '6px 14px', fontSize: '0.8rem', fontWeight: 600 }}>
            Login
          </Link>
          <Link href="/recruiter" className="btn btn-primary btn-header-cta" style={{ borderRadius: '9999px', padding: '6px 16px', fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
            <span className="cta-long">Contact Sales to Partner Your Organization</span>
            <span className="cta-medium">Contact Sales to Partner</span>
            <span className="cta-short">Contact Sales</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
