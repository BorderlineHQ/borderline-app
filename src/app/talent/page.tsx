'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Gig, Job } from '../../types';
import TalentHeader from '../../components/talent/TalentHeader';
import TalentSidebar from '../../components/talent/TalentSidebar';
import GigCard from '../../components/talent/GigCard';
import ProjectCard from '../../components/talent/ProjectCard';
import { currencySymbols } from '../../data/teamsData';

type TabType = 'opportunities' | 'portfolio' | 'verify' | 'contracts' | 'resources' | 'notifications' | 'settings';

export default function TalentPortal() {
  const { 
    profiles, 
    gigs, 
    jobs,
    applications, 
    activeProfileId, 
    setActiveProfileId, 
    addProject, 
    applyForGig,
    applyForJob,
    toggleVerifyProject,
    theme,
    setTheme,
    resetDatabase,
    teamMembers,
    paymentHistory,
    mounted 
  } = useApp();

  const [activeTab, setActiveTab] = useState<TabType>('opportunities');
  const [opportunityType, setOpportunityType] = useState<'GIGS' | 'JOBS'>('GIGS');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Form states for AI Compiler
  const [title, setTitle] = useState('');
  const [rawInput, setRawInput] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [figmaUrl, setFigmaUrl] = useState('');

  // AI log stream simulation state
  const [isParsing, setIsParsing] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Find currently active profile
  const currentProfile = profiles.find(p => p.id === activeProfileId) || profiles[0];

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  if (!mounted || !currentProfile) return null;

  // Form submit to trigger AI Portfolio Compiler inside the drawer
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

    // Reset form fields & close drawer
    setTitle('');
    setRawInput('');
    setGithubUrl('');
    setFigmaUrl('');
    setIsParsing(false);
    setIsDrawerOpen(false);
    setActiveTab('portfolio'); // Automatically switch to portfolio to see result
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
        elements.push(<ul key={`list-${idx}`} className="list-disc pl-5 mb-3">{[...listItems]}</ul>);
        listItems.length = 0;
        inList = false;
      }

      if (isHeader) {
        elements.push(<h4 key={idx} className="font-bold text-sm mt-3 mb-2 text-white border-b border-gray-800 pb-1">{line.substring(4)}</h4>);
      } else if (isBullet) {
        inList = true;
        listItems.push(<li key={idx} className="text-xs text-gray-400 mb-1">{line.substring(2)}</li>);
      } else if (line.trim() === '') {
        // Skip
      } else {
        elements.push(<p key={idx} className="text-xs text-gray-400 mb-2">{line}</p>);
      }
    });

    if (inList) {
      elements.push(<ul key="list-final" className="list-disc pl-5 mb-3">{[...listItems]}</ul>);
    }

    return <div className="markdown-render">{elements}</div>;
  };

  // Calculate matching score for a gig
  const calculateMatchScore = (gig: Gig) => {
    const shared = gig.requiredSkills.filter(s => currentProfile.skills.includes(s));
    if (gig.requiredSkills.length === 0) return 0;
    return Math.round((shared.length / gig.requiredSkills.length) * 100);
  };

  // Calculate matching score for a job
  const calculateJobMatchScore = (job: Job) => {
    const shared = job.requiredSkills.filter(s => currentProfile.skills.includes(s));
    if (job.requiredSkills.length === 0) return 0;
    return Math.round((shared.length / job.requiredSkills.length) * 100);
  };

  // Matched gigs
  const matchedGigs = gigs
    .map(gig => ({ gig, score: calculateMatchScore(gig) }))
    .filter(m => m.score > 0)
    .sort((a, b) => b.score - a.score);

  // Matched jobs
  const matchedJobs = jobs
    .map(job => ({ job, score: calculateJobMatchScore(job) }))
    .filter(m => m.score > 0)
    .sort((a, b) => b.score - a.score);

  // Derived user notifications
  const userApplications = applications.filter(a => a.profileId === currentProfile.id);
  const notificationsList = [
    // Pre-populate with general notifications
    {
      id: 'notif-welcome',
      message: `Welcome to BorderLine, ${currentProfile.fullName}! Connect your WhatsApp sandbox to apply to gigs via SMS.`,
      time: 'Just now',
      status: 'pending'
    },
    ...userApplications.map(app => {
      const gig = gigs.find(g => g.id === app.gigId);
      let statusMsg = '';
      if (app.status === 'PENDING') statusMsg = `Your application for ${gig?.title || 'Gig'} at ${gig?.companyName || 'Startup'} was submitted successfully.`;
      if (app.status === 'SHORTLISTED') statusMsg = `🔥 Great news! ${gig?.companyName || 'Startup'} shortlisted your profile for ${gig?.title || 'Gig'}. Prepare for contact.`;
      if (app.status === 'HIRED') statusMsg = `🎉 Congratulations! You have been hired by ${gig?.companyName || 'Startup'} for ${gig?.title || 'Gig'}. Check your WhatsApp.`;
      if (app.status === 'REJECTED') statusMsg = `${gig?.companyName || 'Startup'} closed the gig ${gig?.title || 'Gig'} and your application was not selected.`;
      
      return {
        id: app.id,
        message: statusMsg,
        time: new Date(app.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' }),
        status: app.status.toLowerCase()
      };
    })
  ];

  // Developers list for peer verification (excluding current user)
  const peerDevelopers = profiles.filter(p => p.id !== currentProfile.id);

  // Find matching contract details and payout history in Teams & Payments
  const matchedMember = teamMembers.find(m => m.fullName.toLowerCase() === currentProfile.fullName.toLowerCase());
  const matchedPayments = paymentHistory.filter(run => 
    run.entries.some(entry => entry.memberName.toLowerCase() === currentProfile.fullName.toLowerCase())
  ).map(run => {
    const entry = run.entries.find(e => e.memberName.toLowerCase() === currentProfile.fullName.toLowerCase())!;
    return {
      id: run.id,
      period: run.period,
      processedAt: run.processedAt,
      grossAmount: entry.grossAmount,
      currency: entry.currency,
      usdEquivalent: entry.usdEquivalent,
      status: entry.status || run.status
    };
  });

  return (
    <div className="talent-container">
      {/* Talent Header */}
      <TalentHeader
        fullName={currentProfile.fullName}
        techFocus={currentProfile.techFocus}
        avatarUrl={currentProfile.avatarUrl || ''}
        isVerified={currentProfile.isVerified}
        skills={currentProfile.skills}
        onUploadProject={() => setIsDrawerOpen(true)}
      />

      <div className="talent-grid">
        {/* Talent Sidebar */}
        <TalentSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          matchedGigsCount={matchedGigs.length + matchedJobs.length}
          hasNotifications={userApplications.some(a => a.status === 'SHORTLISTED')}
        />

        {/* Main Content */}
        <main className="talent-main">
          {/* TAB BODY CONTENTS */}
          <div className="talent-content">
            
            {/* TAB 1: OPPORTUNITIES */}
            {activeTab === 'opportunities' && (
              <div className="opportunities-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
                  <h3 style={{ margin: 0 }}>{opportunityType === 'GIGS' ? 'Micro-Gigs' : 'Full-Time Jobs'}</h3>
                  <select
                    value={opportunityType}
                    onChange={(e) => setOpportunityType(e.target.value as 'GIGS' | 'JOBS')}
                    style={{
                      background: 'var(--color-surface-elevated)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text-primary)',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      outline: 'none',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                    }}
                  >
                    <option value="GIGS">Micro-Gigs</option>
                    <option value="JOBS">Full-Time Jobs</option>
                  </select>
                </div>

                {opportunityType === 'GIGS' ? (
                  matchedGigs.length === 0 ? (
                    <div className="empty-state">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      <p>No matching gigs found for your active skill tags.</p>
                      <p className="empty-hint">Add projects to extract verified skills and trigger automated matching.</p>
                    </div>
                  ) : (
                    <div className="cards-grid">
                      {matchedGigs.map(({ gig, score }) => {
                        const isApplied = applications.some(a => a.gigId === gig.id && a.profileId === currentProfile.id);
                        return (
                          <GigCard
                            key={gig.id}
                            gig={gig}
                            matchScore={score}
                            isApplied={isApplied}
                            userSkills={currentProfile.skills}
                            onApply={() => applyForGig(gig.id, currentProfile.id)}
                          />
                        );
                      })}
                    </div>
                  )
                ) : (
                  matchedJobs.length === 0 ? (
                    <div className="empty-state">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      <p>No matching jobs found for your active skill tags.</p>
                      <p className="empty-hint">Add projects to extract verified skills and trigger automated matching.</p>
                    </div>
                  ) : (
                    <div className="cards-grid">
                      {matchedJobs.map(({ job, score }) => {
                        const isApplied = applications.some(a => a.jobId === job.id && a.profileId === currentProfile.id);
                        return (
                          <GigCard
                            key={job.id}
                            gig={{ ...job, budgetGHS: 0, requiredSkills: job.requiredSkills }}
                            matchScore={score}
                            isApplied={isApplied}
                            userSkills={currentProfile.skills}
                            onApply={() => applyForJob(job.id, currentProfile.id)}
                          />
                        );
                      })}
                    </div>
                  )
                )}
              </div>
            )}

          {/* TAB 2: PORTFOLIO */}
          {activeTab === 'portfolio' && (
            <div className="portfolio-section">
              <h3>My Portfolio</h3>
              {currentProfile.projects.length === 0 ? (
                <div className="empty-state">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                  </svg>
                  <p>No project case studies compiled yet.</p>
                  <p className="empty-hint">Use the "Upload Project" button above to generate your first AI case study.</p>
                </div>
              ) : (
                <div className="cards-grid">
                  {currentProfile.projects.map((proj) => (
                    <ProjectCard key={proj.id} project={proj} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: VERIFY PEERS */}
          {activeTab === 'verify' && (
            <div className="verify-section">
              <h3>Verify Peers</h3>
              {peerDevelopers.length === 0 ? (
                <div className="empty-state">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  <p>No other professional profiles in local workspace.</p>
                </div>
              ) : (
                <div className="cards-grid">
                  {peerDevelopers.map((peer) => {
                    return peer.projects.map((proj) => (
                      <div key={proj.id} className="peer-card">
                        <div className="peer-header">
                          <img src={peer.avatarUrl} alt={peer.fullName} className="peer-avatar" />
                          <div className="peer-info">
                            <h4>{peer.fullName}</h4>
                            <span>{peer.techFocus} ({peer.country})</span>
                          </div>
                        </div>

                        <div className="peer-project">
                          <h5>{proj.title}</h5>
                          <div className="peer-skills">
                            {proj.verifiedSkills.map((s, i) => (
                              <span key={i} className="skill-badge">{s}</span>
                            ))}
                          </div>
                        </div>

                        <div className="peer-summary">
                          {renderMarkdown(proj.aiSummary)}
                        </div>

                        {proj.isAudited ? (
                          <button disabled className="btn btn-secondary btn-sm disabled">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                              <polyline points="22 4 12 14.01 9 11.01"/>
                            </svg>
                            You Vouched Work
                          </button>
                        ) : (
                          <button
                            onClick={() => toggleVerifyProject(proj.id)}
                            className="btn btn-primary btn-sm"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            </svg>
                            Vouch Work Credibility
                          </button>
                        )}
                      </div>
                    ));
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB: CONTRACTS & PAYOUTS */}
          {activeTab === 'contracts' && (
            <div className="contracts-section">
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 'var(--spacing-md)' }}>Contracts & Payout Ledger</h3>
              {matchedMember ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                  {/* Active Contract Info */}
                  <div className="card" style={{ padding: 'var(--spacing-lg)', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid var(--color-border)', paddingBottom: '16px', marginBottom: '16px' }}>
                      <div>
                        <span className="badge badge-accent" style={{ textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 700, padding: '4px 10px', borderRadius: '4px' }}>
                          ● Active Service Agreement
                        </span>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '8px', marginBottom: '2px', color: 'var(--color-text-primary)' }}>{matchedMember.role}</h4>
                        <span style={{ fontSize: '0.82rem', color: 'var(--color-text-tertiary)' }}>Hub Location: {matchedMember.country}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>Payout Rate</span>
                        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-accent)' }}>
                          {currencySymbols[matchedMember.currency] || matchedMember.currency}
                          {matchedMember.monthlySalary.toLocaleString()}/mo
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', fontSize: '0.85rem' }}>
                      <div>
                        <strong style={{ display: 'block', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Contract Start Date</strong>
                        <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>{new Date(matchedMember.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div>
                        <strong style={{ display: 'block', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Payout Schedule</strong>
                        <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>Monthly Settlement (28th)</span>
                      </div>
                      <div>
                        <strong style={{ display: 'block', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Payout Wallet / Channel</strong>
                        <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>Mobile Money Wallet ({matchedMember.currency})</span>
                      </div>
                      <div>
                        <strong style={{ display: 'block', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Compliance Status</strong>
                        <span style={{ color: 'var(--color-accent)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                          Fully Verified
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment History Card */}
                  <div className="card" style={{ padding: 'var(--spacing-lg)' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 'var(--spacing-md)' }}>Payout Log & Payslips</h4>
                    {matchedPayments.length === 0 ? (
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-tertiary)', textAlign: 'center', padding: '24px 0' }}>
                        No payouts have been processed under this contract yet. Next payroll will run on the 28th.
                      </p>
                    ) : (
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                          <thead>
                            <tr style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'left' }}>
                              <th style={{ padding: '8px 12px', color: 'var(--color-text-tertiary)' }}>Pay Period</th>
                              <th style={{ padding: '8px 12px', color: 'var(--color-text-tertiary)' }}>Processed Date</th>
                              <th style={{ padding: '8px 12px', color: 'var(--color-text-tertiary)' }}>Gross Amount</th>
                              <th style={{ padding: '8px 12px', color: 'var(--color-text-tertiary)' }}>USD Equiv.</th>
                              <th style={{ padding: '8px 12px', color: 'var(--color-text-tertiary)' }}>Status</th>
                              <th style={{ padding: '8px 12px', textAlign: 'right', color: 'var(--color-text-tertiary)' }}>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {matchedPayments.map((pay) => (
                              <tr key={pay.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                <td style={{ padding: '12px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{pay.period}</td>
                                <td style={{ padding: '12px', color: 'var(--color-text-secondary)' }}>{new Date(pay.processedAt).toLocaleDateString()}</td>
                                <td style={{ padding: '12px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                                  {currencySymbols[pay.currency] || pay.currency}
                                  {pay.grossAmount.toLocaleString()}
                                </td>
                                <td style={{ padding: '12px', color: 'var(--color-accent)', fontWeight: 600 }}>${pay.usdEquivalent.toLocaleString()}</td>
                                <td style={{ padding: '12px' }}>
                                  <span style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: '4px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-accent)', border: '1px solid var(--color-accent)' }}>
                                    {pay.status}
                                  </span>
                                </td>
                                <td style={{ padding: '12px', textAlign: 'right' }}>
                                  <button 
                                    className="btn btn-secondary btn-sm" 
                                    onClick={() => alert(`Receipt downloaded for ${pay.period}`)}
                                    style={{ fontSize: '0.72rem', padding: '4px 8px' }}
                                  >
                                    Download PDF
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="card" style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--color-accent-subtle)', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', marginBottom: '16px', border: '1px solid var(--color-accent)' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="5" width="20" height="14" rx="2" ry="2"/>
                      <line x1="2" y1="10" x2="22" y2="10"/>
                    </svg>
                  </div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px', color: 'var(--color-text-primary)' }}>No Active Service Contract Found</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', maxWidth: '480px', margin: '0 auto 20px auto', lineHeight: '1.6' }}>
                    Once a recruiter shortlists and hires you for a gig or role, your formal work agreement, verified compliance details, tax forms, and automatic payout ledger history will show up here.
                  </p>
                  
                  <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '20px', maxWidth: '560px', margin: '0 auto', textAlign: 'left' }}>
                    <h5 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '12px' }}>How Payouts Work on BorderLine:</h5>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>
                      <div>
                        <strong style={{ color: 'var(--color-text-primary)' }}>💸 Regulated Settlement rails</strong>
                        <p style={{ margin: '4px 0 0 0' }}>All contractor payouts are cleared via regional Mobile Money networks (MTN, Wave, Orange, M-Pesa) or local bank accounts instantly.</p>
                      </div>
                      <div>
                        <strong style={{ color: 'var(--color-text-primary)' }}>🛡️ Escrow Safeguards</strong>
                        <p style={{ margin: '4px 0 0 0' }}>Startups pre-fund the project escrow before the work starts. Once verified, payments are settled securely.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: RESOURCES GATEWAY */}
          {activeTab === 'resources' && (
            <div className="resources-section">
              <h3>Resources</h3>
              <div className="cards-grid">
                <div className="resource-card">
                  <span className="resource-category">Sandbox Integration</span>
                  <h4>WhatsApp Sandboxing Walkthrough</h4>
                  <p>Learn how to register your mobile number into our local mock SMS gateway. Push code descriptions, query micro-gigs, and apply to opportunities without loading full-size web browser pages on spotty 2G connections.</p>
                  <a href="/whatsapp" className="resource-link">
                    Go to WhatsApp Sandbox
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </a>
                </div>

                <div className="resource-card">
                  <span className="resource-category">Local Payment APIs</span>
                  <h4>Susu Pay Ledger APIs</h4>
                  <p>Technical guides to integrating localized escrow API services. Implements instant checkout triggers, verification logs, and mobile money splits.</p>
                  <a href="#" className="resource-link">
                    View Documentation
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="notifications-section">
              <h3>Notifications</h3>
              {notificationsList.length === 0 ? (
                <div className="empty-state">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                  </svg>
                  <p>Your notifications inbox is empty.</p>
                </div>
              ) : (
                <div className="notifications-list">
                  {notificationsList.map((notif, idx) => (
                    <div key={idx} className="notification-item">
                      <div className={`notification-icon ${notif.status}`}>
                        {notif.status === 'shortlisted' ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                            <polyline points="17 6 23 6 23 12"/>
                          </svg>
                        ) : notif.status === 'hired' ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                          </svg>
                        )}
                      </div>
                      
                      <div className="notification-content">
                        <p>{notif.message}</p>
                        <span className="notification-time">{notif.time}</span>
                      </div>

                      {notif.status !== 'pending' && (
                        <span className={`notification-badge ${notif.status}`}>
                          {notif.status}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: ACCOUNT SETTINGS */}
          {activeTab === 'settings' && (
            <div className="settings-section">
              <h3>Account Settings</h3>
              <div className="settings-card">
                <div className="settings-header">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <h4>Profile Information</h4>
                </div>
                <div className="settings-field">
                  <label>Full Name</label>
                  <div className="settings-value">{currentProfile.fullName}</div>
                </div>
                <div className="settings-field">
                  <label>Email</label>
                  <div className="settings-value">{currentProfile.fullName.toLowerCase().replace(' ', '.')}@borderline.africa</div>
                </div>
                <div className="settings-field">
                  <label>Focus Area</label>
                  <div className="settings-value">{currentProfile.techFocus}</div>
                </div>
                <div className="settings-field">
                  <label>Location</label>
                  <div className="settings-value">{currentProfile.country}</div>
                </div>
              </div>

              <div className="settings-card">
                <div className="settings-header">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 
0 1 0 2.83 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                  </svg>
                  <h4>Preferences</h4>
                </div>
                <div className="settings-field">
                  <label>Theme</label>
                  <button 
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="btn btn-secondary btn-sm"
                  >
                    {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  </button>
                </div>
              </div>

              <div className="settings-card">
                <div className="settings-header">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18"/>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                  </svg>
                  <h4>Danger Zone</h4>
                </div>
                <div className="settings-field">
                  <label>Reset Database</label>
                  <button 
                    onClick={resetDatabase}
                    className="btn btn-danger btn-sm"
                  >
                    Reset All Data
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        </main>
      </div>

      {/* Upload Project Drawer */}
      {isDrawerOpen && (
        <div className="drawer-overlay">
          <div className="drawer-content">
            <div className="drawer-header">
              <h3>Upload Project</h3>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="drawer-close"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Project Title</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. E-commerce Platform"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Project Description</label>
                <textarea 
                  className="form-textarea" 
                  placeholder="Describe the project, technologies used, and your role..."
                  value={rawInput}
                  onChange={(e) => setRawInput(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">GitHub URL (optional)</label>
                <input 
                  type="url" 
                  className="form-input" 
                  placeholder="https://github.com/..."
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Figma URL (optional)</label>
                <input 
                  type="url" 
                  className="form-input" 
                  placeholder="https://figma.com/..."
                  value={figmaUrl}
                  onChange={(e) => setFigmaUrl(e.target.value)}
                />
              </div>

              {isParsing && (
                <div className="ai-logs">
                  <div className="ai-logs-header">
                    <span className="ai-logs-title">AI Processing</span>
                    <span className="ai-logs-status">Running...</span>
                  </div>
                  <div className="ai-logs-content">
                    {logs.map((log, idx) => (
                      <div key={idx} className="ai-log-entry">{log}</div>
                    ))}
                    <div ref={logEndRef} />
                  </div>
                </div>
              )}

              <button 
                type="submit" 
                className="btn btn-primary btn-lg"
                disabled={isParsing}
              >
                {isParsing ? 'Processing...' : 'Generate Case Study'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
