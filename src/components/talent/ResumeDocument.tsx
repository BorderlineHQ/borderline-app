'use client';

import React from 'react';
import { ResumeData } from '../../types';

interface Props {
  data: ResumeData;
  id?: string;
}

export default function ResumeDocument({ data, id = 'resume-printable-doc' }: Props) {
  return (
    <div id={id} className="borderline-resume-sheet">
      <style jsx global>{`
        @media print {
          /* Hide everything in the page except the resume document */
          body * {
            visibility: hidden !important;
          }
          #${id}, #${id} * {
            visibility: visible !important;
          }
          #${id} {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 16mm 20mm !important;
            background: #ffffff !important;
            color: #111827 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
          }
          @page {
            size: A4 portrait;
            margin: 0;
          }
          .resume-no-print {
            display: none !important;
          }
          a {
            text-decoration: none !important;
            color: inherit !important;
          }
        }

        .borderline-resume-sheet {
          background-color: #ffffff;
          color: #0f172a;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
          line-height: 1.45;
          text-align: left;
        }

        .resume-header-title {
          font-size: 26px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.03em;
          margin: 0;
        }

        .resume-subtitle {
          font-size: 15px;
          font-weight: 700;
          color: #2563eb;
          margin: 4px 0 10px 0;
          letter-spacing: -0.01em;
        }

        .resume-contact-bar {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          font-size: 12px;
          color: #475569;
          align-items: center;
        }

        .resume-section {
          margin-top: 20px;
        }

        .resume-section-title {
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #1e293b;
          border-bottom: 1.5px solid #cbd5e1;
          padding-bottom: 4px;
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .resume-text {
          font-size: 12.5px;
          color: #334155;
          margin: 0;
          line-height: 1.5;
        }

        .resume-skill-row {
          font-size: 12.5px;
          color: #334155;
          margin-bottom: 5px;
          line-height: 1.4;
        }

        .resume-skill-label {
          font-weight: 700;
          color: #0f172a;
          margin-right: 6px;
        }

        .resume-item {
          margin-bottom: 14px;
        }

        .resume-item:last-child {
          margin-bottom: 0;
        }

        .resume-item-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 4px;
        }

        .resume-item-title {
          font-size: 13.5px;
          font-weight: 700;
          color: #0f172a;
        }

        .resume-item-meta {
          font-size: 11.5px;
          color: #64748b;
          font-weight: 600;
        }

        .resume-item-sub {
          font-size: 12px;
          color: #2563eb;
          font-weight: 600;
          margin: 2px 0 6px 0;
        }

        .resume-bullets {
          margin: 4px 0 0 16px;
          padding: 0;
          list-style-type: disc;
        }

        .resume-bullets li {
          font-size: 12px;
          color: #334155;
          margin-bottom: 3px;
          line-height: 1.45;
        }

        .resume-badge-verified {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #ecfdf5;
          color: #059669;
          font-size: 10.5px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 4px;
          border: 1px solid #a7f3d0;
        }
      `}</style>

      {/* Header */}
      <div style={{ borderBottom: '2px solid #2563eb', paddingBottom: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h1 className="resume-header-title">{data.fullName}</h1>
            <div className="resume-subtitle">{data.title}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span className="resume-badge-verified">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="m9 11 2 2 4-4"/>
              </svg>
              Build Score: {data.borderlineVerification.buildScore}
            </span>
          </div>
        </div>

        <div className="resume-contact-bar">
          <span>📍 {data.location}</span>
          <span>✉️ {data.email}</span>
          {data.phone && <span>📱 {data.phone}</span>}
          {data.githubUrl && (
            <span>
              💻{' '}
              <a href={data.githubUrl} target="_blank" rel="noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>
                GitHub
              </a>
            </span>
          )}
          <span>
            🛡️{' '}
            <a href={data.portfolioUrl} target="_blank" rel="noreferrer" style={{ color: '#2563eb', textDecoration: 'underline', fontWeight: 600 }}>
              Verified Portfolio
            </a>
          </span>
        </div>
      </div>

      {/* Professional Summary */}
      {data.summary && (
        <section className="resume-section">
          <div className="resume-section-title">
            <span>Professional Summary</span>
            <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 600, textTransform: 'none' }}>Proof of Skill Standard</span>
          </div>
          <p className="resume-text">{data.summary}</p>
        </section>
      )}

      {/* Technical Skills */}
      <section className="resume-section">
        <div className="resume-section-title">
          <span>Technical Skills</span>
        </div>
        <div>
          {data.skills.languages && data.skills.languages.length > 0 && (
            <div className="resume-skill-row">
              <span className="resume-skill-label">Languages:</span>
              <span>{data.skills.languages.join(' • ')}</span>
            </div>
          )}
          {data.skills.frameworks && data.skills.frameworks.length > 0 && (
            <div className="resume-skill-row">
              <span className="resume-skill-label">Frameworks & Libraries:</span>
              <span>{data.skills.frameworks.join(' • ')}</span>
            </div>
          )}
          {data.skills.toolsAndDatabases && data.skills.toolsAndDatabases.length > 0 && (
            <div className="resume-skill-row">
              <span className="resume-skill-label">Developer Tools & Databases:</span>
              <span>{data.skills.toolsAndDatabases.join(' • ')}</span>
            </div>
          )}
        </div>
      </section>

      {/* Verified Projects / Proof-of-Skill Case Studies */}
      {data.projects && data.projects.length > 0 && (
        <section className="resume-section">
          <div className="resume-section-title">
            <span>Verified Projects & Technical Case Studies</span>
            <span style={{ fontSize: '10px', color: '#059669', fontWeight: 700, textTransform: 'none' }}>✓ AI-Audited</span>
          </div>
          <div>
            {data.projects.map((proj, idx) => (
              <div key={idx} className="resume-item">
                <div className="resume-item-header">
                  <span className="resume-item-title">{proj.title}</span>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer" style={{ fontSize: '11px', color: '#2563eb', textDecoration: 'none' }}>
                      View Project Code ↗
                    </a>
                  )}
                </div>
                <div className="resume-item-sub">
                  Stack: {proj.verifiedSkills.join(', ')}
                </div>
                {proj.bullets && proj.bullets.length > 0 && (
                  <ul className="resume-bullets">
                    {proj.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Work / Production Experience */}
      {data.experiences && data.experiences.length > 0 && (
        <section className="resume-section">
          <div className="resume-section-title">
            <span>Experience & Practical Production Work</span>
          </div>
          <div>
            {data.experiences.map((exp, idx) => (
              <div key={idx} className="resume-item">
                <div className="resume-item-header">
                  <span className="resume-item-title">{exp.role}</span>
                  <span className="resume-item-meta">{exp.duration}</span>
                </div>
                <div className="resume-item-sub" style={{ color: '#475569' }}>
                  {exp.companyOrProject} {exp.location ? `• ${exp.location}` : ''}
                </div>
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="resume-bullets">
                    {exp.highlights.map((item, hIdx) => (
                      <li key={hIdx}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="resume-section">
          <div className="resume-section-title">
            <span>Education & Credentials</span>
          </div>
          <div>
            {data.education.map((edu, idx) => (
              <div key={idx} className="resume-item-header" style={{ marginBottom: '4px' }}>
                <div style={{ fontSize: '12.5px', color: '#0f172a' }}>
                  <strong>{edu.institution}</strong> — {edu.degree}
                </div>
                <span className="resume-item-meta">{edu.graduationYear}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* BorderLine Verification Footer Note for ATS Scanners */}
      <div style={{ marginTop: '24px', paddingTop: '10px', borderTop: '1px solid #e2e8f0', fontSize: '10.5px', color: '#94a3b8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>
          BorderLine Proof of Skill Protocol • Verified Profile: <a href={data.portfolioUrl} target="_blank" rel="noreferrer" style={{ color: '#64748b' }}>{data.portfolioUrl}</a>
        </span>
        <span>Vouched by: {data.borderlineVerification.vouchedBy || 'BorderLine Collective'}</span>
      </div>
    </div>
  );
}
