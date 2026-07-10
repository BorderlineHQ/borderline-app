'use client';

import React, { useState } from 'react';

interface OnboardingFlowProps {
  onComplete: () => void;
  companyName: string;
}

export default function OnboardingFlow({ onComplete, companyName }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    industry: '',
    companySize: '',
    hiringNeeds: '',
    techStack: [] as string[],
    budgetRange: '',
    timeline: ''
  });

  const steps = [
    {
      title: 'Welcome to BorderLine',
      description: `Let's set up your ${companyName} workspace to find the best African tech talent.`,
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      )
    },
    {
      title: 'Industry & Company Size',
      description: 'Help us understand your organization to match you with the right candidates.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
        </svg>
      )
    },
    {
      title: 'Hiring Requirements',
      description: 'Tell us about the roles you\'re looking to fill and the expertise you need.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      )
    },
    {
      title: 'Budget & Timeline',
      description: 'Set your expectations for compensation and project duration.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23"/>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      )
    },
    {
      title: 'You\'re All Set!',
      description: 'Your workspace is ready. Start discovering verified African tech talent.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleTechStack = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.includes(tech)
        ? prev.techStack.filter(t => t !== tech)
        : [...prev.techStack, tech]
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="onboarding-welcome">
            <h3>Welcome to BorderLine</h3>
            <p>
              BorderLine connects you with AI-verified professionals from across Africa. 
              Our platform ensures every candidate has been thoroughly vetted, 
              saving you time and reducing hiring risk.
            </p>
            <div className="onboarding-features">
              <div className="feature-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <span>AI-Verified Profiles</span>
              </div>
              <div className="feature-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                <span>Pan-African Talent Pool</span>
              </div>
              <div className="feature-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 22 22 22 12 2"/>
                </svg>
                <span>Micro-Gig Hiring Model</span>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="onboarding-form">
            <div className="form-group">
              <label className="form-label">Industry</label>
              <select
                className="form-select"
                value={formData.industry}
                onChange={(e) => setFormData({...formData, industry: e.target.value})}
              >
                <option value="">Select your industry</option>
                <option value="fintech">Fintech</option>
                <option value="ecommerce">E-commerce</option>
                <option value="healthtech">Healthtech</option>
                <option value="edtech">Edtech</option>
                <option value="agritech">Agritech</option>
                <option value="logistics">Logistics</option>
                <option value="enterprise">Enterprise Software</option>
                <option value="agency">Digital Agency</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Company Size</label>
              <div className="radio-group">
                {['1-10', '11-50', '51-200', '201-500', '500+'].map(size => (
                  <label key={size} className="radio-label">
                    <input
                      type="radio"
                      name="companySize"
                      value={size}
                      checked={formData.companySize === size}
                      onChange={(e) => setFormData({...formData, companySize: e.target.value})}
                    />
                    <span>{size} employees</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="onboarding-form">
            <div className="form-group">
              <label className="form-label">What roles are you looking to fill?</label>
              <textarea
                className="form-textarea"
                placeholder="e.g., Marketing specialists, Designers, Project managers, Analysts..."
                value={formData.hiringNeeds}
                onChange={(e) => setFormData({...formData, hiringNeeds: e.target.value})}
                rows={3}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Required Skills & Expertise (select all that apply)</label>
              <div className="tech-stack-grid">
                {['Project Management', 'Marketing', 'Design', 'Data Analysis', 'Content Writing', 'Sales', 'Operations', 'Finance', 'Customer Service', 'Strategy'].map(skill => (
                  <button
                    key={skill}
                    type="button"
                    className={`tech-chip ${formData.techStack.includes(skill) ? 'active' : ''}`}
                    onClick={() => toggleTechStack(skill)}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="onboarding-form">
            <div className="form-group">
              <label className="form-label">Monthly Budget Range (GHS)</label>
              <div className="radio-group">
                {['<5,000', '5,000-15,000', '15,000-50,000', '50,000-100,000', '100,000+'].map(range => (
                  <label key={range} className="radio-label">
                    <input
                      type="radio"
                      name="budgetRange"
                      value={range}
                      checked={formData.budgetRange === range}
                      onChange={(e) => setFormData({...formData, budgetRange: e.target.value})}
                    />
                    <span>GHS {range}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Expected Hiring Timeline</label>
              <select
                className="form-select"
                value={formData.timeline}
                onChange={(e) => setFormData({...formData, timeline: e.target.value})}
              >
                <option value="">Select timeline</option>
                <option value="immediate">Immediate (within 1 week)</option>
                <option value="2weeks">2-4 weeks</option>
                <option value="1month">1-3 months</option>
                <option value="3months">3+ months</option>
                <option value="ongoing">Ongoing hiring</option>
              </select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="onboarding-complete">
            <h3>Your Workspace is Ready!</h3>
            <p>
              You can now:
            </p>
            <ul className="complete-list">
              <li>Browse AI-verified professionals from across Africa</li>
              <li>Post micro-gigs and receive applications</li>
              <li>Review detailed candidate profiles</li>
              <li>Manage candidates and track applications</li>
            </ul>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-container">
        <div className="onboarding-progress">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`progress-step ${index <= currentStep ? 'active' : ''} ${index === currentStep ? 'current' : ''}`}
            />
          ))}
        </div>

        <div className="onboarding-content">
          <div className="onboarding-icon">
            {steps[currentStep].icon}
          </div>

          <div className="onboarding-header">
            <h2>{steps[currentStep].title}</h2>
            <p>{steps[currentStep].description}</p>
          </div>

          {renderStepContent()}

          <div className="onboarding-actions">
            {currentStep > 0 && (
              <button className="btn btn-secondary" onClick={handleBack}>
                Back
              </button>
            )}
            <button className="btn btn-primary" onClick={handleNext}>
              {currentStep === steps.length - 1 ? 'Get Started' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
