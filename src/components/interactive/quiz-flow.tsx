'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quizQuestions } from '@/lib/data';

// ============================================================
// PRODUCT RECOMMENDATION QUIZ
// ============================================================
export function QuizFlow() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const getResult = () => {
    const workAnswer = answers[0];
    const worryAnswer = answers[2];
    const budgetAnswer = answers[3];

    if (workAnswer === 'ofw') return { product: 'Blue Royale Gold', emoji: '💎', reason: 'As an OFW, Blue Royale Gold gives you comprehensive worldwide coverage with the freedom to choose any medical provider. Perfect for protecting both you and your family.' };
    if (workAnswer === 'retired') return { product: 'Blue Royale Silver', emoji: '💎', reason: 'In retirement, comprehensive medical coverage is essential. Blue Royale has no upper age limit and provides worldwide emergency assistance 24/7.' };
    if (workAnswer === 'employed-hmo') return { product: 'FlexiShield Plus', emoji: '🛡️', reason: 'FlexiShield Plus acts as your safety net when HMO limits are exhausted. PHP 500K additional coverage at an affordable price — the perfect complement to your company HMO.' };
    if (workAnswer === 'freelance') return { product: 'FlexiShield Premium', emoji: '🛡️', reason: 'As a freelancer, you need reliable coverage without employer benefits. FlexiShield Premium gives you PHP 2M coverage including COVID-19 protection.' };
    if (worryAnswer === 'international') return { product: 'Blue Royale', emoji: '💎', reason: 'For international healthcare access, Blue Royale is unmatched. Choose any provider worldwide with coverage up to USD 2M.' };
    if (worryAnswer === 'maternity') return { product: 'Blue Royale Gold', emoji: '💎', reason: 'Blue Royale Gold includes comprehensive maternity and childbirth coverage — rare in the Philippine market.' };
    if (budgetAnswer === 'premium') return { product: 'Blue Royale Platinum', emoji: '👑', reason: 'With a premium budget, Blue Royale Platinum maximizes your protection — USD 2M coverage with dental, vision, and personal accident benefits.' };
    if (budgetAnswer === 'budget') return { product: 'FlexiShield Basic', emoji: '🛡️', reason: 'FlexiShield Basic is the perfect entry point — affordable premiums with hospitalization, daily income, and critical care coverage.' };
    return { product: 'FlexiShield Plus', emoji: '🛡️', reason: 'FlexiShield Plus is our most popular choice — great coverage at a great price. It enhances your existing healthcare protection.' };
  };

  const restart = () => {
    setCurrentQ(0);
    setAnswers([]);
    setShowResult(false);
  };

  const result = getResult();
  const question = quizQuestions[currentQ];
  const progress = ((currentQ + 1) / quizQuestions.length) * 100;

  return (
    <div className="relative">
      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -20, x: Math.random() * 400, opacity: 1 }}
              animate={{ y: 800, opacity: 0, rotate: Math.random() * 720 }}
              transition={{ duration: 2 + Math.random() * 2, delay: Math.random() * 0.5 }}
              className="absolute w-3 h-3 brutal-border-2"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ['#FF6B9D', '#BFFF00', '#FFFF00', '#54A0FF', '#FF9F43'][Math.floor(Math.random() * 5)],
              }}
            />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            {/* Progress */}
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="font-mono text-xs">Question {currentQ + 1} of {quizQuestions.length}</span>
                <span className="font-brutal text-xs">{Math.round(progress)}%</span>
              </div>
              <div className="h-3 brutal-border-2 bg-gray-100">
                <div
                  className="h-full bg-brutal-yellow transition-all duration-500 border-r-2 border-black"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="brutal-border-3 p-5 bg-white brutal-shadow mb-4">
              <p className="font-brutal text-lg sm:text-xl">{question.question}</p>
            </div>

            {/* Options */}
            <div className="grid gap-2">
              {question.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className="brutal-border-3 p-3 text-left flex items-center gap-3 bg-white brutal-shadow-hover transition-all"
                >
                  <span className="text-xl">{option.emoji}</span>
                  <span className="font-mono text-sm">{option.text}</span>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="brutal-border-4 p-6 bg-brutal-yellow brutal-shadow-lg mb-4">
              <span className="text-5xl mb-3 block">{result.emoji}</span>
              <h3 className="font-brutal text-xl sm:text-2xl mb-2">WE RECOMMEND:</h3>
              <p className="font-brutal text-2xl sm:text-3xl">{result.product}</p>
            </div>

            <div className="brutal-border-3 p-5 bg-white brutal-shadow mb-4">
              <p className="font-mono text-sm leading-relaxed">{result.reason}</p>
            </div>

            <button
              onClick={restart}
              className="brutal-btn bg-black text-white w-full justify-center"
            >
              🔄 RETAKE QUIZ
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
