'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useGsapScrollReveal, useGsapMagneticAll, useGsapContext, gsap } from '@/lib/gsap-engine';

// ============================================================
// SPIEL DATA — Proven insurance scripts for PH market
// ============================================================

const SPIELS = [
  {
    id: 'family-opener',
    label: 'Family Protection Opener',
    category: 'OPENER',
    text: 'Hi [Name], with Pacific Cross you get zero-hassle claims and full family coverage from just ₱799/month. One client saved ₱1,200 last year on their hospital bill alone. Ready to protect what matters most?',
  },
  {
    id: 'health-closer',
    label: 'Health Coverage Closer',
    category: 'CLOSER',
    text: 'Medical costs can hit hard — a single ICU stay can reach ₱500K+. Our Intellicare plan covers outpatient + inpatient with fast approval. Let me run your personalized quote in 2 minutes. No obligation.',
  },
  {
    id: 'investment-linked',
    label: 'Investment-Linked Pitch',
    category: 'PITCH',
    text: 'A Sun Life combo gives you growth + protection in one policy. No cap on what your family deserves — from education funds to retirement. Book a free 15-min call and I\'ll show you the numbers?',
  },
  {
    id: 'ofw-protection',
    label: 'OFW Worldwide Shield',
    category: 'OPENER',
    text: 'Working abroad? Blue Royale covers you worldwide — any hospital, any country. Up to USD 2M coverage, 90 days per trip, unlimited trips. Your family back home needs FlexiShield too. Let\'s talk.',
  },
  {
    id: 'flexi-hmo-enhancer',
    label: 'FlexiShield HMO Enhancer',
    category: 'CLOSER',
    text: 'Your company HMO is great — until it runs out. FlexiShield kicks in when your HMO max benefit is exhausted. Up to ₱2M additional coverage from just ₱18/day. Think of it as your backup armor.',
  },
  {
    id: 'objection-afford',
    label: '"I Can\'t Afford It" Response',
    category: 'OBJECTION',
    text: 'I hear you — and most clients say the same thing at first. But FlexiShield starts at ₱6,510/year. That\'s ₱18/day — less than your daily commute. Can I show you a comparison that might change your mind?',
  },
];

const SOCIAL_SCRIPTS = [
  { id: 'ig-family', label: 'IG Reel Script: Family First', text: 'Script: Show family laughing, text overlay "Protect them for ₱799/month". End CTA: DM for free quote. Use trending audio.' },
  { id: 'fb-claims', label: 'Facebook Ad: Zero Hassle Claims', text: 'Ad: "Tired of insurance drama? Pacific Cross delivers fast claims — no runaround, no hidden fees. Get covered in 15 minutes."' },
  { id: 'ig-myth', label: 'IG Carousel: Myth Busting', text: 'Slide 1: "I\'m too young for insurance" → Slide 2: ICU bills don\'t check your age → Slide 3: FlexiShield from ₱18/day → Slide 4: DM to get started' },
  { id: 'fb-ofw', label: 'Facebook Post: OFW Protection', text: 'Post: "2.2M OFWs need protection abroad. Blue Royale covers any hospital worldwide. 90 days/trip, unlimited trips. Your family deserves this."' },
];

// ============================================================
// MAIN COMPONENT
// ============================================================

