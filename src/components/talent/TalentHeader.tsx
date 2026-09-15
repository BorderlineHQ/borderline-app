'use client';

import React from 'react';

interface TalentHeaderProps {
  fullName: string;
  techFocus: string;
  avatarUrl: string;
  isVerified: boolean;
  skills: string[];
  onUploadProject: () => void;
  onOpenResume?: () => void;
}

export default function TalentHeader({ 
  fullName, 
  techFocus, 
  avatarUrl, 
  isVerified, 
  skills,
  onUploadProject,
  onOpenResume 
}: TalentHeaderProps) {
  return (
    <div className="talent-header">
      <div className="talent-profile-section">
        <div className="talent-avatar">
          <img src={avatarUrl} alt={fullName} />
          {isVerified && (
            <div className="verified-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="m9 11 2 2 4-4"/>
              </svg>
            </div>
          )}
        </div>
        <div className="talent-info">
          <h2>{fullName}</h2>
          <p className="talent-role">{techFocus}</p>
          <div className="talent-skills">
            {skills.slice(0, 5).map((skill, index) => (
              <span key={index} className="skill-badge">{skill}</span>
            ))}
            {skills.length > 5 && <span className="skill-badge">+{skills.length - 5}</span>}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {onOpenResume && (
          <button 
            className="btn btn-secondary btn-lg" 
            onClick={onOpenResume}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
            Generate ATS Resume
          </button>
        )}
        <button className="btn btn-primary btn-lg" onClick={onUploadProject}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Upload Project
        </button>
      </div>
    </div>
  );
}
