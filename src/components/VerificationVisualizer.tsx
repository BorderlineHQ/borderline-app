'use client';

import React, { useEffect, useRef, useState } from 'react';

interface GigPreset {
  id: string;
  title: string;
  budget: number;
  currencyGhs: number;
  skills: string[];
  candidateName: string;
  candidateLocation: string;
  candidatePhone: string;
  candidateInitials: string;
}

const GIG_PRESETS: GigPreset[] = [
  {
    id: 'paystack',
    title: 'Fix Paystack Checkout Bug',
    budget: 50,
    currencyGhs: 600,
    skills: ['React', 'Paystack API', 'Node.js'],
    candidateName: 'Alex Morgan',
    candidateLocation: 'Kumasi, Ghana',
    candidatePhone: '+233 24 *** 4567',
    candidateInitials: 'AM',
  },
  {
    id: 'ussd',
    title: 'Build MTN MoMo USSD Gateway (*920*#)',
    budget: 120,
    currencyGhs: 1800,
    skills: ['Python', 'USSD Protocol', 'MTN MoMo API'],
    candidateName: 'Chidi Okonjo',
    candidateLocation: 'Lagos, Nigeria',
    candidatePhone: '+234 803 *** 1192',
    candidateInitials: 'CO',
  },
  {
    id: 'flutter',
    title: 'Flutter Mobile Wallet UI Redesign',
    budget: 90,
    currencyGhs: 1350,
    skills: ['Flutter', 'Dart', 'Mobile Money UI'],
    candidateName: 'Amina Bello',
    candidateLocation: 'Nairobi, Kenya',
    candidatePhone: '+254 712 *** 8821',
    candidateInitials: 'AB',
  },
];

