'use client';

import React, { useEffect, useRef, useState } from 'react';

export const WhatsAppDemo: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="whatsapp-demo-container" ref={containerRef} style={{ display: 'flex', justifyContent: 'center', margin: 'var(--spacing-xl) 0' }}>
      <style>{`
        .phone-mockup {
          width: 320px;
          height: 650px;
          border-radius: 40px;
          border: 12px solid var(--color-surface-elevated);
          background-color: #0b141a; /* WhatsApp dark mode BG */
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 0 0 2px var(--color-border);
          position: relative;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }

        .phone-notch {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 120px;
          height: 25px;
          background-color: var(--color-surface-elevated);
          border-bottom-left-radius: 16px;
          border-bottom-right-radius: 16px;
          z-index: 10;
        }

        .wa-header {
          background-color: #1f2c34;
          padding: 40px 16px 12px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          color: white;
          border-bottom: 1px solid #2a3942;
        }

        .wa-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: var(--color-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: bold;
        }

        .wa-chat-bg {
          background-color: #0b141a;
          background-image: url('data:image/svg+xml;utf8,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><g fill="%231a2228" fill-opacity="0.4" fill-rule="evenodd"><circle cx="50" cy="50" r="1"/></g></svg>');
          height: calc(100% - 93px);
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .msg {
          max-width: 85%;
          padding: 8px 12px;
          border-radius: 12px;
          font-size: 0.95rem;
          line-height: 1.4;
          position: relative;
          opacity: 0;
          transform: translateY(10px);
          color: #e9edef;
        }

        .msg-time {
          font-size: 0.65rem;
          color: rgba(255, 255, 255, 0.6);
          float: right;
          margin-top: 4px;
          margin-left: 8px;
        }

        .msg.system {
          background-color: #202c33;
          align-self: flex-start;
          border-top-left-radius: 0;
        }

        .msg.user {
          background-color: #005c4b;
          align-self: flex-end;
          border-top-right-radius: 0;
        }

        .msg.system::before {
          content: '';
          position: absolute;
          top: 0;
          left: -8px;
          width: 0;
          height: 0;
          border-top: 8px solid #202c33;
          border-left: 8px solid transparent;
        }

        .msg.user::before {
          content: '';
          position: absolute;
          top: 0;
          right: -8px;
          width: 0;
          height: 0;
          border-top: 8px solid #005c4b;
          border-right: 8px solid transparent;
        }

        /* Animations */
        .visible .msg-1 { animation: popIn 0.4s ease forwards 0.5s; }
        .visible .msg-2 { animation: popIn 0.4s ease forwards 2s; }
        .visible .msg-3 { animation: popIn 0.4s ease forwards 3.5s; }

        @keyframes popIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className={`phone-mockup ${isVisible ? 'visible' : ''}`}>
        <div className="phone-notch"></div>
        
        <div className="wa-header">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          <div className="wa-avatar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '1rem' }}>BorderLine Bot</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>Verified Business</div>
          </div>
        </div>

        <div className="wa-chat-bg">
          <div className="msg system msg-1">
            <strong>New Gig Match 🚀</strong><br/><br/>
            Role: Frontend React Dev<br/>
            Partner: Yango Fintech<br/>
            Rate: $40/hr<br/><br/>
            Your verified skills match perfectly. Reply <strong>ACCEPT</strong> to apply with your automated portfolio.
            <div className="msg-time">09:41</div>
          </div>

          <div className="msg user msg-2">
            ACCEPT
            <div className="msg-time">09:43 ✓✓</div>
          </div>

          <div className="msg system msg-3">
            Application sent! ✅<br/><br/>
            Your verified BorderLine profile and build score have been securely forwarded to Yango&apos;s HR. We&apos;ll text you when they review it.
            <div className="msg-time">09:43</div>
          </div>
        </div>
      </div>
    </div>
  );
};
