'use client';

import React from 'react';

interface TalentHeaderProps {
  fullName: string;
  techFocus: string;
  avatarUrl: string;
  isVerified: boolean;
  skills: string[];
  onUploadProject: () => void;
}

export default function TalentHeader({ 
  fullName, 
  techFocus, 
  avatarUrl, 
  isVerified, 
  skills,
  onUploadProject 
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
      <button className="btn btn-primary btn-lg" onClick={onUploadProject}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        Upload Project
      </button>
    </div>
  );
}
