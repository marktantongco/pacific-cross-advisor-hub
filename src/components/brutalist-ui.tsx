'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import React from 'react';

// ============================================================
// BRUTALIST CARD — Slightly rounded
// ============================================================
interface BrutalCardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'yellow' | 'pink' | 'lime' | 'dark' | 'glass' | 'gradient' | 'blue';
  shadow?: 'default' | 'pink' | 'yellow' | 'lime' | 'blue' | 'none';
  pin?: boolean;
  tape?: boolean;
  hover?: boolean;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<string, string> = {
  default: 'bg-white',
  yellow: 'bg-brutal-yellow',
  pink: 'bg-brutal-pink',
  lime: 'bg-brutal-lime',
  dark: 'bg-brand-black text-white',
  glass: 'brutal-glass',
  gradient: 'hover-gradient',
  blue: 'bg-brutal-blue text-white',
};

const shadowStyles: Record<string, string> = {
  default: 'brutal-shadow',
  pink: 'brutal-shadow-pink',
  yellow: 'brutal-shadow-yellow',
  lime: 'brutal-shadow-lime',
  blue: 'brutal-shadow-blue',
  none: '',
};

export function BrutalCard({
  variant = 'default',
  shadow = 'default',
  pin = false,
  tape = false,
  hover = false,
  children,
  className = '',
  ...props
}: BrutalCardProps) {
  return (
    <motion.div
      className={`
        brutal-border-3 p-4 sm:p-6 rounded-lg
        ${variantStyles[variant] || ''}
        ${shadowStyles[shadow] || ''}
        ${pin ? 'pin mt-4' : ''}
        ${tape ? 'tape-corner-tl mt-4' : ''}
        ${hover ? 'brutal-shadow-hover' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================================
// BRUTAL BUTTON
// ============================================================
interface BrutalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'yellow' | 'pink' | 'lime' | 'dark' | 'outline' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const btnVariants: Record<string, string> = {
  default: 'bg-white text-brand-black',
  yellow: 'bg-brutal-yellow text-brand-black',
  pink: 'bg-brutal-pink text-white',
  lime: 'bg-brutal-lime text-brand-black',
  dark: 'bg-brand-black text-white',
  outline: 'bg-transparent text-brand-black',
  gradient: 'hover-gradient text-brand-black',
};

const btnSizes: Record<string, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-8 py-4 text-base',
};

export function BrutalButton({
  variant = 'default',
  size = 'md',
  children,
  className = '',
  ...props
}: BrutalButtonProps) {
  return (
    <button
      className={`
        brutal-btn ${btnVariants[variant]} ${btnSizes[size]}
        font-brutal uppercase tracking-wider
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

// ============================================================
// BANNER BUTTON — Large, full-width, rounded
// ============================================================
interface BannerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'yellow' | 'dark' | 'pink' | 'lime' | 'blue';
  children: React.ReactNode;
  icon?: string;
}

const bannerVariants: Record<string, string> = {
  default: 'bg-white text-brand-black',
  yellow: 'bg-brutal-yellow text-brand-black',
  dark: 'bg-brand-black text-white',
  pink: 'bg-brutal-pink text-white',
  lime: 'bg-brutal-lime text-brand-black',
  blue: 'bg-brutal-blue text-white',
};

export function BannerButton({
  variant = 'default',
  children,
  icon,
  className = '',
  ...props
}: BannerButtonProps) {
  return (
    <button
      className={`
        banner-btn ${bannerVariants[variant]}
        font-brutal text-sm sm:text-base
        ${className}
      `}
      {...props}
    >
      {icon && <span className="text-xl">{icon}</span>}
      {children}
    </button>
  );
}

// ============================================================
// MODE BADGE — Advisor / Client
// ============================================================
interface ModeBadgeProps {
  mode: 'advisor' | 'client';
  className?: string;
}

export function ModeBadge({ mode, className = '' }: ModeBadgeProps) {
  if (mode === 'advisor') {
    return (
      <span className={`mode-badge mode-badge-advisor ${className}`}>
        ★ ADVISOR MODE
      </span>
    );
  }
  return (
    <span className={`mode-badge mode-badge-client ${className}`}>
      🤝 CLIENT MODE
    </span>
  );
}

// ============================================================
// PRODUCT CARD — Colored left border
// ============================================================
interface ProductCardProps extends HTMLMotionProps<'div'> {
  product: 'flexishield' | 'blueroyale';
  shadow?: 'default' | 'yellow' | 'blue' | 'pink' | 'none';
  children: React.ReactNode;
  className?: string;
}

const productCardShadow: Record<string, string> = {
  default: 'brutal-shadow',
  yellow: 'brutal-shadow-yellow',
  blue: 'brutal-shadow-blue',
  pink: 'brutal-shadow-pink',
  none: '',
};

export function ProductCard({
  product,
  shadow = 'default',
  children,
  className = '',
  ...props
}: ProductCardProps) {
  const borderColor = product === 'flexishield' ? '#FFB800' : '#00BFFF';
  return (
    <motion.div
      className={`
        product-card ${product === 'flexishield' ? 'product-card-flexishield' : 'product-card-blueroyale'}
        brutal-border-3 p-4 sm:p-6 bg-white rounded-lg
        ${productCardShadow[shadow] || ''}
        ${className}
      `}
      style={{ borderLeftWidth: '6px', borderLeftColor: borderColor }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================================
// BRUTAL BADGE / STICKER
// ============================================================
interface BrutalBadgeProps {
  text: string;
  color?: string;
  rotation?: string;
  className?: string;
}

export function BrutalBadge({ text, color = 'bg-brutal-yellow', rotation = 'rotate-neg-2', className = '' }: BrutalBadgeProps) {
  return (
    <span className={`inline-block ${color} brutal-border-3 px-3 py-1 font-brutal text-sm uppercase ${rotation} brutal-shadow rounded ${className}`}>
      {text}
    </span>
  );
}

// ============================================================
// BRUTAL SECTION HEADER
// ============================================================
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  emoji?: string;
  color?: string;
}

export function SectionHeader({ title, subtitle, emoji, color = 'bg-brutal-gold' }: SectionHeaderProps) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center gap-3 mb-2">
        {emoji && <span className="text-2xl sm:text-3xl">{emoji}</span>}
        <h2 className="font-brutal text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight leading-none">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="font-mono text-sm sm:text-base text-gray-600 ml-0 sm:ml-11">
          {subtitle}
        </p>
      )}
      <div className={`h-1 w-20 ${color} brutal-border-2 mt-2 ml-0 sm:ml-11`} />
    </div>
  );
}

