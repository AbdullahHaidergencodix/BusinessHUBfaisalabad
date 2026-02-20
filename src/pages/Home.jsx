import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
  Phone, MapPin, ChevronRight, ArrowDown,
  Building2, Car, TrendingUp, Shield,
  Facebook, Quote, CheckCircle, ExternalLink
} from 'lucide-react'
import Ticker from '../components/Ticker'

/* ── helpers ───────────────────────────────────────── */
const G = ({ children }) => (
  <span style={{ background: 'linear-gradient(135deg,#f5d485,#c9a84c,#8a6020)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
    {children}
  </span>
)

const SectionLabel = ({ children }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
    <div style={{ width: '28px', height: '1px', background: '#c9a84c', flexShrink: 0 }} />
    <span style={{ fontFamily: 'Montserrat', fontSize: '9px', letterSpacing: '0.45em', color: '#c9a84c', textTransform: 'uppercase' }}>
      {children}
    </span>
  </div>
)

const GoldLine = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '24px 0' }}>
    <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to right,#c9a84c,transparent)' }} />
    <div style={{ width: '4px', height: '4px', background: '#c9a84c', transform: 'rotate(45deg)', flexShrink: 0 }} />
    <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to left,#c9a84c,transparent)' }} />
  </div>
)

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.9, delay, ease: [0.22,1,0.36,1] },
})

const fadeIn = (delay = 0) => ({
  initial:     { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 1.1, delay },
})

const P = ({ children, style = {} }) => (
  <p style={{ fontFamily: 'Montserrat', fontSize: '13px', color: '#555', lineHeight: '2', ...style }}>{children}</p>
)

/* ── HERO ──────────────────────────────────────────── */
const slides = [
  { img: '/images/hero1.jpg' },
  { img: '/images/hero2.jpg' },
  { img: '/images/hero3.jpg' },
]

function Hero() {
  const [cur, setCur] = useState(0)
  const timer = useRef(null)

  const next = (c) => (c + 1) % slides.length

  useEffect(() => {
    timer.current = setInterval(() => setCur(c => next(c)), 7000)
    return () => clearInterval(timer.current)
  }, [])

  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: '640px', overflow: 'hidden' }}
      aria-label="Business Hub Faisalabad — Hero">

      {/* ── slides ── */}
      <AnimatePresence mode="sync">
        <motion.div key={cur}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1,  scale: 1   }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <img src={slides[cur].img} alt="Business Hub Faisalabad" loading="eager"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
        </motion.div>
      </AnimatePresence>

      {/* ── overlays — heavy on left/bottom so text always readable ── */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.62)', zIndex: 2 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 70%, transparent 100%)', zIndex: 3 }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '280px', background: 'linear-gradient(to top, #060606, transparent)', zIndex: 3 }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '160px', background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)', zIndex: 3 }} />

      {/* ── moving scan line ── */}
      <motion.div
        style={{ position: 'absolute', left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.35), transparent)', zIndex: 4, pointerEvents: 'none' }}
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />

      {/* ── content ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 clamp(24px, 6vw, 100px)', paddingTop: '80px' }}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1,  y: 0  }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22,1,0.36,1] }}
        >
          {/* overline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
            <div style={{ width: '36px', height: '1px', background: '#c9a84c' }} />
            <span style={{ fontFamily: 'Montserrat', fontSize: '9px', letterSpacing: '0.45em', color: '#c9a84c' }}>
              FATIR DEVELOPERS · FAISALABAD
            </span>
          </div>

          {/* headline — clean, no overlap */}
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, lineHeight: 0.92, marginBottom: '28px', maxWidth: '700px' }}>
            <span style={{ display: 'block', fontSize: 'clamp(52px, 8vw, 108px)', color: '#fff' }}>
              Sargodha Road's
            </span>
            <span style={{ display: 'block', fontSize: 'clamp(52px, 8vw, 108px)', fontStyle: 'italic', background: 'linear-gradient(135deg,#f5d485,#c9a84c,#8a6020)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              New Identity.
            </span>
          </h1>

          {/* one-liner — brief, below headline */}
          <p style={{ fontFamily: 'Montserrat', fontSize: 'clamp(11px, 1.2vw, 13px)', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em', marginBottom: '40px', maxWidth: '380px', lineHeight: '1.8' }}>
            TMA Approved · Drive-Thru Commercial · 10% Booking
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <a href="#contact"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#c9a84c', color: '#000', fontFamily: 'Montserrat', fontSize: '10px', letterSpacing: '0.25em', fontWeight: 700, padding: '15px 30px', textDecoration: 'none', transition: 'background 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#f5d485'}
              onMouseLeave={e => e.currentTarget.style.background = '#c9a84c'}
            >
              BOOK NOW <ChevronRight size={13} />
            </a>
            <a href="#about"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', border: '1px solid rgba(201,168,76,0.35)', color: 'rgba(255,255,255,0.8)', fontFamily: 'Montserrat', fontSize: '10px', letterSpacing: '0.25em', padding: '15px 30px', textDecoration: 'none', transition: 'all 0.3s', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#c9a84c'; e.currentTarget.style.color = '#c9a84c' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)' }}
            >
              EXPLORE
            </a>
          </div>
        </motion.div>
      </div>

      {/* ── slide indicators ── */}
      <div style={{ position: 'absolute', bottom: '36px', left: 'clamp(24px, 6vw, 100px)', zIndex: 10, display: 'flex', gap: '8px', alignItems: 'center' }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCur(i)}
            aria-label={`Slide ${i+1}`}
            style={{ padding: 0, border: 'none', cursor: 'pointer', height: '2px', width: i === cur ? '40px' : '14px', background: i === cur ? '#c9a84c' : 'rgba(255,255,255,0.2)', transition: 'all 0.4s ease' }}
          />
        ))}
      </div>

      {/* ── progress ── */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: 'rgba(201,168,76,0.08)', zIndex: 10 }}>
        <motion.div key={cur}
          style={{ height: '100%', background: 'linear-gradient(to right,#5a3010,#c9a84c,#f5d485)', transformOrigin: 'left' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 7, ease: 'linear' }}
        />
      </div>

      {/* ── scroll cue ── */}
      <motion.div animate={{ y: [0,8,0] }} transition={{ repeat: Infinity, duration: 2.5 }}
        style={{ position: 'absolute', bottom: '32px', right: '32px', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', color: 'rgba(201,168,76,0.3)' }}>
        <span style={{ fontFamily: 'Montserrat', fontSize: '8px', letterSpacing: '0.3em', writingMode: 'vertical-rl' }}>SCROLL</span>
        <ArrowDown size={12} />
      </motion.div>
    </section>
  )
}

