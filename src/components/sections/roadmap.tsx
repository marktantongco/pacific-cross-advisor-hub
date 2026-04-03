'use client';

import { useState, useEffect, useRef } from 'react';
import { IncomeProjectionChart } from '@/components/charts/insurance-charts';
import { thirtySixtyNinety, incomeProjection } from '@/lib/data';

type RoadmapView = 'plan' | 'income' | 'funnel' | 'planner';

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

export function RoadmapSection() {
  const [view, setView] = useState<RoadmapView>('plan');
  const [checkedGoals, setCheckedGoals] = useState<Set<string>>(new Set());
  const [plannerTasks] = useState([
    { day: 'Monday', tasks: ['Follow up with 5 leads', 'Post on Facebook', 'Study product materials'] },
    { day: 'Tuesday', tasks: ['Call 10 new prospects', 'Create Instagram content', 'Team meeting'] },
    { day: 'Wednesday', tasks: ['Client meetings (3)', 'Send proposals', 'Engage in FB groups'] },
    { day: 'Thursday', tasks: ['Follow-up calls (5)', 'Post myth-busting content', 'Review pipeline'] },
    { day: 'Friday', tasks: ['Close sales', 'Weekly review', 'Plan next week'] },
    { day: 'Saturday', tasks: ['Social media batch', 'Referral outreach', 'OFW market research'] },
    { day: 'Sunday', tasks: ['Rest & recharge', 'Content brainstorm', 'Family time'] },
  ]);

  const toggleGoal = (phaseKey: string, goalIndex: number) => {
    const key = `${phaseKey}-${goalIndex}`;
    setCheckedGoals((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const togglePlannerTask = (dayIndex: number, taskIndex: number) => {
    const key = `planner-${dayIndex}-${taskIndex}`;
    setCheckedGoals((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const navItems: { id: RoadmapView; label: string; emoji: string }[] = [
    { id: 'plan', label: '30-60-90', emoji: '🗓️' },
    { id: 'income', label: 'Income', emoji: '💰' },
    { id: 'funnel', label: 'Funnel', emoji: '🎯' },
    { id: 'planner', label: 'Planner', emoji: '📋' },
  ];

  const totalGoals = Object.keys(thirtySixtyNinety).length * 7;
  const completedGoals = checkedGoals.size;
  const progressPct = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;

  const phases = [
    { key: 'phase1', data: thirtySixtyNinety.phase1, label: 'Foundation phase', milestoneColor: 'var(--accent-red)' },
    { key: 'phase2', data: thirtySixtyNinety.phase2, label: 'Growth phase', milestoneColor: 'var(--accent-yellow)' },
    { key: 'phase3', data: thirtySixtyNinety.phase3, label: 'Scale phase', milestoneColor: 'var(--accent-red)' },
  ];

  return (
    <div className="space-y-6 pb-8">
      <RevealSection>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <h2 className="section-title">Roadmap &<br/>Goals</h2>
            <p className="section-subtitle mt-1">Your path to success as a Pacific Cross advisor</p>
          </div>
          <span className="arch-badge arch-badge-eagle">Roadmap</span>
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

      {view === 'plan' && (
        <div className="space-y-6" data-archetype="eagle">
          <RevealSection>
            <div className="panel" style={{ border: '2px solid var(--accent-yellow)' }}>
              <div className="flex items-center justify-between mb-2">
                <p className="font-sub text-sm" style={{ color: 'var(--accent-yellow)' }}>Overall Progress</p>
                <p className="font-display text-xl" style={{ color: 'var(--accent-yellow)' }}>{completedGoals}/{totalGoals}</p>
              </div>
              <div className="w-full h-3" style={{ background: 'var(--bg-elevated)' }}>
                <div
                  className="h-full transition-all duration-500"
                  style={{ width: `${progressPct}%`, background: 'var(--accent-yellow)' }}
                />
              </div>
              <p className="font-mono text-xs mt-1" style={{ color: 'var(--text-dim)' }}>{Math.round(progressPct)}% complete</p>
            </div>
          </RevealSection>

          {phases.map((phase, pi) => (
            <RevealSection key={phase.key} delay={pi * 150}>
              <div className="arch-card-eagle-feature panel">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{phase.data.emoji}</span>
                  <div className="flex items-center gap-2 flex-1">
                    <p className="font-sub text-sm" style={{ color: phase.data.color }}>{phase.data.title}</p>
                    <span className="arch-badge arch-badge-beaver arch-badge-sm">{phase.label}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  {phase.data.goals.map((goal, i) => {
                    const key = `${phase.key}-${i}`;
                    const checked = checkedGoals.has(key);
                    return (
                      <button
                        key={i}
                        onClick={() => toggleGoal(phase.key, i)}
                        className="w-full flex items-center gap-2 p-2 text-left font-mono text-xs transition-colors"
                        style={{
                          background: checked ? 'var(--accent-red-dim)' : 'var(--bg-elevated)',
                          border: '1px solid var(--border)',
                          textDecoration: checked ? 'line-through' : 'none',
                          opacity: checked ? 0.6 : 1,
                        }}
                      >
                        <span
                          className="w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0"
                          style={{
                            border: '1px solid var(--border)',
                            background: checked ? 'var(--accent-red)' : 'var(--bg-card)',
                            color: checked ? 'var(--bg)' : 'transparent',
                          }}
                        >
                          {checked ? '✓' : ''}
                        </span>
                        {goal.text}
                      </button>
                    );
                  })}
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  {phase.data.milestones.map((m, i) => (
                    <span key={i} className="tag" style={{ borderColor: phase.milestoneColor, color: phase.milestoneColor }}>🎯 {m}</span>
                  ))}
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      )}

      {view === 'income' && (
        <div className="space-y-4" data-archetype="eagle">
          <RevealSection>
            <div>
              <h3 className="panel-header" style={{ border: 'none', margin: 0, padding: 0 }}>Income Projection</h3>
              <p className="font-mono mt-1" style={{ color: 'var(--text-muted)' }}>Your earning potential as a Pacific Cross advisor</p>
            </div>
          </RevealSection>

          <RevealSection delay={100}>
            <div className="panel" style={{ border: '2px solid var(--accent-yellow)' }}>
              <div className="text-center mb-4">
                <p className="font-sub text-sm" style={{ color: 'var(--accent-yellow)' }}>12-MONTH PROJECTION</p>
                <p className="font-mono text-xs" style={{ color: 'var(--text-dim)' }}>Based on consistent effort & growing network</p>
              </div>
              <IncomeProjectionChart data={incomeProjection} />
              <div className="flex justify-center gap-4 mt-2">
                <span className="flex items-center gap-1 font-mono text-xs" style={{ color: 'var(--text-dim)' }}>
                  <span className="inline-block w-3 h-3" style={{ background: '#FF6B9D', border: '1px solid var(--border)' }} /> Monthly
                </span>
                <span className="flex items-center gap-1 font-mono text-xs" style={{ color: 'var(--text-dim)' }}>
                  <span className="inline-block w-3 h-3" style={{ background: '#BFFF00', border: '1px solid var(--border)' }} /> Cumulative
                </span>
              </div>
            </div>
          </RevealSection>

          <RevealSection delay={200}>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Month 1 Income', value: '₱15K', accent: 'var(--accent-red)', explanation: 'Starting commission from initial sales', source: '15-25% first year commission' },
                { label: 'Month 6 Income', value: '₱55K', accent: 'var(--accent-yellow)', explanation: 'Growing client base + renewals', source: 'Consistent effort projection' },
                { label: 'Month 12 Income', value: '₱100K', accent: 'var(--accent-red)', explanation: 'Top advisor earning level', source: 'Industry benchmark for top performers' },
                { label: 'Year 1 Total', value: '₱750K', accent: 'var(--accent-yellow)', explanation: 'Cumulative first year earnings', source: 'Consistent monthly growth model' },
              ].map((stat, i) => (
                <div key={i} className="arch-card-owl-stat panel text-center" style={{ padding: '1rem' }}>
                  <p className="stat-label">{stat.label}</p>
                  <p className="arch-card-owl-stat-number font-display text-2xl mt-1" style={{ color: stat.accent }}>{stat.value}</p>
                  <p className="arch-card-owl-stat-explanation font-mono mt-1" style={{ color: 'var(--text-muted)', fontSize: '0.55rem' }}>{stat.explanation}</p>
                  <p className="arch-card-owl-stat-source font-mono" style={{ color: 'var(--text-dim)', fontSize: '0.5rem' }}>{stat.source}</p>
                </div>
              ))}
            </div>
          </RevealSection>

          <RevealSection delay={300}>
            <div className="sticker" style={{ transform: 'rotate(-2deg)' }}>
              💡 Commission structure: 15-25% first year + renewals. Top advisors earn ₱100K+/month!
            </div>
          </RevealSection>
        </div>
      )}

      {view === 'funnel' && (
        <div className="space-y-4" data-archetype="eagle">
          <RevealSection>
            <div>
              <h3 className="panel-header" style={{ border: 'none', margin: 0, padding: 0 }}>Client Acquisition Funnel</h3>
              <p className="font-mono mt-1" style={{ color: 'var(--text-muted)' }}>From prospect to policyholder</p>
            </div>
          </RevealSection>

          {[
            { stage: 'AWARENESS', count: '100', desc: 'Social media reach, referrals, events', color: 'var(--accent-yellow)', emoji: '📢' },
            { stage: 'INTEREST', count: '50', desc: 'DMs, comments, profile views', color: 'var(--accent-red)', emoji: '👀' },
            { stage: 'CONVERSATION', count: '25', desc: 'Actual conversations started', color: 'var(--accent-yellow)', emoji: '💬' },
            { stage: 'PROPOSAL', count: '10', desc: 'Pricing presented, objections handled', color: 'var(--accent-red)', emoji: '📊' },
            { stage: 'CLOSED', count: '5', desc: 'Enrollment complete! 🎉', color: 'var(--text)', emoji: '✅' },
          ].map((step, i) => (
            <RevealSection key={i} delay={i * 100}>
              <div
                className="p-4"
                style={{
                  marginLeft: `${i * 16}px`,
                  background: i === 4 ? 'var(--bg)' : 'var(--bg-card)',
                  border: i === 4 ? '2px solid var(--accent-red)' : '1px solid var(--border)',
                  borderLeft: `4px solid ${step.color}`,
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-sub text-sm flex items-center gap-2">
                    {step.emoji} {step.stage}
                  </span>
                  <span className="font-display text-xl" style={{ color: step.color }}>{step.count}</span>
                </div>
                <p className="font-mono text-xs" style={{ color: 'var(--text-dim)' }}>{step.desc}</p>
              </div>
            </RevealSection>
          ))}

          <RevealSection delay={500}>
            <div className="sticker-accent" style={{ transform: 'rotate(1deg)' }}>
              💡 5% conversion from awareness to closed is the industry average. Top advisors hit 8-10%!
            </div>
          </RevealSection>
        </div>
      )}

      {view === 'planner' && (
        <div className="space-y-4" data-archetype="eagle">
          <RevealSection>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <h3 className="panel-header" style={{ border: 'none', margin: 0, padding: 0 }}>Weekly Planner</h3>
                <p className="font-mono mt-1" style={{ color: 'var(--text-muted)' }}>Plan your week for maximum impact</p>
              </div>
              <span className="arch-badge arch-badge-beaver arch-badge-sm">Practical</span>
            </div>
          </RevealSection>

          {plannerTasks.map((day, dayIndex) => (
            <RevealSection key={dayIndex} delay={dayIndex * 50}>
              <div className="arch-card-beaver-checklist panel">
                <p className="font-sub text-sm mb-2">{day.day}</p>
                <div className="space-y-1">
                  {day.tasks.map((task, taskIndex) => {
                    const key = `planner-${dayIndex}-${taskIndex}`;
                    const checked = checkedGoals.has(key);
                    return (
                      <button
                        key={taskIndex}
                        onClick={() => togglePlannerTask(dayIndex, taskIndex)}
                        className="w-full flex items-center gap-2 p-2 text-left font-mono text-xs transition-colors"
                        style={{
                          background: checked ? 'var(--accent-red-dim)' : 'var(--bg-elevated)',
                          border: '1px solid var(--border)',
                          textDecoration: checked ? 'line-through' : 'none',
                          opacity: checked ? 0.6 : 1,
                        }}
                      >
                        <span
                          className="w-4 h-4 flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                          style={{
                            border: '1px solid var(--border)',
                            background: checked ? 'var(--accent-red)' : 'var(--bg-card)',
                            color: checked ? 'var(--bg)' : 'transparent',
                          }}
                        >
                          {checked ? '✓' : ''}
                        </span>
                        {task}
                      </button>
                    );
                  })}
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      )}
    </div>
  );
}
