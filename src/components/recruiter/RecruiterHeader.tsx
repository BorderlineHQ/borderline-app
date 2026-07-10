'use client';

import React from 'react';
import Link from 'next/link';

interface RecruiterHeaderProps {
  companyName: string;
  website?: string;
  logoUrl?: string;
  onPostGig: () => void;
  onPostJob: () => void;
}

export default function RecruiterHeader({ companyName, website, logoUrl, onPostGig, onPostJob }: RecruiterHeaderProps) {
  return (
    <div className="recruiter-header">
      <div className="recruiter-header-content">
        <div className="recruiter-brand">
          <img src={logoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}&background=10B981&color=fff`} alt={companyName} className="recruiter-logo" />
          <div className="recruiter-brand-info">
            <h1>{companyName} Workspace</h1>
            {website && (
              <a href={website} target="_blank" rel="noopener noreferrer" className="recruiter-website">
                {website}
              </a>
            )}
          </div>
        </div>
        <div className="recruiter-actions">
          <Link href="/teams-payments" className="btn btn-secondary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
            Manage Team & Payments
          </Link>
          <button className="btn btn-secondary btn-lg" onClick={onPostJob}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
            Post Job
          </button>
          <button className="btn btn-primary btn-lg" onClick={onPostGig}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Post Micro-Gig
          </button>
        </div>
      </div>
    </div>
  );
}
