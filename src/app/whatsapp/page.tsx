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

  return (
    <div className="wa-container">
      {/* Left Column: Explanatory and Trigger Controls */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
        <div className="card">
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 'var(--spacing-sm)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            Try our Whatsapp Bot
          </h2>
          <p style={{ fontSize: '0.95rem', marginBottom: 'var(--spacing-md)' }}>
            In Sub-Saharan Africa, mobile internet tariffs can be a barrier. <strong>BorderLine</strong> bypasses this by allowing junior developers to interact with the platform completely offline via WhatsApp commands.
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '12px', borderLeft: '4px solid var(--color-accent-secondary)', backgroundColor: 'var(--color-surface-elevated)', fontSize: '0.85rem', marginBottom: 'var(--spacing-md)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-secondary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '2px', flexShrink: 0 }}><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .5 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
            <span><strong>Reactive Sync Demo:</strong> Try sending the command to add a project, then head over to the <strong>Talent Portal</strong> or <strong>Recruiter Feed</strong>. You will see the AI-generated case study and new job matches synced instantly in real time!</span>
          </div>

          <div style={{ margin: 'var(--spacing-md) 0', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
            <img 
              src="/whatsapp_bot_mockup.png" 
              alt="Try our Whatsapp Bot Mockup" 
              style={{ width: '100%', height: 'auto', display: 'block' }} 
            />
          </div>

          <div style={{ marginTop: 'var(--spacing-md)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--spacing-md)' }}>
            <h4 className="switcher-title">Simulate Client Phone Owner</h4>
            <div style={{ display: 'flex', gap: '8px' }}>
              {profiles.map(p => (
                <button
                  key={p.id}
                  id={`btn-switch-phone-${p.id}`}
                  onClick={() => setActiveProfileId(p.id)}
                  className={`btn ${p.id === activeProfileId ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                >
                  {p.fullName.split(' ')[0]}'s Phone
                </button>
              ))}
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', marginTop: '6px' }}>
              Currently texting as: <strong>{currentProfile.fullName}</strong> ({currentProfile.whatsappNum})
            </p>
          </div>
        </div>

        {/* Quick Commands Trigger Grid */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', marginBottom: 'var(--spacing-md)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            Quick Command Scripts
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-md)' }}>
            Click any card below to instantly transmit the text command from the developer's phone:
          </p>

          <div className="quick-trigger-grid">
            <button id="btn-quick-help" onClick={() => triggerQuickMessage('help')} className="trigger-card">
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                help
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>Request the chatbot menu options and list commands.</div>
            </button>

            <button id="btn-quick-profile" onClick={() => triggerQuickMessage('profile')} className="trigger-card">
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                profile
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>Query my active profile skills, verification status, and country.</div>
            </button>

            <button id="btn-quick-matches" onClick={() => triggerQuickMessage('matches')} className="trigger-card">
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                matches
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>Find micro-gigs in the database matching my verified skills.</div>
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
                Simulate uploading a project. Triggers the background AI compiler, which parses skills and updates the web profile!
              </div>
            </button>

            <button id="btn-quick-apply" onClick={() => triggerQuickMessage('apply gig-react-merchant')} className="trigger-card">
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                apply gig-react-merchant
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>Submit an escrow gig application directly via SMS.</div>
            </button>
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
