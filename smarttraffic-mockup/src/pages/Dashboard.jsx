import { useEffect, useState } from 'react'
import { Car, Activity, MapPin, AlertTriangle, TrendingUp, TrendingDown, Zap, Clock } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import TrafficLight from '../components/TrafficLight'

const flowData = [
  { hour: '06:00', vehiculos: 120 }, { hour: '07:00', vehiculos: 340 },
  { hour: '08:00', vehiculos: 580 }, { hour: '09:00', vehiculos: 420 },
  { hour: '10:00', vehiculos: 310 }, { hour: '11:00', vehiculos: 290 },
  { hour: '12:00', vehiculos: 460 }, { hour: '13:00', vehiculos: 520 },
  { hour: '14:00', vehiculos: 390 }, { hour: '15:00', vehiculos: 350 },
  { hour: '16:00', vehiculos: 410 }, { hour: '17:00', vehiculos: 620 },
  { hour: '18:00', vehiculos: 710 }, { hour: '19:00', vehiculos: 540 },
  { hour: '20:00', vehiculos: 320 }, { hour: '21:00', vehiculos: 180 },
]

const congestionData = [
  { name: 'Calle 16', nivel: 87 }, { name: 'Calle 17', nivel: 72 },
  { name: 'Calle 18', nivel: 65 }, { name: 'Cra 27 Norte', nivel: 45 },
  { name: 'Cra 27 Sur', nivel: 38 }, { name: 'Parque Rumipamba', nivel: 55 },
]

const intersections = [
  { id: 1, name: 'Calle 16 x Carrera 27', state: 'red', vehicles: 42, wait: '45s', status: 'congested' },
  { id: 2, name: 'Calle 17 x Carrera 27', state: 'green', vehicles: 18, wait: '12s', status: 'active' },
  { id: 3, name: 'Calle 18 x Carrera 27', state: 'yellow', vehicles: 28, wait: '25s', status: 'moderate' },
]

const alerts = [
  { type: 'critical', msg: 'Sensor #04 desconectado — Calle 16 x Cra 27', time: 'Hace 3 min' },
  { type: 'warning', msg: 'Alta congestión detectada — Carrera 27', time: 'Hace 12 min' },
  { type: 'info', msg: 'Vehículo de emergencia priorizado — Ruta Norte', time: 'Hace 28 min' },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(17,24,39,0.95)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 8, padding: '10px 14px', fontSize: 12
      }}>
        <p style={{ color: '#94a3b8', marginBottom: 4 }}>{label}</p>
        <p style={{ color: '#10b981', fontWeight: 700 }}>{payload[0].value} vehículos</p>
      </div>
    )
  }
  return null
}

