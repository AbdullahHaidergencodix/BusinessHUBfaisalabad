import { useState, useEffect, useRef } from 'react'
import {
  motion, AnimatePresence,
  useScroll, useTransform, useInView
} from 'framer-motion'
import {
  Phone, MapPin, ChevronRight, ArrowDown,
  CheckCircle, ExternalLink, Facebook, Quote
} from 'lucide-react'
import Ticker from '../components/Ticker'

/* ─────────────────────────────────────────────────────
   TINY HELPERS
───────────────────────────────────────────────────── */
const G = ({ children }) => (
  <span style={{
    background: 'linear-gradient(135deg,#7a4f08,#c9a84c,#b8860b)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  }}>
    {children}
  </span>
)

const SectionLabel = ({ children }) => (
  <div style={{ display:'flex', alignItems:'center', gap:'14px', marginBottom:'16px' }}>
    <div style={{ width:'28px', height:'1px', background:'#c9a84c', flexShrink:0 }} />
    <span style={{
      fontFamily:'Montserrat', fontSize:'9px',
      letterSpacing:'0.45em', color:'#7a4f08',
      textTransform:'uppercase', fontWeight:600,
    }}>
      {children}
    </span>
  </div>
)

const GoldLine = () => (
  <div style={{ display:'flex', alignItems:'center', gap:'12px', margin:'24px 0' }}>
    <div style={{ height:'1px', flex:1, background:'linear-gradient(to right,#c9a84c,transparent)' }} />
    <div style={{ width:'4px', height:'4px', background:'#c9a84c', transform:'rotate(45deg)', flexShrink:0 }} />
    <div style={{ height:'1px', flex:1, background:'linear-gradient(to left,#c9a84c,transparent)' }} />
  </div>
)

/* animation presets */
const slideLeft = (delay = 0) => ({
  initial:     { opacity:0, x:-60 },
  whileInView: { opacity:1, x:0   },
  viewport:    { once:true, margin:'-60px' },
  transition:  { duration:0.9, delay, ease:[0.22,1,0.36,1] },
})
const slideRight = (delay = 0) => ({
  initial:     { opacity:0, x:60 },
  whileInView: { opacity:1, x:0  },
  viewport:    { once:true, margin:'-60px' },
  transition:  { duration:0.9, delay, ease:[0.22,1,0.36,1] },
})
const slideUp = (delay = 0) => ({
  initial:     { opacity:0, y:50 },
  whileInView: { opacity:1, y:0  },
  viewport:    { once:true, margin:'-60px' },
  transition:  { duration:0.9, delay, ease:[0.22,1,0.36,1] },
})
const fadeIn = (delay = 0) => ({
  initial:     { opacity:0 },
  whileInView: { opacity:1 },
  viewport:    { once:true, margin:'-60px' },
  transition:  { duration:1.1, delay },
})

/* strong readable body text */
const P = ({ children, style = {} }) => (
  <p style={{
    fontFamily:'Montserrat', fontSize:'13.5px',
    color:'#111111', lineHeight:'2',
    fontWeight:400, ...style,
  }}>
    {children}
  </p>
)

/* animated counter */
function Counter({ to, suffix = '' }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-80px' })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const end   = parseFloat(String(to).replace(/\D/g,''))
    const steps = 60
    const inc   = end / steps
    let cur     = 0
    const t = setInterval(() => {
      cur += inc
      if (cur >= end) { setVal(end); clearInterval(t) }
      else setVal(Math.floor(cur))
    }, 2000 / steps)
    return () => clearInterval(t)
  }, [inView, to])
  return <span ref={ref}>{val}{suffix}</span>
}

/* ─────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────── */
const SLIDES = [
  '/images/hero1.jpg',
  '/images/hero2.jpg',
  '/images/hero3.jpg',
]

