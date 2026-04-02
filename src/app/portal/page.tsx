'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  gsap, useGsapScrollReveal, useGsapHeroSequence, useGsapBioPulse,
  useGsapStatsBand, useGsapProductCards, useGsapTimelinePanels,
  useGsapCalcSection, useGsapMythCards, useGsapOfwSection,
  useGsapAISection, useGsapFooterReveal, useGsapMagneticAll,
  useGsapPortalNav,
} from '@/lib/gsap-engine';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import {
  stats,
  lifeStages,
  products,
  blueRoyalePlans,
  flexiShieldTiers,
  aseanComparison,
  misconceptions,
  getBlueRoyalePremium,
  getFlexiShieldPremium,
} from '@/lib/data';
import './portal.css';

// ============================================================
// MINI STATS COUNTER COMPONENT
// ============================================================
function StatCounter({ stat }: { stat: { value: number; suffix: string; prefix?: string; label: string; color: string } }) {
  const displayVal = stat.value % 1 === 0 ? stat.value : stat.value;
  return (
    <div className="portal-stat-item">
      <div className="portal-stat-bar" style={{ background: stat.color }} />
      <span
        className="portal-stat-value"
        data-target={displayVal}
        data-prefix={stat.prefix || ''}
        data-suffix={stat.suffix}
        data-decimals={stat.value % 1 === 0 ? '0' : '2'}
      >
        0
      </span>
      <div className="portal-stat-label">{stat.label}</div>
    </div>
  );
}

// ============================================================
// ASEAN CHART COMPONENT (lazy, SSR-safe)
// ============================================================
function AseanChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: { country: string; penetration: number } }> }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div style={{
          background: 'var(--bg-panel)',
          border: '1px solid var(--border)',
          padding: '0.5rem 0.75rem',
          fontFamily: "'DM Mono', monospace",
          fontSize: '0.6rem',
        }}>
          <div style={{ color: 'var(--text)', fontWeight: 700 }}>{d.country}</div>
          <div style={{ color: 'var(--accent-red)' }}>{d.penetration}% penetration</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div ref={containerRef} className="portal-asean-chart">
      {isVisible && (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={aseanComparison} layout="vertical" margin={{ left: 20, right: 30, top: 10, bottom: 10 }}>
            <XAxis
              type="number"
              domain={[0, 8]}
              tick={{ fill: 'var(--text-muted)', fontFamily: "'DM Mono', monospace", fontSize: 10 }}
              axisLine={{ stroke: 'var(--border)' }}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="country"
              tick={{ fill: 'var(--text)', fontFamily: "'DM Mono', monospace", fontSize: 11 }}
              axisLine={{ stroke: 'var(--border)' }}
              tickLine={false}
              width={90}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="penetration" barSize={22} radius={[0, 0, 0, 0]}>
              {aseanComparison.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.country === 'Philippines' ? '#e01f1f' : entry.color}
                  fillOpacity={entry.country === 'Philippines' ? 1 : 0.7}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
      {!isVisible && (
        <div style={{
          height: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'DM Mono', monospace",
          fontSize: '0.65rem',
          color: 'var(--text-dim)',
        }}>
          Scroll to load chart...
        </div>
      )}
    </div>
  );
}

