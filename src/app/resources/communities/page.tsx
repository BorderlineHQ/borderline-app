'use client';

import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';

interface Circle {
  id: string;
  name: string;
  emoji: string;
  members: number;
  description: string;
  topics: string[];
  activity: 'Very Active' | 'Active' | 'New';
  type: 'whatsapp' | 'discord' | 'telegram';
}

const circles: Circle[] = [
  {
    id: 'circle-main',
    name: 'BorderLine Builders',
    emoji: '🌍',
    members: 2400,
    description: 'The main channel. Platform updates, gig drops, new feature previews, and community shout-outs. This is home base.',
    topics: ['Announcements', 'Gig Drops', 'Platform Updates'],
    activity: 'Very Active',
    type: 'whatsapp'
  },
  {
    id: 'circle-frontend',
    name: 'Frontend & Mobile Dev',
    emoji: '⚛️',
    members: 890,
    description: 'React, React Native, Flutter, and Vite builders. Share code snippets, debug layout issues, and review pull requests together.',
    topics: ['React', 'TypeScript', 'Mobile-First', 'CSS'],
    activity: 'Very Active',
    type: 'whatsapp'
  },
  {
    id: 'circle-backend',
    name: 'Backend & APIs',
    emoji: '🔧',
    members: 620,
    description: 'Node.js, Python/FastAPI, Django, and Express engineers. Discuss database design, REST conventions, and deployment pipelines.',
    topics: ['Node.js', 'Python', 'PostgreSQL', 'Docker'],
    activity: 'Active',
    type: 'whatsapp'
  },
  {
    id: 'circle-design',
    name: 'Design & UX Africa',
    emoji: '🎨',
    members: 540,
    description: 'Figma warriors, accessibility advocates, and user researchers. Share design systems, icon kits, and critique each other\'s work.',
    topics: ['Figma', 'UI/UX', 'Accessibility', 'User Research'],
    activity: 'Active',
    type: 'whatsapp'
  },
  {
    id: 'circle-fintech',
    name: 'FinTech & Mobile Money',
    emoji: '💸',
    members: 410,
    description: 'USSD developers, M-Pesa/MTN MoMo integrators, and payment escrow architects. The money circle.',
    topics: ['USSD', 'Mobile Money', 'Payment APIs', 'Escrow'],
    activity: 'Active',
    type: 'whatsapp'
  },
  {
    id: 'circle-career',
    name: 'Career & Freelance Tips',
    emoji: '🚀',
    members: 780,
    description: 'Negotiation tactics, portfolio reviews, pricing strategies, and how to land your first international client without a degree.',
    topics: ['Freelancing', 'Portfolios', 'Pricing', 'Remote Work'],
    activity: 'Very Active',
    type: 'whatsapp'
  },
];

const upcomingEvents = [
  {
    id: 'event-1',
    title: 'Weekly Code Review Session',
    date: 'Every Thursday · 7:00 PM WAT',
    description: 'Submit your PR link by Wednesday. The community votes on 3 repos to review live. Get real feedback from peers who\'ve shipped.',
    attendees: 45,
  },
  {
    id: 'event-2',
    title: 'Mobile Money Integration Workshop',
    date: 'July 12, 2026 · 3:00 PM EAT',
    description: 'Hands-on session: connect a React dashboard to MTN MoMo sandbox. Bring your laptop and Africa\'s Talking API key.',
    attendees: 120,
  },
  {
    id: 'event-3',
    title: 'Portfolio Roast Night',
    date: 'July 19, 2026 · 8:00 PM WAT',
    description: 'Drop your portfolio link. The community gives you honest, constructive feedback. Thick skin required. Growth guaranteed.',
    attendees: 85,
  },
];

const WHATSAPP_CHANNEL = 'https://whatsapp.com/channel/0029VbCwPzuCsU9RKGneCW3v';

