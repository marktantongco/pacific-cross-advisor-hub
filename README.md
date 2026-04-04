# Pacific Cross Advisor Hub

> **Street-meets-editorial command center** for Pacific Cross Insurance advisors in the Philippines.

## Overview

Pacific Cross Advisor Hub is a comprehensive PWA (Progressive Web App) portal designed for Pacific Cross Insurance advisors in the Philippines. It serves as an editorial command center for exploring **Blue Royale** (worldwide coverage from $5/day) and **FlexiShield** (HMO enhancer from ₱18/day) products, accessing training tools, social media content generators, and client-facing resources. The application features a unique **4-tier archetype design system** (Eagle → Beaver → Ant → Owl) that maps UI components and color tokens to distinct market segments — from premium worldwide plans to community-driven social content. Built with a brutalist editorial aesthetic featuring zero border-radius, custom cursor, noise texture overlays, and a 3-column magazine-style grid layout.

---

## Key Features

### Dual Mode Interface
The application offers two distinct viewing experiences — **Advisor Mode** with a 3-column editorial grid (left navigation hub, center content area, right widget sidebar) and **Client Mode** with a streamlined single-column discovery flow. A full-screen mode gateway greets first-time visitors, and mode preference persists in `localStorage`. Seamless switching between modes is handled with animated crossfade transitions, and the entire interface — from ticker colors to navigation accents — adapts to the active mode context.

### Archetype Design System
A 4-tier design token architecture maps visual language to market segments: **Eagle** (premium/worldwide, red `#e01f1f`) for Blue Royale and OFW plans, **Beaver** (practical/HMO, amber `#f59e0b`) for FlexiShield pricing and benefits, **Ant** (community/social, teal `#0d9488`) for social media and leaderboards, and **Owl** (analytics/insights, indigo) for stats, data visualization, and dark mode phosphor glow. The system includes 12 card layout variants (3 per archetype), 4 hero section types, 4 pricing display formats, comparison tables, daily price chips, and competitor badges — all spanning 5,000+ lines of CSS tokens.

### Product Showcase
Both Pacific Cross flagship products are presented with full pricing tables, interactive calculators, and benefit matrices. **FlexiShield** offers 4 deductible tiers (FS 50/100/150/200) with HMO coverage from ₱18/day (₱6,510/year) for ages 0–70. **Blue Royale** provides 3 plan tiers (A/B/C) with worldwide coverage from $5/day ($1,676/year) for ages 0–100, including travel emergency coverage, 5-deductible discount options, and COVID vaccine reimbursement. Products use a daily pricing format for Gen-Z appeal, with radar chart comparisons and 13-row feature comparison grids.

### AI-Powered Tools
A built-in AI chat API (`/api/ai-chat`) provides insurance Q&A and client consultation support. Advisors can query product details, get objection-handling suggestions, and receive real-time guidance during client meetings. The AI section features a chat interface with pre-built suggestion chips for common queries, styled with the portal's brutalist aesthetic.

### Social Media Generator
A content creation toolkit with 6 themed social card templates — Myth Buster, Hospital Bills, Choose Your Armor, Educator, PH Data, and Vision — designed for advisor marketing across social platforms. Cards feature hard offset shadows, comic-style borders, and brand-accurate coloring. The Campaign tab provides 5 pre-written post templates, an Advisor Mindset section with analogies, and a content calendar framework. All cards are preview-ready and use archetype-aware accent colors.

### Interactive Spiel Flow
Guided sales conversation flows embedded within the Advisor Playbook section provide structured scripts for client consultations. The spiel flow system walks advisors through objection handling, benefit presentations, and closing techniques using the Owl archetype for educational framing and the Beaver archetype for pricing-focused sections. Interactive quiz components test advisor knowledge with lifestyle-based question flows and 3 persona result tiles (The Strategist, The Globetrotter, The Family Shield).

