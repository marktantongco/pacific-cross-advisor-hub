'use client';

import { useState, useEffect, useRef } from 'react';
import { FlipCards } from '@/components/interactive/flip-cards';
import { faqItems, glossaryTerms, competitorComparison } from '@/lib/data';

type TrainingView = 'presentation' | 'faq' | 'misconceptions' | 'glossary' | 'competitors';

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

export function TrainingSection() {
  const [view, setView] = useState<TrainingView>('faq');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const navItems: { id: TrainingView; label: string; emoji: string }[] = [
    { id: 'presentation', label: 'Deck', emoji: '📊' },
    { id: 'faq', label: 'FAQ', emoji: '❓' },
    { id: 'misconceptions', label: 'Myths', emoji: '💥' },
    { id: 'glossary', label: 'Glossary', emoji: '📖' },
    { id: 'competitors', label: 'Competitors', emoji: '⚔️' },
  ];

  const filteredFaq = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredGlossary = glossaryTerms.filter(
    (item) =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-8">
      <RevealSection>
        <div>
          <h2 className="section-title">Training &<br/>Resources</h2>
          <p className="section-subtitle mt-1">Level up your insurance knowledge</p>
        </div>
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

      {view === 'presentation' && (
        <div className="space-y-4">
          <RevealSection>
            <div>
              <h3 className="panel-header" style={{ border: 'none', margin: 0, padding: 0 }}>Training Presentation</h3>
              <p className="font-mono mt-1" style={{ color: 'var(--text-muted)' }}>Download & share the complete advisor training deck</p>
            </div>
          </RevealSection>
          <RevealSection delay={100}>
            <div className="hover-card p-5" style={{ border: '2px solid var(--accent-yellow)' }}>
              <div className="flex items-center gap-4">
                <div className="text-5xl">📋</div>
                <div className="flex-1">
                  <p className="font-sub text-base">Pacific Cross Training Deck</p>
                  <p className="font-mono text-xs mt-1" style={{ color: 'var(--text-muted)' }}>20 slides • Blue Royale & FlexiShield • Complete advisor guide</p>
                  <p className="font-mono text-xs mt-1" style={{ color: 'var(--accent-red)' }}>PHL insurance landscape • OFW market • Myth busting • Spiel flow • Roadmap</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2 flex-wrap">
                <a
                  href="/Pacific_Cross_Training_Deck.pptx"
                  download
                  className="btn-cta-yellow"
                  style={{ fontSize: '0.75rem' }}
                >
                  ⬇️ DOWNLOAD PPTX
                </a>
                <div className="btn-ghost" style={{ fontSize: '0.7rem' }}>
                  📄 631 KB • 20 Slides
                </div>
              </div>
            </div>
          </RevealSection>
          <RevealSection delay={200}>
            <div className="sticker" style={{ transform: 'rotate(-1deg)', borderColor: 'var(--accent-red)', color: 'var(--accent-red)', boxShadow: '3px 3px 0 var(--accent-red)' }}>
              💡 Use this deck for client presentations, team meetings, and social media content!
            </div>
          </RevealSection>
          <RevealSection delay={300}>
            <div className="panel" style={{ background: 'var(--bg)', border: '2px solid var(--accent-red)' }}>
              <h3 className="panel-header" style={{ color: 'var(--accent-red)' }}>📑 WHAT&apos;S INSIDE THE DECK:</h3>
              <ul className="space-y-1 font-mono text-xs">
                {[
                  '1. PH Insurance Reality & Statistics',
                  '2. ASEAN Comparison Charts',
                  '3. Blue Royale & FlexiShield Deep Dives',
                  '4. Product Comparison Table',
                  '5. OFW Market Opportunity',
                  '6. Myth vs Fact Debunking',
                  '7. 5-Step Advisor Spiel Flow',
                  '8. Objection Handling Scripts',
                  '9. Social Media Strategy',
                  '10. 30-60-90 Day Roadmap',
                ].map((item, i) => (
                  <li key={i} style={{ color: 'var(--text-muted)' }}>{item}</li>
                ))}
              </ul>
            </div>
          </RevealSection>
        </div>
      )}

      {view === 'faq' && (
        <div className="space-y-3">
          <RevealSection>
            <div className="relative">
              <input
                type="text"
                placeholder="🔍 Search FAQ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 font-mono text-sm outline-none"
                style={{ background: 'var(--bg-card)', border: '2px solid var(--border)', color: 'var(--text)' }}
              />
            </div>
          </RevealSection>

          {filteredFaq.map((item, i) => (
            <RevealSection key={i} delay={Math.min(i * 30, 300)}>
              <div>
                <button
                  className="brutal-accordion-header w-full"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{item.question}</span>
                  <span style={{ color: 'var(--accent-red)', fontSize: '1.2rem' }}>{openFaq === i ? '−' : '+'}</span>
                </button>
                <div className={`brutal-accordion-body ${openFaq === i ? 'open' : ''}`}>
                  <div className="brutal-accordion-body-inner">
                    {item.answer}
                  </div>
                </div>
              </div>
            </RevealSection>
          ))}

          {filteredFaq.length === 0 && (
            <div className="text-center py-8">
              <span className="text-3xl">🔍</span>
              <p className="font-mono text-sm mt-2">No results found for &quot;{searchTerm}&quot;</p>
            </div>
          )}
        </div>
      )}

      {view === 'misconceptions' && (
        <div className="space-y-4">
          <RevealSection>
            <div>
              <h3 className="panel-header" style={{ border: 'none', margin: 0, padding: 0 }}>Myth vs Fact</h3>
              <p className="font-mono mt-1" style={{ color: 'var(--text-muted)' }}>Tap each card to reveal the truth</p>
            </div>
          </RevealSection>
          <RevealSection delay={100}>
            <FlipCards />
          </RevealSection>
          <RevealSection delay={200}>
            <div className="sticker" style={{ transform: 'rotate(1deg)' }}>
              💡 Use these flip card facts in your social media content!
            </div>
          </RevealSection>
        </div>
      )}

      {view === 'glossary' && (
        <div className="space-y-3">
          <RevealSection>
            <input
              type="text"
              placeholder="🔍 Search terms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 font-mono text-sm outline-none"
              style={{ background: 'var(--bg-card)', border: '2px solid var(--border)', color: 'var(--text)' }}
            />
          </RevealSection>

          {filteredGlossary.map((item, i) => (
            <RevealSection key={i} delay={Math.min(i * 30, 300)}>
              <div className="hover-card p-4">
                <p className="font-sub text-sm" style={{ color: 'var(--accent-red)' }}>{item.term}</p>
                <p className="font-mono text-xs mt-1 leading-relaxed" style={{ color: 'var(--text-muted)' }}>{item.definition}</p>
              </div>
            </RevealSection>
          ))}

          {filteredGlossary.length === 0 && (
            <div className="text-center py-8">
              <span className="text-3xl">🔍</span>
              <p className="font-mono text-sm mt-2">No terms found for &quot;{searchTerm}&quot;</p>
            </div>
          )}
        </div>
      )}

      {view === 'competitors' && (
        <div className="space-y-4">
          <RevealSection>
            <div>
              <h3 className="panel-header" style={{ border: 'none', margin: 0, padding: 0 }}>Pacific Cross vs Others</h3>
              <p className="font-mono mt-1" style={{ color: 'var(--text-muted)' }}>Why we win</p>
            </div>
          </RevealSection>

          <RevealSection delay={100}>
            <div className="overflow-x-auto" style={{ border: '2px solid var(--border)', scrollbarWidth: 'thin' }}>
              <table className="w-full" style={{ minWidth: '400px' }}>
                <thead>
                  <tr>
                    <th className="p-3 text-left font-sub text-xs uppercase tracking-wider" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>Feature</th>
                    <th className="p-3 text-center font-sub text-xs uppercase tracking-wider" style={{ background: 'var(--accent-yellow)', color: 'var(--bg)', border: '1px solid var(--accent-yellow)' }}>Pacific Cross</th>
                    <th className="p-3 text-center font-sub text-xs uppercase tracking-wider" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>Competitor A</th>
                    <th className="p-3 text-center font-sub text-xs uppercase tracking-wider" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>Competitor B</th>
                    <th className="p-3 text-center font-sub text-xs uppercase tracking-wider" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>Competitor C</th>
                  </tr>
                </thead>
                <tbody>
                  {competitorComparison.map((row, i) => (
                    <tr key={i}>
                      <td className="p-2 font-mono text-xs font-bold" style={{ border: '1px solid var(--border)', background: i % 2 === 0 ? 'var(--bg-card)' : 'var(--bg-panel)' }}>{row.feature}</td>
                      <td className="p-2 text-center text-sm" style={{ border: '1px solid var(--border)', background: row.pacificCross ? 'var(--accent-yellow-dim)' : 'var(--accent-red-dim)' }}>
                        {row.pacificCross ? '✅' : '❌'}
                      </td>
                      <td className="p-2 text-center text-sm" style={{ border: '1px solid var(--border)', background: row.competitor1 ? 'var(--bg-elevated)' : 'var(--bg-panel)' }}>
                        {row.competitor1 ? '✅' : '❌'}
                      </td>
                      <td className="p-2 text-center text-sm" style={{ border: '1px solid var(--border)', background: row.competitor2 ? 'var(--bg-elevated)' : 'var(--bg-panel)' }}>
                        {row.competitor2 ? '✅' : '❌'}
                      </td>
                      <td className="p-2 text-center text-sm" style={{ border: '1px solid var(--border)', background: row.competitor3 ? 'var(--bg-elevated)' : 'var(--bg-panel)' }}>
                        {row.competitor3 ? '✅' : '❌'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </RevealSection>

          <RevealSection delay={200}>
            <div className="panel" style={{ border: '2px solid var(--accent-yellow)', background: 'var(--accent-yellow-dim)' }}>
              <p className="font-sub text-sm mb-3" style={{ color: 'var(--accent-yellow)' }}>🏆 PACIFIC CROSS ADVANTAGES:</p>
              <ul className="space-y-1 font-mono text-xs">
                {[
                  '→ <strong>75+ years</strong> of reliable service in the Philippines',
                  '→ <strong>No age limit</strong> for Blue Royale (infants to 100 years old)',
                  '→ <strong>Worldwide coverage</strong> with freedom to choose any provider',
                  '→ <strong>HMO enhancer</strong> — unique FlexiShield positioning',
                  '→ <strong>No-cash-outlay</strong> at partner hospitals',
                ].map((item, i) => (
                  <li key={i} style={{ color: 'var(--text-muted)' }}>{item}</li>
                ))}
              </ul>
            </div>
          </RevealSection>
        </div>
      )}
    </div>
  );
}
