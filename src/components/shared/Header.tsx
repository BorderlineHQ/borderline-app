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
              <path d="M2 18H22" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M12 3L14 8L19 10L14 12L12 17L10 12L5 10L10 8L12 3Z" fill="currentColor"/>
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
          <Link href="/admin" className={`nav-item ${isActive('/admin') ? 'active' : ''}`}>
            Admin Audit
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
          <Link href="/recruiter" className="btn btn-primary btn-header-cta" style={{ borderRadius: '9999px', padding: '6px 14px', fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
            Book a discovery call
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
