'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { TABS, type TabId } from '@/lib/data';
import { ModeBadge } from '@/components/brutalist-ui';

// ============================================================
// BOTTOM TAB BAR (Mobile-first PWA Navigation)
// ============================================================
interface TabBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export function TabBar({ activeTab, onTabChange }: TabBarProps) {
  const [showAll, setShowAll] = useState(false);

  // Show 5 tabs on mobile, all on expanded/desktop
  const visibleTabs = showAll ? TABS : TABS.slice(0, 5);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white brutal-border-t-3">
      <div className="max-w-lg mx-auto">
        {/* Main tabs */}
        <div className="flex items-center">
          {visibleTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2 px-1 transition-all relative ${
                activeTab === tab.id
                  ? 'text-brand-black'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-brutal-gold border-x-2 border-b-2 border-brand-black"
                />
              )}
              <span className="text-lg">{tab.icon}</span>
              <span className={`font-brutal text-[9px] uppercase tracking-wider leading-tight text-center ${
                activeTab === tab.id ? 'text-brand-black font-black' : 'font-bold'
              }`}>
                {tab.label}
              </span>
            </button>
          ))}

          {/* More button */}
          {!showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="flex-1 flex flex-col items-center gap-0.5 py-2 px-1 text-gray-400 hover:text-gray-600"
            >
              <span className="text-lg">⋯</span>
              <span className="font-brutal text-[9px] uppercase tracking-wider font-bold">More</span>
            </button>
          )}
        </div>

        {/* Expanded tabs */}
        <AnimatePresence>
          {showAll && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap justify-center gap-1 p-3 bg-gray-50 border-t-2 border-brand-black">
                {TABS.slice(5).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      onTabChange(tab.id);
                      setShowAll(false);
                    }}
                    className={`px-3 py-1.5 brutal-border-2 rounded-lg font-brutal text-xs uppercase transition-all ${
                      activeTab === tab.id
                        ? 'bg-brutal-gold brutal-shadow font-black'
                        : 'bg-white hover:bg-gray-100'
                    }`}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
                <button
                  onClick={() => setShowAll(false)}
                  className="px-3 py-1.5 brutal-border-2 bg-gray-200 rounded-lg font-brutal text-xs uppercase hover:bg-gray-300"
                >
                  ✕ Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Safe area padding for iOS */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </div>
  );
}

// ============================================================
// TOP HEADER BAR — INSURANCEHUB BRANDING
// ============================================================
interface TopBarProps {
  activeTab: TabId;
}

export function TopBar({ activeTab }: TopBarProps) {
  const currentTab = TABS.find((t) => t.id === activeTab);
  return (
    <header className="sticky top-0 z-40 bg-white brutal-border-b-3">
      <div className="max-w-lg mx-auto px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-brutal text-base tracking-tight text-brand-black">INSURANCEHUB</span>
          <span className="hidden sm:inline font-mono text-[9px] text-gray-400 uppercase tracking-wider border-l border-gray-300 pl-2 ml-1">
            No Barriers. No Boring Stuff.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ModeBadge mode="advisor" />
          <div className="flex items-center gap-1 ml-1">
            <span className="text-base">{currentTab?.icon}</span>
            <span className="font-brutal text-xs uppercase tracking-wider font-black">
              {currentTab?.label}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