### GSAP Animation Engine
A comprehensive animation library built on GSAP 3.14 with 22 custom hooks covering every aspect of the UI experience. The engine includes cinematic page-load sequences, ScrollTrigger-based section reveals with stagger children, magnetic button hover effects, smooth cursor ring following via GSAP ticker, counter animations on scroll, marquee ticker with pause-on-hover, 3D card tilt effects, alternating timeline panel entrances, wipe animations for theme and mode transitions, and parallax scrolling — all with `prefers-reduced-motion` support and automatic cleanup via `gsap.context()`.

### Philippine Market Intelligence
The platform integrates real Philippine insurance data throughout the experience — the country's 1.79% insurance penetration rate, 70% uninsured population, ₱8,000 average annual mobile load spend vs ₱500 insurance spend, 2.2M OFWs with $36B in annual remittances, and 40% of financial ruin attributed to medical emergencies. Competitive landscape analysis covers Maxicare, Intellicare, SunLife, PhilHealth, Singlife, and GCash with brand-accurate competitor badges and 8 documented Pacific Cross advantages.

### PWA Ready
The application includes a web app manifest, mobile-first navigation with a fixed bottom bar featuring safe area support, and a responsive design that collapses the 3-column editorial grid to single-column below 900px. Touch devices automatically disable the custom cursor and enable native scrolling. The dark/light theme system persists across sessions, and the mode gateway provides an app-like onboarding experience.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (React 19, TypeScript, Turbopack) |
| Styling | Tailwind CSS 4 + 5,000+ line custom brutalist design system |
| Animation | GSAP 3.14 (22 custom hooks), Framer Motion (tab transitions) |
| UI Components | shadcn/ui (48 components) |
| Charts | Recharts (bar, pie, radar, line charts) |
| Database | Prisma ORM (SQLite) |
| Runtime | Bun |
| Deployment | Vercel (standalone) / GitHub Pages (static export) |

---

## Architecture

### Routes

| Route | Type | Description |
|-------|------|-------------|
| `/` | Static (SSR-safe) | Landing page with dual-mode gateway |
| `/advisor` | Static (SSR-safe, `ssr: false`) | Main advisor/client hub — 8-tab editorial grid |
| `/portal` | Static | Public-facing portal page |
| `/api` | Dynamic | Health check endpoint |
| `/api/ai-chat` | Dynamic | AI chat completions API |
| `/api/chat` | Dynamic | Chat interface API |

### Archetype Design System

| Archetype | Role | Accent Color | CSS Selector | Use Cases |
|-----------|------|-------------|-------------|-----------|
| 🦅 **Eagle** | Premium / Worldwide | Red `#e01f1f` | `[data-archetype="eagle"]` | Blue Royale, OFW plans, market positioning, hero cards |
| 🦫 **Beaver** | Practical / HMO | Amber `#f59e0b` | `[data-archetype="beaver"]` | FlexiShield, pricing tables, benefit checklists, calculator |
| 🐜 **Ant** | Community / Social | Teal `#0d9488` | `[data-archetype="ant"]` | Social media, leaderboards, network cards, micro-interactions |
| 🦉 **Owl** | Analytics / Insights | Indigo/Violet | `[data-archetype="owl"]` | Stats panels, FAQ, data viz, dark mode, phosphor glow |

### GSAP Animation Hooks (22 total)

