'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// ============================================================
// ANIMATED COUNTER
// ============================================================
interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  color?: string;
}

export function AnimatedCounter({
  value,
  duration = 2,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
  color,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const stepTime = (duration * 1000) / 60;
    const steps = (end - start) / 60;

    const timer = setInterval(() => {
      start += steps;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className} style={color ? { color } : undefined}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

// ============================================================
// SCROLL REVEAL
// ============================================================
interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  className?: string;
  once?: boolean;
}

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-50px' });

  const directionMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directionMap[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...directionMap[direction] }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================
// TYPEWRITER EFFECT
// ============================================================
interface TypewriterProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export function Typewriter({ text, speed = 40, className = '', onComplete }: TypewriterProps) {
  const [displayed, setDisplayed] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayed(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else {
      onComplete?.();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <span className={className}>
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

// ============================================================
// STAGGER CONTAINER
// ============================================================
interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({ children, className = '', staggerDelay = 0.1 }: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================
// FLOATING ELEMENT
// ============================================================
interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function FloatingElement({ children, className = '', delay = 0, duration = 3 }: FloatingElementProps) {
  return (
    <motion.div
      animate={{ y: [-10, 10, -10] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================
// PROGRESS BAR ANIMATED
// ============================================================
interface AnimatedProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  label?: string;
  showPercent?: boolean;
  className?: string;
}

export function AnimatedProgressBar({
  value,
  max = 100,
  color = 'bg-brutal-yellow',
  label,
  showPercent = true,
  className = '',
}: AnimatedProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const percent = Math.min((value / max) * 100, 100);

  return (
    <div ref={ref} className={className}>
      {label && (
        <div className="flex justify-between mb-1">
          <span className="font-mono text-xs uppercase">{label}</span>
          {showPercent && <span className="font-brutal text-xs">{Math.round(percent)}%</span>}
        </div>
      )}
      <div className="h-4 brutal-border-2 bg-gray-100">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percent}%` } : { width: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full ${color} border-r-2 border-black`}
        />
      </div>
    </div>
  );
}
