'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Gig } from '../../types';
import { 
  Briefcase, 
  FolderOpen, 
  ShieldCheck, 
  BookOpen, 
  Bell, 
  Settings, 
  Upload, 
  Globe, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  X, 
  ExternalLink, 
  Moon, 
  Sun, 
  RotateCcw,
  Sparkles,
  ChevronRight,
  TrendingUp,
  UserCheck
} from 'lucide-react';

const Github = ({ className }: { className?: string }) => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

type TabType = 'opportunities' | 'portfolio' | 'verify' | 'resources' | 'notifications';

export default function TalentPortal() {
  const { 
    profiles, 
    gigs, 
    applications, 
    activeProfileId, 
    setActiveProfileId, 
    addProject, 
    applyForGig,
    toggleVerifyProject,
    theme,
    setTheme,
    resetDatabase,
    mounted 
  } = useApp();

  const [activeTab, setActiveTab] = useState<TabType>('opportunities');
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

  // Matched gigs
  const matchedGigs = gigs
    .map(gig => ({ gig, score: calculateMatchScore(gig) }))
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

  return (
    <div className="dashboard-layout">
      {/* LEFT SIDEBAR (Desktop only, hidden on mobile) */}
      <aside className="dashboard-sidebar glass-panel">
        <div>
          {/* Profile overview */}
          <div className="sidebar-profile">
            <div className="sidebar-avatar-wrap">
              <img 
                src={currentProfile.avatarUrl || 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200'} 
                alt={currentProfile.fullName}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="sidebar-name text-white">
              {currentProfile.fullName}
              {currentProfile.isVerified && (
                <span title="Verified Profile">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)] inline ml-1" />
                </span>
              )}
            </h3>
            <span className="sidebar-focus">{currentProfile.techFocus}</span>
            <span className="sidebar-vouched">{currentProfile.peerVouched || '0 Vouched'}</span>
            
            <div className="mt-3 flex flex-wrap gap-1 justify-center max-h-[70px] overflow-y-auto">
              {currentProfile.skills.map((skill, idx) => (
                <span key={idx} className="badge badge-accent text-[10px] py-0.5 px-1.5">{skill}</span>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="sidebar-nav">
            <button 
              onClick={() => setActiveTab('opportunities')}
              className={`sidebar-nav-btn ${activeTab === 'opportunities' ? 'active' : ''}`}
            >
              <Briefcase className="w-4 h-4" />
              Opportunities
              {matchedGigs.length > 0 && <span className="badge-dot" />}
            </button>
            <button 
              onClick={() => setActiveTab('portfolio')}
              className={`sidebar-nav-btn ${activeTab === 'portfolio' ? 'active' : ''}`}
            >
              <FolderOpen className="w-4 h-4" />
              My Portfolio
            </button>
            <button 
              onClick={() => setActiveTab('verify')}
              className={`sidebar-nav-btn ${activeTab === 'verify' ? 'active' : ''}`}
            >
              <ShieldCheck className="w-4 h-4" />
              Verify Peers
            </button>
            <button 
              onClick={() => setActiveTab('resources')}
              className={`sidebar-nav-btn ${activeTab === 'resources' ? 'active' : ''}`}
            >
              <BookOpen className="w-4 h-4" />
              Resources Gateway
            </button>
            <button 
              onClick={() => setActiveTab('notifications')}
              className={`sidebar-nav-btn ${activeTab === 'notifications' ? 'active' : ''}`}
            >
              <Bell className="w-4 h-4" />
              Notifications
              {userApplications.some(a => a.status === 'SHORTLISTED') && (
                <span className="badge-dot bg-red-500" />
              )}
            </button>
          </nav>
        </div>

        {/* Sidebar settings and switches */}
        <div className="sidebar-settings">
          <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-1">
            <span className="text-[10px] uppercase font-bold text-gray-500">Settings</span>
            <Settings className="w-3.5 h-3.5 text-gray-500" />
          </div>

          {/* Theme switcher */}
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex items-center justify-between text-xs text-gray-400 hover:text-white px-2 py-1.5 rounded hover:bg-gray-800/40 w-full"
          >
            <span className="flex items-center gap-2">
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              Theme
            </span>
            <span className="text-[10px] text-gray-500 uppercase">{theme}</span>
          </button>

          {/* Profile Switcher (Demo purposes) */}
          <div className="flex flex-col gap-1">
            <label className="text-[9px] text-gray-500 font-bold uppercase pl-2">Switch Dev Profile</label>
            <select
              value={activeProfileId}
              onChange={(e) => setActiveProfileId(e.target.value)}
              className="bg-[var(--color-surface-elevated)] border border-gray-800 rounded px-2 py-1 text-xs text-gray-300 outline-none w-full"
            >
              {profiles.map(p => (
                <option key={p.id} value={p.id}>{p.fullName}</option>
              ))}
            </select>
          </div>

          {/* Reset database */}
          <button
            onClick={resetDatabase}
            className="flex items-center gap-2 text-[10px] text-red-400 hover:text-red-300 pl-2 py-1 mt-1 text-left w-full hover:bg-red-950/20 rounded"
          >
            <RotateCcw className="w-3 h-3" />
            Reset Seed Data
          </button>
        </div>
      </aside>

      {/* MAIN MAIN CONTENT CONTAINER */}
      <main className="dashboard-main">
        {/* Mobile Horizontal Scrolling Navigation Bar */}
        <div className="tab-bar-mobile">
          <button 
            onClick={() => setActiveTab('opportunities')}
            className={`tab-btn-mobile ${activeTab === 'opportunities' ? 'active' : ''}`}
          >
            Gigs
          </button>
          <button 
            onClick={() => setActiveTab('portfolio')}
            className={`tab-btn-mobile ${activeTab === 'portfolio' ? 'active' : ''}`}
          >
            Portfolio
          </button>
          <button 
            onClick={() => setActiveTab('verify')}
            className={`tab-btn-mobile ${activeTab === 'verify' ? 'active' : ''}`}
          >
            Verify
          </button>
          <button 
            onClick={() => setActiveTab('resources')}
            className={`tab-btn-mobile ${activeTab === 'resources' ? 'active' : ''}`}
          >
            Resources
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`tab-btn-mobile ${activeTab === 'notifications' ? 'active' : ''}`}
          >
            Inbox
          </button>
        </div>

        {/* Welcome Header */}
        <div className="dashboard-welcome">
          <div className="welcome-text">
            <h2>Welcome back, {currentProfile.fullName.split(' ')[0]}!</h2>
            <p>
              {activeTab === 'opportunities' && `You have ${matchedGigs.length} matching micro-gigs waiting for your verification token.`}
              {activeTab === 'portfolio' && `Manage your verified projects and case studies. Click Upload to sync new ones.`}
              {activeTab === 'verify' && `Vouch for peers in your network to build mutual proof-of-work credibility.`}
              {activeTab === 'resources' && `Curated references and local API docs to help you ship clean code faster.`}
              {activeTab === 'notifications' && `Stay updated on matches, shortlists, and vouches on your projects.`}
            </p>
          </div>

          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="btn btn-primary text-xs py-2 px-4 flex items-center gap-1.5 shadow-md shadow-emerald-950/20"
          >
            <Plus className="w-4 h-4" />
            Upload Project
          </button>
        </div>

        {/* TAB BODY CONTENTS */}
        <div className="dashboard-content-panel">
          
          {/* TAB 1: OPPORTUNITIES */}
          {activeTab === 'opportunities' && (
            <div className="opportunities-grid">
              {matchedGigs.length === 0 ? (
                <div className="col-span-full py-12 text-center border border-dashed border-gray-800 rounded-xl">
                  <AlertCircle className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">No matching gigs found for your active skill tags.</p>
                  <p className="text-xs text-gray-600 mt-1">Add projects to extract verified skills and trigger automated matching.</p>
                </div>
              ) : (
                matchedGigs.map(({ gig, score }) => {
                  const isApplied = applications.some(a => a.gigId === gig.id && a.profileId === currentProfile.id);
                  return (
                    <div key={gig.id} className="gig-dash-card glow-card">
                      <div>
                        <div className="gig-dash-header">
                          <img src={gig.logoUrl} alt={gig.companyName} className="gig-company-logo" />
                          <div className="gig-title-area">
                            <h4 className="gig-dash-title text-white">{gig.title}</h4>
                            <span className="gig-company-name">
                              <Globe className="w-3.5 h-3.5" />
                              {gig.companyName}
                            </span>
                          </div>
                          <span className="match-badge">{score}% Match</span>
                        </div>
                        
                        <p className="gig-dash-body">{gig.description}</p>
                        
                        <div className="gig-dash-tags">
                          {gig.requiredSkills.map((s, i) => (
                            <span 
                              key={i} 
                              className={`tag-badge ${currentProfile.skills.includes(s) ? 'matched' : ''}`}
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="gig-dash-footer">
                        <div className="gig-budget">
                          GHS {gig.budgetGHS}
                          <span className="ml-1">/project</span>
                        </div>
                        {isApplied ? (
                          <span className="text-xs text-gray-500 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            Applied
                          </span>
                        ) : (
                          <button
                            onClick={() => applyForGig(gig.id, currentProfile.id)}
                            className="btn btn-secondary text-xs py-1.5 px-3"
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
          )}

          {/* TAB 2: PORTFOLIO */}
          {activeTab === 'portfolio' && (
            <div className="portfolio-grid">
              {currentProfile.projects.length === 0 ? (
                <div className="col-span-full py-12 text-center border border-dashed border-gray-800 rounded-xl">
                  <FolderOpen className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">No project case studies compiled yet.</p>
                  <p className="text-xs text-gray-600 mt-1">Use the &quot;Upload Project&quot; button above to generate your first AI case study.</p>
                </div>
              ) : (
                currentProfile.projects.map((proj) => (
                  <div key={proj.id} className="proj-dash-card">
                    <div className="proj-dash-header">
                      <div>
                        <h4 className="proj-dash-title text-white">{proj.title}</h4>
                        <span className="text-[10px] text-gray-500">
                          Compiled on {new Date(proj.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      
                      {proj.isAudited ? (
                        <span className="status-chip audited">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Audited
                        </span>
                      ) : (
                        <span className="status-chip pending">
                          <AlertCircle className="w-3.5 h-3.5" />
                          Pending Review
                        </span>
                      )}
                    </div>

                    <div className="proj-dash-skills">
                      {proj.verifiedSkills.map((s, idx) => (
                        <span key={idx} className="badge badge-accent text-[9px]">{s}</span>
                      ))}
                    </div>

                    <div className="proj-dash-summary">
                      {renderMarkdown(proj.aiSummary)}
                    </div>

                    <div className="proj-dash-links">
                      {proj.githubUrl && (
                        <a 
                          href={proj.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="proj-link-btn text-white hover:text-[var(--color-accent)]"
                        >
                          <Github className="w-3.5 h-3.5" />
                          GitHub
                          <ExternalLink className="w-2.5 h-2.5 ml-1" />
                        </a>
                      )}
                      {proj.figmaUrl && (
                        <a 
                          href={proj.figmaUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="proj-link-btn text-white hover:text-[var(--color-accent)]"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          Figma
                          <ExternalLink className="w-2.5 h-2.5 ml-1" />
                        </a>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: VERIFY PEERS */}
          {activeTab === 'verify' && (
            <div className="peers-grid">
              {peerDevelopers.length === 0 ? (
                <div className="col-span-full py-12 text-center border border-dashed border-gray-800 rounded-xl">
                  <ShieldCheck className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">No other developer profiles in local workspace.</p>
                </div>
              ) : (
                peerDevelopers.map((peer) => {
                  return peer.projects.map((proj) => (
                    <div key={proj.id} className="peer-card">
                      <div>
                        <div className="peer-header">
                          <img src={peer.avatarUrl} alt={peer.fullName} className="peer-avatar" />
                          <div className="peer-name-area">
                            <h4 className="peer-name text-white">{peer.fullName}</h4>
                            <span className="peer-focus">{peer.techFocus} ({peer.country})</span>
                          </div>
                        </div>

                        <div className="my-3">
                          <h5 className="peer-proj-title text-white">{proj.title}</h5>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {proj.verifiedSkills.map((s, i) => (
                              <span key={i} className="badge badge-accent text-[9px] py-0.5 px-1.5">{s}</span>
                            ))}
                          </div>
                        </div>

                        <div className="proj-dash-summary max-h-[140px] overflow-y-auto mb-3">
                          {renderMarkdown(proj.aiSummary)}
                        </div>
                      </div>

                      {proj.isAudited ? (
                        <button
                          disabled
                          className="btn btn-secondary text-xs w-full py-2 flex items-center justify-center gap-1.5 text-emerald-400 border-emerald-950/20 bg-emerald-950/10 cursor-default"
                        >
                          <UserCheck className="w-4 h-4" />
                          You Vouched Work
                        </button>
                      ) : (
                        <button
                          onClick={() => toggleVerifyProject(proj.id)}
                          className="btn btn-primary text-xs w-full py-2 flex items-center justify-center gap-1.5"
                        >
                          <ShieldCheck className="w-4 h-4" />
                          Vouch Work Credibility
                        </button>
                      )}
                    </div>
                  ));
                })
              )}
            </div>
          )}

          {/* TAB 4: RESOURCES GATEWAY */}
          {activeTab === 'resources' && (
            <div className="resources-grid">
              <div className="resource-dash-card">
                <span className="resource-category">Sandbox Integration</span>
                <h4 className="resource-title text-white">WhatsApp Sandboxing Walkthrough</h4>
                <p className="resource-desc text-gray-400">
                  Learn how to register your mobile number into our local mock SMS gateway. Push code descriptions, query micro-gigs, and apply to opportunities without loading full-size web browser pages on spotty 2G connections.
                </p>
                <a href="/whatsapp" className="resource-action hover:underline">
                  Go to WhatsApp Sandbox
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>

              <div className="resource-dash-card">
                <span className="resource-category">Local Payment APIs</span>
                <h4 className="resource-title text-white">Susu Pay Ledger APIs</h4>
                <p className="resource-desc text-gray-400">
                  Technical guides to integrating localized escrow API services. Implements instant checkout triggers, verification logs, and mobile money splits.
                </p>
                <a href="#" className="resource-action hover:underline" onClick={(e) => e.preventDefault()}>
                  Read Developer Guide
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>

              <div className="resource-dash-card">
                <span className="resource-category">Mobile Money</span>
                <h4 className="resource-title text-white">Ghana Momo Integration Details</h4>
                <p className="resource-desc text-gray-400">
                  Curated endpoints for MTN Mobile Money and Telecel. Configures secure callbacks, trust tier authentication, and GHS-denominated payouts.
                </p>
                <a href="#" className="resource-action hover:underline" onClick={(e) => e.preventDefault()}>
                  Explore Specs
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>

              <div className="resource-dash-card">
                <span className="resource-category">Community</span>
                <h4 className="resource-title text-white">BorderLine Peer Networks</h4>
                <p className="resource-desc text-gray-400">
                  A gateway to joining regional developer boards, discord guilds, and peer-to-peer code review circles across West Africa.
                </p>
                <a href="#" className="resource-action hover:underline" onClick={(e) => e.preventDefault()}>
                  Join Network
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}

          {/* TAB 5: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="notifications-panel">
              {notificationsList.length === 0 ? (
                <div className="py-12 text-center">
                  <Bell className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Your notifications inbox is empty.</p>
                </div>
              ) : (
                notificationsList.map((notif, idx) => (
                  <div key={idx} className="notif-row">
                    <div className={`notif-icon-wrap ${notif.status}`}>
                      {notif.status === 'shortlisted' ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : notif.status === 'hired' ? (
                        <Sparkles className="w-4 h-4" />
                      ) : (
                        <Bell className="w-4 h-4" />
                      )}
                    </div>
                    
                    <div className="notif-body">
                      <p className="notif-message">{notif.message}</p>
                      <span className="notif-time text-gray-500">{notif.time}</span>
                    </div>

                    {notif.status !== 'pending' && (
                      <span className={`notif-status-badge ${notif.status}`}>
                        {notif.status}
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

        </div>
      </main>

      {/* FLOATING ACTION BUTTON (Upload Project shortcut) */}
      <button 
        onClick={() => setIsDrawerOpen(true)}
        className="floating-fab btn btn-primary cursor-pointer hover:scale-105"
      >
        <Upload className="w-4 h-4" />
        <span>Upload Project</span>
      </button>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="mobile-bottom-nav">
        <button 
          onClick={() => setActiveTab('opportunities')}
          className={`mobile-bottom-nav-item ${activeTab === 'opportunities' ? 'active' : ''}`}
        >
          <Briefcase className="w-5 h-5" />
          <span>Gigs</span>
        </button>
        <button 
          onClick={() => setActiveTab('portfolio')}
          className={`mobile-bottom-nav-item ${activeTab === 'portfolio' ? 'active' : ''}`}
        >
          <FolderOpen className="w-5 h-5" />
          <span>Portfolio</span>
        </button>
        <button 
          onClick={() => setActiveTab('verify')}
          className={`mobile-bottom-nav-item ${activeTab === 'verify' ? 'active' : ''}`}
        >
          <ShieldCheck className="w-5 h-5" />
          <span>Verify</span>
        </button>
        <button 
          onClick={() => setActiveTab('resources')}
          className={`mobile-bottom-nav-item ${activeTab === 'resources' ? 'active' : ''}`}
        >
          <BookOpen className="w-5 h-5" />
          <span>Resources</span>
        </button>
        <button 
          onClick={() => setActiveTab('notifications')}
          className={`mobile-bottom-nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
        >
          <Bell className="w-5 h-5" />
          <span>Inbox</span>
        </button>
      </nav>

      {/* SLIDING DRAWER MODAL FOR UPLOAD / AI COMPILER */}
      {isDrawerOpen && (
        <div className="drawer-backdrop-v2" onClick={() => !isParsing && setIsDrawerOpen(false)}>
          <div className="drawer-panel-v2" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header-v2">
              <h3 className="flex items-center gap-2 text-white">
                <Sparkles className="w-5 h-5 text-[var(--color-accent)]" />
                AI Case Study Compiler
              </h3>
              <button 
                onClick={() => !isParsing && setIsDrawerOpen(false)}
                className="drawer-close-btn"
                disabled={isParsing}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-400">
              Provide messy repository documentation, assignment briefs, or raw scripts. Our compiler parses the patterns, registers your verified skills, and outputs a formatted case study.
            </p>

            {isParsing ? (
              <div className="log-console mt-2">
                <div className="flex justify-between border-b border-gray-800 pb-2 mb-2">
                  <span>BORDERLINE AI PARSER v1.0.3</span>
                  <span className="animate-pulse text-emerald-400 font-bold text-xs">● ACTIVE</span>
                </div>
                {logs.map((log, idx) => (
                  <div key={idx} className="log-line">
                    <span className="text-gray-600">&gt;</span>
                    <div>{log}</div>
                  </div>
                ))}
                <div ref={logEndRef} />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="form-group mb-0">
                  <label className="form-label text-xs" htmlFor="project-title-input">Project Title</label>
                  <input 
                    type="text" 
                    id="project-title-input"
                    className="form-input text-xs" 
                    placeholder="e.g. Momo Escrow API, AgriDist USSD"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group mb-0">
                  <label className="form-label text-xs" htmlFor="project-raw-notes-input">Raw Notes or Code Description</label>
                  <textarea 
                    id="project-raw-notes-input"
                    className="form-textarea text-xs min-h-[140px]" 
                    placeholder="Paste rough notes, list of tools, or copy paste code. For example: 'Built a ledger screen for cocoa farmers in React. Uses local storage for offline. Fast responses.'"
                    value={rawInput}
                    onChange={(e) => setRawInput(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="form-group mb-0">
                    <label className="form-label text-xs" htmlFor="project-github-input">GitHub Repo URL (Optional)</label>
                    <input 
                      type="url" 
                      id="project-github-input"
                      className="form-input text-xs" 
                      placeholder="https://github.com/..."
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                    />
                  </div>
                  <div className="form-group mb-0">
                    <label className="form-label text-xs" htmlFor="project-figma-input">Figma Link (Optional)</label>
                    <input 
                      type="url" 
                      id="project-figma-input"
                      className="form-input text-xs" 
                      placeholder="https://figma.com/..."
                      value={figmaUrl}
                      onChange={(e) => setFigmaUrl(e.target.value)}
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary text-xs py-2.5 mt-2 flex items-center justify-center gap-1.5"
                  id="btn-submit-project"
                >
                  <Sparkles className="w-4 h-4" />
                  Compile & Verify Case Study
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
