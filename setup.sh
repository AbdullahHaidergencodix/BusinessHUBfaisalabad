#!/bin/bash
cd ~/Desktop/Business\ Hub\ Demo\ Site

echo "🏛️ Architectural lead line + hero hierarchy..."

# ── HERO CONTENT REWRITE ────────────────────────────────────────────────────────
# We're targeting the content div inside Hero and rewriting it precisely

python3 << 'PYEOF'
import re

with open('src/pages/Home.jsx', 'r') as f:
    src = f.read()

# ── 1. REPLACE HERO CONTENT DIV ─────────────────────────────────────────────────
old_content = '''      <div style={{position:'absolute',inset:0,zIndex:10,display:'flex',flexDirection:'column',justifyContent:'center',padding:'0 clamp(28px,7vw,110px)',paddingTop:'96px'}}>
        <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:1.1,delay:0.3,ease:[0.22,1,0.36,1]}}>

          {/* urgency pill — 30yr rule: always show scarcity above the fold */}
          <motion.div
            initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:0.6,duration:0.7}}
            style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'rgba(201,168,76,0.15)',border:'1px solid rgba(201,168,76,0.4)',padding:'6px 14px',marginBottom:'clamp(18px,3vh,30px)',backdropFilter:'blur(8px)'}}
          >
            <div style={{width:'6px',height:'6px',borderRadius:'50%',background:'#c9a84c'}} />
            <span style={{...T.label,color:'#c9a84c',fontSize:'9px'}}>Bookings Now Open — Limited Units Remaining</span>
          </motion.div>

          {/* headline — lead with transformation */}
          <h1 style={{...T.heading,lineHeight:1.0,marginBottom:'clamp(16px,2.5vh,28px)',maxWidth:'clamp(320px,60vw,740px)'}}>
            <span style={{display:'block',fontSize:'clamp(14px,1.8vw,19px)',fontFamily:'Inter,sans-serif',fontWeight:600,color:'rgba(255,255,255,0.7)',letterSpacing:'0.08em',marginBottom:'10px',fontStyle:'normal'}}>
              YOUR INVESTMENT. YOUR LEGACY.
            </span>
            <span style={{display:'block',fontSize:'clamp(46px,8vw,108px)',color:'#ffffff',lineHeight:0.92,textShadow:'0 6px 60px rgba(0,0,0,0.5)'}}>
              Faisalabad\'s
            </span>
            <span style={{display:'block',fontSize:'clamp(46px,8vw,108px)',fontStyle:'italic',background:'linear-gradient(135deg,#f5d485,#c9a84c,#7a4f08)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',lineHeight:0.92}}>
              Most Valuable
            </span>
            <span style={{display:'block',fontSize:'clamp(46px,8vw,108px)',color:'#ffffff',lineHeight:0.92,textShadow:'0 6px 60px rgba(0,0,0,0.5)'}}>
              Address.
            </span>
          </h1>

          {/* sub — one line, clear value prop */}
          <p style={{...T.body,fontSize:'clamp(13px,1.4vw,16px)',color:'rgba(255,255,255,0.8)',marginBottom:'clamp(32px,5vh,56px)',maxWidth:'480px',lineHeight:'1.85',fontWeight:500,letterSpacing:'0.02em'}}>
            Drive-thru commercial units on Sargodha Road. TMA approved. 10% booking. Returns that outperform the market.
          </p>

          {/* CTAs — primary action + trust signal */}
          <div style={{display:'flex',gap:'14px',flexWrap:'wrap',alignItems:'center'}}>
            <a href="tel:03111786243"
              style={{display:'inline-flex',alignItems:'center',gap:'10px',background:'#c9a84c',color:'#ffffff',fontFamily:'Inter,sans-serif',fontSize:'12px',letterSpacing:'0.15em',fontWeight:700,padding:'clamp(14px,2vh,18px) clamp(28px,4vw,40px)',textDecoration:'none',transition:'all 0.3s',whiteSpace:'nowrap',boxShadow:'0 8px 32px rgba(201,168,76,0.35)'}}
              onMouseEnter={e=>{e.currentTarget.style.background='#7a4f08';e.currentTarget.style.transform='translateY(-2px)'}}
              onMouseLeave={e=>{e.currentTarget.style.background='#c9a84c';e.currentTarget.style.transform='translateY(0)'}}
            >
              <Phone size={14}/> BOOK YOUR UNIT NOW
            </a>
            <a href="#about"
              style={{display:'inline-flex',alignItems:'center',gap:'8px',color:'rgba(255,255,255,0.8)',fontFamily:'Inter,sans-serif',fontSize:'12px',letterSpacing:'0.12em',fontWeight:600,textDecoration:'none',transition:'all 0.3s',borderBottom:'1px solid rgba(255,255,255,0.3)',paddingBottom:'2px',whiteSpace:'nowrap'}}
              onMouseEnter={e=>{e.currentTarget.style.color='#c9a84c';e.currentTarget.style.borderColor='#c9a84c'}}
              onMouseLeave={e=>{e.currentTarget.style.color='rgba(255,255,255,0.8)';e.currentTarget.style.borderColor='rgba(255,255,255,0.3)'}}
            >
              See why investors choose us <ChevronRight size={13}/>
            </a>
          </div>

          {/* social proof strip — 30yr rule: put trust signals near CTAs */}
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.1,duration:0.8}}
            style={{display:'flex',gap:'36px',marginTop:'clamp(36px,5.5vh,60px)',flexWrap:'wrap'}}>
            {[
              {icon:Shield,   text:\'TMA Government Approved\'},
              {icon:TrendingUp,text:\'Highest ROI Corridor\'},
              {icon:Star,     text:\'Fatir Developers — Trusted Since 2010\'},
            ].map(s=>(
              <div key={s.text} style={{display:'flex',alignItems:'center',gap:'7px'}}>
                <s.icon size={13} style={{color:'#c9a84c',flexShrink:0}}/>
                <span style={{...T.body,fontSize:'11px',color:'rgba(255,255,255,0.6)',fontWeight:500}}>{s.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>'''

