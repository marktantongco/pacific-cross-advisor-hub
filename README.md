# 🛡️ Pacific Cross Advisor Hub

<div align="center">

![Pacific Cross Advisor Hub](https://img.shields.io/badge/Pacific%20Cross-Advisor%20Hub-f97316?style=for-the-badge&logo=shield&logoColor=white)

**A Progressive Web App for Pacific Cross Insurance Advisors**

[![Next.js](https://img.shields.io/badge/Next.js%2016-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[🌐 Live Demo](#-live-demo) • [📱 Features](#-features) • [🚀 Quick Start](#-quick-start) • [📖 Documentation](#-documentation)

</div>

---

## 📋 Overview

**Pacific Cross Advisor Hub** is a comprehensive Progressive Web App (PWA) designed for insurance advisors selling **Blue Royale** and **FlexiShield** products in the Philippines. Built with a **brutalist Gen-Z design aesthetic**, this app helps new advisors learn, practice spiels, and protect Filipino families.

### 🎯 The Problem

The Philippines has one of the lowest insurance penetration rates in Southeast Asia at only **1.78%**. This means millions of Filipino families are vulnerable to financial hardship from unexpected medical expenses.

### 💡 The Solution

This app empowers new insurance advisors with:
- 📚 **Learning materials** for product knowledge
- 🎤 **Conversation spiels** for client interactions
- 📅 **Roadmap & calendar** for goal tracking
- 🎬 **Presentation deck** for client meetings
- 🌍 **OFW-focused content** for overseas Filipino families

---

## 🌐 Live Demo

| Platform | Status | URL |
|----------|--------|-----|
| **Vercel** | ![Deploy](https://img.shields.io/badge/Status-Live-success?style=flat-square) | [pacific-cross-advisor-hub.vercel.app](https://pacific-cross-advisor-hub.vercel.app) |
| **GitHub Pages** | ![Deploy](https://img.shields.io/badge/Status-Live-success?style=flat-square) | [marktantongco.github.io/pacific-cross-advisor-hub](https://marktantongco.github.io/pacific-cross-advisor-hub) |

---

## 📱 Features

### 🏠 Home Dashboard
- Welcome hero section for new advisors
- Real-time market statistics marquee
- Product preview cards
- Myth busters section addressing common misconceptions

### 🛡️ Products Section
#### Blue Royale (Premium Global Plan)
- International coverage up to ₱15,000,000
- Worldwide medical access
- Direct billing network
- Ideal for frequent travelers and OFWs

#### FlexiShield (Top-Up Plan)
- Affordable extra coverage starting at ₱50,000
- HMO supplement protection
- Flexible enrollment (ages 0-70)
- Perfect for families and budget-conscious clients

### 📚 Learning Center
- Comprehensive FAQ system
- Philippine insurance market insights
- Common misconceptions with facts
- Downloadable training materials

### 💬 Conversation Spiels
- **Opening** scripts for initial contact
- **Discovery** questions for needs analysis
- **Presentation** talking points
- **Objection handling** responses
- **Closing** techniques
- Copy-to-clipboard functionality

### 🎯 Roadmap
- Step-by-step advisor journey
- Progress tracking
- Milestone achievements
- Actionable tasks

### 📅 Calendar
- Important dates and events
- Training schedules
- Compliance deadlines
- Client follow-up reminders

### 🎬 Presentation Deck
- Interactive slide viewer
- Full-screen presentation mode
- Downloadable as PDF/PPTX
- Shareable with clients

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ or **Bun** runtime
- **Git** for version control

### Installation

```bash
# Clone the repository
git clone https://github.com/marktantongco/pacific-cross-advisor-hub.git
cd pacific-cross-advisor-hub

# Install dependencies (using Bun)
bun install

# Set up the database
bun run db:push
bun run db:seed

# Start development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database (SQLite - default)
DATABASE_URL="file:./dev.db"

# Optional: Analytics
NEXT_PUBLIC_ANALYTICS_ID="your-analytics-id"

# Optional: Vercel deployment
AI_GATEWAY_API_KEY="your-vercel-api-key"
```

---

## 📖 Documentation

### Project Structure

```
pacific-cross-advisor-hub/
├── 📁 src/
│   ├── 📁 app/                 # Next.js App Router
│   │   ├── 📁 api/            # API Routes
│   │   ├── 📄 page.tsx        # Main Application
│   │   ├── 📄 layout.tsx      # Root Layout
│   │   └── 📄 globals.css     # Global Styles
│   ├── 📁 components/          # React Components
│   │   └── 📁 ui/             # shadcn/ui Components
│   ├── 📁 hooks/              # Custom Hooks
│   └── 📁 lib/                # Utilities
├── 📁 prisma/                  # Database Schema
├── 📁 public/                  # Static Assets
│   ├── 📁 download/           # PDF/PPTX Files
│   └── 📄 manifest.json       # PWA Manifest
├── 📄 package.json            # Dependencies
├── 📄 next.config.ts          # Next.js Config
├── 📄 tailwind.config.ts      # Tailwind Config
└── 📄 README.md               # This file
```

### Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **UI Components** | shadcn/ui |
| **Database** | Prisma ORM + SQLite |
| **State** | Zustand + TanStack Query |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Deployment** | Vercel / GitHub Pages |

### Available Scripts

```bash
# Development
bun run dev          # Start dev server on port 3000

# Build
bun run build        # Production build for Vercel
bun run build:pages  # Static build for GitHub Pages

# Database
bun run db:push      # Push schema changes
bun run db:seed      # Seed initial data
bun run db:migrate   # Run migrations

# Quality
bun run lint         # Run ESLint
bun run lint:fix     # Fix linting issues
```

---

## 🎨 Design System

### Brutalist Gen-Z Aesthetic

This app features a **brutalist design** with:
- **Sharp edges** and bold borders
- **High contrast** colors
- **Bold typography** with uppercase tracking
- **Raw, unpolished** aesthetic
- **Intentional harshness** for impact

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| **Primary** | `#000000` | Text, borders |
| **Accent** | `#f97316` | CTAs, highlights |
| **Background** | `#fafafa` | Page background |
| **Muted** | `#f4f4f5` | Cards, sections |
| **Destructive** | `#ef4444` | Errors, warnings |

### CSS Classes

```css
.brutal-card     /* Sharp bordered card */
.brutal-btn      /* Bold button style */
.brutal-btn-accent /* Accent colored button */
```

---

## 🚢 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/marktantongco/pacific-cross-advisor-hub)

1. Fork this repository
2. Click the deploy button above
3. Connect your GitHub account
4. Add environment variables
5. Deploy!

### GitHub Pages

```bash
# Build for GitHub Pages
bun run build:pages

# Output in ./out directory
# Deploy to GitHub Pages via Actions
```

### Manual Deployment

```bash
# Build the application
bun run build

# Start production server
bun run start
```

---

## 📊 Market Insights

### Philippine Insurance Landscape

| Metric | Value | Year |
|--------|-------|------|
| Insurance Penetration | **1.78%** | 2023 |
| Population | **117M** | 2024 |
| Middle Class | **12M+** | Growing |
| OFWs | **10M+** | Global |
| Uninsured | **98%+** | Opportunity |

### Target Markets

1. **Local Middle Class** - Growing financial awareness
2. **OFW Families** - Remittance protection
3. **Young Professionals** - Digital-first generation
4. **Small Business Owners** - Business continuity

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Pacific Cross** for insurance products and training materials
- **shadcn/ui** for the beautiful component library
- **Vercel** for seamless deployment
- **The Filipino People** for the inspiration to protect families

---

## 📞 Support

- 📧 Email: support@pacificcross.com.ph
- 💬 Discord: [Join our community](https://discord.gg/pacificcross)
- 📚 Documentation: [docs.pacificcross-advisor-hub.com](https://docs.pacificcross-advisor-hub.com)

---

<div align="center">

**Made with ❤️ for Filipino Insurance Advisors**

[⬆ Back to Top](#-pacific-cross-advisor-hub)

</div>
