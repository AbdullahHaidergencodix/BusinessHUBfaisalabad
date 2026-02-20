import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'
import {
  Phone, MapPin, ChevronRight, ArrowDown,
  CheckCircle, ExternalLink, Facebook, Quote
} from 'lucide-react'
import Ticker from '../components/Ticker'

/* ── tiny helpers ──────────────────────────────────── */
const G = ({ children }) => (
  <span style={{ background:'linear-gradient(135deg,#b8860b,#c9a84c,#daa520)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
    {children}
  </span>
)

const SectionLabel = ({ children, dark = false }) => (
  <div style={{ display:'flex', alignItems:'center', gap:'14px', marginBottom:'16px' }}>
    <div style={{ width:'28px', height:'1px', background:'#c9a84c', flexShrink:0 }} />
    <span style={{ fontFamily:'Montserrat', fontSize:'9px', letterSpacing:'0.45em', color:'#c9a84c', textTransform:'uppercase' }}>
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

const fadeUp = (delay = 0) => ({
  initial:     { opacity:0, y:40 },
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

const P = ({ children, style = {} }) => (
  <p style={{ fontFamily:'Montserrat', fontSize:'13px', color:'#666', lineHeight:'2', ...style }}>
    {children}
  </p>
)

/* ── animated counter ──────────────────────────────── */
function Counter({ to, suffix = '', duration = 2 }) {
  const ref     = useRef(null)
  const inView  = useInView(ref, { once:true, margin:'-80px' })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start     = 0
    const end     = parseFloat(to.toString().replace(/[^0-9.]/g,''))
    const isFloat = to.toString().includes('.')
    const steps   = 60
    const inc     = end / steps
    const timer   = setInterval(() => {
      start += inc
      if (start >= end) { setVal(end); clearInterval(timer) }
      else setVal(isFloat ? parseFloat(start.toFixed(1)) : Math.floor(start))
    }, (duration * 1000) / steps)
    return () => clearInterval(timer)
  }, [inView, to, duration])

  const display = typeof to === 'string' && /[^0-9.]/.test(to.replace(suffix,''))
    ? to
    : val + suffix

  return <span ref={ref}>{display}</span>
}

/* ── slides ────────────────────────────────────────── */
const slides = [
  { img:'/images/hero1.jpg' },
  { img:'/images/hero2.jpg' },
  { img:'/images/hero3.jpg' },
]

/* ══════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════ */
function Hero() {
  const [cur, setCur] = useState(0)
  const timer = useRef(null)

  useEffect(() => {
    timer.current = setInterval(() => setCur(c => (c+1) % slides.length), 7000)
    return () => clearInterval(timer.current)
  }, [])

  return (
    <section
      style={{ position:'relative', height:'100svh', minHeight:'600px', overflow:'hidden' }}
      aria-label="Business Hub Faisalabad"
    >
      {/* slides */}
      <AnimatePresence mode="sync">
        <motion.div key={cur}
          initial={{ opacity:0, scale:1.06 }}
          animate={{ opacity:1, scale:1   }}
          exit={{   opacity:0             }}
          transition={{ duration:1.8, ease:'easeInOut' }}
          style={{ position:'absolute', inset:0 }}
        >
          <img src={slides[cur].img} alt="Business Hub Faisalabad"
            loading="eager"
            style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }} />
        </motion.div>
      </AnimatePresence>

      {/* overlays — keep text readable on any image */}
      <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.55)', zIndex:2 }} />
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.1) 65%,transparent 100%)', zIndex:3 }} />
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'220px', background:'linear-gradient(to top,#fafafa,transparent)', zIndex:3 }} />
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'140px', background:'linear-gradient(to bottom,rgba(0,0,0,0.5),transparent)', zIndex:3 }} />

      {/* scan line */}
      <motion.div
        style={{ position:'absolute', left:0, right:0, height:'1px', background:'linear-gradient(to right,transparent,rgba(201,168,76,0.25),transparent)', zIndex:4, pointerEvents:'none' }}
        animate={{ top:['0%','100%'] }}
        transition={{ duration:12, repeat:Infinity, ease:'linear' }}
      />

      {/* content */}
      <div style={{ position:'absolute', inset:0, zIndex:10, display:'flex', flexDirection:'column', justifyContent:'center', padding:'0 clamp(24px,6vw,100px)', paddingTop:'80px' }}>
        <motion.div
          initial={{ opacity:0, y:30 }}
          animate={{ opacity:1, y:0  }}
          transition={{ duration:1, delay:0.3, ease:[0.22,1,0.36,1] }}
        >
          {/* overline */}
          <div style={{ display:'flex', alignItems:'center', gap:'14px', marginBottom:'clamp(18px,3vh,32px)' }}>
            <div style={{ width:'36px', height:'1px', background:'#c9a84c' }} />
            <span style={{ fontFamily:'Montserrat', fontSize:'clamp(8px,1vw,10px)', letterSpacing:'0.45em', color:'rgba(255,255,255,0.7)' }}>
              FATIR DEVELOPERS · FAISALABAD
            </span>
          </div>

          {/* headline */}
          <h1 style={{ fontFamily:'Cormorant Garamond,serif', fontWeight:300, lineHeight:0.9, marginBottom:'clamp(18px,3vh,30px)', maxWidth:'clamp(300px,65vw,720px)' }}>
            <span style={{ display:'block', fontSize:'clamp(44px,8.5vw,112px)', color:'#fff' }}>
              Sargodha Road's
            </span>
            <span style={{ display:'block', fontSize:'clamp(44px,8.5vw,112px)', fontStyle:'italic', background:'linear-gradient(135deg,#f5d485,#c9a84c,#b8860b)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              New Identity.
            </span>
          </h1>

          {/* pills */}
          <div style={{ display:'flex', gap:'10px', flexWrap:'wrap', marginBottom:'clamp(24px,4vh,44px)' }}>
            {['TMA Approved','Drive-Thru Commercial','10% Booking'].map(tag => (
              <span key={tag} style={{ fontFamily:'Montserrat', fontSize:'clamp(8px,0.9vw,10px)', letterSpacing:'0.18em', color:'rgba(255,255,255,0.6)', border:'1px solid rgba(255,255,255,0.15)', padding:'6px 14px', backdropFilter:'blur(6px)', background:'rgba(0,0,0,0.2)' }}>
                {tag}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
            <a href="#contact"
              style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'#c9a84c', color:'#fff', fontFamily:'Montserrat', fontSize:'clamp(9px,1vw,11px)', letterSpacing:'0.25em', fontWeight:700, padding:'clamp(12px,1.8vh,16px) clamp(22px,3vw,32px)', textDecoration:'none', transition:'background 0.3s', whiteSpace:'nowrap' }}
              onMouseEnter={e => e.currentTarget.style.background = '#b8860b'}
              onMouseLeave={e => e.currentTarget.style.background = '#c9a84c'}
            >
              BOOK NOW <ChevronRight size={13} />
            </a>
            <a href="#about"
              style={{ display:'inline-flex', alignItems:'center', gap:'10px', border:'1px solid rgba(255,255,255,0.25)', color:'#fff', fontFamily:'Montserrat', fontSize:'clamp(9px,1vw,11px)', letterSpacing:'0.25em', padding:'clamp(12px,1.8vh,16px) clamp(22px,3vw,32px)', textDecoration:'none', transition:'all 0.3s', background:'rgba(0,0,0,0.25)', backdropFilter:'blur(8px)', whiteSpace:'nowrap' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#c9a84c'; e.currentTarget.style.color = '#c9a84c' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = '#fff' }}
            >
              EXPLORE
            </a>
          </div>
        </motion.div>
      </div>

      {/* dots */}
      <div style={{ position:'absolute', bottom:'clamp(20px,4vh,40px)', left:'clamp(24px,6vw,100px)', zIndex:10, display:'flex', gap:'8px', alignItems:'center' }}>
        {slides.map((_,i) => (
          <button key={i} onClick={() => setCur(i)} aria-label={`Slide ${i+1}`}
            style={{ padding:0, border:'none', cursor:'pointer', height:'2px', width: i===cur ? '40px' : '14px', background: i===cur ? '#c9a84c' : 'rgba(255,255,255,0.25)', transition:'all 0.4s ease' }}
          />
        ))}
      </div>

      {/* progress bar */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'2px', background:'rgba(201,168,76,0.1)', zIndex:10 }}>
        <motion.div key={cur}
          style={{ height:'100%', background:'linear-gradient(to right,#b8860b,#c9a84c,#f5d485)', transformOrigin:'left' }}
          initial={{ scaleX:0 }} animate={{ scaleX:1 }}
          transition={{ duration:7, ease:'linear' }}
        />
      </div>

      {/* scroll cue */}
      <motion.div animate={{ y:[0,8,0] }} transition={{ repeat:Infinity, duration:2.5 }}
        style={{ position:'absolute', bottom:'clamp(20px,4vh,36px)', right:'24px', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:'6px', color:'rgba(255,255,255,0.3)' }}>
        <span style={{ fontFamily:'Montserrat', fontSize:'8px', letterSpacing:'0.3em', writingMode:'vertical-rl' }}>SCROLL</span>
        <ArrowDown size={12} />
      </motion.div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   STATS BAR
══════════════════════════════════════════════════════ */
function Stats() {
  const items = [
    { val:'10',  suffix:'%',    label:'Booking Amount'      },
    { val:'2',   suffix:' Yr',  label:'Easy Installments'   },
    { val:'TMA', suffix:'',     label:'Govt Approved'       },
    { val:'22',  suffix:'K+',   label:'PKR / Sq.Ft'         },
  ]
  return (
    <div style={{ background:'#fff', borderTop:'1px solid rgba(0,0,0,0.05)', borderBottom:'1px solid rgba(0,0,0,0.05)', boxShadow:'0 4px 40px rgba(0,0,0,0.04)' }}>
      <div style={{ maxWidth:'1000px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)' }}>
        {items.map((s,i) => (
          <motion.div key={s.label} {...fadeIn(i*0.07)}
            style={{ padding:'clamp(28px,4vh,44px) 16px', textAlign:'center', borderRight: i<3 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}
          >
            <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(34px,4vw,52px)', fontWeight:600, lineHeight:1, background:'linear-gradient(135deg,#b8860b,#c9a84c)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              {s.val === 'TMA' ? 'TMA' : <><Counter to={s.val} />{s.suffix}</>}
            </p>
            <p style={{ fontFamily:'Montserrat', fontSize:'9px', letterSpacing:'0.28em', color:'#aaa', marginTop:'8px', textTransform:'uppercase' }}>
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   ABOUT
══════════════════════════════════════════════════════ */
function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target:ref, offset:['start end','end start'] })
  const y = useTransform(scrollYProgress, [0,1], ['4%','-4%'])

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
      style={{ background:'#fafafa', padding:'clamp(72px,10vh,120px) 0', overflow:'hidden' }}>
      <div style={{ maxWidth:'1300px', margin:'0 auto', padding:'0 clamp(24px,4vw,48px)', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'clamp(40px,6vw,80px)', alignItems:'center' }}>

        {/* image */}
        <motion.div {...fadeIn()} style={{ position:'relative' }}>
          <div style={{ overflow:'hidden', position:'relative', boxShadow:'0 24px 80px rgba(0,0,0,0.1)' }}>
            <motion.img src="/images/building1.jpg" alt="Business Hub Faisalabad"
              style={{ width:'100%', height:'clamp(360px,50vh,560px)', objectFit:'cover', y }} />
          </div>
          {/* corner accents */}
          <div style={{ position:'absolute', top:'-12px', left:'-12px', width:'72px', height:'72px', borderTop:'2px solid rgba(201,168,76,0.4)', borderLeft:'2px solid rgba(201,168,76,0.4)', pointerEvents:'none' }} />
          <div style={{ position:'absolute', bottom:'-12px', right:'-12px', width:'72px', height:'72px', borderBottom:'2px solid rgba(201,168,76,0.4)', borderRight:'2px solid rgba(201,168,76,0.4)', pointerEvents:'none' }} />
          {/* year badge */}
          <div style={{ position:'absolute', bottom:'32px', left:'-20px', background:'#c9a84c', padding:'16px 22px', boxShadow:'0 8px 32px rgba(201,168,76,0.3)' }}>
            <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'36px', fontWeight:700, color:'#fff', lineHeight:1 }}>2025</p>
            <p style={{ fontFamily:'Montserrat', fontSize:'8px', letterSpacing:'0.28em', color:'rgba(255,255,255,0.7)', marginTop:'3px' }}>COMPLETION</p>
          </div>
        </motion.div>

        {/* text */}
        <motion.div {...fadeUp(0.15)}>
          <SectionLabel>About The Project</SectionLabel>
          <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontWeight:300, lineHeight:1.05, color:'#0a0a0a', fontSize:'clamp(34px,4vw,58px)' }}>
            A New Era of
          </h2>
          <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontWeight:600, fontStyle:'italic', lineHeight:1.05, fontSize:'clamp(34px,4vw,58px)', marginBottom:'4px' }}>
            <G>Commercial Excellence</G>
          </h2>
          <GoldLine />
          <P style={{ marginBottom:'16px' }}>
            Business Hub Faisalabad is an iconic drive-thru commercial project by Fatir Developers Pvt. Ltd., strategically placed on Sargodha Road — Faisalabad's most rapidly growing commercial corridor.
          </P>
          <P style={{ marginBottom:'32px' }}>
            Grand neoclassical architecture fused with modern commercial design — offering premium retail spaces engineered for maximum footfall, visibility, and return on investment.
          </P>
          <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
            {bullets.map((b,i) => (
              <motion.div key={b}
                initial={{ opacity:0, x:-16 }} whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true }} transition={{ duration:0.6, delay:i*0.06 }}
                style={{ display:'flex', alignItems:'flex-start', gap:'10px' }}
              >
                <CheckCircle size={14} style={{ color:'#c9a84c', flexShrink:0, marginTop:'3px' }} />
                <span style={{ fontFamily:'Montserrat', fontSize:'12px', color:'#666', lineHeight:'1.7' }}>{b}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   FEATURES
══════════════════════════════════════════════════════ */
function Features() {
  const list = [
    { n:'01', title:'Drive-Thru Concept',       desc:'Built for the modern consumer — maximum convenience, zero friction. Customers pull up, transact, and leave. Your business never stops.' },
    { n:'02', title:'Prime Location',            desc:'Sargodha Road carries the highest daily traffic volume in this corridor. Every unit gets seen by thousands of potential customers daily.' },
    { n:'03', title:'Neoclassical Architecture', desc:'Grand white arches, European-inspired facades, a commanding presence that instantly elevates your brand perception.' },
    { n:'04', title:'Maximum ROI',               desc:'Lowest entry at 22,000 PKR/sq.ft with consistent corridor appreciation. Smart investors are already securing their units.' },
    { n:'05', title:'TMA Approved',              desc:'Fully cleared by Tehsil Municipal Administration. Transparent documentation, zero legal risk, complete peace of mind.' },
    { n:'06', title:'Trusted Developer',         desc:'Fatir Developers Pvt. Ltd. — a proven track record delivering commercial landmarks in Faisalabad, on time and on promise.' },
  ]
  return (
    <section id="features"
      style={{ background:'#fff', padding:'clamp(72px,10vh,120px) 0', boxShadow:'inset 0 1px 0 rgba(0,0,0,0.04), inset 0 -1px 0 rgba(0,0,0,0.04)' }}>
      <div style={{ maxWidth:'1300px', margin:'0 auto', padding:'0 clamp(24px,4vw,48px)' }}>
        <motion.div {...fadeUp()} style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'40px', alignItems:'end', marginBottom:'clamp(40px,6vh,72px)' }}>
          <div>
            <SectionLabel>Why Invest</SectionLabel>
            <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontWeight:300, lineHeight:0.95, color:'#0a0a0a', fontSize:'clamp(40px,5.5vw,72px)' }}>
              Built for<br /><span style={{ fontStyle:'italic' }}><G>Success</G></span>
            </h2>
          </div>
          <P>Every element is engineered to maximize your business potential, brand visibility, and long-term investment return.</P>
        </motion.div>

        <div style={{ borderTop:'1px solid rgba(0,0,0,0.06)' }}>
          {list.map((f,i) => (
            <motion.div key={f.n} {...fadeUp(i*0.04)}
              style={{ borderBottom:'1px solid rgba(0,0,0,0.05)', display:'grid', gridTemplateColumns:'clamp(44px,5vw,80px) 1fr 1fr', gap:'clamp(16px,3vw,40px)', alignItems:'center', padding:'clamp(22px,3vw,36px) 0', transition:'background 0.3s', cursor:'default' }}
              className="group hover:bg-amber-50/50"
            >
              <span style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(26px,3vw,42px)', fontWeight:300, color:'rgba(201,168,76,0.25)', lineHeight:1 }}>
                {f.n}
              </span>
              <h3 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(19px,2vw,28px)', color:'#333', fontWeight:500, transition:'color 0.3s' }}
                className="group-hover:!text-amber-800">
                {f.title}
              </h3>
              <P style={{ fontSize:'12px' }}>{f.desc}</P>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   WHY SARGODHA ROAD
══════════════════════════════════════════════════════ */
function WhySargodhRoad() {
  const stats = [
    { val:'1',    suffix:'st',  label:'Fastest growing commercial corridor in Faisalabad' },
    { val:'200',  suffix:'K+',  label:'Daily vehicles passing through Sargodha Road'      },
    { val:'3',    suffix:'X',   label:'Property value appreciation in the last 5 years'   },
    { val:'50',   suffix:'+',   label:'Major brands already operating nearby'             },
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
    <section style={{ background:'#fafafa', padding:'clamp(72px,10vh,120px) 0', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle at 80% 50%, rgba(201,168,76,0.04) 0%, transparent 60%)', pointerEvents:'none' }} />

      <div style={{ maxWidth:'1300px', margin:'0 auto', padding:'0 clamp(24px,4vw,48px)' }}>
        <motion.div {...fadeUp()} style={{ textAlign:'center', marginBottom:'clamp(48px,8vh,80px)' }}>
          <SectionLabel>Location Intelligence</SectionLabel>
          <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontWeight:300, lineHeight:1, color:'#0a0a0a', fontSize:'clamp(36px,5vw,68px)' }}>
            Why <span style={{ fontStyle:'italic' }}><G>Sargodha Road?</G></span>
          </h2>
          <GoldLine />
          <P style={{ maxWidth:'440px', margin:'0 auto', textAlign:'center' }}>
            The numbers don't lie. Sargodha Road is Faisalabad's most explosive growth corridor — and Business Hub sits right at its heart.
          </P>
        </motion.div>

        {/* stat cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(210px,1fr))', gap:'16px', marginBottom:'clamp(40px,6vh,64px)' }}>
          {stats.map((s,i) => (
            <motion.div key={s.label} {...fadeUp(i*0.08)}
              style={{ background:'#fff', padding:'clamp(28px,4vh,44px) clamp(20px,3vw,36px)', boxShadow:'0 4px 24px rgba(0,0,0,0.05)', border:'1px solid rgba(0,0,0,0.04)', transition:'box-shadow 0.3s, transform 0.3s' }}
              className="group hover:shadow-lg hover:-translate-y-1"
            >
              <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(40px,5vw,60px)', fontWeight:600, lineHeight:1, background:'linear-gradient(135deg,#b8860b,#c9a84c)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', marginBottom:'10px' }}>
                <Counter to={s.val} />{s.suffix}
              </p>
              <p style={{ fontFamily:'Montserrat', fontSize:'12px', color:'#888', lineHeight:'1.7' }}>
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* reasons */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))', gap:'12px' }}>
          {reasons.map((r,i) => (
            <motion.div key={r} {...fadeUp(i*0.05)}
              style={{ display:'flex', alignItems:'flex-start', gap:'12px', padding:'18px 20px', background:'#fff', border:'1px solid rgba(0,0,0,0.05)', boxShadow:'0 2px 12px rgba(0,0,0,0.03)', transition:'all 0.3s' }}
              className="group hover:border-amber-200 hover:shadow-md"
            >
              <CheckCircle size={15} style={{ color:'#c9a84c', flexShrink:0, marginTop:'2px' }} />
              <span style={{ fontFamily:'Montserrat', fontSize:'12px', color:'#666', lineHeight:'1.7' }}>{r}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   PAYMENT PLAN
══════════════════════════════════════════════════════ */
function PaymentPlan() {
  const plans = [
    { size:'100 Sq.Ft', total:'22,00,000', booking:'2,20,000', monthly:'73,333',   quarterly:'2,20,000', tag:null           },
    { size:'150 Sq.Ft', total:'33,00,000', booking:'3,30,000', monthly:'1,10,000', quarterly:'3,30,000', tag:'Most Popular'  },
    { size:'200 Sq.Ft', total:'44,00,000', booking:'4,40,000', monthly:'1,46,667', quarterly:'4,40,000', tag:null           },
    { size:'300 Sq.Ft', total:'66,00,000', booking:'6,60,000', monthly:'2,20,000', quarterly:'6,60,000', tag:'Best Value'   },
  ]
  return (
    <section id="payment" style={{ background:'#fff', padding:'clamp(72px,10vh,120px) 0' }}>
      <div style={{ maxWidth:'1300px', margin:'0 auto', padding:'0 clamp(24px,4vw,48px)' }}>
        <motion.div {...fadeUp()} style={{ textAlign:'center', marginBottom:'clamp(48px,8vh,72px)' }}>
          <SectionLabel>Investment Plans</SectionLabel>
          <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontWeight:300, lineHeight:1, color:'#0a0a0a', fontSize:'clamp(36px,5vw,68px)' }}>
            Payment <span style={{ fontStyle:'italic' }}><G>Breakdown</G></span>
          </h2>
          <GoldLine />
          <P style={{ maxWidth:'440px', margin:'0 auto', textAlign:'center' }}>
            Transparent pricing. No hidden costs. Secure your unit with just 10% booking and 24 easy monthly installments.
          </P>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:'16px' }}>
          {plans.map((p,i) => (
            <motion.div key={p.size} {...fadeUp(i*0.08)}
              style={{ background:'#fafafa', border: p.tag === 'Most Popular' ? '2px solid #c9a84c' : '1px solid rgba(0,0,0,0.07)', padding:'clamp(28px,3.5vw,44px) clamp(20px,2.5vw,32px)', position:'relative', boxShadow: p.tag === 'Most Popular' ? '0 8px 40px rgba(201,168,76,0.12)' : '0 2px 16px rgba(0,0,0,0.04)', transition:'transform 0.3s, box-shadow 0.3s' }}
              className="group hover:-translate-y-1 hover:shadow-xl"
            >
              {p.tag && (
                <div style={{ position:'absolute', top:'-1px', left:'50%', transform:'translateX(-50%)', background:'#c9a84c', color:'#fff', fontFamily:'Montserrat', fontSize:'8px', letterSpacing:'0.25em', fontWeight:700, padding:'5px 16px', whiteSpace:'nowrap' }}>
                  {p.tag.toUpperCase()}
                </div>
              )}

              <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(30px,3.5vw,46px)', fontWeight:600, lineHeight:1, background:'linear-gradient(135deg,#b8860b,#c9a84c)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', marginBottom:'4px', marginTop: p.tag ? '16px' : '0' }}>
                {p.size}
              </p>
              <p style={{ fontFamily:'Montserrat', fontSize:'9px', letterSpacing:'0.3em', color:'#aaa', marginBottom:'24px', textTransform:'uppercase' }}>
                Commercial Unit
              </p>

              <div style={{ height:'1px', background:'rgba(0,0,0,0.07)', marginBottom:'20px' }} />

              {[
                { label:'Total Price',      val:`PKR ${p.total}` },
                { label:'10% Booking',      val:`PKR ${p.booking}`, gold:true },
                { label:'Monthly Install.', val:`PKR ${p.monthly}` },
                { label:'Quarterly',        val:`PKR ${p.quarterly}` },
                { label:'Possession',       val:'On Request' },
              ].map(row => (
                <div key={row.label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'9px 0', borderBottom:'1px solid rgba(0,0,0,0.04)' }}>
                  <span style={{ fontFamily:'Montserrat', fontSize:'10px', color:'#aaa', letterSpacing:'0.05em' }}>{row.label}</span>
                  <span style={{ fontFamily:'Montserrat', fontSize:'11px', fontWeight:600, color: row.gold ? '#c9a84c' : '#333' }}>{row.val}</span>
                </div>
              ))}

              <a href="tel:03111786243"
                style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', marginTop:'24px', background:'#0a0a0a', color:'#fff', fontFamily:'Montserrat', fontSize:'10px', letterSpacing:'0.2em', padding:'13px', textDecoration:'none', transition:'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#c9a84c' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#0a0a0a' }}
              >
                ENQUIRE <ChevronRight size={12} />
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p {...fadeIn(0.2)} style={{ fontFamily:'Montserrat', fontSize:'11px', color:'#bbb', textAlign:'center', marginTop:'24px', lineHeight:'1.8' }}>
          * Prices based on 22,000 PKR/sq.ft starting rate. Installment plan is 24 months. Contact us for custom unit sizes and current availability.
        </motion.p>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   GALLERY
══════════════════════════════════════════════════════ */
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
    const fn = e => { if (e.key === 'Escape') setLb(null) }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  return (
    <section id="gallery" style={{ background:'#fafafa', padding:'clamp(72px,10vh,120px) 0' }}>
      <div style={{ maxWidth:'1300px', margin:'0 auto', padding:'0 clamp(24px,4vw,48px)' }}>
        <motion.div {...fadeUp()} style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'clamp(32px,5vh,52px)', flexWrap:'wrap', gap:'16px' }}>
          <div>
            <SectionLabel>Gallery</SectionLabel>
            <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontWeight:300, lineHeight:1, color:'#0a0a0a', fontSize:'clamp(36px,5vw,68px)' }}>
              The <span style={{ fontStyle:'italic' }}><G>Vision</G></span>
            </h2>
          </div>
          <span style={{ fontFamily:'Montserrat', fontSize:'10px', letterSpacing:'0.25em', color:'#aaa', textTransform:'uppercase' }}>Tap to enlarge</span>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(12,1fr)', gap:'10px' }}>
          <GalleryTile img={imgs[0]} i={0} onClick={() => setLb(0)}
            style={{ gridColumn:'span 7', height:'clamp(220px,38vh,460px)' }} />
          <div style={{ gridColumn:'span 5', display:'flex', flexDirection:'column', gap:'10px' }}>
            <GalleryTile img={imgs[1]} i={1} onClick={() => setLb(1)} style={{ flex:1, height:'clamp(105px,18vh,224px)' }} />
            <GalleryTile img={imgs[2]} i={2} onClick={() => setLb(2)} style={{ flex:1, height:'clamp(105px,18vh,224px)' }} />
          </div>
          {[3,4,5].map((idx,i) => (
            <GalleryTile key={idx} img={imgs[idx]} i={i+3} onClick={() => setLb(idx)}
              style={{ gridColumn:'span 4', height:'clamp(140px,22vh,260px)' }} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lb !== null && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={() => setLb(null)}
            style={{ position:'fixed', inset:0, background:'rgba(10,10,10,0.97)', zIndex:300, display:'flex', alignItems:'center', justifyContent:'center', padding:'32px', cursor:'zoom-out' }}
          >
            <motion.img initial={{ scale:0.88, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0.88, opacity:0 }}
              src={imgs[lb].src} alt={imgs[lb].cap}
              style={{ maxWidth:'88vw', maxHeight:'80vh', objectFit:'contain', cursor:'default', boxShadow:'0 32px 100px rgba(0,0,0,0.9)' }}
              onClick={e => e.stopPropagation()}
            />
            <button onClick={() => setLb(null)}
              style={{ position:'absolute', top:'20px', right:'24px', background:'none', border:'1px solid rgba(255,255,255,0.15)', color:'#fff', fontFamily:'Montserrat', fontSize:'9px', letterSpacing:'0.3em', padding:'9px 18px', cursor:'pointer' }}>
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

function GalleryTile({ img, i, onClick, style }) {
  return (
    <motion.div {...fadeIn(i*0.06)} onClick={onClick}
      style={{ position:'relative', overflow:'hidden', cursor:'zoom-in', ...style }}
      className="group"
    >
      <img src={img.src} alt={img.cap} loading="lazy"
        style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition: img.cap.includes('Abdul') ? 'top' : 'center', transition:'transform 0.7s ease' }}
        className="group-hover:scale-105"
      />
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 50%)', transition:'opacity 0.3s' }} />
      <div style={{ position:'absolute', bottom:'14px', left:'16px' }}>
        <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(14px,1.5vw,20px)', color:'#fff', lineHeight:1.2 }}>{img.cap}</p>
        <p style={{ fontFamily:'Montserrat', fontSize:'8px', letterSpacing:'0.28em', color:'#c9a84c', marginTop:'3px' }}>{img.sub}</p>
      </div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════
   CHAIRMAN
══════════════════════════════════════════════════════ */
function Chairman() {
  return (
    <section id="chairman"
      style={{ background:'#fff', overflow:'hidden', boxShadow:'inset 0 1px 0 rgba(0,0,0,0.04), inset 0 -1px 0 rgba(0,0,0,0.04)' }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))' }}>
        <motion.div {...fadeIn()} style={{ position:'relative', minHeight:'clamp(360px,50vh,620px)', overflow:'hidden' }}>
          <img src="/images/chairman.jpg" alt="Ch. Abdul Rehman — Chairman Fatir Developers" loading="lazy"
            style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center', position:'absolute', inset:0 }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,transparent 45%,#fff 100%)' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(255,255,255,0.3) 0%,transparent 40%)' }} />
        </motion.div>

        <motion.div {...fadeUp(0.2)}
          style={{ display:'flex', flexDirection:'column', justifyContent:'center', padding:'clamp(44px,6vh,88px) clamp(28px,5vw,72px)' }}>
          <SectionLabel>A Message From</SectionLabel>
          <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontWeight:300, color:'#0a0a0a', lineHeight:1.1, fontSize:'clamp(30px,4vw,52px)' }}>
            Ch. Abdul Rehman
          </h2>
          <p style={{ fontFamily:'Montserrat', fontSize:'9px', letterSpacing:'0.3em', color:'#c9a84c', margin:'8px 0 28px', textTransform:'uppercase' }}>
            Chairman — Fatir Developers Pvt. Ltd.
          </p>

          <div style={{ borderLeft:'2px solid rgba(201,168,76,0.3)', paddingLeft:'22px', marginBottom:'24px' }}>
            <Quote size={18} style={{ color:'rgba(201,168,76,0.3)', marginBottom:'12px' }} />
            <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(16px,2vw,22px)', color:'#555', lineHeight:'1.8', fontStyle:'italic', fontWeight:300 }}>
              "Business Hub Faisalabad is not merely a commercial project — it is our commitment to transforming Sargodha Road into a world-class business destination that delivers lasting value, prestige, and prosperity for every investor."
            </p>
          </div>

          <P style={{ marginBottom:'32px' }}>
            Under his leadership, Fatir Developers has become one of Faisalabad's most trusted development companies — committed to quality, transparency, and delivering on every promise.
          </P>

          <a href="tel:03111786243"
            style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'#0a0a0a', color:'#fff', fontFamily:'Montserrat', fontSize:'10px', letterSpacing:'0.22em', padding:'13px 26px', textDecoration:'none', alignSelf:'flex-start', transition:'all 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#c9a84c'}
            onMouseLeave={e => e.currentTarget.style.background = '#0a0a0a'}
          >
            <Phone size={12} /> SPEAK WITH OUR TEAM
          </a>
        </motion.div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   LOCATION
══════════════════════════════════════════════════════ */
function Location() {
  const landmarks = [
    { dist:'0 min',  label:'Business Hub Faisalabad',      note:'You are here',      highlight:true  },
    { dist:'2 min',  label:'Sargodha Road Boulevard',      note:'Direct frontage',   highlight:false },
    { dist:'5 min',  label:'Canal Road Intersection',      note:'Major connector',   highlight:false },
    { dist:'8 min',  label:'Faisalabad Ring Road',         note:'City-wide access',  highlight:false },
    { dist:'10 min', label:'Faisalabad City Centre',       note:'Downtown core',     highlight:false },
    { dist:'12 min', label:'Allama Iqbal Industrial Est.', note:'Industrial zone',   highlight:false },
    { dist:'15 min', label:'Faisalabad Airport',           note:'Air connectivity',  highlight:false },
    { dist:'20 min', label:'M-3 Motorway Interchange',     note:'National highway',  highlight:false },
  ]
  return (
    <section id="location" style={{ background:'#fafafa', padding:'clamp(72px,10vh,120px) 0' }}>
      <div style={{ maxWidth:'1300px', margin:'0 auto', padding:'0 clamp(24px,4vw,48px)' }}>
        <motion.div {...fadeUp()} style={{ textAlign:'center', marginBottom:'clamp(48px,8vh,72px)' }}>
          <SectionLabel>Location</SectionLabel>
          <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontWeight:300, lineHeight:1, color:'#0a0a0a', fontSize:'clamp(36px,5vw,68px)' }}>
            Perfectly <span style={{ fontStyle:'italic' }}><G>Positioned</G></span>
          </h2>
          <GoldLine />
          <P style={{ maxWidth:'420px', margin:'0 auto', textAlign:'center' }}>
            Sargodha Road connects Faisalabad's industrial, residential, and commercial zones — placing Business Hub at the crossroads of maximum opportunity.
          </P>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'clamp(32px,5vw,56px)', alignItems:'start' }}>

          <motion.div {...fadeIn()}>
            <div style={{ overflow:'hidden', border:'1px solid rgba(0,0,0,0.07)', boxShadow:'0 8px 40px rgba(0,0,0,0.07)', position:'relative' }}>
              <iframe
                title="Business Hub Faisalabad Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54474.91152779498!2d73.0478755!3d31.4504174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392269b06f0b5af3%3A0x8e3d99f4b1c5e8c5!2sSargodha%20Rd%2C%20Faisalabad!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk"
                width="100%" height="360"
                style={{ border:0, display:'block' }}
                allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
              <div style={{ position:'absolute', bottom:'12px', left:'12px', background:'rgba(250,250,250,0.97)', border:'1px solid rgba(201,168,76,0.25)', padding:'10px 16px', backdropFilter:'blur(8px)', boxShadow:'0 4px 20px rgba(0,0,0,0.08)' }}>
                <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'15px', color:'#0a0a0a' }}>Business Hub</p>
                <p style={{ fontFamily:'Montserrat', fontSize:'8px', letterSpacing:'0.25em', color:'#c9a84c', marginTop:'2px' }}>SARGODHA ROAD · FAISALABAD</p>
              </div>
            </div>
            <a href="https://maps.google.com/?q=Sargodha+Road+Faisalabad" target="_blank" rel="noreferrer"
              style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', marginTop:'10px', background:'#0a0a0a', color:'#fff', fontFamily:'Montserrat', fontSize:'10px', letterSpacing:'0.2em', padding:'13px', textDecoration:'none', transition:'background 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#c9a84c'}
              onMouseLeave={e => e.currentTarget.style.background = '#0a0a0a'}
            >
              <ExternalLink size={12} /> OPEN IN GOOGLE MAPS
            </a>
          </motion.div>

          <motion.div {...fadeUp(0.15)}>
            <p style={{ fontFamily:'Montserrat', fontSize:'9px', letterSpacing:'0.4em', color:'#c9a84c', marginBottom:'20px', textTransform:'uppercase' }}>Distance Guide</p>
            <div style={{ display:'flex', flexDirection:'column', background:'#fff', border:'1px solid rgba(0,0,0,0.06)', boxShadow:'0 4px 24px rgba(0,0,0,0.05)' }}>
              {landmarks.map((l,i) => (
                <motion.div key={l.label}
                  initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true }} transition={{ duration:0.6, delay:i*0.05 }}
                  style={{ display:'flex', alignItems:'center', gap:'16px', padding:'14px 20px', borderBottom: i < landmarks.length-1 ? '1px solid rgba(0,0,0,0.04)' : 'none', background: l.highlight ? 'rgba(201,168,76,0.04)' : 'transparent', transition:'background 0.3s' }}
                  className={l.highlight ? '' : 'hover:bg-amber-50/40'}
                >
                  <div style={{ width:'48px', flexShrink:0 }}>
                    <span style={{ fontFamily:'Montserrat', fontSize:'11px', fontWeight:700, color: l.highlight ? '#c9a84c' : '#bbb' }}>
                      {l.dist}
                    </span>
                  </div>
                  <div style={{ flex:1 }}>
                    <p style={{ fontFamily:'Montserrat', fontSize:'12px', color: l.highlight ? '#0a0a0a' : '#555', fontWeight: l.highlight ? 600 : 400 }}>
                      {l.label}
                    </p>
                    <p style={{ fontFamily:'Montserrat', fontSize:'10px', color: l.highlight ? '#c9a84c' : '#bbb', marginTop:'1px' }}>
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

/* ══════════════════════════════════════════════════════
   CTA BANNER
══════════════════════════════════════════════════════ */
function CTABanner() {
  return (
    <section style={{ background:'#0a0a0a', padding:'clamp(80px,11vh,130px) clamp(24px,4vw,48px)', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0 }}>
        <img src="/images/hero2.jpg" alt="" aria-hidden
          style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.15)' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(10,10,10,0.97) 0%,rgba(201,168,76,0.03) 100%)' }} />
      </div>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(to right,transparent,rgba(201,168,76,0.35),transparent)' }} />
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'1px', background:'linear-gradient(to right,transparent,rgba(201,168,76,0.35),transparent)' }} />

      <div style={{ position:'relative', zIndex:5, maxWidth:'780px', margin:'0 auto', textAlign:'center' }}>
        <motion.div {...fadeUp()}>
          <SectionLabel>Limited Availability</SectionLabel>
          <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontWeight:300, lineHeight:0.92, color:'#fff', fontSize:'clamp(42px,7vw,90px)' }}>
            Bookings Are
          </h2>
          <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontWeight:600, fontStyle:'italic', lineHeight:0.92, fontSize:'clamp(42px,7vw,90px)', marginBottom:'24px' }}>
            <G>Now Open</G>
          </h2>
          <GoldLine />
          <P style={{ maxWidth:'400px', margin:'0 auto 40px', textAlign:'center', color:'#666' }}>
            Secure your commercial space at Faisalabad's most prestigious address. 10% booking — 24-month easy installments.
          </P>
          <div style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap' }}>
            <a href="tel:03111786243"
              style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'#c9a84c', color:'#fff', fontFamily:'Montserrat', fontSize:'11px', letterSpacing:'0.25em', fontWeight:700, padding:'clamp(14px,2vh,18px) clamp(28px,4vw,44px)', textDecoration:'none', transition:'background 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#b8860b'}
              onMouseLeave={e => e.currentTarget.style.background = '#c9a84c'}
            >
              <Phone size={14} /> CALL NOW
            </a>
            <a href="https://www.facebook.com/Businesshubfaisalabad/" target="_blank" rel="noreferrer"
              style={{ display:'inline-flex', alignItems:'center', gap:'10px', border:'1px solid rgba(255,255,255,0.15)', color:'#fff', fontFamily:'Montserrat', fontSize:'11px', letterSpacing:'0.25em', padding:'clamp(14px,2vh,18px) clamp(28px,4vw,44px)', textDecoration:'none', transition:'all 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#c9a84c'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
            >
              <Facebook size={14} /> FACEBOOK
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   CONTACT
══════════════════════════════════════════════════════ */
function Contact() {
  return (
    <section id="contact" style={{ background:'#fafafa', padding:'clamp(72px,10vh,120px) 0' }}>
      <div style={{ maxWidth:'1300px', margin:'0 auto', padding:'0 clamp(24px,4vw,48px)' }}>
        <motion.div {...fadeUp()} style={{ textAlign:'center', marginBottom:'clamp(48px,8vh,72px)' }}>
          <SectionLabel>Get In Touch</SectionLabel>
          <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontWeight:300, lineHeight:1, color:'#0a0a0a', fontSize:'clamp(36px,5vw,68px)' }}>
            Ready to <span style={{ fontStyle:'italic' }}><G>Invest?</G></span>
          </h2>
          <GoldLine />
          <P style={{ maxWidth:'360px', margin:'0 auto', textAlign:'center' }}>
            Limited units remain. Our team is ready to guide you through pricing, availability, and booking.
          </P>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'16px', marginBottom:'48px' }}>
          {[
            { icon:Phone,    label:'Call Us',   val:'03-111-786-243',           href:'tel:03111786243' },
            { icon:MapPin,   label:'Location',  val:'Sargodha Road, Faisalabad', href:null },
            { icon:Facebook, label:'Follow Us', val:'@BusinessHubFaisalabad',    href:'https://www.facebook.com/Businesshubfaisalabad/' },
          ].map((item,i) => (
            <motion.div key={item.label} {...fadeUp(i*0.08)}
              style={{ background:'#fff', padding:'clamp(32px,5vh,52px) clamp(20px,3vw,36px)', textAlign:'center', border:'1px solid rgba(0,0,0,0.06)', boxShadow:'0 4px 24px rgba(0,0,0,0.05)', transition:'all 0.3s' }}
              className="group hover:shadow-lg hover:-translate-y-1"
            >
              <div style={{ width:'52px', height:'52px', border:'1px solid rgba(201,168,76,0.25)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', transition:'all 0.3s' }}
                className="group-hover:bg-amber-50 group-hover:border-amber-300">
                <item.icon size={18} style={{ color:'#c9a84c' }} />
              </div>
              <p style={{ fontFamily:'Montserrat', fontSize:'9px', letterSpacing:'0.38em', color:'#aaa', marginBottom:'10px', textTransform:'uppercase' }}>{item.label}</p>
              {item.href
                ? <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                    style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(17px,2vw,24px)', color:'#0a0a0a', textDecoration:'none', transition:'color 0.3s' }}
                    className="hover:!text-amber-700">{item.val}</a>
                : <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(17px,2vw,24px)', color:'#0a0a0a' }}>{item.val}</p>
              }
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp(0.2)} style={{ textAlign:'center' }}>
          <a href="tel:03111786243"
            style={{ display:'inline-flex', alignItems:'center', gap:'14px', background:'#0a0a0a', color:'#fff', fontFamily:'Montserrat', fontSize:'11px', letterSpacing:'0.28em', fontWeight:700, padding:'clamp(16px,2vh,20px) clamp(36px,5vw,60px)', textDecoration:'none', transition:'background 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#c9a84c'}
            onMouseLeave={e => e.currentTarget.style.background = '#0a0a0a'}
          >
            <Phone size={15} /> CALL 03-111-786-243 <ChevronRight size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════ */
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
