#!/bin/bash
cd ~/Desktop/Business\ Hub\ Demo\ Site

# bump all thin font weights to readable ones
sed -i '' \
  -e "s/fontWeight:400/fontWeight:500/g" \
  -e "s/fontWeight: 400/fontWeight: 500/g" \
  -e "s/fontWeight:300/fontWeight:500/g" \
  -e "s/fontWeight: 300/fontWeight: 500/g" \
  src/pages/Home.jsx src/components/Navbar.jsx src/components/Footer.jsx

# also bump the P helper component specifically
sed -i '' \
  -e "s/fontSize:'13.5px',/fontSize:'14px',/g" \
  -e "s/fontSize: '13.5px',/fontSize: '14px',/g" \
  src/pages/Home.jsx

# bump base font size and weight in css
cat > src/index.css << 'EOF'
@import "tailwindcss";

@layer base {
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background-color: #ffffff;
    color: #111111;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
  h1, h2, h3, h4, h5 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 600;
  }
  p, span, a, li {
    font-weight: 500;
  }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: #ffffff; }
  ::-webkit-scrollbar-thumb { background: #c9a84c; }
  * { -webkit-tap-highlight-color: transparent; }
}
EOF

echo "✅ Font weights fixed"
pnpm build && git add . && git commit -m "💪 Font weight 300/400 → 500/600 sitewide — thick readable text" && git push origin main
echo "🚀 Live in ~60 seconds"