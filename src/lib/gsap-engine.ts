// ============================================================
// GSAP v3.14 ANIMATION ENGINE — BRUTALIST DESIGN SYSTEM
// Aesthetic: Brutalist (Black + Yellow/Red, bold borders, hard shadows)
// Plugins: ScrollTrigger, TextPlugin
// ============================================================
'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { useEffect, useRef, useCallback } from 'react';

// Register plugins (safe for SSR guard)
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

export { gsap, ScrollTrigger };

// ============================================================
// useGsapContext — Base hook wrapping gsap.context + cleanup
// All other hooks use this internally.
// The callback receives NO context ref — it runs after gsap.context()
// is created, so all tweens are already scoped for auto-cleanup.
// ============================================================
export function useGsapContext(
  callback: () => void,
  scope?: React.RefObject<HTMLElement | null>,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add('(prefers-reduced-motion: no-preference)', callback);
    }, scope?.current || undefined);
    return () => {
      ctx.revert();
      mm.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

// ============================================================
// useGsapScrollReveal — ScrollTrigger-based section reveals
// Replaces IntersectionObserver .reveal-section pattern.
// Targets all .reveal-section within scope, animates stagger children.
// ============================================================
export function useGsapScrollReveal(scope?: React.RefObject<HTMLElement | null>) {
  useGsapContext(() => {
    gsap.utils.toArray<HTMLElement>('.reveal-section').forEach((el) => {
      const children = el.querySelectorAll('.stagger-child');
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 82%',
          end: 'bottom 30%',
          toggleActions: 'play none none reverse',
        },
      });

      // Fade-in the section container
      tl.from(el, {
        y: 36,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
      });

      // Stagger children if any
      if (children.length > 0) {
        tl.from(
          children,
          {
            y: 20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.55,
            ease: 'power2.out',
          },
          '-=0.4'
        );
      }
    });
  }, scope);
}

// ============================================================
// useGsapCounter — GSAP-powered counter on scroll
// Replaces rAF-based useAnimatedCounter / useCountUp.
// ============================================================
export function useGsapCounter(
  ref: React.RefObject<HTMLElement | null>,
  target: number,
  options: {
    duration?: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
    ease?: string;
    scrollTrigger?: boolean;
  } = {}
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
      const obj = { value: 0 };
      const trigger: ScrollTrigger.Vars = options.scrollTrigger !== false
        ? { trigger: el, start: 'center 80%', once: true }
        : {};

      gsap.to(obj, {
        value: target,
        duration: options.duration || 2,
        ease: (options.ease || 'power1.out') as gsap.EaseFunction,
        scrollTrigger: trigger,
        onUpdate: () => {
          const display = options.decimals
            ? obj.value.toFixed(options.decimals)
            : Math.round(obj.value).toString();
          el.textContent = `${options.prefix || ''}${display}${options.suffix || ''}`;
        },
      });
    });

    return () => {
      // Kill only ScrollTriggers attached to this specific element
      const triggers = ScrollTrigger.getAll();
      triggers.forEach((t) => {
        if (t.trigger === el) t.kill();
      });
      // Also kill any tweens targeting the proxy object
      gsap.killTweensOf(obj);
    };
  }, [ref, target, options.duration, options.prefix, options.suffix, options.decimals, options.ease, options.scrollTrigger]);
}

// ============================================================
// useGsapHeroSequence — Cinematic page-load timeline
// Logo → title → subtitle → badges → CTAs → scroll indicator
// ============================================================
export function useGsapHeroSequence(containerRef: React.RefObject<HTMLElement | null>) {
  useGsapContext(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
    });

    tl.from('.bio-pulse-container', {
      scale: 0.3,
      opacity: 0,
      duration: 1,
      ease: 'elastic.out(1, 0.5)',
    })
      .from(
        '.portal-hero-title',
        { y: 80, opacity: 0, scale: 0.92, duration: 0.8, ease: 'back.out(1.4)' },
        '-=0.5'
      )
      .from(
        '.portal-hero-subtitle',
        { y: 30, opacity: 0, duration: 0.5 },
        '-=0.4'
      )
      .from('.portal-hero-badges > *', {
        y: 15,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4,
      }, '-=0.3')
      .from(
        '.portal-hero-ctas .btn-cta',
        {
          y: 30,
          opacity: 0,
          scale: 0.7,
          stagger: 0.12,
          duration: 0.5,
          ease: 'back.out(1.7)',
        },
        '-=0.2'
      )
      .from(
        '.portal-scroll-indicator',
        { y: -20, opacity: 0, duration: 0.4 },
        '-=0.1'
      );
  }, containerRef);
}

