'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';

export default function WhatsAppSandbox() {
  const {
    profiles,
    activeProfileId,
    setActiveProfileId,
    whatsappMessages,
    sendWhatsAppMessage,
    mounted
  } = useApp();

  const [inputText, setInputText] = useState('');
  const chatAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to the bottom on new messages
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [whatsappMessages]);

  if (!mounted) return null;

  const currentProfile = profiles.find(p => p.id === activeProfileId) || profiles[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sendWhatsAppMessage(inputText.trim());
    setInputText('');
  };

  const triggerQuickMessage = (text: string) => {
    sendWhatsAppMessage(text);
  };

  const [isInterested, setIsInterested] = useState(false);

  return (
    <div className="wa-container">
      {/* Left Column: Explanatory and Trigger Controls */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
        <div className="card">
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 'var(--spacing-sm)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            Try BorderLine on WhatsApp
          </h2>
          <p style={{ fontSize: '0.95rem', marginBottom: 'var(--spacing-md)', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
            No heavy data or expensive laptops needed. Update your profile, discover gig matches, and apply for work directly over WhatsApp—even on low 2G connection speeds.
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '12px', borderLeft: '4px solid var(--color-accent-secondary)', backgroundColor: 'var(--color-surface-elevated)', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', fontSize: '0.85rem', marginBottom: 'var(--spacing-md)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-secondary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '2px', flexShrink: 0 }}><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .5 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
            <span><strong>Live Sync Demo:</strong> Try sending a test command on the phone mockup to the right. Watch how our AI extracts your skills and syncs your portfolio in real time!</span>
          </div>

          <div style={{ marginTop: 'var(--spacing-md)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--spacing-md)' }}>
            <h4 className="switcher-title" style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>Test As A Builder:</h4>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {profiles.map(p => (
                <button
                  key={p.id}
                  id={`btn-switch-phone-${p.id}`}
                  onClick={() => setActiveProfileId(p.id)}
                  className={`btn ${p.id === activeProfileId ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                >
                  {p.fullName.split(' ')[0]}&apos;s Phone
                </button>
              ))}
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', marginTop: '8px' }}>
              Currently texting as: <strong>{currentProfile.fullName}</strong> ({currentProfile.whatsappNum})
            </p>
          </div>
        </div>

        {/* Quick Commands Trigger Grid */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', marginBottom: 'var(--spacing-md)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            Quick Command Actions
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-md)' }}>
            Tap any command below to automatically send it from the active phone:
          </p>

          <div className="quick-trigger-grid">
            <button id="btn-quick-help" onClick={() => triggerQuickMessage('help')} className="trigger-card">
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                help
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>Show menu & available commands</div>
            </button>

            <button id="btn-quick-profile" onClick={() => triggerQuickMessage('profile')} className="trigger-card">
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                profile
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>Check my verified skills & status</div>
            </button>

            <button id="btn-quick-matches" onClick={() => triggerQuickMessage('matches')} className="trigger-card">
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                matches
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>Find micro-gigs matching my skills</div>
            </button>

            <button 
              id="btn-quick-add-project"
              onClick={() => triggerQuickMessage('add Wallet App | Built secure storage logic in Python. Integrates with Paystack API. Optimized DB reads.')} 
              className="trigger-card"
            >
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-accent-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                add Wallet App...
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                Send project notes (AI turns this into a case study live!)
              </div>
            </button>

            <button id="btn-quick-apply" onClick={() => triggerQuickMessage('apply gig-react-merchant')} className="trigger-card">
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                apply gig-react-merchant
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>Apply to a gig instantly with 1 tap</div>
            </button>
          </div>
        </div>

        {/* Interested Call to Action & WhatsApp Channel Access */}
        <div className="card" style={{ border: '1px solid var(--color-accent-subtle)', background: 'linear-gradient(180deg, var(--color-surface) 0%, var(--color-surface-elevated) 100%)' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '6px', color: 'var(--color-text-primary)' }}>
            Want WhatsApp Access When We Launch?
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-md)' }}>
            We&apos;re bringing WhatsApp-native applications to developers across the continent. Be the first to get early access.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              id="btn-whatsapp-interest"
              onClick={() => setIsInterested(true)}
              disabled={isInterested}
              className={`btn ${isInterested ? 'btn-secondary' : 'btn-primary'}`}
              style={{
                width: '100%',
                padding: '12px 20px',
                fontSize: '0.9rem',
                fontWeight: 700,
                justifyContent: 'center',
                backgroundColor: isInterested ? 'rgba(52, 211, 153, 0.15)' : undefined,
                color: isInterested ? 'var(--color-accent)' : undefined,
                border: isInterested ? '1px solid var(--color-accent)' : undefined,
                cursor: isInterested ? 'default' : 'pointer'
              }}
            >
              {isInterested ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}><polyline points="20 6 9 17 4 12"/></svg>
                  Got it
                </>
              ) : (
                "I'm interested"
              )}
            </button>

            {isInterested && (
              <div style={{
                fontSize: '0.82rem',
                color: 'var(--color-accent)',
                backgroundColor: 'var(--color-accent-subtle)',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 600,
                textAlign: 'center',
                animation: 'fadeIn 0.3s ease-in'
              }}>
                We will notify you when our WhatsApp bot is available for use.
              </div>
            )}

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '12px', marginTop: '4px', textAlign: 'center' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '10px' }}>
                In the meantime, join our active African tech builder community on WhatsApp:
              </p>
              <a
                href="https://whatsapp.com/channel/0029VbCwPzuCsU9RKGneCW3v"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '10px 18px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: '#25D366',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(37, 211, 102, 0.25)',
                  transition: 'all 0.2s ease'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Join our WhatsApp Channel
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Right Column: Visual WhatsApp Phone Mockup */}
      <section className="wa-phone-mockup-wrapper" style={{ position: 'sticky', top: '90px' }}>
        <div className="wa-phone-mockup">
          {/* Header */}
          <div className="wa-header">
            <div className="wa-avatar">BL</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>BorderLine Assistant</div>
              <div className="wa-status-text">online • AI Verified Core</div>
            </div>
          </div>

          {/* Chat Messages Log */}
          <div className="wa-chat-area" ref={chatAreaRef}>
            {whatsappMessages.map((msg) => (
              <div
                key={msg.id}
                className={`wa-bubble ${msg.sender === 'user' ? 'wa-bubble-user' : 'wa-bubble-bot'}`}
              >
                <div>{msg.body}</div>
                <span className="wa-bubble-time">{msg.timestamp}</span>
              </div>
            ))}
          </div>

          {/* Input Row */}
          <form onSubmit={handleSend} className="wa-input-row">
            <input
              type="text"
              id="wa-chat-input"
              className="wa-input"
              placeholder="Type a message or help..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button type="submit" className="wa-send-btn" id="btn-wa-send">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z" fill="white"/>
              </svg>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
