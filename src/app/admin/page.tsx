'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Project, Profile } from '../../types';

export default function AdminPortal() {
  const {
    profiles,
    gigs,
    applications,
    toggleVerifyProfile,
    toggleVerifyProject,
    mounted
  } = useApp();

  const [activeTab, setActiveTab] = useState<'pending' | 'audited'>('pending');

  if (!mounted) return null;

  // Flatten all projects with their profile data attached
  const allProjects = profiles.flatMap(profile => 
    profile.projects.map(proj => ({
      ...proj,
      profile
    }))
  );

  const pendingProjects = allProjects.filter(p => !p.isAudited);
  const auditedProjects = allProjects.filter(p => p.isAudited);

  // Dynamic Escrow Budget calculation
  // Budgets of all gigs that have received at least one application
  const escrowGigs = gigs.filter(gig => 
    applications.some(app => app.gigId === gig.id)
  );
  const totalEscrowVolume = escrowGigs.reduce((sum, g) => sum + g.budgetGHS, 0);

  // Dynamic system transaction logs based on active state counts
  const generateSystemLogs = () => {
    const logsList: { time: string; action: string }[] = [];
    const baseTime = new Date();
    
    // Initial loads
    logsList.push({ 
      time: new Date(baseTime.getTime() - 3600000).toLocaleTimeString(), 
      action: 'SYSTEM_BOOT: Database synchronized with Supabase relational cluster.' 
    });
    logsList.push({ 
      time: new Date(baseTime.getTime() - 3400000).toLocaleTimeString(), 
      action: `DATA_SYNC: Loaded ${profiles.length} pan-African builder profiles.` 
    });
    logsList.push({ 
      time: new Date(baseTime.getTime() - 3200000).toLocaleTimeString(), 
      action: `DATA_SYNC: Loaded ${gigs.length} active contract micro-gigs.` 
    });
    logsList.push({ 
      time: new Date(baseTime.getTime() - 3000000).toLocaleTimeString(), 
      action: 'GATEWAY_ONLINE: WhatsApp Twilio/Meta webhook router active.' 
    });

    // Match alerts
    applications.forEach((app, idx) => {
      const p = profiles.find(profile => profile.id === app.profileId);
      const g = gigs.find(gig => gig.id === app.gigId);
      logsList.push({
        time: new Date(baseTime.getTime() - (2400000 - idx * 200000)).toLocaleTimeString(),
        action: `TRANSACTION_Ledger: Application [${app.id.substring(0,6)}] submitted. Developer "${p?.fullName}" applied for "${g?.title}" (Status: ${app.status}).`
      });
    });

    // Check if user has executed custom actions in current demo session
    // Gigs created
    if (gigs.length > 3) {
      gigs.slice(0, gigs.length - 3).forEach((g, i) => {
        logsList.push({
          time: new Date(baseTime.getTime() - 60000 + i * 1000).toLocaleTimeString(),
          action: `RECRUITER_POST: Published new contract gig "${g.title}" by "${g.companyName}" with budget GHS ${g.budgetGHS}.`
        });
      });
    }

    // Projects uploaded
    const customProjectsCount = allProjects.length - 4; // 4 is mock base
    if (customProjectsCount > 0) {
      allProjects.slice(0, customProjectsCount).forEach((p, i) => {
        logsList.push({
          time: new Date(baseTime.getTime() - 30000 + i * 1000).toLocaleTimeString(),
          action: `AI_COMPILER: Dynamic repo analysis complete for "${p.title}". Extracted skills: [${p.verifiedSkills.join(', ')}].`
        });
        logsList.push({
          time: new Date(baseTime.getTime() - 28000 + i * 1000).toLocaleTimeString(),
          action: `DATABASE_LEDGER: Project "${p.title}" linked to profile "${p.profile.fullName}". Awaiting admin verify badge.`
        });
      });
    }

    // Verified profiles logs
    profiles.filter(p => p.isVerified).forEach((p, i) => {
      logsList.push({
        time: new Date(baseTime.getTime() - 10000 + i * 1000).toLocaleTimeString(),
        action: `SECURITY_COMPLIANCE: Verified stamp granted to profile "${p.fullName}" (Country: ${p.country}).`
      });
    });

    return logsList.reverse();
  };

  const systemLogs = generateSystemLogs();

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
        elements.push(<h5 key={idx} style={{ fontWeight: 700, margin: '10px 0 4px 0', borderBottom: '1px solid var(--color-border)', paddingBottom: '2px' }}>{line.substring(4)}</h5>);
      } else if (isBullet) {
        inList = true;
        listItems.push(<li key={idx} style={{ fontSize: '0.8rem', marginLeft: '12px' }}>{line.substring(2)}</li>);
      } else if (line.trim() === '') {
        // Skip
      } else {
        elements.push(<p key={idx} style={{ fontSize: '0.8rem', margin: '4px 0', color: 'var(--color-text-secondary)' }}>{line}</p>);
      }
    });

    if (inList) {
      elements.push(<ul key="list-final">{[...listItems]}</ul>);
    }

    return <div className="markdown-render">{elements}</div>;
  };

  const projectListToDisplay = activeTab === 'pending' ? pendingProjects : auditedProjects;

  return (
    <div className="portal-container">
      {/* 4-Stat Indicator Metrics Row */}
      <section className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-num">{profiles.length}</div>
          <div className="admin-stat-label">Total Tech Builders</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-num">{gigs.length}</div>
          <div className="admin-stat-label">Micro-Gigs Active</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-num" style={{ color: 'var(--color-accent-secondary)' }}>GHS {totalEscrowVolume}</div>
          <div className="admin-stat-label">Escrow Volume Secured</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-num">
            {auditedProjects.length} / {allProjects.length}
          </div>
          <div className="admin-stat-label">Audited Ratio</div>
        </div>
      </section>

      {/* Main Admin Pipeline grid */}
      <div className="admin-grid-layout" id="admin-grid-layout">
        
        {/* Left Side: Audit Pipeline */}
        <section>
          <div className="recruiter-feed-header">
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
              AI Portfolio Audit Queue
            </h2>
            
            <div className="admin-header-buttons">
              <button
                id="btn-admin-tab-pending"
                onClick={() => setActiveTab('pending')}
                className={`btn admin-tab-btn ${activeTab === 'pending' ? 'btn-primary' : 'btn-secondary'}`}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                Pending Review ({pendingProjects.length})
              </button>
              <button
                id="btn-admin-tab-audited"
                onClick={() => setActiveTab('audited')}
                className={`btn admin-tab-btn ${activeTab === 'audited' ? 'btn-primary' : 'btn-secondary'}`}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Audited Archive ({auditedProjects.length})
              </button>
            </div>
          </div>

          <div className="admin-queue-list">
            {projectListToDisplay.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: 'var(--spacing-xxl)' }}>
                <p style={{ color: 'var(--color-text-tertiary)' }}>No projects in this queue.</p>
              </div>
            ) : (
              projectListToDisplay.map((project) => (
                <div key={project.id} className="audit-item-card">
                  
                  {/* Queue Item Header */}
                  <div className="audit-item-header">
                    <div className="audit-profile-info">
                      <img 
                        src={project.profile.avatarUrl} 
                        alt={project.profile.fullName} 
                        className="audit-profile-pic"
                      />
                      <div>
                        <div className="audit-profile-name">{project.profile.fullName}</div>
                        <div className="audit-profile-sub">Hub: {project.profile.country} • Focus: {project.profile.techFocus}</div>
                      </div>
                    </div>
                    
                    <div className="audit-actions-row">
                      <button
                        id={`btn-toggle-verify-profile-${project.profile.id}`}
                        onClick={() => toggleVerifyProfile(project.profile.id)}
                        className={`btn audit-btn ${project.profile.isVerified ? 'btn-danger' : 'btn-secondary'}`}
                      >
                        {project.profile.isVerified ? 'Revoke Profile Badge' : (
                          <>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            Grant Profile Badge
                          </>
                        )}
                      </button>
                      
                      <button
                        id={`btn-toggle-verify-project-${project.id}`}
                        onClick={() => toggleVerifyProject(project.id)}
                        className="btn btn-primary audit-btn"
                        style={{ backgroundColor: project.isAudited ? 'var(--color-danger)' : 'var(--color-accent)' }}
                      >
                        {project.isAudited ? 'Revert to Pending' : (
                          <>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                            Approve Case Study
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Info details */}
                  <div className="audit-item-details">
                    <strong>Project:</strong> {project.title} • 
                    {project.githubUrl && (
                      <a id={`link-admin-project-github-${project.id}`} href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="audit-link audit-link-github">
                        GitHub Repo 
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      </a>
                    )}
                    {project.figmaUrl && (
                      <a id={`link-admin-project-figma-${project.id}`} href={project.figmaUrl} target="_blank" rel="noopener noreferrer" className="audit-link audit-link-figma">
                        Figma 
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      </a>
                    )}
                  </div>

                  {/* Side-by-Side Comparison Panel */}
                  <div className="audit-comparison-grid">
                    <div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>Raw Developer Input Notes</span>
                      <div className="audit-pane-raw">{project.rawInput}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>AI Compiled Case Study Summary</span>
                      <div className="audit-pane-ai">{renderMarkdown(project.aiSummary)}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Right Side: System Logs Console */}
        <aside className="admin-sidebar">
          <div className="card" style={{ padding: 'var(--spacing-md)' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: 'var(--spacing-sm)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              System Transaction Logs
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-md)' }}>
              Real-time audit trails capturing database and webhook triggers on the platform.
            </p>

            <div className="system-logs-box">
              {systemLogs.map((log, i) => (
                <div key={i} className="system-log-line">
                  <span className="system-log-time">[{log.time}]</span>
                  <span className="system-log-action">{log.action}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
