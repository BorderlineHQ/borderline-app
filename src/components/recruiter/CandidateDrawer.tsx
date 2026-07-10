'use client';

import React, { useState } from 'react';
import { Profile, Project, Application, TeamMember } from '../../types';
import { useApp } from '../../context/AppContext';
import { countryCurrency } from '../../data/teamsData';

interface CandidateDrawerProps {
  profile: Profile;
  onClose: () => void;
  applications: Application[];
  gigs: any[];
  onUpdateApplicationStatus: (applicationId: string, status: Application['status']) => void;
}

export default function CandidateDrawer({ 
  profile, 
  onClose, 
  applications, 
  gigs,
  onUpdateApplicationStatus 
}: CandidateDrawerProps) {
  const { teamMembers, addTeamMember } = useApp();
  
  const [activeProject, setActiveProject] = useState<Project | null>(
    profile.projects.length > 0 ? profile.projects[0] : null
  );

  const [onboardingAppId, setOnboardingAppId] = useState<string | null>(null);
  const [salary, setSalary] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [onboardSuccess, setOnboardSuccess] = useState(false);

  const isAlreadyMember = teamMembers.some(m => m.fullName.toLowerCase() === profile.fullName.toLowerCase());

  const handleStartOnboarding = (appId: string, gigTitle?: string) => {
    setOnboardingAppId(appId);
    setSalary('8500');
    setEmail(profile.fullName.toLowerCase().replace(/\s+/g, '.') + '@company.com');
    setRole(gigTitle || profile.techFocus);
    setStartDate(new Date().toISOString().split('T')[0]);
    setOnboardSuccess(false);
  };

  const handleConfirmOnboarding = (e: React.FormEvent) => {
    e.preventDefault();
    const currency = countryCurrency[profile.country] || 'USD';
    const newMember: TeamMember = {
      id: `tm-${Date.now()}`,
      fullName: profile.fullName,
      email,
      role,
      country: profile.country,
      currency,
      monthlySalary: parseFloat(salary) || 8500,
      startDate,
      status: 'Active',
      avatarUrl: profile.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.fullName)}&background=22C55E&color=fff&size=200`,
    };
    addTeamMember(newMember);
    setOnboardSuccess(true);
    setTimeout(() => {
      setOnboardingAppId(null);
    }, 2000);
  };

  const profileApplications = applications.filter(app => app.profileId === profile.id);

  const renderMarkdown = (text: string) => {
    if (!text) return null;
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      if (line.startsWith('### ')) {
        return <h4 key={idx}>{line.substring(4)}</h4>;
      } else if (line.startsWith('* ') || line.startsWith('- ')) {
        return <li key={idx}>{line.substring(2)}</li>;
      } else if (line.trim()) {
        return <p key={idx}>{line}</p>;
      }
      return null;
    });
  };

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <button className="drawer-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <div className="drawer-verified-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            AI-Verified Profile
          </div>
        </div>

        <div className="drawer-profile-section">
          <img src={profile.avatarUrl} alt={profile.fullName} className="drawer-avatar" />
          <div className="drawer-profile-info">
            <h2>{profile.fullName}</h2>
            <p className="drawer-tech-focus">{profile.techFocus}</p>
            <div className="drawer-contact">
              <span className="contact-item">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {profile.country}
              </span>
              <span className="contact-item">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                {profile.whatsappNum}
              </span>
            </div>
          </div>
        </div>

        {profileApplications.length > 0 && (
          <div className="drawer-applications">
            <h3>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              Applications
            </h3>
            {profileApplications.map(app => {
              const gig = gigs.find(g => g.id === app.gigId);
              return (
                <div key={app.id} className="application-item">
                  <div className="application-info">
                    <span className="application-gig">{gig?.title}</span>
                    <span className={`application-status status-${app.status.toLowerCase()}`}>
                      {app.status}
                    </span>
                  </div>
                  {app.status === 'HIRED' ? (
                    <div style={{ width: '100%' }}>
                      {isAlreadyMember ? (
                        <div style={{ marginTop: '8px', padding: '10px', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--color-accent)', borderRadius: '6px' }}>
                          <p style={{ color: 'var(--color-accent)', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            Onboarded as Team Member
                          </p>
                          <a href="/teams-payments" className="btn btn-sm btn-primary" style={{ marginTop: '6px', display: 'inline-block', textDecoration: 'none', fontSize: '0.75rem', padding: '3px 8px', borderRadius: '4px' }}>
                            View in Teams & Payments
                          </a>
                        </div>
                      ) : onboardSuccess && onboardingAppId === app.id ? (
                        <div style={{ marginTop: '8px', padding: '10px', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--color-accent)', borderRadius: '6px', color: 'var(--color-accent)', fontSize: '0.8rem', fontWeight: 600 }}>
                          🎉 Successfully Onboarded!
                        </div>
                      ) : onboardingAppId === app.id ? (
                        <form onSubmit={handleConfirmOnboarding} style={{ marginTop: '8px', padding: '12px', border: '1px solid var(--color-border)', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '8px', backgroundColor: 'var(--color-surface)' }}>
                          <h4 style={{ margin: '0 0 4px 0', fontSize: '0.85rem', color: 'var(--color-text-primary)', fontWeight: 700 }}>Onboard to Teams & Payments</h4>
                          
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <label style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>Role / Title</label>
                            <input 
                              type="text" 
                              value={role} 
                              onChange={(e) => setRole(e.target.value)} 
                              required 
                              style={{ fontSize: '0.75rem', padding: '6px', borderRadius: '4px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-primary)' }}
                            />
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <label style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>Work Email</label>
                            <input 
                              type="email" 
                              value={email} 
                              onChange={(e) => setEmail(e.target.value)} 
                              required 
                              style={{ fontSize: '0.75rem', padding: '6px', borderRadius: '4px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-primary)' }}
                            />
                          </div>

                          <div style={{ display: 'flex', gap: '8px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
                              <label style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>Salary ({countryCurrency[profile.country] || 'USD'}/mo)</label>
                              <input 
                                type="number" 
                                value={salary} 
                                onChange={(e) => setSalary(e.target.value)} 
                                required 
                                style={{ fontSize: '0.75rem', padding: '6px', borderRadius: '4px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-primary)', width: '100%' }}
                              />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
                              <label style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>Start Date</label>
                              <input 
                                type="date" 
                                value={startDate} 
                                onChange={(e) => setStartDate(e.target.value)} 
                                required 
                                style={{ fontSize: '0.75rem', padding: '5px', borderRadius: '4px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-primary)', width: '100%' }}
                              />
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                            <button type="submit" className="btn btn-sm btn-primary" style={{ flex: 1, padding: '6px', fontSize: '0.75rem', borderRadius: '4px' }}>
                              Confirm Onboarding
                            </button>
                            <button type="button" className="btn btn-sm btn-secondary" onClick={() => setOnboardingAppId(null)} style={{ padding: '6px', fontSize: '0.75rem', borderRadius: '4px' }}>
                              Cancel
                            </button>
                          </div>
                        </form>
                      ) : (
                        <button 
                          className="btn btn-sm btn-success" 
                          onClick={() => handleStartOnboarding(app.id, gig?.title)}
                          style={{ marginTop: '8px', width: '100%', padding: '6px', borderRadius: '4px', fontSize: '0.78rem' }}
                        >
                          Onboard to Team & Payments
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="application-actions">
                      <button 
                        className="btn btn-sm btn-primary"
                        onClick={() => onUpdateApplicationStatus(app.id, 'SHORTLISTED')}
                      >
                        Shortlist
                      </button>
                      <button 
                        className="btn btn-sm btn-success"
                        onClick={() => onUpdateApplicationStatus(app.id, 'HIRED')}
                      >
                        Hire
                      </button>
                      <button 
                        className="btn btn-sm btn-danger"
                        onClick={() => onUpdateApplicationStatus(app.id, 'REJECTED')}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="drawer-section">
          <h3>About</h3>
          <p className="drawer-bio">{profile.bio}</p>
        </div>

        <div className="drawer-section">
          <h3>Skills</h3>
          <div className="drawer-skills">
            {profile.skills.map((skill, index) => (
              <span key={index} className="skill-badge">{skill}</span>
            ))}
          </div>
        </div>

        {profile.projects.length > 0 && (
          <div className="drawer-section drawer-projects">
            <h3>Case Studies</h3>
            <div className="projects-tabs">
              {profile.projects.map(project => (
                <button
                  key={project.id}
                  className={`project-tab ${activeProject?.id === project.id ? 'active' : ''}`}
                  onClick={() => setActiveProject(project)}
                >
                  {project.title}
                </button>
              ))}
            </div>
            {activeProject && (
              <div className="project-detail">
                <div className="project-header">
                  <h4>{activeProject.title}</h4>
                  {activeProject.isAudited ? (
                    <span className="audit-badge audited">✓ Audited</span>
                  ) : (
                    <span className="audit-badge pending">Pending Audit</span>
                  )}
                </div>
                <div className="project-skills">
                  {activeProject.verifiedSkills.map((skill, index) => (
                    <span key={index} className="project-skill">{skill}</span>
                  ))}
                </div>
                <div className="project-description">
                  {renderMarkdown(activeProject.aiSummary)}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