// ============================================================
// useGsapBioPulse — Animated concentric SVG rings
// Three rings expanding outward with staggered delays
// ============================================================
export function useGsapBioPulse(containerRef: React.RefObject<HTMLElement | null>) {
  useGsapContext(() => {
    const rings = gsap.utils.toArray<SVGCircleElement>('.bio-pulse-ring');
    rings.forEach((ring, i) => {
      gsap.fromTo(
        ring,
        { attr: { r: 40 }, opacity: 0.5, strokeWidth: 2 },
        {
          attr: { r: 140 + i * 50 },
          opacity: 0,
          strokeWidth: 0.5,
          duration: 3,
          repeat: -1,
          delay: i * 1,
          ease: 'sine.out',
        }
      );
    });
  }, containerRef);
}

// ============================================================
// useGsapMagnetic — Magnetic hover for a single button
// Cursor-reactive pull with elastic snap-back
// ============================================================
export function useGsapMagnetic(
  ref: React.RefObject<HTMLElement | null>,
  strength: number = 0.3
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * strength;
      const y = (e.clientY - rect.top - rect.height / 2) * strength;
      gsap.to(el, { x, y, duration: 0.3, overwrite: 'auto' });
    };

    const onLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      gsap.killTweensOf(el);
    };
  }, [ref, strength]);
}

// ============================================================
// useGsapMagneticAll — Auto-apply magnetic to all buttons in scope
// Scans for .btn-cta, .btn-cta-yellow, .btn-cta-secondary, .btn-cta-cyan
// ============================================================
export function useGsapMagneticAll(scope?: React.RefObject<HTMLElement | null>) {
  useGsapContext(() => {
    const buttons = gsap.utils.toArray<HTMLElement>(
      '.btn-cta, .btn-cta-yellow, .btn-cta-secondary, .btn-cta-cyan, .mode-toggle, .theme-toggle'
    );

    buttons.forEach((btn) => {
      const strength = btn.classList.contains('theme-toggle') ? 0.15 : 0.25;

      btn.addEventListener('mousemove', (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = btn.getBoundingClientRect();
        const x = (mouseEvent.clientX - rect.left - rect.width / 2) * strength;
        const y = (mouseEvent.clientY - rect.top - rect.height / 2) * strength;
        gsap.to(btn, { x, y, duration: 0.3, overwrite: 'auto' });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.3)',
        });
      });
    });
  }, scope);
}

// ============================================================
// useGsapCursorRing — GSAP ticker-based smooth cursor
// Replaces rAF-based cursor with GSAP ticker (more performant)
// ============================================================
export function useGsapCursorRing(
  dotRef: React.RefObject<HTMLElement | null>,
  ringRef: React.RefObject<HTMLElement | null>
) {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let mouseX = 0;
    let mouseY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        gsap.set(dotRef.current, { x: mouseX, y: mouseY, force3D: true });
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest(
        'button, a, [role="button"], .hover-card, input, select, textarea'
      );
      if (ringRef.current) {
        gsap.to(ringRef.current, {
          scale: isInteractive ? 1.6 : 1,
          opacity: isInteractive ? 0.8 : 0.5,
          duration: 0.3,
          overwrite: 'auto',
        });
        if (isInteractive) {
          gsap.set(ringRef.current, { background: 'rgba(224, 31, 31, 0.08)' });
        } else {
          gsap.set(ringRef.current, { background: 'transparent' });
        }
      }
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);

    // Smooth ring following via GSAP ticker
    const ringX = { value: mouseX };
    const ringY = { value: mouseY };
    let active = true;

    const tick = () => {
      if (!active) return;
      ringX.value += (mouseX - ringX.value) * 0.12;
      ringY.value += (mouseY - ringY.value) * 0.12;
      if (ringRef.current) {
        gsap.set(ringRef.current, {
          x: ringX.value,
          y: ringY.value,
          force3D: true,
        });
      }
    };

    gsap.ticker.add(tick);

    return () => {
      active = false;
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      gsap.ticker.remove(tick);
      if (dotRef.current) gsap.killTweensOf(dotRef.current);
      if (ringRef.current) gsap.killTweensOf(ringRef.current);
    };
  }, [dotRef, ringRef]);
}