| Hook | Description |
|------|-------------|
| `useGsapContext` | Base hook wrapping `gsap.context()` + `matchMedia` for scoped cleanup |
| `useGsapScrollReveal` | ScrollTrigger-based section reveals with stagger children |
| `useGsapCounter` | GSAP-powered number counter on scroll with prefix/suffix support |
| `useGsapHeroSequence` | Cinematic page-load timeline (logo → title → badges → CTAs) |
| `useGsapBioPulse` | Animated concentric SVG rings expanding outward |
| `useGsapMagnetic` | Cursor-reactive magnetic pull for a single button |
| `useGsapMagneticAll` | Auto-applies magnetic hover to all CTA buttons in scope |
| `useGsapCursorRing` | GSAP ticker-based smooth cursor with interactive scaling |
| `useGsapNavCascade` | Left sidebar nav items stagger entrance animation |
| `useGsapStatsBand` | Stats counter + progress bar fill animation on scroll |
| `useGsapMarquee` | Infinite smooth marquee with pause-on-hover |
| `useGsapProductCards` | Product showcase stagger reveal with 3D hover tilt |
| `useGsapTimelinePanels` | Life stage timeline with alternating slide-in + tip stagger |
| `useGsapCalcSection` | Calculator section multi-part entrance animation |
| `useGsapMythCards` | Myth busting cards flip + stagger reveal |
| `useGsapOfwSection` | OFW section slide-in + stat counter + CTA reveal |
| `useGsapAISection` | AI concierge chatbox + suggestion chip entrance |
| `useGsapFooterReveal` | Footer grid stagger reveal on scroll |
| `useGsapThemeTransition` | Red wipe animation for dark/light theme switch |
| `useGsapModeTransition` | Animated wipe for advisor ↔ client mode switch |
| `useGsapParallax` | Parallax layer movement on scroll with configurable speed |
| `useGsapPortalNav` | Portal nav show/hide based on scroll direction |

---

## Getting Started

### Prerequisites

- **Node.js** 18+ or **Bun** latest
- **npm** or **bun** package manager

### Installation

```bash
git clone https://github.com/[repo]/pacific-cross-advisor-hub.git
cd pacific-cross-advisor-hub
bun install
```

### Development

```bash
bun run dev
# Open http://localhost:3000
```

### Production Build

```bash
bun run build
bun run start
```

### Static Export (GitHub Pages)

```bash
NEXT_PUBLIC_STATIC_EXPORT=true NEXT_PUBLIC_BASE_PATH=/pacific-cross-advisor-hub bun run build
# Deploy the 'out' directory
```

---

## Project Structure

```
src/
├── app/
│   ├── globals.css              # 5,000+ line brutalist editorial design system
│   ├── layout.tsx               # Root layout with PWA meta, fonts, noise overlay
│   ├── page.tsx                 # Landing page (SSR-safe, dual-mode)
│   ├── home-client.tsx          # Landing client component
│   ├── advisor/
│   │   ├── page.tsx             # Advisor hub wrapper (ssr: false dynamic import)
│   │   └── advisor-client.tsx   # Main hub — 3-col grid + client mode layout
│   ├── portal/
│   │   ├── page.tsx             # Public-facing portal page
│   │   └── portal.css           # Portal-specific styles
│   └── api/
│       ├── route.ts             # Health check endpoint
│       ├── ai-chat/route.ts     # AI chat completions
│       └── chat/route.ts        # Chat interface
├── components/
│   ├── sections/                # 8 section components
│   │   ├── home.tsx             # Hero, stats, product cards, CTAs
│   │   ├── products.tsx         # FlexiShield + Blue Royale detail, calc, compare, quiz
│   │   ├── advisor-playbook.tsx # Spiel flow, objection handling
│   │   ├── social-media.tsx     # Campaign posts, content calendar, templates
│   │   ├── ph-insurance.tsx     # PH market data, competitor analysis
│   │   ├── training.tsx         # Training deck download, resources
│   │   ├── roadmap.tsx          # Product roadmap, milestones
│   │   └── client-hub.tsx       # Client wizard, estimator, contact
│   ├── interactive/             # Interactive components
│   │   ├── flip-cards.tsx       # Product feature flip cards
│   │   ├── quiz-flow.tsx        # Lifestyle quiz with persona results
│   │   └── spiel-flow.tsx       # Guided sales conversation flow
│   ├── ui/                      # 48 shadcn/ui components
│   ├── animations/              # Animation utility components
│   ├── navigation/
│   │   └── tab-switcher.tsx     # Tab-based section navigation
│   ├── charts/
│   │   └── insurance-charts.tsx # Recharts visualizations (8 chart types)
│   ├── ModeGateway.tsx          # Full-screen mode selection gateway
│   ├── ClientModeLayout.tsx     # Single-column client discovery layout
│   ├── SocialCards.tsx          # 6 themed social card templates
│   ├── ProductBadge.tsx         # FlexiShield / Blue Royale product badges
│   └── brutalist-ui.tsx         # Shared brutalist UI components
├── lib/
│   ├── gsap-engine.ts           # 22 GSAP animation hooks
│   ├── data.ts                  # Product pricing, market data, FAQ, quiz content
│   ├── db.ts                    # Database utilities (Prisma/SQLite)
│   ├── utils.ts                 # Utility functions (cn, formatting)
│   └── layout-variants.md       # 12 layout variant specifications
└── hooks/
    ├── use-toast.ts             # Toast notification hook
    └── use-mobile.ts            # Mobile viewport detection hook
```