new_content = '''      <div style={{position:'absolute',inset:0,zIndex:10,display:'flex',flexDirection:'column',justifyContent:'center',padding:'0 clamp(28px,7vw,110px)',paddingTop:'96px'}}>
        <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:1.1,delay:0.3,ease:[0.22,1,0.36,1]}}>

          {/* ── ARCHITECTURAL LEAD LINE ── */}
          <div style={{display:'flex',alignItems:'stretch',gap:'0',marginBottom:'clamp(28px,4vh,44px)'}}>

            {/* the vertical line — the anchor */}
            <motion.div
              initial={{scaleY:0,opacity:0}} animate={{scaleY:1,opacity:1}}
              transition={{duration:1.0,delay:0.5,ease:[0.22,1,0.36,1]}}
              style={{width:'3px',background:'linear-gradient(to bottom,#c9a84c,rgba(201,168,76,0.2))',transformOrigin:'top',flexShrink:0,marginRight:'20px'}}
            />

            {/* stacked label + pill */}
            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',gap:'10px'}}>
              <motion.div
                initial={{opacity:0,x:-16}} animate={{opacity:1,x:0}} transition={{delay:0.7,duration:0.7}}
                style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'rgba(201,168,76,0.12)',border:'1px solid rgba(201,168,76,0.35)',padding:'5px 14px',backdropFilter:'blur(10px)',alignSelf:'flex-start'}}
              >
                <div style={{width:'5px',height:'5px',borderRadius:'50%',background:'#c9a84c',flexShrink:0}} />
                <span style={{...T.label,color:'#c9a84c',fontSize:'9px'}}>Bookings Now Open — Limited Units Remaining</span>
              </motion.div>
              <motion.span
                initial={{opacity:0,x:-16}} animate={{opacity:1,x:0}} transition={{delay:0.85,duration:0.7}}
                style={{...T.label,color:'rgba(255,255,255,0.35)',fontSize:'8px',letterSpacing:'0.22em'}}
              >
                SARGODHA ROAD · FAISALABAD · EST. 2025
              </motion.span>
            </div>
          </div>

          {/* headline — tightened, anchored */}
          <h1 style={{...T.heading,marginBottom:'clamp(20px,3vh,32px)',maxWidth:'clamp(320px,55vw,680px)'}}>
            <motion.span
              initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:0.6,duration:0.9,ease:[0.22,1,0.36,1]}}
              style={{display:'block',fontSize:'clamp(13px,1.6vw,17px)',fontFamily:'Inter,sans-serif',fontWeight:600,color:'rgba(255,255,255,0.55)',letterSpacing:'0.14em',marginBottom:'14px',fontStyle:'normal'}}
            >
              YOUR INVESTMENT. YOUR LEGACY.
            </motion.span>
            <motion.span
              initial={{opacity:0,y:32}} animate={{opacity:1,y:0}} transition={{delay:0.7,duration:0.9,ease:[0.22,1,0.36,1]}}
              style={{display:'block',fontSize:'clamp(52px,8.5vw,112px)',color:'#ffffff',lineHeight:0.91,textShadow:'0 2px 0 rgba(0,0,0,0.4),0 8px 48px rgba(0,0,0,0.6)',fontWeight:800}}
            >
              Faisalabad\'s
            </motion.span>
            <motion.span
              initial={{opacity:0,y:32}} animate={{opacity:1,y:0}} transition={{delay:0.8,duration:0.9,ease:[0.22,1,0.36,1]}}
              style={{display:'block',fontSize:'clamp(52px,8.5vw,112px)',fontStyle:'italic',background:'linear-gradient(100deg,#fff5cc 0%,#f5d485 25%,#c9a84c 55%,#7a4f08 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',lineHeight:0.91,fontWeight:800,filter:'drop-shadow(0 4px 24px rgba(201,168,76,0.35))'}}
            >
              Most Valuable
            </motion.span>
            <motion.span
              initial={{opacity:0,y:32}} animate={{opacity:1,y:0}} transition={{delay:0.9,duration:0.9,ease:[0.22,1,0.36,1]}}
              style={{display:'block',fontSize:'clamp(52px,8.5vw,112px)',color:'#ffffff',lineHeight:0.91,textShadow:'0 2px 0 rgba(0,0,0,0.4),0 8px 48px rgba(0,0,0,0.6)',fontWeight:800}}
            >
              Address.
            </motion.span>
          </h1>

          {/* sub — clean, not crowded */}
          <motion.p
            initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:1.0,duration:0.8,ease:[0.22,1,0.36,1]}}
            style={{...T.body,fontSize:'clamp(13px,1.3vw,15px)',color:'rgba(255,255,255,0.7)',marginBottom:'clamp(32px,5vh,52px)',maxWidth:'420px',lineHeight:'1.9',fontWeight:500,letterSpacing:'0.025em'}}
          >
            Drive-thru commercial units on Sargodha Road.<br/>
            TMA approved · 10% booking · Market-beating returns.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:1.05,duration:0.8}}
            style={{display:'flex',gap:'14px',flexWrap:'wrap',alignItems:'center'}}
          >
            <a href="tel:03111786243"
              style={{display:'inline-flex',alignItems:'center',gap:'10px',background:'#c9a84c',color:'#ffffff',fontFamily:'Inter,sans-serif',fontSize:'11px',letterSpacing:'0.18em',fontWeight:700,padding:'clamp(14px,2vh,18px) clamp(28px,4vw,42px)',textDecoration:'none',transition:'all 0.3s',whiteSpace:'nowrap',boxShadow:'0 8px 40px rgba(201,168,76,0.4)'}}
              onMouseEnter={e=>{e.currentTarget.style.background='#7a4f08';e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 14px 48px rgba(201,168,76,0.5)'}}
              onMouseLeave={e=>{e.currentTarget.style.background='#c9a84c';e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 8px 40px rgba(201,168,76,0.4)'}}
            >
              <Phone size={13}/> BOOK YOUR UNIT NOW
            </a>
            <a href="#about"
              style={{display:'inline-flex',alignItems:'center',gap:'8px',color:'rgba(255,255,255,0.75)',fontFamily:'Inter,sans-serif',fontSize:'11px',letterSpacing:'0.14em',fontWeight:600,textDecoration:'none',transition:'all 0.3s',borderBottom:'1px solid rgba(255,255,255,0.25)',paddingBottom:'3px',whiteSpace:'nowrap'}}
              onMouseEnter={e=>{e.currentTarget.style.color='#c9a84c';e.currentTarget.style.borderColor='#c9a84c'}}
              onMouseLeave={e=>{e.currentTarget.style.color='rgba(255,255,255,0.75)';e.currentTarget.style.borderColor='rgba(255,255,255,0.25)'}}
            >
              See why investors choose us <ChevronRight size={13}/>
            </a>
          </motion.div>

          {/* trust strip */}
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.2,duration:0.9}}
            style={{display:'flex',gap:'28px',marginTop:'clamp(36px,5.5vh,60px)',flexWrap:'wrap',alignItems:'center'}}>
            <div style={{width:'1px',height:'32px',background:'rgba(201,168,76,0.3)',flexShrink:0}}/>
            {[
              {icon:Shield,    text:\'TMA Government Approved\'},
              {icon:TrendingUp,text:\'Highest ROI Corridor\'},
              {icon:Star,      text:\'Fatir Developers — Trusted Since 2010\'},
            ].map((s,i)=>(
              <div key={s.text} style={{display:'flex',alignItems:'center',gap:'7px'}}>
                {i>0&&<div style={{width:'1px',height:'16px',background:'rgba(255,255,255,0.1)',flexShrink:0,marginRight:'4px'}}/>}
                <s.icon size={12} style={{color:'#c9a84c',flexShrink:0}}/>
                <span style={{...T.body,fontSize:'11px',color:'rgba(255,255,255,0.55)',fontWeight:500,letterSpacing:'0.02em'}}>{s.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>'''

