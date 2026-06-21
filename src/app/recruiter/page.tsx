'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Profile, Gig, RecruiterProfile, Project } from '../../types';

export default function RecruiterPortal() {
  const {
    profiles,
    gigs,
    applications,
    recruiters,
    activeRecruiterId,
    setActiveRecruiterId,
    postGig,
    updateApplicationStatus,
    mounted
  } = useApp();

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [onlyVerified, setOnlyVerified] = useState(false);

  // View state: Drawer for active candidate
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Modal state: Post a gig
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gigTitle, setGigTitle] = useState('');
  const [gigDesc, setGigDesc] = useState('');
  const [gigBudget, setGigBudget] = useState('');
  const [gigReqSkills, setGigReqSkills] = useState<string[]>([]);

  if (!mounted) return null;

  const activeRecruiter = recruiters.find(r => r.id === activeRecruiterId) || recruiters[0];

  // List of all unique skills in the system for filtering
  const allAvailableSkills = ['React', 'Node.js', 'Express', 'PostgreSQL', 'TypeScript', 'TailwindCSS', 'Figma', 'UI/UX Design', 'Accessibility', 'Python', 'FastAPI', 'Django', 'USSD Protocols'];

  const toggleSkillFilter = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const toggleModalSkill = (skill: string) => {
    setGigReqSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  // Filter candidates
  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = profile.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          profile.techFocus.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCountry = selectedCountry === 'All' || profile.country === selectedCountry;
    
    const matchesVerified = !onlyVerified || profile.isVerified;
    
    const matchesSkills = selectedSkills.length === 0 || 
                          selectedSkills.every(s => profile.skills.includes(s));

    return matchesSearch && matchesCountry && matchesVerified && matchesSkills;
  });

  const handleOpenProfile = (profile: Profile) => {
    setSelectedProfile(profile);
    if (profile.projects.length > 0) {
      setActiveProject(profile.projects[0]);
    } else {
      setActiveProject(null);
    }
  };

  const handlePostGig = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gigTitle || !gigDesc || !gigBudget) return;

    postGig(gigTitle, gigDesc, gigReqSkills, parseFloat(gigBudget));
    
    // Reset form
    setGigTitle('');
    setGigDesc('');
    setGigBudget('');
    setGigReqSkills([]);
    setIsModalOpen(false);
  };

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
        elements.push(<h3 key={idx}>{line.substring(4)}</h3>);
      } else if (isBullet) {
        inList = true;
        listItems.push(<li key={idx}>{line.substring(2)}</li>);
      } else if (line.trim() === '') {
        // Skip
      } else {
        elements.push(<p key={idx}>{line}</p>);
      }
    });

    if (inList) {
      elements.push(<ul key="list-final">{[...listItems]}</ul>);
    }

    return <div className="markdown-render">{elements}</div>;
  };

  // Find recruiter posted gigs
  const recruiterGigs = gigs.filter(g => g.recruiterId === activeRecruiter.id);

  // Find applications submitted to this recruiter's gigs
  const recruiterApplications = applications.filter(app => {
    const gig = gigs.find(g => g.id === app.gigId);
    return gig?.recruiterId === activeRecruiter.id;
  });

  return (
    <div className="portal-container">
      <h1 style={{ display: 'none' }}>Recruiter Portal - BorderLine Africa's Emerging Digital Workforce</h1>
      <div className={`recruiter-grid ${selectedProfile ? 'has-drawer' : ''}`} id="recruiter-grid-layout">
        
        {/* Left Column: Recruiter profile selector and filters */}
        <aside className="recruiter-sidebar" id="recruiter-sidebar-filters">
          {/* Recruiter Switcher */}
          <div className="filter-section" id="filter-org-section">
            <h4 className="filter-title">Hiring Organization (Demo)</h4>
            <select
              id="recruiter-org-select"
              value={activeRecruiterId}
              onChange={(e) => {
                setActiveRecruiterId(e.target.value);
                setSelectedProfile(null);
              }}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-surface-elevated)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              {recruiters.map(r => (
                <option key={r.id} value={r.id}>{r.companyName}</option>
              ))}
            </select>
            <div style={{ marginTop: '10px', fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }} id="recruiter-website-url">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              <span>Website: <a href={activeRecruiter.website} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)' }}>{activeRecruiter.website}</a></span>
            </div>
          </div>

          {/* Search */}
          <div className="filter-section" id="filter-search-section">
            <h4 className="filter-title">Search Candidates</h4>
            <input
              type="text"
              id="candidate-search-input"
              className="form-input"
              style={{ width: '100%', padding: '8px 12px', fontSize: '0.85rem' }}
              placeholder="Search by name or focus..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Country Filter */}
          <div className="filter-section" id="filter-country-section">
            <h4 className="filter-title">Geographical Hub</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {['All', 'Ghana', 'Kenya', 'Senegal'].map(country => (
                <label key={country} className="filter-checkbox-label" style={{ fontWeight: selectedCountry === country ? '700' : '400' }} htmlFor={`radio-country-${country}`}>
                  <input
                    type="radio"
                    id={`radio-country-${country}`}
                    name="country-filter"
                    checked={selectedCountry === country}
                    onChange={() => setSelectedCountry(country)}
                  />
                  {country === 'All' ? 'All Africa' : country}
                </label>
              ))}
            </div>
          </div>

          {/* Verified Badge Filter */}
          <div className="filter-section" id="filter-badge-section">
            <h4 className="filter-title">Trust Verification</h4>
            <label className="filter-checkbox-label" htmlFor="checkbox-verified-only" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <input
                type="checkbox"
                id="checkbox-verified-only"
                checked={onlyVerified}
                onChange={(e) => setOnlyVerified(e.target.checked)}
              />
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              AI-Verified Badges Only
            </label>
          </div>

          {/* Skills Checklist */}
          <div className="filter-section" id="filter-skills-section">
            <h4 className="filter-title">Required Skills</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '180px', overflowY: 'auto', paddingRight: '4px' }}>
              {allAvailableSkills.map(skill => (
                <label key={skill} className="filter-checkbox-label" htmlFor={`checkbox-skill-${skill.replace(/\s+/g, '-').toLowerCase()}`}>
                  <input
                    type="checkbox"
                    id={`checkbox-skill-${skill.replace(/\s+/g, '-').toLowerCase()}`}
                    checked={selectedSkills.includes(skill)}
                    onChange={() => toggleSkillFilter(skill)}
                  />
                  {skill}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Center Column: Feed and Gig Manager */}
        <section id="recruiter-center-feed" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
          {/* Dashboard Stats Panel */}
          <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }} id="recruiter-stats-banner">
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }} id="recruiter-org-workspace-header">{activeRecruiter.companyName} Workspace</h1>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                Manage your active posted micro-gigs and review incoming applicant portfolios.
              </p>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="btn btn-primary" id="btn-open-post-gig-modal" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Post a Micro-Gig
            </button>
          </div>

          {/* Active Recruiter Gigs */}
          <div className="card" id="recruiter-posted-gigs-card">
            <h3 style={{ fontSize: '1.2rem', marginBottom: 'var(--spacing-md)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              Active Posted Gigs ({recruiterGigs.length})
            </h3>
            {recruiterGigs.length === 0 ? (
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-tertiary)' }} id="no-gigs-alert">No active gigs posted. Create one using the button above.</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }} id="recruiter-gigs-grid">
                {recruiterGigs.map(gig => {
                  const appCount = applications.filter(a => a.gigId === gig.id).length;
                  return (
                    <div key={gig.id} className="phone-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} id={`recruiter-gig-card-${gig.id}`}>
                      <div>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '2px' }}>{gig.title}</h4>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-accent)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                          GHS {gig.budgetGHS}
                        </div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', margin: '8px 0', lineBreak: 'anywhere' }}>
                          {gig.description.length > 80 ? `${gig.description.substring(0, 80)}...` : gig.description}
                        </p>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border)', paddingTop: '8px', marginTop: '8px' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--color-text-tertiary)' }}>Skills required: {gig.requiredSkills.length}</span>
                        <span className="badge badge-accent" style={{ fontSize: '0.65rem' }}>{appCount} Applicants</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Candidates Feed */}
          <div id="recruiter-candidates-feed">
            <div className="recruiter-feed-header">
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                Emerging Builders Pipeline ({filteredProfiles.length})
              </h3>
              {selectedSkills.length > 0 && (
                <button 
                  onClick={() => setSelectedSkills([])} 
                  className="btn btn-secondary" 
                  style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                  id="btn-clear-skill-filters"
                >
                  Clear Filters ({selectedSkills.length})
                </button>
              )}
            </div>

            {filteredProfiles.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: 'var(--spacing-xxl)' }} id="no-candidates-alert">
                <p style={{ color: 'var(--color-text-tertiary)' }}>No candidates match your filters. Try widening your criteria.</p>
              </div>
            ) : (
              <div className="talent-cards-grid" id="recruiter-candidates-grid">
                {filteredProfiles.map(profile => {
                  // Check if candidate applied to any of recruiter's gigs
                  const appliedGig = recruiterApplications.find(app => app.profileId === profile.id);
                  
                  return (
                    <div
                      key={profile.id}
                      id={`talent-feed-card-${profile.id}`}
                      onClick={() => handleOpenProfile(profile)}
                      className={`talent-feed-card ${selectedProfile?.id === profile.id ? 'selected' : ''}`}
                    >
                      <div>
                        <div className="card-header">
                          <img src={profile.avatarUrl} alt={profile.fullName} className="card-avatar" />
                          <div className="card-title-wrap">
                            <h4 className="card-name">
                              {profile.fullName}
                              {profile.isVerified && (
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px', display: 'inline-block', verticalAlign: 'middle' }}>
                                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                  <path d="m9 11 2 2 4-4"/>
                                </svg>
                              )}
                            </h4>
                            <div className="card-focus">{profile.techFocus}</div>
                          </div>
                        </div>
                        <p className="card-body-text">{profile.bio}</p>
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span className="badge" style={{ fontSize: '0.65rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                            {profile.country}
                          </span>
                          {appliedGig && (
                            <span className="badge badge-accent" style={{ fontSize: '0.65rem', backgroundColor: '#10B981', color: '#FFF', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                              Applied
                            </span>
                          )}
                        </div>
                        <div className="card-footer-skills">
                          {profile.skills.slice(0, 4).map((skill, i) => (
                            <span key={i} className="badge badge-verified" style={{ fontSize: '0.65rem', padding: '2px 4px' }}>
                              {skill}
                            </span>
                          ))}
                          {profile.skills.length > 4 && (
                            <span className="badge" style={{ fontSize: '0.65rem', padding: '2px 4px' }}>
                              +{profile.skills.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

      </div>

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

            <div style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--spacing-md)' }}>
              <img 
                src={selectedProfile.avatarUrl} 
                alt={selectedProfile.fullName} 
                style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }}
                id="drawer-candidate-avatar"
              />
              <div>
                <h3 style={{ fontSize: '1.25rem' }} id="drawer-candidate-name">{selectedProfile.fullName}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{selectedProfile.techFocus}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }} id="drawer-candidate-contact">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>{selectedProfile.country}</span>
                  <span style={{ color: 'var(--color-text-tertiary)' }}>•</span>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <span>{selectedProfile.whatsappNum}</span>
                </p>
              </div>
            </div>

            {/* Applications review workflow */}
            {recruiterApplications.filter(app => app.profileId === selectedProfile.id).length > 0 && (
              <div style={{ backgroundColor: 'var(--color-accent-subtle)', border: '1px solid var(--color-accent)', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-md)' }} id="drawer-applications-review">
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-accent)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                  Applicant Reviews
                </h4>
                {recruiterApplications
                  .filter(app => app.profileId === selectedProfile.id)
                  .map(app => {
                    const gig = gigs.find(g => g.id === app.gigId);
                    return (
                      <div key={app.id} style={{ fontSize: '0.8rem', marginBottom: '8px', borderBottom: '1px dotted var(--color-border)', paddingBottom: '8px' }} id={`application-review-${app.id}`}>
                        <div>Gig: <strong>{gig?.title}</strong></div>
                        <div style={{ margin: '4px 0' }}>Status: <span className="badge" style={{ fontSize: '0.65rem' }}>{app.status}</span></div>
                        
                        <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                          <button 
                            onClick={() => updateApplicationStatus(app.id, 'SHORTLISTED')}
                            className="btn btn-primary" 
                            style={{ padding: '4px 8px', fontSize: '0.7rem' }}
                            id={`btn-shortlist-candidate-${app.id}`}
                          >
                            Shortlist
                          </button>
                          <button 
                            onClick={() => updateApplicationStatus(app.id, 'HIRED')}
                            className="btn btn-primary" 
                            style={{ padding: '4px 8px', fontSize: '0.7rem', backgroundColor: 'var(--color-accent-secondary)' }}
                            id={`btn-hire-candidate-${app.id}`}
                          >
                            Hire Builder
                          </button>
                          <button 
                            onClick={() => updateApplicationStatus(app.id, 'REJECTED')}
                            className="btn btn-danger" 
                            style={{ padding: '4px 8px', fontSize: '0.7rem' }}
                            id={`btn-reject-candidate-${app.id}`}
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}

            <div>
              <h4 className="switcher-title" style={{ marginBottom: '8px' }}>Developer Bio</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.5' }} id="drawer-candidate-bio">{selectedProfile.bio}</p>
            </div>

            <div>
              <h4 className="switcher-title" style={{ marginBottom: '8px' }}>Verified Skillset</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }} id="drawer-candidate-skills">
                {selectedProfile.skills.map((s, i) => (
                  <span key={i} className="badge badge-verified" style={{ fontSize: '0.7rem' }}>{s}</span>
                ))}
              </div>
            </div>

            {/* Case Studies */}
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--spacing-md)' }} id="drawer-case-studies-block">
              <h4 className="switcher-title" style={{ marginBottom: '10px' }}>AI-Verified Case Studies</h4>
              
              {selectedProfile.projects.length === 0 ? (
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)' }} id="drawer-no-projects">No case studies compiled yet.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} id="drawer-case-studies-container">
                  <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }} id="drawer-projects-tabs">
                    {selectedProfile.projects.map(p => (
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
                        {activeProject.isAudited ? (
                          <span style={{ fontSize: '0.6rem', color: 'var(--color-accent)' }}>✓ Audited</span>
                        ) : (
                          <span style={{ fontSize: '0.6rem', color: 'var(--color-text-tertiary)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                            Pending Audit
                          </span>
                        )}
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                        {activeProject.verifiedSkills.map((s, i) => (
                          <span key={i} className="badge badge-accent" style={{ fontSize: '0.65rem', padding: '1px 4px' }}>{s}</span>
                        ))}
                      </div>
                      {renderMarkdown(activeProject.aiSummary)}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Post a Gig Modal Dialog */}
      {isModalOpen && (
        <div className="modal-overlay" id="gig-modal-overlay">
          <div className="modal-content" id="gig-modal-content">
            <div className="modal-header">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Post a Micro-Gig</h3>
              <button 
                id="btn-close-gig-modal-x"
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.2rem', color: 'var(--color-text-secondary)', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePostGig} id="form-post-gig">
              <div className="form-group">
                <label className="form-label" htmlFor="gig-title-input">Gig Title</label>
                <input 
                  type="text" 
                  id="gig-title-input"
                  className="form-input" 
                  placeholder="e.g. Next.js Shopkeeper Dashboard"
                  value={gigTitle}
                  onChange={(e) => setGigTitle(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="gig-desc-input">Description & Requirements</label>
                <textarea 
                  id="gig-desc-input"
                  className="form-textarea" 
                  placeholder="Detail the tasks, deliverables, and expectation. Budget is in Ghanaian Cedis (GHS)."
                  value={gigDesc}
                  onChange={(e) => setGigDesc(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="gig-budget-input">Budget (GHS)</label>
                <input 
                  type="number" 
                  id="gig-budget-input"
                  className="form-input" 
                  placeholder="e.g. 4500"
                  value={gigBudget}
                  onChange={(e) => setGigBudget(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group" style={{ marginBottom: 'var(--spacing-lg)' }}>
                <label className="form-label">Required Skills</label>
                <div className="skills-select-grid" id="gig-skills-select-grid">
                  {allAvailableSkills.map(skill => (
                    <label key={skill} className="filter-checkbox-label" style={{ fontSize: '0.75rem' }} htmlFor={`modal-skill-${skill.replace(/\s+/g, '-').toLowerCase()}`}>
                      <input
                        type="checkbox"
                        id={`modal-skill-${skill.replace(/\s+/g, '-').toLowerCase()}`}
                        checked={gigReqSkills.includes(skill)}
                        onChange={() => toggleModalSkill(skill)}
                      />
                      {skill}
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} id="btn-submit-publish-gig">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 22 22 22 12 2"/></svg>
                Publish Micro-Gig & Find Matches
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
