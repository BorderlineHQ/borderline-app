'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '../../context/AppContext';

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: 'talent' | 'gig' | 'page';
  url: string;
}

const STATIC_PAGES: SearchResult[] = [
  { id: 'page-whatsapp', title: 'WhatsApp Bot', subtitle: 'Manage portfolio & apply to gigs over WhatsApp', type: 'page', url: '/whatsapp' },
  { id: 'page-talent', title: 'Talent Portal & Find Work', subtitle: 'Browse verified African builders and job feeds', type: 'page', url: '/talent' },
  { id: 'page-recruiter', title: 'Recruiter Portal & Hire', subtitle: 'Search proof-of-work profiles & post micro-gigs', type: 'page', url: '/recruiter' },
  { id: 'page-communities', title: 'Developer Communities', subtitle: 'Join skill circles across 54 African countries', type: 'page', url: '/resources/communities' },
  { id: 'page-teams', title: 'Teams & Payments', subtitle: 'Global payroll & escrow management', type: 'page', url: '/teams-payments' },
  { id: 'page-manifesto', title: 'Our Manifesto', subtitle: 'Africans Hiring Africans: The trust infrastructure', type: 'page', url: '/manifesto' },
];

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme, resetDatabase, profiles, gigs, jobs, mounted } = useApp();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [platformDropdownOpen, setPlatformDropdownOpen] = useState(false);
  const [techDropdownOpen, setTechDropdownOpen] = useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);

  // Search Bar State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) => {
    if (path === '/' && pathname !== '/') return false;
    return pathname?.startsWith(path);
  };

  // Compute Search Results
  const getSearchResults = (): SearchResult[] => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    const results: SearchResult[] = [];

    // Search Pages
    STATIC_PAGES.forEach(page => {
      if (page.title.toLowerCase().includes(q) || page.subtitle.toLowerCase().includes(q)) {
        results.push(page);
      }
    });

    // Search Talent / Profiles
    profiles?.slice(0, 5).forEach(profile => {
      if (
        profile.fullName.toLowerCase().includes(q) ||
        profile.techFocus.toLowerCase().includes(q) ||
        profile.country.toLowerCase().includes(q) ||
        profile.skills?.some(s => s.toLowerCase().includes(q))
      ) {
        results.push({
          id: `profile-${profile.id}`,
          title: profile.fullName,
          subtitle: `${profile.techFocus} · ${profile.country}`,
          type: 'talent',
          url: `/talent`
        });
      }
    });

    // Search Gigs & Jobs
    gigs?.slice(0, 5).forEach(gig => {
      if (
        gig.title.toLowerCase().includes(q) ||
        gig.description.toLowerCase().includes(q) ||
        gig.requiredSkills?.some(s => s.toLowerCase().includes(q))
      ) {
        results.push({
          id: `gig-${gig.id}`,
          title: gig.title,
          subtitle: `Micro-Gig · Est. GHS ${gig.budgetGHS}`,
          type: 'gig',
          url: `/recruiter`
        });
      }
    });

    jobs?.slice(0, 5).forEach(job => {
      if (
        job.title.toLowerCase().includes(q) ||
        job.description.toLowerCase().includes(q) ||
        job.requiredSkills?.some(s => s.toLowerCase().includes(q))
      ) {
        results.push({
          id: `job-${job.id}`,
          title: job.title,
          subtitle: `Full-Time Job · ${job.location}`,
          type: 'gig',
          url: `/talent`
        });
      }
    });

    return results.slice(0, 6);
  };

  const searchResults = getSearchResults();

  const handleSelectResult = (url: string) => {
    setSearchQuery('');
    setSearchFocused(false);
    setMobileSearchOpen(false);
    setMobileMenuOpen(false);
    router.push(url);
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
                  }}>
                    For Recruiters
                  </Link>
                  <Link href="/talent" onClick={() => setPlatformDropdownOpen(false)} className="dropdown-item" style={{ 
                    display: 'block', 
                    padding: '10px 16px', 
                    color: 'var(--color-text-secondary)',
                    fontSize: '0.9rem',
                    transition: 'all 0.15s'
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
              className={`nav-item dropdown-trigger ${isActive('/whatsapp') || isActive('/teams-payments') ? 'active' : ''}`}
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
                  }}>
                    WhatsApp Bot
                  </Link>
                  <Link href="/teams-payments" onClick={() => setTechDropdownOpen(false)} className="dropdown-item" style={{ 
                    display: 'block', 
                    padding: '10px 16px', 
                    color: 'var(--color-text-secondary)',
                    fontSize: '0.9rem',
                    borderBottom: '1px solid var(--color-border)',
                    transition: 'all 0.15s'
                  }}>
                    Teams & Payments
                  </Link>
                  <Link href="/manifesto" onClick={() => setTechDropdownOpen(false)} className="dropdown-item" style={{ 
                    display: 'block', 
                    padding: '10px 16px', 
                    color: 'var(--color-text-secondary)',
                    fontSize: '0.9rem',
                    transition: 'all 0.15s'
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
                  <Link href="/resources/upskill" onClick={() => setResourcesDropdownOpen(false)} className="dropdown-item" style={{ display: 'block', padding: '10px 16px', color: 'var(--color-text-secondary)', fontSize: '0.9rem', borderBottom: '1px solid var(--color-border)' }}>
                    <div style={{ fontWeight: 600 }}>Upskill & Grow</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>Programs to grow your career</div>
                  </Link>
                  <Link href="/resources/communities" onClick={() => setResourcesDropdownOpen(false)} className="dropdown-item" style={{ display: 'block', padding: '10px 16px', color: 'var(--color-text-secondary)', fontSize: '0.9rem', borderBottom: '1px solid var(--color-border)' }}>
                    <div style={{ fontWeight: 600 }}>Communities</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>Join peer developer circles</div>
                  </Link>
                  <Link href="/resources/blog" onClick={() => setResourcesDropdownOpen(false)} className="dropdown-item" style={{ display: 'block', padding: '10px 16px', color: 'var(--color-text-secondary)', fontSize: '0.9rem', borderBottom: '1px solid var(--color-border)' }}>
                    <div style={{ fontWeight: 600 }}>Blog & Insights</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>Latest updates and guides</div>
                  </Link>
                  <Link href="/resources/foundation" onClick={() => setResourcesDropdownOpen(false)} className="dropdown-item" style={{ display: 'block', padding: '10px 16px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                    <div style={{ fontWeight: 600 }}>Foundation</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>BorderLine social impact</div>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Desktop Global Search Bar */}
        <div 
          className="header-search-container desktop-only" 
          ref={searchContainerRef}
          style={{ position: 'relative', margin: '0 12px' }}
        >
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            width: searchFocused ? '240px' : '170px',
            transition: 'all 0.25s ease'
          }}>
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              style={{ position: 'absolute', left: '10px', color: 'var(--color-text-tertiary)', pointerEvents: 'none' }}
            >
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              placeholder="Search..."
              style={{
                width: '100%',
                padding: '6px 28px 6px 30px',
                fontSize: '0.8rem',
                borderRadius: '20px',
                border: searchFocused ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-text-primary)',
                outline: 'none',
                boxShadow: searchFocused ? '0 0 12px var(--color-accent-subtle)' : 'none',
                transition: 'all 0.2s ease'
              }}
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '8px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-text-tertiary)',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            )}
          </div>

          {/* Desktop Search Dropdown Results */}
          {searchFocused && searchQuery.trim() && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              width: '300px',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
              overflow: 'hidden',
              zIndex: 1000,
              animation: 'fadeIn 0.15s ease-out'
            }}>
              {searchResults.length > 0 ? (
                <div style={{ padding: '6px 0' }}>
                  <div style={{ padding: '6px 12px', fontSize: '0.68rem', fontWeight: 700, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Search Results ({searchResults.length})
                  </div>
                  {searchResults.map((res) => (
                    <button
                      key={res.id}
                      onClick={() => handleSelectResult(res.url)}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        width: '100%',
                        padding: '8px 12px',
                        border: 'none',
                        backgroundColor: 'transparent',
                        color: 'var(--color-text-primary)',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'background-color 0.15s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-accent-subtle)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <span style={{ fontSize: '1rem', marginTop: '1px' }}>
                        {res.type === 'talent' ? '👤' : res.type === 'gig' ? '💼' : '⚡'}
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.82rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {res.title}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {res.subtitle}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div style={{ padding: '16px 12px', fontSize: '0.8rem', color: 'var(--color-text-secondary)', textAlign: 'center' }}>
                  No results matching &quot;{searchQuery}&quot;
                </div>
              )}
            </div>
          )}
        </div>

        {/* Desktop Actions */}
        <div className="header-actions desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button 
              onClick={resetDatabase} 
              className="theme-toggle"
              title="Reset Database"
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

          <Link href="/talent/login" style={{ 
            fontSize: '0.8rem', 
            color: 'var(--color-text-secondary)', 
            fontWeight: 600, 
            textDecoration: 'none',
            marginRight: '4px'
          }}>
            Sign In
          </Link>

          <Link href="/recruiter" className="btn btn-secondary btn-header-partner" style={{ borderRadius: '8px', padding: '6px 14px', fontSize: '0.8rem', fontWeight: 600 }}>
            Partner with Us
          </Link>
        </div>

        {/* Mobile Header Actions */}
        <div className="mobile-header-actions mobile-only" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Mobile Search Toggle Button */}
          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="theme-toggle"
            aria-label="Search"
            style={{ width: '32px', height: '32px', padding: 0 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
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

      {/* Mobile Expanding Search Bar Bar */}
      {mobileSearchOpen && (
        <div style={{
          padding: '8px 16px 12px 16px',
          backgroundColor: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
          position: 'relative'
        }} className="mobile-only">
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ position: 'absolute', left: '12px', color: 'var(--color-text-tertiary)' }}>
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search talent, micro-gigs, or pages..."
              style={{
                width: '100%',
                padding: '8px 32px 8px 34px',
                borderRadius: '20px',
                border: '1px solid var(--color-accent)',
                backgroundColor: 'var(--color-bg)',
                color: 'var(--color-text-primary)',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Mobile Search Results */}
          {searchQuery.trim() && (
            <div style={{
              marginTop: '8px',
              backgroundColor: 'var(--color-surface-elevated)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              maxHeight: '260px',
              overflowY: 'auto'
            }}>
              {searchResults.length > 0 ? (
                searchResults.map(res => (
                  <button
                    key={res.id}
                    onClick={() => handleSelectResult(res.url)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      width: '100%',
                      padding: '10px 12px',
                      border: 'none',
                      borderBottom: '1px solid var(--color-border)',
                      backgroundColor: 'transparent',
                      color: 'var(--color-text-primary)',
                      textAlign: 'left'
                    }}
                  >
                    <span>{res.type === 'talent' ? '👤' : res.type === 'gig' ? '💼' : '⚡'}</span>
                    <div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>{res.title}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)' }}>{res.subtitle}</div>
                    </div>
                  </button>
                ))
              ) : (
                <div style={{ padding: '12px', fontSize: '0.8rem', color: 'var(--color-text-secondary)', textAlign: 'center' }}>
                  No results found.
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-content mobile-only">
          {/* Search inside drawer */}
          <div style={{ padding: '8px 12px 12px 12px' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ position: 'absolute', left: '12px', color: 'var(--color-text-tertiary)' }}>
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 34px',
                  borderRadius: '20px',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text-primary)',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

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
            <Link href="/teams-payments" onClick={() => setMobileMenuOpen(false)} className={`mobile-nav-item ${isActive('/teams-payments') ? 'active' : ''}`} style={{ paddingLeft: '24px' }}>
              Teams & Payments
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
