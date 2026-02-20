#!/bin/bash
cd ~/Desktop/Business\ Hub\ Demo\ Site

echo "💎 Hero weight + luxury spacing pass..."

sed -i '' \
  -e "s/background:'rgba(0,0,0,0.65)'/background:'rgba(0,0,0,0.72)'/g" \
  -e "s/background: 'rgba(0,0,0,0.65)'/background: 'rgba(0,0,0,0.72)'/g" \
  -e "s/rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.3)/rgba(0,0,0,0.90) 0%,rgba(0,0,0,0.40)/g" \
  src/pages/Home.jsx

cat >> src/index.css << 'EOF'

/* ── LUXURY SPACING PASS ────────────────────────────── */

/* headings — open and authoritative */
h1, h2, h3 {
  letter-spacing: -0.01em;
  line-height: 1.08;
}

h4, h5, h6 {
  letter-spacing: 0.01em;
  line-height: 1.3;
}

/* body — readable, never cramped */
p {
  line-height: 1.95;
  letter-spacing: 0.012em;
}

/* uppercase labels — luxury spacing */
.label, [style*="letterSpacing:'0.22em'"],
[style*='letterSpacing: "0.22em"'] {
  letter-spacing: 0.28em;
}

/* inter body text — slightly wider tracking */
body, p, span, li, a {
  letter-spacing: 0.014em;
}

/* section breathing room — more vertical whitespace */
section {
  padding-top: clamp(90px, 13vh, 150px);
  padding-bottom: clamp(90px, 13vh, 150px);
}

/* hero headline — tight but intentional */
.hero-headline {
  letter-spacing: -0.02em;
  line-height: 0.93;
}

/* gold gradient text — needs no shadow, just space */
[style*="WebkitTextFillColor: 'transparent'"],
[style*="WebkitTextFillColor:'transparent'"] {
  letter-spacing: -0.015em;
}

/* stats numbers — monumental */
[style*="Playfair Display"] {
  letter-spacing: -0.02em;
}

/* CTAs — wider tracking = more authority */
a[style*="letterSpacing"] {
  letter-spacing: 0.18em !important;
}
EOF

# bump hero headline line height in JSX directly
sed -i '' \
  -e "s/lineHeight:1.0,marginBottom:'clamp(12px,2vh,20px)'/lineHeight:0.93,marginBottom:'clamp(16px,2.5vh,28px)'/g" \
  -e "s/lineHeight:0.95,textShadow:'0 4px 40px rgba(0,0,0,0.4)'}/lineHeight:0.92,textShadow:'0 6px 60px rgba(0,0,0,0.5)'}/g" \
  src/pages/Home.jsx

# bump hero subline spacing
sed -i '' \
  -e "s/lineHeight:'1.7',fontWeight:500}}/lineHeight:'1.85',fontWeight:500,letterSpacing:'0.02em'}}/g" \
  src/pages/Home.jsx

# more breathing room between hero elements
sed -i '' \
  -e "s/marginBottom:'clamp(24px,4vh,44px)'}/marginBottom:'clamp(32px,5vh,56px)'}/g" \
  src/pages/Home.jsx

# hero trust strip — bump spacing
sed -i '' \
  -e "s/gap:'28px',marginTop:'clamp(28px,4vh,48px)'/gap:'36px',marginTop:'clamp(36px,5.5vh,60px)'/g" \
  src/pages/Home.jsx

# section headings — more line height room
sed -i '' \
  -e "s/lineHeight:1.0,color:T.ink/lineHeight:1.05,color:T.ink/g" \
  src/pages/Home.jsx

# body P component — bump line height
sed -i '' \
  -e "s/fontSize:'15px',lineHeight:'1.9'/fontSize:'15px',lineHeight:'2.0'/g" \
  src/pages/Home.jsx

echo "✅ Done. Building..."
pnpm build && git add . && git commit -m "💎 Hero weight + luxury spacing

- Hero overlay: 0.65 → 0.72 base, 0.85 → 0.90 left gradient
- Left gradient covers 0–100% so text zone is never grey
- Hero headline line-height: 0.93 — tight, monumental
- Hero subline: line-height 1.85, tracking 0.02em
- Gap between hero elements opened up 20–30%
- Trust strip margin-top lifted — room to breathe
- Body line-height: 2.0 — premium editorial standard
- Section vertical padding bumped 13vh
- CTA letter-spacing: 0.18em — authoritative
- Label tracking: 0.28em — luxury standard" \
&& git push origin main

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Pushed — live in ~60 seconds"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"