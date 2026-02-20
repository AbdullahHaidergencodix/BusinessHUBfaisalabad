import { Phone, MapPin, Facebook } from 'lucide-react'
import Ticker from './Ticker'

export default function Footer() {
  return (
    <footer style={{ background:'#0a0a0a' }}>
      <Ticker dark />
      <div style={{ maxWidth:'1400px', margin:'0 auto', padding:'72px 32px 48px', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:'48px' }}>

        <div style={{ gridColumn:'span 2' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'20px' }}>
            <img src="/images/logo.jpg" alt="Business Hub" style={{ width:'40px', height:'40px', objectFit:'contain' }} />
            <div>
              <p style={{ fontFamily:'Cormorant Garamond,serif', color:'#c9a84c', fontSize:'18px', letterSpacing:'0.15em', fontWeight:600 }}>BUSINESS HUB</p>
              <p style={{ fontFamily:'Montserrat', color:'#3a3a3a', fontSize:'7px', letterSpacing:'0.45em' }}>FAISALABAD</p>
            </div>
          </div>
          <p style={{ fontFamily:'Montserrat', color:'#3a3a3a', fontSize:'12px', lineHeight:'2', maxWidth:'260px' }}>
            An iconic drive-thru commercial project redefining business on Sargodha Road. By Fatir Developers Pvt. Ltd.
          </p>
        </div>

        <div>
          <p style={{ fontFamily:'Montserrat', fontSize:'9px', letterSpacing:'0.4em', color:'#c9a84c', marginBottom:'20px' }}>CONTACT</p>
          <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
            <a href="tel:03111786243" style={{ display:'flex', alignItems:'center', gap:'10px', color:'#555', fontFamily:'Montserrat', fontSize:'12px', textDecoration:'none', transition:'color 0.3s' }}
              className="hover:!text-amber-600">
              <Phone size={12} style={{ color:'#c9a84c', flexShrink:0 }} /> 03-111-786-243
            </a>
            <p style={{ display:'flex', alignItems:'flex-start', gap:'10px', color:'#555', fontFamily:'Montserrat', fontSize:'12px' }}>
              <MapPin size={12} style={{ color:'#c9a84c', flexShrink:0, marginTop:'2px' }} /> Sargodha Road, Faisalabad
            </p>
            <a href="https://www.facebook.com/Businesshubfaisalabad/" target="_blank" rel="noreferrer"
              style={{ display:'flex', alignItems:'center', gap:'10px', color:'#555', fontFamily:'Montserrat', fontSize:'12px', textDecoration:'none', transition:'color 0.3s' }}
              className="hover:!text-amber-600">
              <Facebook size={12} style={{ color:'#c9a84c', flexShrink:0 }} /> Facebook Page
            </a>
          </div>
        </div>

        <div>
          <p style={{ fontFamily:'Montserrat', fontSize:'9px', letterSpacing:'0.4em', color:'#c9a84c', marginBottom:'20px' }}>NAVIGATE</p>
          <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
            {['About','Features','Payment','Gallery','Location','Contact'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`}
                style={{ fontFamily:'Montserrat', fontSize:'11px', letterSpacing:'0.12em', color:'#555', textDecoration:'none', transition:'color 0.3s', textTransform:'uppercase' }}
                className="hover:!text-amber-600">{l}</a>
            ))}
          </div>
        </div>
      </div>

      <div style={{ borderTop:'1px solid rgba(255,255,255,0.05)', padding:'18px 32px', textAlign:'center' }}>
        <p style={{ fontFamily:'Montserrat', fontSize:'10px', color:'#333', letterSpacing:'0.08em' }}>
          © {new Date().getFullYear()} Business Hub Faisalabad — Fatir Developers Pvt. Ltd. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
