#!/bin/bash
cd ~/Desktop/Business\ Hub\ Demo\ Site

# 1. HIERARCHY & GOLD RECALIBRATION
# Muting the 'Architectural' labels to 0.7 opacity to let the Playfair Headings dominate.
# We are also pushing the letter-spacing to a massive 0.7em for maximum 'high-end gallery' vibe.
sed -i '' \
  -e "s/letterSpacing:'0.6em', opacity:0.8/letterSpacing:'0.7em', opacity:0.7/g" \
  -e "s/linear-gradient(135deg, #f5d485 0%, #d4af37 45%, #b8860b 100%)/linear-gradient(135deg, #fceabb 0%, #f8b500 50%, #8a6d1d 100%)/g" \
  src/pages/Home.jsx

# 2. THE GLASS-PLINTH EFFECT
# Creating a 'shimmer' on the top of the Urgency Bar using a dual-layered border.
# This makes it feel like a heavy obsidian slab with a polished edge.
sed -i '' \
  -e "s/background:'#0d0d0d', borderTop:'1px solid rgba(184,150,61,0.2)'/background:'#0a0a0a', borderTop:'1px solid rgba(255,255,255,0.08)', borderBottom:'1px solid rgba(184,150,61,0.15)', boxShadow:'0 -20px 50px rgba(0,0,0,0.3)'/g" \
  src/pages/Home.jsx

# 3. TYPOGRAPHY 'PRINT' POLISH
# Fine-tuning the Inter body text for that 'Modern Executive' look.
cat > src/index.css << 'EOF'
@import "tailwindcss";

@layer base {
  html { scroll-behavior: smooth; }
  body {
    background-color: #ffffff;
    color: #1a1a1a;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    font-size: 15px;
    line-height: 1.85; /* Even more breathability */
    letter-spacing: -0.012em;
    -webkit-font-smoothing: antialiased;
  }
  h1, h2, h3, h4 {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    letter-spacing: -0.035em;
    line-height: 1.05;
  }
  /* The Premium Scrollbar */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #0a0a0a; }
  ::-webkit-scrollbar-thumb { background: linear-gradient(#fceabb, #b8963d); }
}
EOF

echo "🍷 Final Masterwork Applied."
pnpm build && git add . && git commit -m "🍷 Final Masterwork:
- Labels pushed to 0.7em tracking for 'Gallery' look
- Gold Heading recalibrated to 'Reflective Gold'
- Urgency Bar transformed into 'Glass Plinth' with shimmer edges
- Enhanced body line-height to 1.85 for executive feel" \
&& git push origin main

echo "🏆 Deployment complete. Refresh in 60s. This is the gold standard."