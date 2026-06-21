import { Profile, Gig, RecruiterProfile, Application } from '../types';

export const mockProfiles: Profile[] = [
  {
    id: 'talent-godwin',
    userId: 'user-godwin',
    fullName: 'Godwin Asante',
    country: 'Ghana',
    techFocus: 'Full-Stack Developer',
    bio: 'Self-taught software engineer and systems builder. Focused on building high-performance APIs and interactive web experiences for regional fintech setups.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    whatsappNum: '+233241234567',
    skills: ['React', 'Node.js', 'Express', 'PostgreSQL', 'TypeScript', 'TailwindCSS'],
    isVerified: true,
    createdAt: '2026-05-10T10:00:00Z',
    projects: [
      {
        id: 'project-momo-escrow',
        profileId: 'talent-godwin',
        title: 'Momo Escrow API',
        rawInput: 'Built a payment escrow system for mobile money APIs in Node. Express backend. Uses PostgreSQL to hold payments until buyer approves. Integrated with MTN MoMo Sandbox.',
        verifiedSkills: ['Node.js', 'Express', 'PostgreSQL', 'API Design'],
        githubUrl: 'https://github.com/godwin-asante/momo-escrow',
        isAudited: true,
        createdAt: '2026-05-12T14:30:00Z',
        aiSummary: `### Project Overview
A secure, transactional escrow server specifically tailored for Mobile Money (MoMo) corridors in West Africa. It prevents buyer/seller fraud by locking transaction funds in a secure pool until digital goods or services are confirmed by the buyer.

### Architecture & Technology Choices
* **Express & Node.js**: Chosen for lightweight, asynchronous execution to keep hosting costs minimal and connection speeds fast under low-bandwidth networks.
* **PostgreSQL**: Implements strict ACID transactions to ensure zero double-spending or record loss during network dropouts.
* **MTN MoMo API Integration**: Connected to regional Mobile Money USSD and API protocols for instant mobile-to-mobile transfers.

### Role & Individual Impact
* Engineered the core database ledger schema and transaction locking state machine.
* Handled the integration of MTN Mobile Money webhook notifications.
* Optimized API payload sizes to enable reliable response parsing on 2G/3G client applications.

### Business & Technical Outcome
* Reduced merchant onboarding latency for escrow verification from 48 hours to 2 minutes.
* Successfully simulated 10,000 parallel transactions without memory leaks in stress testing.
* Earned "Best Fintech Infrastructure" at the regional Accra Hackathon.`
      },
      {
        id: 'project-agri-dist',
        profileId: 'talent-godwin',
        title: 'AgriDist (USSD Crops Distribution)',
        rawInput: 'USSD app for farmers. PHP and Postgres. Helps farmers list crops and wholesale buyers buy them. Works on basic analog phones.',
        verifiedSkills: ['PostgreSQL', 'PHP', 'USSD Protocols'],
        githubUrl: 'https://github.com/godwin-asante/agridist-ussd',
        isAudited: true,
        createdAt: '2026-05-20T09:15:00Z',
        aiSummary: `### Project Overview
AgriDist is an offline-native USSD portal designed to bypass the digital divide, allowing rural farmers in East/West Africa to register crop yields and trade with bulk wholesalers without requiring smart devices or mobile data.

### Architecture & Technology Choices
* **PHP Web Server**: Selected for rapid routing of simple XML/USSD gateway payloads.
* **PostgreSQL Spatial Indexes**: Used to map buyer demands to the nearest geographical crop pools, saving transport fuel costs.
* **USSD VXML Gateway**: Standardized text interfaces to run on zero-data GSM feature phones.

### Role & Individual Impact
* Architected the entire multi-level USSD menu tree (session persistence and input caching).
* Written PostgreSQL query filters to rank matching logistics providers based on distance metrics.

### Business & Technical Outcome
* Successfully tested with 45 smallholder farms in Eastern Ghana.
* Enabled crop trades valued at 12,000 GHS in the first month.
* Achieved an average menu response time of under 350ms, critical for preventing USSD session timeouts.`
      }
    ]
  },
  {
    id: 'talent-titos',
    userId: 'user-titos',
    fullName: 'Titos Kibet',
    country: 'Kenya',
    techFocus: 'UI/UX Designer',
    bio: 'Passionate about mobile-first layouts, local design patterns, and micro-interactions. Designing experiences that work on low-spec screens and bright sunlight.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    whatsappNum: '+254711223344',
    skills: ['Figma', 'UI/UX Design', 'Design Systems', 'React', 'CSS Grids'],
    isVerified: true,
    createdAt: '2026-05-15T11:00:00Z',
    projects: [
      {
        id: 'project-boda-safe-mock',
        profileId: 'talent-titos',
        title: 'BodaSafe Driver UI',
        rawInput: 'Designed mobile app for motorcycle riders. Figma project. High contrast icons, very large buttons because they ride. Focused on bright sunlight readability.',
        verifiedSkills: ['Figma', 'UI/UX Design', 'Accessibility'],
        figmaUrl: 'https://figma.com/file/bodasafe-mockup',
        isAudited: true,
        createdAt: '2026-05-18T16:45:00Z',
        aiSummary: `### Project Overview
A high-contrast mobile driver interface designed for Boda Boda (motorcycle) logistics operators. The application UI optimizes speed and safety, ensuring riders can digest mapping and pickup alerts at a glance while navigating traffic.

### Design & Technology Choices
* **Figma UI Kit**: Crafted with a rigid 8px grid and component variables for quick developer handoff.
* **Ultra-High Contrast HSL Palette**: Optimized to prevent glare readability loss under direct equatorial sunlight.
* **Frictionless Tap Targets**: Interactive buttons designed at a minimum of 64px to accommodate riders wearing thick protective gloves.

### Role & Individual Impact
* Led the user research phase, interviewing 12 riders at Nairobi transit hubs to identify visual blockers.
* Formulated the custom component library, custom icons, and mobile prototype flow.

### Business & Technical Outcome
* Decreased rider onboarding training duration from 2 hours to a 5-minute self-guided walkthrough.
* Handed off clean, styled CSS layouts directly to front-end engineers, reducing layout review iterations by 80%.`
      }
    ]
  },
  {
    id: 'talent-brahima',
    userId: 'user-brahima',
    fullName: 'Brahima Diallo',
    country: 'Senegal',
    techFocus: 'Backend & Data Engineer',
    bio: 'Specialist in Python scripting, ETL pipelines, and language parser tools. Dedicated to building lightweight software layers that make complex data actionable.',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    whatsappNum: '+221773344556',
    skills: ['Python', 'Django', 'FastAPI', 'MongoDB', 'Data Analytics', 'Web Scraping'],
    isVerified: false,
    createdAt: '2026-06-01T08:00:00Z',
    projects: [
      {
        id: 'project-sms-translator',
        profileId: 'talent-brahima',
        title: 'SMS Wolof Translator',
        rawInput: 'Python script that uses NLP tools to translate Wolof SMS requests into SQL queries. Created for rural shopkeepers to query inventory.',
        verifiedSkills: ['Python', 'FastAPI', 'NLP', 'SQL'],
        githubUrl: 'https://github.com/brahima/sms-wolof-sql',
        isAudited: false,
        createdAt: '2026-06-05T12:00:00Z',
        aiSummary: `### Project Overview
An NLP-assisted language parser written in Python that translates unstructured Wolof text commands sent via SMS into valid database SQL queries, letting non-technical shop owners check inventory levels offline.

### Architecture & Technology Choices
* **FastAPI**: Selected for minimal API overhead, rapid JSON serialization, and auto-generated OpenAPI docs.
* **Regex + Mapped Dict NLP**: A lightweight, offline-capable parsing script chosen over heavy transformer models to ensure rapid execution on micro-cloud environments.
* **SQLite Backend**: Integrated directly for self-contained, low-cost local testing.

### Role & Individual Impact
* Developed the translation matrix mapping Wolof slang and contractions to standard database inventory columns.
* Implemented the FastAPI router to intercept SMS gateway webhooks.

### Business & Technical Outcome
* Achieved 88% parsing accuracy on Wolof requests from initial pilot merchants.
* Completed queries in under 50ms, enabling low-cost SMS round-trips.`
      }
    ]
  }
];

