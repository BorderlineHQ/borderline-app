'use client';

import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';

interface Module {
  id: string;
  title: string;
  duration: string;
  description: string;
  lessons: string[];
}

interface Course {
  id: string;
  title: string;
  category: 'Tech' | 'Creativity' | 'Business';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  instructor: string;
  description: string;
  skillsAcquired: string[];
  modules: Module[];
}

const mockCourses: Course[] = [
  {
    id: 'course-react-fundamentals',
    title: 'Modern React & TypeScript for African Builders',
    category: 'Tech',
    level: 'Beginner',
    duration: '6 weeks',
    instructor: 'Kwesi Mensah, Senior Frontend Engineer',
    description: 'Build interactive dashboards, integrate Mobile Money APIs, and ship React apps from Accra to the world. Designed for developers with basic JavaScript who want to go production-ready.',
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
  }
];

const catEmoji: Record<string, string> = { Tech: '💻', Creativity: '🎨', Business: '📊' };
const catColors: Record<string, { bg: string; text: string }> = {
  Tech: { bg: 'rgba(59,130,246,0.1)', text: '#3b82f6' },
  Creativity: { bg: 'rgba(168,85,247,0.1)', text: '#a855f7' },
  Business: { bg: 'rgba(245,158,11,0.1)', text: '#f59e0b' },
};

