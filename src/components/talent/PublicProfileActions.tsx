'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Profile } from '../../types';
import ResumeModal from './ResumeModal';

interface Props {
  profile: Profile;
}

export default function PublicProfileActions({ profile }: Props) {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
      <button
        onClick={() => setIsResumeModalOpen(true)}
        className="btn btn-secondary"
        style={{
          borderRadius: '8px',
          padding: '12px 20px',
          fontSize: '0.92rem',
          fontWeight: 600,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
        }}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
        Export Resume (PDF)
      </button>

      <Link
        href="/whatsapp"
        className="btn btn-primary"
        style={{
          borderRadius: '8px',
          padding: '12px 22px',
          fontSize: '0.92rem',
          fontWeight: 600,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          textDecoration: 'none',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
        Contact via WhatsApp Bot
      </Link>

      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        profile={profile}
      />
    </div>
  );
}
