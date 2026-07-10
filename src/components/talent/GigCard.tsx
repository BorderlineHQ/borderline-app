'use client';

import React from 'react';
import { Gig } from '../../types';

interface GigCardProps {
  gig: Gig;
  matchScore: number;
  isApplied: boolean;
  userSkills: string[];
  onApply: () => void;
}

export default function GigCard({ gig, matchScore, isApplied, userSkills, onApply }: GigCardProps) {
  return (
    <div className="gig-card">
      <div className="gig-card-header">
        <div className="gig-company">
          {gig.logoUrl && <img src={gig.logoUrl} alt={gig.companyName} className="gig-company-logo" />}
          <div>
            <h4 className="gig-title">{gig.title}</h4>
            <p className="gig-company-name">{gig.companyName}</p>
          </div>
        </div>
        <span className="match-badge">{matchScore}% Match</span>
      </div>
      
      <p className="gig-description">{gig.description}</p>
      
      <div className="gig-skills">
        {gig.requiredSkills.map((skill, index) => (
          <span 
            key={index} 
            className={`gig-skill ${userSkills.includes(skill) ? 'matched' : ''}`}
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="gig-card-footer">
        <div className="gig-budget">
          GHS {gig.budgetGHS}
          <span className="budget-label">/project</span>
        </div>
        {isApplied ? (
          <span className="applied-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            Applied
          </span>
        ) : (
          <button className="btn btn-secondary btn-sm" onClick={onApply}>
            Apply Instantly
          </button>
        )}
      </div>
    </div>
  );
}
