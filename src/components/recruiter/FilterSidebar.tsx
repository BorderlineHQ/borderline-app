'use client';

import React from 'react';

interface FilterSidebarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCountry: string;
  onCountryChange: (value: string) => void;
  selectedSkills: string[];
  onSkillToggle: (skill: string) => void;
  onlyVerified: boolean;
  onVerifiedToggle: (value: boolean) => void;
  availableSkills: string[];
  availableCountries: string[];
}

export default function FilterSidebar({
  searchQuery,
  onSearchChange,
  selectedCountry,
  onCountryChange,
  selectedSkills,
  onSkillToggle,
  onlyVerified,
  onVerifiedToggle,
  availableSkills,
  availableCountries
}: FilterSidebarProps) {
  return (
    <aside className="filter-sidebar">
      <div className="filter-section">
        <h4 className="filter-title">Search</h4>
        <div className="search-input-wrapper">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search professionals..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <div className="filter-section">
        <h4 className="filter-title">Location</h4>
        <div className="radio-group-vertical">
          {availableCountries.map(country => (
            <label key={country} className="radio-label-vertical">
              <input
                type="radio"
                name="country"
                value={country}
                checked={selectedCountry === country}
                onChange={(e) => onCountryChange(e.target.value)}
              />
              <span>{country === 'All' ? 'All Africa' : country}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4 className="filter-title">Verification</h4>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={onlyVerified}
            onChange={(e) => onVerifiedToggle(e.target.checked)}
          />
          <span className="checkbox-text">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            AI-Verified Only
          </span>
        </label>
      </div>

      <div className="filter-section">
        <div className="filter-header">
          <h4 className="filter-title">Skills</h4>
          {selectedSkills.length > 0 && (
            <button 
              className="clear-filters-btn"
              onClick={() => selectedSkills.forEach(skill => onSkillToggle(skill))}
            >
              Clear all
            </button>
          )}
        </div>
        <div className="skills-grid">
          {availableSkills.map(skill => (
            <button
              key={skill}
              className={`skill-chip ${selectedSkills.includes(skill) ? 'active' : ''}`}
              onClick={() => onSkillToggle(skill)}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
