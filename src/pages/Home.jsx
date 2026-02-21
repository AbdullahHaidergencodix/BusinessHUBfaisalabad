import { useState, useEffect, useRef } from 'react'
import {
  motion, AnimatePresence,
  useScroll, useTransform, useInView
} from 'framer-motion'
import {
  Phone, MapPin, ChevronRight, ArrowDown,
  CheckCircle, ExternalLink, Facebook, Quote,
  TrendingUp, Shield, Clock, Star
} from 'lucide-react'
import Ticker from '../components/Ticker'

/* ─────────────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────────────── */
const T = {
  heading:  { fontFamily:'Playfair Display, serif', fontWeight:700 },
  body:     { fontFamily:'Inter, sans-serif', fontWeight:500 },
  bold:     { fontFamily:'Inter, sans-serif', fontWeight:700 },
  label:    { fontFamily:'Inter, sans-serif', fontWeight:600, fontSize:'10px', letterSpacing:'0.22em', textTransform:'uppercase' },
  gold:     '#c9a84c',
  goldDark: '#7a4f08',
  black:    '#0d0d0d',
  ink:      '#1a1a1a',
  body_c:   '#2a2a2a',
  muted:    '#555555',
  light:    '#f5f5f5',
  white:    '#ffffff',
}

/* ─────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────── */
const G = ({ children }) => (
  <span style={{ background:'linear-gradient(135deg,#7a4f08,#c9a84c,#e8c56a)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
    {children}
  </span>
)

const Label = ({ children, light = false }) => (
  <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'14px' }}>
    <div style={{ width:'24px', height:'2px', background: light ? 'rgba(201,168,76,0.7)' : T.gold }} />
    <span style={{ ...T.label, color: light ? 'rgba(201,168,76,0.9)' : T.goldDark }}>{children}</span>
  </div>
)

const Divider = ({ light = false }) => (
  <div style={{ display:'flex', alignItems:'center', gap:'10px', margin:'20px 0' }}>
    <div style={{ height:'1px', flex:1, background: light ? 'linear-gradient(to right,rgba(201,168,76,0.4),transparent)' : `linear-gradient(to right,${T.gold},transparent)` }} />
    <div style={{ width:'4px', height:'4px', background: light ? 'rgba(201,168,76,0.5)' : T.gold, transform:'rotate(45deg)', flexShrink:0 }} />
    <div style={{ height:'1px', flex:1, background: light ? 'linear-gradient(to left,rgba(201,168,76,0.4),transparent)' : `linear-gradient(to left,${T.gold},transparent)` }} />
  </div>
)

/* body paragraph — dark, thick, readable */
const P = ({ children, style = {}, light = false }) => (
  <p style={{ ...T.body, fontSize:'15px', lineHeight:'1.9', color: light ? 'rgba(255,255,255,0.75)' : T.body_c, ...style }}>
    {children}
  </p>
)

/* animation presets */
const fromLeft  = (d=0) => ({ initial:{opacity:0,x:-56}, whileInView:{opacity:1,x:0}, viewport:{once:true,margin:'-60px'}, transition:{duration:0.9,delay:d,ease:[0.22,1,0.36,1]} })
const fromRight = (d=0) => ({ initial:{opacity:0,x:56},  whileInView:{opacity:1,x:0}, viewport:{once:true,margin:'-60px'}, transition:{duration:0.9,delay:d,ease:[0.22,1,0.36,1]} })
const fromBelow = (d=0) => ({ initial:{opacity:0,y:50},  whileInView:{opacity:1,y:0}, viewport:{once:true,margin:'-60px'}, transition:{duration:0.9,delay:d,ease:[0.22,1,0.36,1]} })

/* animated counter */
function Counter({ to, suffix='' }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-80px' })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const end=parseFloat(String(to).replace(/\D/g,'')), steps=60, inc=end/steps
    let c=0
    const t=setInterval(()=>{ c+=inc; if(c>=end){setVal(end);clearInterval(t)}else setVal(Math.floor(c)) }, 2000/steps)
    return ()=>clearInterval(t)
  },[inView,to])
  return <span ref={ref}>{val}{suffix}</span>
}

/* ─────────────────────────────────────────────────────
   HERO
   30yr insight: The headline must answer "what's in it
   for me" in under 3 seconds. Lead with transformation,
   not features. The overlay must be heavy enough that
   text is never a struggle.
───────────────────────────────────────────────────── */
const SLIDES = ['/images/hero1.jpg','/images/hero2.jpg','/images/hero3.jpg']

