'use client';

import React, { useState, useRef } from 'react';
import { products, stats, quizQuestions } from '@/lib/data';
import { FlexiShieldBadge, BlueRoyaleBadge } from '@/components/ProductBadge';
import { QuizFlow } from '@/components/interactive/quiz-flow';
import { SocialCards } from '@/components/SocialCards';
import { useGsapScrollReveal, useGsapMagneticAll } from '@/lib/gsap-engine';

// ============================================================
// GSAP REVEAL ON SCROLL — replaces IntersectionObserver useReveal
// ============================================================
function useGsapReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useGsapScrollReveal(ref);
  useGsapMagneticAll(ref);
  return ref;
}

// ============================================================
// LIFESTYLE QUIZ WITH PERSONA RESULTS
// ============================================================
function LifestyleQuiz() {
  const [started, setStarted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);

  if (!started) {
    return (
      <div className="panel-gradient-orange" style={{ padding: '2rem', textAlign: 'center' }}>
        <p className="font-display" style={{ fontSize: '2rem', color: 'var(--bg)', marginBottom: '0.5rem' }}>
          WHICH INSURANCE FITS YOUR VIBE?
        </p>
        <p className="font-mono" style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.7)', marginBottom: '1rem' }}>
          4 quick questions. Find your persona.
        </p>
        <button
          className="btn-cta"
          onClick={() => setStarted(true)}
          style={{ background: 'var(--bg)', color: 'var(--accent-cyan)', borderColor: 'var(--accent-cyan)' }}
        >
          TAKE THE QUIZ →
        </button>
      </div>
    );
  }

  const handleFinish = () => setShowResult(true);
  const handleRestart = () => {
    setStarted(false);
    setShowResult(false);
    setAnswers([]);
  };

  return (
    <div>
      {!showResult ? (
        <QuizFlow />
      ) : (
        <div className="space-y-4">
          <div className="text-center">
            <p className="font-display" style={{ fontSize: '2rem', color: 'var(--accent-cyan)' }}>
              YOUR RESULT
            </p>
          </div>
          <div className="grid gap-3">
            <div className="persona-tile persona-tile-strategist persona-tile-slam card-comic">
              <div className="flex items-center gap-2 mb-2">
                <FlexiShieldBadge size="sm" />
                <span className="font-sub" style={{ fontSize: '1rem', color: 'var(--accent-yellow)' }}>
                  THE STRATEGIST
                </span>
              </div>
              <p className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                Planner type. Wants value. Smart with money.
              </p>
              <p className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--text)' }}>
                Recommended: <strong>FlexiShield FS200</strong> — From ₱6,510/yr
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                <span className="tag tag-yellow">Budget-Friendly</span>
                <span className="tag tag-yellow">HMO Enhancer</span>
                <span className="tag">PHP 2M Coverage</span>
              </div>
            </div>

            <div className="persona-tile persona-tile-globetrotter persona-tile-slam card-comic" style={{ animationDelay: '0.15s' }}>
              <div className="flex items-center gap-2 mb-2">
                <BlueRoyaleBadge size="sm" />
                <span className="font-sub" style={{ fontSize: '1rem', color: 'var(--accent-cyan)' }}>
                  THE GLOBETROTTER
                </span>
              </div>
              <p className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                Travels the world. Needs worldwide protection.
              </p>
              <p className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--text)' }}>
                Recommended: <strong>Blue Royale Plan B</strong> — From $2,698/yr
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                <span className="tag tag-cyan" style={{ borderColor: 'var(--accent-cyan)', color: 'var(--accent-cyan)' }}>Worldwide</span>
                <span className="tag tag-cyan" style={{ borderColor: 'var(--accent-cyan)', color: 'var(--accent-cyan)' }}>90 Days/Trip</span>
                <span className="tag">USD 1M Coverage</span>
              </div>
            </div>

            <div className="persona-tile persona-tile-family persona-tile-slam card-comic" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-2 mb-2">
                <BlueRoyaleBadge size="sm" />
                <span className="font-sub" style={{ fontSize: '1rem', color: 'var(--accent-red)' }}>
                  THE FAMILY SHIELD
                </span>
              </div>
              <p className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                Protects the whole family. No compromises.
              </p>
              <p className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--text)' }}>
                Recommended: <strong>Blue Royale Plan C</strong> — From $3,346/yr
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                <span className="tag tag-red">Maternity</span>
                <span className="tag tag-red">Dental + Vision</span>
                <span className="tag">USD 2M Coverage</span>
              </div>
            </div>
          </div>
          <button className="btn-cta w-full" onClick={handleRestart} style={{ borderColor: 'var(--accent-cyan)', background: 'var(--accent-cyan)', color: '#080808' }}>
            RETAKE QUIZ
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================
// CLIENT MODE LAYOUT
// ============================================================
interface ClientModeLayoutProps {
  onNavigate?: (tab: string) => void;
}

