import { Profile, Gig, Application, RecruiterProfile } from '../types';
import { mockProfiles, mockGigs, mockApplications, mockRecruiters } from '../data/mockData';

const KEYS = {
  PROFILES: 'borderline_profiles',
  GIGS: 'borderline_gigs',
  APPLICATIONS: 'borderline_applications',
  RECRUITERS: 'borderline_recruiters',
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
    if (!localStorage.getItem(KEYS.APPLICATIONS)) {
      localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(mockApplications));
    }
    if (!localStorage.getItem(KEYS.RECRUITERS)) {
      localStorage.setItem(KEYS.RECRUITERS, JSON.stringify(mockRecruiters));
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
  }
};
