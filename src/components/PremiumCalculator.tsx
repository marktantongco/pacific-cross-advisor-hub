'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';

// ============================================================
// SAMPLE PRICING DATA
// ============================================================

type Plan = 'flexishield' | 'blueroyale';
type FlexiShieldPlan = 'Silver' | 'Gold';
type BlueRoyalePlan = 'Silver' | 'Gold' | 'Platinum';
type Coverage = 'low' | 'mid' | 'high';

const FLEXISHIELD_PLANS: { id: FlexiShieldPlan; label: string }[] = [
  { id: 'Silver', label: 'FLEXISHIELD SILVER' },
  { id: 'Gold', label: 'FLEXISHIELD GOLD' },
];

const BLUEROYALE_PLANS: { id: BlueRoyalePlan; label: string }[] = [
  { id: 'Silver', label: 'BLUE ROYALE SILVER' },
  { id: 'Gold', label: 'BLUE ROYALE GOLD' },
  { id: 'Platinum', label: 'BLUE ROYALE PLATINUM' },
];

const FLEXISHIELD_COVERAGE: { id: Coverage; label: string; multiplier: number }[] = [
  { id: 'low', label: '\u20B1500K', multiplier: 1.0 },
  { id: 'mid', label: '\u20B11M', multiplier: 1.5 },
  { id: 'high', label: '\u20B12M', multiplier: 2.2 },
];

const BLUEROYALE_COVERAGE: { id: Coverage; label: string; multiplier: number }[] = [
  { id: 'low', label: '$100K', multiplier: 1.0 },
  { id: 'mid', label: '$500K', multiplier: 1.3 },
  { id: 'high', label: '$2M', multiplier: 1.8 },
];

// FlexiShield base premiums by age bracket
const FS_PREMIUMS: Record<FlexiShieldPlan, Record<string, number>> = {
  Silver: { '18-30': 6510, '31-45': 8130, '46-55': 11450, '56-65': 15600, '66-75': 19500 },
  Gold:   { '18-30': 9750, '31-45': 12200, '46-55': 17175, '56-65': 23400, '66-75': 29250 },
};

// Blue Royale base premiums by age bracket
const BR_PREMIUMS: Record<BlueRoyalePlan, Record<string, number>> = {
  Silver:   { '18-30': 1676, '31-45': 2095, '46-55': 2933, '56-65': 4190, '66-75': 5444 },
  Gold:     { '18-30': 2514, '31-45': 3143, '46-55': 4400, '56-65': 6285, '66-75': 8166 },
  Platinum: { '18-30': 3352, '31-45': 4190, '46-55': 5866, '56-65': 8380, '66-75': 10888 },
};

const AGE_BRACKETS = [
  { min: 18, max: 30, key: '18-30' },
  { min: 31, max: 45, key: '31-45' },
  { min: 46, max: 55, key: '46-55' },
  { min: 56, max: 65, key: '56-65' },
  { min: 66, max: 75, key: '66-75' },
];

function getAgeBracket(age: number): string {
  const bracket = AGE_BRACKETS.find(b => age >= b.min && age <= b.max);
  return bracket ? bracket.key : '18-30';
}

function getBasePremium(plan: Plan, planTier: string, age: number): number {
  const bracket = getAgeBracket(age);
  if (plan === 'flexishield') {
    return FS_PREMIUMS[planTier as FlexiShieldPlan]?.[bracket] ?? FS_PREMIUMS.Silver['18-30'];
  }
  return BR_PREMIUMS[planTier as BlueRoyalePlan]?.[bracket] ?? BR_PREMIUMS.Silver['18-30'];
}

// ============================================================
// ANIMATED NUMBER HOOK
// ============================================================

