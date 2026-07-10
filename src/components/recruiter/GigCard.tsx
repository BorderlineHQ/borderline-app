'use client';

import React from 'react';
import { Gig } from '../../types';

interface GigCardProps {
  gig: Gig;
  applicationCount: number;
}

export default function GigCard({ gig, applicationCount }: GigCardProps) {
  return (
    <div className="gig-card">
      <div className="gig-card-header">
        <h4 className="gig-title">{gig.title}</h4>
        <span className="gig-budget">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="1" x2="12" y2="23"/>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
          GHS {gig.budgetGHS.toLocaleString()}
        </span>
      </div>
      
      <p className="gig-description">
        {gig.description.length > 100 
          ? `${gig.description.substring(0, 100)}...` 
          : gig.description}
      </p>

      <div className="gig-card-footer">
        <div className="gig-skills">
          {gig.requiredSkills.slice(0, 3).map((skill, index) => (
            <span key={index} className="gig-skill-tag">{skill}</span>
          ))}
          {gig.requiredSkills.length > 3 && (
            <span className="gig-skill-tag more">+{gig.requiredSkills.length - 3}</span>
          )}
        </div>
        <div className="gig-applications">
          <span className="application-count">
            {applicationCount} applicant{applicationCount !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
}
