# Pacific Cross Insurance Advisor Hub — V-09 Hybrid Portal

> Brutalist editorial command center for Pacific Cross insurance advisors. Built with Next.js 16, React, Tailwind CSS 4, GSAP 3.14, and Recharts.

[![Next.js](https://img.shields.io/badge/Next.js-16.1.3-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.14-88CE02?logo=greensock&logoColor=white)](https://gsap.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Design System](#design-system)
- [GSAP Animation System](#gsap-animation-system)
- [Getting Started](#getting-started)
- [Product Data](#product-data)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## Overview

Pacific Cross Insurance Advisor Hub (V-09 Hybrid Portal) is a comprehensive PWA that serves as an all-in-one command center for licensed Pacific Cross insurance advisors. It features a dual-mode architecture (Advisor Mode + Client Mode), cinematic GSAP animations, interactive calculators, real-time AI concierge, and a brutalist editorial design system.

The application empowers advisors to access product information, pricing tools, spiel scripts, social media content, training resources, and client management — all from a single progressive web app.

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 16.1.3 (Turbopack) | App Router, SSR, PWA |
| **UI Library** | React 19 | Components, hooks, state |
| **Styling** | Tailwind CSS 4 | Utility-first CSS |
| **Animations** | GSAP 3.14 + ScrollTrigger | Cinematic motion design |
| **Charts** | Recharts 2.15 | Data visualization |
| **Transitions** | Framer Motion 12 | AnimatePresence, tab switches |
| **Language** | TypeScript 5 | Type safety |
| **AI Backend** | z-ai-web-dev-sdk | AI chat completions |
| **Database** | Prisma 6 (ready) | ORM for future features |
| **Package Manager** | Bun | Fast dependency management |
| **Fonts** | Google Fonts | Bebas Neue, Barlow Condensed, DM Mono, Oswald |

## Features

### Dual-Mode System

- **Advisor Mode** — 3-column editorial grid with navigation hub, content area, and live widgets panel
- **Client Mode** — Single-column discovery experience with card-based product exploration, lifestyle quiz, and simplified navigation
- Mode gateway with cinematic selection tiles on first visit
- Persistent mode preference via localStorage

### Product Center

- **Blue Royale** — Premium worldwide medical plan (Plans A/B/C, USD 500K–$2M coverage, $1,676–$5,263/yr)
- **FlexiShield** — HMO enhancer second layer (FS50–FS200, PHP 2M MBL, ₱6,510–₱63,972/yr)
- OFW protection plans with 90-day trip coverage
- Real-time premium calculator with age-based pricing lookup
- Interactive coverage gap analysis (HEV formula)

### Interactive Tools

- **Mortality Risk Calculator** — Age, gender, income inputs → Human Economic Value, insurance gap, recommended coverage, premium previews
- **Life Stage Timeline** — 5 stages (Young Professional → Retirement) with product recommendations
- **ASEAN Insurance Comparison** — Horizontal bar chart comparing 7 countries
- **Myth Busting Section** — 6 flip cards debunking common insurance misconceptions

### AI Concierge

- Real-time chat interface using z-ai-web-dev-sdk
- Pre-loaded suggestion chips for common queries
- Comprehensive Pacific Cross product knowledge base
- Branded brutalist chat bubble design

### Content & Training

- Advisor Playbook with 5-step spiel flow (Discover → Educate → Personalize → Demonstrate → Commit)
- Social media content calendar with platform-specific posts (Facebook, Instagram)
- Campaign content library (Wealth Armor, Hospital Hero, Choose Your Armor, Educator Not Seller)
- 30-60-90 day plan for new advisors
- Hashtag strategy and posting schedule

### GSAP Animation System (18 Hooks)

| Level | Interaction | Hooks |
|---|---|---|
| **Micro** | Cursor-reactive hover, magnetic buttons, 3D card tilt | `useGsapMagneticAll`, `useGsapCursorRing`, `useGsapProductCards` |
| **Minute** | Scroll reveals, counter animations, marquee, parallax | `useGsapScrollReveal`, `useGsapStatsBand`, `useGsapCounter`, `useGsapMarquee`, `useGsapParallax` |
| **Macro** | Page-load sequence, theme/mode transitions, staggered reveals | `useGsapHeroSequence`, `useGsapBioPulse`, `useGsapNavCascade`, `useGsapThemeTransition`, `useGsapModeTransition`, `useGsapTimelinePanels` |

All animations respect `prefers-reduced-motion` via `gsap.matchMedia()`.

### PWA Features

- Web App Manifest with standalone display mode
- Service Worker-ready architecture
- Offline-capable static content
- Installable on mobile and desktop

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    layout.tsx                       │
│  (Root: fonts, noise overlay, vignette, PWA meta)   │
├─────────────────────┬───────────────────────────────┤
│     page.tsx         │      portal/page.tsx          │
│  (dynamic ssr:false)│    (long-scroll landing)       │
│         │             │                               │
│   home-client.tsx    │  ┌── Hero + Bio-Pulse        │
│         │             │  ├── Stats Band (4 counters)  │
│   ┌─────┴──────┐     │  ├── Product Cards (3D tilt)  │
│   │  Gateway    │     │  ├── Life Stage Timeline      │
│   │  (null)    │     │  ├── Calculator (HEV)          │
│   ├────────────┤     │  ├── ASEAN Chart (Recharts)    │
│   │ Advisor    │     │  ├── Myth Cards (flip)         │
│   │ (3-col)    │     │  ├── OFW Section               │
│   │  Client    │     │  ├── AI Concierge (chat)       │
│   │ (1-col)    │     │  └── Footer                   │
│   └────────────┘     │                               │
├─────────────────────┴───────────────────────────────┤
│              api/chat/route.ts                       │
│         (z-ai-web-dev-sdk AI backend)                │
├─────────────────────────────────────────────────────┤
│              lib/gsap-engine.ts (18 hooks)           │
│              lib/data.ts (products, stats, FAQs)      │
├─────────────────────────────────────────────────────┤
│              components/ (60+ files)                  │
│    sections/ charts/ animations/ interactive/ ui/     │
└─────────────────────────────────────────────────────┘
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (fonts, PWA meta, overlays)
│   ├── page.tsx                # Dynamic import wrapper (ssr:false)
│   ├── home-client.tsx          # Main client component (gateway + hub)
│   ├── globals.css              # Brutalist design system (~1,500 lines)
│   ├── portal/
│   │   ├── page.tsx            # Long-scroll landing page
│   │   └── portal.css          # Portal-specific styles
│   └── api/
│       ├── route.ts            # Base API route
│       └── chat/
│           └── route.ts        # AI concierge endpoint
├── components/
│   ├── ModeGateway.tsx         # Full-screen mode selector
│   ├── ClientModeLayout.tsx    # Client mode single-column layout
│   ├── SocialCards.tsx         # Social media card previews
│   ├── ProductBadge.tsx        # Brutalist product badges
│   ├── animations/
│   │   └── index.tsx           # Framer Motion components
│   ├── charts/
│   │   └── insurance-charts.tsx # Recharts visualizations
│   ├── interactive/
│   │   ├── flip-cards.tsx      # Flip card components
│   │   ├── quiz-flow.tsx       # Lifestyle quiz
│   │   └── spiel-flow.tsx      # Advisor spiel cards
│   ├── sections/
│   │   ├── home.tsx            # Command center
│   │   ├── products.tsx        # Product details
│   │   ├── advisor-playbook.tsx # Spiel flow
│   │   ├── social-media.tsx    # Content calendar
│   │   ├── ph-insurance.tsx    # PH data
│   │   ├── training.tsx        # Training resources
│   │   ├── roadmap.tsx         # 30-60-90 plan
│   │   └── client-hub.tsx      # Client tools
│   └── ui/                     # 40+ shadcn/ui components
├── lib/
│   ├── gsap-engine.ts          # GSAP v3.14 animation engine (18 hooks)
│   ├── data.ts                 # Product data, stats, FAQs, life stages
│   ├── db.ts                   # Prisma database client
│   └── utils.ts                # Utility functions
└── hooks/
    ├── use-mobile.ts           # Mobile detection hook
    └── use-toast.ts            # Toast notification hook
public/
├── manifest.json               # PWA manifest
├── robots.txt                  # SEO robots
├── logo.svg                    # Pacific Cross logo
├── icon-192.png                # PWA icon
└── icon-512.png                # PWA icon
```

## Design System

### Color Tokens (CSS Custom Properties)

```
Dark Mode:                    Light Mode:
  --bg: #080808                  --bg: #f2eed8
  --accent-red: #e01f1f          --accent-red: #c41919
  --accent-yellow: #f5c400      --accent-yellow: #d4a800
  --accent-cyan: #00d4ff         --accent-cyan: #00a8cc
  --accent-green: #39d353        --accent-green: #2ba842
```

### Typography

| Class | Font | Usage |
|---|---|---|
| `.font-display` | Bebas Neue, Anton | Headlines, section titles, stat values |
| `.font-sub` | Barlow Condensed, Oswald | Subheadings, labels, buttons |
| `.font-mono` | DM Mono | Body text, metadata, technical content |

### Brutalist Design Rules

- `border-radius: 0px` — Always sharp corners
- `box-shadow: 4px 4px 0` — Hard offset shadows, no blur
- `border: 2px solid` — Thick visible borders
- `text-transform: uppercase` — Aggressive casing
- `letter-spacing: 0.08em` — Wide tracking for labels
- Noise texture overlay + vignette for depth

## Getting Started

### Prerequisites

- Node.js 18+ or Bun 1.0+
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/<username>/pacific-cross-advisor-hub.git
cd pacific-cross-advisor-hub

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env

# Start development server
bun run dev
```

### Available Scripts

```bash
bun run dev       # Start dev server on port 3000
bun run build     # Production build
bun run start     # Start production server
bun run lint      # Run ESLint
```

### Environment Variables

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production URL | `http://localhost:3000` |

## Product Data

### Blue Royale — Premium Worldwide Medical Plan

| Plan | Coverage | Starting Premium |
|---|---|---|
| Plan A | USD 500,000 | $1,676/year |
| Plan B | USD 1,000,000 | $2,698/year |
| Plan C | USD 2,000,000 | $3,346/year |

Key features: Any hospital worldwide, 90 days/trip unlimited trips, guaranteed renewable to 100, no physical exam.

### FlexiShield — HMO Enhancer Second Layer

| Tier | HMO Range | Starting Premium |
|---|---|---|
| FS 50 | ₱50K–₱99K MBL | ₱6,510/year |
| FS 100 | ₱100K–₱149K MBL | ₱6,510/year |
| FS 150 | ₱150K–₱199K MBL | ₱7,160/year |
| FS 200 | ₱200K+ MBL | ₱6,510/year |

Key features: PHP 2M MBL, PHP 1,000/day hospital income, COVID-19 covered, ages 0–70.

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/<username>/pacific-cross-advisor-hub&project-name=pacific-cross-hub)

```bash
# Install Vercel CLI
bun add -g vercel

# Deploy
vercel
```

### GitHub Pages

The project includes a GitHub Actions workflow (`.github/workflows/deploy-pages.yml`) that automatically deploys static content to GitHub Pages on push to `main`. Note that API routes (`/api/chat`) will not function on GitHub Pages — use Vercel for full functionality.

### Manual Build

```bash
bun run build
# Output in .next/ directory
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## License

MIT — Built for Pacific Cross Insurance. Not affiliated with Pacific Cross Insurance Philippines.

---

<p align="center">
  <strong>PACIFIC<span style="color:#e01f1f">×</span>CROSS</strong><br/>
  <em>Protect Your Future. No Cap.</em>
</p>