// ============================================================
// useGsapNavCascade — Left sidebar nav items stagger
// ============================================================
export function useGsapNavCascade(containerRef: React.RefObject<HTMLElement | null>) {
  useGsapContext(() => {
    gsap.from('.cascade-left', {
      x: -40,
      opacity: 0,
      stagger: 0.08,
      duration: 0.5,
      ease: 'power2.out',
      delay: 0.6,
    });

    gsap.from('.slide-right-in', {
      x: 40,
      opacity: 0,
      stagger: 0.12,
      duration: 0.5,
      ease: 'power2.out',
      delay: 0.8,
    });
  }, containerRef);
}

// ============================================================
// useGsapStatsBand — Stats counter + bar fill on scroll
// ============================================================
export function useGsapStatsBand(containerRef: React.RefObject<HTMLElement | null>) {
  useGsapContext(() => {
    // Stagger reveal stat items
    gsap.from('.portal-stat-item', {
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.portal-stats-band',
        start: 'top 80%',
        once: true,
      },
    });

    // Animate stat bars (scaleX wipe)
    gsap.from('.portal-stat-bar', {
      scaleX: 0,
      transformOrigin: 'left center',
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.portal-stats-band',
        start: 'top 80%',
        once: true,
      },
    });

    // Animate each stat value with counter
    gsap.utils.toArray<HTMLElement>('.portal-stat-value[data-target]').forEach((el) => {
      const target = parseFloat(el.dataset.target || '0');
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const decimals = parseInt(el.dataset.decimals || '0');
      const obj = { value: 0 };

      gsap.to(obj, {
        value: target,
        duration: 2,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: el,
          start: 'center 80%',
          once: true,
        },
        onUpdate: () => {
          const display = decimals > 0 ? obj.value.toFixed(decimals) : Math.round(obj.value);
          el.textContent = `${prefix}${display}${suffix}`;
        },
      });
    });
  }, containerRef);
}

// ============================================================
// useGsapMarquee — Infinite GSAP marquee
// Smoother than CSS animation, can be paused/resumed
// ============================================================
export function useGsapMarquee(trackRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    const totalWidth = track.scrollWidth / 2; // content is duplicated

    const tween = gsap.to(track, {
      x: -totalWidth,
      duration: 28,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(String(x)) % totalWidth),
      },
    });

    // Pause on hover
    track.addEventListener('mouseenter', () => tween.pause());
    track.addEventListener('mouseleave', () => tween.play());

    return () => {
      tween.kill();
    };
  }, [trackRef]);
}

// ============================================================
// useGsapProductCards — Product showcase stagger reveal
// ============================================================
export function useGsapProductCards(containerRef: React.RefObject<HTMLElement | null>) {
  useGsapContext(() => {
    gsap.from('.portal-product-card', {
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.portal-products',
        start: 'top 75%',
        once: true,
      },
    });

    // Hover 3D tilt effect for product cards
    gsap.utils.toArray<HTMLElement>('.portal-product-card').forEach((card) => {
      card.addEventListener('mousemove', (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = card.getBoundingClientRect();
        const xPercent = ((mouseEvent.clientX - rect.left) / rect.width - 0.5) * 2;
        const yPercent = ((mouseEvent.clientY - rect.top) / rect.height - 0.5) * 2;
        gsap.to(card, {
          rotateY: xPercent * 5,
          rotateX: -yPercent * 5,
          transformPerspective: 800,
          duration: 0.4,
          overwrite: 'auto',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateY: 0,
          rotateX: 0,
          duration: 0.6,
          ease: 'power2.out',
        });
      });
    });
  }, containerRef);
}

