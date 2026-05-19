import { useEffect } from 'react'
import { AlertTriangle, CheckCircle, XCircle, Info, Shield, Wifi, Camera, Cpu, Siren } from 'lucide-react'

const alertsData = [
  { id: 1, type: 'critical', icon: <XCircle size={16} />, title: 'Sensor #04 Desconectado', desc: 'Sensor de lazo inductivo sin respuesta en Av. Boyacá x Calle 16. Última conexión hace 18 minutos.', time: 'Hace 3 min', location: 'Intersección #5' },
  { id: 2, type: 'critical', icon: <Camera size={16} />, title: 'Cámara #02 — Señal Perdida', desc: 'La cámara de visión artificial de la Cra 27 x Calle 22 reporta pérdida total de señal de video.', time: 'Hace 8 min', location: 'Intersección #2' },
  { id: 3, type: 'warning', icon: <AlertTriangle size={16} />, title: 'Alta Congestión Detectada', desc: 'El corredor Av. Panamericana supera el 85% de densidad vehicular. El algoritmo adaptativo ha extendido el ciclo verde.', time: 'Hace 12 min', location: 'Av. Panamericana' },
  { id: 4, type: 'warning', icon: <Cpu size={16} />, title: 'CPU del Edge Server al 89%', desc: 'El computador de borde en la intersección #1 muestra carga elevada. Riesgo de latencia en decisiones.', time: 'Hace 25 min', location: 'Intersección #1' },
  { id: 5, type: 'info', icon: <Siren size={16} />, title: 'Vehículo de Emergencia Priorizado', desc: 'Ambulancia detectada en corredor norte. Se activó "ola verde" temporal por 90 segundos en 3 semáforos.', time: 'Hace 28 min', location: 'Ruta Norte' },
  { id: 6, type: 'info', icon: <Shield size={16} />, title: 'Cifrado de Video Verificado', desc: 'Todas las transmisiones de cámaras cumplen protocolo TLS 1.3. Datos anonimizados según Ley 1581/2012.', time: 'Hace 45 min', location: 'Sistema Global' },
  { id: 7, type: 'info', icon: <Wifi size={16} />, title: 'Red 4G Estable', desc: 'Los módems de comunicación celular reportan latencia promedio de 22ms en todas las intersecciones activas.', time: 'Hace 1h', location: 'Red IoT' },
  { id: 8, type: 'warning', icon: <AlertTriangle size={16} />, title: 'Temperatura Elevada — Gabinete #3', desc: 'El gabinete IP66 de la intersección #3 registra 38°C. Límite recomendado: 40°C.', time: 'Hace 1h 15min', location: 'Intersección #3' },
]

const stats = [
  { label: 'Críticas', count: 2, color: 'var(--accent-red)', bg: 'rgba(239,68,68,0.1)' },
  { label: 'Advertencias', count: 3, color: 'var(--accent-yellow)', bg: 'rgba(245,158,11,0.1)' },
  { label: 'Informativas', count: 3, color: 'var(--accent-blue)', bg: 'rgba(59,130,246,0.1)' },
  { label: 'Resueltas hoy', count: 7, color: 'var(--accent-green)', bg: 'rgba(16,185,129,0.1)' },
]

export default function Alertas({ onMount }) {
  useEffect(() => { onMount?.() }, [])

  return (
    <div className="page">
      <div className="grid-4">
        {stats.map((s, i) => (
          <div key={i} className={`stat-card animate-in delay-${i + 1}`}
            style={{ borderTop: `2px solid ${s.color}` }}>
            <div style={{
              width: 42, height: 42, borderRadius: 10, background: s.bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 14, color: s.color
            }}>
              {i === 0 ? <XCircle size={20} /> : i === 1 ? <AlertTriangle size={20} /> : i === 2 ? <Info size={20} /> : <CheckCircle size={20} />}
            </div>
            <div className="stat-value">{s.count}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="card animate-in delay-2">
        <div className="card-header">
          <div>
            <div className="card-title">Historial de Alertas</div>
            <div className="card-subtitle">Notificaciones del sistema — RF-04: Alertas de fallos de hardware</div>
          </div>
        </div>
        {alertsData.map(a => (
          <div key={a.id} className={`alert-item ${a.type}`}>
            <div className="alert-icon">{a.icon}</div>
            <div className="alert-content" style={{ flex: 1 }}>
              <h5>{a.title}</h5>
              <p>{a.desc}</p>
              <span style={{ fontSize: 11, color: 'var(--accent-cyan)', marginTop: 4, display: 'inline-block' }}>
                📍 {a.location}
              </span>
            </div>
            <span className="alert-time">{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
