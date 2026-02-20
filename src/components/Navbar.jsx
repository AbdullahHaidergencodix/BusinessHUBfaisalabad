import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Phone, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'About',    href: '#about'    },
  { label: 'Features', href: '#features' },
  { label: 'Payment',  href: '#payment'  },
  { label: 'Gallery',  href: '#gallery'  },
  { label: 'Location', href: '#location' },
  { label: 'Contact',  href: '#contact'  },
]

export default function Navbar() {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(6,6,6,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.12)' : '1px solid transparent',
        padding: scrolled ? '14px 32px' : '22px 32px',
        transition: 'all 0.5s ease',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <img src="/images/logo.jpg" alt="Business Hub Faisalabad" style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
          <div>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', color: '#c9a84c', fontSize: '16px', letterSpacing: '0.18em', fontWeight: 600, lineHeight: 1 }}>BUSINESS HUB</p>
            <p style={{ fontFamily: 'Montserrat', color: '#6b4f1f', fontSize: '7px', letterSpacing: '0.5em' }}>FAISALABAD</p>
          </div>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="hidden md:flex">
          {links.map(l => (
            <a key={l.label} href={l.href}
              style={{ fontFamily: 'Montserrat', fontSize: '10px', letterSpacing: '0.2em', color: '#777', textDecoration: 'none', transition: 'color 0.3s', position: 'relative' }}
              className="group uppercase hover:text-yellow-400"
            >
              {l.label}
              <span style={{ position: 'absolute', bottom: '-4px', left: 0, height: '1px', background: '#c9a84c', width: 0, transition: 'width 0.3s' }}
                className="group-hover:w-full" />
            </a>
          ))}
        </div>

        <a href="tel:03111786243"
          style={{ display: 'none', alignItems: 'center', gap: '8px', border: '1px solid rgba(201,168,76,0.35)', color: '#c9a84c', fontFamily: 'Montserrat', fontSize: '10px', letterSpacing: '0.15em', padding: '10px 20px', textDecoration: 'none', transition: 'all 0.3s' }}
          className="md:!flex"
          onMouseEnter={e => { e.currentTarget.style.background = '#c9a84c'; e.currentTarget.style.color = '#000' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#c9a84c' }}
        >
          <Phone size={11} /> 03-111-786-243
        </a>

        <button onClick={() => setOpen(!open)}
          style={{ color: '#c9a84c', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
          className="md:hidden" aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden', background: 'rgba(6,6,6,0.99)', borderTop: '1px solid rgba(201,168,76,0.1)', marginTop: '14px' }}
          >
            <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {links.map(l => (
                <a key={l.label} href={l.href} onClick={() => setOpen(false)}
                  style={{ fontFamily: 'Montserrat', fontSize: '11px', letterSpacing: '0.25em', color: '#666', textDecoration: 'none', transition: 'color 0.3s' }}
                  className="uppercase hover:text-yellow-400">
                  {l.label}
                </a>
              ))}
              <a href="tel:03111786243"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#c9a84c', fontFamily: 'Montserrat', fontSize: '13px', fontWeight: 600, textDecoration: 'none', paddingTop: '8px', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
                <Phone size={14} /> 03-111-786-243
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
