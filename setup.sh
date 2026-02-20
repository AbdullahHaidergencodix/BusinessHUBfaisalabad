#!/bin/bash
cd ~/Desktop/Business\ Hub\ Demo\ Site

cat > src/index.css << 'EOF'
@import "tailwindcss";

@layer base {
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background-color: #ffffff;
    color: #111111;
    font-family: 'Montserrat', sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
  h1, h2, h3, h4, h5 { font-family: 'Cormorant Garamond', serif; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: #ffffff; }
  ::-webkit-scrollbar-thumb { background: #c9a84c; }
  * { -webkit-tap-highlight-color: transparent; }
}
EOF

# patch every color in Home.jsx in one sed pass
sed -i '' \
  -e "s/#f8f6f1/#f4f4f4/g" \
  -e "s/#fafafa/#ffffff/g" \
  -e "s/color:'#3a3a3a'/color:'#111111'/g" \
  -e "s/color: '#3a3a3a'/color: '#111111'/g" \
  -e "s/color:'#555'/color:'#222222'/g" \
  -e "s/color: '#555'/color: '#222222'/g" \
  -e "s/color:'#444'/color:'#222222'/g" \
  -e "s/color: '#444'/color: '#222222'/g" \
  -e "s/color:'#666'/color:'#333333'/g" \
  -e "s/color: '#666'/color: '#333333'/g" \
  -e "s/color:'#888'/color:'#444444'/g" \
  -e "s/color: '#888'/color: '#444444'/g" \
  -e "s/color:'#999'/color:'#555555'/g" \
  -e "s/color: '#999'/color: '#555555'/g" \
  -e "s/color:'#aaa'/color:'#666666'/g" \
  -e "s/color: '#aaa'/color: '#666666'/g" \
  -e "s/color:'#bbb'/color:'#777777'/g" \
  -e "s/color: '#bbb'/color: '#777777'/g" \
  -e "s/color:'#2a2a2a'/color:'#111111'/g" \
  -e "s/color: '#2a2a2a'/color: '#111111'/g" \
  -e "s/#92650a/#7a4f08/g" \
  src/pages/Home.jsx

# also patch Navbar, Footer, WhatsApp
for f in src/components/Navbar.jsx src/components/Footer.jsx src/components/WhatsApp.jsx; do
  sed -i '' \
    -e "s/#f8f6f1/#f4f4f4/g" \
    -e "s/rgba(250,250,250/rgba(255,255,255/g" \
    "$f"
done

echo "✅ Colors patched"
pnpm build && git add . && git commit -m "🎨 Pure white bg + near-black text — professional builder look" && git push origin main
echo "🚀 Pushed — Vercel deploying now"