// ============================================================
// MYTH CARD COMPONENT (Framer Motion flip)
// ============================================================
function MythCard({ item, index }: { item: { myth: string; fact: string; emoji: string }; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      className="myth-card"
      onClick={() => setFlipped(!flipped)}
    >
      <div className="myth-card-inner" style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
        {/* Front — Myth */}
        <div className="myth-card-front">
          <div className="myth-card-emoji" aria-hidden="true">{item.emoji}</div>
          <span className="myth-card-label myth-card-label-myth">Myth</span>
          <div className="myth-card-text">{item.myth}</div>
          <div className="myth-card-hint">Tap to reveal truth</div>
        </div>
        {/* Back — Fact */}
        <div className="myth-card-back">
          <div className="myth-card-emoji" aria-hidden="true">&#9989;</div>
          <span className="myth-card-label myth-card-label-fact">Fact</span>
          <div className="myth-card-text">{item.fact}</div>
          <div className="myth-card-hint">Tap to flip back</div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================
// MAIN PORTAL PAGE
// ============================================================
export default function PortalPage() {
  // -- Calculator state --
  const [calcAge, setCalcAge] = useState(30);
  const [calcGender, setCalcGender] = useState<'male' | 'female'>('male');
  const [calcIncome, setCalcIncome] = useState(500000);
  const [calcSalaryGrowth] = useState(0.05);
  const [calcTaxRate] = useState(0.20);

  // -- AI Chat state --
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'ai'; text: string }>>([
    { role: 'ai', text: 'Welcome to the Pacific Cross Insurance Concierge! Ask me anything about Blue Royale, FlexiShield, or insurance in the Philippines.' },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // -- Calculator derived values --
  const retirementAge = 65;
  const yearsRemaining = Math.max(retirementAge - calcAge, 0);
  const annualIncomeAfterTax = calcIncome * (1 - calcTaxRate);
  const hev = yearsRemaining > 0
    ? annualIncomeAfterTax * Math.pow(1 + calcSalaryGrowth, yearsRemaining)
    : 0;
  const insuranceGap = Math.max(hev * 0.1, 0);
  const recommendedCoverage = Math.max(hev * 0.3, 500000);

  // Premium lookups
  const brPremiumA = getBlueRoyalePremium('planA', calcAge);
  const brPremiumB = getBlueRoyalePremium('planB', calcAge);
  const fsPremium = getFlexiShieldPremium('FS100', calcAge);

  // -- Auto-scroll chat --
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // -- Chat submit --
  const handleChatSubmit = useCallback(async (message: string) => {
    if (!message.trim() || chatLoading) return;
    setChatMessages(prev => [...prev, { role: 'user', text: message }]);
    setChatInput('');
    setChatLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, context: 'insurance' }),
      });
      const data = await res.json();
      setChatMessages(prev => [...prev, { role: 'ai', text: data.reply || data.message || 'Sorry, I could not process that.' }]);
    } catch {
      setChatMessages(prev => [...prev, { role: 'ai', text: 'Network error. Please try again.' }]);
    } finally {
      setChatLoading(false);
    }
  }, [chatLoading]);

  // GSAP Animations
  const portalRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const bioPulseRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  // Scroll-driven animations
  useGsapScrollReveal(portalRef);
  useGsapHeroSequence(heroRef);
  useGsapBioPulse(bioPulseRef);
  useGsapStatsBand(portalRef);
  useGsapProductCards(portalRef);
  useGsapTimelinePanels(portalRef);
  useGsapCalcSection(portalRef);
  useGsapMythCards(portalRef);
  useGsapOfwSection(portalRef);
  useGsapAISection(portalRef);
  useGsapFooterReveal(portalRef);
  useGsapMagneticAll(portalRef);
  useGsapPortalNav(navRef);

  return (
    <div ref={portalRef} className="portal-page">
      {/* ============ STICKY NAV ============ */}
      <nav ref={navRef} className="portal-nav">
        <a href="#portal-top" className="portal-nav-brand">
          <span className="portal-nav-brand-dot" />
          Pacific Cross
        </a>
        <div className="portal-nav-links">
          <a href="#products" className="portal-nav-link">Products</a>
          <a href="#timeline" className="portal-nav-link">Life Stages</a>
          <a href="#calculator" className="portal-nav-link">Calculator</a>
          <a href="#asean" className="portal-nav-link">ASEAN</a>
          <a href="#myths" className="portal-nav-link">Myths</a>
          <a href="#ofw" className="portal-nav-link">OFW</a>
          <a href="#concierge" className="portal-nav-link">AI Concierge</a>
        </div>
      </nav>

      {/* ============ HERO SECTION ============ */}
      <section id="portal-top" className="portal-hero" ref={heroRef}>
        {/* Bio-Pulse SVG */}
        <div ref={bioPulseRef} className="bio-pulse-container" aria-hidden="true">
          <svg width="600" height="600" viewBox="0 0 600 600">
            <circle className="bio-pulse-ring" cx="300" cy="300" r="40" />
            <circle className="bio-pulse-ring" cx="300" cy="300" r="40" />
            <circle className="bio-pulse-ring" cx="300" cy="300" r="40" />
          </svg>
        </div>

        <h1 className="portal-hero-title hero-slam">
          Protect Your Future
        </h1>

        <p className="portal-hero-subtitle">
          Pacific Cross Insurance Advisor Hub
        </p>

        <div className="portal-hero-badges">
          <span className="tag tag-red">V-09 Hybrid</span>
          <span className="tag tag-yellow">75+ Years</span>
        </div>

        <div className="portal-hero-ctas">
          <a href="#products" className="btn-cta">Explore Products</a>
          <a href="#calculator" className="btn-cta btn-cta-yellow">Calculate Coverage</a>
        </div>

        <div className="portal-scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-arrow" />
        </div>
      </section>

      {/* ============ STATS BAND ============ */}
      <section className="portal-stats-band">
        <div className="portal-stats-grid">
          {stats.quickStats.map((s) => (
            <StatCounter key={s.label} stat={s} />
          ))}
        </div>
      </section>

      {/* ============ PRODUCT SHOWCASE ============ */}
      <section id="products" className="portal-products">
        <div className="portal-products-header reveal-section">
          <span className="section-subtitle stagger-child">Our Armor</span>
          <h2 className="section-title stagger-child" style={{ marginTop: '0.5rem' }}>
            Choose Your Protection
          </h2>
        </div>

        <div className="portal-products-grid">
          {/* Blue Royale Card */}
          <div className="portal-product-card portal-product-card-blue hover-card card-comic-lg">
            <div className="portal-product-emoji" aria-hidden="true">{products.blueRoyale.emoji}</div>
            <h3 className="portal-product-name" style={{ color: 'var(--accent-cyan)' }}>
              {products.blueRoyale.name}
            </h3>
            <p className="portal-product-tagline">{products.blueRoyale.tagline}</p>
            <ul className="portal-product-features">
              {products.blueRoyale.features.slice(0, 5).map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
            <div className="portal-product-plans">
              {products.blueRoyale.plans.map((p) => (
                <span key={p.name} className="plan-chip plan-chip-blue">
                  {p.name}: {p.coverage}
                </span>
              ))}
            </div>
            <div className="portal-product-premium">
              {products.blueRoyale.premiumRange}
            </div>
            <a href="#calculator" className="btn-cta" style={{ borderColor: 'var(--accent-cyan)', background: 'var(--accent-cyan)', width: '100%', justifyContent: 'center' }}>
              Get Quote
            </a>
          </div>

          {/* FlexiShield Card */}
          <div className="portal-product-card portal-product-card-flexi portal-product-flexi hover-card card-comic-lg">
            <div className="portal-product-emoji" aria-hidden="true">{products.flexiShield.emoji}</div>
            <h3 className="portal-product-name" style={{ color: 'var(--accent-yellow)' }}>
              {products.flexiShield.name}
            </h3>
            <p className="portal-product-tagline">{products.flexiShield.tagline}</p>
            <ul className="portal-product-features">
              {products.flexiShield.features.slice(0, 5).map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
            <div className="portal-product-plans">
              {products.flexiShield.plans.map((p) => (
                <span key={p.name} className="plan-chip plan-chip-yellow">
                  {p.name}
                </span>
              ))}
            </div>
            <div className="portal-product-premium">
              {products.flexiShield.premiumRange}
            </div>
            <a href="#calculator" className="btn-cta btn-cta-yellow" style={{ width: '100%', justifyContent: 'center' }}>
              Get Quote
            </a>
          </div>
        </div>
      </section>

      {/* ============ LIFE STAGE TIMELINE ============ */}
      <section id="timeline" className="portal-timeline">
        <div className="portal-timeline-header reveal-section">
          <span className="section-subtitle stagger-child">Your Journey</span>
          <h2 className="section-title stagger-child" style={{ marginTop: '0.5rem' }}>
            Life Stage Protection
          </h2>
        </div>

        <div className="portal-timeline-list">
          {lifeStages.map((stage, idx) => (
            <div key={stage.stage} className="portal-timeline-panel hover-card">
              <div className="portal-timeline-accent-bar" style={{ background: stage.color }} />
              <div className="portal-timeline-emoji-col">
                <span aria-hidden="true">{stage.emoji}</span>
              </div>
              <div className="portal-timeline-content">
                <div className="portal-timeline-stage-name">
                  {stage.stage}
                  <span className="portal-timeline-age">{stage.age}</span>
                </div>
                <div className="portal-timeline-meta">
                  <div className="portal-timeline-meta-item">
                    <strong>Income:</strong> {stage.income}
                  </div>
                  <div className="portal-timeline-meta-item">
                    <strong>Priority:</strong> {stage.priority}
                  </div>
                  <div className="portal-timeline-meta-item">
                    <strong>Product:</strong> <span style={{ color: stage.color }}>{stage.product}</span>
                  </div>
                </div>
                <div className="portal-timeline-tips">
                  {stage.tips.map((tip, i) => (
                    <div key={i} className="portal-timeline-tip" style={{ borderColor: stage.color }}>
                      {tip}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ MORTALITY RISK CALCULATOR ============ */}
      <section id="calculator" className="portal-calculator">
        <div className="portal-calculator-inner">
          <div className="portal-calculator-header reveal-section">
            <span className="section-subtitle stagger-child">Interactive Tool</span>
            <h2 className="section-title stagger-child" style={{ marginTop: '0.5rem' }}>
              Coverage Calculator
            </h2>
            <p className="stagger-child" style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
              Estimate your Human Economic Value and find the right coverage.
            </p>
          </div>

          <div className="portal-calc-controls">
            {/* Age Slider */}
            <div className="portal-calc-field">
              <label>Your Age: <span className="calc-slider-value">{calcAge}</span></label>
              <input
                type="range"
                className="calc-slider"
                min={19}
                max={80}
                value={calcAge}
                onChange={(e) => setCalcAge(Number(e.target.value))}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'DM Mono', monospace", fontSize: '0.5rem', color: 'var(--text-dim)' }}>
                <span>19</span>
                <span>80</span>
              </div>
            </div>

            {/* Gender */}
            <div className="portal-calc-field">
              <label>Gender</label>
              <div className="calc-gender-group">
                <button
                  className={`calc-gender-btn ${calcGender === 'male' ? 'active' : ''}`}
                  onClick={() => setCalcGender('male')}
                >
                  Male
                </button>
                <button
                  className={`calc-gender-btn ${calcGender === 'female' ? 'active' : ''}`}
                  onClick={() => setCalcGender('female')}
                >
                  Female
                </button>
              </div>
            </div>
          </div>

          {/* Annual Income */}
          <div className="portal-calc-field calc-income-field">
            <label>Annual Income (PHP)</label>
            <input
              type="number"
              value={calcIncome}
              onChange={(e) => setCalcIncome(Number(e.target.value) || 0)}
              placeholder="e.g. 500000"
            />
          </div>

          {/* Results */}
          <div className="portal-calc-results" style={{ marginTop: '1.5rem' }}>
            <div className="calc-result-grid">
              <div className="calc-result-item">
                <div className="calc-result-value">
                  {hev >= 1000000
                    ? `${(hev / 1000000).toFixed(1)}M`
                    : hev >= 1000
                      ? `${(hev / 1000).toFixed(0)}K`
                      : hev.toFixed(0)}
                </div>
                <div className="calc-result-label">Est. Economic Value</div>
              </div>
              <div className="calc-result-item">
                <div className="calc-result-value" style={{ color: 'var(--accent-yellow)' }}>
                  {insuranceGap >= 1000000
                    ? `${(insuranceGap / 1000000).toFixed(1)}M`
                    : insuranceGap >= 1000
                      ? `${(insuranceGap / 1000).toFixed(0)}K`
                      : insuranceGap.toFixed(0)}
                </div>
                <div className="calc-result-label">Insurance Gap</div>
              </div>
              <div className="calc-result-item">
                <div className="calc-result-value" style={{ color: 'var(--accent-cyan)' }}>
                  {yearsRemaining}y
                </div>
                <div className="calc-result-label">Working Years Left</div>
              </div>
            </div>

            <div className="calc-recommendation">
              <strong>Recommended Coverage:</strong> At least{' '}
              {recommendedCoverage >= 1000000
                ? `PHP ${(recommendedCoverage / 1000000).toFixed(1)}M`
                : `PHP ${recommendedCoverage.toFixed(0)}`}{' '}
              based on your income trajectory and remaining working years.
            </div>

            <div className="calc-premium-preview">
              <div className="calc-premium-card">
                <div className="calc-premium-card-name" style={{ color: 'var(--accent-cyan)' }}>
                  {products.blueRoyale.emoji} Blue Royale Plan B
                </div>
                <div className="calc-premium-card-value calc-premium-blue">
                  {brPremiumB ? `$${brPremiumB.toLocaleString()}/yr` : 'N/A'}
                </div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.5rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
                  Up to USD 1,000,000 coverage
                </div>
              </div>
              <div className="calc-premium-card">
                <div className="calc-premium-card-name" style={{ color: 'var(--accent-yellow)' }}>
                  {products.flexiShield.emoji} FlexiShield FS 100
                </div>
                <div className="calc-premium-card-value calc-premium-yellow">
                  {fsPremium ? `PHP ${fsPremium.toLocaleString()}/yr` : 'N/A'}
                </div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.5rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
                  Up to PHP 2,000,000 coverage
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ASEAN COMPARISON ============ */}
      <section id="asean" className="portal-asean">
        <div className="portal-asean-header reveal-section">
          <span className="section-subtitle stagger-child">Regional Comparison</span>
          <h2 className="section-title stagger-child" style={{ marginTop: '0.5rem' }}>
            Insurance Penetration in ASEAN
          </h2>
          <p className="stagger-child" style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
            Philippines ranks among the lowest in insurance penetration across Southeast Asia.
          </p>
        </div>

        <AseanChart />
        <div className="portal-asean-note">
          Source: Insurance Commission reports, ASEAN Insurance Council data
        </div>
      </section>

      {/* ============ MYTH BUSTING ============ */}
      <section id="myths" className="portal-myths">
        <div className="portal-myths-inner">
          <div className="portal-myths-header reveal-section">
            <span className="section-subtitle stagger-child">Fact Check</span>
            <h2 className="section-title stagger-child" style={{ marginTop: '0.5rem' }}>
              Insurance Myths vs Facts
            </h2>
            <p className="stagger-child" style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
              Tap each card to reveal the truth.
            </p>
          </div>

          <div className="portal-myths-grid">
            {misconceptions.map((item, idx) => (
              <MythCard key={idx} item={item} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ OFW SECTION ============ */}
      <section id="ofw" className="portal-ofw">
        <div className="portal-ofw-inner">
          <div className="portal-ofw-header">
            <div className="portal-ofw-emoji" aria-hidden="true">&#9992;&#65039;</div>
            <div>
              <h2 className="portal-ofw-title">OFW Protection</h2>
              <p className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Worldwide coverage for Filipino workers abroad
              </p>
            </div>
          </div>

          <div className="portal-ofw-grid">
            {/* Benefits */}
            <div className="portal-ofw-benefits">
              <h3>Blue Royale OFW Benefits</h3>
              {[
                ['90 days per trip', 'Coverage for each overseas trip'],
                ['Unlimited trips per year', 'Travel as often as you need'],
                ['Worldwide hospital access', 'Choose any hospital globally'],
                ['Emergency evacuation', 'Including repatriation'],
                ['Up to USD 2M coverage', 'Premium protection at every tier'],
                ['No physical exam required', 'Quick and easy enrollment'],
              ].map(([title, desc], i) => (
                <div key={i} className="portal-ofw-benefit-item">
                  <span>&#9654;</span>
                  <span>
                    <strong style={{ color: 'var(--text)' }}>{title}</strong> — {desc}
                  </span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="portal-ofw-stats">
              <div className="portal-ofw-stat">
                <div className="portal-ofw-stat-value">2.2M</div>
                <div className="portal-ofw-stat-label">OFWs worldwide needing protection</div>
              </div>
              <div className="portal-ofw-stat">
                <div className="portal-ofw-stat-value">$36B</div>
                <div className="portal-ofw-stat-label">Annual remittances from OFWs</div>
              </div>
              <div className="portal-ofw-stat">
                <div className="portal-ofw-stat-value">Top Destinations</div>
                <div className="portal-ofw-stat-label" style={{ marginTop: '0.25rem' }}>
                  Saudi Arabia, UAE, Singapore, Hong Kong, USA, Canada
                </div>
              </div>
              <div className="portal-ofw-stat" style={{ marginTop: '1rem' }}>
                <span className="tag tag-red" style={{ marginRight: '0.4rem' }}>Critical</span>
                <span className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>
                  Most OFWs have no international health insurance coverage
                </span>
              </div>
            </div>
          </div>

          <div className="portal-ofw-cta">
            <a href="#calculator" className="btn-cta" style={{ borderColor: 'var(--accent-cyan)', background: 'var(--accent-cyan)', color: '#080808' }}>
              Get Blue Royale Quote
            </a>
          </div>
        </div>
      </section>

      {/* ============ AI NEWS CONCIERGE ============ */}
      <section id="concierge" className="portal-ai-concierge">
        <div className="portal-ai-inner">
          <div className="portal-ai-header reveal-section">
            <div className="portal-ai-badge stagger-child">AI-Powered</div>
            <h2 className="section-title stagger-child" style={{ marginTop: '0.5rem', fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}>
              Insurance Concierge
            </h2>
            <p className="stagger-child" style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
              Ask anything about Pacific Cross products, coverage, or insurance in general.
            </p>
          </div>

          <div className="portal-ai-chatbox">
            <div className="portal-ai-messages">
              <AnimatePresence mode="popLayout">
                {chatMessages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    className={`chat-bubble ${msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}`}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="chat-bubble-label">
                      {msg.role === 'user' ? 'You' : 'PC Concierge'}
                    </div>
                    {msg.text}
                  </motion.div>
                ))}
              </AnimatePresence>
              {chatLoading && (
                <div className="chat-bubble chat-bubble-ai">
                  <div className="chat-bubble-label">PC Concierge</div>
                  <div className="chat-bubble-typing">
                    <span /><span /><span />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="chat-input-area">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleChatSubmit(chatInput)}
                placeholder="Ask about Blue Royale, FlexiShield, OFW coverage..."
                disabled={chatLoading}
              />
              <button
                className="chat-input-send"
                onClick={() => handleChatSubmit(chatInput)}
                disabled={chatLoading || !chatInput.trim()}
              >
                Send
              </button>
            </div>
          </div>

          <div className="chat-suggestions">
            {['What is Blue Royale?', 'FlexiShield vs HMO', 'OFW Coverage', 'Premium Plans'].map((chip) => (
              <button
                key={chip}
                className="chat-chip"
                onClick={() => handleChatSubmit(chip)}
                disabled={chatLoading}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="portal-footer">
        <div className="portal-footer-inner">
          <div className="portal-footer-grid">
            {/* Brand */}
            <div className="portal-footer-brand">
              <h3>Pacific Cross</h3>
              <p>
                Protecting Filipino families for over 75 years. ISO 9001:2015 Certified.
                Your trusted partner in health, travel, and life insurance.
              </p>
              <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                <span className="tag tag-red">Blue Royale</span>
                <span className="tag tag-yellow">FlexiShield</span>
              </div>
            </div>

            {/* Contact */}
            <div className="portal-footer-col">
              <h4>Contact</h4>
              <ul>
                <li>+63 2 8230-8511</li>
                <li>info@pacificcross.com.ph</li>
                <li>pacificcross.com.ph</li>
              </ul>
            </div>

            {/* Offices */}
            <div className="portal-footer-col">
              <h4>Offices</h4>
              <ul>
                <li>Makati HQ</li>
                <li>Cebu</li>
                <li>Clark</li>
                <li>Davao</li>
                <li>Nationwide agencies</li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="portal-footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#products">Products</a></li>
                <li><a href="#calculator">Calculator</a></li>
                <li><a href="#ofw">OFW Coverage</a></li>
                <li><a href="#concierge">AI Concierge</a></li>
              </ul>
            </div>
          </div>

          <div className="portal-footer-bottom">
            <div className="portal-footer-copy">
              &copy; {new Date().getFullYear()} Pacific Cross Insurance. All rights reserved.
            </div>
            <div className="portal-footer-socials">
              <a href="#" className="portal-footer-social-link" aria-label="Facebook">f</a>
              <a href="#" className="portal-footer-social-link" aria-label="LinkedIn">in</a>
              <a href="#" className="portal-footer-social-link" aria-label="Twitter">x</a>
              <a href="#" className="portal-footer-social-link" aria-label="Instagram">ig</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
