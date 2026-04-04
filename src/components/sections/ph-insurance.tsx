'use client';

import { useState, useEffect, useRef } from 'react';
import { AseanBarChart, AgeDemographicsPie, InsuranceRatePie, FinancialRuinChart } from '@/components/charts/insurance-charts';
import { aseanComparison, lifeStages, ofwStats, ageDemographics, competitors, pcxAdvantages, dailyPricing, archetypes, type Archetype } from '@/lib/data';
import { useGsapContext, useGsapScrollReveal, gsap } from '@/lib/gsap-engine';

type PhView = 'overview' | 'asean' | 'demographics' | 'lifecycle' | 'ofw' | 'future' | 'competitive';

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

  // GSAP: counter animation for numeric stats in overview
  useGsapContext(() => {
    gsap.utils.toArray<HTMLElement>('[data-gsap-counter]').forEach((el) => {
      const target = parseFloat(el.dataset.gsapCounter || '0');
      const prefix = el.dataset.gsapPrefix || '';
      const suffix = el.dataset.gsapSuffix || '';
      const decimals = parseInt(el.dataset.gsapDecimals || '0');
      const obj = { value: 0 };

      gsap.to(obj, {
        value: target,
        duration: 2,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: el,
          start: 'center 80%',
          once: true,
        },
        onUpdate: () => {
          const display = decimals > 0 ? obj.value.toFixed(decimals) : Math.round(obj.value);
          el.textContent = `${prefix}${display}${suffix}`;
        },
      });
    });
  });

  // GSAP: scroll reveal for .reveal-section elements
  useGsapScrollReveal();

  const navItems: { id: PhView; label: string; emoji: string }[] = [
    { id: 'overview', label: 'Overview', emoji: '📊' },
    { id: 'asean', label: 'ASEAN', emoji: '🌏' },
    { id: 'demographics', label: 'Demo', emoji: '👥' },
    { id: 'lifecycle', label: 'Lifecycle', emoji: '🔄' },
    { id: 'ofw', label: 'OFW', emoji: '✈️' },
    { id: 'future', label: 'Future', emoji: '🔮' },
    { id: 'competitive', label: 'Intel', emoji: '🔍' },
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
              <p className="font-display text-5xl sm:text-6xl" style={{ color: 'var(--accent-red)' }} data-gsap-counter="1.79" data-gsap-suffix="%" data-gsap-decimals="2">1.79%</p>
              <p className="font-display text-xl mt-1">INSURANCE PENETRATION</p>
              <p className="font-mono text-xs mt-2" style={{ color: 'var(--text-muted)' }}>One of the lowest in ASEAN</p>
            </div>
          </RevealSection>

          <RevealSection delay={100}>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Insurance Density', value: '$75.05', sub: 'per capita / year', accent: 'var(--accent-red)', numeric: false },
                { label: 'Uninsured', value: '70%', sub: 'beyond PhilHealth', accent: 'var(--accent-yellow)', numeric: true, target: 70, suffix: '%' },
                { label: 'Medical Inflation', value: '11-12%', sub: 'annually', accent: 'var(--accent-red)', numeric: false },
                { label: 'OFW Population', value: '2.2M', sub: 'working abroad', accent: 'var(--accent-yellow)', numeric: true, target: 2.2, suffix: 'M', decimals: 1 },
              ].map((stat, i) => (
                <div key={i} className="panel text-center">
                  <p className="stat-label">{stat.label}</p>
                  <p
                    className="font-display text-2xl mt-1"
                    style={{ color: stat.accent }}
                    {...(stat.numeric ? {
                      'data-gsap-counter': String(stat.target),
                      'data-gsap-suffix': stat.suffix,
                      'data-gsap-decimals': String(stat.decimals || 0),
                    } : {})}
                  >
                    {stat.value}
                  </p>
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

      {view === 'competitive' && (
        <div className="space-y-4">
          <RevealSection>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="panel-header" style={{ border: 'none', margin: 0, padding: 0 }}>COMPETITIVE INTELLIGENCE</h3>
              <span className="arch-badge arch-badge-eagle">Eagle</span>
              <span className="arch-badge arch-badge-beaver">Beaver</span>
              <span className="arch-badge arch-badge-ant">Ant</span>
              <span className="arch-badge arch-badge-owl">Owl</span>
            </div>
            <p className="font-mono mt-1" style={{ color: 'var(--text-muted)' }}>Archetype-powered competitive landscape analysis</p>
          </RevealSection>

          {/* ── Archetype Overview Grid ── */}
          <RevealSection delay={50}>
            <div className="grid grid-cols-2 gap-3">
              {(Object.keys(archetypes) as Archetype[]).map((key) => {
                const a = archetypes[key];
                return (
                  <div key={key} className="hover-card p-3" style={{ borderTop: `3px solid ${a.color}` }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg" aria-hidden="true">{a.icon}</span>
                      <span className="font-sub text-sm" style={{ color: a.color }}>{a.name}</span>
                    </div>
                    <p className="font-mono text-xs mb-2" style={{ color: 'var(--text-muted)', fontSize: '0.6rem' }}>{a.tagline}</p>
                    <p className="font-mono" style={{ color: 'var(--text-dim)', fontSize: '0.55rem' }}>{a.products.join(', ')}</p>
                  </div>
                );
              })}
            </div>
          </RevealSection>

          {/* ── Competitor Comparison Table ── */}
          <RevealSection delay={100}>
            <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
              <div className="p-3" style={{ borderBottom: '1px solid var(--border)' }}>
                <p className="font-sub text-xs" style={{ color: 'var(--accent-red)' }}>⚔️ COMPETITOR LANDSCAPE</p>
              </div>
              <div style={{ overflowX: 'auto', scrollbarWidth: 'thin' }}>
                <table className="arch-comparison-table">
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left' }}>Competitor</th>
                      <th>Type</th>
                      <th>Positioning</th>
                      <th>Strength</th>
                      <th>Weakness</th>
                      <th>Market</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitors.map((c, i) => (
                      <tr key={i}>
                        <td>
                          <span className="competitor-name" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <span style={{ width: '8px', height: '8px', background: c.colors[0], display: 'inline-block', flexShrink: 0 }} />
                            {c.name}
                          </span>
                        </td>
                        <td><span className="arch-badge arch-badge-sm">{c.type}</span></td>
                        <td style={{ fontSize: '0.6rem' }}>{c.positioning}</td>
                        <td style={{ fontSize: '0.6rem', color: 'var(--accent-green)' }}>{c.keyDifferentiator}</td>
                        <td style={{ fontSize: '0.6rem', color: 'var(--accent-red)' }}>{c.weakness}</td>
                        <td><span className="font-mono" style={{ fontSize: '0.55rem' }}>{c.marketShare}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </RevealSection>

          {/* ── PCX Advantages (Owl Stat Cards) ── */}
          <RevealSection delay={150}>
            <div className="flex items-center gap-2 mb-1">
              <p className="font-sub text-sm" style={{ color: 'var(--accent-yellow)' }}>🦉 PCX ADVANTAGES</p>
              <span className="arch-badge arch-badge-owl">Owl Archetype</span>
            </div>
            <p className="font-mono mb-3" style={{ color: 'var(--text-dim)', fontSize: '0.55rem' }}>8 competitive edges — know them, use them</p>
          </RevealSection>

          <div className="grid grid-cols-1 gap-3" style={{ maxHeight: '384px', overflowY: 'auto', scrollbarWidth: 'thin' }}>
            {pcxAdvantages.map((adv, i) => (
              <RevealSection key={i} delay={200 + i * 40}>
                <div className="arch-card-owl-stat">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="arch-card-owl-stat-number" style={{ color: 'var(--accent-yellow)' }}>{String(i + 1).padStart(2, '0')}</p>
                      <p className="arch-card-owl-stat-explanation" style={{ color: 'var(--text)' }}>{adv.area}</p>
                      <p className="arch-card-owl-stat-source" style={{ color: 'var(--accent-green)' }}>{adv.advantage}</p>
                    </div>
                    <div className="flex gap-1 flex-wrap justify-end" style={{ maxWidth: '120px' }}>
                      {adv.competitors.map((comp, j) => (
                        <span key={j} className="arch-badge arch-badge-sm" style={{ borderColor: 'var(--accent-red)', color: 'var(--accent-red)', opacity: 0.7 }}>{comp}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>

          {/* ── Daily Pricing (Beaver Price Chips) ── */}
          <RevealSection delay={300}>
            <div className="flex items-center gap-2 mb-1">
              <p className="font-sub text-sm" style={{ color: '#f59e0b' }}>🦫 DAILY PRICING</p>
              <span className="arch-badge arch-badge-beaver">Beaver Archetype</span>
            </div>
            <p className="font-mono mb-3" style={{ color: 'var(--text-dim)', fontSize: '0.55rem' }}>Gen-Z friendly: show the daily cost, not the scary annual</p>
          </RevealSection>

          <RevealSection delay={350}>
            <div className="panel" style={{ border: '2px solid #f59e0b', background: 'rgba(245, 158, 11, 0.06)' }}>
              <p className="font-sub text-xs mb-3" style={{ color: '#f59e0b' }}>FLEXISHIELD — FS 200 (Best Value)</p>
              <div className="space-y-2">
                {dailyPricing.flexiShield.map((tier, i) => (
                  <div key={i} className="arch-price-beaver">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="arch-price-beaver-daily font-display" style={{ color: '#f59e0b' }}>
                          <span className="arch-price-beaver-daily-unit">₱</span>{tier.daily}
                        </span>
                        <span className="font-mono" style={{ color: 'var(--text-dim)', fontSize: '0.55rem' }}>/day</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="arch-price-beaver-equals font-mono" style={{ color: 'var(--text-dim)', fontSize: '0.55rem' }}>=</span>
                        <span className="arch-price-beaver-annual font-mono" style={{ color: 'var(--text-muted)', fontSize: '0.6rem', textDecoration: 'line-through' }}>₱{tier.annual.toLocaleString()}/yr</span>
                        <span className="arch-price-beaver-badge font-mono" style={{ color: '#f59e0b', fontSize: '0.6rem' }}>Age {tier.age}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>

          <RevealSection delay={400}>
            <div className="panel" style={{ border: '2px solid #00d4ff', background: 'rgba(0, 212, 255, 0.06)' }}>
              <p className="font-sub text-xs mb-3" style={{ color: '#00d4ff' }}>BLUE ROYALE — Plans A/B/C (Age 19-25)</p>
              <div className="space-y-2">
                {dailyPricing.blueRoyale.map((plan, i) => (
                  <div key={i} className="price-daily">
                    <span className="price-daily-amount font-display" style={{ color: '#00d4ff' }}>
                      ${plan.daily}
                    </span>
                    <span className="price-daily-label font-mono" style={{ color: 'var(--text-dim)', fontSize: '0.55rem' }}>/day — {plan.plan}</span>
                    <span className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '0.55rem', marginLeft: 'auto' }}>₱{(plan.annual * 58).toLocaleString()}/yr est.</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>

          {/* ── Quick Relatable Comparisons ── */}
          <RevealSection delay={450}>
            <div className="sticker-accent" style={{ transform: 'rotate(-2deg)' }}>
              ☕ FlexiShield FS 200 starts at ₱18/day — less than your daily coffee!
            </div>
          </RevealSection>

          <RevealSection delay={500}>
            <div className="sticker" style={{ transform: 'rotate(1deg)' }}>
              🦅 Blue Royale from $5/day — worldwide coverage for the price of a lunch!
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
