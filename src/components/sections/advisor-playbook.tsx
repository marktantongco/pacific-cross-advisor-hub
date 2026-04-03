'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { SpielFlow } from '@/components/interactive/spiel-flow';
import { spielSteps } from '@/lib/data';

type PlaybookView = 'spiel' | 'objections' | 'templates' | 'tracker';

// Inline reveal using IntersectionObserver
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
    <div
      ref={ref}
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  );
}

export function AdvisorPlaybookSection() {
  const [view, setView] = useState<PlaybookView>('spiel');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const copyToClipboard = useCallback((text: string, id: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const socialTemplates = [
    { id: 'cold-dm', title: 'Cold DM Template', category: 'OUTREACH', content: '"Hi [Name]! 👋 I\'m an insurance advisor with Pacific Cross. I help Filipinos find affordable health protection that actually works. No pressure — just want to share some options that might help your family. Open to a quick chat?"' },
    { id: 'follow-up', title: 'Follow-up Message', category: 'FOLLOW-UP', content: '"Hi [Name]! Just checking in from last week. I know insurance isn\'t the most exciting topic 😄 but I wanted to share a quick comparison that might change your mind. Mind if I send it over?"' },
    { id: 'fb-post', title: 'Facebook Intro Post', category: 'SOCIAL POST', content: '"Hey everyone! 👋 I recently joined Pacific Cross as an insurance advisor because I saw firsthand how medical emergencies can devastate Filipino families.\n\nThe fact that 70% of us have NO health insurance beyond PhilHealth is scary. 🏥\n\nI\'m here to change that, one family at a time. 💪\n\nDrop me a message if you want to learn about affordable options!"' },
    { id: 'referral', title: 'Referral Request', category: 'GROWTH', content: '"Hi [Name]! Thanks for trusting me with your insurance needs. 🙏 If you know anyone who could benefit from what we discussed, I\'d really appreciate a referral. Happy to help your friends and family too!"' },
  ];

  const clientStages = [
    { stage: 'NEW LEAD', color: 'var(--text-muted)', items: ['Initial contact', 'Qualify interest', 'Set appointment'] },
    { stage: 'DISCOVERY', color: 'var(--accent-yellow)', items: ['Needs assessment', 'Share statistics', 'Build rapport'] },
    { stage: 'PROPOSAL', color: 'var(--accent-red)', items: ['Present products', 'Cost comparison', 'Address objections'] },
    { stage: 'CLOSED', color: 'var(--accent-yellow)', items: ['Enrollment complete', 'Payment processed', 'Welcome kit sent'] },
    { stage: 'NURTURE', color: 'var(--text)', items: ['Regular check-ins', 'Renewal reminders', 'Referral requests'] },
  ];

  const objections = [
    { objection: '"I can\'t afford it"', response: 'FlexiShield starts at PHP 292/month — less than your daily coffee! We have options for every budget.', emoji: '💰' },
    { objection: '"I already have HMO"', response: 'Great! But HMOs have limits. A major illness can exhaust your HMO in days. FlexiShield is your backup plan.', emoji: '🏢' },
    { objection: '"I\'m healthy, I don\'t need it"', response: 'That\'s wonderful! But health is unpredictable. 1 in 4 Filipinos face a major health event before 50.', emoji: '💪' },
    { objection: '"Let me think about it"', response: 'Totally fine! But premiums increase every year you wait. Let me send you the comparison so you can review at your own pace.', emoji: '🤔' },
    { objection: '"My spouse needs to decide"', response: 'Smart approach! How about a 15-min call this week so I can answer both your questions?', emoji: '👨‍👩‍👧' },
    { objection: '"Insurance companies don\'t pay"', response: 'Pacific Cross has 75+ years of reliable claims service. We\'ve paid billions in benefits. Your money is safe with us.', emoji: '✅' },
    { objection: '"I\'ll get it when I\'m older"', response: 'Premiums increase with age and pre-existing conditions get excluded. The best time was yesterday, the next best time is today!', emoji: '⏰' },
  ];

  // Objection category labels for beaver badges
  const objectionCategories = ['PRICE', 'COVERAGE', 'RISK', 'TIMING', 'APPROVAL', 'TRUST', 'URGENCY'];

  const navItems: { id: PlaybookView; label: string; emoji: string }[] = [
    { id: 'spiel', label: 'Spiel', emoji: '🗣️' },
    { id: 'objections', label: 'Objections', emoji: '🛡️' },
    { id: 'templates', label: 'Templates', emoji: '📝' },
    { id: 'tracker', label: 'Tracker', emoji: '📊' },
  ];

  return (
    <div className="space-y-6 pb-8">
      <RevealSection>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="section-title">Advisor Playbook</h2>
            <span className="arch-badge arch-badge-owl">Advisor Mode</span>
            <span className="arch-badge arch-badge-eagle arch-badge-sm">Sales</span>
            <span className="arch-badge arch-badge-beaver arch-badge-sm">Tools</span>
          </div>
          <p className="section-subtitle mt-1">Your complete sales toolkit</p>
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

      {view === 'spiel' && (
        <div className="space-y-4" data-archetype="eagle">
          <RevealSection>
            <div className="sticker" style={{ transform: 'rotate(-1deg)' }}>
              <span className="arch-badge arch-badge-eagle arch-badge-sm" style={{ marginRight: '0.5rem' }}>Eagle View</span>
              5-Step Spiel Flow — from discovery to commitment
            </div>
          </RevealSection>
          <RevealSection delay={100}>
            <div className="mt-4">
              <SpielFlow />
            </div>
          </RevealSection>
        </div>
      )}

      {view === 'objections' && (
        <div className="space-y-3" data-archetype="owl">
          <RevealSection>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="panel-header" style={{ border: 'none', margin: 0, padding: 0 }}>Common Objections</h3>
                <span className="arch-badge arch-badge-owl arch-badge-sm">Knowledge Base</span>
              </div>
              <p className="font-mono mt-1" style={{ color: 'var(--text-muted)' }}>Be ready with killer responses</p>
            </div>
          </RevealSection>
          {objections.map((item, i) => (
            <RevealSection key={i} delay={i * 50}>
              <div>
                <button
                  className="brutal-accordion-header w-full"
                  onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-lg">{item.emoji}</span>
                    <span style={{ color: 'var(--accent-red)' }}>{item.objection}</span>
                    <span className="arch-badge arch-badge-beaver arch-badge-sm">{objectionCategories[i]}</span>
                  </span>
                  <span style={{ color: 'var(--accent-yellow)', fontSize: '1.2rem' }}>{openAccordion === i ? '−' : '+'}</span>
                </button>
                <div className={`brutal-accordion-body ${openAccordion === i ? 'open' : ''}`}>
                  <div className="brutal-accordion-body-inner">
                    <span style={{ color: 'var(--accent-yellow)' }}>→ YOUR RESPONSE: </span>
                    {item.response}
                    {i === 0 && (
                      <div className="mt-2 p-3" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
                        <div className="arch-price-beaver-daily">
                          <span className="arch-price-beaver-daily-unit">₱18</span>/day for FlexiShield FS 200
                        </div>
                      </div>
                    )}
                    {i === 1 && (
                      <div className="mt-2 p-3" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
                        <div className="arch-price-beaver">
                          FlexiShield from <span className="arch-price-beaver-annual">₱6,510/yr</span> — only
                          <span className="arch-price-beaver-daily" style={{ marginLeft: '0.25rem' }}>
                            <span className="arch-price-beaver-daily-unit">₱18</span>/day
                          </span>
                          <span className="arch-price-beaver-badge">Best Value</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      )}

      {view === 'templates' && (
        <div className="space-y-4" data-archetype="ant">
          <RevealSection>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="panel-header" style={{ border: 'none', margin: 0, padding: 0 }}>Message Templates</h3>
                <span className="arch-badge arch-badge-ant arch-badge-sm">Community Builder</span>
              </div>
              <p className="font-mono mt-1" style={{ color: 'var(--text-muted)' }}>Copy-paste ready scripts</p>
            </div>
          </RevealSection>
          {socialTemplates.map((tpl) => (
            <RevealSection key={tpl.id}>
              <div className="panel">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="arch-badge arch-badge-sm">{tpl.category}</span>
                    <span className="font-sub text-sm">{tpl.title}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(tpl.content, tpl.id)}
                    className="btn-cta-yellow"
                    style={{ padding: '0.25rem 0.75rem', fontSize: '0.65rem' }}
                  >
                    {copiedId === tpl.id ? '✅ Copied!' : '📋 Copy'}
                  </button>
                </div>
                <div
                  className="font-mono text-xs leading-relaxed whitespace-pre-line p-3"
                  style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
                >
                  {tpl.content}
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      )}

      {view === 'tracker' && (
        <div className="space-y-4" data-archetype="beaver">
          <RevealSection>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="panel-header" style={{ border: 'none', margin: 0, padding: 0 }}>Client Lifecycle</h3>
                <span className="arch-badge arch-badge-beaver arch-badge-sm">Pipeline Builder</span>
              </div>
              <p className="font-mono mt-1" style={{ color: 'var(--text-muted)' }}>Visualize your pipeline</p>
            </div>
          </RevealSection>
          <div className="space-y-2">
            {clientStages.map((stage, i) => (
              <RevealSection key={i} delay={i * 80}>
                <div
                  className="arch-card-beaver-checklist p-3"
                  style={{ background: 'var(--bg-card)', borderLeft: `4px solid ${stage.color}` }}
                >
                  <p className="font-sub text-xs uppercase mb-2">{stage.stage}</p>
                  <div className="flex flex-wrap gap-1">
                    {stage.items.map((item, j) => (
                      <span key={j} className="tag">{item}</span>
                    ))}
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection delay={400}>
            <div className="sticker-accent" style={{ transform: 'rotate(1deg)' }}>
              💡 Track each client through these stages for maximum conversion
            </div>
          </RevealSection>

          <RevealSection delay={500}>
            <div className="panel">
              <h3 className="panel-header">📋 Weekly Activity Tracker</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Conversations', target: '25', explanation: 'Face-to-face or virtual touchpoints' },
                  { label: 'Follow-ups', target: '15', explanation: 'Re-engagement messages or calls' },
                  { label: 'Social Posts', target: '5', explanation: 'Value-driven content shares' },
                  { label: 'New Leads', target: '10', explanation: 'Fresh prospects from any channel' },
                ].map((item, i) => (
                  <div key={i} className="arch-card-owl-stat">
                    <p className="stat-label">{item.label}</p>
                    <p className="arch-card-owl-stat-number font-display text-2xl" style={{ color: 'var(--accent-red)' }}>{item.target}</p>
                    <p className="arch-card-owl-stat-explanation font-mono" style={{ color: 'var(--text-dim)', fontSize: '0.6rem' }}>{item.explanation}</p>
                    <p className="arch-card-owl-stat-source font-mono" style={{ color: 'var(--text-dim)', fontSize: '0.6rem' }}>/ week</p>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      )}
    </div>
  );
}
