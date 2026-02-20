#!/bin/bash
cd ~/Desktop/Business\ Hub\ Demo\ Site

echo "📦 Installing dependencies if needed..."
pnpm install

echo ""
echo "🔨 Building project first to make sure it compiles clean..."
pnpm build

if [ $? -ne 0 ]; then
  echo "❌ Build failed — fix errors before pushing"
  exit 1
fi

echo ""
echo "🐙 Setting up Git..."
rm -rf .git
git init
git branch -M main

echo ""
echo "🔗 Connecting to your GitHub repo..."
git remote add origin https://github.com/AbdullahHaidergencodix/BusinessHUBfaisalabad.git

echo ""
echo "📝 Creating .gitignore..."
cat > .gitignore << 'EOF'
node_modules/
dist/
.DS_Store
*.local
.env
.env.*
EOF

echo ""
echo "📝 Creating README..."
cat > README.md << 'EOF'
# Business Hub Faisalabad

> Sargodha Road's New Identity — An iconic drive-thru commercial project by Fatir Developers Pvt. Ltd.

## Tech Stack
- React 18
- Vite
- Framer Motion
- Tailwind CSS v4
- React Router DOM
- Lucide React

## Getting Started

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

## Live
[businesshubfaisalabad.com](https://businesshubfaisalabad.com)
EOF

echo ""
echo "➕ Staging all files..."
git add .

echo ""
echo "💾 Committing..."
git commit -m "🏢 Business Hub Faisalabad — Full luxury commercial website

- Hero slider with cinematic overlays (no text collision)
- Stats bar, About, Features sections
- Why Sargodha Road — location intelligence stats
- Payment plan breakdown — 4 unit sizes with full calculations
- Masonry gallery with lightbox
- Chairman section — Ch. Abdul Rehman
- Google Maps location embed + distance guide
- CTA banner + Contact section
- Gold ticker marquee
- Full SEO — meta, OG, Twitter Card, Schema.org
- Mobile optimized — clamp() fluid typography throughout
- Framer Motion animations throughout

By Fatir Developers Pvt. Ltd."

echo ""
echo "🚀 Force pushing to GitHub main branch..."
git push -f origin main

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Successfully pushed to:"
  echo "   https://github.com/AbdullahHaidergencodix/BusinessHUBfaisalabad"
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "💡 NEXT STEP — Deploy free on Vercel:"
  echo ""
  echo "  1. Go to https://vercel.com"
  echo "  2. Sign in with GitHub"
  echo "  3. Click 'Add New Project'"
  echo "  4. Import 'BusinessHUBfaisalabad'"
  echo "  5. Framework: Vite  |  Build: pnpm build  |  Output: dist"
  echo "  6. Hit Deploy — live in 60 seconds"
  echo ""
  echo "  Then point businesshubfaisalabad.com DNS to Vercel"
  echo "  and you're fully live with HTTPS, CDN, auto-deploys."
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
else
  echo ""
  echo "❌ Push failed. Most likely you need to authenticate."
  echo ""
  echo "Run this to fix it:"
  echo "  git remote set-url origin https://YOUR_GITHUB_TOKEN@github.com/AbdullahHaidergencodix/BusinessHUBfaisalabad.git"
  echo ""
  echo "Get your token at: https://github.com/settings/tokens"
  echo "Scopes needed: repo (full control)"
fi