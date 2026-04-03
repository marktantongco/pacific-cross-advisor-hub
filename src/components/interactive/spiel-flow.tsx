'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { spielSteps } from '@/lib/data';

// ============================================================
// SPIEL FLOW - Step by step advisor script
// ============================================================
export function SpielFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [expandedObjection, setExpandedObjection] = useState<number | null>(null);

  const step = spielSteps[currentStep];
  const progress = ((currentStep + 1) / spielSteps.length) * 100;

  return (
    <div>
      {/* Step Progress */}
      <div className="flex gap-1 mb-4">
        {spielSteps.map((s, i) => (
          <button
            key={i}
            onClick={() => setCurrentStep(i)}
            className={`flex-1 h-2 brutal-border-2 transition-all ${
              i === currentStep ? 'bg-brutal-yellow' : i < currentStep ? 'bg-brutal-lime' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Step Title */}
      <div className="brutal-border-3 bg-brutal-yellow p-4 brutal-shadow mb-4 flex items-center gap-3">
        <span className="font-brutal text-2xl">{step.emoji}</span>
        <div>
          <p className="font-brutal text-lg">STEP {step.step}: {step.title}</p>
          <p className="font-mono text-xs opacity-70">{step.description}</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Script */}
          <div className="brutal-border-3 p-4 bg-white brutal-shadow mb-4">
            <p className="font-mono text-xs uppercase mb-2 text-gray-500">💬 YOUR SCRIPT:</p>
            <p className="font-serif text-base sm:text-lg italic leading-relaxed">{step.script}</p>
          </div>

          {/* Tips */}
          <div className="brutal-border-3 p-4 bg-brutal-lime/30 mb-4">
            <p className="font-brutal text-sm mb-2">💡 PRO TIPS:</p>
            <ul className="space-y-2">
              {step.tips.map((tip, i) => (
                <li key={i} className="font-mono text-xs flex gap-2">
                  <span className="text-brutal-pink font-bold">→</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Objection Handling */}
          <div className="brutal-border-3 p-4 bg-white">
            <p className="font-brutal text-sm mb-3">🛡️ OBJECTION HANDLING:</p>
            <div className="space-y-2">
              {step.objections.map((obj, i) => (
                <div key={i}>
                  <button
                    onClick={() => setExpandedObjection(expandedObjection === i ? null : i)}
                    className={`w-full text-left p-3 brutal-border-2 font-mono text-xs transition-colors flex items-center justify-between gap-2 ${
                      expandedObjection === i ? 'bg-brutal-pink/20' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <span>"{obj.objection}"</span>
                    <span className={`text-sm transition-transform ${expandedObjection === i ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  <AnimatePresence>
                    {expandedObjection === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-3 bg-brutal-yellow/20 border-t-2 border-black font-mono text-xs leading-relaxed">
                          <span className="font-bold text-brutal-pink">✅ YOUR RESPONSE: </span>
                          {obj.response}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className={`brutal-btn flex-1 justify-center ${currentStep === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
        >
          ← BACK
        </button>
        <button
          onClick={() => setCurrentStep(Math.min(spielSteps.length - 1, currentStep + 1))}
          disabled={currentStep === spielSteps.length - 1}
          className={`brutal-btn flex-1 justify-center bg-brutal-yellow ${currentStep === spielSteps.length - 1 ? 'opacity-30 cursor-not-allowed' : ''}`}
        >
          NEXT →
        </button>
      </div>
    </div>
  );
}
