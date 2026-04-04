'use client';

import React from 'react';
import { misconceptions, stats, products, aseanComparison } from '@/lib/data';

// ============================================================
// MYTH BUSTER CARD
// ============================================================
function MythBusterCard() {
  const items = misconceptions.slice(0, 3);
  return (
    <div data-archetype="owl" className="social-card social-card-myth card-comic">
      <div className="social-card-header">
        Myth vs Fact
        <span className="arch-badge arch-badge-owl arch-badge-sm">Owl Fact-Check</span>
      </div>
      <div className="social-card-body" style={{ padding: 0 }}>
        {items.map((item, i) => (
          <div key={i} className="myth-item">
            <div className="flex items-start gap-2 mb-1.5">
              <span className="myth-label myth-label-x">MYTH</span>
            </div>
            <p style={{ color: 'var(--text)', fontSize: '0.65rem', marginBottom: '0.5rem' }}>
              {item.myth}
            </p>
            <div className="flex items-start gap-2 mb-1.5">
              <span className="myth-label myth-label-check">FACT</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.6rem' }}>
              {item.fact}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// HOSPITAL BILLS CARD
// ============================================================
function HospitalBillsCard() {
  return (
    <div data-archetype="eagle" className="social-card social-card-hospital card-comic">
      <div className="social-card-header">
        Hospital Bills Reality
        <span className="arch-badge arch-badge-eagle arch-badge-sm">Eagle Data</span>
      </div>
      <div className="social-card-body">
        <div className="bill-comparison">
          <div className="bill-side bill-side-before">
            <p className="font-sub" style={{ fontSize: '0.65rem', color: 'var(--accent-red)', marginBottom: '0.5rem' }}>
              WITHOUT INSURANCE
            </p>
            <div className="font-display" style={{ fontSize: '1.8rem', color: 'var(--accent-red)' }}>
              ₱500K+
            </div>
            <p className="font-mono" style={{ fontSize: '0.55rem', color: 'var(--text-dim)', marginTop: '0.25rem' }}>
              ICU bill
            </p>
            <p className="font-mono" style={{ fontSize: '0.55rem', color: 'var(--text-dim)', marginTop: '0.15rem' }}>
              ₱1.2M cancer treatment
            </p>
          </div>
          <div className="bill-side bill-side-after">
            <p className="font-sub" style={{ fontSize: '0.65rem', color: 'var(--accent-green)', marginBottom: '0.5rem' }}>
              WITH INSURANCE
            </p>
            <div className="font-display" style={{ fontSize: '1.8rem', color: 'var(--accent-green)' }}>
              ₱0
            </div>
            <p className="font-mono" style={{ fontSize: '0.55rem', color: 'var(--text-dim)', marginTop: '0.25rem' }}>
              No-cash-outlay
            </p>
            <p className="font-mono" style={{ fontSize: '0.55rem', color: 'var(--text-dim)', marginTop: '0.15rem' }}>
              Show card, walk out
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CHOOSE YOUR ARMOR CARD
// ============================================================
function ChooseYourArmorCard() {
  return (
    <div className="social-card social-card-armor card-comic-lg">
      <div className="social-card-header">
        Choose Your Armor
        <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.25rem' }}>
          <span className="arch-badge arch-badge-beaver arch-badge-sm">Beaver Pick</span>
          <span className="arch-badge arch-badge-eagle arch-badge-sm">Eagle Premium</span>
        </div>
      </div>
      <div className="armor-comparison">
        <div className="armor-side armor-side-flexi">
          <span style={{ fontSize: '2rem' }} aria-hidden="true">🛡️</span>
          <p className="font-sub" style={{ fontSize: '0.85rem', color: 'var(--accent-yellow)', margin: '0.5rem 0 0.25rem' }}>
            FLEXISHIELD
          </p>
          <p className="font-mono" style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>
            Hospital Hero
          </p>
          <p className="font-mono" style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>
            From ₱6,510/yr
          </p>
          <div className="arch-price-beaver-daily" style={{ marginTop: '0.25rem' }}>
            <span className="arch-price-beaver-daily-unit">₱18</span>/day
          </div>
          <p className="font-mono" style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>
            PHP 2M coverage
          </p>
        </div>
        <div className="armor-side armor-side-blue">
          <span style={{ fontSize: '2rem' }} aria-hidden="true">👑</span>
          <p className="font-sub" style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', margin: '0.5rem 0 0.25rem' }}>
            BLUE ROYALE
          </p>
          <p className="font-mono" style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>
            Legacy Boss
          </p>
          <p className="font-mono" style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>
            From $1,676/yr
          </p>
          <div className="price-daily" style={{ marginTop: '0.25rem' }}>
            <span className="price-daily-amount">$5</span>
            <span className="price-daily-label">/day</span>
          </div>
          <p className="font-mono" style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>
            USD 2M worldwide
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// EDUCATOR CARD
// ============================================================
function EducatorCard() {
  const analogies = [
    { icon: '📶', text: 'Insurance = Wifi for life. You don\'t notice it until it\'s gone.' },
    { icon: '🛡️', text: 'Insurance = Armor. You hope you never need it, but you\'re glad it\'s there.' },
    { icon: '🏠', text: 'Insurance = Heirloom. Pass it on. Protect the next generation.' },
  ];
  return (
    <div data-archetype="ant" className="social-card social-card-educator card-comic">
      <div className="social-card-header">
        Educator, Not Seller
        <span className="arch-badge arch-badge-ant arch-badge-sm">Ant Wisdom</span>
      </div>
      <div className="social-card-body">
        <p className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--text-dim)', marginBottom: '0.75rem' }}>
          Use analogies that hit different:
        </p>
        {analogies.map((item, i) => (
          <div key={i} className="educator-quote" style={{ marginBottom: i < 2 ? '0.75rem' : 0 }}>
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// PH DATA CARD
// ============================================================
function PHDataCard() {
  const dataBars = [
    { label: 'PH Insurance Penetration', value: 1.79, max: 10, color: 'var(--accent-red)' },
    { label: 'ASEAN Average', value: 3.5, max: 10, color: 'var(--accent-yellow)' },
    { label: 'Singapore', value: 6.75, max: 10, color: 'var(--accent-cyan)' },
    { label: 'Filipinos Uninsured', value: 70, max: 100, color: 'var(--accent-red)', suffix: '%' },
  ];
  return (
    <div data-archetype="owl" className="social-card social-card-data card-comic">
      <div className="social-card-header">
        PH Insurance Data
        <span className="arch-badge arch-badge-owl arch-badge-sm">Owl Stats</span>
      </div>
      <div className="social-card-body">
        {dataBars.map((bar, i) => (
          <div key={i} className="data-bar-container">
            <div className="data-bar-label">
              <span style={{ color: 'var(--text)' }}>{bar.label}</span>
              <span style={{ color: bar.color, fontWeight: 700 }}>
                {bar.value}{bar.suffix || '%'}
              </span>
            </div>
            <div className="data-bar">
              <div
                className="data-bar-fill"
                style={{
                  width: `${(bar.value / bar.max) * 100}%`,
                  background: bar.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// VISION CARD
// ============================================================
function VisionCard() {
  return (
    <div data-archetype="eagle" className="social-card social-card-vision card-comic-lg">
      <div className="social-card-header">
        Your Future. No Cap.
        <span className="arch-badge arch-badge-eagle arch-badge-sm">Eagle Vision</span>
      </div>
      <div className="vision-text panel-gradient-orange" style={{ color: 'var(--bg)' }}>
        <div style={{ fontSize: '0.7rem', marginBottom: '0.5rem', fontFamily: "'DM Mono', monospace", fontWeight: 400 }}>
          Your Aspiration
        </div>
        PROTECT YOUR FUTURE.
        <br />
        NO CAP.
      </div>
      <div className="social-card-body" style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '0.6rem' }}>
          Insurance isn&apos;t about old people or boring paperwork.
          <br />
          It&apos;s about <span className="highlight-yellow">wealth armor</span> for the life you&apos;re building.
        </p>
      </div>
    </div>
  );
}

// ============================================================
// SOCIAL CARDS GALLERY
// ============================================================
interface SocialCardsProps {
  compact?: boolean;
}

export function SocialCards({ compact = false }: SocialCardsProps) {
  return (
    <div className="space-y-4">
      {!compact && (
        <div>
          <h3 className="panel-header" style={{ border: 'none', margin: 0, padding: 0 }}>
            Social Card Templates
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
            <span className="arch-badge arch-badge-ant arch-badge-sm">Ant Gallery</span>
            <p className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '0.6rem' }}>
              6 themed cards for your social media content
            </p>
          </div>
        </div>
      )}
      <div className={compact ? 'space-y-3' : 'grid gap-4 md:grid-cols-2'}>
        <MythBusterCard />
        <HospitalBillsCard />
        <ChooseYourArmorCard />
        <EducatorCard />
        <PHDataCard />
        <VisionCard />
      </div>
    </div>
  );
}

// Individual card exports for use in other components
export { MythBusterCard, HospitalBillsCard, ChooseYourArmorCard, EducatorCard, PHDataCard, VisionCard };
