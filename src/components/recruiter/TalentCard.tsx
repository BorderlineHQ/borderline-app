'use client';

import React from 'react';
import { Profile } from '../../types';

interface TalentCardProps {
  profile: Profile;
  isSelected: boolean;
  onClick: () => void;
  hasApplied?: boolean;
}

export default function TalentCard({ profile, isSelected, onClick, hasApplied }: TalentCardProps) {
  return (
    <div 
      className={`talent-card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className="talent-card-header">
        <img src={profile.avatarUrl} alt={profile.fullName} className="talent-avatar" />
        <div className="talent-info">
          <h4 className="talent-name">
            {profile.fullName}
            {profile.isVerified && (
              <span className="verified-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="m9 11 2 2 4-4"/>
                </svg>
              </span>
            )}
          </h4>
          <p className="talent-focus">{profile.techFocus}</p>
        </div>
      </div>

      <p className="talent-bio">{profile.bio}</p>

      <div className="talent-card-footer">
        <div className="talent-meta">
          <span className="location-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            {profile.country}
          </span>
          {hasApplied && (
            <span className="applied-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
              Applied
            </span>
          )}
        </div>
        <div className="talent-skills">
          {profile.skills.slice(0, 4).map((skill, index) => (
            <span key={index} className="skill-tag">{skill}</span>
          ))}
          {profile.skills.length > 4 && (
            <span className="skill-tag more">+{profile.skills.length - 4}</span>
          )}
        </div>
      </div>
    </div>
  );
}
