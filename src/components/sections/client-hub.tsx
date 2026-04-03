'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import {
  lifestyleQuiz,
  faqItems,
  getBlueRoyalePremium,
  getFlexiShieldPremium,
  blueRoyaleKeyFeatures,
  type FlexiShieldTier,
  flexiShieldTiers,
} from '@/lib/data';

type ClientView = 'wizard' | 'estimator' | 'benefits' | 'faq' | 'contact';

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

export function ClientHubSection() {
  const [view, setView] = useState<ClientView>('wizard');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '', interest: 'general' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedLifestyle, setSelectedLifestyle] = useState<number | null>(null);

  const [estimatorAge, setEstimatorAge] = useState(30);
  const [estimatorProduct, setEstimatorProduct] = useState<'br' | 'fs'>('fs');
  const [brPlan, setBrPlan] = useState<'planA' | 'planB' | 'planC'>('planA');
  const [fsTier, setFsTier] = useState<FlexiShieldTier>('FS200');

  const brPremium = useMemo(() => getBlueRoyalePremium(brPlan, estimatorAge), [brPlan, estimatorAge]);
  const fsPremium = useMemo(() => getFlexiShieldPremium(fsTier, estimatorAge), [fsTier, estimatorAge]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  const clientFaq = faqItems.filter((_, i) => [10, 11, 12, 13, 14, 15, 16, 17, 18, 19].includes(i));

  const navItems: { id: ClientView; label: string; emoji: string }[] = [
    { id: 'wizard', label: 'Find Plan', emoji: '🎯' },
    { id: 'estimator', label: 'Estimate', emoji: '🧮' },
    { id: 'benefits', label: 'Benefits', emoji: '✨' },
    { id: 'faq', label: 'FAQ', emoji: '❓' },
    { id: 'contact', label: 'Contact', emoji: '📧' },
  ];

  const comparisonRows = [
    { feature: 'Coverage', blue: 'USD 500K-2M', flexi: 'PHP 2M' },
    { feature: 'Location', blue: 'Worldwide', flexi: 'Philippines' },
    { feature: 'Ages', blue: '0-100', flexi: '0-70' },
    { feature: 'Starts At', blue: '$1,676/yr', flexi: '₱6,510/yr' },
    { feature: 'Maternity', blue: 'Plans B & C', flexi: '—' },
    { feature: 'Dental', blue: 'B & C', flexi: '—' },
    { feature: 'Daily Income', blue: '—', flexi: '₱1K/day' },
    { feature: 'HMO Required', blue: 'No', flexi: 'Yes' },
    { feature: 'Deductible', blue: 'Optional', flexi: 'Required' },
  ];

  return (
    <div className="space-y-6 pb-8">
      <RevealSection>
        <div className="flex items-center gap-3">
          <h2 className="section-title">Client Hub</h2>
          <span className="arch-badge arch-badge-ant">Client Mode</span>
        </div>
        <p className="section-subtitle mt-1">Find the right protection for you and your family</p>
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

      {/* ===== WHICH PLAN SUITS YOU? ===== */}
      {view === 'wizard' && (
        <div className="space-y-4" data-archetype="ant">
          <RevealSection>
            <div className="p-6 text-center" style={{ border: '3px solid var(--accent-yellow)', background: 'var(--accent-yellow-dim)' }}>
              <span className="text-4xl">🎯</span>
              <p className="font-display text-xl mt-2" style={{ color: 'var(--accent-yellow)' }}>WHICH PLAN SUITS YOU?</p>
              <p className="font-mono text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Pick the lifestyle that matches yours best</p>
            </div>
          </RevealSection>

          <RevealSection>
            <div>
              <h3 className="panel-header" style={{ border: 'none', margin: 0, padding: 0 }}>Quick Match</h3>
              <p className="font-mono mt-1" style={{ color: 'var(--text-muted)' }}>Choose your lifestyle</p>
            </div>
          </RevealSection>

          <div className="space-y-3">
            {lifestyleQuiz.map((item, i) => {
              const isFlexi = item.recommended.toLowerCase().includes('flexi');
              const isSelected = selectedLifestyle === i;
              return (
                <RevealSection key={i} delay={i * 80}>
                  <button onClick={() => setSelectedLifestyle(isSelected ? null : i)} className="w-full text-left">
                    <div
                      className="p-4"
                      style={{
                        background: isSelected ? (isFlexi ? 'var(--accent-yellow-dim)' : 'var(--accent-red-dim)') : 'var(--bg-card)',
                        border: isSelected ? `2px solid ${isFlexi ? 'var(--accent-yellow)' : 'var(--accent-red)'}` : '1px solid var(--border)',
                        borderLeft: `4px solid ${isFlexi ? 'var(--accent-yellow)' : 'var(--accent-red)'}`,
                        transition: 'all 0.25s ease',
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{item.icon}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-sub text-sm">{item.lifestyle}</p>
                            <span className="arch-badge arch-badge-ant arch-badge-sm">{isFlexi ? 'FlexiShield' : 'Blue Royale'}</span>
                          </div>
                          <p className="font-mono text-xs mt-0.5" style={{ color: 'var(--text-dim)' }}>{item.description}</p>
                          {isSelected && (
                            <div
                              className="mt-2 p-3"
                              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
                            >
                              <p className="font-mono uppercase mb-1" style={{ color: 'var(--text-dim)', fontSize: '0.55rem' }}>Recommended</p>
                              <p className="font-sub text-sm" style={{ color: isFlexi ? 'var(--accent-yellow)' : 'var(--accent-red)' }}>{item.recommended}</p>
                              <p className="font-mono text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{item.reason}</p>
                            </div>
                          )}
                        </div>
                        <span className="text-lg">{isSelected ? '✓' : '→'}</span>
                      </div>
                    </div>
                  </button>
                </RevealSection>
              );
            })}
          </div>

          <RevealSection>
            <div>
              <h3 className="panel-header" style={{ border: 'none', margin: 0, padding: 0 }}>Plan Comparison</h3>
              <p className="font-mono mt-1" style={{ color: 'var(--text-muted)' }}>At a glance</p>
            </div>
          </RevealSection>

          <RevealSection delay={100}>
            <div className="overflow-x-auto" style={{ scrollbarWidth: 'thin' }}>
              <table className="arch-comparison-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th><span className="arch-badge arch-badge-eagle arch-badge-sm">Blue Royale</span></th>
                    <th><span className="arch-badge arch-badge-beaver arch-badge-sm">FlexiShield</span></th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i}>
                      <td>{row.feature}</td>
                      <td>{row.blue}</td>
                      <td>{row.flexi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </RevealSection>

          <RevealSection>
            <div className="text-center">
              <button onClick={() => setView('contact')} className="btn-cta" style={{ background: 'var(--bg)', borderColor: 'var(--accent-red)', color: 'var(--accent-red)' }}>
                📧 GET A FREE CONSULTATION
              </button>
            </div>
          </RevealSection>
        </div>
      )}

      {/* ===== ESTIMATOR ===== */}
      {view === 'estimator' && (
        <div className="space-y-4">
          <RevealSection>
            <div>
              <h3 className="panel-header" style={{ border: 'none', margin: 0, padding: 0 }}>Premium Estimator</h3>
              <p className="font-mono mt-1" style={{ color: 'var(--text-muted)' }}>Get exact pricing based on plan, tier, and age</p>
            </div>
          </RevealSection>

          <div className="flex gap-2">
            <button
              onClick={() => setEstimatorProduct('fs')}
              className={estimatorProduct === 'fs' ? 'btn-cta-yellow flex-1 justify-center' : 'btn-ghost flex-1 justify-center'}
            >
              🛡️ FlexiShield
            </button>
            <button
              onClick={() => setEstimatorProduct('br')}
              className={estimatorProduct === 'br' ? 'btn-cta flex-1 justify-center' : 'btn-ghost flex-1 justify-center'}
            >
              👑 Blue Royale
            </button>
          </div>

          <RevealSection delay={100}>
            {estimatorProduct === 'fs' ? (
              <div data-archetype="beaver" className="panel" style={{ border: '2px solid var(--accent-yellow)' }}>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {flexiShieldTiers.map((tier) => (
                    <button
                      key={tier.id}
                      onClick={() => setFsTier(tier.id)}
                      className="btn-ghost"
                      style={{
                        background: fsTier === tier.id ? 'var(--bg)' : 'transparent',
                        borderColor: fsTier === tier.id ? 'var(--accent-yellow)' : 'var(--border)',
                        color: fsTier === tier.id ? 'var(--accent-yellow)' : 'var(--text-muted)',
                        fontSize: '0.6rem',
                      }}
                    >
                      {tier.label}
                    </button>
                  ))}
                </div>

                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>Your Age</span>
                    <span className="font-display text-xl" style={{ color: 'var(--accent-yellow)' }}>{estimatorAge}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={70}
                    value={estimatorAge}
                    onChange={(e) => setEstimatorAge(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                {fsPremium ? (
                  <div className="arch-price-beaver p-4 text-center">
                    <p className="font-mono uppercase mb-1" style={{ color: 'var(--text-muted)', fontSize: '0.6rem' }}>
                      Annual Premium — {flexiShieldTiers.find((t) => t.id === fsTier)?.label}
                    </p>
                    <p className="arch-price-beaver-annual font-display text-4xl mb-1" style={{ color: 'var(--accent-yellow)' }}>
                      ₱{fsPremium.toLocaleString()}<span className="font-mono text-sm">/yr</span>
                    </p>
                    <p className="font-display text-2xl" style={{ color: 'var(--accent-yellow)' }}>
                      ₱{Math.round(fsPremium / 12).toLocaleString()}<span className="font-mono text-xs">/mo</span>
                    </p>
                    <div className="arch-price-beaver-daily mt-3">
                      <span className="arch-price-beaver-daily-unit font-display text-lg" style={{ color: 'var(--accent-yellow)' }}>
                        ₱{Math.round(fsPremium / 365).toLocaleString()}
                      </span>
                      <span className="arch-price-beaver-daily-unit font-mono text-xs" style={{ color: 'var(--text-muted)' }}>/day</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 text-center" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                    <p className="font-mono text-xs" style={{ color: 'var(--text-dim)' }}>Not available for this age/tier combination.</p>
                  </div>
                )}
              </div>
            ) : (
              <div data-archetype="eagle" className="panel" style={{ border: '2px solid var(--accent-red)', background: 'var(--bg)' }}>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {(['planA', 'planB', 'planC'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setBrPlan(p)}
                      className="btn-ghost"
                      style={{
                        background: brPlan === p ? 'var(--accent-yellow-dim)' : 'transparent',
                        borderColor: brPlan === p ? 'var(--accent-yellow)' : 'var(--border)',
                        color: brPlan === p ? 'var(--accent-yellow)' : 'var(--text-dim)',
                        fontSize: '0.6rem',
                      }}
                    >
                      {p === 'planA' ? 'Plan A' : p === 'planB' ? 'Plan B' : 'Plan C'}
                    </button>
                  ))}
                </div>

                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="font-mono text-xs" style={{ color: 'var(--text-dim)' }}>Your Age</span>
                    <span className="font-display text-xl" style={{ color: 'var(--accent-yellow)' }}>{estimatorAge}</span>
                  </div>
                  <input
                    type="range"
                    min={19}
                    max={80}
                    value={estimatorAge}
                    onChange={(e) => setEstimatorAge(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                {brPremium ? (
                  <div className="p-4 text-center" style={{ background: 'var(--accent-yellow)', border: '2px solid var(--accent-yellow)' }}>
                    <p className="font-mono uppercase mb-1" style={{ color: 'var(--bg)', fontSize: '0.6rem' }}>
                      Annual Premium — {brPlan === 'planA' ? 'Plan A' : brPlan === 'planB' ? 'Plan B' : 'Plan C'}
                    </p>
                    <p className="font-display text-4xl mb-1" style={{ color: 'var(--bg)' }}>
                      ${brPremium.toLocaleString()}<span className="font-mono text-sm">/yr</span>
                    </p>
                    <p className="font-display text-2xl" style={{ color: 'var(--bg)' }}>
                      ${Math.round(brPremium / 12).toLocaleString()}<span className="font-mono text-xs">/mo</span>
                    </p>
                    <div className="price-daily mt-3">
                      <span className="price-daily-amount font-display text-lg" style={{ color: 'var(--bg)' }}>
                        ${Math.round(brPremium / 365).toLocaleString()}
                      </span>
                      <span className="price-daily-label font-mono text-xs" style={{ color: 'var(--bg)' }}>/day</span>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </RevealSection>

          <RevealSection delay={200}>
            <div className="text-center">
              <button onClick={() => setView('contact')} className={estimatorProduct === 'br' ? 'btn-cta-yellow' : 'btn-cta'}>
                Get Exact Quote →
              </button>
            </div>
          </RevealSection>

          <RevealSection delay={300}>
            <div className="sticker" style={{ transform: 'rotate(-1deg)' }}>
              ⚠️ Prices from official brochures. Contact Pacific Cross for binding quotes.
            </div>
          </RevealSection>
        </div>
      )}

      {/* ===== BENEFITS ===== */}
      {view === 'benefits' && (
        <div className="space-y-4">
          <RevealSection>
            <div>
              <h3 className="panel-header" style={{ border: 'none', margin: 0, padding: 0 }}>Benefits Explained</h3>
              <p className="font-mono mt-1" style={{ color: 'var(--text-muted)' }}>What you get with each plan</p>
            </div>
          </RevealSection>

          <RevealSection>
            <div className="flex items-center gap-2">
              <p className="font-sub text-sm" style={{ color: 'var(--accent-red)' }}>Blue Royale Benefits</p>
              <span className="arch-badge arch-badge-eagle arch-badge-sm">Eagle</span>
            </div>
          </RevealSection>
          <div data-archetype="eagle">
            {[
              { benefit: 'Worldwide Coverage', detail: 'Choose any doctor, any hospital, anywhere in the world. No network restrictions. Up to 90 days per trip, unlimited trips.', emoji: '🌍' },
              { benefit: 'Inpatient Care', detail: 'Full coverage for hospital room, board, ICU, operating theater. Private Room: USD 300-850/day (PH), USD 1K-1.5K/day (Overseas).', emoji: '🏥' },
              { benefit: 'Outpatient Care', detail: 'Plan A: PC pays 80% up to USD 2,500/yr. Plans B & C: As Charged (no limit).', emoji: '💊' },
              { benefit: "Surgeon's Fee", detail: 'Plan A: capped at USD 30,000. Plans B & C: As Charged (no limit).', emoji: '🔪' },
              { benefit: 'Maternity & Childbirth', detail: 'Plan B: USD 5,000 per pregnancy (12-month waiting). Plan C: USD 6,000 per pregnancy. Plan A: Not available.', emoji: '👶' },
              { benefit: 'Emergency Assistance', detail: '24/7 worldwide emergency hotline. Emergency evacuation, repatriation, return of mortal remains included.', emoji: '🚑' },
              { benefit: 'Dental Coverage', detail: 'Plan A: Optional (1st yr $1K, 2nd+ $2K). Plans B & C: INCLUDED in core plan.', emoji: '🦷' },
              { benefit: 'Vision Coverage', detail: 'Plan A: Not available. Plan B: USD 700 annual limit. Plan C: As Charged.', emoji: '👓' },
              { benefit: 'Discount Options', detail: 'USD 1K deductible = 15% off. USD 2.5K = 18-30% off. USD 5K = 24-40% off. TAL = 25% off all plans.', emoji: '🏷️' },
            ].map((item, i) => (
              <RevealSection key={i} delay={Math.min(i * 30, 300)}>
                <div className="arch-card-eagle-feature p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">{item.emoji}</span>
                    <div>
                      <p className="font-sub text-sm" style={{ color: 'var(--accent-yellow)' }}>{item.benefit}</p>
                      <p className="font-mono text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{item.detail}</p>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection>
            <div className="flex items-center gap-2 mt-4">
              <p className="font-sub text-sm" style={{ color: 'var(--accent-yellow)' }}>FlexiShield Benefits</p>
              <span className="arch-badge arch-badge-beaver arch-badge-sm">Beaver</span>
            </div>
          </RevealSection>
          <div data-archetype="beaver">
            {[
              { benefit: 'HMO Enhancement', detail: "Covers what your HMO doesn't. Kicks in when HMO's Maximum Benefit Limit (MBL) is exhausted. Up to PHP 2M coverage.", emoji: '🔄' },
              { benefit: 'Daily Hospital Income', detail: 'PHP 1,000 per day while hospitalized. Up to 30 days/year. Cash benefit on top of other coverage.', emoji: '💰' },
              { benefit: 'ICU / CCU / Telemetry', detail: 'As Charged — no limit on critical care expenses.', emoji: '💉' },
              { benefit: "Surgeon's Fee", detail: 'As Charged at accredited hospitals. Up to PHP 180,000 for reimbursement claims.', emoji: '🩺' },
              { benefit: 'COVID-19 Coverage', detail: 'Full coverage for COVID-19 hospitalization, ICU, and treatment costs. Pandemic exclusion waived.', emoji: '🦠' },
              { benefit: 'PhilHealth Additional', detail: 'PhilHealth benefits are paid IN ADDITION to FlexiShield. You get both.', emoji: '🏥' },
              { benefit: 'Claim Options', detail: 'No-Cash-Outlay: Pacific Cross pays hospital directly. Reimbursement: you pay first, then claim.', emoji: '📋' },
              { benefit: 'Affordable Premiums', detail: 'Starting at PHP 6,510/year (FS 200, ages 0-20). Less than PHP 550/month.', emoji: '💸' },
            ].map((item, i) => (
              <RevealSection key={i} delay={Math.min(i * 30, 300)}>
                <div className="arch-card-ant-benefit p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">{item.emoji}</span>
                    <div>
                      <p className="font-sub text-sm">{item.benefit}</p>
                      <p className="font-mono text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{item.detail}</p>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      )}

      {/* ===== FAQ ===== */}
      {view === 'faq' && (
        <div className="space-y-3" data-archetype="owl">
          <RevealSection>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="panel-header" style={{ border: 'none', margin: 0, padding: 0 }}>Client FAQ</h3>
                <span className="arch-badge arch-badge-owl arch-badge-sm">Owl</span>
              </div>
              <p className="font-mono mt-1" style={{ color: 'var(--text-muted)' }}>Common questions answered</p>
            </div>
          </RevealSection>

          {clientFaq.map((item, i) => (
            <RevealSection key={i} delay={i * 30}>
              <div className="arch-card-owl-faq">
                <button
                  className="brutal-accordion-header w-full"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{item.question}</span>
                  <span style={{ color: 'var(--accent-red)', fontSize: '1.2rem' }}>{openFaq === i ? '−' : '+'}</span>
                </button>
                <div className={`brutal-accordion-body ${openFaq === i ? 'open' : ''}`}>
                  <div className="brutal-accordion-body-inner">{item.answer}</div>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      )}

      {/* ===== CONTACT ===== */}
      {view === 'contact' && (
        <div className="space-y-4" data-archetype="ant">
          <RevealSection>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="panel-header" style={{ border: 'none', margin: 0, padding: 0 }}>Get in Touch</h3>
                <span className="arch-badge arch-badge-ant arch-badge-sm">Ant</span>
              </div>
              <p className="font-mono mt-1" style={{ color: 'var(--text-muted)' }}>We&apos;re here to help you find the right protection</p>
            </div>
          </RevealSection>

          <RevealSection delay={100}>
            <div className="grid grid-cols-2 gap-3">
              <div className="panel text-center" style={{ border: '2px solid var(--accent-yellow)' }}>
                <span className="text-2xl">📞</span>
                <p className="stat-label mt-1">Phone</p>
                <p className="font-sub text-xs" style={{ color: 'var(--accent-yellow)' }}>{blueRoyaleKeyFeatures.contact.phone}</p>
              </div>
              <div className="panel text-center" style={{ border: '2px solid var(--accent-red)' }}>
                <span className="text-2xl">📧</span>
                <p className="stat-label mt-1">Email</p>
                <p className="font-sub text-xs" style={{ color: 'var(--accent-red)' }}>{blueRoyaleKeyFeatures.contact.email}</p>
              </div>
            </div>
          </RevealSection>

          <RevealSection delay={200}>
            <div className="panel">
              <h3 className="panel-header">🏢 Office Locations</h3>
              <div className="flex flex-wrap gap-1">
                {blueRoyaleKeyFeatures.offices.map((office, i) => (
                  <span key={i} className="tag">{office}</span>
                ))}
              </div>
            </div>
          </RevealSection>

          {formSubmitted ? (
            <RevealSection>
              <div className="p-6 text-center" style={{ border: '3px solid var(--accent-yellow)', background: 'var(--accent-yellow-dim)' }}>
                <span className="text-4xl">✅</span>
                <p className="font-display text-xl mt-2" style={{ color: 'var(--accent-yellow)' }}>Message Sent!</p>
                <p className="font-mono text-xs mt-1" style={{ color: 'var(--text-muted)' }}>We&apos;ll get back to you within 24 hours</p>
              </div>
            </RevealSection>
          ) : (
            <RevealSection delay={300}>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="panel" style={{ border: '2px solid var(--border)' }}>
                  <div className="space-y-3">
                    <div>
                      <label className="font-sub text-xs uppercase block mb-1">Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-2 font-mono text-sm outline-none"
                        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text)' }}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="font-sub text-xs uppercase block mb-1">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-2 font-mono text-sm outline-none"
                        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text)' }}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="font-sub text-xs uppercase block mb-1">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-2 font-mono text-sm outline-none"
                        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text)' }}
                        placeholder="+63 9XX XXX XXXX"
                      />
                    </div>
                    <div>
                      <label className="font-sub text-xs uppercase block mb-1">Interest</label>
                      <select
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        className="w-full p-2 font-mono text-sm outline-none"
                        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text)' }}
                      >
                        <option value="general">General Inquiry</option>
                        <option value="blueroyale">Blue Royale</option>
                        <option value="flexishield">FlexiShield</option>
                        <option value="ofw">OFW Coverage</option>
                        <option value="advisor">Become an Advisor</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-sub text-xs uppercase block mb-1">Message</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full p-2 font-mono text-sm h-24 resize-none outline-none"
                        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text)' }}
                        placeholder="Tell us about your needs..."
                      />
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn-cta">
                    <span className="arch-badge arch-badge-owl arch-badge-sm" style={{ marginRight: '0.5rem' }}>Owl</span>
                    📩 SEND MESSAGE
                  </button>
                </div>
              </form>
            </RevealSection>
          )}
        </div>
      )}
    </div>
  );
}