export default function Dashboard({ onMount }) {
  useEffect(() => { onMount?.() }, [])

  const [lightStates, setLightStates] = useState(['red', 'green', 'yellow'])

  useEffect(() => {
    const cycle = ['green', 'yellow', 'red']
    const interval = setInterval(() => {
      setLightStates(prev => prev.map(s => cycle[(cycle.indexOf(s) + 1) % 3]))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="page">
      {/* KPI Cards */}
      <div className="grid-4">
        <div className="stat-card green animate-in delay-1">
          <div className="stat-icon"><Car size={20} /></div>
          <div className="stat-value">2,847</div>
          <div className="stat-label">Vehículos detectados / hora</div>
          <div className="stat-change positive"><TrendingUp size={12} /> +12.5%</div>
        </div>
        <div className="stat-card blue animate-in delay-2">
          <div className="stat-icon"><MapPin size={20} /></div>
          <div className="stat-value">3</div>
          <div className="stat-label">Intersecciones activas</div>
          <div className="stat-change positive"><TrendingUp size={12} /> 100%</div>
        </div>
        <div className="stat-card yellow animate-in delay-3">
          <div className="stat-icon"><Clock size={20} /></div>
          <div className="stat-value">23s</div>
          <div className="stat-label">Tiempo promedio de espera</div>
          <div className="stat-change positive"><TrendingDown size={12} /> -18.3%</div>
        </div>
        <div className="stat-card red animate-in delay-4">
          <div className="stat-icon"><AlertTriangle size={20} /></div>
          <div className="stat-value">3</div>
          <div className="stat-label">Alertas activas</div>
          <div className="stat-change negative"><TrendingUp size={12} /> +1</div>
        </div>
      </div>

      {/* Chart + Map Row */}
      <div className="grid-2">
        <div className="card animate-in delay-2">
          <div className="card-header">
            <div>
              <div className="card-title">Flujo Vehicular en Tiempo Real</div>
              <div className="card-subtitle">Vehículos detectados por hora — Hoy</div>
            </div>
            <span className="badge green"><Activity size={12} /> En vivo</span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={flowData}>
              <defs>
                <linearGradient id="colorVeh" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="vehiculos" stroke="#10b981" strokeWidth={2} fill="url(#colorVeh)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card animate-in delay-3">
          <div className="card-header">
            <div>
              <div className="card-title">Nivel de Congestión</div>
              <div className="card-subtitle">Por corredor vial principal</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={congestionData} layout="vertical" barSize={14}>
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={110} />
              <Bar dataKey="nivel" radius={[0, 6, 6, 0]} fill="#3b82f6"
                label={{ position: 'right', fill: '#94a3b8', fontSize: 11, formatter: v => `${v}%` }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Intersections + Alerts Row */}
      <div className="grid-2-equal">
        <div className="card animate-in delay-3">
          <div className="card-header">
            <div>
              <div className="card-title">Semáforos en Tiempo Real</div>
              <div className="card-subtitle">Intersecciones piloto monitoreadas</div>
            </div>
            <span className="badge blue"><Zap size={12} /> Adaptativo</span>
          </div>
          {intersections.map((inter, i) => (
            <div key={inter.id} className="intersection-card" style={{ marginBottom: i < intersections.length - 1 ? 12 : 0 }}>
              <TrafficLight state={lightStates[i]} />
              <div className="intersection-info">
                <h4>{inter.name}</h4>
                <p>Intersección piloto #{inter.id}</p>
                <div className="intersection-stats">
                  <div className="intersection-stat">
                    <div className="dot" style={{ background: 'var(--accent-cyan)' }}></div>
                    {inter.vehicles} vehículos
                  </div>
                  <div className="intersection-stat">
                    <div className="dot" style={{ background: 'var(--accent-yellow)' }}></div>
                    Espera: {inter.wait}
                  </div>
                </div>
              </div>
              <span className={`badge ${inter.status === 'congested' ? 'red' : inter.status === 'moderate' ? 'yellow' : 'green'}`}>
                {inter.status === 'congested' ? 'Congestionado' : inter.status === 'moderate' ? 'Moderado' : 'Fluido'}
              </span>
            </div>
          ))}
        </div>

        <div className="card animate-in delay-4">
          <div className="card-header">
            <div>
              <div className="card-title">Alertas Recientes</div>
              <div className="card-subtitle">Notificaciones del sistema</div>
            </div>
          </div>
          {alerts.map((a, i) => (
            <div key={i} className={`alert-item ${a.type}`}>
              <div className="alert-icon">
                <AlertTriangle size={16} />
              </div>
              <div className="alert-content">
                <h5>{a.type === 'critical' ? 'Crítico' : a.type === 'warning' ? 'Advertencia' : 'Información'}</h5>
                <p>{a.msg}</p>
              </div>
              <span className="alert-time">{a.time}</span>
            </div>
          ))}

          <div style={{ marginTop: 20 }}>
            <div className="card-title" style={{ marginBottom: 12 }}>Rendimiento del Sistema</div>
            {[
              { label: 'CPU Servidor Central', value: 42, color: '#10b981' },
              { label: 'RAM Utilizada', value: 67, color: '#3b82f6' },
              { label: 'Ancho de Banda IoT', value: 31, color: '#06b6d4' },
              { label: 'Almacenamiento', value: 55, color: '#8b5cf6' },
            ].map((m, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12, color: 'var(--text-secondary)' }}>
                  <span>{m.label}</span>
                  <span style={{ fontWeight: 600 }}>{m.value}%</span>
                </div>
                <div className="progress-bar">
                  <div className="fill" style={{ width: `${m.value}%`, background: m.color }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