export default function UpskillPage() {
  const { theme } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Tech' | 'Creativity' | 'Business'>('All');
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);

  const filteredCourses = mockCourses.filter(
    (c) => selectedCategory === 'All' || c.category === selectedCategory
  );

  const toggleCourse = (id: string) => {
    setExpandedCourseId(expandedCourseId === id ? null : id);
    setExpandedModuleId(null);
  };

  const toggleModule = (id: string) => {
    setExpandedModuleId(expandedModuleId === id ? null : id);
  };

  const totalLessons = (course: Course) =>
    course.modules.reduce((sum, m) => sum + m.lessons.length, 0);

  return (
    <div style={{
      minHeight: '90vh',
      padding: 'var(--spacing-xxl) var(--spacing-md) var(--spacing-xxxl) var(--spacing-md)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background */}
      <div style={{
        position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)',
        width: '80%', height: '50%',
        background: 'radial-gradient(ellipse at 50% 0%, var(--color-accent-subtle) 0%, transparent 70%)',
        zIndex: 0, pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '880px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
          <span style={{ color: 'var(--color-accent)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            UPSKILL & GROW
          </span>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: 800, lineHeight: 1.1,
            letterSpacing: '-0.03em', marginTop: '8px', marginBottom: 'var(--spacing-md)',
            color: 'var(--color-text-primary)'
          }}>
            Grow Your Digital Craft
          </h1>
          <p style={{
            fontSize: '1rem', color: 'var(--color-text-secondary)', lineHeight: 1.6,
            maxWidth: '560px', margin: '0 auto'
          }}>
            Peer-designed programs built for African builders. Master production skills, earn verified credentials, and bypass the resume wall.
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: 'var(--spacing-xl)' }}>
          {(['All', 'Tech', 'Creativity', 'Business'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                borderRadius: '20px', padding: '7px 18px', fontSize: '0.82rem', fontWeight: 600,
                backgroundColor: selectedCategory === cat ? 'var(--color-accent)' : 'transparent',
                color: selectedCategory === cat ? '#000' : 'var(--color-text-secondary)',
                border: selectedCategory === cat ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              {cat === 'All' ? '🔥 All Skills' : `${catEmoji[cat]} ${cat}`}
            </button>
          ))}
        </div>

        {/* Course Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredCourses.map((course) => {
            const isExpanded = expandedCourseId === course.id;
            const lessons = totalLessons(course);
            const cc = catColors[course.category];

            return (
              <div
                key={course.id}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: isExpanded ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  transition: 'all 0.2s',
                  boxShadow: isExpanded ? '0 4px 24px var(--color-accent-subtle)' : 'none',
                }}
              >
                {/* Course Header — Clickable */}
                <div
                  onClick={() => toggleCourse(course.id)}
                  style={{ padding: '22px 24px', cursor: 'pointer' }}
                >
                  {/* Top Row: pills */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: '0.62rem', fontWeight: 700, padding: '3px 10px', borderRadius: '10px',
                      backgroundColor: cc.bg, color: cc.text, textTransform: 'uppercase', letterSpacing: '0.04em',
                    }}>
                      {catEmoji[course.category]} {course.category}
                    </span>
                    <span style={{
                      fontSize: '0.62rem', fontWeight: 600, padding: '3px 10px', borderRadius: '10px',
                      backgroundColor: 'var(--color-surface-elevated)', border: '1px solid var(--color-border)',
                      color: 'var(--color-text-secondary)',
                    }}>
                      {course.level}
                    </span>
                    <span style={{
                      fontSize: '0.62rem', fontWeight: 700, padding: '3px 10px', borderRadius: '10px',
                      backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b',
                      textTransform: 'uppercase', letterSpacing: '0.03em',
                    }}>
                      ⏳ Coming Soon
                    </span>
                  </div>

                  {/* Title + Description */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-text-primary)',
                        lineHeight: 1.25, marginBottom: '8px',
                      }}>
                        {course.title}
                      </h3>
                      <p style={{
                        fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: 1.55, margin: 0,
                      }}>
                        {course.description}
                      </p>
                    </div>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                      style={{
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s',
                        color: 'var(--color-text-tertiary)', flexShrink: 0, marginTop: '4px',
                      }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>

                  {/* Meta Row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '14px', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.72rem', color: 'var(--color-text-tertiary)' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                      {course.duration}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.72rem', color: 'var(--color-text-tertiary)' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
                      {course.modules.length} modules · {lessons} lessons
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.72rem', color: 'var(--color-text-tertiary)' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                      {course.instructor}
                    </span>
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div style={{ borderTop: '1px solid var(--color-border)' }}>
                    {/* Skills */}
                    <div style={{
                      padding: '16px 24px', display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center',
                      borderBottom: '1px solid var(--color-border)',
                    }}>
                      <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--color-text-tertiary)', marginRight: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Skills:
                      </span>
                      {course.skillsAcquired.map(skill => (
                        <span key={skill} style={{
                          fontSize: '0.68rem', fontWeight: 600, padding: '4px 10px', borderRadius: '12px',
                          backgroundColor: 'var(--color-accent-subtle)', color: 'var(--color-accent)',
                        }}>
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Modules */}
                    <div style={{ padding: '16px 24px 24px' }}>
                      <h4 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-primary)', marginBottom: '12px' }}>
                        Curriculum
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {course.modules.map((mod, modIdx) => {
                          const isModOpen = expandedModuleId === mod.id;
                          return (
                            <div key={mod.id} style={{
                              backgroundColor: 'var(--color-surface-elevated)',
                              border: isModOpen ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
                              borderRadius: '10px', overflow: 'hidden', transition: 'border-color 0.15s',
                            }}>
                              <div
                                onClick={() => toggleModule(mod.id)}
                                style={{ padding: '14px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}
                              >
                                {/* Module number */}
                                <div style={{
                                  width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                                  backgroundColor: isModOpen ? 'var(--color-accent)' : 'var(--color-surface)',
                                  border: isModOpen ? 'none' : '1px solid var(--color-border)',
                                  color: isModOpen ? '#000' : 'var(--color-text-secondary)',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  fontSize: '0.72rem', fontWeight: 800, transition: 'all 0.15s',
                                }}>
                                  {modIdx + 1}
                                </div>
                                <div style={{ flex: 1 }}>
                                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1.3 }}>
                                    {mod.title}
                                  </div>
                                  <div style={{ fontSize: '0.7rem', color: 'var(--color-text-tertiary)', marginTop: '2px' }}>
                                    {mod.duration} · {mod.lessons.length} lessons
                                  </div>
                                </div>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                                  style={{ transform: isModOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s', color: 'var(--color-text-tertiary)', flexShrink: 0 }}
                                >
                                  <polyline points="6 9 12 15 18 9" />
                                </svg>
                              </div>

                              {isModOpen && (
                                <div style={{ borderTop: '1px solid var(--color-border)', padding: '6px 16px 14px' }}>
                                  <p style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: '10px 0 12px', padding: '0 6px' }}>
                                    {mod.description}
                                  </p>
                                  {mod.lessons.map((lesson, idx) => (
                                    <div key={idx} style={{
                                      display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 6px',
                                      borderRadius: '6px', transition: 'background 0.1s',
                                    }}
                                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-surface)'; }}
                                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                                    >
                                      <div style={{
                                        width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                                        border: '1.5px solid var(--color-border)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                      }}>
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-border)' }} />
                                      </div>
                                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', flex: 1 }}>{lesson}</span>
                                      <span style={{ fontSize: '0.6rem', fontWeight: 600, color: 'var(--color-text-tertiary)', flexShrink: 0 }}>
                                        Soon
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div style={{
          textAlign: 'center', marginTop: 'var(--spacing-xxl)', padding: 'var(--spacing-xl)',
          backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '14px',
        }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
            Want to teach a course?
          </h3>
          <p style={{
            fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '16px',
            maxWidth: '460px', margin: '0 auto 16px', lineHeight: 1.5,
          }}>
            We&apos;re looking for experienced African engineers, designers, and product builders to create peer-led programs. Earn from your expertise.
          </p>
          <a
            href="mailto:teach@borderline.africa"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 24px', borderRadius: '10px',
              backgroundColor: 'var(--color-accent)', color: '#000', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none',
            }}
          >
            Apply to Teach
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </a>
        </div>
      </div>
    </div>
  );
}
