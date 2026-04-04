# 🛡️ Pacific Cross Advisor Hub

<div align="center">

![Pacific Cross Advisor Hub](public/hero-shield.png)

**A comprehensive Progressive Web App (PWA) for insurance advisors**

*Learn • Practice • Protect Filipino Families*

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

[🚀 Live Demo](#) | [📖 Documentation](#documentation) | [🐛 Report Bug](../../issues) | [✨ Request Feature](../../issues)

</div>

---

## 📋 Table of Contents

- [About The Project](#about-the-project)
- [Features](#features)
- [Products Covered](#products-covered)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🎯 About The Project

Pacific Cross Advisor Hub is a **full-stack Progressive Web App** designed to help new insurance advisors learn, practice, and grow their business. Built with a **brutalist Gen-Z design aesthetic**, it provides comprehensive training materials, conversation scripts, and tools for selling health insurance products in the Philippines.

### Why This Project?

The Philippines has one of the lowest insurance penetration rates in Southeast Asia at only **1.78%**. This creates an enormous opportunity for advisors to make a real impact by protecting Filipino families. This hub bridges the gap between product knowledge and practical sales skills.

### Key Highlights

- 📱 **PWA Ready** - Install as a mobile app
- 🎨 **Brutalist Design** - Bold, high-contrast, Gen-Z aesthetic
- 📊 **Interactive Learning** - Q&A, spiels, and roadmaps
- 📥 **Downloadable Materials** - PDF and PPTX presentations
- 📅 **Progress Tracking** - Interactive checklist and calendar
- 🌐 **Offline Capable** - Works without internet

---

## ✨ Features

### 🏠 Home Dashboard
- Real-time Philippine insurance statistics
- Product preview cards
- Market insights marquee
- Quick access to all features

### 🛡️ Products Section
Comprehensive information about Pacific Cross products:

| Feature | Blue Royale | FlexiShield |
|---------|-------------|-------------|
| Coverage | Up to USD 2M | Up to PHP 2M |
| Type | Premium Global | Top-Up Plan |
| Network | Worldwide | Philippines |
| Best For | Executives, Travelers | Employees, Families |

### 📚 Learning Center
- **10 FAQs** covering products, claims, and advisor tips
- **8 Myth Busters** addressing common misconceptions
- Philippine insurance landscape analysis
- Market statistics and opportunities

### 💬 Conversation Spiels
Ready-to-use scripts for every scenario:
- Opening conversations
- Discovery questions
- Product presentations
- Objection handling
- Closing techniques
- OFW family approaches

### 🗺️ Advisor Roadmap
- 12-step progressive training path
- Week 1 → Month 3 → Ongoing
- Interactive progress tracking
- Actionable milestones

### 📅 Calendar & Events
- Visual calendar view
- Training session schedules
- Deadline reminders
- Recurring events support

### 📊 Presentation Deck
- 9-slide interactive viewer
- Downloadable PDF (55KB)
- Downloadable PPTX (39KB)
- Shareable with clients

---

## 🏥 Products Covered

### Blue Royale
> *Premium Global Health Coverage*

**Key Features:**
- Up to USD 2,000,000 annual coverage
- Worldwide hospital access
- Direct billing at accredited facilities
- Travel insurance included
- Maternity coverage available

**Ideal For:** Executives, Frequent Travelers, Expats, OFW Families

**Starting Price:** From $3,500/year

### FlexiShield
> *Your Affordable Top-Up Protection*

**Key Features:**
- Up to PHP 2,000,000 per illness
- Works with existing HMO
- COVID-19 coverage included
- No medical exam required
- Quick reimbursement process

**Ideal For:** Employees with HMO, Young Professionals, Budget-Conscious Families

**Starting Price:** From ₱15,000/year

---

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **UI Components** | shadcn/ui |
| **Database** | SQLite with Prisma ORM |
| **State Management** | Zustand + TanStack Query |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Package Manager** | Bun |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or bun package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pacific-cross-advisor-hub.git
   cd pacific-cross-advisor-hub
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Set up the database**
   ```bash
   bun run db:push
   bun run db:seed  # If seed script is configured
   ```

4. **Start the development server**
   ```bash
   bun run dev
   # or
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

---

## 📖 Usage

### For New Advisors

1. **Start with Home** - Get an overview of products and market stats
2. **Explore Products** - Learn Blue Royale and FlexiShield in detail
3. **Study FAQs** - Understand common questions and answers
4. **Practice Spiels** - Use conversation scripts for practice
5. **Follow Roadmap** - Track your progress through training milestones

### For Clients

1. **View Products** - Compare insurance options
2. **Read Myth Busters** - Clear up misconceptions
3. **Download Presentations** - Share with family members

### PWA Installation

1. Visit the app on your mobile device
2. Tap "Add to Home Screen" in your browser menu
3. The app will be installed and work offline

---

## 📁 Project Structure

```
pacific-cross-advisor-hub/
├── 📂 prisma/
│   └── schema.prisma          # Database schema
├── 📂 public/
│   ├── manifest.json          # PWA manifest
│   ├── hero-shield.png        # Generated hero image
│   └── advisor-family.png     # Generated concept image
├── 📂 src/
│   ├── 📂 app/
│   │   ├── 📂 api/            # API routes
│   │   │   ├── products/
│   │   │   ├── faqs/
│   │   │   ├── spiels/
│   │   │   ├── stats/
│   │   │   ├── roadmap/
│   │   │   ├── misconceptions/
│   │   │   ├── slides/
│   │   │   ├── events/
│   │   │   └── social/
│   │   ├── globals.css        # Brutalist design system
│   │   ├── layout.tsx         # Root layout with PWA meta
│   │   └── page.tsx           # Main SPA component
│   ├── 📂 components/
│   │   └── 📂 ui/             # shadcn/ui components
│   ├── 📂 hooks/              # Custom React hooks
│   └── 📂 lib/
│       ├── db.ts              # Prisma client
│       └── utils.ts           # Utility functions
├── 📂 download/
│   ├── pacific_cross_training_deck.pdf
│   └── pacific_cross_training_deck.pptx
├── 📂 skills/                 # AI skills and scripts
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🔌 API Reference

### Products
```
GET /api/products
```
Returns all active insurance products.

### FAQs
```
GET /api/faqs?category={category}
```
Returns FAQs filtered by category (general, product, claims, advisor).

### Spiels
```
GET /api/spiels?category={category}
```
Returns conversation scripts filtered by type (opening, discovery, presentation, objection, closing).

### Market Statistics
```
GET /api/stats
```
Returns Philippine insurance market statistics.

### Roadmap
```
GET /api/roadmap
PATCH /api/roadmap
```
Get or update roadmap progress.

### Events
```
GET /api/events
POST /api/events
```
Manage calendar events.

---

## 🚢 Deployment

### GitHub Pages

The project is configured for static export to GitHub Pages:

```bash
# Build for GitHub Pages
bun run build
```

The static files will be in the `out` directory.

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Deploy**
   - Click "Deploy"
   - Your app will be live in minutes!

### Environment Variables

Create a `.env` file:
```env
DATABASE_URL="file:../db/custom.db"
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the Project**
2. **Create your Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your Changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Code Style
- Use TypeScript strict mode
- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

**Pacific Cross Philippines**
- Website: [pacificcross.com.ph](https://www.pacificcross.com.ph)
- Training Portal: [keystone.com.ph/learning-hub](https://keystone.com.ph/learning-hub)

**Project Maintainer**
- GitHub: [@yourusername](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- [Pacific Cross Philippines](https://www.pacificcross.com.ph) for product information
- [Keystone](https://keystone.com.ph) for training resources
- [shadcn/ui](https://ui.shadcn.com) for beautiful components
- [Vercel](https://vercel.com) for hosting platform
- The Filipino insurance advisor community

---

<div align="center">

**Built with ❤️ for Filipino Insurance Advisors**

*Protecting families, one policy at a time.*

[⬆ Back to Top](#-pacific-cross-advisor-hub)

</div>
