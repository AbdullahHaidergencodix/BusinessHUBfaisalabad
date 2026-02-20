#!/bin/bash
cd ~/Desktop/Business\ Hub\ Demo\ Site

echo "✨ Gold hierarchy + glass urgency bar..."

python3 << 'PYEOF'
with open('src/pages/Home.jsx', 'r') as f:
    src = f.read()

# ── 1. MUTE THE HERO LABELS ─────────────────────────────────────────────────────
# Scarcity pill border + bg — less gold, more smoke
src = src.replace(
    "background:'rgba(201,168,76,0.12)',border:'1px solid rgba(201,168,76,0.35)'",
    "background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.15)'"
)
# Pill dot — white instead of gold
src = src.replace(
    "width:'5px',height:'5px',borderRadius:'50%',background:'#c9a84c',flexShrink:0",
    "width:'5px',height:'5px',borderRadius:'50%',background:'rgba(255,255,255,0.5)',flexShrink:0"
)
# Pill label text — cooler, not gold
src = src.replace(
    "{...T.label,color:'#c9a84c',fontSize:'9px'}}>Bookings Now Open",
    "{...T.label,color:'rgba(255,255,255,0.6)',fontSize:'9px'}}>Bookings Now Open"
)
# Site identifier — even more muted
src = src.replace(
    "style={{...T.label,color:'rgba(255,255,255,0.35)',fontSize:'8px',letterSpacing:'0.22em'}}",
    "style={{...T.label,color:'rgba(255,255,255,0.22)',fontSize:'8px',letterSpacing:'0.25em'}}"
)
# Eyebrow above headline — muted white not gold-adjacent
src = src.replace(
    "color:'rgba(255,255,255,0.55)',letterSpacing:'0.14em',marginBottom:'14px',fontStyle:'normal'",
    "color:'rgba(255,255,255,0.38)',letterSpacing:'0.16em',marginBottom:'14px',fontStyle:'normal'"
)
# Trust strip icons — muted gold not full gold
src = src.replace(
    "<s.icon size={12} style={{color:'#c9a84c',flexShrink:0}}/>",
    "<s.icon size={12} style={{color:'rgba(201,168,76,0.55)',flexShrink:0}}/>"
)
# Trust strip text — slightly more muted
src = src.replace(
    "fontSize:'11px',color:'rgba(255,255,255,0.55)',fontWeight:500,letterSpacing:'0.02em'",
    "fontSize:'11px',color:'rgba(255,255,255,0.42)',fontWeight:500,letterSpacing:'0.02em'"
)
# Vertical lead line separator in trust strip — softer
src = src.replace(
    "width:'1px',height:'32px',background:'rgba(201,168,76,0.3)',flexShrink:0",
    "width:'1px',height:'32px',background:'rgba(255,255,255,0.12)',flexShrink:0"
)
src = src.replace(
    "width:'1px',height:'16px',background:'rgba(255,255,255,0.1)',flexShrink:0,marginRight:'4px'",
    "width:'1px',height:'14px',background:'rgba(255,255,255,0.08)',flexShrink:0,marginRight:'4px'"
)

print("✅ Hero labels muted")

# ── 2. GLASS URGENCY BAR ────────────────────────────────────────────────────────
old_bar_bg = "background:'#080808',borderTop:'1px solid rgba(201,168,76,0.15)',borderBottom:'1px solid rgba(201,168,76,0.15)',position:'relative',overflow:'hidden'"
new_bar_bg = "background:'rgba(6,6,6,0.82)',backdropFilter:'blur(24px) saturate(1.4)',WebkitBackdropFilter:'blur(24px) saturate(1.4)',borderTop:'1px solid rgba(201,168,76,0.18)',borderBottom:'1px solid rgba(255,255,255,0.04)',position:'relative',overflow:'hidden'"
src = src.replace(old_bar_bg, new_bar_bg)

# inner glow — warmer, more 3D
src = src.replace(
    "background:'radial-gradient(ellipse 60% 100% at 50% 0%,rgba(201,168,76,0.04),transparent)'",
    "background:'radial-gradient(ellipse 70% 120% at 50% 0%,rgba(201,168,76,0.07),transparent 70%)'"
)

# cell top accent — first cell slightly brighter
src = src.replace(
    "background:i===0?'linear-gradient(to right,transparent,#c9a84c,transparent)':'linear-gradient(to right,transparent,rgba(201,168,76,0.3),transparent)'",
    "background:i===0?'linear-gradient(to right,transparent,rgba(201,168,76,0.9),transparent)':'linear-gradient(to right,transparent,rgba(201,168,76,0.22),transparent)'"
)

