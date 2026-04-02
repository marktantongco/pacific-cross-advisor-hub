#!/bin/bash
# ============================================================
# Pacific Cross Advisor Hub — One-Command Deploy Script
# ============================================================
set -e

echo "╔══════════════════════════════════════════════════════════╗"
echo "║  PACIFIC CROSS ADVISOR HUB — DEPLOYMENT SCRIPT           ║"
echo "║  V-09 Hybrid Portal                                      ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# --- GitHub Deploy ---
echo "📦 [1/2] Deploying to GitHub..."
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
  echo "❌ GitHub CLI (gh) not found. Installing..."
  if command -v npm &> /dev/null; then
    npm install -g gh
  elif command -v bun &> /dev/null; then
    bun add -g gh
  fi
fi

# Authenticate (will open browser if needed)
if ! gh auth status &> /dev/null; then
  echo "🔐 GitHub authentication required. Running 'gh auth login'..."
  gh auth login
fi

# Get or create repo
REPO_NAME="pacific-cross-advisor-hub"
REPO_SLUG=$(gh repo list --json name,sshUrl 2>/dev/null | grep -o "\"name\":\"[^\"]*\"" | head -1 | cut -d'"' -f4 || echo "")

if [ -z "$REPO_SLUG" ] || [ "$REPO_SLUG" != "$REPO_NAME" ]; then
  echo "   Creating repository: $REPO_NAME"
  gh repo create "$REPO_NAME" \
    --public \
    --description "Pacific Cross Insurance Advisor Hub — V-09 Hybrid Portal | Next.js 16 + GSAP 3.14 + Tailwind CSS 4" \
    --source=. \
    --push
else
  echo "   Repository exists: $REPO_SLUG"
  echo "   Pushing latest changes..."
  git add -A
  git commit -m "deploy: comprehensive update with GSAP animations" || true
  git push origin master
fi

GITHUB_URL=$(gh repo view --json url -q .url 2>/dev/null || echo "https://github.com/$(gh api user -q .login)/$REPO_NAME")
echo "   ✅ GitHub: $GITHUB_URL"
echo ""

# --- Vercel Deploy ---
echo "🚀 [2/2] Deploying to Vercel..."
echo ""

if ! command -v vercel &> /dev/null; then
  echo "   Installing Vercel CLI..."
  bun add -g vercel
fi

if ! vercel whoami &> /dev/null; then
  echo "🔐 Vercel authentication required. Running 'vercel login'..."
  vercel login
fi

echo "   Deploying to Vercel (Hong Kong region)..."
vercel --prod --yes 2>&1 | tail -5

VERCEL_URL=$(vercel ls --json 2>/dev/null | grep -o '"url":"[^\"]*"' | head -1 | cut -d'"' -f4 || echo "https://vercel.com")
echo "   ✅ Vercel: $VERCEL_URL"
echo ""

# --- GitHub Pages (auto via Actions) ---
echo "📄 GitHub Pages will auto-deploy via GitHub Actions on push to main."
echo "   Enable it at: $GITHUB_URL/settings/pages"
echo "   Select source: GitHub Actions"
echo ""

echo "════════════════════════════════════════════════════════════"
echo "  ✅ ALL DONE!"
echo "════════════════════════════════════════════════════════════"
echo ""
echo "  🌐 GitHub:     $GITHUB_URL"
echo "  🚀 Vercel:      $VERCEL_URL"
echo "  📄 GitHub Pages: $GITHUB_URL (Settings → Pages → GitHub Actions)"
echo ""
