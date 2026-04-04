'use client';

import { useRef } from 'react';
import { stats, products, archetypes, dailyPricing } from '@/lib/data';
import { useGsapScrollReveal, useGsapMagneticAll, useGsapContext, gsap } from '@/lib/gsap-engine';

interface HomeSectionProps {
  onNavigate: (tab: string) => void;
}

export function HomeSection({ onNavigate }: HomeSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP: scroll reveal for all .reveal-section elements
  useGsapScrollReveal(containerRef);

  // GSAP: magnetic hover for all CTA buttons
  useGsapMagneticAll(containerRef);

  // GSAP: counter animation for quick stats numbers
  useGsapContext(() => {
    gsap.utils.toArray<HTMLElement>('.arch-card-owl-stat-number[data-target]').forEach((el) => {
      const target = parseFloat(el.dataset.target || '0');
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const decimals = parseInt(el.dataset.decimals || '0');
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
  }, containerRef);

  // GSAP: .ant-lift hover animation for product cards (Choose Your Armor)
  useGsapContext(() => {
    gsap.utils.toArray<HTMLElement>('.hover-card.ant-lift-trigger').forEach((card) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { y: -4, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { y: 0, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
      });
    });
  }, containerRef);

  const flexiDaily = dailyPricing.flexiShield[0].daily;
  const blueDaily = dailyPricing.blueRoyale[0].daily;

  return (
    <div ref={containerRef} className="space-y-8 pb-16">
      {/* ============================== */}
      {/* 1. HERO BANNER                 */}
      {/* ============================== */}
      <section data-archetype="eagle" className="relative overflow-hidden p-6 sm:p-8 border-b-2" style={{ borderColor: 'var(--accent-red)', background: 'var(--bg-panel)' }}>
        {/* Decorative starfield element */}
        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
          background: archetypes.eagle.gradient,
        }} />

        {/* Decorative accent stickers */}
        <div className="relative z-10">
          <span className="sticker absolute top-4 right-4" style={{ color: 'var(--accent-yellow)' }}>EST. 1949</span>
          <span className="sticker-accent absolute bottom-4 left-4">INSURANCE HUB</span>

          {/* Archetype badges */}
          <div className="flex gap-2 mb-4 flex-wrap">
            <span className="arch-badge arch-badge-eagle">Eagle — Premium Worldwide</span>
            <span className="arch-badge arch-badge-beaver">Beaver — Practical HMO</span>
          </div>

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
        </div>
      </section>

      {/* ============================== */}
      {/* 2. QUICK STATS GRID            */}
      {/* ============================== */}
      <section className="reveal-section" data-archetype="owl">
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-1">
            <h2 className="section-title">THE NUMBERS</h2>
            <span className="arch-badge arch-badge-owl">Owl Verified</span>
          </div>
          <p className="section-subtitle mt-1">Philippine insurance landscape at a glance</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {stats.quickStats.map((stat, i) => (
            <div key={i} className="arch-card-owl-stat stagger-child">
              <div
                className="arch-card-owl-stat-number"
                data-target={typeof stat.value === 'number' ? String(stat.value) : undefined}
                data-prefix={stat.prefix || ''}
                data-suffix={stat.suffix || ''}
              >
                {stat.prefix || ''}
                {stat.value}
                {stat.suffix}
              </div>
              <p className="arch-card-owl-stat-explanation">{stat.label}</p>
              <div className="arch-card-owl-stat-source">
                {i === 0 ? 'Source: Insurance Commission' : i === 1 ? 'Swiss Re Sigma' : i === 2 ? 'PhilHealth Data' : 'Pacific Cross Records'}
              </div>
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
            <span className="arch-badge arch-badge-beaver arch-badge-sm">Beaver Insight</span>
          </div>

          <h2
            className="font-display stagger-child owl-neon-red"
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
      <section className="reveal-section" data-archetype="beaver">
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
                className="font-display owl-neon-yellow"
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
                className="font-display owl-neon-red"
                style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', color: 'var(--accent-red)' }}
              >
                ₱500
              </div>
              <p className="stat-label mt-1">Insurance / Year</p>

              {/* Daily pricing breakdown using archetype beaver pricing */}
              <div className="mt-3 flex justify-center">
                <div className="arch-price-beaver" style={{ padding: '0.5rem 0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', border: '1px solid #f59e0b', background: 'rgba(28, 25, 23, 0.5)' }}>
                  <span className="font-display arch-price-beaver-daily" style={{ fontSize: '1.25rem', lineHeight: 1 }}>
                    <span className="arch-price-beaver-daily-unit">₱</span>1.37
                  </span>
                  <span className="font-mono" style={{ fontSize: '0.5rem', color: 'var(--text-dim)' }}>
                    /day — less than a stick of gum
                  </span>
                </div>
              </div>
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
          {/* FlexiShield Card — Beaver Archetype */}
          <div
            data-archetype="beaver"
            className="hover-card p-5 stagger-child cursor-pointer anim-beaver-pulse ant-lift-trigger"
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
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-sub" style={{ fontSize: '1.15rem' }}>{products.flexiShield.name}</h3>
                  <span className="arch-badge arch-badge-beaver arch-badge-sm">Beaver Pick</span>
                  <span className="tag tag-yellow">HMO ENHANCER</span>
                </div>
                <p className="font-mono mb-3" style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>
                  {products.flexiShield.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="tag tag-yellow">Up to PHP 2M</span>
                  <span className="tag tag-yellow">HMO Enhancer</span>
                  <span className="tag">From ₱6,510/yr</span>
                </div>
                {/* Daily pricing line */}
                <div className="flex items-center gap-2">
                  <span className="arch-badge arch-badge-beaver arch-badge-sm">From</span>
                  <span className="font-display" style={{ fontSize: '1.4rem', color: '#f59e0b', lineHeight: 1 }}>
                    <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '0.75rem', color: 'var(--text-muted)' }}>₱</span>{flexiDaily}
                  </span>
                  <span className="font-mono" style={{ fontSize: '0.5rem', color: 'var(--text-dim)' }}>/DAY</span>
                </div>
              </div>
            </div>
          </div>

          {/* Blue Royale Card — Eagle Archetype */}
          <div
            data-archetype="eagle"
            className="hover-card p-5 stagger-child cursor-pointer anim-eagle-glow ant-lift-trigger"
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
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-sub" style={{ fontSize: '1.15rem' }}>{products.blueRoyale.name}</h3>
                  <span className="arch-badge arch-badge-eagle arch-badge-sm">Eagle Premium</span>
                  <span className="tag tag-red">WORLDWIDE</span>
                </div>
                <p className="font-mono mb-3" style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>
                  {products.blueRoyale.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="tag tag-red">Up to USD 2M</span>
                  <span className="tag tag-red">Worldwide</span>
                  <span className="tag">From $1,676/yr</span>
                </div>
                {/* Daily pricing line using price-daily chip */}
                <div className="flex items-center gap-2">
                  <div className="price-daily" data-annual="$1,676/yr" style={{ borderColor: '#00d4ff', background: 'rgba(0, 212, 255, 0.06)' }}>
                    <span className="price-daily-amount" style={{ color: '#00d4ff' }}>${blueDaily}</span>
                    <span className="price-daily-label">/day</span>
                  </div>
                  <span className="arch-badge arch-badge-eagle arch-badge-sm">WORLDWIDE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== */}
      {/* 6. TOP CAUSES OF FINANCIAL RUIN*/}
      {/* ============================== */}
      <section className="reveal-section" data-archetype="ant">
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-1">
            <h2 className="section-title stagger-child">WHY IT MATTERS</h2>
            <span className="arch-badge arch-badge-ant">Ant Community</span>
          </div>
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

          {/* Competitor context badges */}
          <div className="mt-6 stagger-child">
            <p className="font-mono mb-2" style={{ fontSize: '0.55rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Trusted over the competition
            </p>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <span className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>vs</span>
              <span className="competitor-badge competitor-badge-maxicare">Maxicare</span>
              <span className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--text-dim)' }}>&#x2022;</span>
              <span className="competitor-badge competitor-badge-intellicare">Intellicare</span>
              <span className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--text-dim)' }}>&#x2022;</span>
              <span className="competitor-badge competitor-badge-sunlife">SunLife</span>
              <span className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--text-dim)' }}>&#x2022;</span>
              <span className="competitor-badge competitor-badge-philhealth">PhilHealth</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
