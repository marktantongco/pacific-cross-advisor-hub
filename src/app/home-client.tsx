'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  useGsapCursorRing, useGsapScrollReveal, useGsapNavCascade,
  useGsapMagneticAll, useGsapMarquee, useGsapThemeTransition,
  useGsapModeTransition, useGsapCounter,
} from '@/lib/gsap-engine';
import { HomeSection } from '@/components/sections/home';
import { AdvisorCommandCenter } from '@/components/sections/advisor-command-center';
import { ProductsSection } from '@/components/sections/products';
import { AdvisorPlaybookSection } from '@/components/sections/advisor-playbook';
import { SocialMediaSection } from '@/components/sections/social-media';
import { PhInsuranceSection } from '@/components/sections/ph-insurance';
import { TrainingSection } from '@/components/sections/training';
import { RoadmapSection } from '@/components/sections/roadmap';
import { ClientHubSection } from '@/components/sections/client-hub';
import { ModeGateway } from '@/components/ModeGateway';
import { ClientModeLayout } from '@/components/ClientModeLayout';
import { SocialCards } from '@/components/SocialCards';
import type { TabId } from '@/lib/data';
import { stats } from '@/lib/data';

// ============================================================
// TAB DEFINITIONS — MAPPED TO EDITORIAL GRID
// ============================================================

const NAV_ITEMS: { id: TabId; label: string; icon: string; grid: string }[] = [
  { id: 'home', label: 'Command Center', icon: '⚡', grid: 'HOME BASE' },
  { id: 'command', label: 'Advisor Tools', icon: '🦅', grid: 'EAGLE HUB' },
  { id: 'products', label: 'FlexiShield', icon: '🛡️', grid: 'HMO HERO' },
  { id: 'products', label: 'Blue Royale', icon: '👑', grid: 'LEGACY BOSS' },
  { id: 'playbook', label: 'Advisor Playbook', icon: '🗣️', grid: 'SPIEL FLOW' },
  { id: 'social', label: 'Social Media', icon: '📱', grid: 'CONTENT HQ' },
  { id: 'phinsurance', label: 'PH Insurance Data', icon: '🇵🇭', grid: 'CRASH STATS' },
  { id: 'training', label: 'Training', icon: '📚', grid: 'MASTERCLASS' },
  { id: 'roadmap', label: 'Roadmap', icon: '🗺️', grid: 'PROGRESS' },
  { id: 'client', label: 'Client Hub', icon: '🤝', grid: 'CALCULATOR' },
];

const MOBILE_TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'home', label: 'Home', icon: '⚡' },
  { id: 'command', label: 'Tools', icon: '🦅' },
  { id: 'products', label: 'Products', icon: '💎' },
  { id: 'playbook', label: 'Playbook', icon: '🗣️' },
  { id: 'client', label: 'Client', icon: '🤝' },
];

const EXTRA_TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'phinsurance', label: 'PH Data', icon: '🇵🇭' },
  { id: 'training', label: 'Train', icon: '📚' },
  { id: 'roadmap', label: 'Roadmap', icon: '🗺️' },
];

// ============================================================
// MARQUEE TICKER DATA
// ============================================================

const TICKER_ITEMS = [
  '🇵🇭 1.79% INSURANCE PENETRATION',
  '🏥 70% OF FILIPINOS HAVE NO HEALTH INSURANCE',
  '💸 ₱8,000/YR ON LOAD VS ₱500/YR ON INSURANCE',
  '🔥 40% OF FINANCIAL RUIN = MEDICAL EMERGENCIES',
  '✈️ 2.2M OFWs NEED PROTECTION',
  '👑 75+ YEARS OF PACIFIC CROSS SERVICE',
  '🛡️ FLEXISHIELD FROM ₱6,510/YR',
  '💎 BLUE ROYALE FROM $1,676/YR',
  '🦫 FLEXISHIELD FROM ₱18/DAY',
  '🦅 BLUE ROYALE FROM $5/DAY',
];