/* ── STATS BAR ─────────────────────────────────────── */
function Stats() {
  const items = [
    { val: '10%',  label: 'Booking Amount' },
    { val: '2 Yr', label: 'Easy Installments' },
    { val: 'TMA',  label: 'Govt Approved' },
    { val: '22K+', label: 'PKR / Sq.Ft' },
  ]
  return (
    <div style={{ background: '#030303', borderTop: '1px solid rgba(201,168,76,0.1)', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
        {items.map((s, i) => (
          <motion.div key={s.val} {...fadeIn(i * 0.07)}
            style={{ padding: '40px 16px', textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(201,168,76,0.07)' : 'none' }}
          >
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px,4vw,52px)', fontWeight: 600, lineHeight: 1, background: 'linear-gradient(135deg,#f5d485,#c9a84c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {s.val}
            </p>
            <p style={{ fontFamily: 'Montserrat', fontSize: '9px', letterSpacing: '0.28em', color: '#444', marginTop: '8px', textTransform: 'uppercase' }}>
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ── ABOUT ─────────────────────────────────────────── */
function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end','end start'] })
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
    <section id="about" ref={ref} style={{ background: '#060606', padding: '100px 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 clamp(24px,4vw,48px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '64px', alignItems: 'center' }}>

        {/* image */}
        <motion.div {...fadeIn()} style={{ position: 'relative' }}>
          <div style={{ overflow: 'hidden', position: 'relative' }}>
            <motion.img src="/images/building1.jpg" alt="Business Hub Faisalabad commercial project"
              style={{ width: '100%', height: 'clamp(380px,50vh,560px)', objectFit: 'cover', y }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,transparent 55%,rgba(6,6,6,0.55))' }} />
          </div>
          <div style={{ position: 'absolute', top: '-14px', left: '-14px', width: '90px', height: '90px', borderTop: '2px solid rgba(201,168,76,0.35)', borderLeft: '2px solid rgba(201,168,76,0.35)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-14px', right: '-14px', width: '90px', height: '90px', borderBottom: '2px solid rgba(201,168,76,0.35)', borderRight: '2px solid rgba(201,168,76,0.35)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '28px', left: '-20px', background: '#c9a84c', padding: '18px 24px' }}>
            <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '38px', fontWeight: 700, color: '#000', lineHeight: 1 }}>2025</p>
            <p style={{ fontFamily: 'Montserrat', fontSize: '8px', letterSpacing: '0.28em', color: '#000', marginTop: '3px' }}>COMPLETION</p>
          </div>
        </motion.div>

        {/* text */}
        <motion.div {...fadeUp(0.15)}>
          <SectionLabel>About The Project</SectionLabel>
          <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontWeight: 300, lineHeight: 1.1, color: '#fff', fontSize: 'clamp(36px,4vw,58px)' }}>
            A New Era of
          </h2>
          <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontWeight: 600, fontStyle: 'italic', lineHeight: 1.1, fontSize: 'clamp(36px,4vw,58px)', marginBottom: '4px' }}>
            <G>Commercial Excellence</G>
          </h2>
          <GoldLine />
          <P style={{ marginBottom: '16px' }}>
            Business Hub Faisalabad is an iconic drive-thru commercial project by Fatir Developers Pvt. Ltd., strategically placed on Sargodha Road — Faisalabad's most rapidly growing commercial corridor.
          </P>
          <P style={{ marginBottom: '32px' }}>
            Grand neoclassical architecture fused with modern commercial design — offering premium retail spaces and plots engineered for maximum footfall, visibility, and return.
          </P>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {bullets.map((b, i) => (
              <motion.div key={b} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.06 }}
                style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <div style={{ width: '4px', height: '4px', background: '#c9a84c', transform: 'rotate(45deg)', marginTop: '6px', flexShrink: 0 }} />
                <span style={{ fontFamily: 'Montserrat', fontSize: '12px', color: '#5a5a5a', lineHeight: '1.7' }}>{b}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ── FEATURES ──────────────────────────────────────── */
function Features() {
  const list = [
    { n: '01', title: 'Drive-Thru Concept',       desc: 'Built for the modern consumer — maximum convenience, zero friction. Customers pull up, transact, and leave. Your business never stops.' },
    { n: '02', title: 'Prime Location',            desc: 'Sargodha Road carries the highest daily traffic volume in this corridor. Every unit gets seen by thousands of potential customers daily.' },
    { n: '03', title: 'Neoclassical Architecture', desc: 'Grand white arches, European-inspired facades, a commanding presence. A landmark address that instantly elevates your brand perception.' },
    { n: '04', title: 'Maximum ROI',               desc: 'Lowest entry point at 22,000 PKR/sq.ft with consistent corridor appreciation. Smart investors are already securing their units.' },
    { n: '05', title: 'TMA Approved',              desc: 'Fully cleared by Tehsil Municipal Administration. Transparent documentation, zero legal risk, complete peace of mind.' },
    { n: '06', title: 'Trusted Developer',         desc: 'Fatir Developers Pvt. Ltd. — a proven track record of delivering commercial landmarks in Faisalabad, on time and on promise.' },
  ]
  return (
    <section id="features" style={{ background: '#030303', padding: '100px 0' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 clamp(24px,4vw,48px)' }}>
        <motion.div {...fadeUp()} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '40px', alignItems: 'end', marginBottom: '64px' }}>
          <div>
            <SectionLabel>Why Invest</SectionLabel>
            <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontWeight: 300, lineHeight: 1, color: '#fff', fontSize: 'clamp(40px,5vw,68px)' }}>
              Built for<br /><span style={{ fontStyle: 'italic' }}><G>Success</G></span>
            </h2>
          </div>
          <P>Every element is engineered to maximize your business potential, brand visibility, and long-term investment return.</P>
        </motion.div>

        <div style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}>
          {list.map((f, i) => (
            <motion.div key={f.n} {...fadeUp(i * 0.05)}
              style={{ borderBottom: '1px solid rgba(201,168,76,0.07)', display: 'grid', gridTemplateColumns: 'clamp(48px,5vw,80px) 1fr 1fr', gap: 'clamp(16px,3vw,40px)', alignItems: 'center', padding: 'clamp(24px,3vw,36px) 0', transition: 'background 0.3s', cursor: 'default' }}
              className="group hover:bg-white/[0.015]"
            >
              <span style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(28px,3vw,40px)', fontWeight: 300, color: 'rgba(201,168,76,0.18)', lineHeight: 1, transition: 'color 0.3s' }}
                className="group-hover:!text-yellow-700/30">{f.n}</span>
              <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(20px,2vw,28px)', color: '#bbb', fontWeight: 500, transition: 'color 0.3s' }}
                className="group-hover:!text-white">{f.title}</h3>
              <P style={{ fontSize: '12px' }}>{f.desc}</P>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── WHY SARGODHA ROAD ─────────────────────────────── */
function WhySargodhRoad() {
  const stats = [
    { val: '#1',     label: 'Fastest growing commercial corridor in Faisalabad' },
    { val: '200K+',  label: 'Daily vehicles passing through Sargodha Road' },
    { val: '3X',     label: 'Property value appreciation over the last 5 years' },
    { val: '50+',    label: 'Major brands & businesses already operating nearby' },
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
    <section style={{ background: '#060606', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
      {/* bg texture */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 80% 50%, rgba(201,168,76,0.03) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 clamp(24px,4vw,48px)' }}>
        <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: '72px' }}>
          <SectionLabel>Location Intelligence</SectionLabel>
          <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontWeight: 300, lineHeight: 1, color: '#fff', fontSize: 'clamp(38px,5vw,68px)' }}>
            Why <span style={{ fontStyle: 'italic' }}><G>Sargodha Road?</G></span>
          </h2>
          <GoldLine />
          <P style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}>
            The numbers don't lie. Sargodha Road is Faisalabad's most explosive growth corridor — and Business Hub sits right at its heart.
          </P>
        </motion.div>

        {/* stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '2px', background: 'rgba(201,168,76,0.07)', marginBottom: '64px' }}>
          {stats.map((s, i) => (
            <motion.div key={s.val} {...fadeUp(i * 0.08)}
              style={{ background: '#060606', padding: 'clamp(32px,4vw,52px) clamp(24px,3vw,40px)', transition: 'background 0.3s' }}
              className="group hover:bg-neutral-900/60"
            >
              <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(44px,5vw,64px)', fontWeight: 600, lineHeight: 1, background: 'linear-gradient(135deg,#f5d485,#c9a84c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '12px' }}>
                {s.val}
              </p>
              <p style={{ fontFamily: 'Montserrat', fontSize: '12px', color: '#4a4a4a', lineHeight: '1.7', transition: 'color 0.3s' }}
                className="group-hover:!text-neutral-400">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* reasons grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '16px' }}>
          {reasons.map((r, i) => (
            <motion.div key={r} {...fadeUp(i * 0.06)}
              style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '20px 24px', border: '1px solid rgba(201,168,76,0.09)', transition: 'border-color 0.3s' }}
              className="group hover:border-yellow-600/25"
            >
              <CheckCircle size={15} style={{ color: '#c9a84c', flexShrink: 0, marginTop: '2px' }} />
              <span style={{ fontFamily: 'Montserrat', fontSize: '12px', color: '#555', lineHeight: '1.7', transition: 'color 0.3s' }}
                className="group-hover:!text-neutral-400">
                {r}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── PAYMENT PLAN ──────────────────────────────────── */
function PaymentPlan() {
  const plans = [
    {
      size: '100 Sq.Ft',
      totalPrice: '22,00,000',
      booking: '2,20,000',
      monthly: '73,333',
      quarterly: '2,20,000',
      possession: 'On Request',
      tag: null,
    },
    {
      size: '150 Sq.Ft',
      totalPrice: '33,00,000',
      booking: '3,30,000',
      monthly: '1,10,000',
      quarterly: '3,30,000',
      possession: 'On Request',
      tag: 'Most Popular',
    },
    {
      size: '200 Sq.Ft',
      totalPrice: '44,00,000',
      booking: '4,40,000',
      monthly: '1,46,667',
      quarterly: '4,40,000',
      possession: 'On Request',
      tag: null,
    },
    {
      size: '300 Sq.Ft',
      totalPrice: '66,00,000',
      booking: '6,60,000',
      monthly: '2,20,000',
      quarterly: '6,60,000',
      possession: 'On Request',
      tag: 'Best Value',
    },
  ]

  return (
    <section id="payment" style={{ background: '#030303', padding: '100px 0' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 clamp(24px,4vw,48px)' }}>

        <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: '64px' }}>
          <SectionLabel>Investment Plans</SectionLabel>
          <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontWeight: 300, lineHeight: 1, color: '#fff', fontSize: 'clamp(38px,5vw,68px)' }}>
            Payment <span style={{ fontStyle: 'italic' }}><G>Breakdown</G></span>
          </h2>
          <GoldLine />
          <P style={{ maxWidth: '440px', margin: '0 auto', textAlign: 'center' }}>
            Transparent pricing. No hidden costs. Secure your unit with just 10% booking and 24 easy monthly installments.
          </P>
        </motion.div>

        {/* cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '2px', background: 'rgba(201,168,76,0.07)' }}>
          {plans.map((p, i) => (
            <motion.div key={p.size} {...fadeUp(i * 0.08)}
              style={{ background: '#030303', padding: 'clamp(28px,3vw,44px) clamp(20px,2.5vw,36px)', position: 'relative', transition: 'background 0.3s' }}
              className="group hover:bg-neutral-900/50"
            >
              {/* tag */}
              {p.tag && (
                <div style={{ position: 'absolute', top: '-1px', left: '50%', transform: 'translateX(-50%)', background: '#c9a84c', color: '#000', fontFamily: 'Montserrat', fontSize: '8px', letterSpacing: '0.25em', fontWeight: 700, padding: '5px 14px', whiteSpace: 'nowrap' }}>
                  {p.tag.toUpperCase()}
                </div>
              )}

              {/* size */}
              <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(32px,3.5vw,48px)', fontWeight: 600, lineHeight: 1, background: 'linear-gradient(135deg,#f5d485,#c9a84c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '6px', marginTop: p.tag ? '14px' : '0' }}>
                {p.size}
              </p>
              <p style={{ fontFamily: 'Montserrat', fontSize: '9px', letterSpacing: '0.3em', color: '#444', marginBottom: '28px', textTransform: 'uppercase' }}>
                Commercial Unit
              </p>

              {/* divider */}
              <div style={{ height: '1px', background: 'rgba(201,168,76,0.1)', marginBottom: '24px' }} />

              {/* rows */}
              {[
                { label: 'Total Price',     val: `PKR ${p.totalPrice}` },
                { label: '10% Booking',     val: `PKR ${p.booking}`,   gold: true },
                { label: 'Monthly Install.', val: `PKR ${p.monthly}` },
                { label: 'Quarterly',       val: `PKR ${p.quarterly}` },
                { label: 'Possession',      val: p.possession },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <span style={{ fontFamily: 'Montserrat', fontSize: '10px', color: '#444', letterSpacing: '0.05em' }}>{row.label}</span>
                  <span style={{ fontFamily: 'Montserrat', fontSize: '11px', fontWeight: 600, color: row.gold ? '#c9a84c' : '#777' }}>{row.val}</span>
                </div>
              ))}

              <a href="tel:03111786243"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '28px', border: '1px solid rgba(201,168,76,0.25)', color: '#c9a84c', fontFamily: 'Montserrat', fontSize: '10px', letterSpacing: '0.2em', padding: '12px', textDecoration: 'none', transition: 'all 0.3s', background: 'transparent' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#c9a84c'; e.currentTarget.style.color = '#000' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#c9a84c' }}
              >
                ENQUIRE <ChevronRight size={12} />
              </a>
            </motion.div>
          ))}
        </div>

        {/* footnote */}
        <motion.p {...fadeIn(0.2)} style={{ fontFamily: 'Montserrat', fontSize: '11px', color: '#333', textAlign: 'center', marginTop: '28px', letterSpacing: '0.05em', lineHeight: '1.8' }}>
          * Prices based on 22,000 PKR/sq.ft starting rate. Installment plan is 24 months. Contact us for custom unit sizes and current availability.
        </motion.p>
      </div>
    </section>
  )
}

/* ── GALLERY ───────────────────────────────────────── */
function Gallery() {
  const [lb, setLb] = useState(null)
  const imgs = [
    { src: '/images/hero1.jpg',     cap: 'Night View',          sub: 'Sargodha Road'    },
    { src: '/images/hero2.jpg',     cap: 'Day View',            sub: 'Grand Facade'     },
    { src: '/images/building1.jpg', cap: 'Bookings Open',       sub: 'Commercial Units' },
    { src: '/images/building2.jpg', cap: 'Retail Spaces',       sub: '22K+ PKR/Sq.Ft'  },
    { src: '/images/promo.jpg',     cap: '10% Booking',         sub: 'Easy Payments'    },
    { src: '/images/chairman.jpg',  cap: 'Ch. Abdul Rehman',    sub: 'Fatir Developers' },
  ]

  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') setLb(null) }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  return (
    <section id="gallery" style={{ background: '#060606', padding: '100px 0' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 clamp(24px,4vw,48px)' }}>
        <motion.div {...fadeUp()} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '52px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <SectionLabel>Gallery</SectionLabel>
            <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontWeight: 300, lineHeight: 1, color: '#fff', fontSize: 'clamp(38px,5vw,68px)' }}>
              The <span style={{ fontStyle: 'italic' }}><G>Vision</G></span>
            </h2>
          </div>
          <span style={{ fontFamily: 'Montserrat', fontSize: '10px', letterSpacing: '0.25em', color: '#333', textTransform: 'uppercase' }}>Tap to enlarge</span>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gap: '10px' }}>
          {/* big */}
          <GalleryTile img={imgs[0]} i={0} onClick={() => setLb(0)}
            style={{ gridColumn: 'span 7', height: 'clamp(240px,40vh,480px)' }} />
          {/* right stack */}
          <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <GalleryTile img={imgs[1]} i={1} onClick={() => setLb(1)} style={{ flex: 1, height: 'clamp(115px,19vh,234px)' }} />
            <GalleryTile img={imgs[2]} i={2} onClick={() => setLb(2)} style={{ flex: 1, height: 'clamp(115px,19vh,234px)' }} />
          </div>
          {/* bottom 3 */}
          {[3,4,5].map((idx,i) => (
            <GalleryTile key={idx} img={imgs[idx]} i={i+3} onClick={() => setLb(idx)}
              style={{ gridColumn: 'span 4', height: 'clamp(160px,25vh,280px)' }} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lb !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLb(null)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.96)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px', cursor: 'zoom-out' }}
          >
            <motion.img initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.88, opacity: 0 }}
              src={imgs[lb].src} alt={imgs[lb].cap}
              style={{ maxWidth: '88vw', maxHeight: '82vh', objectFit: 'contain', boxShadow: '0 32px 100px rgba(0,0,0,0.9)', cursor: 'default' }}
              onClick={e => e.stopPropagation()}
            />
            <button onClick={() => setLb(null)}
              style={{ position: 'absolute', top: '20px', right: '24px', background: 'none', border: '1px solid rgba(201,168,76,0.3)', color: '#c9a84c', fontFamily: 'Montserrat', fontSize: '9px', letterSpacing: '0.3em', padding: '9px 18px', cursor: 'pointer' }}>
              CLOSE
            </button>
            <div style={{ position: 'absolute', bottom: '28px', textAlign: 'center', left: '50%', transform: 'translateX(-50%)' }}>
              <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '20px', color: '#fff' }}>{imgs[lb].cap}</p>
              <p style={{ fontFamily: 'Montserrat', fontSize: '9px', letterSpacing: '0.35em', color: '#c9a84c', marginTop: '4px' }}>{imgs[lb].sub}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function GalleryTile({ img, i, onClick, style }) {
  return (
    <motion.div {...fadeIn(i * 0.07)} onClick={onClick}
      style={{ position: 'relative', overflow: 'hidden', cursor: 'zoom-in', ...style }}
      className="group"
    >
      <img src={img.src} alt={img.cap} loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: img.cap.includes('Abdul') ? 'top' : 'center', transition: 'transform 0.7s ease' }}
        className="group-hover:scale-105"
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 55%)', transition: 'opacity 0.3s' }} />
      <div style={{ position: 'absolute', bottom: '16px', left: '18px' }}>
        <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(15px,1.6vw,22px)', color: '#fff', lineHeight: 1.2 }}>{img.cap}</p>
        <p style={{ fontFamily: 'Montserrat', fontSize: '8px', letterSpacing: '0.28em', color: '#c9a84c', marginTop: '3px' }}>{img.sub}</p>
      </div>
      <div style={{ position: 'absolute', top: '12px', left: '12px', width: '24px', height: '24px', borderTop: '1px solid rgba(201,168,76,0)', borderLeft: '1px solid rgba(201,168,76,0)', transition: 'border-color 0.4s', pointerEvents: 'none' }}
        className="group-hover:border-yellow-500/50" />
    </motion.div>
  )
}

