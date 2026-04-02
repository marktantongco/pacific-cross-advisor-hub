'use client';

import { useState } from 'react';
import { misconceptions } from '@/lib/data';

// ============================================================
// FLIP CARDS - Myth vs Fact
// ============================================================
export function FlipCards() {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const toggleFlip = (index: number) => {
    setFlippedCards((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {misconceptions.map((item, index) => {
        const isFlipped = flippedCards.has(index);
        return (
          <div
            key={index}
            className="flip-card"
            style={{ height: '220px' }}
            onClick={() => toggleFlip(index)}
          >
            <div className="flip-card-inner" style={{ height: '100%' }}>
              {/* Front - Myth */}
              <div
                className={`flip-card-front brutal-border-3 p-4 flex flex-col items-center justify-center text-center ${
                  isFlipped ? '' : 'bg-brutal-pink'
                }`}
              >
                <span className="text-3xl mb-2">{item.emoji}</span>
                <p className="font-brutal text-xs uppercase mb-2 text-black/60">❌ MYTH</p>
                <p className="font-mono text-sm font-bold leading-snug">"{item.myth}"</p>
                <p className="font-mono text-[10px] mt-3 text-black/50">TAP TO REVEAL FACT →</p>
              </div>

              {/* Back - Fact */}
              <div className="flip-card-back brutal-border-3 p-4 bg-brutal-lime flex flex-col items-center justify-center text-center">
                <span className="text-3xl mb-2">✅</span>
                <p className="font-brutal text-xs uppercase mb-2 text-black/60">FACT</p>
                <p className="font-mono text-sm font-bold leading-snug">{item.fact}</p>
                <p className="font-mono text-[10px] mt-3 text-black/50">TAP TO FLIP BACK →</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
