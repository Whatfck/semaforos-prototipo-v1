import { useEffect, useState } from 'react'
import { MapPin, Wifi, WifiOff, Thermometer, Camera, Radio } from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import TrafficLight from '../components/TrafficLight'

const intersectionsData = [
  { id: 1, name: 'Calle 16 x Carrera 27', coords: [1.2158758599848443, -77.2813528581243], state: 'red', vehicles: 42, sensors: 3, cameras: 1, online: true, temp: '18°C', wait: '45s', density: 87, ref: 'Parque Ambiental Rumipamba' },
  { id: 2, name: 'Calle 17 x Carrera 27', coords: [1.216289002968723, -77.28051245796952], state: 'green', vehicles: 18, sensors: 3, cameras: 1, online: true, temp: '17°C', wait: '12s', density: 38, ref: 'Gimnasio Muscle Mania' },
  { id: 3, name: 'Calle 18 x Carrera 27', coords: [1.2166510835690707, -77.2796674097402], state: 'yellow', vehicles: 28, sensors: 3, cameras: 1, online: true, temp: '19°C', wait: '25s', density: 65, ref: 'Catedral Sagrado Corazón' },
]

const getMarkerIcon = (density) => {
  const color = density > 70 ? '#ef4444' : density > 40 ? '#f59e0b' : '#10b981'
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; box-shadow: 0 0 0 2px rgba(255,255,255,0.8), 0 0 10px ${color};"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7]
  })
}

export default function Intersecciones({ onMount }) {
  useEffect(() => { onMount?.() }, [])
  const [selected, setSelected] = useState(0)
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase(p => (p + 1) % 3)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="page">
      {/* Map */}
      <div className="card animate-in delay-1" style={{ marginBottom: 28 }}>
        <div className="card-header">
          <div>
            <div className="card-title">Mapa de Intersecciones — Corredor Carrera 27 (Pasto)</div>
            <div className="card-subtitle">Red semafórica IoT piloto — 3 intersecciones monitoreadas (9 semáforos)</div>
          </div>
          <div style={{ display: 'flex', gap: 12, fontSize: 11 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--accent-green)' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-green)' }}></span> Fluido
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--accent-yellow)' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-yellow)' }}></span> Moderado
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--accent-red)' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-red)' }}></span> Congestionado
            </span>
          </div>
        </div>
        <div className="map-container" style={{ height: 400, borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--border-glass)' }}>
          <MapContainer center={[1.216289002968723, -77.28051245796952]} zoom={17} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            {intersectionsData.map((inter, i) => (
              <Marker 
                key={inter.id} 
                position={inter.coords} 
                icon={getMarkerIcon(inter.density)}
                eventHandlers={{ click: () => setSelected(i) }}
              >
                <Popup className="dark-popup">
                  <strong style={{ color: '#111827' }}>{inter.name}</strong><br />
                  {inter.vehicles} vehículos — {inter.wait} espera
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* Intersection Details Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {intersectionsData.map((inter, i) => (
          <div
            key={inter.id}
            className={`card animate-in delay-${(i % 4) + 1}`}
            style={{
              cursor: 'pointer',
              border: selected === i ? '1px solid var(--accent-green)' : undefined,
            }}
            onClick={() => setSelected(i)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <TrafficLight state={(phase + i) % 3 === 0 ? 'green' : 'red'} />
                <TrafficLight state={(phase + i) % 3 === 1 ? 'green' : 'red'} />
                <TrafficLight state={(phase + i) % 3 === 2 ? 'green' : 'red'} />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{inter.name}</h4>
                <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                  Ref: {inter.ref}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
                  {inter.online
                    ? <span className="badge green"><Wifi size={10} /> En línea</span>
                    : <span className="badge red"><WifiOff size={10} /> Desconectado</span>
                  }
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { icon: <Camera size={13} />, label: 'Cámaras', value: inter.cameras },
                { icon: <Radio size={13} />, label: 'Semáforos', value: 3 },
                { icon: <Thermometer size={13} />, label: 'Temp.', value: inter.temp },
                { icon: <MapPin size={13} />, label: 'Vehículos', value: inter.vehicles },
              ].map((s, j) => (
                <div key={j} style={{
                  background: 'var(--bg-glass)', borderRadius: 8, padding: '8px 10px',
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontSize: 11, color: 'var(--text-secondary)'
                }}>
                  <span style={{ color: 'var(--text-muted)' }}>{s.icon}</span>
                  <span>{s.label}: <strong style={{ color: 'var(--text-primary)' }}>{s.value}</strong></span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 6, color: 'var(--text-muted)' }}>
                <span>Densidad vehicular</span>
                <span style={{ fontWeight: 600, color: inter.density > 70 ? 'var(--accent-red)' : inter.density > 40 ? 'var(--accent-yellow)' : 'var(--accent-green)' }}>
                  {inter.density}%
                </span>
              </div>
              <div className="progress-bar">
                <div className="fill" style={{
                  width: `${inter.density}%`,
                  background: inter.density > 70 ? 'var(--accent-red)' : inter.density > 40 ? 'var(--accent-yellow)' : 'var(--accent-green)'
                }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
