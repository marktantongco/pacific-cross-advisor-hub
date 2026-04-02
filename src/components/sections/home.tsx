'use client';

import { useEffect, useRef } from 'react';
import { stats, products } from '@/lib/data';

interface HomeSectionProps {
  onNavigate: (tab: string) => void;
}

export function HomeSection({ onNavigate }: HomeSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const sections = root.querySelectorAll('.reveal-section');
    sections.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="space-y-8 pb-16">
      {/* ============================== */}
      {/* 1. HERO BANNER                 */}
      {/* ============================== */}
      <section className="relative overflow-hidden p-6 sm:p-8 border-b-2" style={{ borderColor: 'var(--accent-red)', background: 'var(--bg-panel)' }}>
        {/* Decorative accent stickers */}
        <span className="sticker absolute top-4 right-4" style={{ color: 'var(--accent-yellow)' }}>EST. 1949</span>
        <span className="sticker-accent absolute bottom-4 left-4">INSURANCE HUB</span>

        {/* Vertical label */}
        <div
          className="hidden sm:block absolute top-0 left-0 h-full w-8 flex items-center justify-center overflow-hidden"
          style={{ background: 'var(--accent-red)' }}
        >
          <span
            className="font-sub text-[0.6rem] tracking-widest uppercase"
            style={{ color: 'var(--bg)', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            PACIFIC CROSS
          </span>
        </div>

        <div className="sm:pl-12">
          <h1
            className="font-display hero-slam"
            style={{ fontSize: 'clamp(3rem, 10vw, 7rem)' }}
          >
            <span className="text-stroke-red">PROTECT YOUR</span>
            <br />
            <span className="text-stroke-yellow">FUTURE.</span>{' '}
            <span style={{ color: 'var(--text)' }}>NO CAP.</span>
          </h1>

          <p className="font-mono mt-4" style={{ color: 'var(--text-muted)', maxWidth: '480px' }}>
            Your all-in-one Pacific Cross insurance advisor hub.
            Facts, tools, and products — zero fluff.
          </p>

          <div className="flex gap-3 mt-6 flex-wrap">
            <button className="btn-cta" onClick={() => onNavigate('products')}>
              VIEW PRODUCTS
            </button>
            <button className="btn-ghost" onClick={() => onNavigate('client')}>
              GET STARTED
            </button>
          </div>
        </div>
      </section>

      {/* ============================== */}
      {/* 2. QUICK STATS GRID            */}
      {/* ============================== */}
      <section className="reveal-section">
        <div className="mb-4">
          <h2 className="section-title">THE NUMBERS</h2>
          <p className="section-subtitle mt-1">Philippine insurance landscape at a glance</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {stats.quickStats.map((stat, i) => (
            <div key={i} className="hover-card p-4 stagger-child text-center">
              <div className="stat-value">
                {stat.prefix || ''}
                {stat.value}
                {stat.suffix}
              </div>
              <p className="stat-label mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================== */}
      {/* 3. REALITY CHECK PANEL         */}
      {/* ============================== */}
      <section className="reveal-section">
        <div
          className="p-6 sm:p-8 border-l-4"
          style={{ background: 'var(--bg-card)', borderLeftColor: 'var(--accent-red)' }}
        >
          <div className="flex items-center gap-3 mb-2 stagger-child">
            <span className="tag tag-red">THE REALITY</span>
            <span className="tag">PHILIPPINES</span>
          </div>

          <h2
            className="font-display stagger-child"
            style={{ fontSize: 'clamp(2.5rem, 12vw, 5.5rem)', color: 'var(--accent-red)' }}
          >
            LESS THAN 2% COVERED
          </h2>

          <p className="font-mono mt-3 stagger-child" style={{ color: 'var(--text-muted)', maxWidth: '460px' }}>
            Only {stats.phPenetration}% of Filipinos have private health insurance.
            The rest? Hoping PhilHealth is enough (spoiler: it&apos;s not).
          </p>

          <div className="mt-4 stagger-child">
            <span className="tag tag-yellow">1.79% PENETRATION RATE</span>
            <span className="tag ml-2" style={{ color: 'var(--accent-red)', borderColor: 'var(--accent-red)' }}>
              ASEAN AVG: 3.5%
            </span>
          </div>
        </div>
      </section>

      {/* ============================== */}
      {/* 4. SHOCKING COMPARISON         */}
      {/* ============================== */}
      <section className="reveal-section">
        <div
          className="p-6 border-2"
          style={{ background: 'var(--bg-panel)', borderColor: 'var(--accent-yellow)' }}
        >
          <div className="flex items-center gap-3 mb-4 stagger-child">
            <span className="sticker-accent">REALITY CHECK</span>
          </div>

          <p
            className="font-sub stagger-child mb-5"
            style={{ fontSize: 'clamp(0.9rem, 3vw, 1.1rem)', fontStyle: 'italic' }}
          >
            &ldquo;MOST FILIPINOS INSURE THEIR PHONES BEFORE THEIR LIVES&rdquo;
          </p>

          <div className="grid grid-cols-2 gap-4 stagger-child">
            {/* Load spending */}
            <div className="text-center p-4" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <div className="mb-2" style={{ fontSize: '2rem' }} aria-hidden="true">
                &#x1F4F1;
              </div>
              <div
                className="font-display"
                style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', color: 'var(--accent-yellow)' }}
              >
                ₱8,000
              </div>
              <p className="stat-label mt-1">Mobile Load / Year</p>
            </div>

            {/* Insurance spending */}
            <div className="text-center p-4" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <div className="mb-2" style={{ fontSize: '2rem' }} aria-hidden="true">
                &#x1F3E5;
              </div>
              <div
                className="font-display"
                style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', color: 'var(--accent-red)' }}
              >
                ₱500
              </div>
              <p className="stat-label mt-1">Insurance / Year</p>
            </div>
          </div>

          <p className="font-mono text-center mt-4 stagger-child" style={{ color: 'var(--text-muted)' }}>
            Filipinos spend <strong style={{ color: 'var(--accent-red)' }}>16x more</strong> on mobile load than health insurance
          </p>
        </div>
      </section>

      {/* ============================== */}
      {/* 5. CHOOSE YOUR ARMOR           */}
      {/* ============================== */}
      <section className="reveal-section">
        <div className="mb-4">
          <h2 className="section-title stagger-child">CHOOSE YOUR ARMOR</h2>
          <p className="section-subtitle mt-1 stagger-child">Two ways to protect what matters</p>
        </div>

        <div className="space-y-4">
          {/* FlexiShield Card */}
          <div
            className="hover-card p-5 stagger-child cursor-pointer"
            style={{ borderLeft: '3px solid var(--accent-yellow)' }}
            onClick={() => onNavigate('products')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onNavigate('products')}
          >
            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0 w-14 h-14 flex items-center justify-center border-2"
                style={{ borderColor: 'var(--accent-yellow)', background: 'var(--accent-yellow-dim)' }}
              >
                <span style={{ fontSize: '1.5rem' }} aria-hidden="true">&#x1F6E1;&#xFE0F;</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-sub" style={{ fontSize: '1.15rem' }}>{products.flexiShield.name}</h3>
                  <span className="tag tag-yellow">HMO ENHANCER</span>
                </div>
                <p className="font-mono mb-3" style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>
                  {products.flexiShield.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="tag tag-yellow">Up to PHP 2M</span>
                  <span className="tag tag-yellow">HMO Enhancer</span>
                  <span className="tag">From ₱6,510/yr</span>
                </div>
              </div>
            </div>
          </div>

          {/* Blue Royale Card */}
          <div
            className="hover-card p-5 stagger-child cursor-pointer"
            style={{ borderLeft: '3px solid var(--accent-red)' }}
            onClick={() => onNavigate('products')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onNavigate('products')}
          >
            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0 w-14 h-14 flex items-center justify-center border-2"
                style={{ borderColor: 'var(--accent-red)', background: 'var(--accent-red-dim)' }}
              >
                <span style={{ fontSize: '1.5rem' }} aria-hidden="true">&#x1F451;</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-sub" style={{ fontSize: '1.15rem' }}>{products.blueRoyale.name}</h3>
                  <span className="tag tag-red">WORLDWIDE</span>
                </div>
                <p className="font-mono mb-3" style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>
                  {products.blueRoyale.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="tag tag-red">Up to USD 2M</span>
                  <span className="tag tag-red">Worldwide</span>
                  <span className="tag">From $1,676/yr</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== */}
      {/* 6. TOP CAUSES OF FINANCIAL RUIN*/}
      {/* ============================== */}
      <section className="reveal-section">
        <div className="mb-4">
          <h2 className="section-title stagger-child">WHY IT MATTERS</h2>
          <p className="section-subtitle mt-1 stagger-child">The #1 cause of financial ruin in the Philippines</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {stats.topCausesOfRuin.map((item, i) => (
            <div
              key={i}
              className="hover-card p-4 text-center stagger-child"
            >
              <div className="mb-1" style={{ fontSize: '1.5rem' }} aria-hidden="true">
                {item.emoji}
              </div>
              <div
                className="font-display"
                style={{
                  fontSize: 'clamp(2rem, 8vw, 3rem)',
                  color: i === 0 ? 'var(--accent-red)' : 'var(--text)',
                }}
              >
                {item.percent}%
              </div>
              <p className="stat-label mt-1">{item.cause}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================== */}
      {/* 7. CTA SECTION                 */}
      {/* ============================== */}
      <section className="reveal-section">
        <div
          className="p-6 sm:p-8 text-center border-t-2"
          style={{ background: 'var(--bg-panel)', borderColor: 'var(--accent-yellow)' }}
        >
          <span className="sticker stagger-child mb-4 inline-block" style={{ color: 'var(--accent-yellow)' }}>
            MAKE YOUR MOVE
          </span>

          <h2
            className="font-display stagger-child mt-2"
            style={{ fontSize: 'clamp(1.8rem, 6vw, 3rem)', color: 'var(--text)' }}
          >
            READY TO ACT?
          </h2>

          <p className="font-mono mt-2 stagger-child" style={{ color: 'var(--text-muted)' }}>
            Start your protection journey or explore our advisor tools
          </p>

          <div className="flex gap-3 justify-center flex-wrap mt-6 stagger-child">
            <button className="btn-cta" onClick={() => onNavigate('client')}>
              FOR CLIENTS
            </button>
            <button className="btn-cta-yellow" onClick={() => onNavigate('playbook')}>
              FOR ADVISORS
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