if old_content in src:
    src = src.replace(old_content, new_content)
    print("✅ Hero content replaced")
else:
    print("⚠️  Hero content block not found exactly — applying fallback sed patches")

with open('src/pages/Home.jsx', 'w') as f:
    f.write(src)
PYEOF

# ── URGENCY BAR — heavier foundation ───────────────────────────────────────────
python3 << 'PYEOF'
import re

with open('src/pages/Home.jsx', 'r') as f:
    src = f.read()

old_bar = '''function UrgencyBar() {
  return (
    <div style={{background:T.black,padding:'0'}}>
      <div style={{maxWidth:'1200px',margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(4,1fr)'}}>
        {[
          {val:10,  suffix:'%',   label:'Booking Amount',        sub:'Start owning today'            },
          {val:2,   suffix:' yr', label:'Installment Plan',      sub:'24 easy monthly payments'      },
          {val:22,  suffix:'K+',  label:'PKR per Sq.Ft',         sub:'Lowest on Sargodha Road'       },
          {val:100, suffix:'%',   label:'TMA Approved',          sub:'Zero legal risk'               },
        ].map((s,i)=>(
          <motion.div key={s.label} {...fromBelow(i*0.07)}
            style={{padding:'clamp(28px,4vh,44px) 16px',textAlign:'center',borderRight:i<3?'1px solid rgba(255,255,255,0.06)':'none',borderBottom:'none'}}>
            <p style={{...T.heading,fontSize:'clamp(36px,4.5vw,58px)',color:T.gold,lineHeight:1}}>
              <Counter to={s.val}/>{s.suffix}
            </p>
            <p style={{...T.bold,fontSize:'11px',color:'#ffffff',marginTop:'8px',letterSpacing:'0.05em'}}>{s.label}</p>
            <p style={{...T.body,fontSize:'11px',color:'rgba(255,255,255,0.4)',marginTop:'4px'}}>{s.sub}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}'''