// ============================================================
// useGsapTimelinePanels — Life stage timeline stagger
// ============================================================
export function useGsapTimelinePanels(containerRef: React.RefObject<HTMLElement | null>) {
  useGsapContext(() => {
    const panels = gsap.utils.toArray<HTMLElement>('.portal-timeline-panel');

    panels.forEach((panel, i) => {
      // Accent bar wipe
      const bar = panel.querySelector('.portal-timeline-accent-bar');
      if (bar) {
        gsap.from(bar, {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panel,
            start: 'top 80%',
            once: true,
          },
        });
      }

      // Panel slide in from alternating sides
      gsap.from(panel, {
        x: i % 2 === 0 ? -40 : 40,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: panel,
          start: 'top 78%',
          once: true,
        },
      });

      // Tips stagger
      const tips = panel.querySelectorAll('.portal-timeline-tip');
      if (tips.length > 0) {
        gsap.from(tips, {
          x: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: panel,
            start: 'top 70%',
            once: true,
          },
        });
      }
    });
  }, containerRef);
}

// ============================================================
// useGsapCalcSection — Calculator section entrance
// ============================================================
export function useGsapCalcSection(containerRef: React.RefObject<HTMLElement | null>) {
  useGsapContext(() => {
    gsap.from('.portal-calc-controls', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.portal-calculator',
        start: 'top 80%',
        once: true,
      },
    });

    gsap.from('.calc-income-field', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.portal-calculator',
        start: 'top 75%',
        once: true,
      },
      delay: 0.2,
    });

    gsap.from('.portal-calc-results', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.portal-calc-results',
        start: 'top 85%',
        once: true,
      },
    });

    // Result items stagger
    gsap.from('.calc-result-item', {
      y: 20,
      opacity: 0,
      stagger: 0.15,
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.calc-result-grid',
        start: 'top 80%',
        once: true,
      },
    });

    // Premium cards stagger
    gsap.from('.calc-premium-card', {
      y: 15,
      opacity: 0,
      stagger: 0.2,
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.calc-premium-preview',
        start: 'top 85%',
        once: true,
      },
    });
  }, containerRef);
}

// ============================================================
// useGsapMythCards — Myth busting cards flip + stagger
// ============================================================
export function useGsapMythCards(containerRef: React.RefObject<HTMLElement | null>) {
  useGsapContext(() => {
    gsap.from('.myth-card', {
      y: 40,
      opacity: 0,
      stagger: 0.12,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.portal-myths',
        start: 'top 75%',
        once: true,
      },
    });
  }, containerRef);
}

// ============================================================
// useGsapOfwSection — OFW section entrance
// ============================================================
export function useGsapOfwSection(containerRef: React.RefObject<HTMLElement | null>) {
  useGsapContext(() => {
    gsap.from('.portal-ofw-header', {
      x: -30,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.portal-ofw',
        start: 'top 80%',
        once: true,
      },
    });

    gsap.from('.portal-ofw-benefit-item', {
      x: -20,
      opacity: 0,
      stagger: 0.08,
      duration: 0.4,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.portal-ofw-benefits',
        start: 'top 80%',
        once: true,
      },
    });

    // OFW stat counters
    gsap.utils.toArray<HTMLElement>('.portal-ofw-stat-value').forEach((el) => {
      gsap.from(el, {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      });
    });

    gsap.from('.portal-ofw-cta .btn-cta', {
      y: 20,
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: '.portal-ofw-cta',
        start: 'top 90%',
        once: true,
      },
    });
  }, containerRef);
}

