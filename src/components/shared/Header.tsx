'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '../../context/AppContext';

const Header: React.FC = () => {
  const pathname = usePathname();
  const { theme, setTheme, resetDatabase, mounted } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [platformDropdownOpen, setPlatformDropdownOpen] = useState(false);
  const [techDropdownOpen, setTechDropdownOpen] = useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/' && pathname !== '/') return false;
    return pathname?.startsWith(path);
  };

  return (
    <header className={`site-header ${mobileMenuOpen ? 'mobile-open' : ''}`}>
      <div className="header-container">
        <Link href="/" className="logo-link">
          <div className="logo-icon" style={{ display: 'flex', alignItems: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M5 2h9c3 0 5 2 5 4.5 0 2.5-2 3.5-5 3.5 3 0 5 1 5 3.5 0 2.5-2 4.5-5 4.5H5V2zm4 3v4h4c1.2 0 2-.8 2-2s-.8-2-2-2H9zm0 6v4h4c1.2 0 2-.8 2-2s-.8-2-2-2H9z" fill="currentColor"/>
              <rect x="4" y="21" width="16" height="2.5" rx="1.25" fill="var(--color-accent)"/>
            </svg>
          </div>
          <span className="logo-text">Border<span style={{ color: 'var(--color-accent)' }}>Line</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="header-nav desktop-only">
          <Link href="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
            Home
          </Link>
          
          {/* Platform Dropdown */}
          <div 
            className="nav-dropdown"
            onMouseEnter={() => setPlatformDropdownOpen(true)}
            onMouseLeave={() => setPlatformDropdownOpen(false)}
          >
            <button 
              onClick={() => setPlatformDropdownOpen(!platformDropdownOpen)}
              className={`nav-item dropdown-trigger ${isActive('/recruiter') || isActive('/talent') ? 'active' : ''}`}
              style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              Platform
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ transform: platformDropdownOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {platformDropdownOpen && (
              <div className="dropdown-menu-wrapper">
                <div style={{ 
                  backgroundColor: 'var(--color-surface)', 
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  minWidth: '180px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
                }}>
                  <Link href="/recruiter" onClick={() => setPlatformDropdownOpen(false)} className="dropdown-item" style={{ 
                    display: 'block', 
                    padding: '10px 16px', 
                    color: 'var(--color-text-secondary)',
                    fontSize: '0.9rem',
                    borderBottom: '1px solid var(--color-border)',
                    transition: 'all 0.15s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-accent-subtle)';
                    e.currentTarget.style.color = 'var(--color-accent)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--color-text-secondary)';
                  }}>
                    For Recruiters
                  </Link>
                  <Link href="/talent" onClick={() => setPlatformDropdownOpen(false)} className="dropdown-item" style={{ 
                    display: 'block', 
                    padding: '10px 16px', 
                    color: 'var(--color-text-secondary)',
                    fontSize: '0.9rem',
                    transition: 'all 0.15s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-accent-subtle)';
                    e.currentTarget.style.color = 'var(--color-accent)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--color-text-secondary)';
                  }}>
                    Find Work
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Technology Dropdown */}
          <div 
            className="nav-dropdown"
            onMouseEnter={() => setTechDropdownOpen(true)}
            onMouseLeave={() => setTechDropdownOpen(false)}
          >
            <button 
              onClick={() => setTechDropdownOpen(!techDropdownOpen)}
              className={`nav-item dropdown-trigger ${isActive('/whatsapp') ? 'active' : ''}`}
              style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              Technology
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ transform: techDropdownOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {techDropdownOpen && (
              <div className="dropdown-menu-wrapper">
                <div style={{ 
                  backgroundColor: 'var(--color-surface)', 
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  minWidth: '180px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
                }}>
                  <Link href="/whatsapp" onClick={() => setTechDropdownOpen(false)} className="dropdown-item" style={{ 
                    display: 'block', 
                    padding: '10px 16px', 
                    color: 'var(--color-text-secondary)',
                    fontSize: '0.9rem',
                    borderBottom: '1px solid var(--color-border)',
                    transition: 'all 0.15s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-accent-subtle)';
                    e.currentTarget.style.color = 'var(--color-accent)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--color-text-secondary)';
                  }}>
                    WhatsApp Bot
                  </Link>
                  <Link href="/manifesto" onClick={() => setTechDropdownOpen(false)} className="dropdown-item" style={{ 
                    display: 'block', 
                    padding: '10px 16px', 
                    color: 'var(--color-text-secondary)',
                    fontSize: '0.9rem',
                    transition: 'all 0.15s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-accent-subtle)';
                    e.currentTarget.style.color = 'var(--color-accent)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--color-text-secondary)';
                  }}>
                    Our Manifesto
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Resources Dropdown */}
          <div 
            className="nav-dropdown"
            onMouseEnter={() => setResourcesDropdownOpen(true)}
            onMouseLeave={() => setResourcesDropdownOpen(false)}
          >
            <button 
              onClick={() => setResourcesDropdownOpen(!resourcesDropdownOpen)}
              className={`nav-item dropdown-trigger ${isActive('/resources') ? 'active' : ''}`}
              style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              Resources
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ transform: resourcesDropdownOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {resourcesDropdownOpen && (
              <div className="dropdown-menu-wrapper">
              <div style={{ 
                backgroundColor: 'var(--color-surface)', 
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                minWidth: '220px',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
              }}>
                <Link href="/resources/upskill" onClick={() => setResourcesDropdownOpen(false)} className="dropdown-item" style={{ 
                  display: 'block', 
                  padding: '10px 16px', 
                  color: 'var(--color-text-secondary)',
                  fontSize: '0.9rem',
                  borderBottom: '1px solid var(--color-border)',
                  transition: 'all 0.15s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-accent-subtle)';
                  e.currentTarget.style.color = 'var(--color-accent)';
                  const desc = e.currentTarget.querySelector('.dropdown-desc') as HTMLElement;
                  if (desc) desc.style.color = 'var(--color-accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--color-text-secondary)';
                  const desc = e.currentTarget.querySelector('.dropdown-desc') as HTMLElement;
                  if (desc) desc.style.color = 'var(--color-text-muted)';
                }}>
                  <div style={{ fontWeight: 600 }}>Upskill & Grow</div>
                  <div className="dropdown-desc" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px', transition: 'color 0.15s' }}>Programs to grow your career</div>
                </Link>

                <Link href="/resources/communities" onClick={() => setResourcesDropdownOpen(false)} className="dropdown-item" style={{ 
                  display: 'block', 
                  padding: '10px 16px', 
                  color: 'var(--color-text-secondary)',
                  fontSize: '0.9rem',
                  borderBottom: '1px solid var(--color-border)',
                  transition: 'all 0.15s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-accent-subtle)';
                  e.currentTarget.style.color = 'var(--color-accent)';
                  const desc = e.currentTarget.querySelector('.dropdown-desc') as HTMLElement;
                  if (desc) desc.style.color = 'var(--color-accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--color-text-secondary)';
                  const desc = e.currentTarget.querySelector('.dropdown-desc') as HTMLElement;
                  if (desc) desc.style.color = 'var(--color-text-muted)';
                }}>
                  <div style={{ fontWeight: 600 }}>Communities</div>
                  <div className="dropdown-desc" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px', transition: 'color 0.15s' }}>Join peer developer circles</div>
                </Link>

                <Link href="/resources/blog" onClick={() => setResourcesDropdownOpen(false)} className="dropdown-item" style={{ 
                  display: 'block', 
                  padding: '10px 16px', 
                  color: 'var(--color-text-secondary)',
                  fontSize: '0.9rem',
                  borderBottom: '1px solid var(--color-border)',
                  transition: 'all 0.15s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-accent-subtle)';
                  e.currentTarget.style.color = 'var(--color-accent)';
                  const desc = e.currentTarget.querySelector('.dropdown-desc') as HTMLElement;
                  if (desc) desc.style.color = 'var(--color-accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--color-text-secondary)';
                  const desc = e.currentTarget.querySelector('.dropdown-desc') as HTMLElement;
                  if (desc) desc.style.color = 'var(--color-text-muted)';
                }}>
                  <div style={{ fontWeight: 600 }}>Blog & Insights</div>
                  <div className="dropdown-desc" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px', transition: 'color 0.15s' }}>Latest updates and guides</div>
                </Link>

                <Link href="/resources/foundation" onClick={() => setResourcesDropdownOpen(false)} className="dropdown-item" style={{ 
                  display: 'block', 
                  padding: '10px 16px', 
                  color: 'var(--color-text-secondary)',
                  fontSize: '0.9rem',
                  transition: 'all 0.15s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-accent-subtle)';
                  e.currentTarget.style.color = 'var(--color-accent)';
                  const desc = e.currentTarget.querySelector('.dropdown-desc') as HTMLElement;
                  if (desc) desc.style.color = 'var(--color-accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--color-text-secondary)';
                  const desc = e.currentTarget.querySelector('.dropdown-desc') as HTMLElement;
                  if (desc) desc.style.color = 'var(--color-text-muted)';
                }}>
                  <div style={{ fontWeight: 600 }}>Foundation</div>
                  <div className="dropdown-desc" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px', transition: 'color 0.15s' }}>BorderLine social impact</div>
                </Link>
              </div>
              </div>
            )}
          </div>
        </nav>

        {/* Desktop Actions */}
        <div className="header-actions desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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

          {/* Sign In link */}
          <Link href="/talent/login" style={{ 
            fontSize: '0.8rem', 
            color: 'var(--color-text-secondary)', 
            fontWeight: 600, 
            textDecoration: 'none',
            marginRight: '6px',
            transition: 'color var(--transition-fast)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
            Sign In
          </Link>

          {/* Partner with Us link */}
          <Link href="/recruiter" className="btn btn-secondary btn-header-partner" style={{ borderRadius: '8px', padding: '6px 14px', fontSize: '0.8rem', fontWeight: 600 }}>
            Partner with Us
          </Link>
        </div>

        {/* Mobile Header Actions */}
        <div className="mobile-header-actions mobile-only">
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
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-toggle"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-content mobile-only">
          <nav className="mobile-nav-links">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className={`mobile-nav-item ${isActive('/') ? 'active' : ''}`}>
              Home
            </Link>
            <Link href="/talent/login" onClick={() => setMobileMenuOpen(false)} className={`mobile-nav-item ${isActive('/talent/login') || isActive('/recruiter/login') ? 'active' : ''}`} style={{ fontWeight: 600, color: 'var(--color-accent)' }}>
              Sign In
            </Link>
            <div style={{ paddingLeft: '12px', color: 'var(--color-text-primary)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', paddingTop: '12px', paddingBottom: '8px', marginTop: '8px', borderTop: '1px solid var(--color-border)' }}>
              Platform
            </div>
            <Link href="/recruiter" onClick={() => setMobileMenuOpen(false)} className={`mobile-nav-item ${isActive('/recruiter') ? 'active' : ''}`} style={{ paddingLeft: '24px' }}>
              For Recruiters
            </Link>
            <Link href="/talent" onClick={() => setMobileMenuOpen(false)} className={`mobile-nav-item ${isActive('/talent') ? 'active' : ''}`} style={{ paddingLeft: '24px' }}>
              Find Work
            </Link>
            <div style={{ paddingLeft: '12px', color: 'var(--color-text-primary)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', paddingTop: '12px', paddingBottom: '8px', marginTop: '8px', borderTop: '1px solid var(--color-border)' }}>
              Technology
            </div>
            <Link href="/whatsapp" onClick={() => setMobileMenuOpen(false)} className={`mobile-nav-item ${isActive('/whatsapp') ? 'active' : ''}`} style={{ paddingLeft: '24px' }}>
              WhatsApp Bot
            </Link>
            <Link href="/manifesto" onClick={() => setMobileMenuOpen(false)} className={`mobile-nav-item ${isActive('/manifesto') ? 'active' : ''}`} style={{ paddingLeft: '24px' }}>
              Our Manifesto
            </Link>
            <div style={{ paddingLeft: '12px', color: 'var(--color-text-primary)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', paddingTop: '12px', paddingBottom: '8px', marginTop: '8px', borderTop: '1px solid var(--color-border)' }}>
              Resources
            </div>
            <Link href="/resources/upskill" onClick={() => setMobileMenuOpen(false)} className={`mobile-nav-item ${isActive('/resources/upskill') ? 'active' : ''}`} style={{ paddingLeft: '24px' }}>
              Upskill & Grow
            </Link>
            <Link href="/resources/communities" onClick={() => setMobileMenuOpen(false)} className={`mobile-nav-item ${isActive('/resources/communities') ? 'active' : ''}`} style={{ paddingLeft: '24px' }}>
              Communities
            </Link>
            <Link href="/resources/blog" onClick={() => setMobileMenuOpen(false)} className={`mobile-nav-item ${isActive('/resources/blog') ? 'active' : ''}`} style={{ paddingLeft: '24px' }}>
              Blog & Insights
            </Link>
            <Link href="/resources/foundation" onClick={() => setMobileMenuOpen(false)} className={`mobile-nav-item ${isActive('/resources/foundation') ? 'active' : ''}`} style={{ paddingLeft: '24px' }}>
              Foundation
            </Link>
          </nav>

          <div className="mobile-drawer-divider"></div>

          <div className="mobile-drawer-footer">
            <div className="mobile-drawer-tools">
              <button 
                onClick={() => { resetDatabase(); setMobileMenuOpen(false); }} 
                className="theme-toggle"
                title="Reset Database"
                aria-label="Reset Database"
                style={{ padding: '8px 12px', width: '100%', height: 'auto', gap: '6px' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                </svg>
                <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--color-text-primary)' }}>Reset DB</span>
              </button>
              
              <button
                onClick={() => { setTheme(theme === 'dark' ? 'light' : 'dark'); setMobileMenuOpen(false); }}
                className="theme-toggle"
                aria-label="Toggle Theme"
                style={{ padding: '8px 12px', width: '100%', height: 'auto', gap: '6px' }}
              >
                {theme === 'dark' ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="4"/>
                      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                    </svg>
                    <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--color-text-primary)' }}>Light Mode</span>
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                    </svg>
                    <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--color-text-primary)' }}>Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
