import { useState, useEffect } from 'react'
import { Bell, Search } from 'lucide-react'

export default function Header({ currentPage }) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const titles = {
    'Dashboard': 'Panel de Control',
    'Intersecciones': 'Mapa de Intersecciones',
    'Alertas': 'Centro de Alertas',
    'Reportes': 'Reportes de Tráfico',
  }

  return (
    <header className="header">
      <div className="header-left">
        <h2>{titles[currentPage] || currentPage}</h2>
      </div>
      <div className="header-right">
        <div className="header-status">
          <div className="pulse"></div>
          Sistema Activo
        </div>
        <div className="header-time">
          {time.toLocaleDateString('es-CO', { weekday: 'short', day: 'numeric', month: 'short' })}
          {' — '}
          {time.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </div>
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <Bell size={18} color="var(--text-secondary)" />
          <span style={{
            position: 'absolute', top: -4, right: -4,
            width: 16, height: 16, borderRadius: '50%',
            background: 'var(--accent-red)', fontSize: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700
          }}>3</span>
        </div>
      </div>
    </header>
  )
}
