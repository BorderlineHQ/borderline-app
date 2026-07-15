'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Profile, Gig, RecruiterProfile, Project, Job, Application } from '../../types';
import RecruiterHeader from '../../components/recruiter/RecruiterHeader';
import StatsCard from '../../components/recruiter/StatsCard';
import FilterSidebar from '../../components/recruiter/FilterSidebar';
import TalentCard from '../../components/recruiter/TalentCard';
import CandidateDrawer from '../../components/recruiter/CandidateDrawer';
import OnboardingFlow from '../../components/recruiter/OnboardingFlow';

type WizardStep = 'VIEW_JOB' | 'INVITE' | 'REVIEW' | 'HIRE';
type ProposalTab = 'ALL' | 'SHORTLISTED' | 'MESSAGED' | 'ARCHIVED';

export default function RecruiterPortal() {
  const {
    profiles,
    gigs,
    jobs,
    applications,
    recruiters,
    activeRecruiterId,
    setActiveRecruiterId,
    postGig,
    postJob,
    updateApplicationStatus,
    applyForGig,
    applyForJob,
    mounted
  } = useApp();

  const activeRecruiter = recruiters.find(r => r.id === activeRecruiterId) || recruiters[0] || {
    id: 'recruiter-susupay',
    companyName: 'Susu Pay',
    website: 'https://susupay.io',
    logoUrl: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=100'
  };

  // Find recruiter posted gigs & jobs
  const recruiterGigs = gigs.filter(g => g.recruiterId === activeRecruiter.id);
  const recruiterJobs = jobs.filter(j => j.recruiterId === activeRecruiter.id);

  // Combine jobs & gigs for selection
  const allPostings = [
    ...recruiterGigs.map(g => ({ ...g, type: 'GIG' as const })),
    ...recruiterJobs.map(j => ({ ...j, type: 'JOB' as const }))
  ];

  // Selected Posting ID
  const [selectedPostingId, setSelectedPostingId] = useState<string>('');
  
  // Active Wizard Step
  const [activeWizardStep, setActiveWizardStep] = useState<WizardStep>('REVIEW');
  
  // Active Proposal Tab
  const [activeProposalTab, setActiveProposalTab] = useState<ProposalTab>('ALL');

  // Filter states for directory/invite view
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [onlyVerified, setOnlyVerified] = useState(false);

  // View state: Drawer for active candidate
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  // Modal states for posting new gigs/jobs
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gigTitle, setGigTitle] = useState('');
  const [gigDesc, setGigDesc] = useState('');
  const [gigBudget, setGigBudget] = useState('');
  const [gigReqSkills, setGigReqSkills] = useState<string[]>([]);

  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [jobSalary, setJobSalary] = useState('');
  const [jobEmploymentType, setJobEmploymentType] = useState<Job['employmentType']>('FULL_TIME');
  const [jobLocation, setJobLocation] = useState('');
  const [jobReqSkills, setJobReqSkills] = useState<string[]>([]);

  // Onboarding state
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Auto-select first posting on mount/load
  useEffect(() => {
    if (allPostings.length > 0 && !selectedPostingId) {
      setSelectedPostingId(allPostings[0].id);
    }
  }, [gigs, jobs]);

  if (!mounted) return null;

  const selectedPosting = allPostings.find(p => p.id === selectedPostingId) || allPostings[0];

  // List of all unique skills in the system for filtering
  const allAvailableSkills = ['Project Management', 'Marketing', 'Design', 'Data Analysis', 'Content Writing', 'Sales', 'Operations', 'Finance', 'Customer Service', 'Strategy', 'React', 'Node.js', 'Python', 'TypeScript', 'Figma', 'UI/UX Design', 'TailwindCSS', 'Vite', 'HTML5', 'CSS3', 'Express', 'SQLite', 'Git', 'REST APIs', 'SQL'];
  const availableCountries = ['All', 'Ghana', 'Kenya', 'Senegal', 'Nigeria', 'South Africa'];

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

  const toggleJobModalSkill = (skill: string) => {
    setJobReqSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handlePostGig = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gigTitle || !gigDesc || !gigBudget) return;

    const newGigId = `gig-${Date.now()}`;
    postGig(gigTitle, gigDesc, gigReqSkills, parseFloat(gigBudget));
    setSelectedPostingId(newGigId);
    
    // Reset form
    setGigTitle('');
    setGigDesc('');
    setGigBudget('');
    setGigReqSkills([]);
    setIsModalOpen(false);
    setActiveWizardStep('REVIEW');
  };

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle || !jobDesc || !jobSalary || !jobLocation) return;

    const newJobId = `job-${Date.now()}`;
    postJob(jobTitle, jobDesc, jobReqSkills, jobSalary, jobEmploymentType, jobLocation);
    setSelectedPostingId(newJobId);
    
    // Reset form
    setJobTitle('');
    setJobDesc('');
    setJobSalary('');
    setJobEmploymentType('FULL_TIME');
    setJobLocation('');
    setJobReqSkills([]);
    setIsJobModalOpen(false);
    setActiveWizardStep('REVIEW');
  };

  // Get applications specific to selected posting
  const postingApplications = selectedPosting
    ? applications.filter(app => app.gigId === selectedPosting.id || app.jobId === selectedPosting.id)
    : [];

  // Filter candidates for "Invite Freelancers" directory
  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = profile.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          profile.techFocus.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = selectedCountry === 'All' || profile.country === selectedCountry;
    const matchesVerified = !onlyVerified || profile.isVerified;
    const matchesSkills = selectedSkills.length === 0 || 
                          selectedSkills.every(s => profile.skills.includes(s));

    return matchesSearch && matchesCountry && matchesVerified && matchesSkills;
  });

  // Handle invitation to apply
  const handleInviteToApply = (profileId: string) => {
    if (!selectedPosting) return;
    if (selectedPosting.type === 'GIG') {
      applyForGig(selectedPosting.id, profileId);
    } else {
      applyForJob(selectedPosting.id, profileId);
    }
  };

  // Find candidate profile for a given application
  const getCandidateProfile = (app: Application) => {
    return profiles.find(p => p.id === app.profileId);
  };

  // Generate dynamic custom cover letters/pitch summaries matching the selected posting
  const getCustomPitch = (profile: Profile, postingTitle: string) => {
    const mainSkills = profile.skills.slice(0, 3).join(', ');
    const projectTitle = profile.projects[0]?.title || 'recent projects';
    
    return `Hi! I'm highly interested in the "${postingTitle}" role. Based in ${profile.country}, I specialize in ${profile.techFocus} with hands-on expertise in ${mainSkills}. My most relevant work is "${projectTitle}", where I built lightweight, optimized solutions specifically tailored for high performance under low-bandwidth networks. I look forward to contributing to your team!`;
  };

  // Filter applications by active sub-tab
  const filteredApplications = postingApplications.filter(app => {
    if (activeProposalTab === 'ALL') return true;
    if (activeProposalTab === 'SHORTLISTED') return app.status === 'SHORTLISTED';
    if (activeProposalTab === 'MESSAGED') return app.status === 'PENDING'; // simulate messaged as pending/active review
    if (activeProposalTab === 'ARCHIVED') return app.status === 'REJECTED';
    return true;
  });

  const hiredApplications = postingApplications.filter(app => app.status === 'HIRED');

  return (
    <div className="portal-container" style={{ maxWidth: '1280px', margin: '0 auto', padding: 'var(--spacing-lg)' }}>
      
      {/* CSS overrides inside a style block for accurate premium aesthetics */}
      <style>{`
        .upwork-wizard {
          display: flex;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          overflow: hidden;
          margin-bottom: var(--spacing-lg);
        }
        .upwork-wizard-step {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-md) var(--spacing-sm);
          font-weight: 600;
          font-size: 0.85rem;
          color: var(--color-text-secondary);
          cursor: pointer;
          position: relative;
          transition: all var(--transition-fast);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-right: 1px solid var(--color-border);
        }
        .upwork-wizard-step:last-child {
          border-right: none;
        }
        .upwork-wizard-step.active {
          background: var(--color-surface-greenblock);
          color: var(--color-accent);
        }
        .upwork-wizard-step.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--color-accent);
        }
        .proposal-subtabs {
          display: flex;
          border-bottom: 2px solid var(--color-border);
          margin-bottom: var(--spacing-md);
          gap: var(--spacing-md);
        }
        .proposal-subtab-btn {
          padding: var(--spacing-sm) var(--spacing-md);
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          background: transparent;
          border: none;
          cursor: pointer;
          position: relative;
          transition: all var(--transition-fast);
        }
        .proposal-subtab-btn.active {
          color: var(--color-accent);
        }
        .proposal-subtab-btn.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--color-accent);
        }
        .proposal-card-upgraded {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: var(--spacing-lg);
          transition: all var(--transition-normal);
          display: flex;
          gap: var(--spacing-lg);
          position: relative;
        }
        .proposal-card-upgraded:hover {
          border-color: var(--color-accent);
          box-shadow: var(--color-accent-glow);
        }
        .proposal-avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          object-fit: cover;
          border: 2.5px solid var(--color-border);
        }
        .vouched-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 2px 6px;
          background: rgba(16, 185, 129, 0.1);
          color: var(--color-accent);
          border-radius: var(--radius-sm);
        }
        .postings-dropdown {
          background: var(--color-surface-elevated);
          border: 1px solid var(--color-border);
          color: var(--color-text-primary);
          padding: var(--spacing-sm) var(--spacing-md);
          border-radius: var(--radius-sm);
          font-weight: 600;
          font-size: 0.95rem;
          min-width: 250px;
          outline: none;
          cursor: pointer;
        }
        .postings-dropdown:focus {
          border-color: var(--color-accent);
        }
      `}</style>

      {/* Onboarding Flow */}
      {showOnboarding && (
        <OnboardingFlow 
          companyName={activeRecruiter.companyName}
          onComplete={() => setShowOnboarding(false)}
        />
      )}

      {/* Recruiter Header & Posting Selector */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
        
        {/* Recruiter Identity Header */}
        <RecruiterHeader
          companyName={activeRecruiter.companyName}
          website={activeRecruiter.website}
          logoUrl={activeRecruiter.logoUrl}
          onPostGig={() => setIsModalOpen(true)}
          onPostJob={() => setIsJobModalOpen(true)}
        />

        {/* Selected Job/Gig Context Picker */}
        <div className="card" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-md)', padding: 'var(--spacing-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
            <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Select Active Posting:</span>
            {allPostings.length === 0 ? (
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-tertiary)' }}>No jobs or gigs posted yet.</span>
            ) : (
              <select 
                className="postings-dropdown"
                value={selectedPostingId} 
                onChange={(e) => setSelectedPostingId(e.target.value)}
              >
                {allPostings.map(post => (
                  <option key={post.id} value={post.id}>
                    [{post.type}] {post.title}
                  </option>
                ))}
              </select>
            )}
          </div>

          {selectedPosting && (
            <div style={{ display: 'flex', gap: 'var(--spacing-lg)' }}>
              <div>
                <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>Total Applicants</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-accent)' }}>{postingApplications.length}</span>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>Hired</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>{hiredApplications.length}</span>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>Budget/Salary</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                  {selectedPosting.type === 'GIG' 
                    ? `${(selectedPosting as any).budgetGHS} GHS` 
                    : `${(selectedPosting as any).salaryRange} GHS`}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedPosting ? (
        <>
          {/* 1. Step Wizard Selector */}
          <div className="upwork-wizard">
            <div 
              className={`upwork-wizard-step ${activeWizardStep === 'VIEW_JOB' ? 'active' : ''}`}
              onClick={() => setActiveWizardStep('VIEW_JOB')}
            >
              View Job Post
            </div>
            <div 
              className={`upwork-wizard-step ${activeWizardStep === 'INVITE' ? 'active' : ''}`}
              onClick={() => setActiveWizardStep('INVITE')}
            >
              Invite Builders
            </div>
            <div 
              className={`upwork-wizard-step ${activeWizardStep === 'REVIEW' ? 'active' : ''}`}
              onClick={() => {
                setActiveWizardStep('REVIEW');
                setActiveProposalTab('ALL');
              }}
            >
              Review Proposals ({postingApplications.length})
            </div>
            <div 
              className={`upwork-wizard-step ${activeWizardStep === 'HIRE' ? 'active' : ''}`}
              onClick={() => setActiveWizardStep('HIRE')}
            >
              Hire ({hiredApplications.length})
            </div>
          </div>

          {/* 2. Step Views */}
          
          {/* STEP A: VIEW JOB DETAIL */}
          {activeWizardStep === 'VIEW_JOB' && (
            <div className="card" style={{ padding: 'var(--spacing-xl)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
              <div>
                <span className="vouched-badge" style={{ marginBottom: '8px' }}>{selectedPosting.type}</span>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '4px' }}>{selectedPosting.title}</h2>
                <p style={{ color: 'var(--color-text-tertiary)', fontSize: '0.85rem' }}>
                  Posted on {new Date(selectedPosting.createdAt).toLocaleDateString()} by {selectedPosting.companyName}
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', padding: 'var(--spacing-md) 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-md)' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>Compensation</span>
                  <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>
                    {selectedPosting.type === 'GIG' 
                      ? `${(selectedPosting as any).budgetGHS} GHS (Fixed Price)` 
                      : `${(selectedPosting as any).salaryRange} GHS / month`}
                  </span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>Employment Type</span>
                  <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>
                    {selectedPosting.type === 'GIG' ? 'Contract Gig' : (selectedPosting as any).employmentType}
                  </span>
                </div>
                {selectedPosting.type === 'JOB' && (
                  <div>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>Location</span>
                    <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{(selectedPosting as any).location}</span>
                  </div>
                )}
              </div>

              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Description & Scope</h4>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', whiteSpace: 'pre-wrap' }}>
                  {selectedPosting.description}
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Required Technical Competencies</h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {selectedPosting.requiredSkills.map(skill => (
                    <span key={skill} className="skill-tag" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP B: INVITE BUILDERS DIRECTORY */}
          {activeWizardStep === 'INVITE' && (
            <div className="recruiter-grid" id="recruiter-grid-layout">
              {/* Left Column: Filters */}
              <FilterSidebar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCountry={selectedCountry}
                onCountryChange={setSelectedCountry}
                selectedSkills={selectedSkills}
                onSkillToggle={toggleSkillFilter}
                onlyVerified={onlyVerified}
                onVerifiedToggle={setOnlyVerified}
                availableSkills={allAvailableSkills}
                availableCountries={availableCountries}
              />

              {/* Right Column: Candidates Feed */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                    Talent Directory ({filteredProfiles.length})
                  </h3>
                  {selectedSkills.length > 0 && (
                    <button 
                      onClick={() => setSelectedSkills([])} 
                      className="btn btn-secondary" 
                      style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                    >
                      Clear Filters ({selectedSkills.length})
                    </button>
                  )}
                </div>

                {filteredProfiles.length === 0 ? (
                  <div className="card" style={{ textAlign: 'center', padding: 'var(--spacing-xxl)' }}>
                    <p style={{ color: 'var(--color-text-tertiary)' }}>No candidates match your criteria.</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {filteredProfiles.map(profile => {
                      const hasApplied = postingApplications.some(app => app.profileId === profile.id);
                      return (
                        <div key={profile.id} className="proposal-card-upgraded" style={{ alignItems: 'center' }}>
                          <img src={profile.avatarUrl} alt={profile.fullName} className="proposal-avatar" />
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                              <h4 style={{ fontSize: '1.1rem', margin: 0 }}>{profile.fullName}</h4>
                              {profile.isVerified && (
                                <span className="verified-badge">
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                    <path d="m9 11 2 2 4-4"/>
                                  </svg>
                                </span>
                              )}
                              <span className="vouched-badge">{profile.peerVouched || '0 Vouched'}</span>
                            </div>
                            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                              {profile.techFocus} &bull; {profile.country}
                            </p>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                              {profile.skills.slice(0, 5).map(skill => {
                                const isRequired = selectedPosting.requiredSkills.includes(skill);
                                return (
                                  <span 
                                    key={skill} 
                                    className="skill-tag"
                                    style={{
                                      background: isRequired ? 'rgba(52, 211, 153, 0.15)' : 'var(--color-border)',
                                      color: isRequired ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                                      border: isRequired ? '1px solid rgba(52, 211, 153, 0.3)' : 'none'
                                    }}
                                  >
                                    {skill}
                                  </span>
                                );
                              })}
                            </div>
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <button 
                              className="btn btn-secondary" 
                              onClick={() => setSelectedProfile(profile)}
                              style={{ width: '120px', fontSize: '0.8rem' }}
                            >
                              View Profile
                            </button>
                            <button 
                              className="btn btn-primary" 
                              disabled={hasApplied}
                              onClick={() => handleInviteToApply(profile.id)}
                              style={{ width: '120px', fontSize: '0.8rem' }}
                            >
                              {hasApplied ? 'Applied' : 'Invite'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP C: REVIEW PROPOSALS (UPWORK-STYLE) */}
          {activeWizardStep === 'REVIEW' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
              
              {/* Proposal Sub-Tabs */}
              <div className="proposal-subtabs">
                <button 
                  className={`proposal-subtab-btn ${activeProposalTab === 'ALL' ? 'active' : ''}`}
                  onClick={() => setActiveProposalTab('ALL')}
                >
                  All Proposals ({postingApplications.length})
                </button>
                <button 
                  className={`proposal-subtab-btn ${activeProposalTab === 'SHORTLISTED' ? 'active' : ''}`}
                  onClick={() => setActiveProposalTab('SHORTLISTED')}
                >
                  Shortlisted ({postingApplications.filter(a => a.status === 'SHORTLISTED').length})
                </button>
                <button 
                  className={`proposal-subtab-btn ${activeProposalTab === 'MESSAGED' ? 'active' : ''}`}
                  onClick={() => setActiveProposalTab('MESSAGED')}
                >
                  Messaged ({postingApplications.filter(a => a.status === 'PENDING').length})
                </button>
                <button 
                  className={`proposal-subtab-btn ${activeProposalTab === 'ARCHIVED' ? 'active' : ''}`}
                  onClick={() => setActiveProposalTab('ARCHIVED')}
                >
                  Archived ({postingApplications.filter(a => a.status === 'REJECTED').length})
                </button>
              </div>

              {/* Proposals List */}
              {filteredApplications.length === 0 ? (
                <div className="card" style={{ padding: 'var(--spacing-xxl)', textAlign: 'center' }}>
                  <p style={{ color: 'var(--color-text-tertiary)' }}>No proposals in this category.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                  {filteredApplications.map(app => {
                    const profile = getCandidateProfile(app);
                    if (!profile) return null;

                    // Calculate skill matching rate
                    const matchingSkills = profile.skills.filter(s => selectedPosting.requiredSkills.includes(s));
                    const matchPercent = Math.round((matchingSkills.length / selectedPosting.requiredSkills.length) * 100) || 0;

                    return (
                      <div key={app.id} className="proposal-card-upgraded">
                        <img src={profile.avatarUrl} alt={profile.fullName} className="proposal-avatar" />
                        
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          
                          {/* Header Line */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                                <h4 
                                  onClick={() => setSelectedProfile(profile)}
                                  style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, cursor: 'pointer', color: 'var(--color-accent)' }}
                                >
                                  {profile.fullName}
                                </h4>
                                {profile.isVerified && (
                                  <span className="verified-badge" title="Source Verified builder">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                      <path d="m9 11 2 2 4-4"/>
                                    </svg>
                                  </span>
                                )}
                                <span className="vouched-badge">{profile.peerVouched || '0 Vouched'}</span>
                              </div>
                              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                                {profile.techFocus} &bull; {profile.country}
                              </p>
                            </div>

                            {/* Match Score Overlay */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(52, 211, 153, 0.08)', padding: '4px 10px', borderRadius: '4px', border: '1px solid rgba(52, 211, 153, 0.2)' }}>
                              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Skill Match:</span>
                              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-accent)' }}>{matchPercent}%</span>
                            </div>
                          </div>

                          {/* Cover Letter Pitch */}
                          <div style={{ background: 'var(--color-surface-elevated)', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', margin: '4px 0' }}>
                            <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '4px' }}>AI Match Context / Cover Letter Summary</span>
                            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, fontStyle: 'italic' }}>
                              "{getCustomPitch(profile, selectedPosting.title)}"
                            </p>
                          </div>

                          {/* Skill Tags */}
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {profile.skills.map(skill => {
                              const isMatch = selectedPosting.requiredSkills.includes(skill);
                              return (
                                <span 
                                  key={skill} 
                                  className="skill-tag"
                                  style={{
                                    fontSize: '0.75rem',
                                    background: isMatch ? 'rgba(52, 211, 153, 0.12)' : 'var(--color-bg)',
                                    color: isMatch ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                                    border: isMatch ? '1px solid rgba(52, 211, 153, 0.25)' : '1px solid var(--color-border)'
                                  }}
                                >
                                  {skill}
                                </span>
                              );
                            })}
                          </div>

                        </div>

                        {/* Actions Panel */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center', minWidth: '130px', borderLeft: '1px solid var(--color-border)', paddingLeft: 'var(--spacing-md)' }}>
                          {app.status === 'PENDING' && (
                            <button 
                              className="btn btn-primary" 
                              onClick={() => updateApplicationStatus(app.id, 'SHORTLISTED')}
                              style={{ padding: '8px', fontSize: '0.8rem', width: '100%' }}
                            >
                              Shortlist
                            </button>
                          )}
                          
                          {app.status !== 'HIRED' && (
                            <button 
                              className="btn btn-primary" 
                              onClick={() => updateApplicationStatus(app.id, 'HIRED')}
                              style={{ padding: '8px', fontSize: '0.8rem', background: '#10B981', borderColor: '#10B981', width: '100%' }}
                            >
                              Hire Builder
                            </button>
                          )}

                          {app.status !== 'REJECTED' && (
                            <button 
                              className="btn btn-secondary" 
                              onClick={() => updateApplicationStatus(app.id, 'REJECTED')}
                              style={{ padding: '8px', fontSize: '0.8rem', color: 'var(--color-danger)', borderColor: 'rgba(239, 68, 68, 0.2)', width: '100%' }}
                            >
                              Archive
                            </button>
                          )}

                          {app.status === 'REJECTED' && (
                            <button 
                              className="btn btn-secondary" 
                              onClick={() => updateApplicationStatus(app.id, 'PENDING')}
                              style={{ padding: '8px', fontSize: '0.8rem', width: '100%' }}
                            >
                              Restore
                            </button>
                          )}

                          <button 
                            className="btn btn-secondary" 
                            onClick={() => setSelectedProfile(profile)}
                            style={{ padding: '8px', fontSize: '0.8rem', width: '100%' }}
                          >
                            View Case Studies
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          )}

          {/* STEP D: HIRE LIST & OFFER MANAGEMENT */}
          {activeWizardStep === 'HIRE' && (
            <div className="card" style={{ padding: 'var(--spacing-xl)' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: 'var(--spacing-md)' }}>
                Hired Digital Builders ({hiredApplications.length})
              </h3>
              {hiredApplications.length === 0 ? (
                <p style={{ color: 'var(--color-text-tertiary)', fontSize: '0.85rem' }}>
                  No candidates hired yet. Review proposals to send offers and onboard.
                </p>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--spacing-md)' }}>
                  {hiredApplications.map(app => {
                    const profile = getCandidateProfile(app);
                    if (!profile) return null;
                    return (
                      <div key={app.id} className="card" style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center', background: 'var(--color-surface-greenblock)', border: '1px solid var(--color-accent)' }}>
                        <img src={profile.avatarUrl} alt={profile.fullName} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                        <div>
                          <h4 style={{ fontSize: '1rem', margin: 0 }}>{profile.fullName}</h4>
                          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>{profile.techFocus}</p>
                          <span className="vouched-badge" style={{ background: 'var(--color-accent)', color: '#FFFFFF' }}>Hired & Active</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: 'var(--spacing-xxl)' }}>
          <h3>No active postings found.</h3>
          <p style={{ color: 'var(--color-text-secondary)', margin: '12px 0 var(--spacing-md)' }}>
            Start by posting a micro-gig or permanent job to access the recruitment matching system.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>Post a Gig</button>
            <button className="btn btn-primary" onClick={() => setIsJobModalOpen(true)}>Post a Job</button>
          </div>
        </div>
      )}

      {/* Candidate Profile Drawer */}
      {selectedProfile && (
        <CandidateDrawer
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
          applications={applications.filter(app => app.gigId === selectedPosting?.id || app.jobId === selectedPosting?.id)}
          gigs={gigs}
          onUpdateApplicationStatus={updateApplicationStatus}
        />
      )}

      {/* Post a Gig Modal Dialog */}
      {isModalOpen && (
        <div className="modal-overlay" id="gig-modal-overlay">
          <div className="modal-content" id="gig-modal-content" style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
            <div className="modal-header">
              <h3>Post a Micro-Gig</h3>
              <button 
                id="btn-close-gig-modal-x"
                onClick={() => setIsModalOpen(false)}
                className="drawer-close"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
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

              <div className="form-group">
                <label className="form-label">Required Skills</label>
                <div className="skills-select-grid" id="gig-skills-select-grid">
                  {allAvailableSkills.map(skill => (
                    <label key={skill} className="filter-checkbox-label" htmlFor={`modal-skill-${skill.replace(/\s+/g, '-').toLowerCase()}`}>
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

              <button type="submit" className="btn btn-primary btn-lg" id="btn-submit-publish-gig" style={{ width: '100%', marginTop: '12px' }}>
                Publish Micro-Gig & Find Matches
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Post a Job Modal Dialog */}
      {isJobModalOpen && (
        <div className="modal-overlay" id="job-modal-overlay">
          <div className="modal-content" id="job-modal-content" style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
            <div className="modal-header">
              <h3>Post a Job</h3>
              <button 
                id="btn-close-job-modal-x"
                onClick={() => setIsJobModalOpen(false)}
                className="drawer-close"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <form onSubmit={handlePostJob} id="form-post-job">
              <div className="form-group">
                <label className="form-label" htmlFor="job-title-input">Job Title</label>
                <input 
                  type="text" 
                  id="job-title-input"
                  className="form-input" 
                  placeholder="e.g. Senior Marketing Manager"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="job-desc-input">Job Description</label>
                <textarea 
                  id="job-desc-input"
                  className="form-textarea" 
                  placeholder="Describe the role, responsibilities, and requirements."
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="job-salary-input">Salary Range (GHS)</label>
                <input 
                  type="text" 
                  id="job-salary-input"
                  className="form-input" 
                  placeholder="e.g. 3000-5000"
                  value={jobSalary}
                  onChange={(e) => setJobSalary(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="job-type-select">Employment Type</label>
                <select
                  id="job-type-select"
                  className="form-input"
                  value={jobEmploymentType}
                  onChange={(e) => setJobEmploymentType(e.target.value as Job['employmentType'])}
                  required
                >
                  <option value="FULL_TIME">Full Time</option>
                  <option value="PART_TIME">Part Time</option>
                  <option value="CONTRACT">Contract</option>
                  <option value="INTERNSHIP">Internship</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="job-location-input">Location</label>
                <input 
                  type="text" 
                  id="job-location-input"
                  className="form-input" 
                  placeholder="e.g. Accra, Ghana"
                  value={jobLocation}
                  onChange={(e) => setJobLocation(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Required Skills</label>
                <div className="skills-select-grid" id="job-skills-select-grid">
                  {allAvailableSkills.map(skill => (
                    <label key={skill} className="filter-checkbox-label" htmlFor={`job-modal-skill-${skill.replace(/\s+/g, '-').toLowerCase()}`}>
                      <input
                        type="checkbox"
                        id={`job-modal-skill-${skill.replace(/\s+/g, '-').toLowerCase()}`}
                        checked={jobReqSkills.includes(skill)}
                        onChange={() => toggleJobModalSkill(skill)}
                      />
                      {skill}
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg" id="btn-submit-publish-job" style={{ width: '100%', marginTop: '12px' }}>
                Publish Job & Find Candidates
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
