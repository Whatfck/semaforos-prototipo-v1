import { NavLink } from 'react-router-dom'
import { LayoutDashboard, MapPin, AlertTriangle, BarChart3, Settings, Shield, Cpu } from 'lucide-react'

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">ST</div>
        <div>
          <h1>SMARTTRAFFIC</h1>
          <span>Centro de Control v1.0</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section-title">Principal</div>
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
          <LayoutDashboard size={18} /> Dashboard
        </NavLink>
        <NavLink to="/intersecciones" className={({ isActive }) => isActive ? 'active' : ''}>
          <MapPin size={18} /> Intersecciones
        </NavLink>
        <NavLink to="/alertas" className={({ isActive }) => isActive ? 'active' : ''}>
          <AlertTriangle size={18} /> Alertas
        </NavLink>
        <NavLink to="/reportes" className={({ isActive }) => isActive ? 'active' : ''}>
          <BarChart3 size={18} /> Reportes
        </NavLink>

        <div className="sidebar-section-title">Sistema</div>
        <NavLink to="#" className="">
          <Cpu size={18} /> Dispositivos IoT
        </NavLink>
        <NavLink to="#" className="">
          <Shield size={18} /> Seguridad
        </NavLink>
        <NavLink to="#" className="">
          <Settings size={18} /> Configuración
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <p>Universidad Cooperativa de Colombia</p>
        <p style={{ marginTop: 4 }}>Pasto, Nariño — 2026</p>
      </div>
    </aside>
  )
}