# cell dividers — glass feel, very subtle
src = src.replace(
    "borderRight:i<3?'1px solid rgba(255,255,255,0.04)':'none'",
    "borderRight:i<3?'1px solid rgba(255,255,255,0.03)':'none',background:i%2===0?'rgba(255,255,255,0.005)':'transparent'"
)

# stat number — pure gold, no change needed but bump weight
src = src.replace(
    "fontSize:'clamp(40px,5vw,64px)',color:T.gold,lineHeight:1,marginBottom:'2px'",
    "fontSize:'clamp(40px,5vw,64px)',color:T.gold,lineHeight:1,marginBottom:'2px',fontWeight:800"
)

# stat label — slightly warmer white
src = src.replace(
    "fontSize:'11px',color:'#ffffff',marginTop:'10px',letterSpacing:'0.1em',textTransform:'uppercase'",
    "fontSize:'10.5px',color:'rgba(255,255,255,0.85)',marginTop:'10px',letterSpacing:'0.12em',textTransform:'uppercase'"
)

# stat sub — a touch warmer
src = src.replace(
    "fontSize:'10.5px',color:'rgba(255,255,255,0.35)',marginTop:'5px',letterSpacing:'0.03em'",
    "fontSize:'10.5px',color:'rgba(255,255,255,0.3)',marginTop:'5px',letterSpacing:'0.04em',fontStyle:'italic'"
)

# bottom rule — match top, full gold gradient
src = src.replace(
    "bottom:0,left:0,right:0,height:'1px',background:'linear-gradient(to right,transparent,rgba(201,168,76,0.5),transparent)',pointerEvents:'none'",
    "bottom:0,left:0,right:0,height:'1px',background:'linear-gradient(to right,transparent,rgba(255,255,255,0.06),transparent)',pointerEvents:'none'"
)

print("✅ Glass urgency bar applied")

with open('src/pages/Home.jsx', 'w') as f:
    f.write(src)
PYEOF

# ── GLOBAL LABEL MUTING in index.css ───────────────────────────────────────────
# The Label component uses gold — we want section labels slightly pulled back
# so they support headings, never compete with them
cat >> src/index.css << 'EOF'

/* ── GOLD HIERARCHY PASS ────────────────────────────────────────────────────── */

/* Section labels (the small-caps gold lines) —
   support the heading, never steal from it          */
.section-label-line {
  opacity: 0.75;
}

/* Urgency bar — glass depth layer */
.urgency-bar-wrap {
  position: relative;
  isolation: isolate;
}
.urgency-bar-wrap::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(255,255,255,0.025) 0%,
    rgba(255,255,255,0.0)   50%,
    rgba(0,0,0,0.15)        100%
  );
  pointer-events: none;
  z-index: 1;
}

/* Stat numbers in urgency bar — always win */
.urgency-bar-wrap [style*="Playfair Display"] {
  position: relative;
  z-index: 2;
}
EOF

echo ""
echo "✅ All patches applied. Building..."

pnpm build && git add . && git commit -m "✨ Gold hierarchy + glass urgency bar

Gold balance:
- Hero scarcity pill: gold → smoke glass (rgba white border + bg)
- Pill dot: gold → rgba(255,255,255,0.5) — neutral witness
- Pill label: gold text → rgba(255,255,255,0.6) — steps back
- Eyebrow label: 0.55 → 0.38 opacity — whisper not shout
- Trust strip icons: full #c9a84c → 0.55 opacity gold
- Trust strip text: 0.55 → 0.42 — supporting cast
- Lead line separators: gold-tinted → pure white rgba
- Result: gold in the hero belongs ONLY to the headline

Urgency bar glass:
- backdrop-filter: blur(24px) saturate(1.4) — true glass
- Background: rgba(6,6,6,0.82) — lets any scroll content bleed through
- Top border: rgba(201,168,76,0.18) — gold edge catches light
- Bottom border: rgba white — depth not echo
- Inner radial glow: 0.04 → 0.07, wider spread
- Cell alternating micro-tint: even cells +0.5% white
- Cell dividers: even more receded — 0.03 opacity
- Stat sublabels: italic — editorial quality
- CSS ::before layer: top-light to bottom-shadow = 3D lift" \
&& git push origin main

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Pushed — live in ~60 seconds"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"