// ============================================================
// MAIN PAGE COMPONENT (CLIENT-ONLY — NO SSR)
// ============================================================

type AppMode = 'advisor' | 'client';

export default function HomeClient() {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [showLoadWipe, setShowLoadWipe] = useState(true);
  const [showMobileExtra, setShowMobileExtra] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Read mode from localStorage immediately — safe because this
  // component is only ever rendered on the client (ssr: false).
  const [mode, setMode] = useState<AppMode | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const saved = localStorage.getItem('pcx-mode');
      if (saved === 'advisor' || saved === 'client') return saved;
    } catch { /* ignore */ }
    return null;
  });

  // GSAP Cursor Ring (replaces useCustomCursor)
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  useGsapCursorRing(dotRef, ringRef);

  // GSAP Scroll Reveal (replaces useScrollReveal)
  const hubRef = useRef<HTMLDivElement>(null);
  useGsapScrollReveal(hubRef);

  // GSAP Nav Cascade (replaces CSS cascade-left / slide-right-in)
  useGsapNavCascade(hubRef);

  // GSAP Magnetic Buttons
  useGsapMagneticAll(hubRef);

  // GSAP Theme Transition
  const animateThemeSwitch = useGsapThemeTransition();

  // GSAP Mode Transition
  const animateModeSwitch = useGsapModeTransition();

  // Theme toggle
  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    animateThemeSwitch(() => {
      setTheme(next);
      document.documentElement.setAttribute('data-theme', next);
    });
  }, [theme, animateThemeSwitch]);

  // Sync data-mode attribute whenever mode changes
  useEffect(() => {
    if (mode) {
      document.documentElement.setAttribute('data-mode', mode);
    }
  }, [mode]);

  // Load wipe dismiss
  useEffect(() => {
    const timer = setTimeout(() => setShowLoadWipe(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Tab change handler
  const handleTabChange = useCallback((tab: TabId) => {
    setActiveTab(tab);
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Mode select handler (called by gateway)
  const handleModeSelect = useCallback((selectedMode: AppMode) => {
    setMode(selectedMode);
    document.documentElement.setAttribute('data-mode', selectedMode);
    try { localStorage.setItem('pcx-mode', selectedMode); } catch { /* ignore */ }
  }, []);

  // Mode toggle handler (called by header button)
  const handleModeToggle = useCallback(() => {
    animateModeSwitch(() => {
      setMode((prev) => {
        const next = prev === 'advisor' ? 'client' : 'advisor';
        try { localStorage.setItem('pcx-mode', next); } catch { /* ignore */ }
        document.documentElement.setAttribute('data-mode', next);
        return next;
      });
      setActiveTab('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }, [animateModeSwitch]);

  // Section renderer (advisor mode)
  const renderSection = () => {
    switch (activeTab) {
      case 'home': return <HomeSection onNavigate={handleTabChange} />;
      case 'command': return <AdvisorCommandCenter />;
      case 'products': return <ProductsSection />;
      case 'playbook': return <AdvisorPlaybookSection />;
      case 'social': return <SocialMediaSection />;
      case 'phinsurance': return <PhInsuranceSection />;
      case 'training': return <TrainingSection />;
      case 'roadmap': return <RoadmapSection />;
      case 'client': return <ClientHubSection />;
      default: return <HomeSection onNavigate={handleTabChange} />;
    }
  };

  // Stat counter refs (GSAP-powered counters)
  const statPenetrationRef = useRef<HTMLDivElement>(null);
  const statUninsuredRef = useRef<HTMLDivElement>(null);
  useGsapCounter(statPenetrationRef, stats.phPenetration * 100, { decimals: 2, suffix: '%', duration: 2, scrollTrigger: false });
  useGsapCounter(statUninsuredRef, 70, { suffix: '%', duration: 2, scrollTrigger: false });

  // GSAP Marquee (replaces CSS marquee animation)
  const marqueeRef = useRef<HTMLDivElement>(null);
  useGsapMarquee(marqueeRef);

  // Show gateway if no mode selected
  if (!mode) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
        {/* Load wipe overlay */}
        {showLoadWipe && <div className="load-wipe" />}

        {/* Custom cursor */}
        <div ref={dotRef} className="custom-cursor-dot" />
        <div ref={ringRef} className="custom-cursor-ring" />

        {/* Noise + Vignette handled by layout */}
        <ModeGateway onModeSelect={handleModeSelect} />
      </div>
    );
  }

  const isAdvisor = mode === 'advisor';
  const tickerColor = isAdvisor ? 'var(--accent-red)' : 'var(--accent-cyan)';

  return (
    <div ref={hubRef} className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Load wipe overlay */}
      {showLoadWipe && <div className="load-wipe" />}

      {/* Custom cursor */}
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={ringRef} className="custom-cursor-ring" />

      {/* ===== HEADER BAR ===== */}
      <header
        className="sticky top-0 z-[100] border-b grid-line-in"
        style={{
          background: 'var(--bg)',
          borderColor: 'var(--grid-border)',
        }}
      >
        <div className="flex items-center justify-between px-4 py-2.5 max-w-[1800px] mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <h1 className="font-display text-lg tracking-tight" style={{ color: 'var(--text)' }}>
              PACIFIC<span style={{ color: 'var(--accent-red)' }}>×</span>CROSS
            </h1>
            <span
              className="hidden sm:inline font-mono text-[0.6rem] uppercase tracking-widest border-l pl-3"
              style={{ borderColor: 'var(--border)', color: 'var(--text-dim)' }}
            >
              {isAdvisor ? 'Advisor Hub' : 'Client Hub'}
            </span>
            <span className="arch-badge arch-badge-owl arch-badge-sm">Wisdom</span>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Mode indicator + toggle */}
            <button onClick={handleModeToggle} className="mode-toggle">
              <span className={`mode-dot ${isAdvisor ? 'mode-dot-red' : 'mode-dot-cyan'}`} />
              <span>{isAdvisor ? 'ADVISOR' : 'CLIENT'}</span>
            </button>

            <span
              className="hidden md:inline font-mono text-[0.6rem] uppercase tracking-wider"
              style={{ color: 'var(--text-dim)' }}
            >
              Protect Your Future. No Cap.
            </span>

            {/* Theme toggle */}
            <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
              <span className="text-xs">{theme === 'dark' ? '☀' : '☾'}</span>
              <div className="theme-toggle-indicator" />
            </button>
          </div>
        </div>
      </header>

      {/* ===== MARQUEE TICKER ===== */}
      <div
        className="border-b overflow-hidden"
        style={{ background: tickerColor, borderColor: tickerColor }}
      >
        <div ref={marqueeRef} className="marquee-track py-1.5" style={{ willChange: 'transform' }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              className="whitespace-nowrap px-6 font-sub text-xs uppercase tracking-wider font-bold"
              style={{ color: 'var(--bg)' }}
            >
              {item}
              <span className="mx-4" style={{ color: 'rgba(0,0,0,0.3)' }}>{'///'}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ===== MAIN CONTENT AREA ===== */}
      <div className="mode-transition-enter">
        {isAdvisor ? (
          /* ===== ADVISOR MODE: 3-COLUMN EDITORIAL GRID ===== */
          <div className="editorial-grid max-w-[1800px] mx-auto">
            {/* LEFT COLUMN — NAVIGATION HUB */}
            <aside className="hide-mobile" style={{ background: 'var(--bg)' }}>
              <div className="p-4">
                {/* Mode indicator */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="mode-dot mode-dot-red" />
                  <span className="font-mono" style={{ fontSize: '0.55rem', color: 'var(--accent-red)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Advisor Mode
                  </span>
                  <span className="arch-badge arch-badge-eagle arch-badge-sm">Eagle</span>
                </div>

                {/* Quick Actions */}
                <div className="panel-header">Quick Actions</div>
                <nav className="flex flex-col gap-1">
                  {NAV_ITEMS.map((item, i) => (
                    <button
                      key={`${item.id}-${item.label}-${i}`}
                      onClick={() => handleTabChange(item.id)}
                      className={`nav-link text-left ${activeTab === item.id ? 'active' : ''}`}
                    >
                      <span className="mr-2">{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
                </nav>

                {/* Protection Plans */}
                <div className="mt-6 panel-header">Protection Plans</div>
                <div className="space-y-2">
                  <button
                    onClick={() => handleTabChange('products')}
                    className="w-full text-left p-3 border hover-card"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-sub text-sm font-bold" style={{ color: 'var(--accent-yellow)' }}>
                        01 — FLEXISHIELD
                      </span>
                      <span className="arch-badge arch-badge-beaver arch-badge-sm">Beaver</span>
                    </div>
                    <div className="font-mono text-[0.6rem] mt-1" style={{ color: 'var(--text-muted)' }}>
                      HMO Hero • From ₱6,510/yr
                    </div>
                    <div className="arch-price-beaver-daily mt-1">
                      <span className="arch-price-beaver-daily-unit">₱18</span>
                      <span className="font-mono text-[0.55rem]" style={{ color: 'var(--text-muted)' }}>/day</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleTabChange('products')}
                    className="w-full text-left p-3 border hover-card"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-sub text-sm font-bold" style={{ color: 'var(--accent-yellow)' }}>
                        02 — BLUE ROYALE
                      </span>
                      <span className="arch-badge arch-badge-eagle arch-badge-sm">Eagle</span>
                    </div>
                    <div className="font-mono text-[0.6rem] mt-1" style={{ color: 'var(--text-muted)' }}>
                      Legacy Boss • From $1,676/yr
                    </div>
                    <div className="price-daily mt-1">
                      <span className="price-daily-amount">$5</span>
                      <span className="price-daily-label">/day</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleTabChange('products')}
                    className="w-full text-left p-3 border hover-card"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-sub text-sm font-bold" style={{ color: 'var(--accent-yellow)' }}>
                        03 — OFW PLANS
                      </span>
                      <span className="arch-badge arch-badge-eagle arch-badge-sm">OFW</span>
                    </div>
                    <div className="font-mono text-[0.6rem] mt-1" style={{ color: 'var(--text-muted)' }}>
                      Worldwide Coverage • 90 Days/Trip
                    </div>
                  </button>
                </div>

                {/* Start CTA */}
                <button
                  onClick={handleModeToggle}
                  className="btn-cta w-full mt-6"
                  style={{ animationDelay: '1s' }}
                >
                  SWITCH TO CLIENT MODE →
                </button>
              </div>
            </aside>

            {/* CENTER COLUMN — MAIN CONTENT */}
            <main
              ref={contentRef}
              className="p-4 md:p-6 overflow-y-auto"
              style={{
                background: 'var(--bg)',
                maxHeight: 'calc(100vh - 90px)',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-2xl mx-auto"
                >
                  {renderSection()}
                </motion.div>
              </AnimatePresence>
            </main>

            {/* RIGHT COLUMN — WIDGETS */}
            <aside className="hide-mobile" style={{ background: 'var(--bg)' }}>
              <div className="p-4">
                {/* Mode indicator */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="mode-dot mode-dot-red" />
                  <span className="font-mono" style={{ fontSize: '0.55rem', color: 'var(--accent-red)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Advisor Mode
                  </span>
                </div>

                {/* Trending Stats */}
                <div className="panel">
                  <div className="panel-header" style={{ borderColor: 'var(--accent-red)', color: 'var(--accent-red)' }}>
                    <span>⚡ Trending Stats</span>
                    <span className="arch-badge arch-badge-owl arch-badge-sm">Owl Analytics</span>
                  </div>
                  <div className="space-y-3">
                    <div className="arch-card-owl-stat">
                      <div ref={statPenetrationRef} className="arch-card-owl-stat-number stat-value text-stroke-red" style={{ fontSize: '3rem' }}>
                        0%
                      </div>
                      <div className="arch-card-owl-stat-explanation stat-label mt-1">PH Insurance Penetration</div>
                      <div className="arch-card-owl-stat-source font-mono text-[0.55rem] mt-1" style={{ color: 'var(--text-muted)' }}>
                        Source: Insurance Commission PH
                      </div>
                      <div className="w-full h-1 mt-2" style={{ background: 'var(--border)' }}>
                        <div
                          className="h-full"
                          style={{
                            background: 'var(--accent-red)',
                            width: `${(stats.phPenetration / 6.75) * 100}%`,
                            transition: 'width 1.5s ease',
                          }}
                        />
                      </div>
                    </div>

                    <div className="border-t pt-3 arch-card-owl-stat" style={{ borderColor: 'var(--border)' }}>
                      <div ref={statUninsuredRef} className="arch-card-owl-stat-number stat-value" style={{ fontSize: '3rem', color: 'var(--accent-yellow)' }}>
                        0%
                      </div>
                      <div className="arch-card-owl-stat-explanation stat-label mt-1">Filipinos Uninsured</div>
                      <div className="arch-card-owl-stat-source font-mono text-[0.55rem] mt-1" style={{ color: 'var(--text-muted)' }}>
                        Source: PSA Survey 2023
                      </div>
                    </div>

                    <div className="border-t pt-3 arch-card-owl-stat" style={{ borderColor: 'var(--border)' }}>
                      <div className="arch-card-owl-stat-number font-display text-2xl" style={{ color: 'var(--text)' }}>
                        ₱8,000
                      </div>
                      <div className="arch-card-owl-stat-explanation stat-label mt-1">Annual Mobile Load Spend</div>
                      <div className="arch-card-owl-stat-number font-display text-2xl mt-2" style={{ color: 'var(--accent-red)' }}>
                        ₱500
                      </div>
                      <div className="arch-card-owl-stat-explanation stat-label mt-1">Annual Insurance Spend</div>
                      <div className="arch-card-owl-stat-source font-mono text-[0.6rem] mt-2" style={{ color: 'var(--accent-yellow)' }}>
                        16× MORE ON LOAD THAN PROTECTION
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Card Preview */}
                <div className="panel mt-4">
                  <div className="panel-header" style={{ borderColor: 'var(--accent-yellow)', color: 'var(--accent-yellow)' }}>
                    <span>📱 Social Card Preview</span>
                    <span className="arch-badge arch-badge-ant arch-badge-sm">Ant Social</span>
                  </div>
                  <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <SocialCards compact />
                  </div>
                </div>

                {/* Daily Insight */}
                <div className="panel mt-4" data-archetype="owl">
                  <div className="panel-header">
                    <span>📊 Daily Insight</span>
                    <span className="arch-badge arch-badge-owl arch-badge-sm">Owl</span>
                  </div>
                  <div className="p-3 border" style={{ background: 'var(--accent-red-dim)', borderColor: 'var(--accent-red)' }}>
                    <p className="font-sub text-sm font-bold" style={{ color: 'var(--accent-red)' }}>
                      &ldquo;Most Filipinos insure their phones before their lives.&rdquo;
                    </p>
                    <p className="font-mono text-[0.6rem] mt-2" style={{ color: 'var(--text-muted)' }}>
                      Medical emergencies account for 40% of financial ruin in the Philippines. A single ICU bill can reach ₱500K+.
                    </p>
                  </div>
                </div>

                {/* Expert Advisors */}
                <div className="panel mt-4">
                  <div className="panel-header">
                    <span>🏆 Expert Advisors</span>
                    <span className="arch-badge arch-badge-ant arch-badge-sm">Ant Leaderboard</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { name: 'Top Advisor', stat: '52 Policies / Q1', icon: '🥇' },
                      { name: 'Rising Star', stat: '23 Policies / Q1', icon: '🥈' },
                      { name: 'New Recruit', stat: '8 Policies / Q1', icon: '🥉' },
                    ].map((advisor, i) => (
                      <div key={i} className="arch-card-ant-social-proof flex items-center gap-3 p-2 border hover-card">
                        <span className="text-lg">{advisor.icon}</span>
                        <div>
                          <div className="font-sub text-xs font-bold">{advisor.name}</div>
                          <div className="font-mono text-[0.6rem]" style={{ color: 'var(--text-muted)' }}>
                            {advisor.stat}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Protection Score */}
                <div className="panel mt-4" data-archetype="owl">
                  <div className="panel-header">
                    <span>🎯 Protection Score</span>
                    <span className="arch-badge arch-badge-owl arch-badge-sm">Owl</span>
                  </div>
                  <div className="text-center py-4">
                    <div className="arch-card-owl-stat-number font-display text-5xl" style={{ color: 'var(--accent-yellow)' }}>
                      73<span className="text-2xl" style={{ color: 'var(--text-muted)' }}>/100</span>
                    </div>
                    <div className="font-mono text-[0.6rem] mt-2" style={{ color: 'var(--text-muted)' }}>
                      YOUR READINESS RATING
                    </div>
                    <div className="flex gap-1 mt-3 justify-center flex-wrap">
                      {['Products', 'Spiels', 'FAQ', 'Social', 'Quiz'].map((skill, i) => (
                        <span key={skill} className={`tag ${i < 3 ? 'tag-yellow' : ''}`}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="panel mt-4">
                  <div className="panel-header">
                    <span>📞 Contact</span>
                    <span className="arch-badge arch-badge-beaver arch-badge-sm">Beaver Contact</span>
                  </div>
                  <div className="font-mono text-[0.6rem] space-y-1" style={{ color: 'var(--text-muted)' }}>
                    <p>📞 +63 2 8230-8511</p>
                    <p>📧 info@pacificcross.com.ph</p>
                    <p>🏢 Makati HQ / Cebu / Clark / Davao</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        ) : (
          /* ===== CLIENT MODE: SINGLE COLUMN DISCOVERY ===== */
          <ClientModeLayout onNavigate={handleTabChange} />
        )}
      </div>

      {/* ===== MOBILE NAVIGATION (shown < 900px) ===== */}
      <div className="mobile-nav md:hidden" data-archetype="eagle">
        <div className="flex items-center justify-around">
          {MOBILE_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`mobile-nav-item ${activeTab === tab.id ? 'active' : ''}`}
            >
              <span className="text-base">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}

          {/* More button */}
          <button
            onClick={() => setShowMobileExtra(!showMobileExtra)}
            className="mobile-nav-item"
          >
            <span className="text-base">⋯</span>
            <span>More</span>
          </button>
        </div>

        {/* Extra tabs */}
        <AnimatePresence>
          {showMobileExtra && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t"
              style={{ borderColor: 'var(--border)', background: 'var(--bg-panel)' }}
            >
              <div className="flex gap-2 p-3 flex-wrap">
                {EXTRA_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      handleTabChange(tab.id);
                      setShowMobileExtra(false);
                    }}
                    className={`btn-ghost ${activeTab === tab.id ? 'border-accent text-accent' : ''}`}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
                <button
                  onClick={() => setShowMobileExtra(false)}
                  className="btn-ghost"
                >
                  ✕ Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile bottom safe area */}
      <div className="h-16 md:hidden" />
    </div>
  );
}