function Hero() {
  const [cur, setCur]   = useState(0)
  const [prev, setPrev] = useState(null)
  const [dir, setDir]   = useState(1)

  const go = (next, d=1) => { setPrev(cur); setDir(d); setCur(next) }
  useEffect(() => {
    const t = setInterval(() => go((cur+1)%SLIDES.length, 1), 7000)
    return () => clearInterval(t)
  // eslint-disable-next-line
  },[cur])

  return (
    <section style={{ position:'relative', height:'100svh', minHeight:'640px', overflow:'hidden' }}>

      {/* exiting slide */}
      <AnimatePresence>
        {prev !== null && (
          <motion.div key={`p${prev}`}
            initial={{x:0}} animate={{x:dir*-100+'%'}} exit={{}}
            transition={{duration:1.1,ease:[0.77,0,0.18,1]}}
            style={{position:'absolute',inset:0,zIndex:1}}
            onAnimationComplete={()=>setPrev(null)}
          >
            <img src={SLIDES[prev]} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* entering slide */}
      <motion.div key={`c${cur}`}
        initial={{x:dir*100+'%'}} animate={{x:'0%'}}
        transition={{duration:1.1,ease:[0.77,0,0.18,1]}}
        style={{position:'absolute',inset:0,zIndex:2}}
      >
        <img src={SLIDES[cur]} alt="Business Hub Faisalabad" loading="eager"
          style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center'}} />
      </motion.div>

      {/* overlays — heavy on purpose */}
      <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,0.72)',zIndex:3}} />
      <div style={{position:'absolute',inset:0,background:'linear-gradient(110deg,rgba(0,0,0,0.90) 0%,rgba(0,0,0,0.40) 55%,transparent 100%)',zIndex:4}} />
      <div style={{position:'absolute',bottom:0,left:0,right:0,height:'220px',background:'linear-gradient(to top,#ffffff,transparent)',zIndex:4}} />
      <div style={{position:'absolute',top:0,left:0,right:0,height:'180px',background:'linear-gradient(to bottom,rgba(0,0,0,0.6),transparent)',zIndex:4}} />

      {/* content */}
      <div style={{position:'absolute',inset:0,zIndex:10,display:'flex',flexDirection:'column',justifyContent:'center',padding:'0 clamp(28px,7vw,110px)',paddingTop:'96px'}}>
        <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:1.1,delay:0.3,ease:[0.22,1,0.36,1]}}>

          {/* urgency pill — 30yr rule: always show scarcity above the fold */}
          <motion.div
            initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:0.6,duration:0.7}}
            style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'rgba(201,168,76,0.15)',border:'1px solid rgba(201,168,76,0.4)',padding:'6px 14px',marginBottom:'clamp(18px,3vh,30px)',backdropFilter:'blur(8px)'}}
          >
            <div style={{width:'6px',height:'6px',borderRadius:'50%',background:'#c9a84c'}} />
            <span style={{...T.label,color:'rgba(255,255,255,0.6)',fontSize:'9px'}}>Bookings Now Open — Limited Units Remaining</span>
          </motion.div>

          {/* headline — lead with transformation */}
          <h1 style={{...T.heading,lineHeight:0.93,marginBottom:'clamp(16px,2.5vh,28px)',maxWidth:'clamp(320px,60vw,740px)'}}>
            <span style={{display:'block',fontSize:'clamp(14px,1.8vw,19px)',fontFamily:'Inter,sans-serif',fontWeight:600,color:'rgba(255,255,255,0.7)',letterSpacing:'0.08em',marginBottom:'10px',fontStyle:'normal'}}>
              YOUR INVESTMENT. YOUR LEGACY.
            </span>
            <span style={{display:'block',fontSize:'clamp(46px,8vw,108px)',color:'#ffffff',lineHeight:0.92,textShadow:'0 6px 60px rgba(0,0,0,0.5)'}}>
              Faisalabad's
            </span>
            <span style={{display:'block',fontSize:'clamp(46px,8vw,108px)',fontStyle:'italic',background:'linear-gradient(135deg,#f5d485,#c9a84c,#7a4f08)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',lineHeight:0.95}}>
              Most Valuable
            </span>
            <span style={{display:'block',fontSize:'clamp(46px,8vw,108px)',color:'#ffffff',lineHeight:0.92,textShadow:'0 6px 60px rgba(0,0,0,0.5)'}}>
              Address.
            </span>
          </h1>

          {/* sub — one line, clear value prop */}
          <p style={{...T.body,fontSize:'clamp(13px,1.4vw,16px)',color:'rgba(255,255,255,0.8)',marginBottom:'clamp(24px,4vh,44px)',maxWidth:'480px',lineHeight:'1.85',fontWeight:500,letterSpacing:'0.02em'}}>
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
              {icon:Shield,   text:'TMA Government Approved'},
              {icon:TrendingUp,text:'Highest ROI Corridor'},
              {icon:Star,     text:'Fatir Developers — Trusted Since 2010'},
            ].map(s=>(
              <div key={s.text} style={{display:'flex',alignItems:'center',gap:'7px'}}>
                <s.icon size={13} style={{color:'#c9a84c',flexShrink:0}}/>
                <span style={{...T.body,fontSize:'11px',color:'rgba(255,255,255,0.6)',fontWeight:500}}>{s.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* dots */}
      <div style={{position:'absolute',bottom:'clamp(24px,4vh,44px)',left:'clamp(28px,7vw,110px)',zIndex:10,display:'flex',gap:'8px',alignItems:'center'}}>
        {SLIDES.map((_,i)=>(
          <button key={i} onClick={()=>go(i,i>cur?1:-1)} aria-label={`Slide ${i+1}`}
            style={{padding:0,border:'none',cursor:'pointer',height:'2px',width:i===cur?'40px':'14px',background:i===cur?'#c9a84c':'rgba(255,255,255,0.3)',transition:'all 0.4s'}}/>
        ))}
      </div>

      {/* progress bar */}
      <div style={{position:'absolute',bottom:0,left:0,right:0,height:'2px',background:'rgba(201,168,76,0.1)',zIndex:10}}>
        <motion.div key={cur} style={{height:'100%',background:'linear-gradient(to right,#7a4f08,#c9a84c,#f5d485)',transformOrigin:'left'}}
          initial={{scaleX:0}} animate={{scaleX:1}} transition={{duration:7,ease:'linear'}}/>
      </div>

      {/* scroll cue */}
      <motion.div animate={{y:[0,8,0]}} transition={{repeat:Infinity,duration:2.5}}
        style={{position:'absolute',bottom:'clamp(24px,4vh,40px)',right:'28px',zIndex:10,display:'flex',flexDirection:'column',alignItems:'center',gap:'6px',color:'rgba(255,255,255,0.35)'}}>
        <span style={{...T.label,fontSize:'8px',writingMode:'vertical-rl',color:'rgba(255,255,255,0.35)'}}>SCROLL</span>
        <ArrowDown size={12}/>
      </motion.div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────
   URGENCY BAR
   30yr insight: After the hero, hit them with numbers
   before they can scroll past. Numbers = credibility.
───────────────────────────────────────────────────── */
function UrgencyBar() {
  return (
    <div style={{background:'rgba(6,6,6,0.82)',backdropFilter:'blur(24px) saturate(1.4)',WebkitBackdropFilter:'blur(24px) saturate(1.4)',borderTop:'1px solid rgba(201,168,76,0.18)',borderBottom:'1px solid rgba(255,255,255,0.04)',position:'relative',overflow:'hidden'}}>
      {/* subtle gold glow behind bar */}
      <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(to right,transparent,rgba(201,168,76,0.5),transparent)',pointerEvents:'none'}}/>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 70% 120% at 50% 0%,rgba(201,168,76,0.07),transparent 70%)',pointerEvents:'none'}}/>

      <div style={{maxWidth:'1400px',margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(4,1fr)',position:'relative'}}>
        {[
          {val:10,  suffix:'%',   label:'Booking Amount',   sub:'Start owning today'       },
          {val:2,   suffix:' yr', label:'Installment Plan', sub:'24 easy monthly payments' },
          {val:22,  suffix:'K+',  label:'PKR per Sq.Ft',    sub:'Lowest on Sargodha Road'  },
          {val:100, suffix:'%',   label:'TMA Approved',     sub:'Zero legal risk'          },
        ].map((s,i)=>(
          <motion.div key={s.label} {...fromBelow(i*0.08)}
            style={{padding:'clamp(32px,5vh,52px) clamp(16px,2vw,24px)',textAlign:'center',position:'relative',borderRight:i<3?'1px solid rgba(255,255,255,0.03)':'none',background:i%2===0?'rgba(255,255,255,0.005)':'transparent'}}>

            {/* top accent line per cell */}
            <div style={{position:'absolute',top:0,left:'20%',right:'20%',height:'2px',background:i===0?'linear-gradient(to right,transparent,rgba(201,168,76,0.9),transparent)':'linear-gradient(to right,transparent,rgba(201,168,76,0.22),transparent)'}}/>

            <p style={{...T.heading,fontSize:'clamp(40px,5vw,64px)',color:T.gold,lineHeight:1,marginBottom:'2px',fontWeight:800,fontWeight:800}}>
              <Counter to={s.val}/>{s.suffix}
            </p>
            <p style={{...T.bold,fontSize:'10.5px',color:'rgba(255,255,255,0.85)',marginTop:'10px',letterSpacing:'0.12em',textTransform:'uppercase'}}>{s.label}</p>
            <p style={{...T.body,fontSize:'10.5px',color:'rgba(255,255,255,0.3)',marginTop:'5px',letterSpacing:'0.04em',fontStyle:'italic'}}>{s.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* bottom rule */}
      <div style={{position:'absolute',bottom:0,left:0,right:0,height:'1px',background:'linear-gradient(to right,transparent,rgba(255,255,255,0.06),transparent)',pointerEvents:'none'}}/>
    </div>
  )
}

/* ─────────────────────────────────────────────────────
   ABOUT
   30yr insight: Don't lead with the building. Lead with
   the problem you solve. Then introduce the solution.
   "Faisalabad's investors have been waiting for this."
───────────────────────────────────────────────────── */
function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target:ref, offset:['start end','end start'] })
  const y = useTransform(scrollYProgress,[0,1],['5%','-5%'])

  return (
    <section id="about" ref={ref} style={{background:T.white,padding:'clamp(80px,11vh,130px) 0',overflow:'hidden'}}>
      <div style={{maxWidth:'1300px',margin:'0 auto',padding:'0 clamp(24px,4vw,56px)',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'clamp(52px,8vw,100px)',alignItems:'center'}}>

        {/* image */}
        <motion.div {...fromLeft()} style={{position:'relative'}}>
          <div style={{overflow:'hidden',boxShadow:'0 40px 100px rgba(0,0,0,0.14)'}}>
            <motion.img src="/images/building1.jpg" alt="Business Hub Faisalabad"
              style={{width:'100%',height:'clamp(380px,52vh,600px)',objectFit:'cover',y}}/>
          </div>
          {/* corner brackets */}
          <div style={{position:'absolute',top:'-16px',left:'-16px',width:'80px',height:'80px',borderTop:'3px solid '+T.gold,borderLeft:'3px solid '+T.gold,pointerEvents:'none'}}/>
          <div style={{position:'absolute',bottom:'-16px',right:'-16px',width:'80px',height:'80px',borderBottom:'3px solid '+T.gold,borderRight:'3px solid '+T.gold,pointerEvents:'none'}}/>
          {/* badge */}
          <div style={{position:'absolute',bottom:'36px',left:'-22px',background:T.gold,padding:'18px 24px',boxShadow:'0 12px 40px rgba(201,168,76,0.4)'}}>
            <p style={{...T.heading,fontSize:'40px',color:'#fff',lineHeight:1}}>2025</p>
            <p style={{...T.label,color:'rgba(255,255,255,0.85)',marginTop:'4px',fontSize:'8px'}}>Completion</p>
          </div>
        </motion.div>

        {/* copy */}
        <motion.div {...fromRight(0.1)}>
          <Label>The Opportunity</Label>
          <h2 style={{...T.heading,fontSize:'clamp(13px,1.5vw,16px)',color:T.muted,fontFamily:'Inter,sans-serif',fontWeight:600,letterSpacing:'0.04em',marginBottom:'12px',fontStyle:'normal'}}>
            Faisalabad's investors have been waiting for this.
          </h2>
          <h2 style={{...T.heading,fontSize:'clamp(36px,4.5vw,62px)',color:T.ink,lineHeight:1.05,marginBottom:'6px'}}>
            The Commercial Space
          </h2>
          <h2 style={{...T.heading,fontSize:'clamp(36px,4.5vw,62px)',lineHeight:1.05,fontStyle:'italic'}}>
            <G>You Deserve.</G>
          </h2>
          <Divider/>

          {/* pain point → solution — 30yr copywriting formula */}
          <P style={{marginBottom:'14px'}}>
            For years, Sargodha Road had the traffic, the growth, the demand — but no project worthy of a serious investor's capital. Shops were poorly designed, legally unclear, or simply too expensive for the return they offered.
          </P>
          <P style={{marginBottom:'32px'}}>
            Business Hub Faisalabad changes that. Grand neoclassical architecture, TMA-approved documentation, drive-thru convenience, and a payment plan built for the real investor — not just the ultra-wealthy.
          </P>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
            {[
              'TMA Government Approved',
              'Drive-Thru Commercial Design',
              '10% Booking — 24 Months',
              '22,000 PKR / Sq.Ft Starting',
              'Buy · Sale · Lease Options',
              'Possession On Request',
            ].map((b,i)=>(
              <motion.div key={b}
                initial={{opacity:0,x:16}} whileInView={{opacity:1,x:0}}
                viewport={{once:true}} transition={{duration:0.5,delay:i*0.07}}
                style={{display:'flex',alignItems:'flex-start',gap:'9px'}}
              >
                <CheckCircle size={14} style={{color:T.gold,flexShrink:0,marginTop:'3px'}}/>
                <span style={{...T.body,fontSize:'13px',color:T.body_c,fontWeight:600}}>{b}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────
   INVESTMENT CASE
   30yr insight: Investors need permission to act. Give
   them a logical framework — not just emotion. Show the
   math. Show the trend. Make them feel smart for buying.
───────────────────────────────────────────────────── */
function InvestmentCase() {
  const cards = [
    {
      icon: TrendingUp,
      title: 'The Numbers Work',
      body: 'Entry at 22,000 PKR/sq.ft on a corridor that has appreciated 3X in 5 years. Monthly rental yields in this zone run between 1.2%–1.8% of property value. Your capital works from day one.',
      stat: '3X', statLabel: 'Corridor appreciation in 5 years',
    },
    {
      icon: MapPin,
      title: 'The Location Is Irreplaceable',
      body: 'Sargodha Road sees 200,000+ vehicles daily. It connects Faisalabad\'s industrial belt to its fastest-growing residential zones. This footfall cannot be replicated anywhere else in the city.',
      stat: '200K+', statLabel: 'Daily vehicles on Sargodha Road',
    },
    {
      icon: Shield,
      title: 'The Risk Is Minimal',
      body: 'TMA approved. Fatir Developers\' track record is clean. Documentation is transparent from day one. This is not a promise on paper — it is a building going up on a road you can drive on today.',
      stat: '100%', statLabel: 'Government approved & documented',
    },
    {
      icon: Clock,
      title: 'The Window Is Closing',
      body: 'Early investors on Sargodha Road who bought 5 years ago have already tripled. The investors who wait for "more certainty" always pay 40% more for the same unit. The time is now.',
      stat: '40%', statLabel: 'Average price increase post-launch',
    },
  ]
  return (
    <section style={{background:T.light,padding:'clamp(80px,11vh,130px) 0'}}>
      <div style={{maxWidth:'1300px',margin:'0 auto',padding:'0 clamp(24px,4vw,56px)'}}>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:'32px',alignItems:'end',marginBottom:'clamp(52px,7vh,80px)'}}>
          <motion.div {...fromLeft()}>
            <Label>The Investment Case</Label>
            <h2 style={{...T.heading,fontSize:'clamp(40px,5.5vw,72px)',color:T.ink,lineHeight:1.0}}>
              Why Smart<br/><span style={{fontStyle:'italic'}}><G>Money Moves</G></span><br/>Here First.
            </h2>
          </motion.div>
          <motion.div {...fromRight(0.1)}>
            <P>
              After 30 years of watching investors make and miss fortunes in Pakistani real estate, the pattern is always the same: the ones who act on logic — not just gut — win. Here is the logic for Business Hub.
            </P>
          </motion.div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'16px'}}>
          {cards.map((c,i)=>(
            <motion.div key={c.title}
              initial={{opacity:0,y:50,scale:0.97}} whileInView={{opacity:1,y:0,scale:1}}
              viewport={{once:true,margin:'-50px'}} transition={{duration:0.85,delay:i*0.1,ease:[0.22,1,0.36,1]}}
              style={{background:T.white,padding:'clamp(28px,3.5vw,44px)',border:'1px solid rgba(0,0,0,0.07)',boxShadow:'0 4px 24px rgba(0,0,0,0.06)',transition:'all 0.35s',cursor:'default'}}
              className="hover:-translate-y-2 hover:shadow-2xl hover:border-amber-200"
            >
              <div style={{width:'44px',height:'44px',background:'rgba(201,168,76,0.1)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'20px'}}>
                <c.icon size={20} style={{color:T.gold}}/>
              </div>
              {/* the big stat — makes them stop scrolling */}
              <p style={{...T.heading,fontSize:'clamp(40px,4.5vw,56px)',color:T.goldDark,lineHeight:1,marginBottom:'4px'}}>
                {c.stat}
              </p>
              <p style={{...T.label,color:T.muted,marginBottom:'16px'}}>{c.statLabel}</p>
              <div style={{height:'1px',background:'rgba(0,0,0,0.07)',marginBottom:'16px'}}/>
              <h3 style={{...T.heading,fontSize:'clamp(18px,2vw,22px)',color:T.ink,marginBottom:'10px'}}>{c.title}</h3>
              <P style={{fontSize:'13.5px'}}>{c.body}</P>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────
   FEATURES
   30yr insight: Features tell, benefits sell. Reframe
   every feature as what it means for the buyer's life.
───────────────────────────────────────────────────── */
function Features() {
  const list = [
    {
      n:'01', title:'Drive-Thru Commercial',
      feature:'Units designed for vehicle access',
      benefit:'Your customers never have to park, walk, or wait. Maximum convenience = maximum repeat business = maximum rent.',
    },
    {
      n:'02', title:'Sargodha Road Frontage',
      feature:'200,000+ daily passing vehicles',
      benefit:'You cannot buy this visibility anywhere else in Faisalabad at this price. Every day is a free billboard for your tenant.',
    },
    {
      n:'03', title:'Neoclassical Architecture',
      feature:'European-inspired grand facade',
      benefit:'Premium-looking buildings attract premium tenants. Premium tenants pay premium rent. This building makes your investment look like more.',
    },
    {
      n:'04', title:'10% Booking Only',
      feature:'Start with just 10% down',
      benefit:'You are controlling a full commercial asset while your capital stays in your pocket. Leverage — the oldest wealth-building tool in real estate.',
    },
    {
      n:'05', title:'TMA Approved',
      feature:'Full government clearance',
      benefit:'You sleep well. You sell easily. You finance easily. Legal clarity is worth more than any feature on this list.',
    },
    {
      n:'06', title:'Fatir Developers',
      feature:'Proven Faisalabad developer',
      benefit:'They have delivered before. They have names, faces, and offices you can walk into. In real estate, the developer\'s reputation is your guarantee.',
    },
  ]
  return (
    <section id="features" style={{background:T.white,padding:'clamp(80px,11vh,130px) 0'}}>
      <div style={{maxWidth:'1300px',margin:'0 auto',padding:'0 clamp(24px,4vw,56px)'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:'32px',alignItems:'end',marginBottom:'clamp(48px,7vh,72px)'}}>
          <motion.div {...fromLeft()}>
            <Label>Features & Benefits</Label>
            <h2 style={{...T.heading,fontSize:'clamp(40px,5.5vw,72px)',color:T.ink,lineHeight:1.0}}>
              What You<br/><span style={{fontStyle:'italic'}}><G>Actually Get.</G></span>
            </h2>
          </motion.div>
          <motion.div {...fromRight(0.1)}>
            <P>Features are what a building has. Benefits are what they mean for your money, your tenants, and your future. Here are both.</P>
          </motion.div>
        </div>

        <div style={{borderTop:'2px solid '+T.light}}>
          {list.map((f,i)=>(
            <motion.div key={f.n}
              initial={{opacity:0,x:i%2===0?-44:44}} whileInView={{opacity:1,x:0}}
              viewport={{once:true,margin:'-50px'}} transition={{duration:0.8,delay:i*0.05,ease:[0.22,1,0.36,1]}}
              style={{borderBottom:'1px solid '+T.light,display:'grid',gridTemplateColumns:'clamp(44px,5vw,72px) 1fr 1.4fr',gap:'clamp(16px,3vw,48px)',alignItems:'start',padding:'clamp(24px,3vw,40px) 0',transition:'background 0.3s'}}
              className="group hover:bg-stone-50"
            >
              <span style={{...T.heading,fontSize:'clamp(26px,3vw,42px)',color:'rgba(201,168,76,0.25)',lineHeight:1,paddingTop:'4px'}}>{f.n}</span>
              <div>
                <h3 style={{...T.heading,fontSize:'clamp(18px,2vw,24px)',color:T.ink,marginBottom:'5px',transition:'color 0.3s'}}
                  className="group-hover:!text-amber-800">
                  {f.title}
                </h3>
                <p style={{...T.label,color:T.muted,fontSize:'10px'}}>{f.feature}</p>
              </div>
              <div style={{borderLeft:'2px solid rgba(201,168,76,0.2)',paddingLeft:'20px'}}>
                <P style={{fontSize:'13.5px',fontStyle:'italic',color:T.body_c}}>{f.benefit}</P>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────
   PAYMENT PLAN
   30yr insight: Show the smallest number first. "Just
   PKR 2,20,000 gets you in." Then reveal the full asset.
   Anchoring — oldest sales trick in the book.
───────────────────────────────────────────────────── */
function PaymentPlan() {
  const plans = [
    {size:'100 Sq.Ft',total:'22,00,000',booking:'2,20,000',monthly:'73,333',  quarterly:'2,20,000',tag:null          },
    {size:'150 Sq.Ft',total:'33,00,000',booking:'3,30,000',monthly:'1,10,000',quarterly:'3,30,000',tag:'Most Popular' },
    {size:'200 Sq.Ft',total:'44,00,000',booking:'4,40,000',monthly:'1,46,667',quarterly:'4,40,000',tag:null          },
    {size:'300 Sq.Ft',total:'66,00,000',booking:'6,60,000',monthly:'2,20,000',quarterly:'6,60,000',tag:'Best Value'  },
  ]
  return (
    <section id="payment" style={{background:T.light,padding:'clamp(80px,11vh,130px) 0'}}>
      <div style={{maxWidth:'1300px',margin:'0 auto',padding:'0 clamp(24px,4vw,56px)'}}>
        <motion.div {...fromBelow()} style={{textAlign:'center',marginBottom:'clamp(52px,8vh,80px)'}}>
          <Label>Payment Plans</Label>
          <h2 style={{...T.heading,fontSize:'clamp(38px,5.5vw,72px)',color:T.ink,lineHeight:1.0}}>
            Your Unit.<br/><span style={{fontStyle:'italic'}}><G>Your Terms.</G></span>
          </h2>
          <Divider/>
          {/* anchoring — lead with the smallest entry point */}
          <p style={{...T.bold,fontSize:'clamp(15px,2vw,19px)',color:T.ink,marginBottom:'8px'}}>
            Start from just PKR 2,20,000.
          </p>
          <P style={{maxWidth:'420px',margin:'0 auto',textAlign:'center'}}>
            10% secures your unit. 24 monthly installments cover the rest. No balloon payments. No surprises.
          </P>
        </motion.div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'16px'}}>
          {plans.map((p,i)=>(
            <motion.div key={p.size}
              initial={{opacity:0,y:60,scale:0.96}} whileInView={{opacity:1,y:0,scale:1}}
              viewport={{once:true,margin:'-50px'}} transition={{duration:0.85,delay:i*0.1,ease:[0.22,1,0.36,1]}}
              style={{background:T.white,border:p.tag==='Most Popular'?'2px solid '+T.gold:'1px solid rgba(0,0,0,0.08)',padding:'clamp(28px,3.5vw,44px) clamp(20px,2.5vw,32px)',position:'relative',boxShadow:p.tag==='Most Popular'?'0 16px 56px rgba(201,168,76,0.18)':'0 4px 20px rgba(0,0,0,0.06)',transition:'all 0.35s'}}
              className="hover:-translate-y-2 hover:shadow-2xl"
            >
              {p.tag&&(
                <div style={{position:'absolute',top:'-1px',left:'50%',transform:'translateX(-50%)',background:T.gold,color:'#fff',...T.label,padding:'5px 18px',whiteSpace:'nowrap',fontSize:'8px'}}>
                  {p.tag.toUpperCase()}
                </div>
              )}
              <p style={{...T.heading,fontSize:'clamp(32px,4vw,48px)',color:T.goldDark,lineHeight:1,marginTop:p.tag?'16px':'0'}}>
                {p.size}
              </p>
              <p style={{...T.label,color:T.muted,marginBottom:'20px',marginTop:'4px',fontSize:'9px'}}>Commercial Unit</p>
              <div style={{height:'1px',background:'rgba(0,0,0,0.07)',marginBottom:'18px'}}/>
              {[
                {label:'Total Price',        val:'PKR '+p.total,    gold:false},
                {label:'10% Booking',        val:'PKR '+p.booking,  gold:true },
                {label:'Monthly Install.',   val:'PKR '+p.monthly,  gold:false},
                {label:'Quarterly',          val:'PKR '+p.quarterly,gold:false},
                {label:'Possession',         val:'On Request',      gold:false},
              ].map(row=>(
                <div key={row.label} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'9px 0',borderBottom:'1px solid rgba(0,0,0,0.05)'}}>
                  <span style={{...T.body,fontSize:'12px',color:T.muted}}>{row.label}</span>
                  <span style={{...T.bold,fontSize:'12px',color:row.gold?T.goldDark:T.ink}}>{row.val}</span>
                </div>
              ))}
              <a href="tel:03111786243"
                style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',marginTop:'22px',background:T.black,color:'#fff',...T.bold,fontSize:'11px',letterSpacing:'0.15em',padding:'14px',textDecoration:'none',transition:'all 0.3s'}}
                onMouseEnter={e=>e.currentTarget.style.background=T.gold}
                onMouseLeave={e=>e.currentTarget.style.background=T.black}
              >
                ENQUIRE NOW <ChevronRight size={12}/>
              </a>
            </motion.div>
          ))}
        </div>
        <motion.p {...fromBelow(0.2)} style={{...T.body,fontSize:'12px',color:T.muted,textAlign:'center',marginTop:'22px',lineHeight:'1.8'}}>
          * Prices based on 22,000 PKR/sq.ft. Installment plan is 24 months. Contact us for custom unit sizes and current availability.
        </motion.p>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────
   GALLERY
───────────────────────────────────────────────────── */
function Gallery() {
  const [lb,setLb] = useState(null)
  const imgs = [
    {src:'/images/hero1.jpg',     cap:'Night View',       sub:'Sargodha Road'   },
    {src:'/images/hero2.jpg',     cap:'Day View',         sub:'Grand Facade'    },
    {src:'/images/building1.jpg', cap:'Commercial Units', sub:'Now Available'   },
    {src:'/images/building2.jpg', cap:'Retail Spaces',    sub:'22K+ PKR/Sq.Ft' },
    {src:'/images/promo.jpg',     cap:'Book Now',         sub:'10% Booking'     },
    {src:'/images/chairman.jpg',  cap:'Ch. Abdul Rehman', sub:'Fatir Developers'},
  ]
  useEffect(()=>{
    const fn=e=>{if(e.key==='Escape')setLb(null)}
    window.addEventListener('keydown',fn)
    return ()=>window.removeEventListener('keydown',fn)
  },[])

  return (
    <section id="gallery" style={{background:T.white,padding:'clamp(80px,11vh,130px) 0'}}>
      <div style={{maxWidth:'1300px',margin:'0 auto',padding:'0 clamp(24px,4vw,56px)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:'clamp(36px,5vh,56px)',flexWrap:'wrap',gap:'16px'}}>
          <motion.div {...fromLeft()}>
            <Label>Gallery</Label>
            <h2 style={{...T.heading,fontSize:'clamp(38px,5.5vw,72px)',color:T.ink,lineHeight:1.0}}>
              See It<br/><span style={{fontStyle:'italic'}}><G>For Yourself.</G></span>
            </h2>
          </motion.div>
          <motion.span {...fromRight(0.1)} style={{...T.label,color:T.muted}}>Click to enlarge</motion.span>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(12,1fr)',gap:'10px'}}>
          <motion.div {...fromLeft()}
            style={{gridColumn:'span 7',height:'clamp(220px,38vh,460px)',position:'relative',overflow:'hidden',cursor:'zoom-in'}}
            className="group" onClick={()=>setLb(0)}>
            <GImg img={imgs[0]}/>
          </motion.div>
          <motion.div {...fromRight(0.08)} style={{gridColumn:'span 5',display:'flex',flexDirection:'column',gap:'10px'}}>
            {[1,2].map(idx=>(
              <div key={idx} style={{flex:1,height:'clamp(105px,18.5vh,224px)',position:'relative',overflow:'hidden',cursor:'zoom-in'}}
                className="group" onClick={()=>setLb(idx)}>
                <GImg img={imgs[idx]}/>
              </div>
            ))}
          </motion.div>
          {[3,4,5].map((idx,i)=>(
            <motion.div key={idx}
              initial={{opacity:0,y:50}} whileInView={{opacity:1,y:0}}
              viewport={{once:true,margin:'-40px'}} transition={{duration:0.8,delay:i*0.1,ease:[0.22,1,0.36,1]}}
              style={{gridColumn:'span 4',height:'clamp(140px,22vh,260px)',position:'relative',overflow:'hidden',cursor:'zoom-in'}}
              className="group" onClick={()=>setLb(idx)}>
              <GImg img={imgs[idx]}/>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lb!==null&&(
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            onClick={()=>setLb(null)}
            style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.97)',zIndex:300,display:'flex',alignItems:'center',justifyContent:'center',padding:'32px',cursor:'zoom-out'}}>
            <motion.img initial={{scale:0.86,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.86,opacity:0}}
              src={imgs[lb].src} alt={imgs[lb].cap}
              style={{maxWidth:'88vw',maxHeight:'80vh',objectFit:'contain',cursor:'default',boxShadow:'0 40px 120px rgba(0,0,0,0.9)'}}
              onClick={e=>e.stopPropagation()}/>
            <button onClick={()=>setLb(null)}
              style={{position:'absolute',top:'20px',right:'24px',background:'none',border:'1px solid rgba(255,255,255,0.2)',color:'#fff',...T.label,fontSize:'9px',padding:'9px 18px',cursor:'pointer'}}>
              CLOSE
            </button>
            <div style={{position:'absolute',bottom:'24px',textAlign:'center',left:'50%',transform:'translateX(-50%)'}}>
              <p style={{...T.heading,fontSize:'22px',color:'#fff'}}>{imgs[lb].cap}</p>
              <p style={{...T.label,color:T.gold,marginTop:'4px',fontSize:'9px'}}>{imgs[lb].sub}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function GImg({img}) {
  return (
    <>
      <img src={img.src} alt={img.cap} loading="lazy"
        style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:img.cap.includes('Abdul')?'top':'center',transition:'transform 0.7s ease'}}
        className="group-hover:scale-105"/>
      <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,0.7),transparent 55%)'}}/>
      <div style={{position:'absolute',bottom:'14px',left:'16px'}}>
        <p style={{...T.heading,fontSize:'clamp(14px,1.6vw,21px)',color:'#fff',lineHeight:1.2}}>{img.cap}</p>
        <p style={{...T.label,color:T.gold,marginTop:'3px',fontSize:'8px'}}>{img.sub}</p>
      </div>
    </>
  )
}

/* ─────────────────────────────────────────────────────
   CHAIRMAN
   30yr insight: People buy from people. A face, a name,
   a direct quote from the chairman closes more deals
   than any brochure. Make the chairman accessible.
───────────────────────────────────────────────────── */
function Chairman() {
  return (
    <section id="chairman" style={{background:T.black,overflow:'hidden'}}>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))'}}>

        <motion.div {...fromLeft()} style={{position:'relative',minHeight:'clamp(400px,55vh,660px)',overflow:'hidden'}}>
          <img src="/images/chairman.jpg" alt="Ch. Abdul Rehman"
            style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top center',position:'absolute',inset:0}}/>
          <div style={{position:'absolute',inset:0,background:'linear-gradient(to right,transparent 35%,'+T.black+' 100%)'}}/>
          <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,'+T.black+' 0%,transparent 30%)'}}/>
        </motion.div>

        <motion.div {...fromRight(0.15)}
          style={{display:'flex',flexDirection:'column',justifyContent:'center',padding:'clamp(52px,7vh,100px) clamp(32px,5.5vw,84px)'}}>
          <Label light>The Man Behind It</Label>
          <h2 style={{...T.heading,fontSize:'clamp(32px,4.2vw,56px)',color:'#ffffff',lineHeight:1.1}}>
            Ch. Abdul Rehman
          </h2>
          <p style={{...T.label,color:T.gold,margin:'8px 0 28px',fontSize:'9px'}}>
            Chairman — Fatir Developers Pvt. Ltd.
          </p>

          <div style={{borderLeft:'3px solid rgba(201,168,76,0.35)',paddingLeft:'22px',marginBottom:'24px'}}>
            <Quote size={20} style={{color:'rgba(201,168,76,0.3)',marginBottom:'12px'}}/>
            <p style={{...T.heading,fontSize:'clamp(17px,2vw,23px)',color:'rgba(255,255,255,0.9)',lineHeight:'1.85',fontStyle:'italic',fontWeight:600}}>
              "I have been in Faisalabad real estate for over two decades. I have never seen a location with this combination of traffic, price, and growth potential. I would not put my name on it if I didn't believe it would make every investor proud."
            </p>
          </div>

          <P light style={{marginBottom:'32px'}}>
            Ch. Abdul Rehman has personally overseen every stage of Business Hub's development — from TMA approvals to architectural design. His reputation is on this building. That is the strongest guarantee in the industry.
          </P>

          <a href="tel:03111786243"
            style={{display:'inline-flex',alignItems:'center',gap:'10px',background:T.gold,color:'#fff',...T.bold,fontSize:'11px',letterSpacing:'0.15em',padding:'14px 28px',textDecoration:'none',alignSelf:'flex-start',transition:'all 0.3s',boxShadow:'0 8px 28px rgba(201,168,76,0.25)'}}
            onMouseEnter={e=>e.currentTarget.style.background='#7a4f08'}
            onMouseLeave={e=>e.currentTarget.style.background=T.gold}
          >
            <Phone size={12}/> SPEAK WITH OUR TEAM
          </a>
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────
   LOCATION
───────────────────────────────────────────────────── */
function Location() {
  const landmarks = [
    {dist:'0 min',  label:'Business Hub Faisalabad',       note:'You are here',     highlight:true },
    {dist:'2 min',  label:'Sargodha Road Boulevard',       note:'Direct frontage',  highlight:false},
    {dist:'5 min',  label:'Canal Road Intersection',       note:'Major connector',  highlight:false},
    {dist:'8 min',  label:'Faisalabad Ring Road',          note:'City-wide access', highlight:false},
    {dist:'10 min', label:'Faisalabad City Centre',        note:'Downtown core',    highlight:false},
    {dist:'12 min', label:'Allama Iqbal Industrial Estate',note:'Industrial zone',  highlight:false},
    {dist:'15 min', label:'Faisalabad Airport',            note:'Air connectivity', highlight:false},
    {dist:'20 min', label:'M-3 Motorway Interchange',      note:'National highway', highlight:false},
  ]
  return (
    <section id="location" style={{background:T.light,padding:'clamp(80px,11vh,130px) 0'}}>
      <div style={{maxWidth:'1300px',margin:'0 auto',padding:'0 clamp(24px,4vw,56px)'}}>
        <motion.div {...fromBelow()} style={{textAlign:'center',marginBottom:'clamp(52px,8vh,80px)'}}>
          <Label>Location</Label>
          <h2 style={{...T.heading,fontSize:'clamp(38px,5.5vw,72px)',color:T.ink,lineHeight:1.0}}>
            Everything Within<br/><span style={{fontStyle:'italic'}}><G>Easy Reach.</G></span>
          </h2>
          <Divider/>
          <P style={{maxWidth:'440px',margin:'0 auto',textAlign:'center'}}>
            Sargodha Road is Faisalabad's spine. Business Hub sits at its commercial heart — connected to everywhere that matters.
          </P>
        </motion.div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'clamp(32px,5vw,60px)',alignItems:'start'}}>
          <motion.div {...fromLeft()}>
            <div style={{overflow:'hidden',border:'1px solid rgba(0,0,0,0.09)',boxShadow:'0 8px 40px rgba(0,0,0,0.09)',position:'relative'}}>
              <iframe
                title="Business Hub Faisalabad"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54474.91152779498!2d73.0478755!3d31.4504174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392269b06f0b5af3%3A0x8e3d99f4b1c5e8c5!2sSargodha%20Rd%2C%20Faisalabad!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk"
                width="100%" height="360"
                style={{border:0,display:'block'}}
                allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
              <div style={{position:'absolute',bottom:'12px',left:'12px',background:'rgba(255,255,255,0.97)',border:'1px solid rgba(201,168,76,0.3)',padding:'10px 16px',backdropFilter:'blur(8px)',boxShadow:'0 4px 20px rgba(0,0,0,0.1)'}}>
                <p style={{...T.bold,fontSize:'14px',color:T.ink}}>Business Hub</p>
                <p style={{...T.label,color:T.goldDark,marginTop:'2px',fontSize:'8px'}}>SARGODHA ROAD · FAISALABAD</p>
              </div>
            </div>
            <a href="https://maps.google.com/?q=Sargodha+Road+Faisalabad" target="_blank" rel="noreferrer"
              style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',marginTop:'10px',background:T.black,color:'#fff',...T.bold,fontSize:'11px',letterSpacing:'0.15em',padding:'13px',textDecoration:'none',transition:'background 0.3s'}}
              onMouseEnter={e=>e.currentTarget.style.background=T.gold}
              onMouseLeave={e=>e.currentTarget.style.background=T.black}
            >
              <ExternalLink size={12}/> OPEN IN GOOGLE MAPS
            </a>
          </motion.div>

          <motion.div {...fromRight(0.15)}>
            <p style={{...T.label,color:T.goldDark,marginBottom:'18px'}}>Distance Guide</p>
            <div style={{background:T.white,border:'1px solid rgba(0,0,0,0.07)',boxShadow:'0 4px 24px rgba(0,0,0,0.06)'}}>
              {landmarks.map((l,i)=>(
                <motion.div key={l.label}
                  initial={{opacity:0,x:24}} whileInView={{opacity:1,x:0}}
                  viewport={{once:true}} transition={{duration:0.6,delay:i*0.05}}
                  style={{display:'flex',alignItems:'center',gap:'16px',padding:'14px 20px',borderBottom:i<landmarks.length-1?'1px solid rgba(0,0,0,0.05)':'none',background:l.highlight?'rgba(201,168,76,0.06)':'transparent',transition:'background 0.3s'}}
                  className={l.highlight?'':'hover:bg-stone-50'}
                >
                  <div style={{width:'52px',flexShrink:0}}>
                    <span style={{...T.bold,fontSize:'12px',color:l.highlight?T.goldDark:'#aaa'}}>{l.dist}</span>
                  </div>
                  <div style={{flex:1}}>
                    <p style={{...T.body,fontSize:'13px',color:l.highlight?T.ink:'#444',fontWeight:l.highlight?700:500}}>{l.label}</p>
                    <p style={{...T.body,fontSize:'11px',color:l.highlight?T.goldDark:'#bbb',marginTop:'1px',fontWeight:l.highlight?600:400}}>{l.note}</p>
                  </div>
                  {l.highlight&&<div style={{width:'5px',height:'5px',background:T.gold,transform:'rotate(45deg)',flexShrink:0}}/>}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────
   CTA BANNER
   30yr insight: The final push before contact. Make them
   feel the cost of waiting. Then make action feel easy.
───────────────────────────────────────────────────── */
function CTABanner() {
  return (
    <section style={{background:T.black,padding:'clamp(80px,11vh,130px) clamp(24px,4vw,56px)',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0}}>
        <img src="/images/hero2.jpg" alt="" aria-hidden style={{width:'100%',height:'100%',objectFit:'cover',filter:'brightness(0.12)'}}/>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(135deg,rgba(0,0,0,0.97),rgba(122,79,8,0.08))'}}/>
      </div>
      <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(to right,transparent,rgba(201,168,76,0.4),transparent)'}}/>
      <div style={{position:'absolute',bottom:0,left:0,right:0,height:'1px',background:'linear-gradient(to right,transparent,rgba(201,168,76,0.4),transparent)'}}/>

      <div style={{position:'relative',zIndex:5,maxWidth:'820px',margin:'0 auto',textAlign:'center'}}>
        <motion.div {...fromBelow()}>
          <Label light>The Decision</Label>
          <h2 style={{...T.heading,fontWeight:700,lineHeight:0.95,color:'#fff',fontSize:'clamp(42px,7vw,90px)'}}>
            Every month you wait,
          </h2>
          <h2 style={{...T.heading,fontWeight:700,fontStyle:'italic',lineHeight:0.95,fontSize:'clamp(42px,7vw,90px)',marginBottom:'20px'}}>
            <G>the price goes up.</G>
          </h2>
          <Divider light/>
          <P light style={{maxWidth:'440px',margin:'0 auto 44px',textAlign:'center'}}>
            Investors who booked in the first phase of every major Faisalabad project paid less and gained more. The second phase is always more expensive. This is the first phase.
          </P>
          <div style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap'}}>
            <a href="tel:03111786243"
              style={{display:'inline-flex',alignItems:'center',gap:'10px',background:T.gold,color:'#fff',...T.bold,fontSize:'12px',letterSpacing:'0.15em',padding:'clamp(15px,2vh,19px) clamp(32px,4.5vw,52px)',textDecoration:'none',transition:'all 0.3s',boxShadow:'0 8px 32px rgba(201,168,76,0.3)'}}
              onMouseEnter={e=>{e.currentTarget.style.background='#7a4f08';e.currentTarget.style.transform='translateY(-2px)'}}
              onMouseLeave={e=>{e.currentTarget.style.background=T.gold;e.currentTarget.style.transform='translateY(0)'}}
            >
              <Phone size={15}/> CALL NOW — 03-111-786-243
            </a>
            <a href="https://www.facebook.com/Businesshubfaisalabad/" target="_blank" rel="noreferrer"
              style={{display:'inline-flex',alignItems:'center',gap:'10px',border:'1px solid rgba(255,255,255,0.2)',color:'rgba(255,255,255,0.85)',...T.bold,fontSize:'12px',letterSpacing:'0.15em',padding:'clamp(15px,2vh,19px) clamp(32px,4.5vw,52px)',textDecoration:'none',transition:'all 0.3s'}}
              onMouseEnter={e=>e.currentTarget.style.borderColor=T.gold}
              onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(255,255,255,0.2)'}
            >
              <Facebook size={15}/> FOLLOW US
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────
   CONTACT
───────────────────────────────────────────────────── */
function Contact() {
  return (
    <section id="contact" style={{background:T.white,padding:'clamp(80px,11vh,130px) 0'}}>
      <div style={{maxWidth:'1300px',margin:'0 auto',padding:'0 clamp(24px,4vw,56px)'}}>
        <motion.div {...fromBelow()} style={{textAlign:'center',marginBottom:'clamp(52px,8vh,80px)'}}>
          <Label>Contact Us</Label>
          <h2 style={{...T.heading,fontSize:'clamp(38px,5.5vw,72px)',color:T.ink,lineHeight:1.0}}>
            One Call.<br/><span style={{fontStyle:'italic'}}><G>One Decision.</G></span>
          </h2>
          <Divider/>
          <P style={{maxWidth:'360px',margin:'0 auto',textAlign:'center'}}>
            Our team answers every call personally. No bots. No hold music. Real answers about real availability — right now.
          </P>
        </motion.div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'16px',marginBottom:'48px'}}>
          {[
            {icon:Phone,    label:'Call Us',   val:'03-111-786-243',            href:'tel:03111786243'},
            {icon:MapPin,   label:'Location',  val:'Sargodha Road, Faisalabad', href:null},
            {icon:Facebook, label:'Follow Us', val:'@BusinessHubFsd',           href:'https://www.facebook.com/Businesshubfaisalabad/'},
          ].map((item,i)=>(
            <motion.div key={item.label}
              initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}}
              viewport={{once:true}} transition={{duration:0.8,delay:i*0.1,ease:[0.22,1,0.36,1]}}
              style={{background:T.light,padding:'clamp(32px,5vh,52px) clamp(20px,3vw,36px)',textAlign:'center',border:'1px solid rgba(0,0,0,0.07)',boxShadow:'0 4px 24px rgba(0,0,0,0.05)',transition:'all 0.3s'}}
              className="hover:shadow-xl hover:-translate-y-2"
            >
              <div style={{width:'52px',height:'52px',background:'rgba(201,168,76,0.1)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px'}}>
                <item.icon size={20} style={{color:T.gold}}/>
              </div>
              <p style={{...T.label,color:T.muted,marginBottom:'10px',fontSize:'9px'}}>{item.label}</p>
              {item.href
                ? <a href={item.href} target={item.href.startsWith('http')?'_blank':undefined} rel="noreferrer"
                    style={{...T.heading,fontSize:'clamp(17px,2vw,24px)',color:T.ink,textDecoration:'none',transition:'color 0.3s'}}
                    className="hover:!text-amber-700">{item.val}</a>
                : <p style={{...T.heading,fontSize:'clamp(17px,2vw,24px)',color:T.ink}}>{item.val}</p>
              }
            </motion.div>
          ))}
        </div>

        <motion.div {...fromBelow(0.2)} style={{textAlign:'center'}}>
          <a href="tel:03111786243"
            style={{display:'inline-flex',alignItems:'center',gap:'14px',background:T.black,color:'#fff',...T.bold,fontSize:'12px',letterSpacing:'0.2em',padding:'clamp(16px,2.2vh,22px) clamp(36px,5vw,68px)',textDecoration:'none',transition:'all 0.3s',boxShadow:'0 8px 32px rgba(0,0,0,0.15)'}}
            onMouseEnter={e=>{e.currentTarget.style.background=T.gold;e.currentTarget.style.transform='translateY(-2px)'}}
            onMouseLeave={e=>{e.currentTarget.style.background=T.black;e.currentTarget.style.transform='translateY(0)'}}
          >
            <Phone size={16}/> CALL 03-111-786-243 <ChevronRight size={16}/>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────── */
export default function Home() {
  return (
    <main>
      <Hero />
      <Ticker />
      <UrgencyBar />
      <About />
      <InvestmentCase />
      <Features />
      <PaymentPlan />
      <Gallery />
      <Chairman />
      <Location />
      <CTABanner />
      <Contact />
    </main>
  )
}
