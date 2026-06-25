import { Profile, Gig, RecruiterProfile, Application } from '../types';

export const mockProfiles: Profile[] = [
  {
    id: 'talent-chidi',
    userId: 'user-chidi',
    fullName: 'Chidi Chikwe',
    country: 'Nigeria',
    techFocus: 'Junior Frontend Developer',
    bio: 'Computer Science sophomore at UNN building lightweight, responsive web apps. Focused on optimizing bundle sizes and page performance for low-bandwidth networks.',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200',
    whatsappNum: '+2348012345678',
    skills: ['React', 'TypeScript', 'TailwindCSS', 'Vite', 'HTML5', 'CSS3'],
    isVerified: true,
    createdAt: '2026-05-10T10:00:00Z',
    peerVouched: '8 Vouched',
    projects: [
      {
        id: 'project-campus-rideshare',
        profileId: 'talent-chidi',
        title: 'Campus RideShare Dashboard',
        rawInput: 'Built a React + Vite app for students to coordinate carpools. Styled with Tailwind CSS. Uses local storage to cache ride listings offline.',
        verifiedSkills: ['React', 'TypeScript', 'TailwindCSS', 'Vite'],
        githubUrl: 'https://github.com/chidi-chikwe/campus-rideshare',
        isAudited: true,
        createdAt: '2026-05-12T14:30:00Z',
        aiSummary: `### Project Overview
A lightweight, mobile-first web dashboard designed for university students to coordinate ride-sharing and fuel splits on campus. Optimized for low-end mobile viewports and spotty campus networks.

### Technology & Architecture
* **Vite + React**: Chosen for lightning-fast build speeds, hot module replacement, and ultra-lightweight client bundles.
* **Local Storage Caching**: Keeps the user's active ride history available offline to survive campus Wi-Fi dropouts.

### Role & Individual Impact
* Engineered the responsive grid layouts and search filter controls.
* Handled local state management, decreasing redundant server data requests by 45%.

### Business & Technical Outcome
* Enabled students to find ride matches within 2 minutes of listing.
* Maintained a bundle size under 45KB (gzipped), ensuring rapid page loads even on 2G connections.
* Winner of the sophomore student project showcase.`
      }
    ]
  },
  {
    id: 'talent-naledi',
    userId: 'user-naledi',
    fullName: 'Naledi Dube',
    country: 'South Africa',
    techFocus: 'Junior UI/UX Designer',
    bio: 'Information Systems student at UCT. Passionate about accessible mobile interfaces, high-contrast usability, and icon-driven layouts for informal retail merchants.',
    avatarUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200',
    whatsappNum: '+27821122334',
    skills: ['Figma', 'UI/UX Design', 'User Research', 'Wireframing', 'Prototyping'],
    isVerified: true,
    createdAt: '2026-05-15T11:00:00Z',
    peerVouched: '14 Vouched',
    projects: [
      {
        id: 'project-momo-merchant',
        profileId: 'talent-naledi',
        title: 'MoMo Merchant App Design',
        rawInput: 'Designed mobile app in Figma for micro-retailers to track mobile money transfers. Designed large touch targets for outdoor glare accessibility.',
        verifiedSkills: ['Figma', 'UI/UX Design', 'User Research'],
        figmaUrl: 'https://figma.com/file/momo-merchant-design',
        isAudited: true,
        createdAt: '2026-05-18T16:45:00Z',
        aiSummary: `### Project Overview
A clean, high-contrast mobile app prototype designed for small informal merchants to track mobile money cashouts and stock levels at their kiosks.

### Design & UX Decisions
* **High-Contrast Palette**: Optimized for readability on low-cost LCD screens under bright outdoor sunlight.
* **Frictionless Tap Targets**: Custom buttons designed at a minimum of 56px to ensure easy selection on the move.
* **Icon-Driven Navigation**: Minimizes language barriers for non-tech-savvy shop owners.

### Role & Individual Impact
* Conducted user research interviews with 5 local shop owners in Cape Town to identify layout blockers.
* Designed the complete high-fidelity mobile prototype, custom icons, and wireframe flows in Figma.

### Business & Technical Outcome
* Reduced merchant transaction input errors by 60% during user testing.
* Handed off clean, pixel-perfect styled layouts directly to front-end developers, speeding up the styling phase by two weeks.`
      }
    ]
  },
  {
    id: 'talent-kofi',
    userId: 'user-kofi',
    fullName: 'Kofi Boateng',
    country: 'Ghana',
    techFocus: 'Junior Backend Developer',
    bio: 'Self-taught backend builder and junior systems engineer. Focused on writing clean, self-contained Express APIs and lightweight database layers for local commerce.',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
    whatsappNum: '+233241122334',
    skills: ['Node.js', 'Express', 'SQLite', 'Git', 'REST APIs', 'SQL'],
    isVerified: true,
    createdAt: '2026-05-20T09:15:00Z',
    peerVouched: '9 Vouched',
    projects: [
      {
        id: 'project-campus-market',
        profileId: 'talent-kofi',
        title: 'Campus Marketplace API',
        rawInput: 'Created a REST API in Node and Express for a student marketplace. Used SQLite for a self-contained database. Integrated user input validation.',
        verifiedSkills: ['Node.js', 'Express', 'SQLite', 'API Design'],
        githubUrl: 'https://github.com/kofi-boateng/campus-market-api',
        isAudited: true,
        createdAt: '2026-05-22T10:00:00Z',
        aiSummary: `### Project Overview
A lightweight, self-contained REST API powering a student-to-student marketplace for buying and selling textbooks, electronics, and dorm items.

### Technology & Architecture
* **Node.js & Express**: Provides a fast, minimal backend server with minimal memory footprint.
* **SQLite**: A self-contained, serverless database requiring zero-configuration, ideal for lightweight, low-cost hosting.
* **Joi Validation**: Strictly validates request body formats to prevent database injection or malformed data records.

### Role & Individual Impact
* Designed the database schema and implemented item CRUD endpoints.
* Wrote custom input validation middleware to block malformed requests, securing user submissions.

### Business & Technical Outcome
* Successfully simulated 100 concurrent requests with an average response time of under 40ms.
* Zero-configuration setup enabled instant local deployment for frontend developers to pair program.`
      }
    ]
  },
  {
    id: 'talent-fatou',
    userId: 'user-fatou',
    fullName: 'Fatoumata Bah',
    country: 'Senegal',
    techFocus: 'Junior Full-Stack Developer',
    bio: 'Recent software engineering bootcamp graduate. Enjoys building interactive web portals, structured NoSQL schemas, and clean user-matching logic.',
    avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200',
    whatsappNum: '+221771234567',
    skills: ['React', 'JavaScript', 'MongoDB', 'CSS3', 'Node.js', 'Express'],
    isVerified: false,
    createdAt: '2026-06-01T08:00:00Z',
    peerVouched: '11 Vouched',
    projects: [
      {
        id: 'project-study-buddy',
        profileId: 'talent-fatou',
        title: 'Study Buddy Matcher',
        rawInput: 'Fullstack React app with MongoDB database. Helps students match with study partners. Features dynamic filters for courses and lang preferences.',
        verifiedSkills: ['React', 'JavaScript', 'MongoDB', 'CSS'],
        githubUrl: 'https://github.com/fatou-bah/study-buddy',
        isAudited: false,
        createdAt: '2026-06-05T12:00:00Z',
        aiSummary: `### Project Overview
A full-stack web application that helps students form peer study groups based on course codes, availability, and language preferences.

### Technology & Architecture
* **React Frontend**: Offers a dynamic, single-page interface for finding and matching peers.
* **MongoDB**: A flexible NoSQL database to store dynamic user profiles and group preferences.
* **Express REST Endpoints**: Connects the frontend to the database for instant matching queries.

### Role & Individual Impact
* Built the interactive group matching card deck and search filters.
* Structured the MongoDB collections and handled API integration for matching queries.

### Business & Technical Outcome
* Achieved 94% matching accuracy on peer matching tests.
* Allowed students to create study groups in under 30 seconds.`
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
    description: 'We need an eager junior developer to craft a simple React front-end dashboard screen for local shopkeepers. The layout must handle ledger inputs and show simple responsive tables.',
    requiredSkills: ['React', 'TypeScript', 'TailwindCSS'],
    budgetGHS: 2500,
    createdAt: '2026-06-10T09:00:00Z'
  },
  {
    id: 'gig-route-optimizer',
    recruiterId: 'recruiter-choplife',
    companyName: 'ChopLife Logistics',
    logoUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=100',
    title: 'Python Address Parsing Script',
    description: 'Looking for a clean Python script to parse address strings (unstructured text) and check for keywords. Perfect micro-task for a CS student learning regex.',
    requiredSkills: ['Python', 'Git'],
    budgetGHS: 1500,
    createdAt: '2026-06-12T11:20:00Z'
  },
  {
    id: 'gig-onboarding-design',
    recruiterId: 'recruiter-bodasafe',
    companyName: 'Boda Safe',
    logoUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=100',
    title: 'Mobile Onboarding App Redesign',
    description: 'Redesign our driver registration screen in Figma. Focus on high contrast, readability in direct daylight, and extremely simple fields for riders.',
    requiredSkills: ['Figma', 'UI/UX Design', 'User Research'],
    budgetGHS: 3000,
    createdAt: '2026-06-14T15:00:00Z'
  }
];

export const mockApplications: Application[] = [
  {
    id: 'app-1',
    gigId: 'gig-react-merchant',
    profileId: 'talent-chidi',
    status: 'PENDING',
    createdAt: '2026-06-12T10:00:00Z'
  },
  {
    id: 'app-2',
    gigId: 'gig-onboarding-design',
    profileId: 'talent-naledi',
    status: 'SHORTLISTED',
    createdAt: '2026-06-14T17:30:00Z'
  }
];
