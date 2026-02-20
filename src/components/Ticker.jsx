import { motion } from 'framer-motion'

const items = [
  'Drive-Thru Commercial','Sargodha Road','Bookings Now Open',
  'TMA Approved','10% Booking','2-Year Installments',
  'Fatir Developers','Faisalabad','22,000 PKR / Sq.Ft','Buy · Sale · Lease',
]

const Diamond = ({ dark }) => (
  <span style={{ display:'inline-block', width:'4px', height:'4px', background: dark ? '#c9a84c' : '#fff', transform:'rotate(45deg)', margin:'0 24px', flexShrink:0, verticalAlign:'middle', opacity: dark ? 0.7 : 0.6 }} />
)

export default function Ticker({ dark = false }) {
  const all = [...items, ...items, ...items]
  return (
    <div style={{ background: dark ? '#0a0a0a' : '#c9a84c', borderTop: dark ? '1px solid rgba(0,0,0,0.06)' : 'none', borderBottom: dark ? '1px solid rgba(0,0,0,0.06)' : 'none', overflow:'hidden', padding:'13px 0', userSelect:'none' }}>
      <motion.div
        animate={{ x:['0%','-33.333%'] }}
        transition={{ duration:28, repeat:Infinity, ease:'linear' }}
        style={{ display:'flex', alignItems:'center', whiteSpace:'nowrap', width:'max-content' }}
      >
        {all.map((item,i) => (
          <span key={i} style={{ display:'inline-flex', alignItems:'center' }}>
            <span style={{ fontFamily:'Montserrat', fontSize:'10px', letterSpacing:'0.3em', color: dark ? '#c9a84c' : '#fff', fontWeight:600, textTransform:'uppercase' }}>
              {item}
            </span>
            <Diamond dark={dark} />
          </span>
        ))}
      </motion.div>
    </div>
  )
}
