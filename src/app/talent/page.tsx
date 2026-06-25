'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useApp } from '../../context/AppContext';
import { Profile, Project, Gig } from '../../types';

export default function TalentPortal() {
  const { 
    profiles, 
    gigs, 
    applications, 
    activeProfileId, 
    setActiveProfileId, 
    addProject, 
    applyForGig,
    mounted 
  } = useApp();

  const [title, setTitle] = useState('');
  const [rawInput, setRawInput] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [figmaUrl, setFigmaUrl] = useState('');

  // AI log stream simulation state
  const [isParsing, setIsParsing] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Active project selection for detailed viewing
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Find currently active profile
  const currentProfile = profiles.find(p => p.id === activeProfileId) || profiles[0];

  useEffect(() => {
    if (currentProfile && currentProfile.projects.length > 0) {
      setActiveProject(currentProfile.projects[0]);
    } else {
      setActiveProject(null);
    }
  }, [activeProfileId, profiles, currentProfile]);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  if (!mounted || !currentProfile) return null;

  // Form submit to trigger AI Portfolio Compiler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !rawInput) return;

    setIsParsing(true);
    setLogs([]);

    const logSequence = [
      '[INITIATING] Ingesting repository streams and raw developer notes...',
      '[SCANNING] Mapping code modules, file structures, and dependencies...',
      '[AUDITING] Evaluating framework structural integrity and complexity...',
      '[EXTRACTING] Identifying technical competencies, design systems, and APIs...',
      '[TRANSLATING] Compiling raw capabilities into a result-oriented case study...',
      '[BUILDING] Formatting document, aligning design metrics, and signing trust token...',
      '[SUCCESS] AI Case Study generated! Technical skills synced with profile.'
    ];

    // Stream logs
    for (let i = 0; i < logSequence.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 400));
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${logSequence[i]}`]);
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Add project to context state
    await addProject(currentProfile.id, title, rawInput, githubUrl, figmaUrl);

    // Reset form fields
    setTitle('');
    setRawInput('');
    setGithubUrl('');
    setFigmaUrl('');
    setIsParsing(false);
  };

  // Helper function to render case study markdown
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
        // Skip empty lines or push spacing
      } else {
        elements.push(<p key={idx}>{line}</p>);
      }
    });

    if (inList) {
      elements.push(<ul key="list-final">{[...listItems]}</ul>);
    }

    return <div className="markdown-render">{elements}</div>;
  };

  // Calculate matching score for a gig
  const calculateMatchScore = (gig: Gig) => {
    const shared = gig.requiredSkills.filter(s => currentProfile.skills.includes(s));
    if (gig.requiredSkills.length === 0) return 0;
    return Math.round((shared.length / gig.requiredSkills.length) * 100);
  };

  // Sort gigs by matching percentage
  const matchedGigs = gigs
    .map(gig => ({ gig, score: calculateMatchScore(gig) }))
    .filter(m => m.score > 0)
    .sort((a, b) => b.score - a.score);

  return (
    <div className="portal-container">
      <div className="portal-grid">
        
        {/* Left Column: Profile Card & Profile Switcher */}
        <aside className="profile-sidebar">
          <div className="profile-avatar-wrap">
            <img 
              src={currentProfile.avatarUrl || 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200'} 
              alt={currentProfile.fullName}
              className="profile-avatar"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="profile-info">
            <h2 className="profile-name">
              {currentProfile.fullName} 
              {currentProfile.isVerified && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '6px', display: 'inline-block', verticalAlign: 'middle' }}>
                  <title>Verified Profile</title>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="m9 11 2 2 4-4"/>
                </svg>
              )}
            </h2>
            <div className="profile-focus">{currentProfile.techFocus}</div>
            <div className="badge badge-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              {currentProfile.country}
            </div>
            <p className="profile-bio">{currentProfile.bio}</p>
          </div>

          <div style={{ marginBottom: 'var(--spacing-md)' }}>
            <h4 className="switcher-title">Verified Skills</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
              {currentProfile.skills.map((skill, idx) => (
                <span key={idx} className="badge badge-verified">{skill}</span>
              ))}
            </div>
          </div>

          {/* Profile Switcher */}
          <div className="talent-switcher">
            <h4 className="switcher-title">Switch Developer (Demo)</h4>
            {profiles.map(p => (
              <button 
                key={p.id}
                id={`btn-switch-talent-${p.id}`}
                onClick={() => setActiveProfileId(p.id)}
                className={`switcher-btn ${p.id === activeProfileId ? 'active' : ''}`}
              >
                <img 
                  src={p.avatarUrl} 
                  alt={p.fullName}
                  style={{ width: '20px', height: '20px', borderRadius: '50%', objectFit: 'cover' }}
                />
                {p.fullName}
              </button>
            ))}
          </div>
        </aside>

        {/* Center Column: AI Case Study Builder & Case Study Viewer */}
        <section className="workspace-panel">
          <h1 id="talent-workspace-title" style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 'var(--spacing-sm)' }}>Talent Workspace</h1>
          {/* AI Compiler Form */}
          <div className="card">
            <h3 style={{ fontSize: '1.4rem', marginBottom: 'var(--spacing-md)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4M8 8h8"/></svg>
              AI Case Study Compiler
            </h3>
            <p style={{ fontSize: '0.9rem', marginBottom: 'var(--spacing-lg)' }}>
              Paste your raw project notes, class assignments, or code descriptions. Our AI will automatically evaluate your code patterns, extract technical skill tags, and write a results-oriented case study.
            </p>

            {isParsing ? (
              <div className="log-console">
                <div style={{ borderBottom: '1px solid #1F2937', paddingBottom: '8px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>BORDERLINE AI PARSER v1.0.3</span>
                  <span style={{ animation: 'pulse 1.5s infinite' }}>● ACTIVE</span>
                </div>
                {logs.map((log, idx) => (
                  <div key={idx} className="log-line">
                    <span>&gt;</span>
                    <div>{log}</div>
                  </div>
                ))}
                <div ref={logEndRef} />
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="project-title-input">Project Title</label>
                  <input 
                    type="text" 
                    id="project-title-input"
                    className="form-input" 
                    placeholder="e.g. Momo Escrow API, AgriDist USSD"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="project-raw-notes-input">Raw Notes or Code Description</label>
                  <textarea 
                    id="project-raw-notes-input"
                    className="form-textarea" 
                    placeholder="Paste messy notes, list of tools, what you did, or copy paste code. For example: 'Built a ledger screen for cocoa farmers in React. Uses local storage for offline. Fast responses.'"
                    value={rawInput}
                    onChange={(e) => setRawInput(e.target.value)}
                    required
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="project-github-input">GitHub Repository URL (Optional)</label>
                    <input 
                      type="url" 
                      id="project-github-input"
                      className="form-input" 
                      placeholder="https://github.com/username/repo"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="project-figma-input">Figma Link (Optional)</label>
                    <input 
                      type="url" 
                      id="project-figma-input"
                      className="form-input" 
                      placeholder="https://figma.com/file/..."
                      value={figmaUrl}
                      onChange={(e) => setFigmaUrl(e.target.value)}
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} id="btn-submit-project">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 22 22 22 12 2"/></svg>
                  Compile & Verify Project Case Study
                </button>
              </form>
            )}
          </div>

          {/* Portfolio Viewer */}
          <div className="card">
            <h3 style={{ fontSize: '1.4rem', marginBottom: 'var(--spacing-md)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
              Active Portfolios ({currentProfile.projects.length})
            </h3>
            
            {currentProfile.projects.length === 0 ? (
              <p style={{ textAlign: 'center', padding: 'var(--spacing-lg)', color: 'var(--color-text-tertiary)' }}>
                No projects compiled yet. Use the compiler above or text the WhatsApp Sandbox!
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', borderBottom: '1px solid var(--color-border)' }}>
                  {currentProfile.projects.map((proj) => (
                    <button
                      key={proj.id}
                      onClick={() => setActiveProject(proj)}
                      className={`btn ${activeProject?.id === proj.id ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ padding: '6px 12px', fontSize: '0.85rem', whiteSpace: 'nowrap' }}
                    >
                      {proj.title}
                    </button>
                  ))}
                </div>

                {activeProject && (
                  <div style={{ marginTop: 'var(--spacing-sm)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)', flexWrap: 'wrap', gap: '8px' }}>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{activeProject.title}</h4>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {activeProject.isAudited ? (
                          <span className="badge badge-verified" style={{ borderColor: 'var(--color-accent)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            Audited & Verified
                          </span>
                        ) : (
                          <span className="badge" style={{ backgroundColor: 'var(--color-accent-subtle)', color: 'var(--color-accent-secondary)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                            Pending Auditing
                          </span>
                        )}
                        {activeProject.githubUrl && (
                          <a href={activeProject.githubUrl} target="_blank" rel="noopener noreferrer" className="badge" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                            GitHub
                          </a>
                        )}
                        {activeProject.figmaUrl && (
                          <a href={activeProject.figmaUrl} target="_blank" rel="noopener noreferrer" className="badge" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"/><path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"/></svg>
                            Figma
                          </a>
                        )}
                      </div>
                    </div>

                    <div style={{ marginBottom: 'var(--spacing-md)' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)', fontWeight: 600 }}>AUTO EXTRACTED SKILLS:</span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                        {activeProject.verifiedSkills.length > 0 ? (
                          activeProject.verifiedSkills.map((s, i) => (
                            <span key={i} className="badge badge-accent" style={{ fontSize: '0.7rem' }}>{s}</span>
                          ))
                        ) : (
                          <span className="badge" style={{ fontSize: '0.7rem' }}>Extracting...</span>
                        )}
                      </div>
                    </div>

                    <div style={{ padding: 'var(--spacing-md)', backgroundColor: 'var(--color-surface-elevated)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
                      {renderMarkdown(activeProject.aiSummary)}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Right Column: Phone Mockup Gigs Match Simulator */}
        <section className="phone-mockup-wrapper">
          <div className="phone-mockup">
            <div className="phone-notch"></div>
            <div className="phone-header-bar">
              <span>9:41</span>
              <span>📶 🔋 3G</span>
            </div>
            
            <div className="phone-content" style={{ fontSize: '0.9rem' }}>
              <div className="phone-title" style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                Matches Feed
              </div>
              <p className="phone-subtitle" style={{ fontSize: '0.7rem' }}>
                Simulating your matches. Our AI proactively matches your verified skills and applies on your behalf.
              </p>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                {matchedGigs.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: 'var(--spacing-xl)', color: 'var(--color-text-tertiary)', fontSize: '0.8rem' }}>
                    No gigs match your verified skill tags yet. Add projects to parse skills!
                  </div>
                ) : (
                  matchedGigs.map(({ gig, score }) => {
                    const isApplied = applications.some(a => a.gigId === gig.id && a.profileId === currentProfile.id);
                    return (
                      <div key={gig.id} className="phone-card" style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                        {gig.logoUrl && (
                          <img 
                            src={gig.logoUrl} 
                            alt={gig.companyName} 
                            style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, marginTop: '2px' }} 
                          />
                        )}
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                              {gig.title}
                            </span>
                            <span className="badge badge-accent" style={{ fontSize: '0.65rem', padding: '2px 6px', whiteSpace: 'nowrap' }}>
                              {score}% Match
                            </span>
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="22" x2="9" y2="16"/><line x1="15" y1="22" x2="15" y2="16"/><path d="M9 16h6"/></svg>
                            <span>{gig.companyName}</span>
                            <span style={{ color: 'var(--color-text-tertiary)' }}>•</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                            <span>GHS {gig.budgetGHS}</span>
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '10px' }}>
                            {gig.requiredSkills.map((s, i) => (
                              <span 
                                key={i} 
                                className="badge" 
                                style={{ 
                                  fontSize: '0.6rem', 
                                  padding: '1px 4px', 
                                  backgroundColor: currentProfile.skills.includes(s) ? 'var(--color-accent-subtle)' : 'var(--color-border)',
                                  color: currentProfile.skills.includes(s) ? 'var(--color-accent)' : 'var(--color-text-secondary)'
                                }}
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                          {isApplied ? (
                            <button 
                              id={`btn-apply-gig-${gig.id}-applied`}
                              className="btn btn-secondary" 
                              style={{ width: '100%', padding: '6px', fontSize: '0.75rem', cursor: 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }} 
                              disabled
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                              Applied
                            </button>
                          ) : (
                            <button 
                              id={`btn-apply-gig-${gig.id}`}
                              onClick={() => applyForGig(gig.id, currentProfile.id)}
                              className="btn btn-primary" 
                              style={{ width: '100%', padding: '6px', fontSize: '0.75rem' }}
                            >
                              Apply Instantly
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
