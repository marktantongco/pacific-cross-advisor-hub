'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { PostingTimesChart, EngagementFunnel } from '@/components/charts/insurance-charts';
import { contentPillars, socialMediaPosts, hashtagStrategy, postingSchedule, contentCalendar } from '@/lib/data';

type SocialView = 'strategy' | 'captions' | 'campaign' | 'hashtags' | 'calendar' | 'trending';

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

export function SocialMediaSection() {
  const [view, setView] = useState<SocialView>('strategy');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = useCallback((text: string, id: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const navItems: { id: SocialView; label: string; emoji: string }[] = [
    { id: 'strategy', label: 'Strategy', emoji: '🎯' },
    { id: 'captions', label: 'Captions', emoji: '📝' },
    { id: 'campaign', label: 'Campaign', emoji: '🚀' },
    { id: 'hashtags', label: 'Hashtags', emoji: '#️⃣' },
    { id: 'calendar', label: 'Calendar', emoji: '📅' },
    { id: 'trending', label: 'Trending', emoji: '🔥' },
  ];

  return (
    <div className="space-y-6 pb-8">
      <RevealSection>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <h2 className="section-title">Social Media<br/>Command Center</h2>
            <p className="section-subtitle mt-1">Dominate social media with ready-to-use content</p>
          </div>
          <span className="arch-badge arch-badge-ant">Social Hub</span>
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

      {/* STRATEGY */}
      {view === 'strategy' && (
        <div className="space-y-4" data-archetype="ant">
          <RevealSection>
            <div>
              <h3 className="panel-header" style={{ border: 'none', margin: 0, padding: 0 }}>Content Pillars</h3>
              <p className="font-mono mt-1" style={{ color: 'var(--text-muted)' }}>The 6 pillars of your social strategy</p>
            </div>
          </RevealSection>

          <div className="grid grid-cols-2 gap-3">
            {contentPillars.map((pillar, i) => (
              <RevealSection key={i} delay={i * 80}>
                <div className="arch-card-ant-benefit hover-card p-4 h-full" style={{ borderLeft: `4px solid ${pillar.color}` }}>
                  <span className="text-2xl">{pillar.emoji}</span>
                  <p className="font-sub text-sm mt-1">{pillar.name}</p>
                  <p className="font-mono mt-1" style={{ color: 'var(--text-muted)', fontSize: '0.6rem' }}>{pillar.description}</p>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection delay={400}>
            <div className="arch-card-ant-social-proof panel">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="panel-header" style={{ color: 'var(--accent-yellow)' }}>💡 Advisor Mindset</h3>
                <span className="arch-badge arch-badge-ant arch-badge-sm">Community</span>
              </div>
              <p className="font-mono text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
                BE AN EDUCATOR, NOT A SELLER! Use analogies that hit different:
              </p>
              <div className="space-y-2">
                {[
                  { title: '📶 Insurance = Wifi for Life', desc: 'You don\'t notice it until it\'s gone.' },
                  { title: '🛡️ Insurance = Armor', desc: 'You hope you never need it, but you\'re glad it\'s there.' },
                  { title: '🏠 Insurance = Heirloom', desc: 'Pass it on. Protect the next generation.' },
                ].map((item, j) => (
                  <div key={j} className="p-3" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
                    <p className="font-sub text-xs" style={{ color: 'var(--accent-yellow)' }}>{item.title}</p>
                    <p className="font-mono" style={{ color: 'var(--text-dim)', fontSize: '0.6rem' }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>

          <RevealSection delay={500}>
            <div className="panel" data-archetype="owl">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="panel-header">📈 Best Posting Times</h3>
                <span className="arch-badge arch-badge-owl arch-badge-sm">Wisdom</span>
              </div>
              <PostingTimesChart />
            </div>
          </RevealSection>

          <RevealSection delay={600}>
            <div className="panel" data-archetype="owl">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="panel-header">🎯 Engagement Funnel</h3>
                <span className="arch-badge arch-badge-owl arch-badge-sm">Wisdom</span>
              </div>
              <EngagementFunnel />
            </div>
          </RevealSection>
        </div>
      )}

      {/* CAPTIONS */}
      {view === 'captions' && (
        <div className="space-y-4" data-archetype="ant">
          <RevealSection>
            <div>
              <h3 className="panel-header" style={{ border: 'none', margin: 0, padding: 0 }}>Ready-to-Use Captions</h3>
              <p className="font-mono mt-1" style={{ color: 'var(--text-muted)' }}>Facebook & Instagram posts you can use NOW</p>
            </div>
          </RevealSection>

          <RevealSection>
            <p className="font-sub text-sm" style={{ color: 'var(--accent-red)' }}>📘 Facebook Posts</p>
          </RevealSection>
          {socialMediaPosts.facebook.map((post, i) => (
            <RevealSection key={`fb-${i}`} delay={i * 50}>
              <div className="panel">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="font-sub text-sm">{post.title}</span>
                    <span className="font-mono ml-2" style={{ color: 'var(--text-dim)', fontSize: '0.6rem' }}>{post.day} {post.bestTime}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(post.content, `fb-${i}`)}
                    className="btn-cta-yellow"
                    style={{ padding: '0.25rem 0.75rem', fontSize: '0.65rem' }}
                  >
                    {copiedId === `fb-${i}` ? '✅ Copied!' : '📋 Copy'}
                  </button>
                </div>
                <div className="font-mono text-xs leading-relaxed whitespace-pre-line p-3" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
                  {post.content}
                </div>
              </div>
            </RevealSection>
          ))}

          <RevealSection>
            <p className="font-sub text-sm mt-4" style={{ color: 'var(--accent-red)' }}>📸 Instagram Posts</p>
          </RevealSection>
          {socialMediaPosts.instagram.map((post, i) => (
            <RevealSection key={`ig-${i}`} delay={i * 50}>
              <div className="panel">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="font-sub text-sm">{post.title}</span>
                    <span className="font-mono ml-2" style={{ color: 'var(--text-dim)', fontSize: '0.6rem' }}>{post.day} {post.bestTime}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(post.content, `ig-${i}`)}
                    className="btn-cta-yellow"
                    style={{ padding: '0.25rem 0.75rem', fontSize: '0.65rem' }}
                  >
                    {copiedId === `ig-${i}` ? '✅ Copied!' : '📋 Copy'}
                  </button>
                </div>
                <div className="font-mono text-xs leading-relaxed whitespace-pre-line p-3" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
                  {post.content}
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      )}

      {/* CAMPAIGN */}
      {view === 'campaign' && (
        <div className="space-y-4" data-archetype="ant">
          <RevealSection>
            <div>
              <h3 className="panel-header" style={{ border: 'none', margin: 0, padding: 0 }}>Campaign Templates</h3>
              <p className="font-mono mt-1" style={{ color: 'var(--text-muted)' }}>Pre-written posts from InsuranceHub</p>
            </div>
          </RevealSection>

          <RevealSection>
            <div className="arch-card-ant-social-proof p-5 text-center" style={{ background: 'var(--bg)', border: '2px solid var(--accent-red)' }}>
              <p className="font-display text-xl" style={{ color: 'var(--accent-yellow)' }}>CHOOSE YOUR ARMOR</p>
              <p className="font-mono text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Campaign-ready post templates for maximum engagement</p>
            </div>
          </RevealSection>

          {socialMediaPosts.campaign.map((post, i) => (
            <RevealSection key={`camp-${i}`} delay={i * 50}>
              <div className="panel" style={{ borderLeft: i % 2 === 0 ? '4px solid var(--accent-red)' : '4px solid var(--accent-yellow)' }}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="font-sub text-sm">{post.title}</span>
                    <span className="font-mono ml-2" style={{ color: 'var(--text-dim)', fontSize: '0.6rem' }}>{post.day} {post.bestTime}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(post.content, `camp-${i}`)}
                    className="btn-cta-yellow"
                    style={{ padding: '0.25rem 0.75rem', fontSize: '0.65rem' }}
                  >
                    {copiedId === `camp-${i}` ? '✅ Copied!' : '📋 Copy'}
                  </button>
                </div>
                <div className="font-mono text-xs leading-relaxed whitespace-pre-line p-3" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
                  {post.content}
                </div>
              </div>
            </RevealSection>
          ))}

          <RevealSection delay={300}>
            <div className="sticker" style={{ transform: 'rotate(-1deg)' }}>
              💡 Mix campaign posts with regular content. Use 1 campaign post per 3 regular posts.
            </div>
          </RevealSection>
        </div>
      )}

      {/* HASHTAGS */}
      {view === 'hashtags' && (
        <div className="space-y-4" data-archetype="ant">
          <RevealSection>
            <div>
              <h3 className="panel-header" style={{ border: 'none', margin: 0, padding: 0 }}>Hashtag Strategy</h3>
              <p className="font-mono mt-1" style={{ color: 'var(--text-muted)' }}>Maximize your reach with targeted hashtags</p>
            </div>
          </RevealSection>

          {hashtagStrategy.map((cat, i) => (
            <RevealSection key={i}>
              <div className="hover-card p-4">
                <p className="font-sub text-sm mb-3">{cat.category}</p>
                <div className="flex flex-wrap gap-2">
                  {cat.tags.map((tag, j) => (
                    <button
                      key={j}
                      onClick={() => copyToClipboard(tag, `tag-${i}-${j}`)}
                      className="tag tag-yellow"
                      style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                    >
                      {copiedId === `tag-${i}-${j}` ? '✅ Copied!' : tag}
                    </button>
                  ))}
                </div>
              </div>
            </RevealSection>
          ))}

          <RevealSection>
            <div className="sticker" style={{ transform: 'rotate(-1deg)' }}>
              💡 Mix 3-4 hashtags from different categories per post for maximum reach
            </div>
          </RevealSection>

          <RevealSection>
            <div className="panel" style={{ border: '2px solid var(--accent-yellow)' }}>
              <h3 className="panel-header" style={{ color: 'var(--accent-yellow)' }}>📋 Quick Copy — All Tags</h3>
              <p className="font-mono text-xs leading-relaxed mb-3" style={{ color: 'var(--text-muted)' }}>
                {hashtagStrategy.flatMap(c => c.tags).join(' ')}
              </p>
              <button
                onClick={() => copyToClipboard(hashtagStrategy.flatMap(c => c.tags).join(' '), 'all-tags')}
                className="btn-cta w-full justify-center"
              >
                {copiedId === 'all-tags' ? '✅ Copied All!' : '📋 COPY ALL HASHTAGS'}
              </button>
            </div>
          </RevealSection>
        </div>
      )}

      {/* CALENDAR */}
      {view === 'calendar' && (
        <div className="space-y-4" data-archetype="ant">
          <RevealSection>
            <div>
              <h3 className="panel-header" style={{ border: 'none', margin: 0, padding: 0 }}>Content Calendar</h3>
              <p className="font-mono mt-1" style={{ color: 'var(--text-muted)' }}>Your weekly posting schedule</p>
            </div>
          </RevealSection>

          <RevealSection>
            <div className="overflow-x-auto" style={{ border: '2px solid var(--border)', scrollbarWidth: 'thin' }}>
              <table className="w-full" style={{ minWidth: '500px' }}>
                <thead>
                  <tr>
                    {['Day', 'Time', 'Content', 'Platform', 'Pillar'].map((h) => (
                      <th key={h} className="p-2 text-left font-sub text-xs uppercase tracking-wider" style={{ background: 'var(--accent-red)', color: 'var(--bg)', border: '1px solid var(--accent-red)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {postingSchedule.map((item, i) => (
                    <tr key={i}>
                      {[
                        item.day, item.time, item.type, item.platform, item.pillar
                      ].map((cell, j) => (
                        <td key={j} className="font-mono p-2" style={{ border: '1px solid var(--border)', fontSize: '0.65rem', background: i % 2 === 0 ? 'var(--bg-card)' : 'var(--bg-panel)' }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </RevealSection>

          <RevealSection>
            <p className="font-sub text-sm mt-4">📆 Monthly Content Ideas</p>
          </RevealSection>
          {contentCalendar.map((week, i) => (
            <RevealSection key={i} delay={i * 80}>
              <div className="panel">
                <p className="font-sub text-xs mb-3">Week {week.week}</p>
                <div className="grid grid-cols-2 gap-1">
                  {Object.entries(week).filter(([k]) => k !== 'week').map(([day, content], j) => (
                    <div key={j} className="p-2" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
                      <p className="font-mono uppercase" style={{ color: 'var(--text-dim)', fontSize: '0.55rem' }}>{day}</p>
                      <p className="font-mono" style={{ fontSize: '0.6rem' }}>{content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      )}

      {/* TRENDING */}
      {view === 'trending' && (
        <div className="space-y-3" data-archetype="ant">
          <RevealSection>
            <div>
              <h3 className="panel-header" style={{ border: 'none', margin: 0, padding: 0 }}>Trending Now</h3>
              <p className="font-mono mt-1" style={{ color: 'var(--text-muted)' }}>What&apos;s hot in Philippine social media</p>
            </div>
          </RevealSection>

          {[
            { trend: 'Universal Health Care discussions', opportunity: 'Position insurance as the missing piece in UHC', emoji: '🏥', heat: 5 },
            { trend: 'OFW struggles abroad', opportunity: "Highlight Blue Royale's worldwide coverage", emoji: '✈️', heat: 5 },
            { trend: 'Rising medical costs memes', opportunity: 'Use humor to educate about FlexiShield protection', emoji: '😂', heat: 4 },
            { trend: 'Financial literacy content', opportunity: 'Educational reels and carousels about insurance basics', emoji: '📚', heat: 4 },
            { trend: 'Inflation worries', opportunity: 'Show how insurance protects against medical inflation (10-12%/yr)', emoji: '📈', heat: 3 },
            { trend: 'Family content', opportunity: 'Real stories of families protected by insurance', emoji: '👨‍👩‍👧', heat: 4 },
            { trend: 'Side hustle culture', opportunity: 'Insurance advisor as a side hustle with real income', emoji: '💰', heat: 3 },
          ].map((item, i) => (
            <RevealSection key={i} delay={i * 50}>
              <div className="arch-card-ant-social-proof hover-card p-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{item.emoji}</span>
                  <div className="flex-1">
                    <p className="font-sub text-sm">{item.trend}</p>
                    <p className="font-mono text-xs mt-1" style={{ color: 'var(--text-muted)' }}>💡 {item.opportunity}</p>
                    <div className="flex gap-1 mt-2">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <span
                          key={j}
                          className="inline-block w-3 h-3"
                          style={{
                            border: '1px solid var(--border)',
                            background: j < item.heat ? 'var(--accent-red)' : 'var(--bg-elevated)',
                          }}
                        />
                      ))}
                      <span className="font-mono ml-1" style={{ fontSize: '0.55rem', color: 'var(--text-dim)' }}>Opportunity Score</span>
                    </div>
                  </div>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      )}
    </div>
  );
}