export const VerificationVisualizer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [searchQuery, setSearchQuery] = useState('Fix Paystack Checkout Bug');
  const [activeGig, setActiveGig] = useState<GigPreset>(GIG_PRESETS[0]);
  
  // Terminal typing simulation
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [verifiedSkills, setVerifiedSkills] = useState<string[]>([]);
  const [escrowAmount, setEscrowAmount] = useState(0);

  const getSnippetsForGig = (gig: GigPreset) => [
    `> SEARCHING GIG DISPATCH DATABASE: "${gig.title}"`,
    `> Budget: $${gig.budget} USD (approx. ${gig.currencyGhs} GHS) | Escrow Funded 🔒`,
    `> Required Skills: [${gig.skills.join(', ')}]`,
    `> Searching active verified builders in ${gig.candidateLocation}...`,
    `  - Candidate Found: ${gig.candidateName} (${gig.candidatePhone})`,
    `  - Skill Match Score: 98% (${gig.skills.slice(0, 2).join(', ')})`,
    `> Dispatching WhatsApp Ping to candidate...`,
    `  - WhatsApp Msg: "New $${gig.budget} micro-gig available. Reply YES to claim."`,
    `> Candidate Response Received (${gig.candidatePhone}): "YES"`,
    `> Locking Smart Escrow Contract ($${gig.budget}.00 USD)...`,
    `> PASS: Escrow Verified. Gig assigned to ${gig.candidateName}.`,
    `> STATUS: In Progress (24h Delivery Countdown Started ⏱️)`
  ];

  const currentSnippets = getSnippetsForGig(activeGig);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const triggerSimulation = (gig: GigPreset) => {
    setActiveGig(gig);
    setSearchQuery(gig.title);
    setTerminalLines([]);
    setVerifiedSkills([]);
    setEscrowAmount(0);
  };

  useEffect(() => {
    if (!isVisible) return;

    setTerminalLines([]);
    setVerifiedSkills([]);
    setEscrowAmount(0);

    let lineIndex = 0;
    const snippets = getSnippetsForGig(activeGig);
    
    const interval = setInterval(() => {
      if (lineIndex < snippets.length) {
        const currentLine = snippets[lineIndex];
        if (currentLine) {
          setTerminalLines(prev => [...prev, currentLine]);
        }
        
        if (lineIndex === 2) setVerifiedSkills(activeGig.skills.slice(0, 2));
        if (lineIndex === 4) setVerifiedSkills(activeGig.skills);
        if (lineIndex === 9) setEscrowAmount(activeGig.budget);
        if (lineIndex === 10) setVerifiedSkills(prev => [...prev, 'Escrow Secured']);
        
        lineIndex++;
      } else {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isVisible, activeGig.id]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase();
    const found = GIG_PRESETS.find(g => 
      g.title.toLowerCase().includes(query) || 
      g.skills.some(s => s.toLowerCase().includes(query))
    ) || GIG_PRESETS[0];

    triggerSimulation(found);
  };

  const isCompleted = terminalLines.length === currentSnippets.length;

  return (
    <div className="verification-visualizer" ref={containerRef} style={{ margin: 'var(--spacing-xl) 0', position: 'relative' }}>
      <style>{`
        .visualizer-search-box {
          max-width: 680px;
          margin: 0 auto 24px auto;
          position: relative;
        }

        .search-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-input-wrap input {
          width: 100%;
          padding: 14px 48px 14px 44px;
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          background-color: var(--color-surface);
          color: var(--color-text-primary);
          font-size: 0.95rem;
          font-weight: 500;
          outline: none;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          transition: all 0.2s ease;
        }

        .search-input-wrap input:focus {
          border-color: var(--color-accent);
          box-shadow: 0 0 20px var(--color-accent-subtle);
        }

        .search-icon-left {
          position: absolute;
          left: 14px;
          color: var(--color-accent);
          pointer-events: none;
        }

        .search-btn-right {
          position: absolute;
          right: 8px;
          padding: 6px 14px;
          border-radius: var(--radius-md);
          background-color: var(--color-accent);
          color: #000;
          font-weight: 700;
          font-size: 0.8rem;
          border: none;
          cursor: pointer;
        }

        .search-pills {
          display: flex;
          gap: 8px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 10px;
        }

        .search-pill {
          padding: 5px 12px;
          border-radius: 20px;
          border: 1px solid var(--color-border);
          background-color: var(--color-surface-elevated);
          color: var(--color-text-secondary);
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .search-pill.active, .search-pill:hover {
          border-color: var(--color-accent);
          color: var(--color-accent);
          background-color: var(--color-accent-subtle);
        }

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
          background-color: #0d1117;
          border: 1px solid #30363d;
          border-radius: var(--radius-md);
          overflow: hidden;
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: #c9d1d9;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          height: 360px;
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
          height: 360px;
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

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '10px', letterSpacing: '-0.02em' }}>
          Instant WhatsApp Job Dispatch
        </h3>
        <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', maxWidth: '620px', margin: '0 auto', lineHeight: 1.5 }}>
          Watch how a newly posted micro-gig searches verified African builders, dispatches a WhatsApp ping, locks escrow, and assigns the work in seconds.
        </p>

        {/* Preset Gig Action Buttons */}
        <div className="search-pills" style={{ marginTop: '16px' }}>
          {GIG_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => triggerSimulation(preset)}
              className={`search-pill ${activeGig.id === preset.id ? 'active' : ''}`}
            >
              ⚡ {preset.title} (${preset.budget})
            </button>
          ))}
        </div>
      </div>

      <div className="visualizer-grid">
        {/* Left Pane: Terminal */}
        <div className="terminal-pane">
          <div className="terminal-header">
            <div className="terminal-dot" style={{ backgroundColor: '#ff5f56' }}></div>
            <div className="terminal-dot" style={{ backgroundColor: '#ffbd2e' }}></div>
            <div className="terminal-dot" style={{ backgroundColor: '#27c93f' }}></div>
            <span style={{ marginLeft: '8px', color: '#8b949e', fontSize: '0.75rem' }}>job_dispatcher.sh</span>
          </div>
          <div className="terminal-body">
            {terminalLines.filter(Boolean).map((line, i) => (
              <div key={i} className="terminal-line" style={{ 
                color: line?.includes('PASS') ? '#2ea043' : line?.includes('Candidate') || line?.includes('Response') ? '#79c0ff' : line?.includes('STATUS') ? '#e3b341' : 'inherit' 
              }}>
                {line}
              </div>
            ))}
            {terminalLines.length > 0 && !isCompleted && (
              <div className="pulse-loader" style={{ marginTop: '8px', width: '8px', height: '8px', backgroundColor: '#8b949e' }}></div>
            )}
          </div>
        </div>

        {/* Right Pane: Live Job Match Card */}
        <div className={`verified-pane ${isCompleted ? 'completed' : ''}`}>
          
          <div className={`scanning-overlay ${terminalLines.length > 1 ? 'hidden' : ''}`}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-tertiary)', fontSize: '0.85rem' }}>
               <div className="pulse-loader"></div>
               Dispatching gig search query...
             </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
             <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-accent)', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '4px' }}>
                  {isCompleted ? '⚡ GIG ASSIGNED & ESCROW LOCKED' : 'SEARCHING BUILDER MATCH...'}
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>{activeGig.title}</div>
             </div>
             <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.65rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', fontWeight: 700 }}>Escrow Amount</div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: escrowAmount > 0 ? '#34d399' : 'var(--color-text-tertiary)', transition: 'color 0.3s' }}>
                  ${escrowAmount}.00
                </div>
             </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>Required Verified Skills:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', minHeight: '30px' }}>
              {verifiedSkills.map((skill, idx) => (
                <span key={idx} className="badge badge-accent animated-badge" style={{ fontSize: '0.72rem', padding: '3px 8px', borderRadius: '4px' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--color-surface)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', marginBottom: 'auto' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '4px' }}>
              Assigned Talent
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--color-accent-subtle)', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem' }}>
                {activeGig.candidateInitials}
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{activeGig.candidateName}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)' }}>{activeGig.candidateLocation} • WhatsApp Verified</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 'auto', borderTop: '1px solid var(--color-border)', paddingTop: '12px' }}>
             <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
               {isCompleted ? (
                  <span className="animated-badge" style={{ color: '#34d399', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Claimed in 3.4s via WhatsApp! Escrow locked in wallet.
                  </span>
               ) : (
                 <span style={{ color: 'var(--color-text-tertiary)' }}>Dispatching WhatsApp ping to candidate...</span>
               )}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};
