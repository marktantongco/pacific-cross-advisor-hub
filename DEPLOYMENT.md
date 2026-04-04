# Deployment Guide

This guide covers deploying Pacific Cross Advisor Hub to GitHub Pages and Vercel.

---

## 🚀 Quick Deploy

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/marktantongco/pacific-cross-advisor-hub)

1. Click the button above
2. Connect your GitHub account
3. Configure project settings
4. Deploy!

---

## 📦 GitHub Pages Deployment

### Method 1: Automatic (GitHub Actions)

1. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: GitHub Actions

2. **Push to main branch**
   ```bash
   git push origin main
   ```

3. **Wait for deployment**
   - Check Actions tab for progress
   - Site will be live at `https://marktantongco.github.io/pacific-cross-advisor-hub`

### Method 2: Manual Build

1. **Build for GitHub Pages**
   ```bash
   bun run build:pages
   ```

2. **Deploy to gh-pages branch**
   ```bash
   git add out -f
   git commit -m "Deploy to GitHub Pages"
   git subtree push --prefix out origin gh-pages
   ```

---

## ▲ Vercel Deployment

### Method 1: Vercel Dashboard

1. **Import Project**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository: `marktantongco/pacific-cross-advisor-hub`

2. **Configure Project**
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `bun run build`
   - Output Directory: `.next`

3. **Environment Variables**
   - `DATABASE_URL` - SQLite database path (optional for demo)
   - `AI_GATEWAY_API_KEY` - Vercel AI Gateway API key (optional)

4. **Deploy**
   - Click Deploy
   - Wait for build to complete

### Method 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

---

## ⚙️ Configuration Files

### vercel.json

```json
{
  "framework": "nextjs",
  "buildCommand": "bun run build",
  "installCommand": "bun install"
}
```

### next.config.ts

The config automatically detects deployment target:
- GitHub Pages: Uses `export` output with base path
- Vercel: Uses `standalone` output

---

## 🔧 Environment Variables

Create `.env` file with:

```env
# Database
DATABASE_URL="file:./dev.db"

# Vercel AI Gateway (optional - for AI features)
AI_GATEWAY_API_KEY="your-vercel-ai-gateway-api-key"
```

For Vercel, add these in the dashboard under Settings → Environment Variables.

---

## 📝 Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] All pages navigate properly
- [ ] API routes work (if using Vercel)
- [ ] Images display correctly
- [ ] PWA manifest is accessible
- [ ] Mobile responsive design works

---

## 🐛 Troubleshooting

### GitHub Pages Issues

**Blank page on GitHub Pages:**
- Check `basePath` in next.config.ts matches repo name
- Ensure trailingSlash is true

**Images not loading:**
- Use relative paths for images
- Check `unoptimized: true` for static export

### Vercel Issues

**Build fails:**
- Check Node.js version (18+)
- Verify all dependencies are installed
- Check build logs for specific errors

**API routes not working:**
- Ensure using `standalone` output
- Check function timeout settings

---

## 🔗 Useful Links

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Live Demo](https://marktantongco.github.io/pacific-cross-advisor-hub)
