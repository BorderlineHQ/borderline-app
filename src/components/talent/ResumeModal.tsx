'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Profile, ResumeData } from '../../types';
import { aiService } from '../../services/ai';
import ResumeDocument from './ResumeDocument';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
}

export default function ResumeModal({ isOpen, onClose, profile }: Props) {
  const [targetRole, setTargetRole] = useState(profile.techFocus || '');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'edit'>('preview');

  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  useEffect(() => {
    if (isOpen) {
      setTargetRole(profile.techFocus || '');
    }
  }, [isOpen, profile]);

  if (!isOpen) return null;

  const handleCompile = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsCompiling(true);
    setLogs([]);

    const logSequence = [
      '[INGESTION] Reading verified projects and Proof-of-Skill audit credentials...',
      '[MAPPING] Extracting technical competencies, database stacks, and architectures...',
      '[ATS-OPTIMIZING] Synthesizing high-impact, quantified action bullets...',
      '[VERIFICATION] Embedding BorderLine Build Score and cryptographic trust badge...',
      '[RENDERING] Compiling ATS-standard typography and vector print stylesheet...',
      '[SUCCESS] ATS Resume successfully compiled and ready for export!'
    ];

    // Stream logs for interactive visual feedback
    const streamPromise = (async () => {
      for (let i = 0; i < logSequence.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 320));
        setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${logSequence[i]}`]);
      }
    })();

    try {
      const [result] = await Promise.all([
        aiService.generateResume(profile, additionalNotes, targetRole),
        streamPromise,
      ]);
      setResumeData(result.resume);
      setActiveTab('preview');
    } catch (err) {
      console.error('Failed to compile resume:', err);
      setLogs((prev) => [...prev, '[ERROR] Failed to compile resume. Please try again.']);
    } finally {
      setIsCompiling(false);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleCopyPlaintext = () => {
    if (!resumeData) return;

    const plainText = `# ${resumeData.fullName}
${resumeData.title} | ${resumeData.location} | ${resumeData.email}
Portfolio: ${resumeData.portfolioUrl} | Build Score: ${resumeData.borderlineVerification.buildScore}

## PROFESSIONAL SUMMARY
${resumeData.summary}

## TECHNICAL SKILLS
- Languages: ${resumeData.skills.languages.join(', ')}
- Frameworks & Libraries: ${resumeData.skills.frameworks.join(', ')}
- Developer Tools & Databases: ${resumeData.skills.toolsAndDatabases.join(', ')}

## VERIFIED PROJECTS & PROOF OF SKILL
${resumeData.projects.map((p) => `### ${p.title} (Stack: ${p.verifiedSkills.join(', ')})
${p.bullets.map((b) => `* ${b}`).join('\n')}`).join('\n\n')}

## EXPERIENCE
${resumeData.experiences.map((e) => `### ${e.role} - ${e.companyOrProject} (${e.duration})
${e.highlights.map((h) => `* ${h}`).join('\n')}`).join('\n\n')}

## EDUCATION
${resumeData.education.map((ed) => `* ${ed.institution} - ${ed.degree} (${ed.graduationYear})`).join('\n')}
`;

    navigator.clipboard.writeText(plainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(5, 7, 15, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        className="card resume-no-print"
        style={{
          width: '100%',
          maxWidth: resumeData ? '980px' : '620px',
          maxHeight: '90vh',
          backgroundColor: 'var(--color-surface)',
          borderRadius: '16px',
          border: '1px solid var(--color-border)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
          overflow: 'hidden',
          transition: 'max-width 0.3s ease',
        }}
      >
        {/* Modal Top Bar */}
        <div
          style={{
            padding: '16px 24px',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'var(--color-surface-hover)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'rgba(37, 99, 235, 0.15)',
                color: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                BorderLine ATS Resume Compiler
              </h3>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
                Converts verified Proof-of-Skill case studies into corporate ATS-ready PDF format
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-text-secondary)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {!resumeData && !isCompiling && (
            <div>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '20px', lineHeight: 1.6 }}>
                The BorderLine AI Compiler scans <strong style={{ color: 'var(--color-text-primary)' }}>{profile.fullName}&apos;s</strong> verified projects, skill audits, and portfolio case studies to generate a tailored, high-density ATS resume ready to export as vector PDF.
              </p>

              <form onSubmit={handleCompile} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: '6px' }}>
                    Target Job Role / Specialization
                  </label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    placeholder="e.g. Senior Frontend Engineer, Full Stack Developer, Mobile Engineer"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-surface-hover)',
                      color: 'var(--color-text-primary)',
                      fontSize: '0.9rem',
                    }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: '6px' }}>
                    Additional Achievements or Notes (Optional)
                  </label>
                  <textarea
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="e.g. Led hackathon team of 4; optimized AWS database latency by 40%; completed Google Cloud certification..."
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-surface-hover)',
                      color: 'var(--color-text-primary)',
                      fontSize: '0.88rem',
                      resize: 'vertical',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                  <button
                    type="button"
                    onClick={onClose}
                    className="btn btn-secondary"
                    style={{ borderRadius: '8px', padding: '10px 18px' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      borderRadius: '8px',
                      padding: '10px 22px',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                    </svg>
                    Compile ATS Resume
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Compilation Terminal Stream */}
          {isCompiling && (
            <div style={{ padding: '20px 0' }}>
              <div
                style={{
                  backgroundColor: '#0a0d14',
                  borderRadius: '10px',
                  border: '1px solid #1e293b',
                  padding: '16px',
                  fontFamily: 'monospace',
                  fontSize: '0.8rem',
                  color: '#10b981',
                  maxHeight: '260px',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {logs.map((log, idx) => (
                  <div key={idx} style={{ lineHeight: 1.4 }}>{log}</div>
                ))}
                <div ref={logEndRef} />
              </div>
              <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '16px' }}>
                Transforming raw proof of skill into ATS-quantified resume format...
              </p>
            </div>
          )}

          {/* Generated Resume Preview */}
          {resumeData && !isCompiling && (
            <div>
              {/* Action Ribbon */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px',
                  marginBottom: '20px',
                  padding: '12px 16px',
                  backgroundColor: 'var(--color-surface-hover)',
                  borderRadius: '10px',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-verified" style={{ fontSize: '0.75rem', padding: '4px 8px' }}>
                    ● ATS Optimized (A4 Vector)
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                    Build Score: <strong>{resumeData.borderlineVerification.buildScore}</strong>
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button
                    onClick={handleCopyPlaintext}
                    className="btn btn-secondary"
                    style={{
                      borderRadius: '8px',
                      padding: '8px 14px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                    </svg>
                    {copied ? 'Copied Plaintext!' : 'Copy ATS Text'}
                  </button>

                  <button
                    onClick={() => setResumeData(null)}
                    className="btn btn-secondary"
                    style={{
                      borderRadius: '8px',
                      padding: '8px 14px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                    </svg>
                    Re-tune
                  </button>

                  <button
                    onClick={handlePrint}
                    className="btn btn-primary"
                    style={{
                      borderRadius: '8px',
                      padding: '8px 18px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      backgroundColor: '#2563eb',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 6 2 18 2 18 9"/>
                      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                      <rect x="6" y="14" width="12" height="8"/>
                    </svg>
                    Export / Print PDF
                  </button>
                </div>
              </div>

              {/* Printable Document Container */}
              <div style={{ overflowX: 'auto', padding: '10px 0' }}>
                <ResumeDocument data={resumeData} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