export const mockRecruiters: RecruiterProfile[] = [
  {
    id: 'recruiter-susupay',
    userId: 'user-recruiter-1',
    companyName: 'Susu Pay',
    website: 'https://susupay.io',
    logoUrl: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 'recruiter-choplife',
    userId: 'user-recruiter-2',
    companyName: 'ChopLife Logistics',
    website: 'https://choplife.delivery',
    logoUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 'recruiter-bodasafe',
    userId: 'user-recruiter-3',
    companyName: 'Boda Safe',
    website: 'https://bodasafe.ke',
    logoUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=100'
  }
];

export const mockGigs: Gig[] = [
  {
    id: 'gig-react-merchant',
    recruiterId: 'recruiter-susupay',
    companyName: 'Susu Pay',
    logoUrl: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=100',
    title: 'React Merchant Ledger UI',
    description: 'We need an experienced developer to craft a modular React front-end dashboard for regional shopkeepers. The layout must handle ledger inputs, offline syncing, and mobile-responsive charts showing cashflows.',
    requiredSkills: ['React', 'CSS Grids', 'TypeScript'],
    budgetGHS: 4500,
    createdAt: '2026-06-10T09:00:00Z'
  },
  {
    id: 'gig-route-optimizer',
    recruiterId: 'recruiter-choplife',
    companyName: 'ChopLife Logistics',
    logoUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=100',
    title: 'Python Location Parsing Script',
    description: 'Looking for a clean Python script to parse messy delivery driver addresses (unstructured text) and resolve them into coordinates. Needs basic regex and API geocoding integration.',
    requiredSkills: ['Python', 'SQL', 'FastAPI'],
    budgetGHS: 3500,
    createdAt: '2026-06-12T11:20:00Z'
  },
  {
    id: 'gig-onboarding-design',
    recruiterId: 'recruiter-bodasafe',
    companyName: 'Boda Safe',
    logoUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=100',
    title: 'Mobile Onboarding App Redesign',
    description: 'Redesign our driver registration screen in Figma. Focus on high contrast, readability in direct daylight, and extremely simple navigation fields for non-tech riders.',
    requiredSkills: ['Figma', 'UI/UX Design', 'Accessibility'],
    budgetGHS: 5000,
    createdAt: '2026-06-14T15:00:00Z'
  }
];

export const mockApplications: Application[] = [
  {
    id: 'app-1',
    gigId: 'gig-react-merchant',
    profileId: 'talent-godwin',
    status: 'PENDING',
    createdAt: '2026-06-12T10:00:00Z'
  },
  {
    id: 'app-2',
    gigId: 'gig-onboarding-design',
    profileId: 'talent-titos',
    status: 'SHORTLISTED',
    createdAt: '2026-06-14T17:30:00Z'
  }
];
