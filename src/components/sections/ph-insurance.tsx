'use client';

import { useState, useEffect, useRef } from 'react';
import { AseanBarChart, AgeDemographicsPie, InsuranceRatePie, FinancialRuinChart } from '@/components/charts/insurance-charts';
import { aseanComparison, lifeStages, ofwStats, ageDemographics } from '@/lib/data';

type PhView = 'overview' | 'asean' | 'demographics' | 'lifecycle' | 'ofw' | 'future';

function RevealSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => setVisible(true), delay); obs.unobserve(el); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
      {children}
    </div>
  );
}

export function PhInsuranceSection() {
  const [view, setView] = useState<PhView>('overview');

  const navItems: { id: PhView; label: string; emoji: string }[] = [
    { id: 'overview', label: 'Overview', emoji: '📊' },
    { id: 'asean', label: 'ASEAN', emoji: '🌏' },
    { id: 'demographics', label: 'Demo', emoji: '👥' },
    { id: 'lifecycle', label: 'Lifecycle', emoji: '🔄' },
    { id: 'ofw', label: 'OFW', emoji: '✈️' },
    { id: 'future', label: 'Future', emoji: '🔮' },
  ];

  return (
    <div className="space-y-6 pb-8">
      <RevealSection>
        <div>
          <h2 className="section-title">PH Insurance<br/>Big Picture</h2>
          <p className="section-subtitle mt-1">Understanding the Philippine insurance landscape</p>
        </div>
      </RevealSection>

      <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'thin' }}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={view === item.id ? 'btn-cta' : 'btn-ghost'}
          >
            {item.emoji} {item.label}
          </button>
        ))}
      </div>

      {view === 'overview' && (
        <div className="space-y-4">
          <RevealSection>
            <div className="p-6 text-center" style={{ border: '3px solid var(--accent-red)', background: 'var(--bg)' }}>
              <p className="font-display text-5xl sm:text-6xl" style={{ color: 'var(--accent-red)' }}>1.79%</p>
              <p className="font-display text-xl mt-1">INSURANCE PENETRATION</p>
              <p className="font-mono text-xs mt-2" style={{ color: 'var(--text-muted)' }}>One of the lowest in ASEAN</p>
            </div>
          </RevealSection>

          <RevealSection delay={100}>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Insurance Density', value: '$75.05', sub: 'per capita / year', accent: 'var(--accent-red)' },
                { label: 'Uninsured', value: '70%', sub: 'beyond PhilHealth', accent: 'var(--accent-yellow)' },
                { label: 'Medical Inflation', value: '11-12%', sub: 'annually', accent: 'var(--accent-red)' },
                { label: 'OFW Population', value: '2.2M', sub: 'working abroad', accent: 'var(--accent-yellow)' },
              ].map((stat, i) => (
                <div key={i} className="panel text-center">
                  <p className="stat-label">{stat.label}</p>
                  <p className="font-display text-2xl mt-1" style={{ color: stat.accent }}>{stat.value}</p>
                  <p className="font-mono" style={{ color: 'var(--text-dim)', fontSize: '0.55rem' }}>{stat.sub}</p>
                </div>
              ))}
            </div>
          </RevealSection>

          <RevealSection delay={200}>
            <div className="panel">
              <h3 className="panel-header">Top Causes of Financial Ruin</h3>
              <FinancialRuinChart />
            </div>
          </RevealSection>

          <RevealSection delay={300}>
            <div className="sticker" style={{ transform: 'rotate(1deg)' }}>
              🇵🇭 The Philippines has enormous untapped potential — be part of the change!
            </div>
          </RevealSection>
        </div>
      )}

      {view === 'asean' && (
        <div className="space-y-4">
          <RevealSection>
            <div>
              <h3 className="panel-header" style={{ border: 'none', margin: 0, padding: 0 }}>ASEAN Comparison</h3>
              <p className="font-mono mt-1" style={{ color: 'var(--text-muted)' }}>How the Philippines stacks up</p>
            </div>
          </RevealSection>

          <RevealSection delay={100}>
            <div className="panel">
              <p className="font-mono text-xs text-center mb-3" style={{ color: 'var(--text-muted)' }}>Insurance Penetration Rate (%) — ASEAN Countries</p>
              <AseanBarChart />
            </div>
          </RevealSection>

          <RevealSection delay={200}>
            <div className="panel" style={{ border: '2px solid var(--accent-red)', background: 'var(--accent-red-dim)' }}>
              <p className="font-sub text-sm mb-3" style={{ color: 'var(--accent-red)' }}>⚠️ KEY INSIGHTS:</p>
              <ul className="space-y-2 font-mono text-xs">
                {[
                  '→ Philippines has the 2nd lowest penetration in ASEAN',
                  '→ Singapore leads at 6.75% — 3.8x the Philippines',
                  '→ Even Indonesia (3.18%) has nearly 2x our rate',
                  '→ The gap = MASSIVE opportunity for advisors',
                  '→ If PH reached ASEAN average (3.5%), that\'s ₱500B+ in new premiums',
                ].map((item, i) => (
                  <li key={i} style={{ color: 'var(--text-muted)' }}>{item}</li>
                ))}
              </ul>
            </div>
          </RevealSection>
        </div>
      )}

      {view === 'demographics' && (
        <div className="space-y-4">
          <RevealSection>
            <div>
              <h3 className="panel-header" style={{ border: 'none', margin: 0, padding: 0 }}>Demographics</h3>
              <p className="font-mono mt-1" style={{ color: 'var(--text-muted)' }}>Who buys insurance in the Philippines</p>
            </div>
          </RevealSection>

          <RevealSection>
            <div className="panel">
              <p className="font-mono text-xs text-center mb-3" style={{ color: 'var(--text-muted)' }}>Population Distribution by Age Group</p>
              <AgeDemographicsPie />
            </div>
          </RevealSection>

          <RevealSection>
            <div className="panel">
              <p className="font-mono text-xs text-center mb-3" style={{ color: 'var(--text-muted)' }}>Insurance Ownership Rate by Age</p>
              <InsuranceRatePie />
            </div>
          </RevealSection>

          <RevealSection>
            <p className="font-sub text-sm" style={{ color: 'var(--accent-red)' }}>📊 Insurance Rate by Age Group</p>
          </RevealSection>
          {ageDemographics.map((d, i) => {
            const maxRate = Math.max(...ageDemographics.map(x => x.insuranceRate));
            const pct = (d.insuranceRate / maxRate) * 100;
            return (
              <RevealSection key={i} delay={i * 50}>
                <div className="panel">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>{d.range}</span>
                    <span className="font-sub text-sm" style={{ color: i % 2 === 0 ? 'var(--accent-yellow)' : 'var(--accent-red)' }}>{d.insuranceRate}%</span>
                  </div>
                  <div className="w-full h-2" style={{ background: 'var(--bg-elevated)' }}>
                    <div
                      className="h-full transition-all duration-700"
                      style={{ width: `${pct}%`, background: i % 2 === 0 ? 'var(--accent-yellow)' : 'var(--accent-red)' }}
                    />
                  </div>
                </div>
              </RevealSection>
            );
          })}

          <RevealSection>
            <div className="sticker-accent" style={{ transform: 'rotate(-2deg)' }}>
              💡 Sweet spot: 35-54 age group has highest insurance rates — but massive room to grow!
            </div>
          </RevealSection>
        </div>
      )}

      {view === 'lifecycle' && (
        <div className="space-y-4">
          <RevealSection>
            <div>
              <h3 className="panel-header" style={{ border: 'none', margin: 0, padding: 0 }}>Life Stage Value Cycle</h3>
              <p className="font-mono mt-1" style={{ color: 'var(--text-muted)' }}>Insurance needs evolve through life</p>
            </div>
          </RevealSection>

          <div className="relative pl-6">
            <div className="absolute left-[7px] top-0 bottom-0 w-px" style={{ background: 'var(--border)' }} />
            {lifeStages.map((stage, i) => (
              <RevealSection key={i} delay={i * 100}>
                <div className="relative mb-4">
                  <div
                    className="absolute -left-6 top-2 w-4 h-4"
                    style={{ background: stage.color, border: '1px solid var(--border)' }}
                  />
                  <div className="hover-card p-4" style={{ borderLeft: `4px solid ${stage.color}` }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{stage.emoji}</span>
                      <div>
                        <span className="font-sub text-sm">{stage.stage}</span>
                        <span className="font-mono ml-2" style={{ color: 'var(--text-dim)', fontSize: '0.6rem' }}>({stage.age})</span>
                      </div>
                    </div>
                    <p className="font-mono text-xs mb-1" style={{ color: 'var(--text-muted)' }}>💰 Income: {stage.income}</p>
                    <p className="font-mono text-xs mb-1" style={{ color: 'var(--text-muted)' }}>🎯 Priority: {stage.priority}</p>
                    <div className="inline-block tag tag-yellow mb-2">
                      Recommended: {stage.product}
                    </div>
                    <ul className="space-y-1">
                      {stage.tips.map((tip, j) => (
                        <li key={j} className="font-mono" style={{ color: 'var(--text-dim)', fontSize: '0.6rem' }}>→ {tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      )}

      {view === 'ofw' && (
        <div className="space-y-4">
          <RevealSection>
            <div>
              <h3 className="panel-header" style={{ border: 'none', margin: 0, padding: 0 }}>OFW Opportunity</h3>
              <p className="font-mono mt-1" style={{ color: 'var(--text-muted)' }}>2.2 million OFWs need protection</p>
            </div>
          </RevealSection>

          <RevealSection>
            <div className="p-5 text-center" style={{ background: 'var(--accent-red)', border: '3px solid var(--accent-red)' }}>
              <p className="font-sub text-lg" style={{ color: 'var(--bg)' }}>OFW Market</p>
              <p className="font-display text-4xl" style={{ color: 'var(--bg)' }}>₱50B+</p>
              <p className="font-mono text-xs mt-1" style={{ color: 'var(--bg)', opacity: 0.8 }}>potential premiums untapped</p>
            </div>
          </RevealSection>

          <RevealSection delay={100}>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Total OFWs', value: '2.2M', accent: 'var(--accent-yellow)' },
                { label: 'Remittances', value: '$33.5B', accent: 'var(--accent-red)' },
              ].map((stat, i) => (
                <div key={i} className="panel text-center">
                  <p className="stat-label">{stat.label}</p>
                  <p className="font-display text-2xl mt-1" style={{ color: stat.accent }}>{stat.value}</p>
                </div>
              ))}
              <div className="panel text-center col-span-2" style={{ border: '2px solid var(--accent-red)' }}>
                <p className="stat-label">Insurance Gap</p>
                <p className="font-display text-xl mt-1" style={{ color: 'var(--accent-red)' }}>80% Inadequate Coverage</p>
              </div>
            </div>
          </RevealSection>

          <RevealSection>
            <p className="font-sub text-sm" style={{ color: 'var(--accent-red)' }}>🌍 Top OFW Destinations</p>
          </RevealSection>
          {ofwStats.topDestinations.map((dest, i) => {
            const maxPct = Math.max(...ofwStats.topDestinations.map(x => x.percent));
            const pct = (dest.percent / maxPct) * 100;
            return (
              <RevealSection key={i} delay={i * 50}>
                <div className="panel">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>{dest.emoji} {dest.country}</span>
                    <span className="font-sub text-sm" style={{ color: i % 2 === 0 ? 'var(--accent-yellow)' : 'var(--accent-red)' }}>{dest.percent}%</span>
                  </div>
                  <div className="w-full h-2" style={{ background: 'var(--bg-elevated)' }}>
                    <div
                      className="h-full transition-all duration-700"
                      style={{ width: `${pct}%`, background: i % 2 === 0 ? 'var(--accent-yellow)' : 'var(--accent-red)' }}
                    />
                  </div>
                </div>
              </RevealSection>
            );
          })}

          <RevealSection>
            <div className="sticker" style={{ transform: 'rotate(2deg)' }}>
              💡 OFWs are the PERFECT Blue Royale customers — they NEED worldwide coverage!
            </div>
          </RevealSection>
        </div>
      )}

      {view === 'future' && (
        <div className="space-y-4">
          <RevealSection>
            <div>
              <h3 className="panel-header" style={{ border: 'none', margin: 0, padding: 0 }}>What If?</h3>
              <p className="font-mono mt-1" style={{ color: 'var(--text-muted)' }}>Future PH with 50% insurance penetration</p>
            </div>
          </RevealSection>

          <RevealSection>
            <div className="p-6 text-center" style={{ border: '3px solid var(--accent-yellow)', background: 'var(--accent-yellow-dim)' }}>
              <p className="font-sub text-sm mb-3" style={{ color: 'var(--accent-yellow)' }}>IF PH REACHED 50% PENETRATION:</p>
              <div className="space-y-3">
                {[
                  { value: '₱2.5 TRILLION', sub: 'additional annual premiums' },
                  { value: '50M+ Filipinos', sub: 'newly protected families' },
                  { value: '₱15B+', sub: 'advisor commissions annually' },
                  { value: '200K+', sub: 'new advisor jobs created' },
                ].map((item, i) => (
                  <div key={i}>
                    <p className="font-display text-3xl" style={{ color: 'var(--accent-yellow)' }}>{item.value}</p>
                    <p className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>

          <RevealSection delay={200}>
            <div className="sticker-accent" style={{ transform: 'rotate(-1deg)' }}>
              🚀 You&apos;re not just selling insurance — you&apos;re building the future of Philippine healthcare protection
            </div>
          </RevealSection>

          <RevealSection delay={300}>
            <div className="panel" style={{ border: '2px solid var(--accent-yellow)' }}>
              <p className="font-sub text-sm mb-3" style={{ color: 'var(--accent-yellow)' }}>📈 Growth Drivers:</p>
              <ul className="space-y-2 font-mono text-xs">
                {[
                  '→ Universal Health Care Law (Republic Act 11223)',
                  '→ Growing middle class with disposable income',
                  '→ Digital-first insurance products lowering barriers',
                  '→ COVID-19 heightened health awareness',
                  '→ OFW market expansion',
                  '→ Social media education reducing stigma',
                ].map((item, i) => (
                  <li key={i} style={{ color: 'var(--text-muted)' }}>{item}</li>
                ))}
              </ul>
            </div>
          </RevealSection>
        </div>
      )}
    </div>
  );
}
