'use client';

import React, { useEffect, useRef, useState } from 'react';

export const VerificationVisualizer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Terminal typing simulation
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  // Verified output simulation
  const [verifiedSkills, setVerifiedSkills] = useState<string[]>([]);
  const [buildScore, setBuildScore] = useState(0);

  const rawCodeSnippets = [
    '> Analyzing repository: /payment-ledger...',
    '> Fetching commit history (243 commits found)',
    '> Scanning architecture patterns...',
    '  - Detected: Node.js (Express)',
    '  - Detected: PostgreSQL',
    '  - Found ACID compliance implementation',
    '> Running dependency audit...',
    '  - AWS SDK (Lambda, API Gateway)',
    '> Evaluating code complexity (Cyclomatic score: 14)',
    '> Cross-referencing against standard payment logic...',
    '> PASS: Row-level database locking verified.',
    '> Generating verified case study...'
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let lineIndex = 0;
    
    const interval = setInterval(() => {
      if (lineIndex < rawCodeSnippets.length) {
        const currentLine = rawCodeSnippets[lineIndex];
        if (currentLine) {
          setTerminalLines(prev => [...prev, currentLine]);
        }
        
        // Trigger right panel updates based on left panel progress
        if (lineIndex === 3) setVerifiedSkills(prev => [...prev, 'Node.js']);
        if (lineIndex === 4) setVerifiedSkills(prev => [...prev, 'PostgreSQL']);
        if (lineIndex === 7) setVerifiedSkills(prev => [...prev, 'AWS Serverless']);
        if (lineIndex === 10) setVerifiedSkills(prev => [...prev, 'System Architecture']);
        
        // Increment score
        setBuildScore(prev => prev + 240);

        lineIndex++;
      } else {
        clearInterval(interval);
      }
    }, 600);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <div className="verification-visualizer" ref={containerRef} style={{ margin: 'var(--spacing-xl) 0', position: 'relative' }}>
      <style>{`
        .visualizer-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-lg);
          align-items: stretch;
        }

        @media (max-width: 768px) {
          .visualizer-grid {
            grid-template-columns: 1fr;
          }
        }

        .terminal-pane {
          background-color: #0d1117; /* GitHub Dark BG */
          border: 1px solid #30363d;
          border-radius: var(--radius-md);
          overflow: hidden;
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: #c9d1d9;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          height: 350px;
          display: flex;
          flex-direction: column;
        }

        .terminal-header {
          background-color: #161b22;
          border-bottom: 1px solid #30363d;
          padding: 8px 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .terminal-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .terminal-body {
          padding: 16px;
          flex-grow: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .terminal-line {
          animation: fadeIn 0.3s ease;
        }

        .verified-pane {
          background-color: var(--color-surface-elevated);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: var(--spacing-lg);
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          height: 350px;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        .verified-pane::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: var(--color-accent);
          opacity: 0;
          transition: opacity 0.5s;
        }

        .verified-pane.completed::after {
          opacity: 1;
        }

        .scanning-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(to bottom, transparent, var(--color-surface-elevated));
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 24px;
          transition: opacity 0.5s;
          z-index: 10;
        }

        .scanning-overlay.hidden {
          opacity: 0;
          pointer-events: none;
        }

        .pulse-loader {
          width: 12px;
          height: 12px;
          background-color: var(--color-accent);
          border-radius: 50%;
          animation: pulse 1s infinite alternate;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 1; box-shadow: 0 0 10px var(--color-accent); }
        }
        
        .animated-badge {
          animation: fadeIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
      `}</style>

      <div className="visualizer-grid">
        {/* Left Pane: Terminal */}
        <div className="terminal-pane">
          <div className="terminal-header">
            <div className="terminal-dot" style={{ backgroundColor: '#ff5f56' }}></div>
            <div className="terminal-dot" style={{ backgroundColor: '#ffbd2e' }}></div>
            <div className="terminal-dot" style={{ backgroundColor: '#27c93f' }}></div>
            <span style={{ marginLeft: '8px', color: '#8b949e', fontSize: '0.75rem' }}>ai_auditor.sh</span>
          </div>
          <div className="terminal-body">
            {terminalLines.filter(Boolean).map((line, i) => (
              <div key={i} className="terminal-line" style={{ color: line?.includes('PASS') ? '#2ea043' : line?.includes('Detected') ? '#79c0ff' : 'inherit' }}>
                {line}
              </div>
            ))}
            {terminalLines.length > 0 && terminalLines.length < rawCodeSnippets.length && (
              <div className="pulse-loader" style={{ marginTop: '8px', width: '8px', height: '8px', backgroundColor: '#8b949e' }}></div>
            )}
          </div>
        </div>

        {/* Right Pane: Verified Portfolio Card */}
        <div className={`verified-pane ${terminalLines.length === rawCodeSnippets.length ? 'completed' : ''}`}>
          
          <div className={`scanning-overlay ${terminalLines.length > 2 ? 'hidden' : ''}`}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-tertiary)', fontSize: '0.85rem' }}>
               <div className="pulse-loader"></div>
               Awaiting repository data...
             </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
             <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-accent)', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '4px' }}>VERIFIED CASE STUDY</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>Enterprise Payment Ledger</div>
             </div>
             <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.65rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', fontWeight: 700 }}>Build Score</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: buildScore > 0 ? 'var(--color-accent)' : 'var(--color-text-tertiary)', transition: 'color 0.3s' }}>
                  {buildScore}
                </div>
             </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Extracted Capabilities:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', minHeight: '30px' }}>
              {verifiedSkills.map((skill, idx) => (
                <span key={idx} className="badge badge-accent animated-badge" style={{ fontSize: '0.75rem', padding: '4px 8px', borderRadius: '4px' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 'auto', borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
             <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
               {terminalLines.length >= 12 ? (
                 <span className="animated-badge">
                   <strong>AI Summary:</strong> Analyzed 243 commits. Verified ACID transaction compliance in PostgreSQL and distributed queue architecture in AWS. Ready for enterprise matching.
                 </span>
               ) : (
                 <span style={{ color: 'var(--color-text-tertiary)' }}>Generating human-readable summary from codebase...</span>
               )}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};
