'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HomeSection } from '@/components/sections/home';
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
  { id: 'products', label: 'Products', icon: '💎' },
  { id: 'playbook', label: 'Playbook', icon: '🗣️' },
  { id: 'social', label: 'Social', icon: '📱' },
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
];

// ============================================================
// CUSTOM CURSOR HOOK
// ============================================================

function useCustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top = `${mouseY}px`;
      }
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
      }
      animId = requestAnimationFrame(animateRing);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, [role="button"], .hover-card, input, select, textarea');
      ringRef.current?.classList.toggle('interactive', !!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    animateRing();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  return { dotRef, ringRef };
}

// ============================================================
// SCROLL REVEAL HOOK
// ============================================================

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('.reveal-section').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
}

// ============================================================
// STAT COUNTER HOOK
// ============================================================

function useCountUp(targetValue: number, isActive: boolean) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const duration = 1500;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(targetValue * eased);
      setDisplay(current);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [targetValue, isActive]);

  return display;
}

// ============================================================
// MAIN PAGE COMPONENT
// ============================================================

type AppMode = 'advisor' | 'client';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [showLoadWipe, setShowLoadWipe] = useState(true);
  const [showMobileExtra, setShowMobileExtra] = useState(false);
  const [countersActive, setCountersActive] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const { dotRef, ringRef } = useCustomCursor();
  useScrollReveal();

  // Theme toggle
  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
  }, [theme]);

  // Load mode from localStorage (or show gateway)
  // Using lazy initializer to avoid setState in effect
  const [mode, setMode] = useState<AppMode | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const saved = localStorage.getItem('pcx-mode');
      if (saved === 'advisor' || saved === 'client') return saved;
    } catch { /* ignore */ }
    return null;
  });

  // Set data-mode attribute on html
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

  // Activate stat counters after load
  useEffect(() => {
    const timer = setTimeout(() => setCountersActive(true), 1500);
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
  }, []);

  // Mode toggle handler (called by header button)
  const handleModeToggle = useCallback(() => {
    setTransitioning(true);
    setTimeout(() => {
      setMode((prev) => {
        const next = prev === 'advisor' ? 'client' : 'advisor';
        try { localStorage.setItem('pcx-mode', next); } catch { /* ignore */ }
        document.documentElement.setAttribute('data-mode', next);
        return next;
      });
      setActiveTab('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => setTransitioning(false), 300);
    }, 300);
  }, []);

  // Section renderer (advisor mode)
  const renderSection = () => {
    switch (activeTab) {
      case 'home': return <HomeSection onNavigate={handleTabChange} />;
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

  // Stat counter values
  const statPenetration = useCountUp(stats.phPenetration * 100, countersActive);
  const statUninsured = useCountUp(70, countersActive);

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
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
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
        <div className="marquee-track py-1.5">
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
      <div className={transitioning ? 'mode-transition-exit' : 'mode-transition-enter'}>
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
                </div>

                {/* Quick Actions */}
                <div className="panel-header">Quick Actions</div>
                <nav className="flex flex-col gap-1">
                  {NAV_ITEMS.map((item, i) => (
                    <button
                      key={`${item.id}-${item.label}-${i}`}
                      onClick={() => handleTabChange(item.id)}
                      className={`nav-link text-left cascade-left ${activeTab === item.id ? 'active' : ''}`}
                      style={{ animationDelay: `${0.6 + i * 0.08}s` }}
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
                    <div className="font-sub text-sm font-bold" style={{ color: 'var(--accent-yellow)' }}>
                      01 — FLEXISHIELD
                    </div>
                    <div className="font-mono text-[0.6rem] mt-1" style={{ color: 'var(--text-muted)' }}>
                      HMO Hero • From ₱6,510/yr
                    </div>
                  </button>

                  <button
                    onClick={() => handleTabChange('products')}
                    className="w-full text-left p-3 border hover-card"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <div className="font-sub text-sm font-bold" style={{ color: 'var(--accent-yellow)' }}>
                      02 — BLUE ROYALE
                    </div>
                    <div className="font-mono text-[0.6rem] mt-1" style={{ color: 'var(--text-muted)' }}>
                      Legacy Boss • From $1,676/yr
                    </div>
                  </button>

                  <button
                    onClick={() => handleTabChange('products')}
                    className="w-full text-left p-3 border hover-card"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <div className="font-sub text-sm font-bold" style={{ color: 'var(--accent-yellow)' }}>
                      03 — OFW PLANS
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
                <div className="panel slide-right-in" style={{ animationDelay: '0.8s' }}>
                  <div className="panel-header" style={{ borderColor: 'var(--accent-red)', color: 'var(--accent-red)' }}>
                    ⚡ Trending Stats
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="stat-value text-stroke-red" style={{ fontSize: '3rem' }}>
                        {(statPenetration / 100).toFixed(2)}%
                      </div>
                      <div className="stat-label mt-1">PH Insurance Penetration</div>
                      <div className="w-full h-1 mt-2" style={{ background: 'var(--border)' }}>
                        <div
                          className="h-full"
                          style={{
                            background: 'var(--accent-red)',
                            width: `${(statPenetration / 100 / 6.75) * 100}%`,
                            transition: 'width 1.5s ease',
                          }}
                        />
                      </div>
                    </div>

                    <div className="border-t pt-3" style={{ borderColor: 'var(--border)' }}>
                      <div className="stat-value" style={{ fontSize: '3rem', color: 'var(--accent-yellow)' }}>
                        {statUninsured}%
                      </div>
                      <div className="stat-label mt-1">Filipinos Uninsured</div>
                    </div>

                    <div className="border-t pt-3" style={{ borderColor: 'var(--border)' }}>
                      <div className="font-display text-2xl" style={{ color: 'var(--text)' }}>
                        ₱8,000
                      </div>
                      <div className="stat-label mt-1">Annual Mobile Load Spend</div>
                      <div className="font-display text-2xl mt-2" style={{ color: 'var(--accent-red)' }}>
                        ₱500
                      </div>
                      <div className="stat-label mt-1">Annual Insurance Spend</div>
                      <div className="font-mono text-[0.6rem] mt-2" style={{ color: 'var(--accent-yellow)' }}>
                        16× MORE ON LOAD THAN PROTECTION
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Card Preview */}
                <div className="panel mt-4 slide-right-in" style={{ animationDelay: '0.85s' }}>
                  <div className="panel-header" style={{ borderColor: 'var(--accent-yellow)', color: 'var(--accent-yellow)' }}>
                    📱 Social Card Preview
                  </div>
                  <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <SocialCards compact />
                  </div>
                </div>

                {/* Daily Insight */}
                <div className="panel mt-4 slide-right-in" style={{ animationDelay: '0.9s' }}>
                  <div className="panel-header">📊 Daily Insight</div>
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
                <div className="panel mt-4 slide-right-in" style={{ animationDelay: '1s' }}>
                  <div className="panel-header">🏆 Expert Advisors</div>
                  <div className="space-y-2">
                    {[
                      { name: 'Top Advisor', stat: '52 Policies / Q1', icon: '🥇' },
                      { name: 'Rising Star', stat: '23 Policies / Q1', icon: '🥈' },
                      { name: 'New Recruit', stat: '8 Policies / Q1', icon: '🥉' },
                    ].map((advisor, i) => (
                      <div key={i} className="flex items-center gap-3 p-2 border hover-card">
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
                <div className="panel mt-4 slide-right-in" style={{ animationDelay: '1.1s' }}>
                  <div className="panel-header">🎯 Protection Score</div>
                  <div className="text-center py-4">
                    <div className="font-display text-5xl" style={{ color: 'var(--accent-yellow)' }}>
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
                <div className="panel mt-4 slide-right-in" style={{ animationDelay: '1.2s' }}>
                  <div className="panel-header">📞 Contact</div>
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
      <div className="mobile-nav md:hidden">
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