// ============================================================
// useGsapAISection — AI concierge section entrance
// ============================================================
export function useGsapAISection(containerRef: React.RefObject<HTMLElement | null>) {
  useGsapContext(() => {
    gsap.from('.portal-ai-chatbox', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.portal-ai-concierge',
        start: 'top 80%',
        once: true,
      },
    });

    gsap.from('.chat-chip', {
      y: 15,
      opacity: 0,
      stagger: 0.08,
      duration: 0.4,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.chat-suggestions',
        start: 'top 90%',
        once: true,
      },
    });
  }, containerRef);
}

// ============================================================
// useGsapFooterReveal — Footer entrance
// ============================================================
export function useGsapFooterReveal(containerRef: React.RefObject<HTMLElement | null>) {
  useGsapContext(() => {
    gsap.from('.portal-footer-grid > *', {
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.portal-footer',
        start: 'top 85%',
        once: true,
      },
    });
  }, containerRef);
}

// ============================================================
// useGsapThemeTransition — Wipe animation for theme switch
// ============================================================
export function useGsapThemeTransition() {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!overlayRef.current && typeof document !== 'undefined') {
      const el = document.createElement('div');
      el.style.cssText = `
        position: fixed; inset: 0; z-index: 999999;
        pointer-events: none; background: var(--accent-red);
        transform: scaleY(0); transform-origin: top;
      `;
      el.setAttribute('aria-hidden', 'true');
      document.body.appendChild(el);
      overlayRef.current = el;
    }
  }, []);

  const animate = useCallback((callback: () => void) => {
    const overlay = overlayRef.current;
    if (!overlay) {
      callback();
      return;
    }

    gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline();
      tl.to(overlay, {
        scaleY: 1,
        transformOrigin: 'top',
        duration: 0.25,
        ease: 'power2.in',
      })
        .add(callback)
        .to(overlay, {
          scaleY: 0,
          transformOrigin: 'bottom',
          duration: 0.25,
          ease: 'power2.out',
        });
    });
  }, []);

  return animate;
}

// ============================================================
// useGsapModeTransition — Mode switch animation
// ============================================================
export function useGsapModeTransition() {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!overlayRef.current && typeof document !== 'undefined') {
      const el = document.createElement('div');
      el.style.cssText = `
        position: fixed; inset: 0; z-index: 999998;
        pointer-events: none; background: var(--accent-red);
        transform: scaleY(0); transform-origin: top;
      `;
      el.setAttribute('aria-hidden', 'true');
      document.body.appendChild(el);
      overlayRef.current = el;
    }
  }, []);

  const animate = useCallback((callback: () => void) => {
    const overlay = overlayRef.current;
    if (!overlay) {
      callback();
      return;
    }

    gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline();
      tl.to(overlay, {
        scaleY: 1,
        transformOrigin: 'top',
        duration: 0.2,
        ease: 'power3.in',
      })
        .add(callback)
        .to(overlay, {
          scaleY: 0,
          transformOrigin: 'bottom',
          duration: 0.2,
          ease: 'power3.out',
        });
    });
  }, []);

  return animate;
}

// ============================================================
// useGsapParallax — Parallax layer on scroll
// ============================================================
export function useGsapParallax(
  ref: React.RefObject<HTMLElement | null>,
  speed: number = 0.3
) {
  useGsapContext(() => {
    gsap.to(ref.current, {
      yPercent: speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, ref as React.RefObject<HTMLElement | null>);
}

// ============================================================
// useGsapPortalNav — Portal nav show/hide on scroll direction
// Smooth GSAP animation instead of CSS display toggle
// ============================================================
export function useGsapPortalNav(navRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    let lastScroll = 0;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const current = window.scrollY;
        const show = current < lastScroll || current < 100;

        gsap.to(el, {
          y: show ? 0 : -80,
          opacity: show ? 1 : 0,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        });

        lastScroll = current;
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      gsap.killTweensOf(el);
    };
  }, [navRef]);
}