export default function CommunitiesPage() {
  const { theme } = useApp();
  const [hoveredCircle, setHoveredCircle] = useState<string | null>(null);

  return (
    <div style={{
      minHeight: '90vh',
      padding: 'var(--spacing-xxl) var(--spacing-md) var(--spacing-xxxl) var(--spacing-md)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Radial Glow */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        height: '50%',
        background: 'radial-gradient(ellipse at 50% 0%, var(--color-accent-subtle) 0%, transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '960px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
          <span className="feature-tag" style={{ color: 'var(--color-accent)', fontWeight: 'bold', fontSize: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            COMMUNITIES
          </span>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 2.5rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginTop: '8px',
            marginBottom: 'var(--spacing-md)',
            color: 'var(--color-text-primary)'
          }}>
            Your Peer Circles Across the Continent
          </h1>
          <p style={{
            fontSize: '1.05rem',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.6,
            maxWidth: '620px',
            margin: '0 auto var(--spacing-lg) auto'
          }}>
            No gatekeepers. No tuition. Just builders helping builders. Join skill-specific circles, attend weekly sessions, and grow your network across 54 countries.
          </p>

          {/* Primary WhatsApp CTA */}
          <a
            href={WHATSAPP_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 28px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1rem',
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(37, 211, 102, 0.35)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 28px rgba(37, 211, 102, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(37, 211, 102, 0.35)';
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Join the WhatsApp Community
          </a>
        </div>

        {/* Live Stats Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '32px',
          flexWrap: 'wrap',
          padding: 'var(--spacing-md) 0',
          marginBottom: 'var(--spacing-xl)',
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-accent)' }}>5,640+</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Total Members</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-accent)' }}>6</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Active Circles</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-accent)' }}>23</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Countries Represented</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-accent)' }}>Weekly</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Live Sessions</div>
          </div>
        </div>

        {/* Circles Grid */}
        <div style={{ marginBottom: 'var(--spacing-xxl)' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '20px' }}>
            Skill Circles
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
            gap: '16px',
          }}>
            {circles.map((circle) => (
              <div
                key={circle.id}
                onMouseEnter={() => setHoveredCircle(circle.id)}
                onMouseLeave={() => setHoveredCircle(null)}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: hoveredCircle === circle.id ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--spacing-lg)',
                  transition: 'all 0.2s ease',
                  transform: hoveredCircle === circle.id ? 'translateY(-2px)' : 'none',
                  boxShadow: hoveredCircle === circle.id ? '0 4px 20px var(--color-accent-subtle)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                {/* Circle Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '1.5rem' }}>{circle.emoji}</span>
                    <div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{circle.name}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>{circle.members.toLocaleString()} members</div>
                    </div>
                  </div>
                  <span style={{
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '4px',
                    backgroundColor: circle.activity === 'Very Active' ? 'rgba(52, 211, 153, 0.15)' : circle.activity === 'New' ? 'rgba(59, 130, 246, 0.15)' : 'var(--color-accent-subtle)',
                    color: circle.activity === 'Very Active' ? 'var(--color-accent)' : circle.activity === 'New' ? '#3b82f6' : 'var(--color-accent)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}>
                    {circle.activity === 'Very Active' ? '🟢 ' : ''}{circle.activity}
                  </span>
                </div>

                {/* Description */}
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  {circle.description}
                </p>

                {/* Topics */}
                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                  {circle.topics.map((topic) => (
                    <span key={topic} style={{
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      padding: '2px 7px',
                      borderRadius: '4px',
                      backgroundColor: 'var(--color-surface-elevated)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text-primary)',
                    }}>
                      {topic}
                    </span>
                  ))}
                </div>

                {/* Join Button */}
                <a
                  href={WHATSAPP_CHANNEL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)',
                    backgroundColor: hoveredCircle === circle.id ? 'var(--color-accent-subtle)' : 'transparent',
                    color: 'var(--color-text-primary)',
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    textDecoration: 'none',
                    transition: 'all var(--transition-fast)',
                    marginTop: 'auto',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                  Join Circle
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div style={{ marginBottom: 'var(--spacing-xxl)' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '20px' }}>
            Upcoming Community Events
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--spacing-lg)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  transition: 'border-color var(--transition-fast)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-accent)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
              >
                <div style={{ flex: 1, minWidth: '260px' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--color-accent)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                    {event.date}
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 750, color: 'var(--color-text-primary)', marginBottom: '6px' }}>
                    {event.title}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.4, margin: 0 }}>
                    {event.description}
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)' }}>
                    {event.attendees} interested
                  </div>
                  <button
                    onClick={() => alert(`RSVP confirmed for "${event.title}"`)}
                    className="btn"
                    style={{
                      padding: '8px 18px',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      backgroundColor: 'var(--color-accent)',
                      color: '#000',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)',
                    }}
                  >
                    RSVP
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Guidelines */}
        <div style={{
          backgroundColor: 'var(--color-surface-elevated)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--spacing-xl)',
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '16px' }}>
            Community Code of Conduct
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {[
              { icon: '🤝', title: 'Be Kind & Constructive', desc: 'Critique code, not people. We grow by lifting each other.' },
              { icon: '🚫', title: 'No Spam or Self-Promo', desc: 'Share genuinely useful resources. No unsolicited DM pitches.' },
              { icon: '🌍', title: 'Respect All Backgrounds', desc: 'We span 54 countries and dozens of languages. Inclusivity is non-negotiable.' },
              { icon: '🔒', title: 'Protect Privacy', desc: 'Never share private conversations, screenshots, or personal data without consent.' },
            ].map((rule, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.2rem', flexShrink: 0, marginTop: '2px' }}>{rule.icon}</span>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '2px' }}>{rule.title}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', lineHeight: 1.3 }}>{rule.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
