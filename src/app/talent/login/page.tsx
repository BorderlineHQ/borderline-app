'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '../../../context/AppContext';
import Link from 'next/link';

export default function TalentLogin() {
  const { profiles, activeProfileId, setActiveProfileId, mounted } = useApp();
  const router = useRouter();
  const [whatsappNum, setWhatsappNum] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!mounted) return null;

  const handleDemoLogin = (profileId: string) => {
    setActiveProfileId(profileId);
    router.push('/talent');
  };

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsappNum) return;
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
      // Find matching profile by whatsapp number if possible, else use first mock profile
      const cleanNum = whatsappNum.replace(/\D/g, '');
      const matched = profiles.find(p => p.whatsappNum?.replace(/\D/g, '').includes(cleanNum)) || profiles[0];
      setActiveProfileId(matched.id);
      router.push('/talent');
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
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
            </svg>
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '6px', color: 'var(--color-text-primary)' }}>
            Talent Portal
          </h1>
          <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>
            Log in to manage your proof-of-work, view audits, and match with global projects.
          </p>
        </div>

        {/* Passwordless Login Form */}
        {!otpSent ? (
          <form onSubmit={handleRequestOtp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                WhatsApp Phone Number
              </label>
              <input
                type="tel"
                required
                placeholder="+234 801 234 5678"
                value={whatsappNum}
                onChange={(e) => setWhatsappNum(e.target.value)}
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
              {isSubmitting ? 'Requesting Code...' : 'Request WhatsApp Verification Code'}
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
                We sent a WhatsApp message with a 6-digit code to <strong style={{ color: 'var(--color-text-primary)' }}>{whatsappNum}</strong>
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
              Change Number
            </button>
          </form>
        )}

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', margin: '24px 0', gap: '12px' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
          <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Demo Builders</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
        </div>

        {/* Demo Quick-select Profiles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {profiles.slice(0, 3).map(profile => (
            <button
              key={profile.id}
              onClick={() => handleDemoLogin(profile.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                backgroundColor: activeProfileId === profile.id ? 'var(--color-accent-subtle)' : 'transparent',
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
                e.currentTarget.style.backgroundColor = activeProfileId === profile.id ? 'var(--color-accent-subtle)' : 'transparent';
              }}
            >
              <img
                src={profile.avatarUrl}
                alt={profile.fullName}
                style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>{profile.fullName}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>{profile.techFocus} · {profile.country}</div>
              </div>
              {activeProfileId === profile.id && (
                <span style={{ fontSize: '0.7rem', fontWeight: 'bold', color: 'var(--color-accent)', textTransform: 'uppercase' }}>Active</span>
              )}
            </button>
          ))}
        </div>

        {/* Footer Link */}
        <div style={{ textAlign: 'center', marginTop: 'var(--spacing-xl)', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
          Are you hiring?{' '}
          <Link href="/recruiter/login" style={{ color: 'var(--color-accent)', fontWeight: 600, textDecoration: 'none' }}>
            Go to Recruiter Login
          </Link>
        </div>
      </div>
    </div>
  );
}