export function ClientModeLayout({ onNavigate }: ClientModeLayoutProps) {
  const containerRef = useGsapReveal();
  const [quizSection, setQuizSection] = useState(false);

  return (
    <div ref={containerRef} className="client-layout space-y-8 pb-20">
      {/* ===== HERO ===== */}
      <section data-archetype="eagle" className="relative overflow-hidden p-6 sm:p-8 border-b-2" style={{ borderColor: 'var(--accent-cyan)' }}>
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span className="arch-badge arch-badge-eagle">Eagle Discovery</span>
          <span
            className="sticker"
            style={{ color: 'var(--accent-cyan)', borderColor: 'var(--accent-cyan)', boxShadow: '3px 3px 0 var(--accent-cyan)' }}
          >
            CLIENT HUB
          </span>
        </div>
        <h1
          className="font-display hero-slam"
          style={{ fontSize: 'clamp(2.5rem, 10vw, 6rem)', color: 'var(--accent-cyan)' }}
        >
          WHICH INSURANCE FITS YOUR VIBE?
        </h1>
        <p className="font-mono mt-3" style={{ color: 'var(--text-muted)', maxWidth: '440px' }}>
          Not all insurance is the same. Take the quiz. Discover your match.
        </p>
        <button
          className="btn-cta mt-6"
          onClick={() => {
            setQuizSection(true);
            setTimeout(() => {
              document.getElementById('quiz-section')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
          style={{ borderColor: 'var(--accent-cyan)', background: 'var(--accent-cyan)', color: '#080808' }}
        >
          FIND YOUR MATCH →
        </button>
      </section>

      {/* ===== PRODUCT DISCOVERY CARDS ===== */}
      <section className="reveal-section">
        <h2 className="section-title">DISCOVER YOUR ARMOR</h2>
        <p className="section-subtitle mt-1">Two ways to protect what matters</p>

        <div className="space-y-4 mt-4">
          {/* FlexiShield Card */}
          <div className="hover-card p-5 stagger-child card-comic" style={{ borderLeft: '3px solid var(--accent-yellow)' }}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <FlexiShieldBadge />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-sub" style={{ fontSize: '1.15rem' }}>
                    {products.flexiShield.name}
                  </h3>
                  <span className="tag tag-yellow">HMO ENHANCER</span>
                  <span className="arch-badge arch-badge-beaver arch-badge-sm">Beaver Pick</span>
                </div>
                <p className="font-mono mb-3" style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>
                  {products.flexiShield.description}
                </p>
                <div className="panel-gradient-orange" style={{ padding: '0.75rem', marginBottom: '0.75rem' }}>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div>
                      <div className="font-display" style={{ fontSize: '1.5rem', color: 'var(--bg)' }}>PHP 2M</div>
                      <div className="font-mono" style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.7)' }}>Max Coverage</div>
                    </div>
                    <div>
                      <div className="font-display" style={{ fontSize: '1.5rem', color: 'var(--bg)' }}>₱6,510</div>
                      <div className="font-mono" style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.7)' }}>Starting / Year</div>
                      <div className="arch-price-beaver-daily">
                        <span className="arch-price-beaver-daily-unit">₱18</span>/day
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="tag tag-yellow">COVID-19</span>
                  <span className="tag tag-yellow">As Charged ICU</span>
                  <span className="tag">Ages 0-70</span>
                </div>
              </div>
            </div>
          </div>

          {/* Blue Royale Card */}
          <div className="hover-card p-5 stagger-child card-comic" style={{ borderLeft: '3px solid var(--accent-cyan)' }}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <BlueRoyaleBadge />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-sub" style={{ fontSize: '1.15rem' }}>
                    {products.blueRoyale.name}
                  </h3>
                  <span className="tag" style={{ borderColor: 'var(--accent-cyan)', color: 'var(--accent-cyan)' }}>WORLDWIDE</span>
                  <span className="arch-badge arch-badge-eagle arch-badge-sm">Eagle Premium</span>
                </div>
                <p className="font-mono mb-3" style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>
                  {products.blueRoyale.description}
                </p>
                <div className="panel-gradient-cyan-dark" style={{ padding: '0.75rem', marginBottom: '0.75rem' }}>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div>
                      <div className="font-display" style={{ fontSize: '1.5rem', color: '#00d4ff' }}>USD 2M</div>
                      <div className="font-mono" style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.7)' }}>Max Coverage</div>
                    </div>
                    <div>
                      <div className="font-display" style={{ fontSize: '1.5rem', color: '#00d4ff' }}>$1,676</div>
                      <div className="font-mono" style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.7)' }}>Starting / Year</div>
                      <div className="price-daily">
                        <span className="price-daily-amount">$5</span>
                        <span className="price-daily-label">/day</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="tag" style={{ borderColor: 'var(--accent-cyan)', color: 'var(--accent-cyan)' }}>90 Days/Trip</span>
                  <span className="tag" style={{ borderColor: 'var(--accent-cyan)', color: 'var(--accent-cyan)' }}>As Charged</span>
                  <span className="tag">Ages 0-100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SOCIAL PROOF / THE REALITY ===== */}
      <section data-archetype="owl" className="reveal-section">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="section-title" style={{ marginBottom: 0 }}>THE REALITY</h2>
          <span className="arch-badge arch-badge-owl arch-badge-sm">Owl Verified</span>
        </div>
        <p className="section-subtitle mt-1">Why Filipinos need insurance now</p>

        <div className="grid grid-cols-2 gap-3 mt-4">
          {stats.quickStats.map((stat, i) => (
            <div key={i} className="hover-card p-4 text-center stagger-child card-comic">
              <div className="stat-value" style={{ color: i % 2 === 0 ? 'var(--accent-cyan)' : 'var(--accent-yellow)' }}>
                {stat.prefix || ''}
                {stat.value}
                {stat.suffix}
              </div>
              <p className="stat-label mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Shocking comparison */}
        <div
          className="mt-4 p-5 border-2 stagger-child card-comic-lg"
          style={{ borderColor: 'var(--accent-cyan)' }}
        >
          <p className="font-sub" style={{ fontSize: '1rem', color: 'var(--accent-cyan)', marginBottom: '1rem', fontStyle: 'italic' }}>
            &ldquo;MOST FILIPINOS INSURE THEIR PHONES BEFORE THEIR LIVES&rdquo;
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <div className="font-display" style={{ fontSize: '2rem', color: 'var(--accent-yellow)' }}>₱8,000</div>
              <p className="stat-label mt-1">Mobile Load / Year</p>
            </div>
            <div className="text-center p-3" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <div className="font-display" style={{ fontSize: '2rem', color: 'var(--accent-cyan)' }}>₱500</div>
              <p className="stat-label mt-1">Insurance / Year</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CHOOSE YOUR ARMOR COMPARISON ===== */}
      <section data-archetype="beaver" className="reveal-section">
        <h2 className="section-title">CHOOSE YOUR ARMOR</h2>
        <p className="section-subtitle mt-1">Side-by-side comparison</p>

        <div className="mt-4 card-comic-lg" style={{ border: '2px solid var(--border)' }}>
          <table className="arch-comparison-table">
            <thead>
              <tr>
                <th>FEATURE</th>
                <th>
                  <FlexiShieldBadge size="sm" />
                  <span className="arch-badge arch-badge-beaver arch-badge-sm" style={{ marginTop: '0.25rem' }}>Beaver Pick</span>
                </th>
                <th>
                  <BlueRoyaleBadge size="sm" />
                  <span className="arch-badge arch-badge-eagle arch-badge-sm" style={{ marginTop: '0.25rem' }}>Eagle Premium</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Max Coverage', 'PHP 2M', 'USD 2M'],
                ['Starting Price', '₱6,510/yr', '$1,676/yr'],
                ['Coverage Area', 'Philippines', 'Worldwide'],
                ['Age Range', '0-70 years', '0-100 years'],
                ['Hospital Income', '₱1,000/day', 'N/A'],
                ['Maternity', 'No', 'Plans B & C'],
                ['Dental', 'No', 'Plans B & C'],
                ['Vision', 'No', 'Plans B & C'],
                ['Enhances HMO', 'Yes', 'N/A'],
              ].map(([feature, flexi, blue], i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'var(--bg-panel)' : 'transparent' }}>
                  <td>{feature}</td>
                  <td style={{ color: 'var(--accent-yellow)' }}>{flexi}</td>
                  <td style={{ color: 'var(--accent-cyan)' }}>{blue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ===== LIFESTYLE QUIZ ===== */}
      <section id="quiz-section" className="reveal-section">
        <h2 className="section-title">LIFESTYLE QUIZ</h2>
        <p className="section-subtitle mt-1">Which insurance fits your vibe?</p>
        <div className="mt-4">
          <LifestyleQuiz />
        </div>
      </section>

      {/* ===== SOCIAL PROOF / TESTIMONIALS ===== */}
      <section data-archetype="ant" className="reveal-section">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="section-title" style={{ marginBottom: 0 }}>WHAT PEOPLE SAY</h2>
          <span className="arch-badge arch-badge-ant arch-badge-sm">Ant Verified</span>
        </div>
        <p className="section-subtitle mt-1">Real talk from real people</p>

        <div className="space-y-3 mt-4">
          {[
            { quote: 'I thought my company HMO was enough until the bill came to ₱1.2M and they only covered ₱200K.', person: 'Maria, 34', tag: 'Real Story' },
            { quote: 'Blue Royale saved us $45,000 in emergency hospital bills while working in Dubai.', person: 'Rico, OFW', tag: 'OFW Feature' },
            { quote: 'FlexiShield costs less than my monthly Netflix subscription. No brainer.', person: 'Jen, 28', tag: 'Smart Pinoy' },
          ].map((item, i) => (
            <div key={i} className="hover-card p-4 stagger-child card-comic arch-card-ant-social-proof">
              <div className="flex items-center gap-2 mb-2">
                <span className="tag" style={{ borderColor: 'var(--accent-cyan)', color: 'var(--accent-cyan)' }}>{item.tag}</span>
              </div>
              <p className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text)', fontStyle: 'italic', lineHeight: 1.6 }}>
                &ldquo;{item.quote}&rdquo;
              </p>
              <p className="font-mono mt-2" style={{ fontSize: '0.55rem', color: 'var(--text-dim)' }}>
                — {item.person}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SOCIAL CARDS PREVIEW ===== */}
      <section className="reveal-section">
        <h2 className="section-title">CONTENT GALLERY</h2>
        <p className="section-subtitle mt-1">Shareable cards for social media</p>
        <div className="mt-4">
          <SocialCards compact />
        </div>
      </section>

      {/* ===== CONTACT CTA ===== */}
      <section className="reveal-section">
        <div
          className="p-6 sm:p-8 text-center border-t-2 card-comic-lg"
          style={{ borderColor: 'var(--accent-cyan)', background: 'var(--bg-panel)' }}
        >
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem' }}>
            <span className="arch-badge arch-badge-beaver arch-badge-sm">Beaver Move</span>
            <span className="sticker" style={{ color: 'var(--accent-cyan)', borderColor: 'var(--accent-cyan)', boxShadow: '3px 3px 0 var(--accent-cyan)' }}>
              MAKE YOUR MOVE
            </span>
          </div>
          <h2
            className="font-display mt-2"
            style={{ fontSize: 'clamp(1.8rem, 6vw, 3rem)', color: 'var(--accent-cyan)' }}
          >
            READY TO GET PROTECTED?
          </h2>
          <p className="font-mono mt-2" style={{ color: 'var(--text-muted)' }}>
            Talk to an advisor or start exploring now
          </p>
          <div className="grid grid-cols-2 gap-3 mt-6">
            <button className="btn-cta" style={{ borderColor: 'var(--accent-cyan)', background: 'var(--accent-cyan)', color: '#080808' }}>
              TALK TO ADVISOR
            </button>
            <button className="btn-cta-cyan">
              VIEW PRODUCTS
            </button>
          </div>
          <div className="mt-6 font-mono" style={{ fontSize: '0.55rem', color: 'var(--text-dim)' }}>
            <p>📞 +63 2 8230-8511</p>
            <p>📧 info@pacificcross.com.ph</p>
            <p>🏢 Makati HQ · Cebu · Clark · Davao</p>
          </div>
        </div>
      </section>
    </div>
  );
}
