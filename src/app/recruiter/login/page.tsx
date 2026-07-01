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
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--spacing-lg) var(--spacing-md)',
      position: 'relative',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '440px',
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--spacing-xl)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
        backdropFilter: 'blur(8px)',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: 'var(--color-accent-subtle)',
            color: 'var(--color-accent)',
            marginBottom: '16px'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '6px', color: 'var(--color-text-primary)' }}>
            Recruiter Portal
          </h1>
          <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>
            Sign in to search, review, and hire verified African developers.
          </p>
        </div>

        {/* Passwordless Login Form */}
        {!otpSent ? (
          <form onSubmit={handleRequestOtp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Work Email
              </label>
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'border-color var(--transition-fast)'
                }}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 600,
                fontSize: '0.9rem',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {isSubmitting ? 'Requesting Code...' : 'Get One-Time Sign In Link'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Enter OTP Verification Code
              </label>
              <input
                type="text"
                required
                maxLength={6}
                placeholder="123456"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text-primary)',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  letterSpacing: '0.2em',
                  outline: 'none',
                }}
              />
              <p style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', marginTop: '8px', textAlign: 'center' }}>
                We sent a 6-digit code to <strong style={{ color: 'var(--color-text-primary)' }}>{email}</strong>
              </p>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 600,
                fontSize: '0.9rem',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {isSubmitting ? 'Verifying...' : 'Verify & Log In'}
            </button>
            <button
              type="button"
              onClick={() => setOtpSent(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-text-secondary)',
                fontSize: '0.75rem',
                cursor: 'pointer',
                textAlign: 'center',
                textDecoration: 'underline'
              }}
            >
              Change Email
            </button>
          </form>
        )}

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', margin: '24px 0', gap: '12px' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
          <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Demo Accounts</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
        </div>

        {/* Demo Quick-select Profiles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {recruiters.map(recruiter => (
            <button
              key={recruiter.id}
              onClick={() => handleDemoLogin(recruiter.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                backgroundColor: activeRecruiterId === recruiter.id ? 'var(--color-accent-subtle)' : 'transparent',
                color: 'var(--color-text-primary)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-accent)';
                e.currentTarget.style.backgroundColor = 'var(--color-accent-subtle)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.backgroundColor = activeRecruiterId === recruiter.id ? 'var(--color-accent-subtle)' : 'transparent';
              }}
            >
              <img
                src={recruiter.logoUrl}
                alt={recruiter.companyName}
                style={{ width: '28px', height: '28px', borderRadius: '6px', objectFit: 'cover' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>{recruiter.companyName}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>{recruiter.website}</div>
              </div>
              {activeRecruiterId === recruiter.id && (
                <span style={{ fontSize: '0.7rem', fontWeight: 'bold', color: 'var(--color-accent)', textTransform: 'uppercase' }}>Active</span>
              )}
            </button>
          ))}
        </div>

        {/* Footer Link */}
        <div style={{ textAlign: 'center', marginTop: 'var(--spacing-xl)', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
          Are you a developer?{' '}
          <Link href="/talent/login" style={{ color: 'var(--color-accent)', fontWeight: 600, textDecoration: 'none' }}>
            Go to Talent Login
          </Link>
        </div>
      </div>
    </div>
  );
}