/* ── CHAIRMAN ──────────────────────────────────────── */
function Chairman() {
  return (
    <section id="chairman" style={{ background: '#030303', overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))' }}>
        <motion.div {...fadeIn()} style={{ position: 'relative', minHeight: 'clamp(400px,55vh,640px)', overflow: 'hidden' }}>
          <img src="/images/chairman.jpg" alt="Ch. Abdul Rehman — Chairman Fatir Developers" loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', filter: 'brightness(0.7) contrast(1.08)', position: 'absolute', inset: 0 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 40%, #030303 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(3,3,3,0.5) 0%, transparent 40%)' }} />
          <div style={{ position: 'absolute', top: '32px', left: '32px', width: '52px', height: '52px', borderTop: '2px solid rgba(201,168,76,0.4)', borderLeft: '2px solid rgba(201,168,76,0.4)' }} />
        </motion.div>

        <motion.div {...fadeUp(0.2)}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(48px,6vh,88px) clamp(28px,5vw,72px)' }}>
          <SectionLabel>A Message From</SectionLabel>
          <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontWeight: 300, color: '#fff', lineHeight: 1.1, fontSize: 'clamp(32px,4vw,54px)' }}>
            Ch. Abdul Rehman
          </h2>
          <p style={{ fontFamily: 'Montserrat', fontSize: '9px', letterSpacing: '0.3em', color: '#c9a84c', margin: '8px 0 28px' }}>
            CHAIRMAN — FATIR DEVELOPERS PVT. LTD.
          </p>

          <div style={{ borderLeft: '2px solid rgba(201,168,76,0.25)', paddingLeft: '22px', marginBottom: '28px' }}>
            <Quote size={18} style={{ color: 'rgba(201,168,76,0.25)', marginBottom: '12px' }} />
            <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(17px,2vw,22px)', color: '#999', lineHeight: '1.8', fontStyle: 'italic', fontWeight: 300 }}>
              "Business Hub Faisalabad is not merely a commercial project — it is our commitment to transforming Sargodha Road into a world-class business destination that delivers lasting value, prestige, and prosperity for every investor."
            </p>
          </div>

          <P style={{ marginBottom: '36px' }}>
            Under his leadership, Fatir Developers has become one of Faisalabad's most trusted development companies — committed to quality, transparency, and delivering on every promise made to investors.
          </P>

          <a href="tel:03111786243"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', border: '1px solid rgba(201,168,76,0.28)', color: '#c9a84c', fontFamily: 'Montserrat', fontSize: '10px', letterSpacing: '0.22em', padding: '13px 26px', textDecoration: 'none', alignSelf: 'flex-start', transition: 'all 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#c9a84c'; e.currentTarget.style.color = '#000' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#c9a84c' }}
          >
            <Phone size={12} /> SPEAK WITH OUR TEAM
          </a>
        </motion.div>
      </div>
    </section>
  )
}