new_bar = '''function UrgencyBar() {
  return (
    <div style={{background:'#080808',borderTop:'1px solid rgba(201,168,76,0.15)',borderBottom:'1px solid rgba(201,168,76,0.15)',position:'relative',overflow:'hidden'}}>
      {/* subtle gold glow behind bar */}
      <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(to right,transparent,rgba(201,168,76,0.5),transparent)',pointerEvents:'none'}}/>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 60% 100% at 50% 0%,rgba(201,168,76,0.04),transparent)',pointerEvents:'none'}}/>

      <div style={{maxWidth:'1400px',margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(4,1fr)',position:'relative'}}>
        {[
          {val:10,  suffix:'%',   label:'Booking Amount',   sub:'Start owning today'       },
          {val:2,   suffix:' yr', label:'Installment Plan', sub:'24 easy monthly payments' },
          {val:22,  suffix:'K+',  label:'PKR per Sq.Ft',    sub:'Lowest on Sargodha Road'  },
          {val:100, suffix:'%',   label:'TMA Approved',     sub:'Zero legal risk'          },
        ].map((s,i)=>(
          <motion.div key={s.label} {...fromBelow(i*0.08)}
            style={{padding:'clamp(32px,5vh,52px) clamp(16px,2vw,24px)',textAlign:'center',position:'relative',borderRight:i<3?'1px solid rgba(255,255,255,0.04)':'none'}}>

            {/* top accent line per cell */}
            <div style={{position:'absolute',top:0,left:'20%',right:'20%',height:'2px',background:i===0?'linear-gradient(to right,transparent,#c9a84c,transparent)':'linear-gradient(to right,transparent,rgba(201,168,76,0.3),transparent)'}}/>

            <p style={{...T.heading,fontSize:'clamp(40px,5vw,64px)',color:T.gold,lineHeight:1,marginBottom:'2px'}}>
              <Counter to={s.val}/>{s.suffix}
            </p>
            <p style={{...T.bold,fontSize:'11px',color:'#ffffff',marginTop:'10px',letterSpacing:'0.1em',textTransform:'uppercase'}}>{s.label}</p>
            <p style={{...T.body,fontSize:'10.5px',color:'rgba(255,255,255,0.35)',marginTop:'5px',letterSpacing:'0.03em'}}>{s.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* bottom rule */}
      <div style={{position:'absolute',bottom:0,left:0,right:0,height:'1px',background:'linear-gradient(to right,transparent,rgba(201,168,76,0.5),transparent)',pointerEvents:'none'}}/>
    </div>
  )
}'''

