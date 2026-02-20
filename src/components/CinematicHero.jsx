import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
  {
    // Faisalabad city skyline at night - dark glass buildings
    gradient: 'from-black via-neutral-950 to-black',
    accent: 'from-yellow-900/40 via-yellow-800/10 to-transparent',
    label: "Sargodha Road's New Identity",
    tag: 'Prime Location',
  },
  {
    // Luxury commercial architecture
    gradient: 'from-neutral-950 via-black to-neutral-900',
    accent: 'from-amber-900/30 via-yellow-900/10 to-transparent',
    label: 'Iconic Drive-Thru Commercial Project',
    tag: 'Premium Investment',
  },
  {
    // Gold and black luxury aesthetic
    gradient: 'from-black via-stone-950 to-black',
    accent: 'from-yellow-800/35 via-amber-900/10 to-transparent',
    label: 'Redefining Business in Faisalabad',
    tag: 'Iconic Architecture',
  },
]

// Cinematic particle system
function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `rgba(201,168,76,${Math.random() * 0.6 + 0.1})`,
          }}
          animate={{
            y: [0, -120, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: Math.random() * 6 + 5,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// Cinematic scan lines overlay
function ScanLines() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-10 opacity-[0.03]"
      style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
      }}
    />
  )
}

// Animated building silhouette SVG
function BuildingSilhouette() {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 opacity-15 pointer-events-none">
      <svg viewBox="0 0 1440 400" xmlns="http://www.w3.org/2000/svg" className="w-full">
        <defs>
          <linearGradient id="buildingGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#c9a84c" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Skyline silhouette */}
        <path
          d="M0,400 L0,300 L60,300 L60,250 L80,250 L80,200 L100,200 L100,180 L120,180 L120,160 L140,160 L140,140 L155,140 L155,100 L165,100 L165,80 L175,80 L175,100 L185,100 L185,140 L200,140 L200,160 L220,160 L220,200 L250,200 L250,220 L280,220 L280,180 L300,180 L300,150 L315,150 L315,120 L325,120 L325,90 L335,90 L335,70 L345,70 L345,50 L360,50 L360,30 L370,30 L370,10 L380,10 L380,30 L390,30 L390,50 L405,50 L405,70 L415,70 L415,90 L425,90 L425,120 L435,120 L435,150 L450,150 L450,180 L480,180 L480,200 L520,200 L520,230 L560,230 L560,210 L580,210 L580,170 L600,170 L600,140 L620,140 L620,110 L640,110 L640,80 L660,80 L660,60 L680,60 L680,40 L700,40 L700,20 L720,20 L720,40 L740,40 L740,60 L760,60 L760,80 L780,80 L780,110 L800,110 L800,140 L820,140 L820,170 L840,170 L840,210 L860,210 L860,230 L900,230 L900,200 L940,200 L940,220 L970,220 L970,180 L990,180 L990,150 L1010,150 L1010,120 L1030,120 L1030,140 L1060,140 L1060,160 L1080,160 L1080,180 L1100,180 L1100,200 L1140,200 L1140,220 L1180,220 L1180,240 L1220,240 L1220,260 L1260,260 L1260,280 L1300,280 L1300,300 L1360,300 L1360,320 L1440,320 L1440,400 Z"
          fill="url(#buildingGrad)"
        />
      </svg>
    </div>
  )
}

export default function CinematicHero({ children }) {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState(null)
  const timerRef = useRef(null)

  const goTo = (idx) => {
    setPrev(current)
    setCurrent(idx)
  }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setPrev(current)
      setCurrent(c => (c + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timerRef.current)
  }, [current])

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* ── Slide backgrounds ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          className={`absolute inset-0 bg-gradient-to-br ${slides[current].gradient}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      {/* ── Cinematic radial accent ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`accent-${current}`}
          className={`absolute inset-0 bg-gradient-to-t ${slides[current].accent}`}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
      </AnimatePresence>

      {/* ── Gold spotlight from top ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_top,_#c9a84c18_0%,_transparent_65%)] pointer-events-none" />

      {/* ── Cinematic vignette ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.85)_100%)] pointer-events-none z-10" />

      {/* ── Animated horizontal light streaks ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-yellow-500/25 to-transparent w-full"
            style={{ top: `${20 + i * 20}%` }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{
              duration: 10 + i * 3,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 2,
            }}
          />
        ))}
      </div>

      {/* ── Vertical gold accent lines ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5] opacity-30">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px bg-gradient-to-b from-transparent via-yellow-600/40 to-transparent h-full"
            style={{ left: `${25 + i * 25}%` }}
            animate={{ y: ['-100%', '100%'] }}
            transition={{
              duration: 15 + i * 4,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 3,
            }}
          />
        ))}
      </div>

      {/* ── Particles ── */}
      <Particles />

      {/* ── Scan lines ── */}
      <ScanLines />

      {/* ── Building silhouette ── */}
      <BuildingSilhouette />

      {/* ── Slide tag badge ── */}
      <div className="absolute top-32 left-1/2 -translate-x-1/2 z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={`tag-${current}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 border border-yellow-700/40 bg-yellow-500/5 backdrop-blur-sm text-yellow-500 text-[10px] tracking-[0.5em] uppercase px-5 py-2 rounded-sm">
              <span className="w-1 h-1 rounded-full bg-yellow-500 animate-pulse" />
              {slides[current].tag}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Cinematic slide label (bottom left) ── */}
      <div className="absolute bottom-28 left-8 z-20 hidden md:block">
        <AnimatePresence mode="wait">
          <motion.p
            key={`label-${current}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.7 }}
            className="text-yellow-700 text-xs tracking-[0.4em] uppercase border-l-2 border-yellow-700/50 pl-3"
          >
            {slides[current].label}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* ── Slide indicators (bottom center) ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="group flex items-center"
          >
            <motion.div
              animate={{
                width: i === current ? 32 : 8,
                backgroundColor: i === current ? '#c9a84c' : '#4a3a1a',
              }}
              transition={{ duration: 0.4 }}
              className="h-[3px] rounded-full"
            />
          </button>
        ))}
      </div>

      {/* ── Progress bar ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-yellow-900/20 z-20">
        <motion.div
          key={current}
          className="h-full bg-gradient-to-r from-yellow-700 to-yellow-400"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 6, ease: 'linear' }}
        />
      </div>

      {/* ── Slide counter (top right) ── */}
      <div className="absolute top-28 right-8 z-20 hidden md:flex items-center gap-2 text-yellow-700">
        <span className="text-yellow-400 font-bold text-lg tabular-nums">
          0{current + 1}
        </span>
        <div className="w-8 h-px bg-yellow-700/50" />
        <span className="text-xs tabular-nums">0{slides.length}</span>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-20">
        {children}
      </div>

    </div>
  )
}
