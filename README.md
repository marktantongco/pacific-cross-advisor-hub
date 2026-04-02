```
 ██████╗ ██╗     ██████╗ ███████╗██╗  ██╗██╗  ██╗███████╗██╗     ██╗   ██╗ █████╗
██╔════╝ ██║     ██╔══██╗██╔════╝██║ ██╔╝██║ ██╔╝██╔════╝██║     ██║   ██║██╔══██╗
██║  ███╗██║     ██████╔╝█████╗  █████╔╝ █████╔╝ █████╗  ██║     ██║   ██║███████║
██║   ██║██║     ██╔══██╗██╔══╝  ██╔═██╗ ██╔═██╗ ██╔══╝  ██║     ██║   ██║██╔══██║
╚██████╔╝███████╗██████╔╝███████╗██║  ██╗██║  ██╗███████╗███████╗╚██████╔╝██║  ██║
 ╚═════╝ ╚══════╝╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝
 ██╗     ███████╗████████╗██████╗  ██████╗ ██╗
 ██║     ██╔════╝╚══██╔══╝██╔══██╗██╔═══██╗██║
 ██║     █████╗     ██║   ██████╔╝██║   ██║██║
 ██║     ██╔══╝     ██║   ██╔══██╗██║   ██║██║
 ███████╗███████╗   ██║   ██║  ██║╚██████╔╝███████╗
 ╚══════╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝
```

> **V-09 Hybrid Portal** -- Brutalist editorial command center for Pacific Cross insurance advisors and clients.