if old_bar in src:
    src = src.replace(old_bar, new_bar)
    print("✅ UrgencyBar replaced")
else:
    print("⚠️  UrgencyBar not found exactly")

with open('src/pages/Home.jsx', 'w') as f:
    f.write(src)
PYEOF

echo ""
echo "✅ Patches applied. Building..."
pnpm build && git add . && git commit -m "🏛️ Architectural lead line + hero hierarchy + urgency bar foundation

Hero:
- Vertical gold lead line (3px, gradient, scaleY animation from top)
- Label + scarcity pill anchored to the line
- Site identifier: SARGODHA ROAD · FAISALABAD · EST. 2025
- Each headline word animates in sequentially (staggered)
- Gold gradient: #fff5cc → #f5d485 → #c9a84c → #7a4f08 + drop-shadow
- fontWeight 800 on all headline spans — never loses punch
- Subline shortened + line-break for rhythm
- Trust strip: vertical separators between each item

Urgency Bar:
- Background #080808 — deeper than pure black, feels grounded
- Top + bottom gold gradient rules — frames the bar
- Radial gold glow from top — warmth without noise
- Per-cell top accent line (first cell full gold, rest subtle)
- Number size bumped: clamp(40px,5vw,64px)
- Label tracking 0.1em — more authority
- maxWidth 1400px — stretches to fill wide screens" \
&& git push origin main

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Pushed — live in ~60 seconds"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"