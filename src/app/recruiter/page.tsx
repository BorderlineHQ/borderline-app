'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Profile, Gig, RecruiterProfile, Project, Job } from '../../types';
import RecruiterHeader from '../../components/recruiter/RecruiterHeader';
import StatsCard from '../../components/recruiter/StatsCard';
import FilterSidebar from '../../components/recruiter/FilterSidebar';
import TalentCard from '../../components/recruiter/TalentCard';
import GigCard from '../../components/recruiter/GigCard';
import CandidateDrawer from '../../components/recruiter/CandidateDrawer';
import OnboardingFlow from '../../components/recruiter/OnboardingFlow';

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
    mounted
  } = useApp();

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [onlyVerified, setOnlyVerified] = useState(false);

  // View state: Drawer for active candidate
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  // Modal state: Post a gig
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gigTitle, setGigTitle] = useState('');
  const [gigDesc, setGigDesc] = useState('');
  const [gigBudget, setGigBudget] = useState('');
  const [gigReqSkills, setGigReqSkills] = useState<string[]>([]);

  // Modal state: Post a job
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [jobSalary, setJobSalary] = useState('');
  const [jobEmploymentType, setJobEmploymentType] = useState<Job['employmentType']>('FULL_TIME');
  const [jobLocation, setJobLocation] = useState('');
  const [jobReqSkills, setJobReqSkills] = useState<string[]>([]);

  // Onboarding state
  const [showOnboarding, setShowOnboarding] = useState(false);

  if (!mounted) return null;

  const activeRecruiter = recruiters.find(r => r.id === activeRecruiterId) || recruiters[0];

  // List of all unique skills in the system for filtering
  const allAvailableSkills = ['Project Management', 'Marketing', 'Design', 'Data Analysis', 'Content Writing', 'Sales', 'Operations', 'Finance', 'Customer Service', 'Strategy', 'React', 'Node.js', 'Python', 'TypeScript', 'Figma', 'UI/UX Design'];
  const availableCountries = ['All', 'Ghana', 'Kenya', 'Senegal'];

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

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle || !jobDesc || !jobSalary || !jobLocation) return;

    postJob(jobTitle, jobDesc, jobReqSkills, jobSalary, jobEmploymentType, jobLocation);
    
    // Reset form
    setJobTitle('');
    setJobDesc('');
    setJobSalary('');
    setJobEmploymentType('FULL_TIME');
    setJobLocation('');
    setJobReqSkills([]);
    setIsJobModalOpen(false);
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

  // Find recruiter posted jobs
  const recruiterJobs = jobs.filter(j => j.recruiterId === activeRecruiter.id);

  // Find applications submitted to this recruiter's gigs
  const recruiterApplications = applications.filter(app => {
    const gig = gigs.find(g => g.id === app.gigId);
    const job = jobs.find(j => j.id === app.jobId);
    return gig?.recruiterId === activeRecruiter.id || job?.recruiterId === activeRecruiter.id;
  });

  return (
    <div className="portal-container">
      <h1 style={{ display: 'none' }}>Recruiter Portal - BorderLine Africa's Emerging Professional Workforce</h1>
      
      {/* Onboarding Flow */}
      {showOnboarding && (
        <OnboardingFlow 
          companyName={activeRecruiter.companyName}
          onComplete={() => setShowOnboarding(false)}
        />
      )}

      <div className={`recruiter-grid ${selectedProfile ? 'has-drawer' : ''}`} id="recruiter-grid-layout">
        
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

        {/* Center Column: Feed and Gig Manager */}
        <section id="recruiter-center-feed" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
          {/* Recruiter Header */}
          <RecruiterHeader
            companyName={activeRecruiter.companyName}
            website={activeRecruiter.website}
            logoUrl={activeRecruiter.logoUrl}
            onPostGig={() => setIsModalOpen(true)}
            onPostJob={() => setIsJobModalOpen(true)}
          />

          {/* Stats Cards */}
          <div className="stats-grid">
            <StatsCard
              title="Active Gigs"
              value={recruiterGigs.length}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
              }
              color="accent"
            />
            <StatsCard
              title="Active Jobs"
              value={recruiterJobs.length}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
              }
              color="secondary"
            />
            <StatsCard
              title="Total Applications"
              value={recruiterApplications.length}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              }
              color="secondary"
            />
            <StatsCard
              title="Verified Professionals"
              value={profiles.filter(p => p.isVerified).length}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="m9 11 2 2 4-4"/>
                </svg>
              }
              color="default"
            />
          </div>

          {/* Active Recruiter Gigs */}
          <div className="card" id="recruiter-posted-gigs-card">
            <h3 style={{ fontSize: '1.2rem', marginBottom: 'var(--spacing-md)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
              Active Posted Gigs ({recruiterGigs.length})
            </h3>
            {recruiterGigs.length === 0 ? (
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-tertiary)' }} id="no-gigs-alert">No active gigs posted. Create one using the button above.</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }} id="recruiter-gigs-grid">
                {recruiterGigs.map(gig => {
                  const appCount = applications.filter(a => a.gigId === gig.id).length;
                  return (
                    <GigCard key={gig.id} gig={gig} applicationCount={appCount} />
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
                Professional Pipeline ({filteredProfiles.length})
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
                <p style={{ color: 'var(--color-text-tertiary)' }}>No professionals match your filters. Try widening your criteria.</p>
              </div>
            ) : (
              <div className="talent-cards-grid" id="recruiter-candidates-grid">
                {filteredProfiles.map(profile => {
                  // Check if candidate applied to any of recruiter's gigs
                  const appliedGig = recruiterApplications.find(app => app.profileId === profile.id);
                  
                  return (
                    <TalentCard
                      key={profile.id}
                      profile={profile}
                      isSelected={selectedProfile?.id === profile.id}
                      onClick={() => handleOpenProfile(profile)}
                      hasApplied={!!appliedGig}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </section>

      </div>

      {/* Candidate Drawer */}
      {selectedProfile && (
        <CandidateDrawer
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
          applications={recruiterApplications}
          gigs={gigs}
          onUpdateApplicationStatus={updateApplicationStatus}
        />
      )}

      {/* Post a Gig Modal Dialog */}
      {isModalOpen && (
        <div className="modal-overlay" id="gig-modal-overlay">
          <div className="modal-content" id="gig-modal-content">
            <div className="modal-header">
              <h3>Post a Micro-Gig</h3>
              <button 
                id="btn-close-gig-modal-x"
                onClick={() => setIsModalOpen(false)}
                className="drawer-close"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

              <button type="submit" className="btn btn-primary btn-lg" id="btn-submit-publish-gig">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 22 22 22 12 2"/>
                </svg>
                Publish Micro-Gig & Find Matches
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Post a Job Modal Dialog */}
      {isJobModalOpen && (
        <div className="modal-overlay" id="job-modal-overlay">
          <div className="modal-content" id="job-modal-content">
            <div className="modal-header">
              <h3>Post a Job</h3>
              <button 
                id="btn-close-job-modal-x"
                onClick={() => setIsJobModalOpen(false)}
                className="drawer-close"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

              <button type="submit" className="btn btn-primary btn-lg" id="btn-submit-publish-job">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 22 22 22 12 2"/>
                </svg>
                Publish Job & Find Candidates
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