/* ── LOCATION ──────────────────────────────────────── */
function Location() {
  const landmarks = [
    { dist: '0 min',   label: 'Business Hub Faisalabad', note: 'You are here', highlight: true },
    { dist: '2 min',   label: 'Sargodha Road Main Boulevard',  note: 'Direct frontage' },
    { dist: '5 min',   label: 'Canal Road Intersection',       note: 'Major connector' },
    { dist: '8 min',   label: 'Faisalabad Ring Road',          note: 'City-wide access' },
    { dist: '10 min',  label: 'Faisalabad City Centre',        note: 'Downtown core' },
    { dist: '12 min',  label: 'Allama Iqbal Industrial Estate',note: 'Industrial zone' },
    { dist: '15 min',  label: 'Faisalabad International Airport', note: 'Air connectivity' },
    { dist: '20 min',  label: 'M-3 Motorway Interchange',      note: 'National highway' },
  ]

  return (
    <section id="location" style={{ background: '#060606', padding: '100px 0' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 clamp(24px,4vw,48px)' }}>
        <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: '64px' }}>
          <SectionLabel>Location</SectionLabel>
          <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontWeight: 300, lineHeight: 1, color: '#fff', fontSize: 'clamp(38px,5vw,68px)' }}>
            Perfectly <span style={{ fontStyle: 'italic' }}><G>Positioned</G></span>
          </h2>
          <GoldLine />
          <P style={{ maxWidth: '440px', margin: '0 auto', textAlign: 'center' }}>
            Sargodha Road connects Faisalabad's industrial, residential, and commercial zones — placing Business Hub at the crossroads of maximum opportunity.
          </P>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '48px', alignItems: 'start' }}>

          {/* Map embed */}
          <motion.div {...fadeIn()} style={{ position: 'relative' }}>
            <div style={{ position: 'relative', overflow: 'hidden', border: '1px solid rgba(201,168,76,0.15)' }}>
              <iframe
                title="Business Hub Faisalabad Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54474.91152779498!2d73.0478755!3d31.4504174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392269b06f0b5af3%3A0x8e3d99f4b1c5e8c5!2sSargodha%20Rd%2C%20Faisalabad!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk"
                width="100%"
                height="380"
                style={{ border: 0, display: 'block', filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* gold overlay pin label */}
              <div style={{ position: 'absolute', bottom: '16px', left: '16px', background: 'rgba(6,6,6,0.9)', border: '1px solid rgba(201,168,76,0.3)', padding: '10px 16px', backdropFilter: 'blur(8px)' }}>
                <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '16px', color: '#fff' }}>Business Hub</p>
                <p style={{ fontFamily: 'Montserrat', fontSize: '9px', letterSpacing: '0.25em', color: '#c9a84c', marginTop: '2px' }}>SARGODHA ROAD · FAISALABAD</p>
              </div>
            </div>
            <a href="https://maps.google.com/?q=Sargodha+Road+Faisalabad" target="_blank" rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '12px', border: '1px solid rgba(201,168,76,0.2)', color: '#c9a84c', fontFamily: 'Montserrat', fontSize: '10px', letterSpacing: '0.2em', padding: '12px', textDecoration: 'none', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#c9a84c'; e.currentTarget.style.color = '#000' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#c9a84c' }}
            >
              <ExternalLink size={12} /> OPEN IN GOOGLE MAPS
            </a>
          </motion.div>

          {/* Landmarks */}
          <motion.div {...fadeUp(0.15)}>
            <p style={{ fontFamily: 'Montserrat', fontSize: '9px', letterSpacing: '0.4em', color: '#c9a84c', marginBottom: '24px', textTransform: 'uppercase' }}>Distance Guide</p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {landmarks.map((l, i) => (
                <motion.div key={l.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.3s' }}
                  className="group hover:bg-white/[0.015]"
                >
                  <div style={{ width: '52px', flexShrink: 0, textAlign: 'center' }}>
                    <span style={{ fontFamily: 'Montserrat', fontSize: '11px', fontWeight: 700, color: l.highlight ? '#c9a84c' : '#3a3a3a' }}>
                      {l.dist}
                    </span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: 'Montserrat', fontSize: '12px', color: l.highlight ? '#fff' : '#555', fontWeight: l.highlight ? 600 : 400, transition: 'color 0.3s' }}
                      className={l.highlight ? '' : 'group-hover:!text-neutral-300'}>
                      {l.label}
                    </p>
                    <p style={{ fontFamily: 'Montserrat', fontSize: '10px', color: l.highlight ? '#c9a84c' : '#333', marginTop: '2px' }}>
                      {l.note}
                    </p>
                  </div>
                  {l.highlight && <div style={{ width: '4px', height: '4px', background: '#c9a84c', transform: 'rotate(45deg)', flexShrink: 0 }} />}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ── CTA BANNER ────────────────────────────────────── */
function CTABanner() {
  return (
    <section style={{ position: 'relative', padding: 'clamp(80px,10vh,130px) clamp(24px,4vw,48px)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <img src="/images/hero2.jpg" alt="" aria-hidden style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.18)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(6,6,6,0.96) 0%,rgba(201,168,76,0.03) 100%)' }} />
      </div>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right,transparent,rgba(201,168,76,0.4),transparent)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right,transparent,rgba(201,168,76,0.4),transparent)' }} />

      <div style={{ position: 'relative', zIndex: 5, maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <motion.div {...fadeUp()}>
          <SectionLabel>Limited Availability</SectionLabel>
          <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontWeight: 300, lineHeight: 0.95, color: '#fff', fontSize: 'clamp(44px,7vw,90px)' }}>
            Bookings Are
          </h2>
          <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontWeight: 600, fontStyle: 'italic', lineHeight: 0.95, fontSize: 'clamp(44px,7vw,90px)', marginBottom: '28px' }}>
            <G>Now Open</G>
          </h2>
          <GoldLine />
          <P style={{ maxWidth: '420px', margin: '0 auto 44px', textAlign: 'center' }}>
            Secure your commercial space at Faisalabad's most prestigious address. 10% booking — 24-month easy installments.
          </P>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:03111786243"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#c9a84c', color: '#000', fontFamily: 'Montserrat', fontSize: '10px', letterSpacing: '0.25em', fontWeight: 700, padding: '16px 36px', textDecoration: 'none', transition: 'background 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#f5d485'}
              onMouseLeave={e => e.currentTarget.style.background = '#c9a84c'}
            >
              <Phone size={14} /> CALL NOW
            </a>
            <a href="https://www.facebook.com/Businesshubfaisalabad/" target="_blank" rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', border: '1px solid rgba(201,168,76,0.3)', color: '#c9a84c', fontFamily: 'Montserrat', fontSize: '10px', letterSpacing: '0.25em', padding: '16px 36px', textDecoration: 'none', transition: 'all 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.07)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <Facebook size={14} /> FACEBOOK
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ── CONTACT ───────────────────────────────────────── */
function Contact() {
  return (
    <section id="contact" style={{ background: '#060606', padding: '100px 0' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 clamp(24px,4vw,48px)' }}>
        <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: '64px' }}>
          <SectionLabel>Get In Touch</SectionLabel>
          <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontWeight: 300, lineHeight: 1, color: '#fff', fontSize: 'clamp(38px,5vw,68px)' }}>
            Ready to <span style={{ fontStyle: 'italic' }}><G>Invest?</G></span>
          </h2>
          <GoldLine />
          <P style={{ maxWidth: '380px', margin: '0 auto', textAlign: 'center' }}>
            Limited units remain. Our team is ready to guide you through pricing, availability, and booking.
          </P>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '2px', background: 'rgba(201,168,76,0.07)', marginBottom: '48px' }}>
          {[
            { icon: Phone,    label: 'Call Us',   val: '03-111-786-243', href: 'tel:03111786243' },
            { icon: MapPin,   label: 'Location',  val: 'Sargodha Road, Faisalabad', href: null },
            { icon: Facebook, label: 'Follow Us', val: '@BusinessHubFaisalabad', href: 'https://www.facebook.com/Businesshubfaisalabad/' },
          ].map((item, i) => (
            <motion.div key={item.label} {...fadeUp(i * 0.08)}
              style={{ background: '#060606', padding: 'clamp(36px,5vh,56px) clamp(20px,3vw,40px)', textAlign: 'center', transition: 'background 0.3s' }}
              className="group hover:bg-neutral-900/40"
            >
              <div style={{ width: '52px', height: '52px', border: '1px solid rgba(201,168,76,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', transition: 'border-color 0.3s' }}
                className="group-hover:border-yellow-500/40">
                <item.icon size={18} style={{ color: '#c9a84c' }} />
              </div>
              <p style={{ fontFamily: 'Montserrat', fontSize: '9px', letterSpacing: '0.38em', color: '#444', marginBottom: '10px', textTransform: 'uppercase' }}>{item.label}</p>
              {item.href
                ? <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                    style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(18px,2vw,26px)', color: '#fff', textDecoration: 'none', transition: 'color 0.3s' }}
                    className="hover:text-yellow-400">{item.val}</a>
                : <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(18px,2vw,26px)', color: '#fff' }}>{item.val}</p>
              }
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp(0.2)} style={{ textAlign: 'center' }}>
          <a href="tel:03111786243"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '14px', background: '#c9a84c', color: '#000', fontFamily: 'Montserrat', fontSize: '11px', letterSpacing: '0.28em', fontWeight: 700, padding: 'clamp(16px,2vh,20px) clamp(36px,5vw,60px)', textDecoration: 'none', transition: 'background 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#f5d485'}
            onMouseLeave={e => e.currentTarget.style.background = '#c9a84c'}
          >
            <Phone size={15} /> CALL 03-111-786-243 <ChevronRight size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

/* ── PAGE ──────────────────────────────────────────── */
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
