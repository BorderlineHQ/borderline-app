export type UserRole = 'TALENT' | 'RECRUITER' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface Project {
  id: string;
  profileId: string;
  title: string;
  rawInput: string;
  aiSummary: string; // Markdown case study
  verifiedSkills: string[];
  githubUrl?: string;
  figmaUrl?: string;
  isAudited: boolean;
  createdAt: string;
}

export interface Profile {
  id: string;
  userId: string;
  fullName: string;
  country: string;
  techFocus: string;
  bio?: string;
  avatarUrl?: string;
  whatsappNum?: string;
  skills: string[];
  isVerified: boolean;
  projects: Project[];
  createdAt: string;
  peerVouched?: string;
}

export interface RecruiterProfile {
  id: string;
  userId: string;
  companyName: string;
  website?: string;
  logoUrl?: string;
}

export interface Gig {
  id: string;
  recruiterId: string;
  companyName: string; // De-normalized for convenience
  logoUrl?: string;
  title: string;
  description: string;
  requiredSkills: string[];
  budgetGHS: number;
  createdAt: string;
}

export interface Application {
  id: string;
  gigId: string;
  profileId: string;
  status: 'PENDING' | 'SHORTLISTED' | 'REJECTED' | 'HIRED';
  createdAt: string;
}

export interface WhatsAppMessage {
  id: string;
  sender: 'user' | 'bot';
  body: string;
  timestamp: string;
}

export interface Module {
  id: string;
  title: string;
  duration: string;
  description: string;
  lessons: string[];
}

export interface Course {
  id: string;
  title: string;
  category: 'Tech' | 'Creativity' | 'Business';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  instructor: string;
  description: string;
  skillsAcquired: string[];
  modules: Module[];
  thumbnail: string;
}

