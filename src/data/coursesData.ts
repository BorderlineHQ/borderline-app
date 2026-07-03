import { Course } from '../types';

export const mockCourses: Course[] = [
  {
    id: 'course-react-fundamentals',
    title: 'Modern React & TypeScript for African Builders',
    category: 'Tech',
    level: 'Beginner',
    duration: '6 weeks',
    instructor: 'Kwesi Mensah, Senior Frontend Engineer',
    description: 'Build interactive dashboards, integrate Mobile Money APIs, and ship React apps from Accra to the world. Designed for developers with basic JavaScript who want to go production-ready.',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
    skillsAcquired: ['React 19', 'TypeScript', 'Next.js', 'REST APIs', 'Mobile-First CSS'],
    modules: [
      {
        id: 'react-m1',
        title: 'Component Architecture & JSX',
        duration: '2 hours',
        description: 'Break UIs into reusable components, understand props vs state, and learn JSX patterns that scale.',
        lessons: [
          'Your first React component from scratch',
          'Props, children, and composition patterns',
          'Conditional rendering and list mapping',
          'Structuring a project like a senior developer'
        ]
      },
      {
        id: 'react-m2',
        title: 'State, Effects & Data Fetching',
        duration: '2.5 hours',
        description: 'Master useState, useEffect, and custom hooks. Fetch real data from APIs and handle loading, error, and empty states.',
        lessons: [
          'useState for interactive UI elements',
          'useEffect for side effects and API calls',
          'Building custom hooks (useDebounce, useFetch)',
          'Error boundaries and graceful failure patterns'
        ]
      },
      {
        id: 'react-m3',
        title: 'Mobile Money Integration Project',
        duration: '3 hours',
        description: 'Final capstone: build a merchant dashboard with MTN MoMo test sandbox integration, M-Pesa callbacks, and real-time transaction feeds.',
        lessons: [
          'Setting up Africa\'s Talking sandbox',
          'Building the payment request flow',
          'Real-time transaction feed with WebSockets',
          'Deploying to Vercel with environment variables'
        ]
      }
    ]
  },
  {
    id: 'course-figma-ui',
    title: 'UI Design Systems with Figma',
    category: 'Creativity',
    level: 'Beginner',
    duration: '4 weeks',
    instructor: 'Naledi Dube, UI Designer & Researcher',
    description: 'Design consistent, accessible interfaces using Figma. Build a reusable component library, master auto-layout, and learn the design-to-code handoff process.',
    thumbnail: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?auto=format&fit=crop&q=80&w=800',
    skillsAcquired: ['Figma', 'Design Systems', 'Auto Layout', 'Prototyping', 'Design Tokens'],
    modules: [
      {
        id: 'figma-m1',
        title: 'Figma Foundations & Auto Layout',
        duration: '2 hours',
        description: 'Navigate Figma like a pro. Master frames, auto-layout, constraints, and responsive resizing.',
        lessons: [
          'Frames vs groups: when to use each',
          'Auto-layout for responsive components',
          'Constraints and resizing behavior',
          'Organizing layers and pages at scale'
        ]
      },
      {
        id: 'figma-m2',
        title: 'Building a Component Library',
        duration: '2.5 hours',
        description: 'Create variants, use boolean properties, and build a production-ready component library from buttons to data tables.',
        lessons: [
          'Creating multi-variant components',
          'Boolean and instance swap properties',
          'Building cards, modals, and navigation bars',
          'Publishing and versioning your library'
        ]
      }
    ]
  },
  {
    id: 'course-freelance-business',
    title: 'Freelance Business Foundations for Africa',
    category: 'Business',
    level: 'Beginner',
    duration: '3 weeks',
    instructor: 'Amina Osei, Business Strategist',
    description: 'Turn your skills into income. Learn to price projects, write proposals, manage clients, and navigate cross-border payments — all tailored for African freelancers.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    skillsAcquired: ['Pricing Strategy', 'Client Management', 'Proposals', 'Invoicing', 'Cross-Border Payments'],
    modules: [
      {
        id: 'biz-m1',
        title: 'Pricing & Proposals',
        duration: '1.5 hours',
        description: 'How to price against inflation, write proposals that win, and negotiate without underselling yourself.',
        lessons: [
          'Hourly vs project-based pricing in Africa',
          'Writing proposals that convert (with templates)',
          'Pricing local services against inflation rates',
          'Launching WhatsApp-native MVP pilots'
        ]
      }
    ]
  },
  {
    id: 'course-python-backend',
    title: 'Python Backend APIs with FastAPI & PostgreSQL',
    category: 'Tech',
    level: 'Intermediate',
    duration: '7 weeks',
    instructor: 'Kwame Asante, Backend Lead',
    description: 'Design and deploy production-grade REST APIs using FastAPI, write efficient SQL with PostgreSQL, containerize with Docker, and deploy to Railway or Render — for free.',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
    skillsAcquired: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'REST APIs'],
    modules: [
      {
        id: 'py-m1',
        title: 'FastAPI Project Scaffolding',
        duration: '1.5 hours',
        description: 'Set up a FastAPI project with virtual environments, auto-generated Swagger docs, and structured folder layouts.',
        lessons: [
          'Installing Python 3.11+ and creating venvs',
          'Your first FastAPI endpoint with type hints',
          'Auto-generated Swagger docs and testing with /docs',
          'Project structure: routers, services, and schemas'
        ]
      },
      {
        id: 'py-m2',
        title: 'PostgreSQL & SQLAlchemy ORM',
        duration: '2.5 hours',
        description: 'Model relational data, write efficient queries, handle migrations with Alembic, and avoid N+1 pitfalls.',
        lessons: [
          'Setting up PostgreSQL locally and on Supabase',
          'Defining models with SQLAlchemy 2.0 syntax',
          'Database migrations with Alembic',
          'Async queries and connection pooling'
        ]
      },
      {
        id: 'py-m3',
        title: 'Authentication & Deployment',
        duration: '2 hours',
        description: 'Implement JWT auth, rate limiting, and deploy containerized apps to Railway with CI/CD.',
        lessons: [
          'JWT token authentication flow',
          'Role-based access control middleware',
          'Dockerizing your FastAPI app',
          'Deploying to Railway with GitHub Actions'
        ]
      }
    ]
  },
  {
    id: 'course-content-creation',
    title: 'Digital Content & Personal Branding for Builders',
    category: 'Creativity',
    level: 'Beginner',
    duration: '4 weeks',
    instructor: 'Fatima Hassan, Content Strategist',
    description: 'Build a personal brand that attracts clients. Write technical blog posts, create dev threads on X/Twitter, shoot short-form video content, and grow an audience that converts into paid work.',
    thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800',
    skillsAcquired: ['Content Writing', 'Personal Branding', 'Social Media', 'Video Production'],
    modules: [
      {
        id: 'cc-m1',
        title: 'Writing Technical Content That Gets Read',
        duration: '1.5 hours',
        description: 'Structure blog posts, write compelling intros, use code snippets effectively, and publish on Dev.to / Hashnode.',
        lessons: [
          'The anatomy of a viral technical blog post',
          'Writing clear code walkthroughs with context',
          'SEO basics for developer blogs',
          'Publishing and cross-posting strategies'
        ]
      },
      {
        id: 'cc-m2',
        title: 'Short-Form Video for Developers',
        duration: '2 hours',
        description: 'Create engaging TikTok/Reels content showing your build process. Equipment, editing, and hooks.',
        lessons: [
          'Recording screen captures with commentary',
          'Mobile editing with CapCut: cuts, captions, music',
          'Hook frameworks that stop the scroll',
          'Converting views into portfolio visits and DMs'
        ]
      }
    ]
  },
  {
    id: 'course-sound-engineering',
    title: 'Sound Engineering & Audio Production',
    category: 'Creativity',
    level: 'Intermediate',
    duration: '5 weeks',
    instructor: 'Titos Valerius, Audio Producer & Sound Designer',
    description: 'Learn acoustics, mixing, mastering, and spatial audio production. Build soundscapes for podcasts, video games, and film using modern digital audio workstations.',
    thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800',
    skillsAcquired: ['DAW Essentials', 'Audio Mixing', 'Mastering', 'Sound Effects', 'Acoustic Design'],
    modules: [
      {
        id: 'sound-m1',
        title: 'DAW Fundamentals & Audio Recording',
        duration: '2 hours',
        description: 'Understand signal flow, microphone types, acoustic treatment, and multitrack recording basics.',
        lessons: [
          'Setting up your workspace and choosing a DAW',
          'Understanding microphone polar patterns and selection',
          'Acoustic treatment vs soundproofing on a budget',
          'Gain staging and recording clean raw audio'
        ]
      },
      {
        id: 'sound-m2',
        title: 'Mixing & Mastering Projects',
        duration: '3 hours',
        description: 'Apply EQ, compression, spatial effects, and final limiting to polish tracks for release.',
        lessons: [
          'Subtractive and additive EQ techniques',
          'Dynamic control with compression and gating',
          'Creating depth with reverb and delay',
          'Limiting and loudness normalization for streaming'
        ]
      }
    ]
  },
  {
    id: 'course-ai-builders',
    title: 'Prompt Engineering & AI Integrations',
    category: 'Tech',
    level: 'Beginner',
    duration: '4 weeks',
    instructor: 'Luse Fofana, AI Systems Specialist',
    description: 'Unlock the power of LLMs. Learn to write advanced prompts, build custom agents, and integrate OpenAI, Anthropic, and Google Gemini APIs into your web apps.',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=800',
    skillsAcquired: ['Prompt Engineering', 'API Integrations', 'AI Agents', 'Vector Databases', 'LangChain'],
    modules: [
      {
        id: 'ai-m1',
        title: 'Advanced Prompting Techniques',
        duration: '1.5 hours',
        description: 'Master few-shot prompting, chain-of-thought reasoning, and system prompts to get deterministic responses.',
        lessons: [
          'System prompts and role-playing architectures',
          'Few-shot and zero-shot output steering',
          'Structuring outputs into valid JSON formats',
          'Mitigating model hallucination and bias'
        ]
      },
      {
        id: 'ai-m2',
        title: 'Building AI Powered Web Apps',
        duration: '3 hours',
        description: 'Call API endpoints dynamically, manage system message histories, and implement RAG schemas.',
        lessons: [
          'Setting up SDK clients for LLM APIs',
          'Managing chat context window and history state',
          'Vector embeddings and similarity semantic searches',
          'Deploying a functional AI chatbot dashboard'
        ]
      }
    ]
  },
  {
    id: 'course-data-analytics',
    title: 'Data Analytics & Insights with Python',
    category: 'Tech',
    level: 'Intermediate',
    duration: '6 weeks',
    instructor: 'Braima Sissoko, Analytics Consultant',
    description: 'Transform raw datasets into interactive dashboards and business stories. Learn Pandas, NumPy, SQL, and data visualization using Seaborn and Streamlit.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    skillsAcquired: ['Python Data Stack', 'Pandas & NumPy', 'SQL Analytics', 'Data Viz', 'Streamlit'],
    modules: [
      {
        id: 'data-m1',
        title: 'Data Cleaning & Wrangling',
        duration: '2 hours',
        description: 'Ingest CSVs, spreadsheets, and database feeds. Identify missing values, normalize formats, and merge datasets.',
        lessons: [
          'Importing data and basic Pandas DataFrames',
          'Handling null values and type casting',
          'Filtering, grouping, and aggregating records',
          'Joining datasets and database connection structures'
        ]
      },
      {
        id: 'data-m2',
        title: 'Visualizing Data Insights',
        duration: '2.5 hours',
        description: 'Build charts that communicate patterns clearly. Deploy interactive dashboards with Streamlit.',
        lessons: [
          'Choosing the right chart for your data type',
          'Customizing charts with Matplotlib & Seaborn',
          'Creating responsive web widgets in Streamlit',
          'Publishing dashboards to Streamlit Community Cloud'
        ]
      }
    ]
  },
  {
    id: 'course-growth-marketing',
    title: 'Growth Marketing for Startups',
    category: 'Business',
    level: 'Intermediate',
    duration: '4 weeks',
    instructor: 'Amina Osei, Business Strategist',
    description: 'Acquire users without breaking the bank. Master SEO, paid campaigns, funnel optimization, and data-driven loops to scale digital products.',
    thumbnail: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&q=80&w=800',
    skillsAcquired: ['Growth Loops', 'SEO Strategy', 'Funnel Optimization', 'Ad Management', 'Conversion Rate'],
    modules: [
      {
        id: 'growth-m1',
        title: 'Funnel Analysis & SEO foundations',
        duration: '2 hours',
        description: 'Map out your acquisition funnel, calculate churn rates, and optimize your site for Google search rankings.',
        lessons: [
          'The AARRR pirate funnel metric system',
          'Setting up event tracking and attribution pipelines',
          'On-page and off-page SEO optimization tactics',
          'Keyword intent research and mapping'
        ]
      }
    ]
  }
];

export const catEmoji: Record<string, string> = { Tech: '💻', Creativity: '🎨', Business: '📊' };

export const catColors: Record<string, { bg: string; text: string }> = {
  Tech: { bg: 'rgba(59,130,246,0.1)', text: '#3b82f6' },
  Creativity: { bg: 'rgba(168,85,247,0.1)', text: '#a855f7' },
  Business: { bg: 'rgba(245,158,11,0.1)', text: '#f59e0b' },
};
