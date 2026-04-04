'use client';

import React, { useState } from 'react';

interface ModeGatewayProps {
  onModeSelect: (mode: 'advisor' | 'client') => void;
}

export function ModeGateway({ onModeSelect }: ModeGatewayProps) {
  const [closing, setClosing] = useState(false);

  const handleSelect = (mode: 'advisor' | 'client') => {
    setClosing(true);
    // Persist to localStorage
    try {
      localStorage.setItem('pcx-mode', mode);
    } catch { /* ignore */ }
    setTimeout(() => {
      onModeSelect(mode);
    }, 500);
  };

  return (
    <div className={`mode-gateway ${closing ? 'closing' : ''}`}>
      {/* Background grid lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(var(--grid-border) 1px, transparent 1px), linear-gradient(90deg, var(--grid-border) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          opacity: 0.3,
        }}
      />

      <div className="mode-gateway-inner" style={{ position: 'relative', zIndex: 1 }}>
        {/* Title */}
        <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
          <span className="font-display" style={{ fontSize: '0.8rem', color: 'var(--text-dim)', letterSpacing: '0.2em' }}>
            PACIFIC×CROSS
          </span>
        </div>

        {/* Advisor Tile */}
        <button
          className="mode-tile mode-tile-advisor card-comic-lg"
          onClick={() => handleSelect('advisor')}
          style={{ border: '2px solid var(--border)' }}
        >
          <div data-archetype="eagle">
            <div className="mode-tile-icon" style={{ color: 'var(--accent-red)' }}>
              ⚡
            </div>
            <div className="mode-tile-title" style={{ color: 'var(--text)' }}>
              ADVISOR MODE
            </div>
            <div className="mode-tile-desc">
              Full editorial command center with tools, spiels, social content, pricing calculators, and campaign templates.
            </div>
            <div className="mode-tile-accent">
              3-Column Grid · Tools · Strategy
            </div>
            <span className="arch-badge arch-badge-eagle arch-badge-sm">Eagle — Premium Tools</span>
          </div>
        </button>

        {/* Client Tile */}
        <button
          className="mode-tile mode-tile-client card-comic-lg"
          onClick={() => handleSelect('client')}
          style={{ border: '2px solid var(--border)' }}
        >
          <div data-archetype="beaver">
            <div className="mode-tile-icon" style={{ color: 'var(--accent-cyan)' }}>
              🛡️
            </div>
            <div className="mode-tile-title" style={{ color: 'var(--text)' }}>
              CLIENT MODE
            </div>
            <div className="mode-tile-desc">
              Card-based discovery experience. Explore products, take the lifestyle quiz, and find the protection that fits your vibe.
            </div>
            <div className="mode-tile-accent">
              Single Column · Discovery · Quiz
            </div>
            <span className="arch-badge arch-badge-beaver arch-badge-sm">Beaver — Discovery Mode</span>
          </div>
        </button>
      </div>

      {/* Bottom tagline */}
      <div style={{ position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)' }}>
        <p className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--text-dim)', textAlign: 'center', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
          TRUSTED OVER
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          <span className="competitor-badge-maxicare">Maxicare</span>
          <span className="competitor-badge-intellicare">Intellicare</span>
          <span className="competitor-badge-sunlife">Sun Life</span>
          <span className="competitor-badge-philhealth">PhilHealth</span>
        </div>
        <p className="font-mono" style={{ fontSize: '0.5rem', color: 'var(--text-dim)', textAlign: 'center', letterSpacing: '0.1em', marginTop: '0.5rem' }}>
          CHOOSE YOUR EXPERIENCE
        </p>
      </div>
    </div>
  );
}
