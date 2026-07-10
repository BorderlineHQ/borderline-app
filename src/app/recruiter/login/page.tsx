'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '../../../context/AppContext';
import Link from 'next/link';

export default function RecruiterLogin() {
  const { recruiters, activeRecruiterId, setActiveRecruiterId, mounted } = useApp();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!mounted) return null;

  const handleDemoLogin = (recruiterId: string) => {
    setActiveRecruiterId(recruiterId);
    router.push('/recruiter');
  };

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    // Simulate API delay
    setTimeout(() => {
      setOtpSent(true);
      setIsSubmitting(false);
    }, 800);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode) return;
    setIsSubmitting(true);
    setTimeout(() => {
      // For demo purposes, we log in as the default recruiter or match by domain if possible
      const matched = recruiters.find(r => email.toLowerCase().includes(r.companyName.toLowerCase().replace(/\s+/g, ''))) || recruiters[0];
      setActiveRecruiterId(matched.id);
      router.push('/recruiter');
    }, 800);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <div className="login-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <h1>Recruiter Portal</h1>
          <p>
            Sign in to search, review, and hire verified African professionals.
          </p>
        </div>

        {/* Passwordless Login Form */}
        {!otpSent ? (
          <form onSubmit={handleRequestOtp} className="login-form">
            <div className="form-group">
              <label className="form-label">Work Email</label>
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-lg"
            >
              {isSubmitting ? 'Requesting Code...' : 'Get One-Time Sign In Link'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="login-form">
            <div className="form-group">
              <label className="form-label">Enter OTP Verification Code</label>
              <input
                type="text"
                required
                maxLength={6}
                placeholder="123456"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="otp-input"
              />
              <p className="otp-hint">
                We sent a 6-digit code to <strong>{email}</strong>
              </p>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-lg"
            >
              {isSubmitting ? 'Verifying...' : 'Verify & Log In'}
            </button>
            <button
              type="button"
              onClick={() => setOtpSent(false)}
              className="text-link"
            >
              Change Email
            </button>
          </form>
        )}

        {/* Divider */}
        <div className="login-divider">
          <div className="divider-line" />
          <span>Demo Accounts</span>
          <div className="divider-line" />
        </div>

        {/* Demo Quick-select Profiles */}
        <div className="demo-accounts">
          {recruiters.map(recruiter => (
            <button
              key={recruiter.id}
              onClick={() => handleDemoLogin(recruiter.id)}
              className={`demo-account-btn ${activeRecruiterId === recruiter.id ? 'active' : ''}`}
            >
              <img
                src={recruiter.logoUrl}
                alt={recruiter.companyName}
                className="demo-account-logo"
              />
              <div className="demo-account-info">
                <div className="demo-account-name">{recruiter.companyName}</div>
                <div className="demo-account-website">{recruiter.website}</div>
              </div>
              {activeRecruiterId === recruiter.id && (
                <span className="active-badge">Active</span>
              )}
            </button>
          ))}
        </div>

        {/* Footer Link */}
        <div className="login-footer">
          Are you a developer?{' '}
          <Link href="/talent/login" className="text-link">
            Go to Talent Login
          </Link>
        </div>
      </div>
    </div>
  );
}
