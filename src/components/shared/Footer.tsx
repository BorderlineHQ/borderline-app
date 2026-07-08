'use client';

import React from 'react';
import Link from 'next/link';

const WHATSAPP_CHANNEL = 'https://whatsapp.com/channel/0029VbCwPzuCsU9RKGneCW3v';

const footerLinks = {
  Platform: [
    { label: 'Talent Profiles', href: '/talent' },
    { label: 'Recruiter Dashboard', href: '/recruiter' },
    { label: 'Teams & Payments', href: '/teams-payments' },
    { label: 'Manifesto', href: '/manifesto' },
  ],
  Resources: [
    { label: 'Upskill & Grow', href: '/resources/upskill' },
    { label: 'Communities', href: '/resources/communities' },
    { label: 'Blog & Insights', href: '/resources/blog' },
    { label: 'Foundation', href: '/resources/foundation' },
  ],
  Company: [
    { label: 'About Us', href: '/manifesto' },
    { label: 'Careers', href: '#' },
    { label: 'Press Kit', href: '#' },
    { label: 'Contact', href: 'mailto:hello@borderline.africa' },
  ],
};

const socialLinks = [
  {
    label: 'WhatsApp',
    href: WHATSAPP_CHANNEL,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    href: 'https://x.com/borderline_africa',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/borderline-africa',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/borderline-africa',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    ),
  },
];

const Footer: React.FC = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--color-surface)',
      borderTop: '1px solid var(--color-border)',
      padding: '0',
      marginTop: 'auto',
    }}>
      {/* Main Footer Content */}
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '48px 24px 40px',
        display: 'grid',
        gridTemplateColumns: 'minmax(240px, 1.4fr) repeat(3, minmax(120px, 1fr))',
        gap: '40px',
      }}>
        {/* Brand Column */}
        <div>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M5 2h9c3 0 5 2 5 4.5 0 2.5-2 3.5-5 3.5 3 0 5 1 5 3.5 0 2.5-2 4.5-5 4.5H5V2zm4 3v4h4c1.2 0 2-.8 2-2s-.8-2-2-2H9zm0 6v4h4c1.2 0 2-.8 2-2s-.8-2-2-2H9z" fill="var(--color-text-primary)"/>
              <rect x="4" y="21" width="16" height="2.5" rx="1.25" fill="var(--color-accent)"/>
            </svg>
            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>
              Border<span style={{ color: 'var(--color-accent)' }}>Line</span>
            </span>
          </Link>

          <p style={{
            fontSize: '0.82rem',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.6,
            marginBottom: '20px',
            maxWidth: '280px',
          }}>
            Trust infrastructure for Africa&apos;s digital builders. Verify skills, connect with recruiters, and get paid — all without a corporate resume.
          </p>

          {/* Social Links */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-text-secondary)',
                  transition: 'all 0.15s',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-accent)';
                  e.currentTarget.style.color = 'var(--color-accent)';
                  e.currentTarget.style.backgroundColor = 'var(--color-accent-subtle)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                  e.currentTarget.style.color = 'var(--color-text-secondary)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Link Columns */}
        {Object.entries(footerLinks).map(([section, links]) => (
          <div key={section}>
            <h4 style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--color-text-primary)',
              marginBottom: '16px',
            }}>
              {section}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {links.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('mailto:') || link.href.startsWith('http') || link.href === '#' ? (
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      style={{
                        fontSize: '0.82rem',
                        color: 'var(--color-text-secondary)',
                        textDecoration: 'none',
                        transition: 'color 0.15s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      style={{
                        fontSize: '0.82rem',
                        color: 'var(--color-text-secondary)',
                        textDecoration: 'none',
                        transition: 'color 0.15s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div style={{
        borderTop: '1px solid var(--color-border)',
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '20px 24px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
      }}>
        <span style={{ fontSize: '0.72rem', color: 'var(--color-text-tertiary)' }}>
          © {new Date().getFullYear()} BorderLine. Built with 🤎 across Africa.
        </span>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="#" style={{ fontSize: '0.72rem', color: 'var(--color-text-tertiary)', textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-tertiary)'; }}
          >
            Privacy Policy
          </a>
          <a href="#" style={{ fontSize: '0.72rem', color: 'var(--color-text-tertiary)', textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-tertiary)'; }}
          >
            Terms of Service
          </a>
          <a href="#" style={{ fontSize: '0.72rem', color: 'var(--color-text-tertiary)', textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-tertiary)'; }}
          >
            Cookie Settings
          </a>
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          footer > div:first-child {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px !important;
          }
        }
        @media (max-width: 480px) {
          footer > div:first-child {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