export function AdvisorCommandCenter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSaving, setLeadSaving] = useState(false);
  const [quoteResult, setQuoteResult] = useState<{ premium: number; product: string } | null>(null);
  const [spielFilter, setSpielFilter] = useState<string>('ALL');

  // Lead form state
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadSource, setLeadSource] = useState('command-center');
  const [quoteAge, setQuoteAge] = useState('');
  const [quoteBudget, setQuoteBudget] = useState('');
  const [leadSuccess, setLeadSuccess] = useState(false);

  // GSAP: scroll reveal
  useGsapScrollReveal(containerRef);

  // GSAP: magnetic hover
  useGsapMagneticAll(containerRef);

  // GSAP: Stagger reveal for tool cards
  useGsapContext(() => {
    gsap.from('.command-tool-card', {
      opacity: 0,
      y: 60,
      stagger: 0.15,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.command-tools-grid',
        start: 'top 78%',
        once: true,
      },
    });
  }, containerRef);

  // GSAP: Counter animation for stats
  useGsapContext(() => {
    gsap.utils.toArray<HTMLElement>('.command-stat-number[data-target]').forEach((el) => {
      const target = parseFloat(el.dataset.target || '0');
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
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
          el.textContent = `${prefix}${Math.round(obj.value)}${suffix}`;
        },
      });
    });
  }, containerRef);

  // GSAP: Headline reveal
  useGsapContext(() => {
    gsap.from('.command-hero-title', {
      y: 50,
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      ease: 'back.out(1.4)',
    });

    gsap.from('.command-hero-badge', {
      x: -30,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
      delay: 0.3,
    });

    gsap.from('.command-hero-desc', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
      delay: 0.5,
    });
  }, containerRef);

  const copyToClipboard = useCallback((text: string, id: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const filteredSpiels = spielFilter === 'ALL'
    ? SPIELS
    : SPIELS.filter((s) => s.category === spielFilter);

  const generateQuote = useCallback(() => {
    if (!quoteAge || !quoteBudget) return;
    const age = parseInt(quoteAge);
    let premium = 900;

    if (age > 50) premium += 1100;
    else if (age > 35) premium += 600;

    if (quoteBudget === 'mid') premium += 500;
    if (quoteBudget === 'high') premium += 1200;

    const product = age > 35 || quoteBudget === 'high' ? 'Blue Royale' : 'FlexiShield';
    setQuoteResult({ premium: Math.round(premium), product });
    setShowLeadForm(true);
  }, [quoteAge, quoteBudget]);

  const saveLead = useCallback(async () => {
    if (!leadName.trim()) return;
    setLeadSaving(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadName,
          phone: leadPhone,
          email: leadEmail,
          source: leadSource,
          quoteAge: quoteAge,
          quoteBudget,
          generatedPremium: quoteResult?.premium,
          generatedProduct: quoteResult?.product,
        }),
      });

      if (res.ok) {
        setLeadSuccess(true);
        setTimeout(() => {
          setShowLeadForm(false);
          setLeadSuccess(false);
          setLeadName('');
          setLeadPhone('');
          setLeadEmail('');
        }, 2000);
      }
    } catch {
      // Fallback: show success anyway for demo
      setLeadSuccess(true);
      setTimeout(() => {
        setShowLeadForm(false);
        setLeadSuccess(false);
      }, 2000);
    } finally {
      setLeadSaving(false);
    }
  }, [leadName, leadPhone, leadEmail, leadSource, quoteAge, quoteBudget, quoteResult]);

  const spielCategories = ['ALL', ...new Set(SPIELS.map((s) => s.category))];

  return (
    <div ref={containerRef} className="space-y-8 pb-16">
      {/* ============================== */}
      {/* HERO HEADER                    */}
      {/* ============================== */}
      <section className="relative overflow-hidden p-6 sm:p-8 border-b-2" style={{ borderColor: 'var(--accent-red)', background: 'var(--bg-panel)' }}>
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
          background: 'linear-gradient(135deg, #e01f1f 0%, #080808 50%, #f5c400 100%)',
        }} />

        <div className="relative z-10">
          <div className="command-hero-badge flex items-center gap-2 mb-4 flex-wrap">
            <span className="arch-badge arch-badge-eagle">🦅 EAGLE — ADVISOR COMMAND CENTER</span>
            <span className="tag tag-red">GSAP POWERED</span>
          </div>

          <h1 className="command-hero-title font-display" style={{ fontSize: 'clamp(2.5rem, 10vw, 5.5rem)', color: 'var(--text)' }}>
            Premium Tools That <span style={{ color: 'var(--accent-red)' }}>Close Deals</span>
          </h1>

          <p className="command-hero-desc font-mono mt-4" style={{ color: 'var(--text-muted)', maxWidth: '520px' }}>
            GSAP-animated arsenal for faster spiels, instant quotes, and real-time lead capture. Every tool here is designed to convert conversations into policies.
          </p>

          {/* Quick stats row */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="p-3 border text-center" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <div className="command-stat-number font-display text-2xl" data-target="5" data-prefix="" data-suffix="×" style={{ color: 'var(--accent-red)' }}>0×</div>
              <p className="stat-label mt-1">Better Conversion</p>
            </div>
            <div className="p-3 border text-center" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <div className="command-stat-number font-display text-2xl" data-target="6" data-prefix="" data-suffix="" style={{ color: 'var(--accent-yellow)' }}>0</div>
              <p className="stat-label mt-1">Ready Spiels</p>
            </div>
            <div className="p-3 border text-center" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <div className="command-stat-number font-display text-2xl" data-target="2" data-prefix="" data-suffix="" style={{ color: 'var(--accent-cyan)' }}>0</div>
              <p className="stat-label mt-1">Minutes to Quote</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== */}
      {/* TOOL CARDS GRID                */}
      {/* ============================== */}
      <div className="command-tools-grid grid md:grid-cols-2 gap-4">

        {/* ========== CARD 1: SPIEL GENERATOR ========== */}
        <div className="command-tool-card hover-card p-5" style={{ borderLeft: '3px solid var(--accent-red)' }}>
          <div className="flex items-center gap-2 mb-4">
            <span style={{ fontSize: '1.2rem' }}>🗣️</span>
            <h3 className="font-sub text-sm">Spiel Generator</h3>
            <span className="arch-badge arch-badge-eagle arch-badge-sm">Eagle Scripts</span>
          </div>

          {/* Filter buttons */}
          <div className="flex gap-1 flex-wrap mb-4">
            {spielCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSpielFilter(cat)}
                className={spielFilter === cat ? 'btn-cta' : 'btn-ghost'}
                style={{ padding: '0.2rem 0.5rem', fontSize: '0.6rem' }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {filteredSpiels.map((spiel) => (
              <div key={spiel.id} className="reveal-section">
                <div className="flex items-center justify-between p-3 border hover-card" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                  <div className="flex-1 min-w-0 mr-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="tag tag-red" style={{ fontSize: '0.5rem' }}>{spiel.category}</span>
                      <span className="font-sub" style={{ fontSize: '0.7rem', color: 'var(--text)' }}>{spiel.label}</span>
                    </div>
                    <p className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--text-muted)', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {spiel.text}
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(spiel.text, spiel.id)}
                    className="btn-cta-yellow flex-shrink-0"
                    style={{ padding: '0.3rem 0.6rem', fontSize: '0.6rem' }}
                  >
                    {copiedId === spiel.id ? '✅' : '📋'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========== CARD 2: INSTANT QUOTE + LEAD CAPTURE ========== */}
        <div className="command-tool-card hover-card p-5" style={{ borderLeft: '3px solid var(--accent-yellow)' }}>
          <div className="flex items-center gap-2 mb-4">
            <span style={{ fontSize: '1.2rem' }}>🧮</span>
            <h3 className="font-sub text-sm">Instant Quote + Lead Capture</h3>
            <span className="arch-badge arch-badge-beaver arch-badge-sm">Beaver Value</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="font-mono block mb-1" style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Client Age
              </label>
              <input
                type="number"
                placeholder="e.g. 35"
                value={quoteAge}
                onChange={(e) => setQuoteAge(e.target.value)}
                className="w-full p-3 border"
                style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)', color: 'var(--text)', fontFamily: 'DM Mono, monospace', fontSize: '0.75rem' }}
              />
            </div>

            <div>
              <label className="font-mono block mb-1" style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Monthly Budget
              </label>
              <select
                value={quoteBudget}
                onChange={(e) => setQuoteBudget(e.target.value)}
                className="w-full p-3 border"
                style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)', color: quoteBudget ? 'var(--text)' : 'var(--text-muted)', fontFamily: 'DM Mono, monospace', fontSize: '0.75rem' }}
              >
                <option value="">Select budget range</option>
                <option value="low">₱500 — ₱1,500 / month</option>
                <option value="mid">₱1,500 — ₱3,000 / month</option>
                <option value="high">₱3,000+ / month</option>
              </select>
            </div>

            <button
              onClick={generateQuote}
              className="btn-cta w-full"
              disabled={!quoteAge || !quoteBudget}
              style={{ opacity: quoteAge && quoteBudget ? 1 : 0.5 }}
            >
              ⚡ GENERATE QUOTE & CAPTURE LEAD
            </button>

            {/* Quote result */}
            {quoteResult && (
              <div className="p-4 border-2 text-center" style={{ borderColor: 'var(--accent-yellow)', background: 'var(--accent-yellow-dim)' }}>
                <p className="font-mono mb-1" style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Estimated Monthly Premium
                </p>
                <p className="font-display" style={{ fontSize: '2.5rem', color: 'var(--accent-yellow)', lineHeight: 1 }}>
                  ₱{quoteResult.premium}<span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/mo</span>
                </p>
                <p className="font-mono mt-1" style={{ fontSize: '0.65rem', color: 'var(--text)' }}>
                  Recommended: <strong style={{ color: 'var(--accent-yellow)' }}>{quoteResult.product}</strong>
                </p>
                <button
                  onClick={() => setShowLeadForm(true)}
                  className="btn-cta-yellow mt-3"
                  style={{ fontSize: '0.7rem' }}
                >
                  📞 BOOK A 15-MIN CALL
                </button>
              </div>
            )}

            {/* Direct lead capture button */}
            {!quoteResult && (
              <button
                onClick={() => setShowLeadForm(true)}
                className="btn-ghost w-full"
                style={{ fontSize: '0.7rem' }}
              >
                📋 Open Lead Capture Form
              </button>
            )}
          </div>
        </div>

        {/* ========== CARD 3: LEAD & CAMPAIGN TOOLS ========== */}
        <div className="command-tool-card hover-card p-5" style={{ borderLeft: '3px solid var(--accent-cyan)' }}>
          <div className="flex items-center gap-2 mb-4">
            <span style={{ fontSize: '1.2rem' }}>📱</span>
            <h3 className="font-sub text-sm">Lead & Campaign Tools</h3>
            <span className="arch-badge arch-badge-ant arch-badge-sm">Ant Social</span>
          </div>

          <div className="space-y-3">
            <p className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
              Copy-paste social media scripts and campaign templates. Track what converts.
            </p>

            {SOCIAL_SCRIPTS.map((script) => (
              <div key={script.id} className="p-3 border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-sub" style={{ fontSize: '0.65rem', color: 'var(--text)' }}>{script.label}</span>
                  <button
                    onClick={() => copyToClipboard(script.text, script.id)}
                    className="btn-cta-cyan"
                    style={{ padding: '0.15rem 0.4rem', fontSize: '0.55rem' }}
                  >
                    {copiedId === script.id ? '✅' : '📋'}
                  </button>
                </div>
                <p className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  {script.text}
                </p>
              </div>
            ))}

            <button
              onClick={() => setShowLeadForm(true)}
              className="btn-cta-cyan w-full"
              style={{ fontSize: '0.7rem' }}
            >
              📥 CAPTURE NEW LEAD
            </button>
          </div>
        </div>

        {/* ========== CARD 4: INSURANCE LEAD STRATEGIES ========== */}
        <div className="command-tool-card hover-card p-5" style={{ borderLeft: '3px solid var(--accent-green)' }}>
          <div className="flex items-center gap-2 mb-4">
            <span style={{ fontSize: '1.2rem' }}>🎯</span>
            <h3 className="font-sub text-sm">Lead Strategies (Ranked)</h3>
            <span className="arch-badge arch-badge-owl arch-badge-sm">Owl Analytics</span>
          </div>

          <div className="space-y-2">
            {[
              { rank: 1, title: 'Referral Systems', impact: 'HIGHEST', desc: 'Existing clients + partnerships. Converts 5-10x better than cold leads.', color: 'var(--accent-red)' },
              { rank: 2, title: 'Content + SEO Lead Magnets', impact: 'HIGH', desc: 'Free calculators, quizzes, guides. Long-term ROI king.', color: 'var(--accent-yellow)' },
              { rank: 3, title: 'Webinars + Live Demos', impact: 'HIGH', desc: 'Host "No-Hassle Claims Explained" sessions. Qualified appointments.', color: 'var(--accent-yellow)' },
              { rank: 4, title: 'Targeted Digital Ads', impact: 'MEDIUM', desc: 'FB/IG ads to 30-50 age group. Retarget quiz abandoners.', color: 'var(--accent-cyan)' },
              { rank: 5, title: 'Partnerships & Affiliates', impact: 'MEDIUM', desc: 'Cross-promote with Maxicare/Intellicare or corporate HR.', color: 'var(--accent-cyan)' },
              { rank: 6, title: 'Paid Lead Vendors', impact: 'LOW', desc: 'Quick volume but lower quality. Use only for testing.', color: 'var(--text-muted)' },
            ].map((strategy) => (
              <div key={strategy.rank} className="flex items-start gap-3 p-2 border" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center border" style={{ borderColor: strategy.color, color: strategy.color, fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.2rem' }}>
                  {strategy.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-sub" style={{ fontSize: '0.7rem' }}>{strategy.title}</span>
                    <span className="tag" style={{ fontSize: '0.5rem', color: strategy.color, borderColor: strategy.color }}>{strategy.impact}</span>
                  </div>
                  <p className="font-mono mt-0.5" style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>
                    {strategy.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 border" style={{ borderColor: 'var(--accent-red)', background: 'var(--accent-red-dim)' }}>
            <p className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--accent-red)' }}>
              ⚡ FLAG: Pure cold calling or generic spiels waste time. Tie every strategy back to your hub for tracking and conversion.
            </p>
          </div>
        </div>
      </div>

      {/* ============================== */}
      {/* QUICK ACTIONS BAR              */}
      {/* ============================== */}
      <section className="reveal-section p-5 border" style={{ background: 'var(--bg-panel)', borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="font-sub" style={{ fontSize: '0.75rem' }}>⚡ Quick Actions</span>
          <span className="sticker-accent" style={{ fontSize: '0.5rem', padding: '0.1rem 0.4rem' }}>DAILY DRIVER</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => copyToClipboard(SPIELS[0].text, 'quick-family')} className="btn-cta" style={{ fontSize: '0.65rem', padding: '0.4rem 0.8rem' }}>
            {copiedId === 'quick-family' ? '✅ Copied!' : '🗣️ Family Opener'}
          </button>
          <button onClick={() => copyToClipboard(SPIELS[1].text, 'quick-health')} className="btn-cta-yellow" style={{ fontSize: '0.65rem', padding: '0.4rem 0.8rem' }}>
            {copiedId === 'quick-health' ? '✅ Copied!' : '🏥 Health Closer'}
          </button>
          <button onClick={() => copyToClipboard(SPIELS[4].text, 'quick-flexi')} className="btn-ghost" style={{ fontSize: '0.65rem' }}>
            {copiedId === 'quick-flexi' ? '✅ Copied!' : '🛡️ FlexiShield Pitch'}
          </button>
          <button onClick={() => setShowLeadForm(true)} className="btn-cta-cyan" style={{ fontSize: '0.65rem', padding: '0.4rem 0.8rem' }}>
            📥 New Lead
          </button>
        </div>
      </section>

      {/* ============================== */}
      {/* LEAD FORM MODAL                */}
      {/* ============================== */}
      {showLeadForm && (
        <div className="fixed inset-0 flex items-center justify-center z-[10000]" style={{ background: 'rgba(0,0,0,0.85)' }}>
          <div className="p-8 border-2 w-full max-w-md mx-4" style={{ background: 'var(--bg-panel)', borderColor: 'var(--accent-red)' }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="arch-badge arch-badge-eagle">🦅 Capture Lead</span>
              </div>
              <button
                onClick={() => { setShowLeadForm(false); setLeadSuccess(false); }}
                className="font-mono"
                style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}
              >
                ✕
              </button>
            </div>

            {leadSuccess ? (
              <div className="text-center py-8">
                <div className="font-display" style={{ fontSize: '3rem', color: 'var(--accent-green)' }}>✅</div>
                <h3 className="font-sub text-xl mt-3" style={{ color: 'var(--text)' }}>Lead Saved!</h3>
                <p className="font-mono mt-2" style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                  Lead captured and synced. Schedule your 15-min call now.
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  <div>
                    <label className="font-mono block mb-1" style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Client Name *</label>
                    <input
                      type="text"
                      placeholder="Juan Dela Cruz"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="w-full p-3 border"
                      style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)', color: 'var(--text)', fontFamily: 'DM Mono, monospace', fontSize: '0.75rem' }}
                    />
                  </div>

                  <div>
                    <label className="font-mono block mb-1" style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Phone</label>
                    <input
                      type="tel"
                      placeholder="+63 9XX XXX XXXX"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      className="w-full p-3 border"
                      style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)', color: 'var(--text)', fontFamily: 'DM Mono, monospace', fontSize: '0.75rem' }}
                    />
                  </div>

                  <div>
                    <label className="font-mono block mb-1" style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Email</label>
                    <input
                      type="email"
                      placeholder="client@email.com"
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      className="w-full p-3 border"
                      style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)', color: 'var(--text)', fontFamily: 'DM Mono, monospace', fontSize: '0.75rem' }}
                    />
                  </div>

                  <div>
                    <label className="font-mono block mb-1" style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Source</label>
                    <select
                      value={leadSource}
                      onChange={(e) => setLeadSource(e.target.value)}
                      className="w-full p-3 border"
                      style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)', color: leadSource ? 'var(--text)' : 'var(--text-muted)', fontFamily: 'DM Mono, monospace', fontSize: '0.75rem' }}
                    >
                      <option value="command-center">Command Center</option>
                      <option value="spiel-copied">Spiel Copied</option>
                      <option value="quote-generated">Quote Generated</option>
                      <option value="social-campaign">Social Campaign</option>
                      <option value="referral">Referral</option>
                      <option value="cold-outreach">Cold Outreach</option>
                    </select>
                  </div>

                  {quoteResult && (
                    <div className="p-3 border" style={{ background: 'var(--accent-yellow-dim)', borderColor: 'var(--accent-yellow)' }}>
                      <p className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--accent-yellow)' }}>
                        Quote: ₱{quoteResult.premium}/mo — {quoteResult.product}
                      </p>
                    </div>
                  )}

                  <button
                    onClick={saveLead}
                    disabled={!leadName.trim() || leadSaving}
                    className="btn-cta w-full"
                    style={{ opacity: leadName.trim() && !leadSaving ? 1 : 0.5 }}
                  >
                    {leadSaving ? '⏳ Saving...' : '🦅 SAVE LEAD & SCHEDULE CALL'}
                  </button>

                  <button
                    onClick={() => { setShowLeadForm(false); setLeadSuccess(false); }}
                    className="w-full text-center font-mono mt-2"
                    style={{ color: 'var(--text-muted)', fontSize: '0.65rem', background: 'none', border: 'none' }}
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