---

## Deployment

### Vercel (Recommended)

1. Import the repository in the [Vercel dashboard](https://vercel.com/new)
2. **Framework preset:** Next.js
3. **Build command:** `bun run build`
4. **Install command:** `bun install`
5. **Region:** Hong Kong (`hkg1`)
6. Security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection) are pre-configured via `vercel.json`

### GitHub Pages

1. Set environment variable: `NEXT_PUBLIC_STATIC_EXPORT=true`
2. Set base path: `NEXT_PUBLIC_BASE_PATH=/[repo-name]`
3. Build outputs to the `out/` directory (Next.js static export mode)
4. Deploy via GitHub Actions — API routes are disabled in static mode

### Local Production Server

```bash
bun run build
# Starts standalone server on port 3000
bun run start
```

---

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | SQLite database file path | Yes (for Prisma) |
| `AI_GATEWAY_API_KEY` | AI API key for chat completions | Only for AI features |
| `NEXT_PUBLIC_STATIC_EXPORT` | Set `"true"` to enable static export | Only for GitHub Pages |
| `NEXT_PUBLIC_BASE_PATH` | Base path prefix (e.g., `/repo-name`) | Only for GitHub Pages |

---

## Browser Support

| Browser | Version | Support Level |
|---------|---------|--------------|
| Chrome / Edge | 90+ | Full (custom cursor, GSAP, all features) |
| Safari | 15+ | Full |
| Firefox | 90+ | Full |
| Mobile Chrome | Latest | PWA optimized, native cursor, safe area support |
| Mobile Safari | Latest | PWA optimized, safe area support |

Custom cursor (dot + ring) is automatically disabled on touch devices via `@media (pointer: coarse)`. All animations respect `prefers-reduced-motion: reduce`.

---

## Design Philosophy

The Pacific Cross Advisor Hub follows a **brutalist editorial** design language:

- **Zero border-radius** — all elements use sharp corners (`--radius: 0px`)
- **Custom cursor** — 8px dot + 36px lerp-smoothed ring on desktop
- **Noise texture** — 4% opacity SVG noise overlay for depth
- **Vignette gradient** — radial overlay pulling focus to center content
- **Typography stack** — Bebas Neue (display), Barlow Condensed (sub-heads), DM Mono (body/data)
- **Color palette** — Dark mode default: `#080808` background, `#e01f1f` red accent, `#f5c400` yellow accent, `#00d4ff` cyan accent
- **Hard offset shadows** — comic-style `4px 4px 0` without blur
- **Page load choreography** — red wipe-up → grid line draw → hero slam → column cascade → slide-in

---

## License

Proprietary — Pacific Cross Insurance

---

<p align="center">
  <strong>PACIFIC×CROSS</strong> — Protect Your Future. No Cap.<br>
  <span style="font-size: 0.75rem; color: #888;">Built with Next.js 16 · GSAP 3.14 · Tailwind CSS 4</span>
</p>