// ============================================================
// BRUTAL STAT CARD
// ============================================================
interface StatCardProps {
  value: string | number;
  prefix?: string;
  suffix?: string;
  label: string;
  color?: string;
  emoji?: string;
}

export function StatCard({ value, prefix = '', suffix = '', label, color = 'bg-brutal-gold', emoji }: StatCardProps) {
  return (
    <div className={`${color} brutal-border-3 p-4 brutal-shadow rounded-lg flex flex-col gap-1`}>
      <div className="flex items-center gap-2">
        {emoji && <span>{emoji}</span>}
        <span className="font-brutal text-xl sm:text-2xl">
          {prefix}{value}{suffix}
        </span>
      </div>
      <span className="font-mono text-xs uppercase tracking-wider opacity-80">{label}</span>
    </div>
  );
}

// ============================================================
// BRUTAL ACCORDION
// ============================================================
interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export function BrutalAccordionItem({ question, answer, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="brutal-border-3 mb-3 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className={`w-full text-left p-4 font-brutal text-sm sm:text-base flex items-center justify-between gap-2 transition-colors rounded-lg ${isOpen ? 'bg-brutal-gold' : 'bg-white hover:bg-gray-50'}`}
      >
        <span>{question}</span>
        <span className={`text-xl transition-transform ${isOpen ? 'rotate-45' : ''}`}>+</span>
      </button>
      <div className={`brutal-accordion-content ${isOpen ? 'open' : ''}`}>
        <div className="p-4 bg-white font-mono text-sm leading-relaxed border-t-2 border-brand-black">
          {answer}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MARQUEE TICKER
// ============================================================
interface MarqueeProps {
  items: string[];
  speed?: 'slow' | 'normal';
  className?: string;
}

export function Marquee({ items, speed = 'normal', className = '' }: MarqueeProps) {
  const doubled = [...items, ...items];
  return (
    <div className={`ticker-wrap overflow-hidden brutal-border-3 ${className}`}>
      <div className={`ticker ${speed === 'slow' ? 'marquee-slow' : 'marquee'}`}>
        {doubled.map((item, i) => (
          <span key={i} className="inline-block px-6 py-2 font-brutal text-sm uppercase whitespace-nowrap">
            {item}
            <span className="ml-6 text-brutal-pink">★</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// STICKY NOTE
// ============================================================
interface StickyNoteProps {
  text: string;
  color?: 'yellow' | 'pink' | 'lime' | 'blue' | 'orange';
  rotation?: string;
}

const stickyColors: Record<string, string> = {
  yellow: 'bg-brutal-yellow',
  pink: 'bg-brutal-pink text-white',
  lime: 'bg-brutal-lime',
  blue: 'bg-brutal-blue text-white',
  orange: 'bg-brutal-orange',
};

export function StickyNote({ text, color = 'yellow', rotation = 'rotate-neg-2' }: StickyNoteProps) {
  return (
    <div className={`${stickyColors[color]} p-4 brutal-border-2 brutal-shadow ${rotation} inline-block font-mono text-sm rounded`}>
      {text}
    </div>
  );
}

// ============================================================
// PROGRESS STEP INDICATOR
// ============================================================
interface ProgressStepsProps {
  steps: { title: string; emoji: string }[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function ProgressSteps({ steps, currentStep, onStepClick }: ProgressStepsProps) {
  return (
    <div className="flex items-center justify-between gap-1 sm:gap-2">
      {steps.map((step, i) => (
        <button
          key={i}
          onClick={() => onStepClick?.(i)}
          className={`flex flex-col items-center gap-1 flex-1 p-2 brutal-border-2 rounded-lg transition-all cursor-pointer ${
            i === currentStep
              ? 'bg-brutal-gold brutal-shadow scale-105'
              : i < currentStep
              ? 'bg-brutal-lime'
              : 'bg-gray-100 opacity-60'
          }`}
        >
          <span className="text-lg">{step.emoji}</span>
          <span className="font-brutal text-[10px] sm:text-xs uppercase text-center leading-tight">{step.title}</span>
        </button>
      ))}
    </div>
  );
}

// ============================================================
// EMPTY STATE
// ============================================================
export function EmptyState({ message, emoji = '📭' }: { message: string; emoji?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <span className="text-4xl mb-3">{emoji}</span>
      <p className="font-mono text-sm text-gray-500">{message}</p>
    </div>
  );
}
