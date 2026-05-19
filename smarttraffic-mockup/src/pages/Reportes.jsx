import { useEffect } from 'react'
import { FileText, Download, Calendar, TrendingDown, Fuel, Clock } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts'

const weeklyData = [
  { dia: 'Lun', antes: 52, despues: 23 }, { dia: 'Mar', antes: 48, despues: 21 },
  { dia: 'Mié', antes: 55, despues: 25 }, { dia: 'Jue', antes: 60, despues: 28 },
  { dia: 'Vie', antes: 68, despues: 30 }, { dia: 'Sáb', antes: 35, despues: 18 },
  { dia: 'Dom', antes: 22, despues: 12 },
]

const emissionsData = [
  { mes: 'Ene', co2: 420 }, { mes: 'Feb', co2: 395 }, { mes: 'Mar', co2: 380 },
  { mes: 'Abr', co2: 350 }, { mes: 'May', co2: 310 },
]

const pieData = [
  { name: 'Autos', value: 58, color: '#3b82f6' },
  { name: 'Motos', value: 22, color: '#10b981' },
  { name: 'Buses', value: 12, color: '#f59e0b' },
  { name: 'Camiones', value: 8, color: '#8b5cf6' },
]

const reports = [
  { name: 'Reporte Semanal — Semana 20', date: '12 May 2026', type: 'Automático', size: '2.4 MB' },
  { name: 'Informe de Congestión Av. Panamericana', date: '10 May 2026', type: 'Manual', size: '1.8 MB' },
  { name: 'Análisis Comparativo Línea Base vs SMARTTRAFFIC', date: '05 May 2026', type: 'Automático', size: '4.1 MB' },
  { name: 'Registro de Priorización Vehicular — Emergencias', date: '02 May 2026', type: 'Automático', size: '890 KB' },
  { name: 'Estadísticas de Rendimiento IoT — Abril', date: '30 Abr 2026', type: 'Automático', size: '3.2 MB' },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: 'rgba(17,24,39,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '10px 14px', fontSize: 12 }}>
        <p style={{ color: '#94a3b8', marginBottom: 4 }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color, fontWeight: 600 }}>{p.name}: {p.value}{p.dataKey === 'co2' ? ' ton' : 's'}</p>
        ))}
      </div>
    )
  }
  return null
}

export default function Reportes({ onMount }) {
  useEffect(() => { onMount?.() }, [])

  return (
    <div className="page">
      {/* KPIs de mejora */}
      <div className="grid-4">
        {[
          { icon: <Clock size={20} />, value: '-38%', label: 'Reducción tiempo de espera', cls: 'green' },
          { icon: <Fuel size={20} />, value: '-26%', label: 'Reducción consumo combustible', cls: 'blue' },
          { icon: <TrendingDown size={20} />, value: '-31%', label: 'Reducción emisiones CO₂', cls: 'yellow' },
          { icon: <FileText size={20} />, value: '12', label: 'Reportes generados este mes', cls: 'red' },
        ].map((s, i) => (
          <div key={i} className={`stat-card ${s.cls} animate-in delay-${i + 1}`}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid-2-equal">
        <div className="card animate-in delay-2">
          <div className="card-header">
            <div>
              <div className="card-title">Tiempo de Espera: Antes vs Después</div>
              <div className="card-subtitle">Comparativa semanal — Línea base vs SMARTTRAFFIC</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData} barGap={4}>
              <XAxis dataKey="dia" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} unit="s" />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12, color: '#94a3b8' }} />
              <Bar dataKey="antes" name="Antes (Fijo)" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={16} />
              <Bar dataKey="despues" name="Después (Adaptativo)" fill="#10b981" radius={[4, 4, 0, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card animate-in delay-3">
          <div className="card-header">
            <div>
              <div className="card-title">Emisiones CO₂ Estimadas</div>
              <div className="card-subtitle">Tendencia mensual — Toneladas</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={emissionsData}>
              <XAxis dataKey="mes" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="co2" name="CO₂" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4, fill: '#f59e0b' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid-2">
        {/* Reports Table */}
        <div className="card animate-in delay-3">
          <div className="card-header">
            <div>
              <div className="card-title">Reportes Generados — RF-05</div>
              <div className="card-subtitle">Datos históricos de congestión por horas y días</div>
            </div>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr><th>Nombre</th><th>Fecha</th><th>Tipo</th><th></th></tr>
              </thead>
              <tbody>
                {reports.map((r, i) => (
                  <tr key={i}>
                    <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <FileText size={14} color="var(--accent-blue)" /> {r.name}
                      </div>
                    </td>
                    <td>{r.date}</td>
                    <td><span className={`badge ${r.type === 'Automático' ? 'green' : 'blue'}`}>{r.type}</span></td>
                    <td>
                      <button style={{
                        background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)',
                        color: 'var(--accent-blue)', borderRadius: 6, padding: '4px 10px',
                        cursor: 'pointer', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4
                      }}>
                        <Download size={12} /> {r.size}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Vehicle Composition */}
        <div className="card animate-in delay-4">
          <div className="card-header">
            <div>
              <div className="card-title">Composición Vehicular</div>
              <div className="card-subtitle">Distribución por tipo de vehículo</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
                {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            {pieData.map((d, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-secondary)' }}>
                <span style={{ width: 10, height: 10, borderRadius: 3, background: d.color }}></span>
                {d.name} ({d.value}%)
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
