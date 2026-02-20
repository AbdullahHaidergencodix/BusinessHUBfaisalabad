import { Routes, Route } from 'react-router-dom'
import Navbar   from './components/Navbar'
import Footer   from './components/Footer'
import WhatsApp from './components/WhatsApp'
import Home     from './pages/Home'

export default function App() {
  return (
    <div style={{ background:'#fafafa' }} className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
      <WhatsApp />
    </div>
  )
}
