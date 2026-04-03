'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  blueRoyalePlans,
  flexiShieldTiers,
  flexiShieldPricing,
  flexiShieldKeyFeatures,
  blueRoyaleKeyFeatures,
  blueRoyaleExclusions,
  getBlueRoyalePremium,
  getFlexiShieldPremium,
  type FlexiShieldTier,
} from '@/lib/data';
import { ProductRadarChart } from '@/components/charts/insurance-charts';
import { QuizFlow } from '@/components/interactive/quiz-flow';

type SubView = 'overview' | 'blueroyale' | 'flexishield' | 'compare' | 'calculator' | 'quiz';
type BRPlan = 'planA' | 'planB' | 'planC';

// ============================================================
// INTERSECTION OBSERVER HOOK
// ============================================================
function useReveal() {
  useEffect(() => {
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

    const sections = document.querySelectorAll('.reveal-section');
    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, []);
}

// ============================================================
// ACCORDION ITEM COMPONENT
// ============================================================
function AccordionItem({
  title,
  detail,
  index,
  openIndex,
  onToggle,
}: {
  title: string;
  detail: string;
  index: number;
  openIndex: number | null;
  onToggle: (i: number | null) => void;
}) {
  const isOpen = openIndex === index;

  return (
    <div style={{ borderRadius: 0 }}>
      <button
        className="brutal-accordion-header"
        onClick={() => onToggle(isOpen ? null : index)}
        style={{
          borderColor: isOpen ? 'var(--accent-red)' : undefined,
          background: isOpen ? 'var(--accent-red-dim)' : undefined,
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 18,
              height: 18,
              background: 'var(--accent-red)',
              color: 'var(--bg)',
              fontSize: '0.6rem',
              fontWeight: 700,
            }}
          >
            {isOpen ? '\u2212' : '+'}
          </span>
          {title}
        </span>
        <span style={{ fontSize: '0.6rem', opacity: 0.5 }}>{isOpen ? '\u25B2' : '\u25BC'}</span>
      </button>
      <div className={`brutal-accordion-body ${isOpen ? 'open' : ''}`}>
        <div className="brutal-accordion-body-inner">{detail}</div>
      </div>
    </div>
  );
}

// ============================================================
// MAIN PRODUCTS SECTION
// ============================================================
export function ProductsSection() {
  const [subView, setSubView] = useState<SubView>('overview');

  useReveal();

  const subNavItems: { id: SubView; label: string; emoji: string }[] = [
    { id: 'overview', label: 'OVERVIEW', emoji: '\uD83D\uDCCB' },
    { id: 'blueroyale', label: 'BLUE ROYALE', emoji: '\uD83D\uDC51' },
    { id: 'flexishield', label: 'FLEXISHIELD', emoji: '\uD83D\uDEE1\uFE0F' },
    { id: 'compare', label: 'COMPARE', emoji: '\u2696\uFE0F' },
    { id: 'calculator', label: 'ESTIMATE', emoji: '\uD83E\uDDEE' },
    { id: 'quiz', label: 'QUIZ', emoji: '\uD83C\uDFAF' },
  ];

  return (
    <div style={{ padding: '0 0 2rem' }}>
      {/* Section header */}
      <div className="reveal-section" style={{ marginBottom: '1.5rem' }}>
        <h2 className="font-display section-title" style={{ fontSize: '2rem', lineHeight: 1 }}>
          PRODUCTS DEEP DIVE
        </h2>
        <p className="font-sub section-subtitle" style={{ color: 'var(--accent-yellow)' }}>
          Blue Royale vs FlexiShield — choose your shield
        </p>
      </div>

      {/* Sub navigation */}
      <div style={{ display: 'flex', gap: '0.25rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
        {subNavItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setSubView(item.id)}
            className="btn-ghost font-sub"
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.08em',
              whiteSpace: 'nowrap',
              padding: '0.4rem 0.75rem',
              borderRadius: 0,
              borderColor: subView === item.id ? 'var(--accent-red)' : 'var(--border)',
              color: subView === item.id ? 'var(--accent-red)' : 'var(--text-muted)',
              background: subView === item.id ? 'var(--accent-red-dim)' : 'transparent',
            }}
          >
            {item.emoji} {item.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW */}
      {subView === 'overview' && <OverviewSection onNavigate={setSubView} />}

      {/* BLUE ROYALE DETAIL */}
      {subView === 'blueroyale' && <BlueRoyaleDetail />}

      {/* FLEXISHIELD DETAIL */}
      {subView === 'flexishield' && <FlexiShieldDetail />}

      {/* COMPARE */}
      {subView === 'compare' && <CompareSection />}

      {/* CALCULATOR */}
      {subView === 'calculator' && <CalculatorSection />}

      {/* QUIZ */}
      {subView === 'quiz' && (
        <div>
          <div className="reveal-section" style={{ marginBottom: '1.5rem' }}>
            <h2 className="font-display section-title" style={{ fontSize: '1.5rem', lineHeight: 1 }}>
              WHICH PLAN IS RIGHT?
            </h2>
            <p className="font-sub section-subtitle" style={{ color: 'var(--accent-yellow)' }}>
              Answer 4 quick questions to find out
            </p>
          </div>
          <QuizFlow />
        </div>
      )}
    </div>
  );
}

// ============================================================
// OVERVIEW
// ============================================================
function OverviewSection({ onNavigate }: { onNavigate: (v: SubView) => void }) {
  return (
    <>
      {/* Blue Royale quick card — Eagle archetype */}
      <div data-archetype="eagle" className="reveal-section stagger-child" style={{ marginBottom: '0.75rem' }}>
        <div
          className="hover-card"
          style={{ cursor: 'pointer', borderLeft: '4px solid var(--accent-yellow)' }}
          onClick={() => onNavigate('blueroyale')}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.8rem', lineHeight: 1 }}>{'\uD83D\uDC51'}</span>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <h3 className="font-display" style={{ fontSize: '1.1rem', color: 'var(--accent-yellow)', margin: 0 }}>
                  BLUE ROYALE
                </h3>
                <span className="arch-badge arch-badge-eagle arch-badge-sm">Premium</span>
              </div>
              <p className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', margin: '0.25rem 0 0.5rem' }}>
                Premium Worldwide Medical Plan
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {(['Plan A: USD 500K', 'Plan B: USD 1M', 'Plan C: USD 2M']).map((label) => (
                  <span key={label} className="tag-yellow">
                    {label}
                  </span>
                ))}
              </div>
              <p className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                From $1,676/yr &bull; Worldwide &bull; Ages 0-100
              </p>
              {/* Daily pricing chip */}
              <div className="price-daily" data-annual="$1,676/yr" style={{ marginTop: '0.5rem' }}>
                <span className="price-daily-amount font-display">$5</span>
                <span className="price-daily-label">per day</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FlexiShield quick card — Beaver archetype */}
      <div data-archetype="beaver" className="reveal-section stagger-child" style={{ marginBottom: '0.75rem' }}>
        <div
          className="hover-card"
          style={{ cursor: 'pointer', borderLeft: '4px solid var(--accent-red)' }}
          onClick={() => onNavigate('flexishield')}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.8rem', lineHeight: 1 }}>{'\uD83D\uDEE1\uFE0F'}</span>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <h3 className="font-display" style={{ fontSize: '1.1rem', color: 'var(--accent-red)', margin: 0 }}>
                  FLEXISHIELD
                </h3>
                <span className="arch-badge arch-badge-beaver arch-badge-sm">Practical</span>
              </div>
              <p className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', margin: '0.25rem 0 0.5rem' }}>
                Second Layer HMO Enhancer
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {(['FS 50', 'FS 100', 'FS 150', 'FS 200']).map((label) => (
                  <span key={label} className="tag-red">
                    {label}
                  </span>
                ))}
              </div>
              <p className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                From &#8369;6,510/yr &bull; PHP 2M MBL &bull; Ages 0-70
              </p>
              {/* Beaver daily pricing */}
              <div style={{ marginTop: '0.5rem' }}>
                <span className="arch-price-beaver-daily font-display" style={{ fontSize: '1.5rem' }}>&#8369;18</span>
                <span className="arch-price-beaver-daily-unit" style={{ fontSize: '0.65rem', marginLeft: '0.25rem' }}>/day</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Radar chart */}
      <div className="reveal-section stagger-child">
        <div className="panel">
          <div className="panel-header" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>{'\uD83D\uDCCA'}</span> COVERAGE COMPARISON
          </div>
          <ProductRadarChart />
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '0.75rem' }}>
            <span className="font-mono" style={{ fontSize: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span style={{ width: 10, height: 10, background: 'var(--text)', display: 'inline-block' }} />
              Blue Royale
            </span>
            <span className="font-mono" style={{ fontSize: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span style={{ width: 10, height: 10, background: 'var(--accent-yellow)', display: 'inline-block' }} />
              FlexiShield
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

// ============================================================
// BLUE ROYALE DETAIL
// ============================================================
function BlueRoyaleDetail() {
  const [selectedPlan, setSelectedPlan] = useState<BRPlan>('planA');
  const [age, setAge] = useState(30);
  const [selectedDeductible, setSelectedDeductible] = useState('none');
  const [openBenefit, setOpenBenefit] = useState<number | null>(null);

  const plan = blueRoyalePlans[selectedPlan];
  const premium = getBlueRoyalePremium(selectedPlan, age);

  const discountPercent = useMemo(() => {
    if (selectedDeductible === '1000' && selectedPlan === 'planA') return 15;
    if (selectedDeductible === '2500') return selectedPlan === 'planA' ? 30 : 18;
    if (selectedDeductible === '5000') {
      if (selectedPlan === 'planA') return 40;
      if (selectedPlan === 'planB') return 30;
      return 24;
    }
    if (selectedDeductible === 'tal') return 25;
    return 0;
  }, [selectedDeductible, selectedPlan]);

  const discountedPremium = premium ? Math.round(premium * (1 - discountPercent / 100)) : null;

  const planTabs: { id: BRPlan; label: string; coverage: string }[] = [
    { id: 'planA', label: 'PLAN A', coverage: 'USD 500K' },
    { id: 'planB', label: 'PLAN B', coverage: 'USD 1M' },
    { id: 'planC', label: 'PLAN C', coverage: 'USD 2M' },
  ];

  const benefits = [
    { title: 'Room & Board', detail: `${plan.room.type} — USD ${plan.room.phPerDay}/day (PH), USD ${plan.room.overseasPerDay}/day (Overseas)` },
    { title: "Surgeon's Fee", detail: plan.surgeonFeeCap },
    { title: 'Maternity', detail: plan.maternity },
    { title: 'Supplementary OPD', detail: plan.supplementaryOPD },
    { title: 'Alternative Treatments', detail: plan.alternativeTreatments },
    { title: 'ECU / Vaccinations', detail: plan.ecuVaccinations },
    { title: 'Mental Disorders', detail: plan.mentalDisorders },
    { title: 'AIDS/HIV', detail: plan.aidsHiv },
    { title: 'Dental', detail: plan.dental },
    { title: 'Vision', detail: plan.vision },
  ];

  return (
    <>
      {/* Section header — Eagle hero cinematic */}
      <div data-archetype="eagle">
        <div className="reveal-section" style={{ marginBottom: '1rem' }}>
          <div className="arch-card-eagle-hero">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '1.5rem' }}>{'\uD83D\uDC51'}</span>
              <span className="arch-badge arch-badge-eagle">Premium</span>
            </div>
            <h2 className="arch-card-eagle-hero-title" style={{ fontSize: '2.5rem' }}>
              BLUE <span className="arch-card-eagle-hero-accent">ROYALE</span>
            </h2>
            <p className="arch-card-eagle-hero-subtitle">
              Premium Worldwide Medical Plan &bull; {plan.maxCoverageLabel}
            </p>
          </div>
        </div>

        {/* Plan Tier Selector */}
        <div className="reveal-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
          {planTabs.map((pt) => (
            <button
              key={pt.id}
              onClick={() => setSelectedPlan(pt.id)}
              className="btn-ghost font-sub"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.6rem 0.5rem',
                borderRadius: 0,
                fontSize: '0.7rem',
                letterSpacing: '0.06em',
                borderColor: selectedPlan === pt.id ? 'var(--arch-accent, var(--accent-yellow))' : 'var(--border)',
                color: selectedPlan === pt.id ? 'var(--arch-accent, var(--accent-yellow))' : 'var(--text-muted)',
                background: selectedPlan === pt.id ? 'var(--arch-accent-dim, var(--accent-yellow-dim))' : 'transparent',
              }}
            >
              {pt.label}
              <span className="font-mono" style={{ fontSize: '0.55rem', opacity: 0.7 }}>{pt.coverage}</span>
            </button>
          ))}
        </div>

        {/* Premium Calculator — Eagle Feature Card */}
        <div className="reveal-section" style={{ marginBottom: '0.75rem' }}>
          <div className="arch-card-eagle-feature">
            <div className="arch-card-eagle-feature-header">
              PREMIUM CALCULATOR
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <span className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>YOUR AGE</span>
                <span className="font-display" style={{ fontSize: '1.5rem', color: '#00d4ff', lineHeight: 1 }}>{age}</span>
              </div>
              <input
                type="range"
                min={19}
                max={80}
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="font-mono" style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>19</span>
                <span className="font-mono" style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>50</span>
                <span className="font-mono" style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>80</span>
              </div>
            </div>

            {premium && (
              <div
                style={{
                  background: 'rgba(201, 162, 39, 0.08)',
                  border: '2px solid #c9a227',
                  padding: '1rem',
                  textAlign: 'center',
                  borderRadius: 0,
                  marginTop: '0.75rem',
                }}
              >
                <p className="font-mono" style={{ fontSize: '0.6rem', textTransform: 'uppercase', marginBottom: '0.25rem', color: '#00d4ff' }}>
                  Annual Premium &mdash; {plan.name}
                </p>
                <p className="arch-card-eagle-feature-price">
                  ${premium.toLocaleString()}
                </p>
                <p className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                  ${Math.round(premium / 12).toLocaleString()}/mo &bull; ${Math.round(premium / 365).toLocaleString()}/day
                </p>
                <span className="arch-card-eagle-feature-badge">
                  ${Math.round(premium / 365)}/day
                </span>
              </div>
            )}

            {!premium && age < 19 && (
              <div
                style={{
                  background: 'var(--bg-panel)',
                  padding: '1rem',
                  textAlign: 'center',
                  border: '1px solid var(--border)',
                  borderRadius: 0,
                }}
              >
                <p className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                  Minimum entry age is 19. Contact us for dependent rates.
                </p>
              </div>
            )}

            {discountPercent > 0 && discountedPremium && (
              <div
                style={{
                  marginTop: '0.5rem',
                  background: 'var(--bg-card)',
                  padding: '0.75rem',
                  textAlign: 'center',
                  border: '1px solid #c9a227',
                  borderRadius: 0,
                }}
              >
                <p className="font-mono" style={{ fontSize: '0.6rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  With Discount ({discountPercent}%)
                </p>
                <p className="font-display" style={{ fontSize: '1.25rem', color: '#c9a227', lineHeight: 1 }}>
                  ${discountedPremium.toLocaleString()}/yr
                </p>
                <p className="font-mono" style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>
                  ${Math.round(discountedPremium / 365).toLocaleString()}/day
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Discount Options */}
        <div className="reveal-section" style={{ marginBottom: '0.75rem' }}>
          <div className="panel">
            <div className="panel-header" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>{'\uD83C\uDFF7\uFE0F'}</span> DISCOUNT OPTIONS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {[
                { id: '1000', label: 'USD 1,000 Deductible', discount: '15%', note: 'Plan A only' },
                { id: '2500', label: 'USD 2,500 Deductible', discount: '18-30%', note: 'Plans A & B' },
                { id: '5000', label: 'USD 5,000 Deductible', discount: '24-40%', note: 'All Plans' },
                { id: 'tal', label: 'TAL (Treatment Area Limit)', discount: '25%', note: 'All Plans' },
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDeductible(selectedDeductible === d.id ? 'none' : d.id)}
                  className="font-sub"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.6rem 0.75rem',
                    background: selectedDeductible === d.id ? '#c9a227' : 'var(--bg-card)',
                    color: selectedDeductible === d.id ? '#080808' : 'var(--text)',
                    border: `1px solid ${selectedDeductible === d.id ? '#c9a227' : 'var(--border)'}`,
                    borderRadius: 0,
                    textAlign: 'left',
                    width: '100%',
                    cursor: 'pointer',
                    fontSize: '0.7rem',
                    letterSpacing: '0.04em',
                    fontWeight: 700,
                    textTransform: 'uppercase' as const,
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div>
                    <span>{d.label}</span>
                    <span className="font-mono" style={{ marginLeft: '0.5rem', fontSize: '0.6rem', opacity: 0.7 }}>{d.discount}</span>
                  </div>
                  <span className="font-mono" style={{ fontSize: '0.55rem', opacity: 0.6 }}>{d.note}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits Comparison Header */}
        <div className="reveal-section" style={{ marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h3 className="font-display" style={{ fontSize: '1.1rem', lineHeight: 1, margin: 0 }}>
              BENEFITS COMPARISON
            </h3>
            <span className="arch-badge arch-badge-eagle arch-badge-sm">{plan.name}</span>
          </div>
          <p className="font-mono" style={{ fontSize: '0.6rem', color: '#00d4ff' }}>
            {plan.name} &mdash; {plan.maxCoverageLabel}
          </p>
        </div>

        {/* Benefits Accordion */}
        {benefits.map((item, i) => (
          <div key={i} className="reveal-section stagger-child" style={{ marginBottom: '0.25rem' }}>
            <AccordionItem
              title={item.title}
              detail={item.detail}
              index={i}
              openIndex={openBenefit}
              onToggle={setOpenBenefit}
            />
          </div>
        ))}

        {/* Key Features */}
        <div className="reveal-section" style={{ marginTop: '0.75rem', marginBottom: '0.75rem' }}>
          <div className="arch-card-eagle-feature">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span>{'\u2B50'}</span>
              <span className="arch-card-eagle-feature-header" style={{ margin: 0 }}>KEY FEATURES</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { label: `Qualifying Period: ${blueRoyaleKeyFeatures.qualifyingPeriod}`, badge: false },
                { label: `Travel: ${blueRoyaleKeyFeatures.travelCoverage}`, badge: true },
                { label: `Renewable: ${blueRoyaleKeyFeatures.renewable}`, badge: false },
                { label: `Physical Exam: ${blueRoyaleKeyFeatures.physicalExam}`, badge: false },
                { label: `Free Child Coverage: ${blueRoyaleKeyFeatures.freeChildCoverage}`, badge: true },
                { label: `Personal Accident: ${blueRoyaleKeyFeatures.personalAccident.rate}`, badge: false },
                { label: `Payment: ${blueRoyaleKeyFeatures.payment.options.join(', ')}`, badge: false },
                { label: `COVID-19 Vaccine: Plan A ${blueRoyaleKeyFeatures.covidVaccine.planA}, B ${blueRoyaleKeyFeatures.covidVaccine.planB}, C ${blueRoyaleKeyFeatures.covidVaccine.planC}`, badge: false },
              ].map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: '#c9a227', fontWeight: 700, fontSize: '0.7rem' }}>{'\u2726'}</span>
                  <span className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', flex: 1 }}>{f.label}</span>
                  {f.badge && <span className="arch-badge arch-badge-eagle arch-badge-sm">Eagle</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Travel Benefits */}
        <div className="reveal-section" style={{ marginBottom: '0.75rem' }}>
          <div className="panel" style={{ borderLeft: '3px solid var(--accent-red)' }}>
            <div className="panel-header" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>{'\u2708\uFE0F'}</span> TRAVEL BENEFITS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                'Up to 90 days per trip, unlimited trips per year',
                'Emergency evacuation covered',
                'Repatriation included',
                'Return of mortal remains',
                'Choose ANY hospital worldwide \u2014 no network restrictions',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--accent-red)', fontWeight: 700, fontSize: '0.7rem' }}>{'\u2726'}</span>
                  <span className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Exclusions */}
        <div className="reveal-section" style={{ marginBottom: '0.75rem' }}>
          <div className="panel">
            <div className="panel-header" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>{'\uD83D\uDEAB'}</span> EXCLUSIONS
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {blueRoyaleExclusions.map((ex, i) => (
                <span key={i} className="tag" style={{ fontSize: '0.55rem' }}>
                  {ex}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Waiting Periods */}
        <div className="reveal-section" style={{ marginBottom: '0.75rem' }}>
          <div className="panel">
            <div className="panel-header" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>{'\u23F3'}</span> WAITING PERIODS
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
              {[
                { label: 'General', value: '30 Days' },
                { label: 'Accidents', value: 'Immediate' },
                { label: 'Maternity', value: '12 Months' },
                { label: 'AIDS/HIV', value: '5 Years' },
              ].map((wp, i) => (
                <div
                  key={i}
                  style={{
                    background: 'var(--bg-card)',
                    padding: '0.75rem',
                    textAlign: 'center',
                    border: '1px solid var(--border)',
                    borderRadius: 0,
                  }}
                >
                  <p className="font-mono" style={{ fontSize: '0.55rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    {wp.label}
                  </p>
                  <p className="font-display" style={{ fontSize: '0.9rem', lineHeight: 1 }}>
                    {wp.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="reveal-section">
          <div className="sticker-accent" style={{ textAlign: 'center' }}>
            <p className="font-mono" style={{ fontSize: '0.65rem' }}>
              {'\uD83D\uDCDE'} {blueRoyaleKeyFeatures.contact.phone} | {'\uD83D\uDCE7'} {blueRoyaleKeyFeatures.contact.email}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// ============================================================
// FLEXISHIELD DETAIL
// ============================================================
function FlexiShieldDetail() {
  const [selectedTier, setSelectedTier] = useState<FlexiShieldTier>('FS200');
  const [age, setAge] = useState(30);
  const [openBenefit, setOpenBenefit] = useState<number | null>(null);

  const premium = getFlexiShieldPremium(selectedTier, age);
  const tierInfo = flexiShieldTiers.find((t) => t.id === selectedTier);

  const benefits = [
    { title: 'Maximum Benefit', detail: flexiShieldKeyFeatures.maximumBenefit },
    { title: 'Room Type', detail: flexiShieldKeyFeatures.room },
    { title: 'Miscellaneous Inpatient', detail: flexiShieldKeyFeatures.miscellaneousInpatient },
    { title: 'ICU / CCU / Telemetry', detail: flexiShieldKeyFeatures.icuCcuTelemetry },
    { title: "Surgeon's Fee", detail: flexiShieldKeyFeatures.surgeonFee },
    { title: 'Anesthetist', detail: flexiShieldKeyFeatures.anesthetist },
    { title: 'Attending Physician', detail: flexiShieldKeyFeatures.attendingPhysician },
    { title: 'Specialist', detail: flexiShieldKeyFeatures.specialist },
    { title: 'Daily Hospital Income', detail: flexiShieldKeyFeatures.hospitalIncome },
    { title: 'COVID-19', detail: flexiShieldKeyFeatures.covid19 },
    { title: 'PhilHealth', detail: flexiShieldKeyFeatures.philHealth },
    { title: 'Certification', detail: flexiShieldKeyFeatures.certification },
  ];

  return (
    <>
      {/* Wrap entire FlexiShield detail in Beaver archetype */}
      <div data-archetype="beaver">
        {/* Section header */}
        <div className="reveal-section" style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <h2 className="font-display" style={{ fontSize: '1.75rem', lineHeight: 1, color: '#f59e0b', margin: 0 }}>
              {'\uD83D\uDEE1\uFE0F'} FLEXISHIELD
            </h2>
            <span className="arch-badge arch-badge-beaver">Practical</span>
          </div>
          <p className="font-sub" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Second Layer HMO Enhancer
          </p>
        </div>

        {/* Tier Selector */}
        <div className="reveal-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.35rem', marginBottom: '0.75rem' }}>
          {flexiShieldTiers.map((tier) => (
            <button
              key={tier.id}
              onClick={() => setSelectedTier(tier.id)}
              className="btn-ghost font-sub"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.5rem 0.25rem',
                borderRadius: 0,
                fontSize: '0.65rem',
                letterSpacing: '0.06em',
                borderColor: selectedTier === tier.id ? '#f59e0b' : 'var(--border)',
                color: selectedTier === tier.id ? '#f59e0b' : 'var(--text-muted)',
                background: selectedTier === tier.id ? 'rgba(245, 158, 11, 0.08)' : 'transparent',
              }}
            >
              {tier.label}
              <span className="font-mono" style={{ fontSize: '0.5rem', opacity: 0.7 }}>
                {tier.hmoRange.split(' ').slice(0, 2).join(' ')}
              </span>
            </button>
          ))}
        </div>

        {/* Tier Info */}
        {tierInfo && (
          <div className="reveal-section" style={{ marginBottom: '0.75rem' }}>
            <div
              className="font-mono"
              style={{
                fontSize: '0.65rem',
                padding: '0.6rem 0.75rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 0,
                borderLeft: '3px solid #f59e0b',
              }}
            >
              <span className="font-sub" style={{ fontSize: '0.6rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Deductible:{' '}
              </span>
              <span className="font-display" style={{ fontSize: '0.8rem', color: '#f59e0b' }}>
                {'\u20B1'}{tierInfo.deductible.toLocaleString()}
              </span>
              <span style={{ color: 'var(--text-muted)' }}> {'\u2014'} Your HMO&apos;s MBL must be exhausted first</span>
            </div>
          </div>
        )}

        {/* Premium Calculator — Beaver Calculator Card */}
        <div className="reveal-section" style={{ marginBottom: '0.75rem' }}>
          <div className="arch-card-beaver-calculator">
            <div className="arch-card-beaver-calculator-title">
              PREMIUM CALCULATOR
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <span className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>YOUR AGE</span>
                <span className="font-display" style={{ fontSize: '1.5rem', color: '#f59e0b', lineHeight: 1 }}>{age}</span>
              </div>
              <input
                type="range"
                min={0}
                max={70}
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="font-mono" style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>0</span>
                <span className="font-mono" style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>35</span>
                <span className="font-mono" style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>70</span>
              </div>
            </div>

            {premium && (
              <div className="arch-card-beaver-calculator-output">
                <p className="font-mono" style={{ fontSize: '0.6rem', textTransform: 'uppercase', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>
                  Annual Premium &mdash; {tierInfo?.label}
                </p>
                <div className="arch-card-beaver-calculator-value">
                  {'\u20B1'}{premium.toLocaleString()}
                </div>
                <p className="font-mono" style={{ fontSize: '0.65rem', marginTop: '0.25rem', color: 'var(--text-muted)' }}>
                  {'\u20B1'}{Math.round(premium / 12).toLocaleString()}/mo
                </p>
              </div>
            )}

            {/* Beaver daily pricing breakdown */}
            {premium && (
              <div className="arch-price-beaver" style={{ marginTop: '0.5rem' }}>
                <div>
                  <span className="arch-price-beaver-daily font-display" style={{ fontSize: '2rem' }}>
                    {'\u20B1'}{Math.round(premium / 365).toLocaleString()}
                  </span>
                  <span className="arch-price-beaver-daily-unit" style={{ fontSize: '0.7rem' }}>/day</span>
                </div>
                <div className="arch-price-beaver-equals">=</div>
                <div className="arch-price-beaver-annual">
                  {'\u20B1'}{premium.toLocaleString()}/yr
                </div>
                <div className="arch-price-beaver-badge">Age {age}</div>
              </div>
            )}

            {!premium && (
              <div
                style={{
                  background: 'var(--bg-card)',
                  padding: '1rem',
                  textAlign: 'center',
                  border: '1px solid var(--border)',
                  borderRadius: 0,
                }}
              >
                <p className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                  {age > 70
                    ? 'Maximum entry age is 70 for FS 200 only.'
                    : 'This tier is not available for the selected age.'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Full Pricing Table — Archetype comparison table */}
        <div className="reveal-section" style={{ marginBottom: '0.75rem' }}>
          <div className="panel">
            <div className="panel-header" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>{'\uD83D\uDCCA'}</span> FULL PRICING TABLE
            </div>
            <div style={{ overflowX: 'auto', maxHeight: '24rem', overflowY: 'auto' }}>
              <table className="arch-comparison-table" style={{ minWidth: 500 }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left' }}>Age</th>
                    <th>FS 50</th>
                    <th>FS 100</th>
                    <th>FS 150</th>
                    <th>FS 200</th>
                  </tr>
                </thead>
                <tbody>
                  {flexiShieldPricing.map((bracket, i) => (
                    <tr key={i}>
                      <td style={{ textAlign: 'left', fontWeight: 700, color: 'var(--text)' }}>{bracket.minAge}-{bracket.maxAge}</td>
                      {(['FS50', 'FS100', 'FS150', 'FS200'] as FlexiShieldTier[]).map((tier) => (
                        <td key={tier}>
                          {bracket.premiums[tier] > 0
                            ? <>{'\u20B1'}{bracket.premiums[tier].toLocaleString()}</>
                            : <span style={{ opacity: 0.3 }}>{'\u2014'}</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Benefits Header */}
        <div className="reveal-section" style={{ marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h3 className="font-display" style={{ fontSize: '1.1rem', lineHeight: 1, margin: 0 }}>
              BENEFITS
            </h3>
            <span className="arch-badge arch-badge-beaver arch-badge-sm">{tierInfo?.label}</span>
          </div>
          <p className="font-mono" style={{ fontSize: '0.6rem', color: '#f59e0b' }}>
            {tierInfo?.label} &mdash; What&apos;s Covered
          </p>
        </div>

        {/* Benefits Accordion */}
        {benefits.map((item, i) => (
          <div key={i} className="reveal-section stagger-child" style={{ marginBottom: '0.25rem' }}>
            <AccordionItem
              title={item.title}
              detail={item.detail}
              index={i}
              openIndex={openBenefit}
              onToggle={setOpenBenefit}
            />
          </div>
        ))}

        {/* Claim Process */}
        <div className="reveal-section" style={{ marginTop: '0.75rem', marginBottom: '0.75rem' }}>
          <div className="panel" style={{ borderLeft: '3px solid #f59e0b' }}>
            <div className="panel-header" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>{'\uD83D\uDCCB'}</span> CLAIM PROCESS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div
                style={{
                  background: 'var(--bg-card)',
                  padding: '0.75rem',
                  border: '1px solid var(--border)',
                  borderRadius: 0,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <p className="font-sub" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em', margin: 0 }}>
                    {'\uD83D\uDCB3'} No-Cash-Outlay
                  </p>
                  <span className="arch-badge arch-badge-beaver arch-badge-sm">Easy</span>
                </div>
                <p className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  Use Pacific Cross accredited hospitals. Show your card {'\u2014'} Pacific Cross pays the hospital directly. You walk out without paying.
                </p>
              </div>
              <div
                style={{
                  background: 'var(--bg-card)',
                  padding: '0.75rem',
                  border: '1px solid var(--border)',
                  borderRadius: 0,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <p className="font-sub" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em', margin: 0 }}>
                    {'\uD83E\uDDE2'} Reimbursement
                  </p>
                </div>
                <p className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  Go to any hospital. Pay the bill first, then submit receipts and documents to Pacific Cross for refund processing.
                </p>
              </div>
            </div>
            <div
              style={{
                marginTop: '0.75rem',
                background: 'var(--bg-card)',
                padding: '0.6rem 0.75rem',
                border: '1px solid var(--border)',
                borderRadius: 0,
              }}
            >
              <span className="font-sub" style={{ fontSize: '0.7rem', textTransform: 'uppercase' }}>Deductible Rule: </span>
              <span className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>
                {flexiShieldKeyFeatures.deductibleRule}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ============================================================
// COMPARE SECTION
// ============================================================
function CompareSection() {
  const comparisonData = [
    { feature: 'Max Coverage', blue: 'USD 2M', flexi: 'PHP 2M', type: 'eagle' as const },
    { feature: 'Worldwide', blue: '\u2705', flexi: '\u274C', type: 'eagle' as const },
    { feature: 'No Age Limit', blue: '\u2705 (100)', flexi: '\u274C (70)', type: 'eagle' as const },
    { feature: 'Maternity', blue: '\u2705 B/C', flexi: '\u274C', type: 'eagle' as const },
    { feature: 'Dental', blue: '\u2705 B/C', flexi: '\u274C', type: 'eagle' as const },
    { feature: 'Vision', blue: '\u2705 B/C', flexi: '\u274C', type: 'eagle' as const },
    { feature: 'COVID-19', blue: '\u2705', flexi: '\u2705', type: 'shared' as const },
    { feature: 'Daily Income', blue: '\u274C', flexi: '\u2705 \u20B11K/day', type: 'beaver' as const },
    { feature: 'Enhances HMO', blue: '\u274C', flexi: '\u2705', type: 'beaver' as const },
    { feature: 'No-Cash-Outlay', blue: '\u2705', flexi: '\u2705', type: 'shared' as const },
    { feature: 'Phys. Exam', blue: 'Not Required', flexi: 'Not Required', type: 'shared' as const },
    { feature: 'Start Price', blue: '$1,676/yr', flexi: '\u20B16,510/yr', type: 'beaver' as const },
    { feature: 'Surgeon Fee', blue: 'As Charged B/C', flexi: 'As Charged / \u20B1180K', type: 'eagle' as const },
  ];

  return (
    <>
      {/* Header — Owl archetype context */}
      <div className="reveal-section" style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <h2 className="font-display" style={{ fontSize: '1.75rem', lineHeight: 1, margin: 0 }}>
            {'\u2696\uFE0F'} SIDE-BY-SIDE
          </h2>
          <span className="arch-badge arch-badge-owl">Compare</span>
        </div>
        <p className="font-sub" style={{ fontSize: '0.75rem', color: '#818cf8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          See how they stack up
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
          <span className="arch-badge arch-badge-eagle arch-badge-sm">Blue Royale = Eagle (Premium)</span>
          <span className="arch-badge arch-badge-beaver arch-badge-sm">FlexiShield = Beaver (Practical)</span>
        </div>
      </div>

      {/* Radar Chart */}
      <div className="reveal-section" style={{ marginBottom: '0.75rem' }}>
        <div className="panel">
          <ProductRadarChart />
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '0.75rem' }}>
            <span className="font-mono" style={{ fontSize: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span style={{ width: 10, height: 10, background: '#00d4ff', display: 'inline-block' }} />
              Blue Royale
            </span>
            <span className="font-mono" style={{ fontSize: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span style={{ width: 10, height: 10, background: '#f59e0b', display: 'inline-block' }} />
              FlexiShield
            </span>
          </div>
        </div>
      </div>

      {/* Comparison Table — Archetype comparison table */}
      <div className="reveal-section" style={{ marginBottom: '0.75rem' }}>
        <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
          <div
            className="font-sub"
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr',
              background: '#818cf8',
              color: '#080808',
              padding: '0.6rem 0.75rem',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase' as const,
            }}
          >
            <span>Feature</span>
            <span style={{ textAlign: 'center' }}>{'\uD83D\uDC51'} Blue Royale</span>
            <span style={{ textAlign: 'center' }}>{'\uD83D\uDEE1\uFE0F'} FlexiShield</span>
          </div>
          {comparisonData.map((row, i) => (
            <div
              key={i}
              className="font-mono"
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr',
                padding: '0.55rem 0.75rem',
                fontSize: '0.65rem',
                borderTop: '1px solid var(--border)',
                background: i % 2 === 0 ? 'var(--bg-card)' : 'var(--bg-panel)',
                color: 'var(--text)',
              }}
            >
              <span style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                {row.type === 'eagle' && <span className="arch-badge arch-badge-eagle arch-badge-sm" style={{ padding: '0.05rem 0.3rem', fontSize: '0.45rem' }}>E</span>}
                {row.type === 'beaver' && <span className="arch-badge arch-badge-beaver arch-badge-sm" style={{ padding: '0.05rem 0.3rem', fontSize: '0.45rem' }}>B</span>}
                {row.type === 'shared' && <span className="arch-badge arch-badge-owl arch-badge-sm" style={{ padding: '0.05rem 0.3rem', fontSize: '0.45rem' }}>S</span>}
                {row.feature}
              </span>
              <span style={{ textAlign: 'center', color: row.type === 'eagle' ? '#00d4ff' : 'var(--text-muted)' }}>{row.blue}</span>
              <span style={{ textAlign: 'center', color: row.type === 'beaver' ? '#f59e0b' : 'var(--text-muted)' }}>{row.flexi}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary stickers */}
      <div className="reveal-section" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div className="sticker" style={{ borderColor: '#00d4ff', color: '#00d4ff', boxShadow: '3px 3px 0 #00d4ff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="arch-badge arch-badge-eagle arch-badge-sm">Eagle</span>
            <span className="font-mono" style={{ fontSize: '0.65rem' }}>
              For HNWIs, OFWs, expats {'\u2014'} worldwide coverage up to USD 2M
            </span>
          </div>
        </div>
        <div className="sticker" style={{ borderColor: '#f59e0b', color: '#f59e0b', boxShadow: '3px 3px 0 #f59e0b' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="arch-badge arch-badge-beaver arch-badge-sm">Beaver</span>
            <span className="font-mono" style={{ fontSize: '0.65rem' }}>
              For employees, families {'\u2014'} PHP 2M HMO enhancement from {'\u20B1'}6,510/yr
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

// ============================================================
// CALCULATOR SECTION
// ============================================================
function CalculatorSection() {
  const [product, setProduct] = useState<'br' | 'fs'>('br');
  const [brPlan, setBrPlan] = useState<BRPlan>('planA');
  const [fsTier, setFsTier] = useState<FlexiShieldTier>('FS200');
  const [age, setAge] = useState(30);
  const [brDeductible, setBrDeductible] = useState('none');

  const brPremium = getBlueRoyalePremium(brPlan, age);
  const fsPremium = getFlexiShieldPremium(fsTier, age);

  const brDiscount = useMemo(() => {
    if (brDeductible === '1000' && brPlan === 'planA') return 15;
    if (brDeductible === '2500') return brPlan === 'planA' ? 30 : 18;
    if (brDeductible === '5000') {
      if (brPlan === 'planA') return 40;
      if (brPlan === 'planB') return 30;
      return 24;
    }
    if (brDeductible === 'tal') return 25;
    return 0;
  }, [brDeductible, brPlan]);

  return (
    <>
      {/* Header */}
      <div className="reveal-section" style={{ marginBottom: '1rem' }}>
        <h2 className="font-display" style={{ fontSize: '1.75rem', lineHeight: 1 }}>
          {'\uD83E\uDDEE'} PREMIUM ESTIMATOR
        </h2>
        <p className="font-sub" style={{ fontSize: '0.75rem', color: 'var(--accent-yellow)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Get exact pricing based on plan and age
        </p>
      </div>

      {/* Product Toggle */}
      <div className="reveal-section" style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <button
          onClick={() => setProduct('br')}
          className="btn-cta font-sub"
          style={{
            flex: 1,
            textAlign: 'center',
            padding: '0.5rem',
            borderRadius: 0,
            fontSize: '0.7rem',
            letterSpacing: '0.06em',
            opacity: product === 'br' ? 1 : 0.4,
            background: product === 'br' ? 'var(--accent-yellow)' : undefined,
            borderColor: product === 'br' ? 'var(--accent-yellow)' : undefined,
            color: product === 'br' ? '#000' : undefined,
          }}
        >
          {'\uD83D\uDC51'} BLUE ROYALE
        </button>
        <button
          onClick={() => setProduct('fs')}
          className="btn-cta font-sub"
          style={{
            flex: 1,
            textAlign: 'center',
            padding: '0.5rem',
            borderRadius: 0,
            fontSize: '0.7rem',
            letterSpacing: '0.06em',
            opacity: product === 'fs' ? 1 : 0.4,
            background: product === 'fs' ? 'var(--accent-red)' : undefined,
            borderColor: product === 'fs' ? 'var(--accent-red)' : undefined,
          }}
        >
          {'\uD83D\uDEE1\uFE0F'} FLEXISHIELD
        </button>
      </div>

      {product === 'br' ? (
        <div data-archetype="eagle" className="reveal-section">
          <div className="arch-card-eagle-feature">
            {/* Plan selector */}
            <div className="font-sub" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.35rem', marginBottom: '1rem' }}>
              {(['planA', 'planB', 'planC'] as BRPlan[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setBrPlan(p)}
                  style={{
                    padding: '0.45rem 0.5rem',
                    borderRadius: 0,
                    border: `1px solid ${brPlan === p ? '#c9a227' : 'var(--border)'}`,
                    background: brPlan === p ? 'rgba(201, 162, 39, 0.08)' : 'var(--bg-card)',
                    color: brPlan === p ? '#c9a227' : 'var(--text-muted)',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase' as const,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {blueRoyalePlans[p].name}
                </button>
              ))}
            </div>

            {/* Age slider */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <span className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>YOUR AGE</span>
                <span className="font-display" style={{ fontSize: '1.5rem', color: '#00d4ff', lineHeight: 1 }}>{age}</span>
              </div>
              <input
                type="range"
                min={19}
                max={80}
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
              />
            </div>

            {/* Discount selector */}
            <div style={{ marginBottom: '1rem' }}>
              <p className="font-sub" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {'\uD83C\uDFF7\uFE0F'} Deductible Discount
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.35rem' }}>
                {[
                  { id: 'none', label: 'NONE', pct: 0 },
                  { id: '1000', label: '$1,000', pct: 15 },
                  { id: '2500', label: '$2,500', pct: 18 },
                  { id: '5000', label: '$5,000', pct: 24 },
                  { id: 'tal', label: 'TAL', pct: 25 },
                ].map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setBrDeductible(d.id)}
                    style={{
                      padding: '0.4rem 0.5rem',
                      borderRadius: 0,
                      border: `1px solid ${brDeductible === d.id ? '#c9a227' : 'var(--border)'}`,
                      background: brDeductible === d.id ? 'rgba(201, 162, 39, 0.08)' : 'var(--bg-card)',
                      color: brDeductible === d.id ? '#c9a227' : 'var(--text-muted)',
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase' as const,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {d.label} {d.pct > 0 ? `(-${d.pct}%)` : ''}
                  </button>
                ))}
              </div>
            </div>

            {brPremium && (
              <div
                style={{
                  background: 'rgba(201, 162, 39, 0.08)',
                  border: '2px solid #c9a227',
                  padding: '1rem',
                  textAlign: 'center',
                  borderRadius: 0,
                }}
              >
                <p className="font-mono" style={{ fontSize: '0.6rem', textTransform: 'uppercase', marginBottom: '0.25rem', color: '#00d4ff' }}>
                  Annual Premium &mdash; {blueRoyalePlans[brPlan].name}
                </p>
                {brDiscount > 0 ? (
                  <>
                    <p className="font-display" style={{ fontSize: '1.1rem', lineHeight: 1, textDecoration: 'line-through', opacity: 0.4, color: '#c9a227' }}>
                      ${brPremium.toLocaleString()}
                    </p>
                    <p className="font-display" style={{ fontSize: '2rem', lineHeight: 1, color: '#c9a227' }}>
                      ${Math.round(brPremium * (1 - brDiscount / 100)).toLocaleString()}
                    </p>
                    <p className="font-mono" style={{ fontSize: '0.65rem', color: '#c9a227', fontWeight: 700 }}>
                      You save ${Math.round(brPremium * brDiscount / 100).toLocaleString()}/yr!
                    </p>
                    {/* Daily pricing output */}
                    <p className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                      ${Math.round((brPremium * (1 - brDiscount / 100)) / 365).toLocaleString()}/day &bull; ${Math.round((brPremium * (1 - brDiscount / 100)) / 12).toLocaleString()}/month
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-display" style={{ fontSize: '2rem', lineHeight: 1, color: '#c9a227' }}>
                      ${brPremium.toLocaleString()}
                    </p>
                    <p className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                      ${Math.round(brPremium / 365).toLocaleString()}/day
                    </p>
                  </>
                )}
                <p className="font-mono" style={{ fontSize: '0.7rem', marginTop: '0.25rem', color: 'var(--text-muted)' }}>
                  ${Math.round((brPremium * (1 - brDiscount / 100)) / 12).toLocaleString()}/month
                </p>
                <span className="arch-card-eagle-feature-badge" style={{ marginTop: '0.5rem', display: 'inline-block' }}>
                  ${Math.round((brPremium * (1 - brDiscount / 100)) / 365).toLocaleString()}/day
                </span>
              </div>
            )}

            {/* Age bracket grid */}
            {brPremium && (
              <div style={{ marginTop: '0.75rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.35rem' }}>
                {blueRoyalePlans[brPlan].premiums.map((bracket, i) => (
                  <div
                    key={i}
                    style={{
                      background: 'var(--bg-card)',
                      padding: '0.5rem',
                      textAlign: 'center',
                      border: '1px solid var(--border)',
                      borderRadius: 0,
                    }}
                  >
                    <p className="font-mono" style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>
                      {bracket.minAge}-{bracket.maxAge}
                    </p>
                    <p className="font-display" style={{ fontSize: '0.7rem', color: '#c9a227' }}>
                      ${bracket.annual.toLocaleString()}
                    </p>
                    <p className="font-mono" style={{ fontSize: '0.45rem', color: 'var(--text-dim)' }}>
                      ${Math.round(bracket.annual / 365)}/day
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* FlexiShield Calculator — Beaver archetype */
        <div data-archetype="beaver" className="reveal-section">
          <div className="arch-card-beaver-calculator">
            {/* Tier selector */}
            <div className="font-sub" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.35rem', marginBottom: '1rem' }}>
              {flexiShieldTiers.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setFsTier(tier.id)}
                  style={{
                    padding: '0.45rem 0.25rem',
                    borderRadius: 0,
                    border: `1px solid ${fsTier === tier.id ? '#f59e0b' : 'var(--border)'}`,
                    background: fsTier === tier.id ? 'rgba(245, 158, 11, 0.08)' : 'var(--bg-card)',
                    color: fsTier === tier.id ? '#f59e0b' : 'var(--text-muted)',
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase' as const,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {tier.label}
                </button>
              ))}
            </div>

            {/* Age slider */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <span className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>YOUR AGE</span>
                <span className="font-display" style={{ fontSize: '1.5rem', color: '#f59e0b', lineHeight: 1 }}>{age}</span>
              </div>
              <input
                type="range"
                min={0}
                max={70}
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
              />
            </div>

            {fsPremium && (
              <div className="arch-card-beaver-calculator-output">
                <p className="font-mono" style={{ fontSize: '0.6rem', textTransform: 'uppercase', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>
                  Annual Premium &mdash; {flexiShieldTiers.find((t) => t.id === fsTier)?.label}
                </p>
                <div className="arch-card-beaver-calculator-value">
                  {'\u20B1'}{fsPremium.toLocaleString()}
                </div>
                <p className="font-mono" style={{ fontSize: '0.7rem', marginTop: '0.25rem', color: 'var(--text-muted)' }}>
                  {'\u20B1'}{Math.round(fsPremium / 12).toLocaleString()}/month
                </p>
              </div>
            )}

            {/* Beaver daily pricing output */}
            {fsPremium && (
              <div className="arch-price-beaver" style={{ marginTop: '0.5rem' }}>
                <div>
                  <span className="arch-price-beaver-daily font-display" style={{ fontSize: '2rem' }}>
                    {'\u20B1'}{Math.round(fsPremium / 365).toLocaleString()}
                  </span>
                  <span className="arch-price-beaver-daily-unit" style={{ fontSize: '0.7rem' }}>/day</span>
                </div>
                <div className="arch-price-beaver-equals">=</div>
                <div className="arch-price-beaver-annual">
                  {'\u20B1'}{fsPremium.toLocaleString()}/yr
                </div>
                <div className="arch-price-beaver-badge">Age {age}</div>
              </div>
            )}

            {!fsPremium && (
              <div
                style={{
                  background: 'var(--bg-card)',
                  padding: '1rem',
                  textAlign: 'center',
                  border: '1px solid var(--border)',
                  borderRadius: 0,
                }}
              >
                <p className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                  {age > 70 ? 'Maximum entry age is 70.' : 'This tier is not available for the selected age.'}
                </p>
              </div>
            )}

            {/* Full pricing for selected tier */}
            <div style={{ marginTop: '0.75rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.35rem' }}>
              {flexiShieldPricing.map((bracket, i) => {
                const p = bracket.premiums[fsTier];
                if (p === 0) return null;
                return (
                  <div
                    key={i}
                    style={{
                      background: 'var(--bg-card)',
                      padding: '0.5rem',
                      textAlign: 'center',
                      border: '1px solid var(--border)',
                      borderRadius: 0,
                    }}
                  >
                    <p className="font-mono" style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>
                      {bracket.minAge}-{bracket.maxAge}
                    </p>
                    <p className="font-display" style={{ fontSize: '0.7rem', color: '#f59e0b' }}>
                      {'\u20B1'}{p.toLocaleString()}
                    </p>
                    <p className="font-mono" style={{ fontSize: '0.45rem', color: 'var(--text-dim)' }}>
                      {'\u20B1'}{Math.round(p / 365)}/day
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="reveal-section" style={{ marginTop: '0.75rem' }}>
        <div className="sticker" style={{ borderColor: 'var(--accent-yellow)', color: 'var(--accent-yellow)', boxShadow: '3px 3px 0 var(--accent-yellow)' }}>
          <span className="font-mono" style={{ fontSize: '0.6rem' }}>
            {'\u26A0\uFE0F'} Prices are from official brochures. Actual premiums may vary. Contact Pacific Cross for exact quotes.
          </span>
        </div>
      </div>
    </>
  );
}
