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

export interface Job {
  id: string;
  recruiterId: string;
  companyName: string; // De-normalized for convenience
  logoUrl?: string;
  title: string;
  description: string;
  requiredSkills: string[];
  salaryRange: string; // e.g. "3000-5000 GHS"
  employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP';
  location: string;
  createdAt: string;
}

export interface Application {
  id: string;
  gigId?: string;
  jobId?: string;
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

export type TeamMemberStatus = 'Active' | 'On Leave' | 'Probation';

export interface TeamMember {
  id: string;
  fullName: string;
  email: string;
  role: string;
  country: string;
  currency: string;
  monthlySalary: number;
  startDate: string;
  status: TeamMemberStatus;
  avatarUrl: string;
}

export interface PaymentEntry {
  memberId: string;
  memberName: string;
  grossAmount: number;
  currency: string;
  usdEquivalent: number;
  status: 'Completed' | 'Processing' | 'Failed';
}

export interface PaymentRun {
  id: string;
  period: string;
  totalUSD: number;
  entries: PaymentEntry[];
  status: 'Completed' | 'Processing' | 'Failed';
  processedAt: string;
}

export interface ResumeExperience {
  role: string;
  companyOrProject: string;
  duration: string;
  location?: string;
  highlights: string[];
}

export interface ResumeProject {
  title: string;
  verifiedSkills: string[];
  summary: string;
  bullets: string[];
  link?: string;
  isAudited?: boolean;
}

export interface ResumeEducation {
  institution: string;
  degree: string;
  graduationYear: string;
}

export interface ResumeData {
  fullName: string;
  title: string;
  email: string;
  phone?: string;
  location: string;
  portfolioUrl: string;
  githubUrl?: string;
  summary: string;
  skills: {
    languages: string[];
    frameworks: string[];
    toolsAndDatabases: string[];
  };
  experiences: ResumeExperience[];
  projects: ResumeProject[];
  education: ResumeEducation[];
  borderlineVerification: {
    buildScore: number;
    badgeUrl: string;
    vouchedBy?: string;
  };
}

