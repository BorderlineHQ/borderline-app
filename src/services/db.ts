import { Profile, Gig, Application, RecruiterProfile, Job, TeamMember, PaymentRun } from '../types';
import { mockProfiles, mockGigs, mockApplications, mockRecruiters } from '../data/mockData';
import { mockTeamMembers, mockPaymentHistory } from '../data/teamsData';

const KEYS = {
  PROFILES: 'borderline_profiles',
  GIGS: 'borderline_gigs',
  JOBS: 'borderline_jobs',
  APPLICATIONS: 'borderline_applications',
  RECRUITERS: 'borderline_recruiters',
  TEAM_MEMBERS: 'borderline_team_members',
  PAYMENT_RUNS: 'borderline_payment_runs',
};

// Check if window is defined (browser environment)
const isBrowser = typeof window !== 'undefined';

export const dbService = {
  initialize() {
    if (!isBrowser) return;

    if (!localStorage.getItem(KEYS.PROFILES)) {
      localStorage.setItem(KEYS.PROFILES, JSON.stringify(mockProfiles));
    }
    if (!localStorage.getItem(KEYS.GIGS)) {
      localStorage.setItem(KEYS.GIGS, JSON.stringify(mockGigs));
    }
    if (!localStorage.getItem(KEYS.JOBS)) {
      localStorage.setItem(KEYS.JOBS, JSON.stringify([]));
    }
    if (!localStorage.getItem(KEYS.APPLICATIONS)) {
      localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(mockApplications));
    }
    if (!localStorage.getItem(KEYS.RECRUITERS)) {
      localStorage.setItem(KEYS.RECRUITERS, JSON.stringify(mockRecruiters));
    }
    if (!localStorage.getItem(KEYS.TEAM_MEMBERS)) {
      localStorage.setItem(KEYS.TEAM_MEMBERS, JSON.stringify(mockTeamMembers));
    }
    if (!localStorage.getItem(KEYS.PAYMENT_RUNS)) {
      localStorage.setItem(KEYS.PAYMENT_RUNS, JSON.stringify(mockPaymentHistory));
    }
  },

  getProfiles(): Profile[] {
    if (!isBrowser) return mockProfiles;
    this.initialize();
    const data = localStorage.getItem(KEYS.PROFILES);
    return data ? JSON.parse(data) : mockProfiles;
  },

  saveProfiles(profiles: Profile[]) {
    if (!isBrowser) return;
    localStorage.setItem(KEYS.PROFILES, JSON.stringify(profiles));
  },

  getGigs(): Gig[] {
    if (!isBrowser) return mockGigs;
    this.initialize();
    const data = localStorage.getItem(KEYS.GIGS);
    return data ? JSON.parse(data) : mockGigs;
  },

  saveGigs(gigs: Gig[]) {
    if (!isBrowser) return;
    localStorage.setItem(KEYS.GIGS, JSON.stringify(gigs));
  },

  getJobs(): Job[] {
    if (!isBrowser) return [];
    this.initialize();
    const data = localStorage.getItem(KEYS.JOBS);
    return data ? JSON.parse(data) : [];
  },

  saveJobs(jobs: Job[]) {
    if (!isBrowser) return;
    localStorage.setItem(KEYS.JOBS, JSON.stringify(jobs));
  },

  getApplications(): Application[] {
    if (!isBrowser) return mockApplications;
    this.initialize();
    const data = localStorage.getItem(KEYS.APPLICATIONS);
    return data ? JSON.parse(data) : mockApplications;
  },

  saveApplications(apps: Application[]) {
    if (!isBrowser) return;
    localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(apps));
  },

  getRecruiters(): RecruiterProfile[] {
    if (!isBrowser) return mockRecruiters;
    this.initialize();
    const data = localStorage.getItem(KEYS.RECRUITERS);
    return data ? JSON.parse(data) : mockRecruiters;
  },

  saveRecruiters(recruiters: RecruiterProfile[]) {
    if (!isBrowser) return;
    localStorage.setItem(KEYS.RECRUITERS, JSON.stringify(recruiters));
  },

  getTeamMembers(): TeamMember[] {
    if (!isBrowser) return mockTeamMembers;
    this.initialize();
    const data = localStorage.getItem(KEYS.TEAM_MEMBERS);
    return data ? JSON.parse(data) : mockTeamMembers;
  },

  saveTeamMembers(members: TeamMember[]) {
    if (!isBrowser) return;
    localStorage.setItem(KEYS.TEAM_MEMBERS, JSON.stringify(members));
  },

  getPaymentRuns(): PaymentRun[] {
    if (!isBrowser) return mockPaymentHistory;
    this.initialize();
    const data = localStorage.getItem(KEYS.PAYMENT_RUNS);
    return data ? JSON.parse(data) : mockPaymentHistory;
  },

  savePaymentRuns(runs: PaymentRun[]) {
    if (!isBrowser) return;
    localStorage.setItem(KEYS.PAYMENT_RUNS, JSON.stringify(runs));
  }
};