[![Next.js](https://img.shields.io/badge/Next.js-16.1.3-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-3.14.2-88CE02?logo=greensock&logoColor=white)](https://gsap.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Design System](#design-system)
- [GSAP Animation Engine](#gsap-animation-engine)
- [Features](#features)
- [Dual Mode System](#dual-mode-system)
- [Product Data](#product-data)
- [API Routes](#api-routes)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

The **Pacific Cross Advisor Hub (V-09 Hybrid Portal)** is a comprehensive progressive web application that serves as an all-in-one editorial command center for licensed Pacific Cross insurance advisors and their clients. Built on Next.js 16 with a brutalist editorial design language, the application combines cinematic GSAP animations, real-time AI-powered chat, interactive premium calculators, and a rich content management system into a single deployable unit.

The platform operates on a **dual-mode architecture**: **Advisor Mode** provides a 3-column editorial grid with navigation hub, content workspace, and live widget panels for day-to-day advisory operations. **Client Mode** delivers a single-column discovery experience with card-based product exploration, lifestyle quizzes, and simplified navigation for end clients. A full-screen gateway screen greets first-time visitors, allowing them to choose their experience. The selected mode persists via `localStorage` and can be toggled at any time with a cinematic wipe transition.

Two flagship insurance products are fully integrated with real brochure pricing: **Blue Royale** (premium worldwide medical plans A/B/C covering USD 500K to USD 2M) and **FlexiShield** (an HMO enhancer second layer with four deductible tiers from FS50 to FS200, covering up to PHP 2M). Every premium is age-graded with exact annual rates from the official brochures, powering interactive calculators and side-by-side comparison tools used both by advisors and clients.

---

## Tech Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| **Framework** | Next.js (App Router, Turbopack) | 16.1.3 | SSR, routing, API routes, PWA shell |
| **UI Library** | React | 19.0.0 | Components, hooks, state management |
| **Styling** | Tailwind CSS | 4.x | Utility-first CSS with custom `@theme inline` |
| **Animations** | GSAP + ScrollTrigger + TextPlugin | 3.14.2 | Cinematic motion: micro, minute, macro levels |
| **Transitions** | Framer Motion | 12.23.2 | AnimatePresence for tab switches and mode transitions |
| **Charts** | Recharts | 2.15.4 | Data visualization (bar, pie, radar, line charts) |
| **Language** | TypeScript | 5.x | Full type safety across the codebase |
| **AI Backend** | z-ai-web-dev-sdk | 0.0.17 | LLM chat completions for the AI concierge |
| **ORM** | Prisma | 6.11.1 | Database client (ready for future data features) |
| **UI Kit** | shadcn/ui (Radix primitives) | latest | 40+ accessible headless components |
| **Icons** | Lucide React | 0.525.0 | Consistent icon system |
| **State** | Zustand | 5.0.6 | Lightweight client-side state management |
| **Forms** | React Hook Form + Zod | 7.60.0 / 4.0.2 | Form handling and validation |
| **Fonts** | Google Fonts | -- | Anton, Bebas Neue, Barlow Condensed, DM Mono, Oswald |
| **Package Manager** | Bun | latest | Fast install and script execution |
| **Deployment** | Vercel / GitHub Pages | -- | Production hosting with CI/CD |

---

## Architecture

### High-Level System Diagram

```
+==========================================================+
|                      layout.tsx                           |
|   Root: 5 Google Fonts, noise overlay, vignette, PWA meta |
+==========================+===============================+
|       page.tsx           |     portal/page.tsx            |
|   (dynamic ssr:false)    |   (long-scroll landing page)   |
|          |               |                                |
|   home-client.tsx        |  +-- Hero + Bio-Pulse SVG      |
|          |               |  +-- Stats Band (4 counters)   |
|  +-------+-------+       |  +-- Product Showcase (3D)     |
|  |  ModeGateway |       |  +-- Life Stage Timeline        |
|  |  (null)      |       |  +-- Mortality Calculator (HEV) |
|  +-------+------+       |  +-- ASEAN Chart (Recharts)     |
|  |  Advisor    |        |  +-- Myth Busting (6 flips)     |
|  |  (3-col)    |        |  +-- OFW Section                 |
|  |  Client     |        |  +-- AI Concierge (chat)         |
|  |  (1-col)    |        |  +-- Footer (4-col)              |
|  +--------------+        |                                |
+==========================+================================+
|              api/chat/route.ts                            |
|        (z-ai-web-dev-sdk AI backend)                      |
+==========================+================================+
|              lib/gsap-engine.ts (18 hooks)                 |
|              lib/data.ts (products, stats, FAQs, life      |
|              stages, spiel flow, social media, glossary)   |
+==========================+================================+
|              components/ (60+ files)                       |
|    sections/ | charts/ | animations/ | interactive/ | ui/  |
+==========================================================+
```

### Routing Table

| Route | Component | Description | SSR |
|---|---|---|---|
| `/` | `page.tsx` -> `home-client.tsx` | Advisor Hub / Client Hub (dual mode) | No (`ssr: false`) |
| `/portal` | `portal/page.tsx` | Public long-scroll landing page | Yes |
| `/api/chat` | `api/chat/route.ts` | AI concierge chat endpoint | Yes (API Route) |
| `/_not-found` | Next.js default | 404 page | Yes |

### Data Flow

```
[User Input] --> [Component State] --> [GSAP Hooks] --> [DOM Animation]
                    |                        |
                    +--> [Framer Motion] --> [AnimatePresence Transitions]
                    |
                    +--> [lib/data.ts] --> [Pricing Helpers]
                    |       |                   |
                    |       +--> [getBlueRoyalePremium()]
                    |       +--> [getFlexiShieldPremium()]
                    |
                    +--> [API /api/chat] --> [z-ai-web-dev-sdk] --> [LLM Response]
```

### Directory Structure

```
src/
+-- app/
|   +-- layout.tsx                  # Root layout (fonts, PWA meta, overlays)
|   +-- page.tsx                    # Dynamic import wrapper (ssr: false)
|   +-- home-client.tsx             # Main client component (gateway + dual-mode hub)
|   +-- globals.css                 # Brutalist design system (~1,500 lines)
|   +-- portal/
|   |   +-- page.tsx                # Long-scroll public landing page
|   |   +-- portal.css              # Portal-specific styles (~600 lines)
|   +-- api/
|       +-- route.ts                # Base API route
|       +-- chat/
|           +-- route.ts            # AI concierge endpoint
+-- components/
|   +-- ModeGateway.tsx             # Full-screen mode selector gateway
|   +-- ClientModeLayout.tsx        # Client mode single-column layout
|   +-- SocialCards.tsx             # Social media card previews (6 themes)
|   +-- ProductBadge.tsx            # Brutalist product badges
|   +-- animations/
|   |   +-- index.tsx               # Framer Motion animation components
|   +-- charts/
|   |   +-- insurance-charts.tsx    # Recharts visualizations (bar, pie, radar)
|   +-- interactive/
|   |   +-- flip-cards.tsx          # Flip card components
|   |   +-- quiz-flow.tsx           # Lifestyle quiz with persona results
|   |   +-- spiel-flow.tsx          # 5-step advisor spiel cards
|   +-- sections/
|   |   +-- home.tsx                # Command center hero (7 sections)
|   |   +-- products.tsx            # Product details (6 sub-views)
|   |   +-- advisor-playbook.tsx    # Spiel flow and objection handling
|   |   +-- social-media.tsx        # Content calendar and campaigns
|   |   +-- ph-insurance.tsx        # PH insurance data and ASEAN comparison
|   |   +-- training.tsx            # Training resources + PPTX download
|   |   +-- roadmap.tsx             # 30-60-90 day plan
|   |   +-- client-hub.tsx          # Client tools and estimator
|   +-- navigation/
|   |   +-- tab-switcher.tsx        # Bottom tab navigation bar
|   +-- ui/                         # 40+ shadcn/ui components
|       +-- button.tsx, card.tsx, dialog.tsx, tabs.tsx, ...
+-- lib/
|   +-- gsap-engine.ts              # GSAP v3.14 animation engine (18 hooks)
|   +-- data.ts                     # Product data, stats, FAQs, life stages
|   +-- db.ts                       # Prisma database client
|   +-- utils.ts                    # Utility functions (cn, etc.)
+-- hooks/
    +-- use-mobile.ts               # Mobile detection hook
    +-- use-toast.ts                # Toast notification hook
public/
+-- manifest.json                   # PWA manifest (standalone display)
+-- robots.txt                      # SEO robots configuration
+-- logo.svg                        # Pacific Cross SVG logo
+-- icon-192.png                    # PWA icon 192x192
+-- icon-512.png                    # PWA icon 512x512
+-- Pacific_Cross_Training_Deck.pptx # Downloadable training presentation
.github/
+-- workflows/
    +-- deploy-pages.yml            # GitHub Actions CI/CD for Pages
```

---

## Design System

The design system follows a **brutalist editorial** aesthetic -- "street-meets-editorial command center." Every visual decision prioritizes raw expression, legibility at a glance, and kinetic energy over decorative softness.

### Color Tokens

#### Dark Theme (default)

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#080808` | Primary background |
| `--bg-panel` | `#0f0f0f` | Elevated panel background |
| `--bg-elevated` | `#141414` | Elevated surface |
| `--bg-card` | `#111111` | Card background |
| `--bg-card-hover` | `#181818` | Card hover state |
| `--text` | `#f0ede6` | Primary text |
| `--text-muted` | `#888888` | Secondary text |
| `--text-dim` | `#555555` | Tertiary text |
| `--accent-red` | `#e01f1f` | Advisor mode accent, CTAs, alerts |
| `--accent-yellow` | `#f5c400` | FlexiShield product accent, highlights |
| `--accent-cyan` | `#00d4ff` | Client mode accent, Blue Royale |
| `--accent-green` | `#39d353` | Success states, positive indicators |
| `--border` | `#2a2a2a` | Default borders |
| `--cursor-color` | `#e01f1f` | Custom cursor dot |

#### Light Theme

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#f2eed8` | Primary background (warm cream) |
| `--bg-panel` | `#e8e4ce` | Elevated panel |
| `--bg-elevated` | `#ddd8c0` | Elevated surface |
| `--text` | `#0d0d0d` | Primary text |
| `--accent-red` | `#c41919` | Advisor accent (slightly muted) |
| `--accent-yellow` | `#d4a800` | FlexiShield accent |
| `--accent-cyan` | `#00a8cc` | Client mode accent |

#### Mode-Specific Accents

| Mode | Token | Value | Usage |
|---|---|---|---|
| Advisor | `--mode-accent` | `--accent-red` (#e01f1f) | Ticker, active states, mode dot |
| Client | `--mode-accent` | `#00d4ff` (cyan) | Ticker, active states, section titles |

### Typography Scale

| Class | Font Family | Weight | Size | Tracking | Usage |
|---|---|---|---|---|---|
| `.font-display` | Bebas Neue, Anton | 400 (regular) | `clamp(2rem, 8vw, 5rem)` | `-0.02em` | Headlines, hero text, stat values, section titles |
| `.font-sub` | Barlow Condensed, Oswald | 600-700 | 0.7-0.85rem | `0.08em` | Subheadings, labels, buttons, tags, navigation |
| `.font-mono` | DM Mono | 300-500 | 0.6-0.75rem | normal | Body text, metadata, code, data values |

Additional typographic utilities:
- `.text-stroke-red` -- Red outline text effect (dark mode hero headlines)
- `.text-stroke-yellow` -- Yellow outline text effect (dark mode hero headlines)
- `.highlight-yellow` / `.highlight-cyan` / `.highlight-red` -- Bottom-half highlight markers

### Spacing System

The spacing system uses Tailwind CSS 4 default scale with the brutalist grid system:

| Context | Value | Usage |
|---|---|---|
| Panel padding | `1.25rem` | `.panel` interior |
| Section gap | `2rem-4rem` | Between major sections |
| Grid gutters | `1px` border | Editorial grid column dividers |
| Card border | `1px solid var(--border)` | All card-like elements |
| Hard shadow | `4px 4px 0 var(--bg)` | `.card-comic` offset shadow |
| Large shadow | `6px 6px 0 var(--bg)` | `.card-comic-lg` offset shadow |
| Border radius | `0px` (always) | Brutalist rule -- never rounded |

### Component Library

#### Custom Brutalist Components

| Component | Class | Description |
|---|---|---|
| Hover Card | `.hover-card` | Card with top-border-draw animation on hover |
| CTA Button | `.btn-cta` | Primary button with shine sweep and magnetic hover |
| Yellow CTA | `.btn-cta-yellow` | Yellow variant for FlexiShield actions |
| Cyan CTA | `.btn-cta-cyan` | Cyan variant for Client Mode actions |
| Secondary CTA | `.btn-cta-secondary` | Ghost/outlined variant |
| Ghost Button | `.btn-ghost` | Minimal outlined button |
| Tag | `.tag` | Small uppercase label with border |
| Sticker | `.sticker` | Offset badge with hard shadow and rotation |
| Panel | `.panel` | Elevated container with header |
| Accordion | `.brutal-accordion-*` | Expand/collapse with hard edges |
| Pricing Table | `.pricing-table` | Red-header data table |
| Nav Link | `.nav-link` | Underline-draw navigation item |
| Product Badge | `.product-badge-*` | Brutalist product label (yellow/navy) |
| Social Card | `.social-card-*` | 6 themed card templates |

#### shadcn/ui Components (40+)

Full suite of Radix UI primitives including: Button, Card, Dialog, Sheet, Tabs, Accordion, Select, Input, Textarea, Slider, Switch, Checkbox, Radio, Toast, Tooltip, Popover, Dropdown Menu, Command, Carousel, Resizable, Sidebar, Form, Table, Calendar, Alert, Badge, Separator, Skeleton, Progress, Avatar, Breadcrumb, Hover Card, Aspect Ratio, Collapsible, Context Menu, Menubar, Navigation Menu, Scroll Area, Sonner (toast), Toggle, Toggle Group, Chart.

---

## GSAP Animation Engine

All animations are powered by **GSAP v3.14.2** with the **ScrollTrigger** and **TextPlugin** plugins, centralized in `/src/lib/gsap-engine.ts`. Every hook respects `prefers-reduced-motion` via `gsap.matchMedia()`.

### Micro Interactions (Cursor + Hover)

| # | Hook | Description |
|---|---|---|
| 1 | `useGsapMagnetic` | Magnetic hover pull for a single button with elastic snap-back |
| 2 | `useGsapMagneticAll` | Auto-applies magnetic hover to all `.btn-cta` and toggle buttons within scope |
| 3 | `useGsapCursorRing` | GSAP ticker-based smooth cursor ring with lerp interpolation and interactive scaling |
| 4 | `useGsapProductCards` | Stagger reveal + 3D perspective tilt on mousemove for product cards |

### Minute Interactions (Scroll + Counters)

| # | Hook | Description |
|---|---|---|
| 5 | `useGsapScrollReveal` | ScrollTrigger-based fade-in reveal for `.reveal-section` with staggered children |
| 6 | `useGsapCounter` | GSAP-powered count-up animation with prefix, suffix, decimals, and optional scroll trigger |
| 7 | `useGsapStatsBand` | Stats section entrance with staggered reveal, bar-fill (scaleX), and counter animations |
| 8 | `useGsapMarquee` | Infinite horizontal scroll ticker with pause-on-hover |
| 9 | `useGsapParallax` | Parallax layer movement on scroll with configurable speed |

### Macro Interactions (Page + Transitions)

| # | Hook | Description |
|---|---|---|
| 10 | `useGsapHeroSequence` | Cinematic page-load timeline: bio-pulse -> title -> subtitle -> badges -> CTAs -> scroll indicator |
| 11 | `useGsapBioPulse` | Animated concentric SVG rings expanding outward with staggered delays |
| 12 | `useGsapNavCascade` | Left sidebar stagger cascade + right sidebar slide-in on page load |
| 13 | `useGsapThemeTransition` | Cinematic red wipe animation for dark/light theme switch |
| 14 | `useGsapModeTransition` | Cinematic wipe animation for advisor/client mode switch |
| 15 | `useGsapTimelinePanels` | Life stage timeline with alternating side slides and accent bar wipes |
| 16 | `useGsapCalcSection` | Calculator section entrance with controls, results grid, and premium card stagger |
| 17 | `useGsapMythCards` | Myth busting cards stagger reveal on scroll |
| 18 | `useGsapPortalNav` | Portal sticky nav show/hide based on scroll direction with smooth GSAP tween |

### Supporting Hooks

| Hook | Description |
|---|---|
| `useGsapContext` | Base hook wrapping `gsap.context()` + `gsap.matchMedia()` for automatic cleanup. All 18 hooks use this internally. |
| `useGsapOfwSection` | OFW section entrance with header, benefits stagger, stat counters, and CTA reveal |
| `useGsapAISection` | AI concierge chatbox and suggestion chips entrance animation |
| `useGsapFooterReveal` | Footer grid columns stagger reveal on scroll |

> **Note:** Framer Motion is retained specifically for `AnimatePresence` transitions (tab content switches, mobile navigation expand/collapse, chat bubble enter/exit) and myth card 3D flip -- areas where GSAP does not provide built-in mount/unmount lifecycle support.

---

## Features

### Advisor Hub (Home Page)

- **Mode Gateway** -- Full-screen splash with two cinematic tiles for first-time visitors to choose their experience
- **3-Column Editorial Grid** -- Left navigation hub, center content workspace, right widget sidebar
- **Marquee Ticker** -- Infinite scrolling real-time stats ticker (GSAP-powered, pause-on-hover)
- **Custom Cursor** -- 8px dot + 36px lerp ring that scales on interactive elements (desktop only)
- **Noise + Vignette Overlay** -- Subtle texture and radial gradient for depth

### Product Center

- **Blue Royale Detail View** -- Plan selector (A/B/C), premium calculator with age slider, deductible discount options (15-40%), 10-item benefits accordion, key features, travel benefits, exclusions, waiting periods, contact info
- **FlexiShield Detail View** -- Tier selector (FS50-FS200), deductible info bar, premium calculator, full pricing table across 6 age brackets, 12-item benefits accordion, claim process (no-cash-outlay + reimbursement)
- **Comparison View** -- Radar chart and 13-row feature comparison table with alternating backgrounds
- **Calculator View** -- Unified calculator for both products with discount savings display and age bracket grid
- **Quiz View** -- 4-question lifestyle quiz with 3 persona result tiles (The Strategist, The Globetrotter, The Family Shield)

### Interactive Tools

- **HEV Mortality Calculator** -- Age, gender, and income inputs compute Human Economic Value, insurance gap, recommended coverage, and premium previews
- **Life Stage Timeline** -- 5 stages (Young Professional through Retirement) with product recommendations and tips
- **ASEAN Insurance Comparison** -- Horizontal bar chart comparing insurance penetration across 7 ASEAN countries (Recharts)
- **Myth Busting Section** -- 6 flip cards debunking common insurance misconceptions

### AI Concierge

- Real-time chat interface powered by `z-ai-web-dev-sdk`
- Comprehensive system prompt with full Pacific Cross product knowledge base
- Pre-loaded suggestion chips for common queries
- Branded chat bubble design with typing indicator

### Content and Training

- **Advisor Playbook** -- 5-step spiel flow (Discover, Educate, Personalize, Demonstrate, Commit) with objection handling scripts
- **Social Media Hub** -- Platform-specific posts (Facebook, Instagram), content calendar, 5 campaign templates (Wealth Armor, Hospital Hero, Choose Your Armor, Educator Not Seller, Protects Wallet Not Love)
- **Hashtag Strategy** -- 5 categories (Primary, Industry, Audience, Engagement, Campaign) with targeted tags
- **PH Insurance Data** -- Statistics, ASEAN comparisons, and market insights
- **Training Resources** -- Downloadable 22-slide PPTX training deck with charts and tables
- **30-60-90 Day Plan** -- Structured roadmap for new advisors with goals and milestones

### PWA Features

- Web App Manifest with `standalone` display mode
- Apple Web App metadata for iOS home screen installation
- Custom theme color and orientation lock (portrait-primary)
- 192px and 512px icons
- Offline-capable static content architecture

---

## Dual Mode System

The application offers two distinct experiences selectable via a full-screen gateway on first visit. The chosen mode persists in `localStorage` under the key `pcx-mode`.

### Advisor Mode

| Aspect | Detail |
|---|---|
| **Accent Color** | Red (`#e01f1f`) |
| **Layout** | 3-column editorial grid (260px sidebar / 1fr content / 300px widgets) |
| **Navigation** | Left sidebar with 9 nav items + 3 protection plan quick-access cards |
| **Ticker** | Red background with 8 scrolling stats |
| **Right Sidebar** | Trending Stats, Social Card Preview, Daily Insight, Expert Advisors, Protection Score, Contact |
| **Target User** | Licensed Pacific Cross insurance advisors |
| **Content Access** | All 8 sections: Home, Products, Playbook, Social, PH Data, Training, Roadmap, Client Hub |

### Client Mode

| Aspect | Detail |
|---|---|
| **Accent Color** | Cyan (`#00d4ff`) |
| **Layout** | Single-column discovery layout (max-width 720px, centered) |
| **Navigation** | Mobile bottom tab bar (Home, Products, Playbook, Social, Client) |
| **Ticker** | Cyan background with 8 scrolling stats |
| **Content** | Hero quiz teaser, product discovery cards with gradient panels, comparison table, lifestyle quiz, social proof testimonials, social card gallery, contact CTA |
| **Target User** | End clients exploring Pacific Cross products |
| **CTA Style** | `.btn-cta-cyan` cyan buttons |

### Transition Effects

- **Mode Switch** -- GSAP `useGsapModeTransition()` creates a cinematic red scaleY wipe (200ms in, 200ms out)
- **Theme Switch** -- GSAP `useGsapThemeTransition()` creates the same wipe effect for dark/light toggle (250ms)
- Both transitions use `gsap.matchMedia()` to respect reduced motion preferences

---

## Product Data

### Blue Royale -- Premium Worldwide Medical Plan

| Feature | Plan A | Plan B | Plan C |
|---|---|---|---|
| **Max Coverage** | USD 500,000 | USD 1,000,000 | USD 2,000,000 |
| **Starting Premium (19-25)** | $1,676/year | $2,698/year | $3,346/year |
| **Premium (26-30)** | $1,844/year | $3,382/year | $4,232/year |
| **Premium (31-35)** | $1,981/year | $3,707/year | $4,533/year |
| **Premium (36-40)** | $2,168/year | $4,064/year | $4,810/year |
| **Premium (41-45)** | $2,602/year | $4,378/year | $5,008/year |
| **Premium (46-50)** | $2,778/year | $4,689/year | $5,263/year |
| **Room (PH)** | $300/day (Private) | $600/day (Private) | $850/day (Private) |
| **Room (Overseas)** | $1,000/day | $1,500/day | $1,500/day |
| **Surgeon Fee** | Capped ($30K) | As Charged | As Charged |
| **Maternity** | Not Available | $5,000/ pregnancy (12mo wait) | $6,000/ pregnancy |
| **Supplementary OPD** | 80% up to $2,500/yr | As Charged (no limit) | As Charged (no limit) |
| **Dental** | Optional ($1K-$2K) | Included | Included |
| **Vision** | Not Available | $700/yr limit | As Charged |

**Key Features:**
- 30-day qualifying period (accidents covered immediately)
- 90 days per trip, unlimited trips per year
- Guaranteed renewable up to age 100
- No physical exam required
- Deductible discounts: $1K (15%), $2.5K (18-30%), $5K (24-40%), TAL (25%)

### FlexiShield -- Second Layer HMO Enhancer

| Tier | HMO Range | 0-20 yr | 21-35 yr | 36-45 yr | 46-55 yr | 56-65 yr | 66-70 yr |
|---|---|---|---|---|---|---|---|
| **FS 50** | PHP 50K-99K | P12,258 | P18,297 | P27,378 | P40,221 | P63,972 | -- |
| **FS 100** | PHP 100K-149K | P9,350 | P14,040 | P20,730 | P30,660 | P48,860 | -- |
| **FS 150** | PHP 150K-199K | P7,160 | P9,390 | P13,510 | P20,270 | P31,740 | -- |
| **FS 200** | PHP 200K+ | P6,510 | P7,500 | P10,440 | P15,790 | P24,190 | P30,260 |

**All tiers share:**
- Maximum Benefit Limit: PHP 2,000,000
- Hospital Income: PHP 1,000/day (up to 30 days/year)
- ICU/CCU/Telemetry: As Charged
- COVID-19 covered (pandemic exclusion waived)
- Claim methods: No-cash-outlay or Reimbursement
- ISO 9001:2015 Certified
- Ages 0-70 (FS 200 only for ages 66-70)

---

## API Routes

### POST `/api/chat`

AI-powered insurance concierge endpoint using the `z-ai-web-dev-sdk`.

**Request:**

```json
POST /api/chat
Content-Type: application/json

{
  "message": "What is FlexiShield and how does it work?",
  "context": "general"
}
```

| Parameter | Type | Required | Description |
|---|---|---|---|
| `message` | string | Yes | The user's question or message |
| `context` | string | No | Optional context tag (e.g., `"blue-royale"`, `"flexishield"`) |

**Response (200):**

```json
{
  "reply": "FlexiShield is a second-layer HMO enhancer..."
}
```

**Error Response (500):**

```json
{
  "reply": "Sorry, I encountered an error. Please try again later."
}
```

**System Prompt:** The AI is configured with comprehensive Pacific Cross product knowledge including Blue Royale plans A/B/C, FlexiShield tiers FS50-FS200, key statistics (1.79% PH penetration, 70% uninsured, OFW data), contact information, and response guidelines. It uses `max_tokens: 500` and `temperature: 0.7`.

---

## Getting Started

### Prerequisites

- **Node.js** 18+ or **Bun** 1.0+
- **Git**
- A code editor (VS Code recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/<username>/pacific-cross-advisor-hub.git
cd pacific-cross-advisor-hub

# Install dependencies
bun install

# (Optional) Set up environment variables
cp .env.example .env

# Start the development server
bun run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Available Scripts

```bash
bun run dev       # Start dev server on port 3000 (with dev.log)
bun run build     # Production build with standalone output
bun run start     # Start production server from standalone build
bun run lint      # Run ESLint
bun run db:push   # Push Prisma schema to database
bun run db:generate # Generate Prisma client
```

### Environment Variables

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production URL for SEO/OG tags | `http://localhost:3000` |
| `NEXT_PUBLIC_STATIC_EXPORT` | Set to `"true"` for GitHub Pages static export | `undefined` (standalone) |
| `NEXT_PUBLIC_BASE_PATH` | GitHub Pages base path (auto-set in CI) | `""` |

---

## Deployment

### Vercel (Recommended -- Full Functionality)

Vercel supports both static pages and API routes, making it the recommended deployment target.

```bash
# Install Vercel CLI
bun add -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

**Vercel Configuration** (`vercel.json`):
- Build command: `bun run build`
- Region: Hong Kong (`hkg1`)
- Security headers: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `X-XSS-Protection: 1; mode=block`

**Required Environment Variables on Vercel:**
- `NEXT_PUBLIC_SITE_URL` -- Your production URL (e.g., `https://your-app.vercel.app`)

### GitHub Pages (Static Export -- Limited)

The project includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml` that automatically deploys to GitHub Pages on push to `main`.

```bash
# Set environment variable for static export
export NEXT_PUBLIC_STATIC_EXPORT=true
export NEXT_PUBLIC_BASE_PATH="/your-repo-name"

# Build static export
bun run build

# Output will be in ./out/
```

**Important Limitations:**
- API routes (`/api/chat`) are **not available** on GitHub Pages
- The AI concierge chat will not function without a server
- Use Vercel for the complete experience including AI chat

### Docker (Standalone)

```bash
# Build the standalone output
bun run build

# The standalone server is at .next/standalone/server.js
NODE_ENV=production node .next/standalone/server.js
```

---

## Contributing

Contributions are welcome. Please follow these guidelines:

1. **Fork** the repository and create your feature branch: `git checkout -b feature/my-feature`
2. **Follow** the existing code style -- brutalist design system rules (zero border-radius, hard shadows, uppercase labels)
3. **Test** locally with `bun run dev` and verify both dark and light themes
4. **Lint** before committing: `bun run lint`
5. **Commit** with descriptive messages: `git commit -m 'Add Blue Royale deductible calculator'`
6. **Push** to your branch: `git push origin feature/my-feature`
7. **Open** a Pull Request with a clear description of changes

### Design System Rules

When contributing UI changes:
- **Never** use `border-radius` -- always `0px` (sharp corners only)
- **Never** use `box-shadow` with blur -- always hard offset shadows (`4px 4px 0`)
- **Always** use CSS custom properties for colors (`var(--accent-red)`, etc.)
- **Always** respect `prefers-reduced-motion` in new animations
- **Use** the typography classes: `.font-display`, `.font-sub`, `.font-mono`
- **Emojis** are allowed as decorative accents only (`aria-hidden="true"`), never in titles or buttons

---

## License

MIT License

Copyright (c) 2025 Pacific Cross Insurance Advisor Hub

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

> Built for Pacific Cross Insurance Philippines. Not officially affiliated with Pacific Cross Insurance.

<p align="center">
  <strong>PACIFIC<span style="color:#e01f1f">&times;</span>CROSS</strong><br/>
  <em>Protect Your Future. No Cap.</em>
</p>
