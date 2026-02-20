#!/bin/bash
cd ~/Desktop/Business\ Hub\ Demo\ Site

echo "🔤 Swapping to Inter + Playfair Display..."

# ── UPDATE index.html to load new Google Fonts ─────────────────────────────────
cat > index.html << 'EOF'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/x-icon" href="/images/logo.jpg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Business Hub Faisalabad — Premium Drive-Thru Commercial Project on Sargodha Road by Fatir Developers." />
    <title>Business Hub Faisalabad</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600;1,700&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
EOF

# ── UPDATE index.css ────────────────────────────────────────────────────────────
cat > src/index.css << 'EOF'
@import "tailwindcss";

@layer base {
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background-color: #ffffff;
    color: #111111;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
  h1, h2, h3, h4, h5 {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
  }
  p, span, a, li, button, input, textarea {
    font-family: 'Inter', sans-serif;
    font-weight: 500;
  }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: #ffffff; }
  ::-webkit-scrollbar-thumb { background: #c9a84c; }
  * { -webkit-tap-highlight-color: transparent; }
}
EOF

# ── SWAP FONTS in Home.jsx ──────────────────────────────────────────────────────
sed -i '' \
  -e "s/fontFamily:'Cormorant Garamond,serif'/fontFamily:'Playfair Display,serif'/g" \
  -e "s/fontFamily: 'Cormorant Garamond,serif'/fontFamily: 'Playfair Display,serif'/g" \
  -e "s/fontFamily:\"Cormorant Garamond,serif\"/fontFamily:\"Playfair Display,serif\"/g" \
  -e "s/'Cormorant Garamond, serif'/'Playfair Display, serif'/g" \
  -e "s/fontFamily:'Montserrat'/fontFamily:'Inter'/g" \
  -e "s/fontFamily: 'Montserrat'/fontFamily: 'Inter'/g" \
  -e "s/fontFamily:\"Montserrat\"/fontFamily:\"Inter\"/g" \
  src/pages/Home.jsx

# ── SWAP FONTS in Navbar.jsx ────────────────────────────────────────────────────
sed -i '' \
  -e "s/Cormorant Garamond,serif/Playfair Display,serif/g" \
  -e "s/'Cormorant Garamond'/'Playfair Display'/g" \
  -e "s/fontFamily:'Montserrat'/fontFamily:'Inter'/g" \
  -e "s/fontFamily: 'Montserrat'/fontFamily: 'Inter'/g" \
  src/components/Navbar.jsx

# ── SWAP FONTS in Footer.jsx ────────────────────────────────────────────────────
sed -i '' \
  -e "s/Cormorant Garamond,serif/Playfair Display,serif/g" \
  -e "s/'Cormorant Garamond'/'Playfair Display'/g" \
  -e "s/fontFamily:'Montserrat'/fontFamily:'Inter'/g" \
  -e "s/fontFamily: 'Montserrat'/fontFamily: 'Inter'/g" \
  src/components/Footer.jsx

# ── SWAP FONTS in WhatsApp.jsx ──────────────────────────────────────────────────
sed -i '' \
  -e "s/fontFamily:'Montserrat'/fontFamily:'Inter'/g" \
  -e "s/fontFamily: 'Montserrat'/fontFamily: 'Inter'/g" \
  src/components/WhatsApp.jsx

# ── SWAP FONTS in Ticker.jsx ────────────────────────────────────────────────────
sed -i '' \
  -e "s/fontFamily:'Montserrat'/fontFamily:'Inter'/g" \
  -e "s/fontFamily: 'Montserrat'/fontFamily: 'Inter'/g" \
  src/components/Ticker.jsx

echo ""
echo "✅ Font swap done. Building..."
pnpm build

if [ $? -ne 0 ]; then
  echo "❌ Build failed"
  exit 1
fi

git add .
git commit -m "🔤 Font swap: Cormorant Garamond → Playfair Display, Montserrat → Inter

- Playfair Display: bold, confident, legible serif for all headings
- Inter: the gold standard for UI readability, clean and thick
- Loaded via Google Fonts with correct weight range (400-800)
- Applied across all components sitewide"
git push origin main

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Pushed — Vercel deploying now"
echo "🌐 Live in ~60 seconds"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"