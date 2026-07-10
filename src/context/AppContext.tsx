'use client';
/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Profile, Gig, Application, RecruiterProfile, WhatsAppMessage, Project, Job, TeamMember, PaymentRun } from '../types';
import { dbService } from '../services/db';
import { aiService } from '../services/ai';

interface AppContextType {
  profiles: Profile[];
  gigs: Gig[];
  jobs: Job[];
  applications: Application[];
  recruiters: RecruiterProfile[];
  teamMembers: TeamMember[];
  paymentHistory: PaymentRun[];
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  activeProfileId: string;
  setActiveProfileId: (id: string) => void;
  activeRecruiterId: string;
  setActiveRecruiterId: (id: string) => void;
  addProject: (profileId: string, title: string, rawInput: string, githubUrl?: string, figmaUrl?: string) => Promise<void>;
  postGig: (title: string, description: string, requiredSkills: string[], budgetGHS: number) => void;
  postJob: (title: string, description: string, requiredSkills: string[], salaryRange: string, employmentType: Job['employmentType'], location: string) => void;
  applyForGig: (gigId: string, profileId: string) => void;
  applyForJob: (jobId: string, profileId: string) => void;
  updateApplicationStatus: (applicationId: string, status: Application['status']) => void;
  addTeamMember: (member: TeamMember) => void;
  updateTeamMember: (member: TeamMember) => void;
  removeTeamMember: (id: string) => void;
  runPayroll: (period: string, entries: any[], totalUSD: number) => void;
  whatsappMessages: WhatsAppMessage[];
  sendWhatsAppMessage: (body: string) => void;
  toggleVerifyProfile: (profileId: string) => void;
  toggleVerifyProject: (projectId: string) => void;
  resetDatabase: () => void;
  mounted: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [recruiters, setRecruiters] = useState<RecruiterProfile[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [paymentHistory, setPaymentHistory] = useState<PaymentRun[]>([]);
  const [theme, setThemeState] = useState<'dark' | 'light'>('light');
  const [activeProfileId, setActiveProfileId] = useState<string>('talent-chidi');
  const [activeRecruiterId, setActiveRecruiterId] = useState<string>('recruiter-susupay');
  const [whatsappMessages, setWhatsappMessages] = useState<WhatsAppMessage[]>([]);
  const [mounted, setMounted] = useState(false);

  // Initialize data on mount
  useEffect(() => {
    dbService.initialize();
    setProfiles(dbService.getProfiles());
    setGigs(dbService.getGigs());
    setJobs(dbService.getJobs());
    setApplications(dbService.getApplications());
    setRecruiters(dbService.getRecruiters());
    setTeamMembers(dbService.getTeamMembers());
    setPaymentHistory(dbService.getPaymentRuns());

    // Load theme
    const savedTheme = localStorage.getItem('borderline_theme') as 'dark' | 'light';
    const initialTheme = savedTheme || 'light';
    setThemeState(initialTheme);
    document.body.className = `${initialTheme}-theme`;

    // Welcome message for WhatsApp Chatbot
    setWhatsappMessages([
      {
        id: 'welcome-1',
        sender: 'bot',
        body: '👋 Welcome to BorderLine WhatsApp Assistant!\n\nI am your AI agent. Update your portfolio, check job matches, and apply — all via SMS.\n\nType *help* or *menu* to see available commands.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);

    setMounted(true);
  }, []);

  const setTheme = (newTheme: 'dark' | 'light') => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('borderline_theme', newTheme);
      document.body.className = `${newTheme}-theme`;
    }
  };

  const addProject = async (profileId: string, title: string, rawInput: string, githubUrl?: string, figmaUrl?: string) => {
    // 1. Instantly create a pending project
    const tempProjectId = `project-temp-${Date.now()}`;
    const newProject: Project = {
      id: tempProjectId,
      profileId,
      title,
      rawInput,
      githubUrl,
      figmaUrl,
      aiSummary: '⚙️ AI Parsing in progress... Analyzing codebase structure and extracting functional outcomes.',
      verifiedSkills: [],
      isAudited: false,
      createdAt: new Date().toISOString(),
    };

    const updatedProfiles = profiles.map((p) => {
      if (p.id === profileId) {
        return { ...p, projects: [newProject, ...p.projects] };
      }
      return p;
    });
    setProfiles(updatedProfiles);
    dbService.saveProfiles(updatedProfiles);

    try {
      // 2. Perform AI Case Study parsing
      const { aiSummary, verifiedSkills } = await aiService.generateCaseStudy(title, rawInput);

      // 3. Update project with parsed results
      const finalizedProfiles = dbService.getProfiles().map((p) => {
        if (p.id === profileId) {
          const updatedProjects = p.projects.map((proj) => {
            if (proj.id === tempProjectId) {
              return {
                ...proj,
                id: `project-${Date.now()}`, // Give it a permanent ID
                aiSummary,
                verifiedSkills,
              };
            }
            return proj;
          });

          // Merge newly verified skills into profile skills, avoiding duplicates
          const uniqueSkills = Array.from(new Set([...p.skills, ...verifiedSkills]));

          return { ...p, projects: updatedProjects, skills: uniqueSkills };
        }
        return p;
      });

      setProfiles(finalizedProfiles);
      dbService.saveProfiles(finalizedProfiles);

    } catch (err) {
      console.error('Add Project failed:', err);
    }
  };

  const postGig = (title: string, description: string, requiredSkills: string[], budgetGHS: number) => {
    const recruiter = recruiters.find(r => r.id === activeRecruiterId);
    const newGig: Gig = {
      id: `gig-${Date.now()}`,
      recruiterId: activeRecruiterId,
      companyName: recruiter ? recruiter.companyName : 'Partner Startup',
      logoUrl: recruiter?.logoUrl,
      title,
      description,
      requiredSkills,
      budgetGHS,
      createdAt: new Date().toISOString(),
    };

    const updatedGigs = [newGig, ...gigs];
    setGigs(updatedGigs);
    dbService.saveGigs(updatedGigs);
  };

  const postJob = (title: string, description: string, requiredSkills: string[], salaryRange: string, employmentType: Job['employmentType'], location: string) => {
    const recruiter = recruiters.find(r => r.id === activeRecruiterId);
    const newJob: Job = {
      id: `job-${Date.now()}`,
      recruiterId: activeRecruiterId,
      companyName: recruiter ? recruiter.companyName : 'Partner Startup',
      logoUrl: recruiter?.logoUrl,
      title,
      description,
      requiredSkills,
      salaryRange,
      employmentType,
      location,
      createdAt: new Date().toISOString(),
    };

    const updatedJobs = [newJob, ...jobs];
    setJobs(updatedJobs);
    dbService.saveJobs(updatedJobs);
  };

  const applyForGig = (gigId: string, profileId: string) => {
    // Check if already applied
    const exists = applications.some(a => a.gigId === gigId && a.profileId === profileId);
    if (exists) return;

    const newApp: Application = {
      id: `app-${Date.now()}`,
      gigId,
      profileId,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    const updatedApps = [newApp, ...applications];
    setApplications(updatedApps);
    dbService.saveApplications(updatedApps);
  };

  const applyForJob = (jobId: string, profileId: string) => {
    // Check if already applied
    const exists = applications.some(a => a.jobId === jobId && a.profileId === profileId);
    if (exists) return;

    const newApp: Application = {
      id: `app-${Date.now()}`,
      jobId,
      profileId,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    const updatedApps = [newApp, ...applications];
    setApplications(updatedApps);
    dbService.saveApplications(updatedApps);
  };

  const updateApplicationStatus = (applicationId: string, status: Application['status']) => {
    const updatedApps = applications.map(app => {
      if (app.id === applicationId) {
        return { ...app, status };
      }
      return app;
    });
    setApplications(updatedApps);
    dbService.saveApplications(updatedApps);
  };

  const toggleVerifyProfile = (profileId: string) => {
    const updated = profiles.map(p => {
      if (p.id === profileId) {
        return { ...p, isVerified: !p.isVerified };
      }
      return p;
    });
    setProfiles(updated);
    dbService.saveProfiles(updated);
  };

  const toggleVerifyProject = (projectId: string) => {
    const updated = profiles.map(p => {
      const updatedProjects = p.projects.map(proj => {
        if (proj.id === projectId) {
          return { ...proj, isAudited: !proj.isAudited };
        }
        return proj;
      });
      return { ...p, projects: updatedProjects };
    });
    setProfiles(updated);
    dbService.saveProfiles(updated);
  };

  const addTeamMember = (member: TeamMember) => {
    const updated = [...teamMembers, member];
    setTeamMembers(updated);
    dbService.saveTeamMembers(updated);
  };

  const updateTeamMember = (member: TeamMember) => {
    const updated = teamMembers.map(m => m.id === member.id ? member : m);
    setTeamMembers(updated);
    dbService.saveTeamMembers(updated);
  };

  const removeTeamMember = (id: string) => {
    const updated = teamMembers.filter(m => m.id !== id);
    setTeamMembers(updated);
    dbService.saveTeamMembers(updated);
  };

  const runPayroll = (period: string, entries: any[], totalUSD: number) => {
    const newRun: PaymentRun = {
      id: `pr-${Date.now()}`,
      period,
      totalUSD,
      entries,
      status: 'Completed',
      processedAt: new Date().toISOString(),
    };
    const updated = [newRun, ...paymentHistory];
    setPaymentHistory(updated);
    dbService.savePaymentRuns(updated);
  };

  const resetDatabase = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('borderline_profiles');
      localStorage.removeItem('borderline_gigs');
      localStorage.removeItem('borderline_jobs');
      localStorage.removeItem('borderline_applications');
      localStorage.removeItem('borderline_recruiters');
      localStorage.removeItem('borderline_team_members');
      localStorage.removeItem('borderline_payment_runs');
      dbService.initialize();
      setProfiles(dbService.getProfiles());
      setGigs(dbService.getGigs());
      setJobs(dbService.getJobs());
      setApplications(dbService.getApplications());
      setRecruiters(dbService.getRecruiters());
      setTeamMembers(dbService.getTeamMembers());
      setPaymentHistory(dbService.getPaymentRuns());
    }
  };

  // WhatsApp chat command execution handler
  const sendWhatsAppMessage = async (body: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: WhatsAppMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      body,
      timestamp: timeStr
    };

    setWhatsappMessages(prev => [...prev, userMsg]);

    const cleanInput = body.trim().toLowerCase();
    let botReply = '';

    const currentProfile = dbService.getProfiles().find(p => p.id === activeProfileId);
    if (!currentProfile) {
      botReply = '❌ Error: Profile not found. Please log in on the web interface.';
      triggerBotReply(botReply);
      return;
    }

    if (cleanInput === 'help' || cleanInput === 'menu') {
      botReply = `💡 *BorderLine Assistant Commands*:\n\n*1. profile* - View your active verified profile.\n*2. projects* - List your uploaded case studies.\n*3. matches* - View matched micro-gigs.\n*4. apply [GIG_ID]* - Apply for a matched gig.\n*5. add [TITLE] | [NOTES]* - Instantly build a case study (e.g. \`add Chat App | Created with Node and Socket.io\`).`;
    } else if (cleanInput === 'profile') {
      botReply = `👤 *Your Profile Summary*:\n\n*Name*: ${currentProfile.fullName}\n*Focus*: ${currentProfile.techFocus}\n*Country*: ${currentProfile.country}\n*Skills*: ${currentProfile.skills.join(', ')}\n*Status*: ${currentProfile.isVerified ? '✅ AI-Verified (Trust Tier 1)' : '⚠️ Unverified (Awaiting Audit)'}\n\n📝 _To add a project, type:_\n\`add [Title] | [Raw notes]\``;
    } else if (cleanInput === 'projects') {
      if (currentProfile.projects.length === 0) {
        botReply = '📭 You haven\'t uploaded any projects yet. Type:\n`add [Title] | [Description]` to build your first!';
      } else {
        botReply = `📂 *Your Portfolio Case Studies*:\n\n` + currentProfile.projects.map((p, idx) => {
          return `${idx + 1}. *${p.title}* [${p.isAudited ? '✅ Audited' : '⚙️ Pending Audit'}]\n   _Skills:_ ${p.verifiedSkills.join(', ')}`;
        }).join('\n\n');
      }
    } else if (cleanInput === 'matches') {
      const activeGigs = dbService.getGigs();
      // Calculate match percentage based on shared skills
      const matchesList = activeGigs.map(gig => {
        const shared = gig.requiredSkills.filter(s => currentProfile.skills.includes(s));
        const pct = gig.requiredSkills.length > 0
          ? Math.round((shared.length / gig.requiredSkills.length) * 100)
          : 0;
        return { gig, pct };
      })
      .filter(m => m.pct > 0)
      .sort((a, b) => b.pct - a.pct);

      if (matchesList.length === 0) {
        botReply = '📭 No active matches found matching your skill tags right now. Try uploading more projects to verify new skills!';
      } else {
        botReply = `🎯 *Matched Micro-Gigs (${matchesList.length})*:\n\n` + matchesList.map((m) => {
          const isApplied = dbService.getApplications().some(a => a.gigId === m.gig.id && a.profileId === currentProfile.id);
          return `*${m.gig.title}* (${m.pct}% Match)\n💰 Budget: GHS ${m.gig.budgetGHS}\n🏢 Company: ${m.gig.companyName}\n🔑 Skills: ${m.gig.requiredSkills.join(', ')}\n🏷️ Code: \`${m.gig.id}\`\n👉 Status: ${isApplied ? '✅ Applied' : 'Apply via: `apply ' + m.gig.id + '`'}`;
        }).join('\n\n');
      }
    } else if (cleanInput.startsWith('apply ')) {
      const gigId = body.substring(6).trim();
      const gig = dbService.getGigs().find(g => g.id === gigId);
      if (!gig) {
        botReply = `❌ Gig ID \`${gigId}\` not found. Type *matches* to view valid gig codes.`;
      } else {
        const exists = dbService.getApplications().some(a => a.gigId === gigId && a.profileId === currentProfile.id);
        if (exists) {
          botReply = `⚠️ You have already applied to *${gig.title}*. We will notify you when the recruiter reviews it!`;
        } else {
          applyForGig(gig.id, currentProfile.id);
          botReply = `✅ *Success!* Your application for *${gig.title}* has been sent to *${gig.companyName}*.\n\nWe shared your AI-Verified Portfolio. We will text you as soon as they review it.`;
        }
      }
    } else if (cleanInput.startsWith('add ')) {
      const content = body.substring(4).trim();
      const parts = content.split('|');
      const title = parts[0]?.trim();
      const rawInput = parts[1]?.trim();

      if (!title || !rawInput) {
        botReply = `❌ Format incorrect. Please use:\n\`add [Project Title] | [Raw notes or code links]\`\n\nExample:\n\`add Chat App | Node backend, React UI, handles live messaging.\``;
      } else {
        botReply = `⚙️ *BorderLine AI parsing engine activated!*\n\nReading notes for *"${title}"*...\nGenerating verified case study layout...\n\n_I will send you a message when the live web portfolio updates._`;

        // Run the async portfolio builder in the background
        setTimeout(async () => {
          // Trigger the state addProject (which calls backend API and updates local storage)
          await addProject(currentProfile.id, title, rawInput);

          // Get updated profile to check newly extracted skills
          const updatedProfile = dbService.getProfiles().find(p => p.id === currentProfile.id);
          const newProject = updatedProfile?.projects[0];
          const newSkills = newProject?.verifiedSkills || [];

          const botNotification: WhatsAppMessage = {
            id: `msg-bot-notif-${Date.now()}`,
            sender: 'bot',
            body: `🤖 *AI Portfolio Update Notification!*\n\nCase study for *"${title}"* is now live!\n\n🔑 *Extracted Skills*: ${newSkills.join(', ') || 'Software Engineering'}\n🛡️ *Audit Status*: Awaiting admin review badge.\n\n🌐 View your live dashboard profile to see the completed case study.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };

          setWhatsappMessages(prev => [...prev, botNotification]);
        }, 3000);
      }
    } else {
      botReply = `🤔 Command not recognized: "${body}"\n\nType *help* or *menu* to see a list of valid actions.`;
    }

    triggerBotReply(botReply);
  };

  const triggerBotReply = (body: string) => {
    setTimeout(() => {
      setWhatsappMessages(prev => [
        ...prev,
        {
          id: `msg-bot-${Date.now()}`,
          sender: 'bot',
          body,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    }, 800);
  };

  return (
    <AppContext.Provider value={{
      profiles,
      gigs,
      jobs,
      applications,
      recruiters,
      teamMembers,
      paymentHistory,
      theme,
      setTheme,
      activeProfileId,
      setActiveProfileId,
      activeRecruiterId,
      setActiveRecruiterId,
      addProject,
      postGig,
      postJob,
      applyForGig,
      applyForJob,
      updateApplicationStatus,
      addTeamMember,
      updateTeamMember,
      removeTeamMember,
      runPayroll,
      whatsappMessages,
      sendWhatsAppMessage,
      toggleVerifyProfile,
      toggleVerifyProject,
      resetDatabase,
      mounted,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