function useAnimatedNumber(target: number, duration = 400) {
  const [display, setDisplay] = useState(target);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const fromRef = useRef<number>(target);

  useEffect(() => {
    if (target === fromRef.current) return;
    fromRef.current = display;
    startRef.current = performance.now();
    const from = display;
    const to = target;

    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplay(Math.round(from + (to - from) * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return display;
}

// ============================================================
// PREMIUM CALCULATOR COMPONENT
// ============================================================

interface PremiumCalculatorProps {
  compact?: boolean;
}

export function PremiumCalculator({ compact = false }: PremiumCalculatorProps) {
  const [plan, setPlan] = useState<Plan>('flexishield');
  const [fsPlan, setFsPlan] = useState<FlexiShieldPlan>('Silver');
  const [brPlan, setBrPlan] = useState<BlueRoyalePlan>('Silver');
  const [age, setAge] = useState(30);
  const [coverage, setCoverage] = useState<Coverage>('low');
  const [dependents, setDependents] = useState(0);

  const coverageMultiplier = plan === 'flexishield'
    ? FLEXISHIELD_COVERAGE.find(c => c.id === coverage)?.multiplier ?? 1
    : BLUEROYALE_COVERAGE.find(c => c.id === coverage)?.multiplier ?? 1;

  const planTier = plan === 'flexishield' ? fsPlan : brPlan;
  const basePremium = getBasePremium(plan, planTier, age);
  const dependentAdd = 1 + dependents * 0.15;
  const annualPremium = Math.round(basePremium * coverageMultiplier * dependentAdd);
  const dailyCost = Math.round(annualPremium / 365);
  const monthlyCost = Math.round(annualPremium / 12);

  const animatedAnnual = useAnimatedNumber(annualPremium);
  const animatedDaily = useAnimatedNumber(dailyCost);
  const animatedMonthly = useAnimatedNumber(monthlyCost);

  const isPHP = plan === 'flexishield';
  const currencySymbol = isPHP ? '\u20B1' : '$';

  // Coffee / load comparison
  const coffeeCostPHP = 35; // average 3-in-1 coffee in PH
  const coffeeCostUSD = 5;  // average coffee
  const coffeeCost = isPHP ? coffeeCostPHP : coffeeCostUSD;
  const coffeesPerYear = Math.round(annualPremium / coffeeCost);

  const loadCostPHP = 30;  // average mobile load in PH
  const loadCostUSD = 15;  // average mobile plan top-up
  const loadCost = isPHP ? loadCostPHP : loadCostUSD;
  const loadsPerYear = Math.round(annualPremium / loadCost);

  const premiumBarWidth = Math.min(100, (annualPremium / (isPHP ? 30000 : 6000)) * 100);
  const coffeeBarWidth = Math.min(100, (coffeesPerYear / 365) * 100);

  // Reset coverage when plan switches
  const handlePlanSwitch = useCallback((newPlan: Plan) => {
    setPlan(newPlan);
    setCoverage('low');
    setDependents(0);
  }, []);

  if (compact) {
    return (
      <CompactCalculator
        plan={plan}
        setPlan={handlePlanSwitch}
        fsPlan={fsPlan}
        setFsPlan={setFsPlan}
        brPlan={brPlan}
        setBrPlan={setBrPlan}
        age={age}
        setAge={setAge}
        coverage={coverage}
        setCoverage={setCoverage}
        dependents={dependents}
        setDependents={setDependents}
        annualPremium={animatedAnnual}
        dailyCost={animatedDaily}
        monthlyCost={animatedMonthly}
        isPHP={isPHP}
        currencySymbol={currencySymbol}
        coffeesPerYear={coffeesPerYear}
        loadsPerYear={loadsPerYear}
      />
    );
  }

  return (
    <div data-archetype="beaver">
      {/* Header */}
      <div className="panel" style={{ border: '2px solid var(--accent-yellow)', marginBottom: '1rem' }}>
        <div className="panel-header" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span aria-hidden="true">{'\uD83E\uDDEE'}</span>
          <span>PREMIUM CALCULATOR</span>
          <span className="arch-badge arch-badge-beaver">Beaver</span>
        </div>
      </div>

      {/* Plan Toggle */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <button
          onClick={() => handlePlanSwitch('flexishield')}
          className={plan === 'flexishield' ? 'btn-cta' : 'btn-ghost'}
          style={{
            flex: 1,
            textAlign: 'center',
            padding: '0.6rem 0.5rem',
            borderRadius: 0,
            fontSize: '0.65rem',
            letterSpacing: '0.06em',
            background: plan === 'flexishield' ? 'var(--accent-yellow)' : 'transparent',
            borderColor: plan === 'flexishield' ? 'var(--accent-yellow)' : 'var(--border)',
            color: plan === 'flexishield' ? '#000' : 'var(--text-muted)',
          }}
        >
          {'\uD83D\uDEE1\uFE0F'} FLEXISHIELD
        </button>
        <button
          onClick={() => handlePlanSwitch('blueroyale')}
          className={plan === 'blueroyale' ? 'btn-cta' : 'btn-ghost'}
          style={{
            flex: 1,
            textAlign: 'center',
            padding: '0.6rem 0.5rem',
            borderRadius: 0,
            fontSize: '0.65rem',
            letterSpacing: '0.06em',
            background: plan === 'blueroyale' ? 'var(--accent-red)' : 'transparent',
            borderColor: plan === 'blueroyale' ? 'var(--accent-red)' : 'var(--border)',
            color: plan === 'blueroyale' ? '#000' : 'var(--text-muted)',
          }}
        >
          {'\uD83D\uDC51'} BLUE ROYALE
        </button>
      </div>

      {/* Age Slider */}
      <div style={{ marginBottom: '1rem' }}>
        <div className="panel" style={{ border: '2px solid var(--border)', borderLeft: '3px solid #f59e0b' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.5rem' }}>
            <div>
              <span className="font-mono" style={{ fontSize: '0.6rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Your Age
              </span>
            </div>
            <span className="font-display" style={{ fontSize: '2rem', color: '#f59e0b', lineHeight: 1 }}>{age}</span>
          </div>
          <input
            type="range"
            min={18}
            max={75}
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full"
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem' }}>
            <span className="font-mono" style={{ fontSize: '0.5rem', color: 'var(--text-dim)' }}>18</span>
            <span className="font-mono" style={{ fontSize: '0.5rem', color: 'var(--text-dim)' }}>30</span>
            <span className="font-mono" style={{ fontSize: '0.5rem', color: 'var(--text-dim)' }}>45</span>
            <span className="font-mono" style={{ fontSize: '0.5rem', color: 'var(--text-dim)' }}>55</span>
            <span className="font-mono" style={{ fontSize: '0.5rem', color: 'var(--text-dim)' }}>65</span>
            <span className="font-mono" style={{ fontSize: '0.5rem', color: 'var(--text-dim)' }}>75</span>
          </div>
        </div>
      </div>

      {/* Plan Selection */}
      <div style={{ marginBottom: '1rem' }}>
        <p className="font-sub" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
          Plan Tier
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${plan === 'flexishield' ? 2 : 3}, 1fr)`, gap: '0.35rem' }}>
          {(plan === 'flexishield' ? FLEXISHIELD_PLANS : BLUEROYALE_PLANS).map((p) => {
            const isActive = plan === 'flexishield' ? fsPlan === p.id : brPlan === p.id;
            return (
              <button
                key={p.id}
                onClick={() => plan === 'flexishield' ? setFsPlan(p.id as FlexiShieldPlan) : setBrPlan(p.id as BlueRoyalePlan)}
                className="font-sub"
                style={{
                  padding: '0.5rem 0.35rem',
                  borderRadius: 0,
                  border: `2px solid ${isActive ? '#f59e0b' : 'var(--border)'}`,
                  background: isActive ? 'rgba(245, 158, 11, 0.1)' : 'var(--bg-card)',
                  color: isActive ? '#f59e0b' : 'var(--text-muted)',
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase' as const,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'center',
                }}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Coverage Amount */}
      <div style={{ marginBottom: '1rem' }}>
        <p className="font-sub" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
          Coverage Amount
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.35rem' }}>
          {(plan === 'flexishield' ? FLEXISHIELD_COVERAGE : BLUEROYALE_COVERAGE).map((c) => (
            <button
              key={c.id}
              onClick={() => setCoverage(c.id)}
              className="font-mono"
              style={{
                padding: '0.5rem 0.35rem',
                borderRadius: 0,
                border: `2px solid ${coverage === c.id ? '#f59e0b' : 'var(--border)'}`,
                background: coverage === c.id ? 'rgba(245, 158, 11, 0.1)' : 'var(--bg-card)',
                color: coverage === c.id ? '#f59e0b' : 'var(--text-muted)',
                fontSize: '0.65rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'center',
              }}
            >
              {c.label}
              <span style={{ display: 'block', fontSize: '0.5rem', color: 'var(--text-dim)', marginTop: '0.1rem' }}>
                {c.multiplier}x
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Dependents */}
      <div style={{ marginBottom: '1rem' }}>
        <p className="font-sub" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
          Dependents (+15% each)
        </p>
        <div style={{ display: 'flex', gap: '0.35rem' }}>
          {[0, 1, 2, 3, 4].map((n) => (
            <button
              key={n}
              onClick={() => setDependents(n)}
              className="font-display"
              style={{
                flex: 1,
                padding: '0.5rem 0.25rem',
                borderRadius: 0,
                border: `2px solid ${dependents === n ? '#f59e0b' : 'var(--border)'}`,
                background: dependents === n ? '#f59e0b' : 'var(--bg-card)',
                color: dependents === n ? '#000' : 'var(--text-muted)',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'center',
                lineHeight: 1,
              }}
            >
              {n}
            </button>
          ))}
        </div>
        {dependents > 0 && (
          <p className="font-mono" style={{ fontSize: '0.55rem', color: 'var(--text-dim)', marginTop: '0.35rem', textAlign: 'center' }}>
            +{dependents * 15}% dependent surcharge applied
          </p>
        )}
      </div>

      {/* ====== RESULT DISPLAY ====== */}
      <div className="arch-price-beaver" style={{ marginBottom: '1rem' }}>
        <div style={{ textAlign: 'center', padding: '1.25rem' }}>
          <p className="font-mono" style={{ fontSize: '0.6rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
            Estimated Annual Premium
          </p>
          <p className="font-display" style={{ fontSize: '2.5rem', color: '#f59e0b', lineHeight: 1, marginBottom: '0.25rem' }}>
            {currencySymbol}{animatedAnnual.toLocaleString()}
            <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '0.25rem' }}>/yr</span>
          </p>
          <p className="font-display" style={{ fontSize: '1.25rem', color: '#f59e0b', lineHeight: 1, marginBottom: '0.75rem' }}>
            {currencySymbol}{animatedMonthly.toLocaleString()}
            <span className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginLeft: '0.25rem' }}>/mo</span>
          </p>

          {/* Daily cost chip */}
          <div className="arch-price-beaver-daily" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <span className="arch-price-beaver-daily-unit font-display" style={{ fontSize: '1.75rem', color: '#f59e0b' }}>
              {currencySymbol}{animatedDaily.toLocaleString()}
            </span>
            <span className="arch-price-beaver-daily-unit font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>/day</span>
          </div>

          <div className="arch-price-beaver-badge" style={{ marginTop: '0.75rem' }}>
            Age {age} &bull; {planTier} &bull; {dependents} dependent{dependents !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* ====== COMPARISON BAR ====== */}
      <div className="panel" style={{ border: '2px solid var(--border)', marginBottom: '1rem' }}>
        <div className="panel-header" style={{ marginBottom: '0.75rem' }}>
          {'\uD83D\uDCCA'} PERSPECTIVE CHECK
        </div>

        {/* Coffee comparison */}
        <div style={{ marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
            <span className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>
              {'\u2615'} = cups of {isPHP ? '3-in-1 coffee' : 'coffee'}/yr ({currencySymbol}{coffeeCost})
            </span>
            <span className="font-display" style={{ fontSize: '1rem', color: 'var(--text)' }}>
              {coffeesPerYear}x
            </span>
          </div>
          <div style={{ height: '8px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 0, overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${coffeeBarWidth}%`,
                background: '#f59e0b',
                transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                borderRadius: 0,
              }}
            />
          </div>
        </div>

        {/* Load comparison */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
            <span className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>
              {'\uD83D\uDCF1'} = {isPHP ? 'mobile load' : 'streaming sub'}/yr ({currencySymbol}{loadCost})
            </span>
            <span className="font-display" style={{ fontSize: '1rem', color: 'var(--text)' }}>
              {loadsPerYear}x
            </span>
          </div>
          <div style={{ height: '8px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 0, overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${Math.min(100, (loadsPerYear / 365) * 100)}%`,
                background: 'var(--accent-red)',
                transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                borderRadius: 0,
              }}
            />
          </div>
        </div>

        <p className="font-mono" style={{ fontSize: '0.55rem', color: 'var(--text-dim)', marginTop: '0.75rem', textAlign: 'center' }}>
          Your premium = {currencySymbol}{animatedDaily.toLocaleString()}/day. Less than a {isPHP ? 'grab meal' : 'lunch'}.
        </p>
      </div>

      {/* ====== STAT CARDS ====== */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
        <div className="arch-card-owl-stat" style={{ textAlign: 'center' }}>
          <span className="stat-value font-display" style={{ fontSize: '1.1rem', color: '#f59e0b' }}>{currencySymbol}{animatedAnnual.toLocaleString()}</span>
          <span className="stat-label">Annual</span>
        </div>
        <div className="arch-card-owl-stat" style={{ textAlign: 'center' }}>
          <span className="stat-value font-display" style={{ fontSize: '1.1rem', color: '#f59e0b' }}>{currencySymbol}{animatedMonthly.toLocaleString()}</span>
          <span className="stat-label">Monthly</span>
        </div>
        <div className="arch-card-owl-stat" style={{ textAlign: 'center' }}>
          <span className="stat-value font-display" style={{ fontSize: '1.1rem', color: '#f59e0b' }}>{currencySymbol}{animatedDaily.toLocaleString()}</span>
          <span className="stat-label">Daily</span>
        </div>
      </div>

      {/* ====== CTA ====== */}
      <div style={{ textAlign: 'center' }}>
        <button className="btn-cta" style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.75rem' }}>
          GET A BINDING QUOTE {'\u2192'}
        </button>
      </div>

      {/* Disclaimer */}
      <div className="sticker" style={{ transform: 'rotate(-1deg)', marginTop: '0.75rem' }}>
        {'\u26A0\uFE0F'} Estimates only. Contact Pacific Cross for official quotes.
      </div>
    </div>
  );
}

// ============================================================
// COMPACT CALCULATOR (for ProductsSection inline toggle)
// ============================================================

function CompactCalculator({
  plan, setPlan, fsPlan, setFsPlan, brPlan, setBrPlan,
  age, setAge, coverage, setCoverage, dependents, setDependents,
  annualPremium, dailyCost, monthlyCost, isPHP, currencySymbol,
  coffeesPerYear, loadsPerYear,
}: {
  plan: Plan;
  setPlan: (p: Plan) => void;
  fsPlan: FlexiShieldPlan;
  setFsPlan: (p: FlexiShieldPlan) => void;
  brPlan: BlueRoyalePlan;
  setBrPlan: (p: BlueRoyalePlan) => void;
  age: number;
  setAge: (a: number) => void;
  coverage: Coverage;
  setCoverage: (c: Coverage) => void;
  dependents: number;
  setDependents: (d: number) => void;
  annualPremium: number;
  dailyCost: number;
  monthlyCost: number;
  isPHP: boolean;
  currencySymbol: string;
  coffeesPerYear: number;
  loadsPerYear: number;
}) {
  return (
    <div data-archetype="beaver">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <span className="panel-header" style={{ border: 'none', margin: 0, padding: 0, fontSize: '1rem' }}>
          {'\uD83E\uDDEE'} QUICK QUOTE
        </span>
        <span className="arch-badge arch-badge-beaver arch-badge-sm">Beaver</span>
      </div>

      {/* Plan Toggle */}
      <div style={{ display: 'flex', gap: '0.35rem', marginBottom: '0.75rem' }}>
        <button
          onClick={() => setPlan('flexishield')}
          className="font-sub"
          style={{
            flex: 1,
            textAlign: 'center',
            padding: '0.4rem 0.35rem',
            borderRadius: 0,
            border: `2px solid ${plan === 'flexishield' ? '#f59e0b' : 'var(--border)'}`,
            background: plan === 'flexishield' ? '#f59e0b' : 'transparent',
            color: plan === 'flexishield' ? '#000' : 'var(--text-muted)',
            fontSize: '0.6rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            textTransform: 'uppercase' as const,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          {'\uD83D\uDEE1\uFE0F'} FlexiShield
        </button>
        <button
          onClick={() => setPlan('blueroyale')}
          className="font-sub"
          style={{
            flex: 1,
            textAlign: 'center',
            padding: '0.4rem 0.35rem',
            borderRadius: 0,
            border: `2px solid ${plan === 'blueroyale' ? 'var(--accent-red)' : 'var(--border)'}`,
            background: plan === 'blueroyale' ? 'var(--accent-red)' : 'transparent',
            color: plan === 'blueroyale' ? '#000' : 'var(--text-muted)',
            fontSize: '0.6rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            textTransform: 'uppercase' as const,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          {'\uD83D\uDC51'} Blue Royale
        </button>
      </div>

      {/* Plan tiers */}
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${plan === 'flexishield' ? 2 : 3}, 1fr)`, gap: '0.25rem', marginBottom: '0.75rem' }}>
        {(plan === 'flexishield' ? FLEXISHIELD_PLANS : BLUEROYALE_PLANS).map((p) => {
          const isActive = plan === 'flexishield' ? fsPlan === p.id : brPlan === p.id;
          return (
            <button
              key={p.id}
              onClick={() => plan === 'flexishield' ? setFsPlan(p.id as FlexiShieldPlan) : setBrPlan(p.id as BlueRoyalePlan)}
              className="font-mono"
              style={{
                padding: '0.35rem 0.25rem',
                borderRadius: 0,
                border: `1px solid ${isActive ? '#f59e0b' : 'var(--border)'}`,
                background: isActive ? 'rgba(245, 158, 11, 0.1)' : 'var(--bg-card)',
                color: isActive ? '#f59e0b' : 'var(--text-muted)',
                fontSize: '0.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'center',
              }}
            >
              {p.id}
            </button>
          );
        })}
      </div>

      {/* Age slider */}
      <div style={{ marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.25rem' }}>
          <span className="font-mono" style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>AGE</span>
          <span className="font-display" style={{ fontSize: '1.25rem', color: '#f59e0b', lineHeight: 1 }}>{age}</span>
        </div>
        <input
          type="range"
          min={18}
          max={75}
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Coverage */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.25rem', marginBottom: '0.75rem' }}>
        {(plan === 'flexishield' ? FLEXISHIELD_COVERAGE : BLUEROYALE_COVERAGE).map((c) => (
          <button
            key={c.id}
            onClick={() => setCoverage(c.id)}
            className="font-mono"
            style={{
              padding: '0.35rem 0.25rem',
              borderRadius: 0,
              border: `1px solid ${coverage === c.id ? '#f59e0b' : 'var(--border)'}`,
              background: coverage === c.id ? 'rgba(245, 158, 11, 0.1)' : 'var(--bg-card)',
              color: coverage === c.id ? '#f59e0b' : 'var(--text-muted)',
              fontSize: '0.55rem',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Dependents */}
      <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.75rem' }}>
        {[0, 1, 2, 3, 4].map((n) => (
          <button
            key={n}
            onClick={() => setDependents(n)}
            className="font-display"
            style={{
              flex: 1,
              padding: '0.3rem 0.15rem',
              borderRadius: 0,
              border: `1px solid ${dependents === n ? '#f59e0b' : 'var(--border)'}`,
              background: dependents === n ? '#f59e0b' : 'var(--bg-card)',
              color: dependents === n ? '#000' : 'var(--text-muted)',
              fontSize: '0.7rem',
              cursor: 'pointer',
              textAlign: 'center',
              lineHeight: 1,
            }}
          >
            {n}
          </button>
        ))}
      </div>

      {/* Result */}
      <div className="arch-price-beaver" style={{ padding: '0.75rem' }}>
        <div style={{ textAlign: 'center' }}>
          <p className="font-display" style={{ fontSize: '1.75rem', color: '#f59e0b', lineHeight: 1, marginBottom: '0.15rem' }}>
            {currencySymbol}{annualPremium.toLocaleString()}
            <span className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginLeft: '0.2rem' }}>/yr</span>
          </p>
          <div className="price-daily" style={{ marginTop: '0.35rem' }}>
            <span className="price-daily-amount font-display">{currencySymbol}{dailyCost.toLocaleString()}</span>
            <span className="price-daily-label">per day</span>
          </div>
          <div className="arch-price-beaver-badge" style={{ marginTop: '0.35rem' }}>
            Age {age} &bull; {dependents} dep{dependents !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Mini comparison */}
      <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.5rem' }}>
        <div className="arch-card-owl-stat" style={{ flex: 1, textAlign: 'center', padding: '0.5rem' }}>
          <span className="font-display" style={{ fontSize: '0.8rem', color: '#f59e0b' }}>{coffeesPerYear}x</span>
          <span className="font-mono" style={{ fontSize: '0.45rem', color: 'var(--text-dim)', display: 'block', marginTop: '0.1rem' }}>{'\u2615'}/yr</span>
        </div>
        <div className="arch-card-owl-stat" style={{ flex: 1, textAlign: 'center', padding: '0.5rem' }}>
          <span className="font-display" style={{ fontSize: '0.8rem', color: '#f59e0b' }}>{loadsPerYear}x</span>
          <span className="font-mono" style={{ fontSize: '0.45rem', color: 'var(--text-dim)', display: 'block', marginTop: '0.1rem' }}>{'\uD83D\uDCF1'}/yr</span>
        </div>
      </div>

      {/* CTA */}
      <button className="btn-cta" style={{ width: '100%', marginTop: '0.75rem', padding: '0.6rem', fontSize: '0.65rem' }}>
        GET QUOTE {'\u2192'}
      </button>
    </div>
  );
}