function Hero() {
  const [cur, setCur]   = useState(0)
  const [prev, setPrev] = useState(null)
  const [dir, setDir]   = useState(1)   /* 1 = left→right  -1 = right→left */

  const go = (next, direction = 1) => {
    setPrev(cur)
    setDir(direction)
    setCur(next)
  }

  useEffect(() => {
    const t = setInterval(() => go((cur + 1) % SLIDES.length, 1), 7000)
    return () => clearInterval(t)
  // eslint-disable-next-line
  }, [cur])

  return (
    <section style={{ position:'relative', height:'100svh', minHeight:'600px', overflow:'hidden' }}>

      {/* ── exiting slide ─── */}
      <AnimatePresence>
        {prev !== null && (
          <motion.div key={`prev-${prev}`}
            initial={{ x:0, opacity:1 }}
            animate={{ x: dir * -100 + '%', opacity:0 }}
            exit={{}}
            transition={{ duration:1.1, ease:[0.77,0,0.18,1] }}
            style={{ position:'absolute', inset:0, zIndex:1 }}
            onAnimationComplete={() => setPrev(null)}
          >
            <img src={SLIDES[prev]} alt=""
              style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── entering slide ─── */}
      <motion.div key={`cur-${cur}`}
        initial={{ x: dir * 100 + '%' }}
        animate={{ x: '0%' }}
        transition={{ duration:1.1, ease:[0.77,0,0.18,1] }}
        style={{ position:'absolute', inset:0, zIndex:2 }}
      >
        <img src={SLIDES[cur]} alt="Business Hub Faisalabad"
          loading="eager"
          style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }} />
      </motion.div>

      {/* ── overlays ─── */}
      {/* heavy black overall */}
      <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.60)', zIndex:3 }} />
      {/* stronger left fade for text */}
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(105deg,rgba(0,0,0,0.80) 0%,rgba(0,0,0,0.25) 60%,transparent 100%)', zIndex:4 }} />
      {/* bottom fade to page bg */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'200px', background:'linear-gradient(to top,#f4f4f4,transparent)', zIndex:4 }} />
      {/* top fade for navbar */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'160px', background:'linear-gradient(to bottom,rgba(0,0,0,0.55),transparent)', zIndex:4 }} />

      {/* ── scan line ─── */}
      <motion.div
        style={{ position:'absolute', left:0, right:0, height:'1px', background:'linear-gradient(to right,transparent,rgba(201,168,76,0.3),transparent)', zIndex:5, pointerEvents:'none' }}
        animate={{ top:['0%','100%'] }}
        transition={{ duration:12, repeat:Infinity, ease:'linear' }}
      />

      {/* ── hero text ─── */}
      <div style={{ position:'absolute', inset:0, zIndex:10, display:'flex', flexDirection:'column', justifyContent:'center', padding:'0 clamp(28px,7vw,110px)', paddingTop:'90px' }}>
        <motion.div
          initial={{ opacity:0, y:36 }}
          animate={{ opacity:1, y:0  }}
          transition={{ duration:1.1, delay:0.3, ease:[0.22,1,0.36,1] }}
        >
          {/* overline */}
          <div style={{ display:'flex', alignItems:'center', gap:'14px', marginBottom:'clamp(16px,3vh,28px)' }}>
            <div style={{ width:'36px', height:'1px', background:'#c9a84c' }} />
            <span style={{ fontFamily:'Montserrat', fontSize:'clamp(8px,1vw,10px)', letterSpacing:'0.45em', color:'rgba(255,255,255,0.85)', fontWeight:500 }}>
              FATIR DEVELOPERS · FAISALABAD
            </span>
          </div>

          {/* headline */}
          <h1 style={{ fontFamily:'Cormorant Garamond,serif', fontWeight:300, lineHeight:0.9, marginBottom:'clamp(16px,3vh,28px)', maxWidth:'clamp(300px,62vw,720px)' }}>
            <span style={{ display:'block', fontSize:'clamp(48px,8.5vw,114px)', color:'#fff', textShadow:'0 2px 20px rgba(0,0,0,0.5)' }}>
              Sargodha Road's
            </span>
            <span style={{ display:'block', fontSize:'clamp(48px,8.5vw,114px)', fontStyle:'italic', background:'linear-gradient(135deg,#f5d485,#c9a84c,#7a4f08)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              New Identity.
            </span>
          </h1>

          {/* tags */}
          <div style={{ display:'flex', gap:'10px', flexWrap:'wrap', marginBottom:'clamp(24px,4vh,44px)' }}>
            {['TMA Approved','Drive-Thru Commercial','10% Booking'].map(t => (
              <span key={t} style={{ fontFamily:'Montserrat', fontSize:'clamp(8px,0.9vw,10px)', letterSpacing:'0.18em', color:'#fff', border:'1px solid rgba(255,255,255,0.4)', padding:'7px 16px', background:'rgba(0,0,0,0.35)', backdropFilter:'blur(8px)', fontWeight:500 }}>
                {t}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
            <a href="#contact"
              style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'#c9a84c', color:'#fff', fontFamily:'Montserrat', fontSize:'clamp(9px,1vw,11px)', letterSpacing:'0.25em', fontWeight:700, padding:'clamp(13px,2vh,17px) clamp(24px,3.5vw,36px)', textDecoration:'none', transition:'background 0.3s', whiteSpace:'nowrap' }}
              onMouseEnter={e => e.currentTarget.style.background='#7a4f08'}
              onMouseLeave={e => e.currentTarget.style.background='#c9a84c'}
            >
              BOOK NOW <ChevronRight size={13} />
            </a>
            <a href="#about"
              style={{ display:'inline-flex', alignItems:'center', gap:'10px', border:'1px solid rgba(255,255,255,0.45)', color:'#fff', fontFamily:'Montserrat', fontSize:'clamp(9px,1vw,11px)', letterSpacing:'0.25em', padding:'clamp(13px,2vh,17px) clamp(24px,3.5vw,36px)', textDecoration:'none', transition:'all 0.3s', background:'rgba(0,0,0,0.3)', backdropFilter:'blur(8px)', whiteSpace:'nowrap', fontWeight:500 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='#c9a84c'; e.currentTarget.style.color='#c9a84c' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.45)'; e.currentTarget.style.color='#fff' }}
            >
              EXPLORE
            </a>
          </div>
        </motion.div>
      </div>

      {/* ── slide dots ─── */}
      <div style={{ position:'absolute', bottom:'clamp(22px,4vh,42px)', left:'clamp(28px,7vw,110px)', zIndex:10, display:'flex', gap:'8px', alignItems:'center' }}>
        {SLIDES.map((_,i) => (
          <button key={i} onClick={() => go(i, i > cur ? 1 : -1)} aria-label={`Slide ${i+1}`}
            style={{ padding:0, border:'none', cursor:'pointer', height:'2px', width: i===cur ? '40px' : '14px', background: i===cur ? '#c9a84c' : 'rgba(255,255,255,0.3)', transition:'all 0.4s ease' }}
          />
        ))}
      </div>

      {/* progress */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'2px', background:'rgba(201,168,76,0.12)', zIndex:10 }}>
        <motion.div key={cur}
          style={{ height:'100%', background:'linear-gradient(to right,#7a4f08,#c9a84c,#f5d485)', transformOrigin:'left' }}
          initial={{ scaleX:0 }} animate={{ scaleX:1 }}
          transition={{ duration:7, ease:'linear' }}
        />
      </div>

      {/* scroll cue */}
      <motion.div animate={{ y:[0,8,0] }} transition={{ repeat:Infinity, duration:2.5 }}
        style={{ position:'absolute', bottom:'clamp(22px,4vh,38px)', right:'28px', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:'6px', color:'rgba(255,255,255,0.4)' }}>
        <span style={{ fontFamily:'Montserrat', fontSize:'8px', letterSpacing:'0.3em', writingMode:'vertical-rl' }}>SCROLL</span>
        <ArrowDown size={12} />
      </motion.div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────
   STATS
───────────────────────────────────────────────────── */
function Stats() {
  const items = [
    { val:10,    suffix:'%',   label:'Booking Amount'    },
    { val:2,     suffix:' Yr', label:'Easy Installments' },
    { val:'TMA', suffix:'',    label:'Govt Approved'     },
    { val:22,    suffix:'K+',  label:'PKR / Sq.Ft'       },
  ]
  return (
    <div style={{ background:'#fff', borderTop:'1px solid rgba(0,0,0,0.07)', borderBottom:'1px solid rgba(0,0,0,0.07)', boxShadow:'0 2px 24px rgba(0,0,0,0.05)' }}>
      <div style={{ maxWidth:'1100px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)' }}>
        {items.map((s,i) => (
          <motion.div key={s.label} {...slideUp(i*0.08)}
            style={{ padding:'clamp(28px,4vh,48px) 16px', textAlign:'center', borderRight: i<3 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}
          >
            <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(36px,4.5vw,58px)', fontWeight:700, lineHeight:1, color:'#7a4f08' }}>
              {typeof s.val === 'number'
                ? <><Counter to={s.val} />{s.suffix}</>
                : s.val
              }
            </p>
            <p style={{ fontFamily:'Montserrat', fontSize:'9px', letterSpacing:'0.28em', color:'#444444', marginTop:'8px', textTransform:'uppercase', fontWeight:600 }}>
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────
   ABOUT
───────────────────────────────────────────────────── */
function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target:ref, offset:['start end','end start'] })
  const y = useTransform(scrollYProgress, [0,1], ['5%','-5%'])

  const bullets = [
    'Approved by Tehsil Municipal Administration (TMA)',
    '10% booking — 2-year easy monthly installments',
    'Shops from 22,000 PKR per sq.ft onwards',
    'Buy, Sale & Lease options available',
    'Possession available on request',
    'Highest ROI corridor in Faisalabad',
  ]
  return (
    <section id="about" ref={ref}
      style={{ background:'#f4f4f4', padding:'clamp(80px,11vh,130px) 0', overflow:'hidden' }}>
      <div style={{ maxWidth:'1300px', margin:'0 auto', padding:'0 clamp(24px,4vw,52px)', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'clamp(48px,7vw,96px)', alignItems:'center' }}>

        {/* image slides in from left */}
        <motion.div {...slideLeft()} style={{ position:'relative' }}>
          <div style={{ overflow:'hidden', boxShadow:'0 32px 80px rgba(0,0,0,0.12)' }}>
            <motion.img src="/images/building1.jpg" alt="Business Hub Faisalabad"
              style={{ width:'100%', height:'clamp(360px,52vh,580px)', objectFit:'cover', y }} />
          </div>
          <div style={{ position:'absolute', top:'-14px', left:'-14px', width:'80px', height:'80px', borderTop:'2px solid rgba(201,168,76,0.5)', borderLeft:'2px solid rgba(201,168,76,0.5)', pointerEvents:'none' }} />
          <div style={{ position:'absolute', bottom:'-14px', right:'-14px', width:'80px', height:'80px', borderBottom:'2px solid rgba(201,168,76,0.5)', borderRight:'2px solid rgba(201,168,76,0.5)', pointerEvents:'none' }} />
          <div style={{ position:'absolute', bottom:'32px', left:'-20px', background:'#c9a84c', padding:'16px 22px', boxShadow:'0 8px 32px rgba(201,168,76,0.35)' }}>
            <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'38px', fontWeight:700, color:'#fff', lineHeight:1 }}>2025</p>
            <p style={{ fontFamily:'Montserrat', fontSize:'8px', letterSpacing:'0.3em', color:'rgba(255,255,255,0.85)', marginTop:'3px', fontWeight:600 }}>COMPLETION</p>
          </div>
        </motion.div>

        {/* text slides in from right */}
        <motion.div {...slideRight(0.1)}>
          <SectionLabel>About The Project</SectionLabel>
          <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontWeight:300, lineHeight:1.05, color:'#1a1a1a', fontSize:'clamp(36px,4.2vw,60px)' }}>
            A New Era of
          </h2>
          <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontWeight:700, fontStyle:'italic', lineHeight:1.05, fontSize:'clamp(36px,4.2vw,60px)', marginBottom:'6px' }}>
            <G>Commercial Excellence</G>
          </h2>
          <GoldLine />
          <P style={{ marginBottom:'16px' }}>
            Business Hub Faisalabad is an iconic drive-thru commercial project by Fatir Developers Pvt. Ltd., strategically placed on Sargodha Road — Faisalabad's most rapidly growing commercial corridor.
          </P>
          <P style={{ marginBottom:'32px' }}>
            Grand neoclassical architecture fused with modern commercial design — offering premium retail spaces engineered for maximum footfall, visibility, and return on investment.
          </P>
          <div style={{ display:'flex', flexDirection:'column', gap:'11px' }}>
            {bullets.map((b,i) => (
              <motion.div key={b}
                initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true }} transition={{ duration:0.6, delay:i*0.07 }}
                style={{ display:'flex', alignItems:'flex-start', gap:'11px' }}
              >
                <CheckCircle size={15} style={{ color:'#c9a84c', flexShrink:0, marginTop:'3px' }} />
                <span style={{ fontFamily:'Montserrat', fontSize:'13px', color:'#111111', lineHeight:'1.75', fontWeight:400 }}>{b}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────
   FEATURES
───────────────────────────────────────────────────── */
function Features() {
  const list = [
    { n:'01', title:'Drive-Thru Concept',       desc:'Built for the modern consumer — maximum convenience, zero friction. Customers pull up, transact, and leave. Your business never stops.' },
    { n:'02', title:'Prime Location',            desc:'Sargodha Road carries the highest daily traffic volume in this corridor. Every unit gets seen by thousands of potential customers daily.' },
    { n:'03', title:'Neoclassical Architecture', desc:'Grand white arches, European-inspired facades — a commanding presence that instantly elevates your brand.' },
    { n:'04', title:'Maximum ROI',               desc:'Lowest entry at 22,000 PKR/sq.ft with consistent corridor appreciation. Smart investors are already securing their units.' },
    { n:'05', title:'TMA Approved',              desc:'Fully cleared by Tehsil Municipal Administration. Transparent documentation, zero legal risk, complete peace of mind.' },
    { n:'06', title:'Trusted Developer',         desc:'Fatir Developers Pvt. Ltd. — a proven track record delivering commercial landmarks in Faisalabad, on time and on promise.' },
  ]
  return (
    <section id="features"
      style={{ background:'#fff', padding:'clamp(80px,11vh,130px) 0' }}>
      <div style={{ maxWidth:'1300px', margin:'0 auto', padding:'0 clamp(24px,4vw,52px)' }}>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'40px', alignItems:'end', marginBottom:'clamp(48px,7vh,80px)' }}>
          <motion.div {...slideLeft()}>
            <SectionLabel>Why Invest</SectionLabel>
            <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontWeight:300, lineHeight:0.95, color:'#1a1a1a', fontSize:'clamp(42px,5.5vw,74px)' }}>
              Built for<br /><span style={{ fontStyle:'italic' }}><G>Success</G></span>
            </h2>
          </motion.div>
          <motion.div {...slideRight(0.1)}>
            <P>Every element is engineered to maximize your business potential, brand visibility, and long-term investment return.</P>
          </motion.div>
        </div>

        <div style={{ borderTop:'1px solid rgba(0,0,0,0.08)' }}>
          {list.map((f,i) => (
            <motion.div key={f.n}
              initial={{ opacity:0, x: i%2===0 ? -40 : 40 }}
              whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true, margin:'-50px' }}
              transition={{ duration:0.8, delay:i*0.04, ease:[0.22,1,0.36,1] }}
              style={{ borderBottom:'1px solid rgba(0,0,0,0.06)', display:'grid', gridTemplateColumns:'clamp(44px,5vw,80px) 1fr 1fr', gap:'clamp(16px,3vw,44px)', alignItems:'center', padding:'clamp(22px,3vw,38px) 0', transition:'background 0.3s', cursor:'default' }}
              className="group hover:bg-amber-50/60"
            >
              <span style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(28px,3.5vw,44px)', fontWeight:300, color:'rgba(201,168,76,0.3)', lineHeight:1 }}>
                {f.n}
              </span>
              <h3 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(20px,2.2vw,30px)', color:'#111111', fontWeight:600, transition:'color 0.3s' }}
                className="group-hover:!text-amber-800">
                {f.title}
              </h3>
              <P style={{ fontSize:'12.5px', color:'#222222' }}>{f.desc}</P>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────
   WHY SARGODHA ROAD
───────────────────────────────────────────────────── */
function WhySargodhRoad() {
  const stats = [
    { val:1,   suffix:'st', label:'Fastest growing commercial corridor in Faisalabad' },
    { val:200, suffix:'K+', label:'Daily vehicles passing through Sargodha Road'      },
    { val:3,   suffix:'X',  label:'Property value appreciation over last 5 years'     },
    { val:50,  suffix:'+',  label:'Major brands already operating nearby'             },
  ]
  const reasons = [
    'Direct connectivity to Faisalabad Ring Road',
    'Proximity to major residential schemes',
    'Highest footfall density in the district',
    'Rapid infrastructure development underway',
    'Central to upcoming industrial expansion zones',
    'Anchor tenants & national brands moving in',
  ]
  return (
    <section style={{ background:'#f4f4f4', padding:'clamp(80px,11vh,130px) 0' }}>
      <div style={{ maxWidth:'1300px', margin:'0 auto', padding:'0 clamp(24px,4vw,52px)' }}>

        <motion.div {...slideUp()} style={{ textAlign:'center', marginBottom:'clamp(52px,8vh,88px)' }}>
          <SectionLabel>Location Intelligence</SectionLabel>
          <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontWeight:300, lineHeight:1, color:'#1a1a1a', fontSize:'clamp(38px,5.5vw,72px)' }}>
            Why <span style={{ fontStyle:'italic' }}><G>Sargodha Road?</G></span>
          </h2>
          <GoldLine />
          <P style={{ maxWidth:'460px', margin:'0 auto', textAlign:'center' }}>
            The numbers don't lie. Sargodha Road is Faisalabad's most explosive growth corridor — and Business Hub sits right at its heart.
          </P>
        </motion.div>

        {/* stat cards — alternate slide directions */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'16px', marginBottom:'clamp(40px,6vh,64px)' }}>
          {stats.map((s,i) => (
            <motion.div key={s.label}
              initial={{ opacity:0, x: i%2===0 ? -50 : 50, y:20 }}
              whileInView={{ opacity:1, x:0, y:0 }}
              viewport={{ once:true, margin:'-50px' }}
              transition={{ duration:0.85, delay:i*0.08, ease:[0.22,1,0.36,1] }}
              style={{ background:'#fff', padding:'clamp(28px,4vh,44px) clamp(20px,3vw,36px)', boxShadow:'0 4px 28px rgba(0,0,0,0.07)', border:'1px solid rgba(0,0,0,0.05)', transition:'transform 0.3s, box-shadow 0.3s' }}
              className="hover:-translate-y-2 hover:shadow-xl"
            >
              <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(42px,5.5vw,64px)', fontWeight:700, lineHeight:1, color:'#7a4f08', marginBottom:'10px' }}>
                <Counter to={s.val} />{s.suffix}
              </p>
              <p style={{ fontFamily:'Montserrat', fontSize:'12.5px', color:'#222222', lineHeight:'1.7', fontWeight:400 }}>
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* reasons — slide up staggered */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))', gap:'12px' }}>
          {reasons.map((r,i) => (
            <motion.div key={r}
              initial={{ opacity:0, y:30 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, margin:'-40px' }}
              transition={{ duration:0.7, delay:i*0.06, ease:[0.22,1,0.36,1] }}
              style={{ display:'flex', alignItems:'flex-start', gap:'12px', padding:'18px 20px', background:'#fff', border:'1px solid rgba(0,0,0,0.06)', boxShadow:'0 2px 12px rgba(0,0,0,0.04)', transition:'all 0.3s' }}
              className="hover:border-amber-300 hover:shadow-md hover:-translate-y-1"
            >
              <CheckCircle size={15} style={{ color:'#c9a84c', flexShrink:0, marginTop:'3px' }} />
              <span style={{ fontFamily:'Montserrat', fontSize:'13px', color:'#111111', lineHeight:'1.7', fontWeight:400 }}>{r}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────
   PAYMENT PLAN
───────────────────────────────────────────────────── */
function PaymentPlan() {
  const plans = [
    { size:'100 Sq.Ft', total:'22,00,000', booking:'2,20,000', monthly:'73,333',   quarterly:'2,20,000', tag:null          },
    { size:'150 Sq.Ft', total:'33,00,000', booking:'3,30,000', monthly:'1,10,000', quarterly:'3,30,000', tag:'Most Popular' },
    { size:'200 Sq.Ft', total:'44,00,000', booking:'4,40,000', monthly:'1,46,667', quarterly:'4,40,000', tag:null          },
    { size:'300 Sq.Ft', total:'66,00,000', booking:'6,60,000', monthly:'2,20,000', quarterly:'6,60,000', tag:'Best Value'  },
  ]
  return (
    <section id="payment" style={{ background:'#fff', padding:'clamp(80px,11vh,130px) 0' }}>
      <div style={{ maxWidth:'1300px', margin:'0 auto', padding:'0 clamp(24px,4vw,52px)' }}>

        <motion.div {...slideUp()} style={{ textAlign:'center', marginBottom:'clamp(52px,8vh,80px)' }}>
          <SectionLabel>Investment Plans</SectionLabel>
          <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontWeight:300, lineHeight:1, color:'#1a1a1a', fontSize:'clamp(38px,5.5vw,72px)' }}>
            Payment <span style={{ fontStyle:'italic' }}><G>Breakdown</G></span>
          </h2>
          <GoldLine />
          <P style={{ maxWidth:'440px', margin:'0 auto', textAlign:'center' }}>
            Transparent pricing. No hidden costs. Secure your unit with just 10% booking and 24 easy monthly installments.
          </P>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:'16px' }}>
          {plans.map((p,i) => (
            <motion.div key={p.size}
              initial={{ opacity:0, y:60, scale:0.96 }}
              whileInView={{ opacity:1, y:0, scale:1 }}
              viewport={{ once:true, margin:'-50px' }}
              transition={{ duration:0.85, delay:i*0.1, ease:[0.22,1,0.36,1] }}
              style={{ background:'#f4f4f4', border: p.tag==='Most Popular' ? '2px solid #c9a84c' : '1px solid rgba(0,0,0,0.08)', padding:'clamp(28px,3.5vw,44px) clamp(20px,2.5vw,32px)', position:'relative', boxShadow: p.tag==='Most Popular' ? '0 12px 48px rgba(201,168,76,0.15)' : '0 4px 20px rgba(0,0,0,0.05)', transition:'transform 0.3s, box-shadow 0.3s' }}
              className="hover:-translate-y-2 hover:shadow-2xl"
            >
              {p.tag && (
                <div style={{ position:'absolute', top:'-1px', left:'50%', transform:'translateX(-50%)', background:'#c9a84c', color:'#fff', fontFamily:'Montserrat', fontSize:'8px', letterSpacing:'0.25em', fontWeight:700, padding:'5px 16px', whiteSpace:'nowrap' }}>
                  {p.tag.toUpperCase()}
                </div>
              )}
              <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(30px,3.8vw,48px)', fontWeight:700, lineHeight:1, color:'#7a4f08', marginBottom:'4px', marginTop: p.tag ? '16px' : '0' }}>
                {p.size}
              </p>
              <p style={{ fontFamily:'Montserrat', fontSize:'9px', letterSpacing:'0.3em', color:'#555555', marginBottom:'24px', textTransform:'uppercase', fontWeight:600 }}>
                Commercial Unit
              </p>
              <div style={{ height:'1px', background:'rgba(0,0,0,0.08)', marginBottom:'20px' }} />
              {[
                { label:'Total Price',       val:`PKR ${p.total}`,    gold:false },
                { label:'10% Booking',       val:`PKR ${p.booking}`,  gold:true  },
                { label:'Monthly Installment', val:`PKR ${p.monthly}`, gold:false },
                { label:'Quarterly',         val:`PKR ${p.quarterly}`,gold:false },
                { label:'Possession',        val:'On Request',        gold:false },
              ].map(row => (
                <div key={row.label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'9px 0', borderBottom:'1px solid rgba(0,0,0,0.05)' }}>
                  <span style={{ fontFamily:'Montserrat', fontSize:'11px', color:'#444444', fontWeight:400 }}>{row.label}</span>
                  <span style={{ fontFamily:'Montserrat', fontSize:'12px', fontWeight:700, color: row.gold ? '#7a4f08' : '#1a1a1a' }}>{row.val}</span>
                </div>
              ))}
              <a href="tel:03111786243"
                style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', marginTop:'24px', background:'#1a1a1a', color:'#fff', fontFamily:'Montserrat', fontSize:'10px', letterSpacing:'0.2em', padding:'13px', textDecoration:'none', transition:'all 0.3s', fontWeight:600 }}
                onMouseEnter={e => e.currentTarget.style.background='#c9a84c'}
                onMouseLeave={e => e.currentTarget.style.background='#1a1a1a'}
              >
                ENQUIRE <ChevronRight size={12} />
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p {...fadeIn(0.3)} style={{ fontFamily:'Montserrat', fontSize:'11.5px', color:'#555555', textAlign:'center', marginTop:'24px', lineHeight:'1.8', fontWeight:400 }}>
          * Prices based on 22,000 PKR/sq.ft starting rate. 24-month installment plan. Contact us for custom unit sizes.
        </motion.p>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────
   GALLERY
───────────────────────────────────────────────────── */
function Gallery() {
  const [lb, setLb] = useState(null)
  const imgs = [
    { src:'/images/hero1.jpg',     cap:'Night View',       sub:'Sargodha Road'    },
    { src:'/images/hero2.jpg',     cap:'Day View',         sub:'Grand Facade'     },
    { src:'/images/building1.jpg', cap:'Bookings Open',    sub:'Commercial Units' },
    { src:'/images/building2.jpg', cap:'Retail Spaces',    sub:'22K+ PKR/Sq.Ft'  },
    { src:'/images/promo.jpg',     cap:'10% Booking',      sub:'Easy Payments'    },
    { src:'/images/chairman.jpg',  cap:'Ch. Abdul Rehman', sub:'Fatir Developers' },
  ]
  useEffect(() => {
    const fn = e => { if (e.key==='Escape') setLb(null) }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  return (
    <section id="gallery" style={{ background:'#f4f4f4', padding:'clamp(80px,11vh,130px) 0' }}>
      <div style={{ maxWidth:'1300px', margin:'0 auto', padding:'0 clamp(24px,4vw,52px)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'clamp(32px,5vh,56px)', flexWrap:'wrap', gap:'16px' }}>
          <motion.div {...slideLeft()}>
            <SectionLabel>Gallery</SectionLabel>
            <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontWeight:300, lineHeight:1, color:'#1a1a1a', fontSize:'clamp(38px,5.5vw,72px)' }}>
              The <span style={{ fontStyle:'italic' }}><G>Vision</G></span>
            </h2>
          </motion.div>
          <motion.span {...slideRight(0.1)} style={{ fontFamily:'Montserrat', fontSize:'10px', letterSpacing:'0.25em', color:'#666666', textTransform:'uppercase' }}>
            Tap to enlarge
          </motion.span>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(12,1fr)', gap:'10px' }}>
          {/* big tile — slides from left */}
          <motion.div
            initial={{ opacity:0, x:-60 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, margin:'-60px' }}
            transition={{ duration:0.9, ease:[0.22,1,0.36,1] }}
            style={{ gridColumn:'span 7', height:'clamp(220px,38vh,460px)', position:'relative', overflow:'hidden', cursor:'zoom-in' }}
            className="group"
            onClick={() => setLb(0)}
          >
            <GalleryImg img={imgs[0]} />
          </motion.div>

          {/* right stack — slides from right */}
          <motion.div
            initial={{ opacity:0, x:60 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, margin:'-60px' }}
            transition={{ duration:0.9, delay:0.08, ease:[0.22,1,0.36,1] }}
            style={{ gridColumn:'span 5', display:'flex', flexDirection:'column', gap:'10px' }}
          >
            {[1,2].map((idx,i) => (
              <div key={idx}
                style={{ flex:1, height:'clamp(105px,18.5vh,224px)', position:'relative', overflow:'hidden', cursor:'zoom-in' }}
                className="group"
                onClick={() => setLb(idx)}
              >
                <GalleryImg img={imgs[idx]} />
              </div>
            ))}
          </motion.div>

          {/* bottom 3 — stagger up */}
          {[3,4,5].map((idx,i) => (
            <motion.div key={idx}
              initial={{ opacity:0, y:50 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, margin:'-40px' }}
              transition={{ duration:0.8, delay:i*0.1, ease:[0.22,1,0.36,1] }}
              style={{ gridColumn:'span 4', height:'clamp(140px,22vh,260px)', position:'relative', overflow:'hidden', cursor:'zoom-in' }}
              className="group"
              onClick={() => setLb(idx)}
            >
              <GalleryImg img={imgs[idx]} />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lb !== null && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={() => setLb(null)}
            style={{ position:'fixed', inset:0, background:'rgba(10,10,10,0.97)', zIndex:300, display:'flex', alignItems:'center', justifyContent:'center', padding:'32px', cursor:'zoom-out' }}
          >
            <motion.img
              initial={{ scale:0.85, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0.85, opacity:0 }}
              src={imgs[lb].src} alt={imgs[lb].cap}
              style={{ maxWidth:'88vw', maxHeight:'80vh', objectFit:'contain', cursor:'default', boxShadow:'0 40px 120px rgba(0,0,0,0.9)' }}
              onClick={e => e.stopPropagation()}
            />
            <button onClick={() => setLb(null)}
              style={{ position:'absolute', top:'20px', right:'24px', background:'none', border:'1px solid rgba(255,255,255,0.2)', color:'#fff', fontFamily:'Montserrat', fontSize:'9px', letterSpacing:'0.3em', padding:'9px 18px', cursor:'pointer' }}>
              CLOSE
            </button>
            <div style={{ position:'absolute', bottom:'24px', textAlign:'center', left:'50%', transform:'translateX(-50%)' }}>
              <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'22px', color:'#fff' }}>{imgs[lb].cap}</p>
              <p style={{ fontFamily:'Montserrat', fontSize:'9px', letterSpacing:'0.35em', color:'#c9a84c', marginTop:'4px' }}>{imgs[lb].sub}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function GalleryImg({ img }) {
  return (
    <>
      <img src={img.src} alt={img.cap} loading="lazy"
        style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition: img.cap.includes('Abdul') ? 'top' : 'center', transition:'transform 0.7s ease' }}
        className="group-hover:scale-108"
      />
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.65),transparent 50%)' }} />
      <div style={{ position:'absolute', bottom:'14px', left:'16px' }}>
        <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(14px,1.6vw,21px)', color:'#fff', lineHeight:1.2, fontWeight:500 }}>{img.cap}</p>
        <p style={{ fontFamily:'Montserrat', fontSize:'8px', letterSpacing:'0.28em', color:'#c9a84c', marginTop:'3px', fontWeight:600 }}>{img.sub}</p>
      </div>
    </>
  )
}

/* ─────────────────────────────────────────────────────
   CHAIRMAN
───────────────────────────────────────────────────── */
function Chairman() {
  return (
    <section id="chairman" style={{ background:'#fff', overflow:'hidden' }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))' }}>

        {/* image slides from left */}
        <motion.div {...slideLeft()} style={{ position:'relative', minHeight:'clamp(380px,52vh,640px)', overflow:'hidden' }}>
          <img src="/images/chairman.jpg" alt="Ch. Abdul Rehman"
            style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center', position:'absolute', inset:0 }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,transparent 40%,#fff 100%)' }} />
        </motion.div>

        {/* text slides from right */}
        <motion.div {...slideRight(0.15)}
          style={{ display:'flex', flexDirection:'column', justifyContent:'center', padding:'clamp(48px,7vh,96px) clamp(28px,5.5vw,80px)' }}
        >
          <SectionLabel>A Message From</SectionLabel>
          <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontWeight:300, color:'#1a1a1a', lineHeight:1.1, fontSize:'clamp(32px,4.2vw,56px)' }}>
            Ch. Abdul Rehman
          </h2>
          <p style={{ fontFamily:'Montserrat', fontSize:'9px', letterSpacing:'0.3em', color:'#7a4f08', margin:'8px 0 28px', textTransform:'uppercase', fontWeight:600 }}>
            Chairman — Fatir Developers Pvt. Ltd.
          </p>
          <div style={{ borderLeft:'3px solid rgba(201,168,76,0.4)', paddingLeft:'22px', marginBottom:'24px' }}>
            <Quote size={20} style={{ color:'rgba(201,168,76,0.35)', marginBottom:'12px' }} />
            <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(17px,2vw,23px)', color:'#111111', lineHeight:'1.85', fontStyle:'italic', fontWeight:400 }}>
              "Business Hub Faisalabad is not merely a commercial project — it is our commitment to transforming Sargodha Road into a world-class business destination that delivers lasting value, prestige, and prosperity for every investor."
            </p>
          </div>
          <P style={{ marginBottom:'32px' }}>
            Under his leadership, Fatir Developers has become one of Faisalabad's most trusted development companies — committed to quality, transparency, and delivering on every promise.
          </P>
          <a href="tel:03111786243"
            style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'#1a1a1a', color:'#fff', fontFamily:'Montserrat', fontSize:'10px', letterSpacing:'0.22em', padding:'14px 28px', textDecoration:'none', alignSelf:'flex-start', transition:'all 0.3s', fontWeight:600 }}
            onMouseEnter={e => e.currentTarget.style.background='#c9a84c'}
            onMouseLeave={e => e.currentTarget.style.background='#1a1a1a'}
          >
            <Phone size={12} /> SPEAK WITH OUR TEAM
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
    { dist:'0 min',  label:'Business Hub Faisalabad',       note:'You are here',      highlight:true  },
    { dist:'2 min',  label:'Sargodha Road Boulevard',       note:'Direct frontage',   highlight:false },
    { dist:'5 min',  label:'Canal Road Intersection',       note:'Major connector',   highlight:false },
    { dist:'8 min',  label:'Faisalabad Ring Road',          note:'City-wide access',  highlight:false },
    { dist:'10 min', label:'Faisalabad City Centre',        note:'Downtown core',     highlight:false },
    { dist:'12 min', label:'Allama Iqbal Industrial Estate',note:'Industrial zone',   highlight:false },
    { dist:'15 min', label:'Faisalabad Airport',            note:'Air connectivity',  highlight:false },
    { dist:'20 min', label:'M-3 Motorway Interchange',      note:'National highway',  highlight:false },
  ]
  return (
    <section id="location" style={{ background:'#f4f4f4', padding:'clamp(80px,11vh,130px) 0' }}>
      <div style={{ maxWidth:'1300px', margin:'0 auto', padding:'0 clamp(24px,4vw,52px)' }}>
        <motion.div {...slideUp()} style={{ textAlign:'center', marginBottom:'clamp(52px,8vh,80px)' }}>
          <SectionLabel>Location</SectionLabel>
          <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontWeight:300, lineHeight:1, color:'#1a1a1a', fontSize:'clamp(38px,5.5vw,72px)' }}>
            Perfectly <span style={{ fontStyle:'italic' }}><G>Positioned</G></span>
          </h2>
          <GoldLine />
          <P style={{ maxWidth:'440px', margin:'0 auto', textAlign:'center' }}>
            Sargodha Road connects Faisalabad's industrial, residential, and commercial zones — placing Business Hub at the crossroads of maximum opportunity.
          </P>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'clamp(32px,5vw,60px)', alignItems:'start' }}>

          <motion.div {...slideLeft()}>
            <div style={{ overflow:'hidden', border:'1px solid rgba(0,0,0,0.08)', boxShadow:'0 8px 40px rgba(0,0,0,0.08)', position:'relative' }}>
              <iframe
                title="Business Hub Faisalabad Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54474.91152779498!2d73.0478755!3d31.4504174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392269b06f0b5af3%3A0x8e3d99f4b1c5e8c5!2sSargodha%20Rd%2C%20Faisalabad!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk"
                width="100%" height="360"
                style={{ border:0, display:'block' }}
                allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
              <div style={{ position:'absolute', bottom:'12px', left:'12px', background:'rgba(248,246,241,0.97)', border:'1px solid rgba(201,168,76,0.3)', padding:'10px 16px', backdropFilter:'blur(8px)', boxShadow:'0 4px 20px rgba(0,0,0,0.1)' }}>
                <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'15px', color:'#1a1a1a', fontWeight:500 }}>Business Hub</p>
                <p style={{ fontFamily:'Montserrat', fontSize:'8px', letterSpacing:'0.25em', color:'#7a4f08', marginTop:'2px', fontWeight:600 }}>SARGODHA ROAD · FAISALABAD</p>
              </div>
            </div>
            <a href="https://maps.google.com/?q=Sargodha+Road+Faisalabad" target="_blank" rel="noreferrer"
              style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', marginTop:'10px', background:'#1a1a1a', color:'#fff', fontFamily:'Montserrat', fontSize:'10px', letterSpacing:'0.2em', padding:'13px', textDecoration:'none', transition:'background 0.3s', fontWeight:600 }}
              onMouseEnter={e => e.currentTarget.style.background='#c9a84c'}
              onMouseLeave={e => e.currentTarget.style.background='#1a1a1a'}
            >
              <ExternalLink size={12} /> OPEN IN GOOGLE MAPS
            </a>
          </motion.div>

          <motion.div {...slideRight(0.15)}>
            <p style={{ fontFamily:'Montserrat', fontSize:'9px', letterSpacing:'0.4em', color:'#7a4f08', marginBottom:'20px', textTransform:'uppercase', fontWeight:600 }}>Distance Guide</p>
            <div style={{ background:'#fff', border:'1px solid rgba(0,0,0,0.07)', boxShadow:'0 4px 24px rgba(0,0,0,0.06)' }}>
              {landmarks.map((l,i) => (
                <motion.div key={l.label}
                  initial={{ opacity:0, x:24 }} whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true }} transition={{ duration:0.6, delay:i*0.05 }}
                  style={{ display:'flex', alignItems:'center', gap:'16px', padding:'14px 20px', borderBottom: i<landmarks.length-1 ? '1px solid rgba(0,0,0,0.05)' : 'none', background: l.highlight ? 'rgba(201,168,76,0.06)' : 'transparent', transition:'background 0.3s' }}
                  className={l.highlight ? '' : 'hover:bg-amber-50/50'}
                >
                  <div style={{ width:'48px', flexShrink:0 }}>
                    <span style={{ fontFamily:'Montserrat', fontSize:'11px', fontWeight:700, color: l.highlight ? '#7a4f08' : '#bbb' }}>
                      {l.dist}
                    </span>
                  </div>
                  <div style={{ flex:1 }}>
                    <p style={{ fontFamily:'Montserrat', fontSize:'13px', color: l.highlight ? '#1a1a1a' : '#444', fontWeight: l.highlight ? 700 : 400 }}>
                      {l.label}
                    </p>
                    <p style={{ fontFamily:'Montserrat', fontSize:'10px', color: l.highlight ? '#7a4f08' : '#bbb', marginTop:'1px', fontWeight: l.highlight ? 600 : 400 }}>
                      {l.note}
                    </p>
                  </div>
                  {l.highlight && <div style={{ width:'4px', height:'4px', background:'#c9a84c', transform:'rotate(45deg)', flexShrink:0 }} />}
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
───────────────────────────────────────────────────── */
function CTABanner() {
  return (
    <section style={{ background:'#1a1a1a', padding:'clamp(80px,11vh,130px) clamp(24px,4vw,52px)', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0 }}>
        <img src="/images/hero2.jpg" alt="" aria-hidden
          style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.14)' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(20,12,0,0.97),rgba(201,168,76,0.04))' }} />
      </div>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(to right,transparent,rgba(201,168,76,0.4),transparent)' }} />
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'1px', background:'linear-gradient(to right,transparent,rgba(201,168,76,0.4),transparent)' }} />

      <div style={{ position:'relative', zIndex:5, maxWidth:'780px', margin:'0 auto', textAlign:'center' }}>
        <motion.div {...slideUp()}>
          <SectionLabel>Limited Availability</SectionLabel>
          <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontWeight:300, lineHeight:0.9, color:'#fff', fontSize:'clamp(44px,7.5vw,96px)' }}>
            Bookings Are
          </h2>
          <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontWeight:700, fontStyle:'italic', lineHeight:0.9, fontSize:'clamp(44px,7.5vw,96px)', marginBottom:'24px' }}>
            <G>Now Open</G>
          </h2>
          <GoldLine />
          <P style={{ maxWidth:'400px', margin:'0 auto 44px', textAlign:'center', color:'#444444' }}>
            Secure your commercial space at Faisalabad's most prestigious address. 10% booking — 24-month easy installments.
          </P>
          <div style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap' }}>
            <a href="tel:03111786243"
              style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'#c9a84c', color:'#fff', fontFamily:'Montserrat', fontSize:'11px', letterSpacing:'0.25em', fontWeight:700, padding:'clamp(14px,2vh,18px) clamp(30px,4vw,48px)', textDecoration:'none', transition:'background 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.background='#7a4f08'}
              onMouseLeave={e => e.currentTarget.style.background='#c9a84c'}
            >
              <Phone size={14} /> CALL NOW
            </a>
            <a href="https://www.facebook.com/Businesshubfaisalabad/" target="_blank" rel="noreferrer"
              style={{ display:'inline-flex', alignItems:'center', gap:'10px', border:'1px solid rgba(255,255,255,0.2)', color:'#fff', fontFamily:'Montserrat', fontSize:'11px', letterSpacing:'0.25em', padding:'clamp(14px,2vh,18px) clamp(30px,4vw,48px)', textDecoration:'none', transition:'all 0.3s', fontWeight:500 }}
              onMouseEnter={e => e.currentTarget.style.borderColor='#c9a84c'}
              onMouseLeave={e => e.currentTarget.style.borderColor='rgba(255,255,255,0.2)'}
            >
              <Facebook size={14} /> FACEBOOK
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
    <section id="contact" style={{ background:'#fff', padding:'clamp(80px,11vh,130px) 0' }}>
      <div style={{ maxWidth:'1300px', margin:'0 auto', padding:'0 clamp(24px,4vw,52px)' }}>
        <motion.div {...slideUp()} style={{ textAlign:'center', marginBottom:'clamp(52px,8vh,80px)' }}>
          <SectionLabel>Get In Touch</SectionLabel>
          <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontWeight:300, lineHeight:1, color:'#1a1a1a', fontSize:'clamp(38px,5.5vw,72px)' }}>
            Ready to <span style={{ fontStyle:'italic' }}><G>Invest?</G></span>
          </h2>
          <GoldLine />
          <P style={{ maxWidth:'360px', margin:'0 auto', textAlign:'center' }}>
            Limited units remain. Our team is ready to guide you through pricing, availability, and booking.
          </P>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'16px', marginBottom:'48px' }}>
          {[
            { icon:Phone,    label:'Call Us',   val:'03-111-786-243',           href:'tel:03111786243'                              },
            { icon:MapPin,   label:'Location',  val:'Sargodha Road, Faisalabad', href:null                                          },
            { icon:Facebook, label:'Follow Us', val:'@BusinessHubFaisalabad',    href:'https://www.facebook.com/Businesshubfaisalabad/' },
          ].map((item,i) => (
            <motion.div key={item.label}
              initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:0.8, delay:i*0.1, ease:[0.22,1,0.36,1] }}
              style={{ background:'#f4f4f4', padding:'clamp(32px,5vh,52px) clamp(20px,3vw,36px)', textAlign:'center', border:'1px solid rgba(0,0,0,0.07)', boxShadow:'0 4px 24px rgba(0,0,0,0.05)', transition:'all 0.3s' }}
              className="hover:shadow-xl hover:-translate-y-2"
            >
              <div style={{ width:'52px', height:'52px', border:'1px solid rgba(201,168,76,0.3)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', transition:'all 0.3s' }}
                className="group-hover:bg-amber-50">
                <item.icon size={18} style={{ color:'#c9a84c' }} />
              </div>
              <p style={{ fontFamily:'Montserrat', fontSize:'9px', letterSpacing:'0.38em', color:'#555555', marginBottom:'10px', textTransform:'uppercase', fontWeight:600 }}>
                {item.label}
              </p>
              {item.href
                ? <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                    style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(17px,2vw,25px)', color:'#1a1a1a', textDecoration:'none', transition:'color 0.3s', fontWeight:600 }}
                    className="hover:!text-amber-700">
                    {item.val}
                  </a>
                : <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(17px,2vw,25px)', color:'#1a1a1a', fontWeight:600 }}>{item.val}</p>
              }
            </motion.div>
          ))}
        </div>

        <motion.div {...slideUp(0.2)} style={{ textAlign:'center' }}>
          <a href="tel:03111786243"
            style={{ display:'inline-flex', alignItems:'center', gap:'14px', background:'#1a1a1a', color:'#fff', fontFamily:'Montserrat', fontSize:'11px', letterSpacing:'0.28em', fontWeight:700, padding:'clamp(16px,2vh,20px) clamp(36px,5vw,64px)', textDecoration:'none', transition:'background 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.background='#c9a84c'}
            onMouseLeave={e => e.currentTarget.style.background='#1a1a1a'}
          >
            <Phone size={15} /> CALL 03-111-786-243 <ChevronRight size={15} />
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
      <Stats />
      <About />
      <Features />
      <WhySargodhRoad />
      <PaymentPlan />
      <Gallery />
      <Chairman />
      <Location />
      <CTABanner />
      <Contact />
    </main>
  )
}
