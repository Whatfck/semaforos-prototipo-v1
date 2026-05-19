import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Intersecciones from './pages/Intersecciones'
import Alertas from './pages/Alertas'
import Reportes from './pages/Reportes'

export default function App() {
  const [currentPage, setCurrentPage] = useState('Dashboard')

  return (
    <Router>
      <Sidebar />
      <div className="main-content">
        <Header currentPage={currentPage} />
        <Routes>
          <Route path="/" element={<Dashboard onMount={() => setCurrentPage('Dashboard')} />} />
          <Route path="/intersecciones" element={<Intersecciones onMount={() => setCurrentPage('Intersecciones')} />} />
          <Route path="/alertas" element={<Alertas onMount={() => setCurrentPage('Alertas')} />} />
          <Route path="/reportes" element={<Reportes onMount={() => setCurrentPage('Reportes')} />} />
        </Routes>
      </div>
    </Router>
  )
}
