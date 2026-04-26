import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FastRecord } from '../hooks/useHistory'
import { AchievementStats } from '../data/achievements'
import { AchievementGrid } from './AchievementGrid'
import { useProfile, calcStats } from '../hooks/useProfile'

interface HistoryPanelProps {
  isOpen: boolean
  onClose: () => void
  history: FastRecord[]
  stats: AchievementStats
  unlockedIds: string[]
  gender: 'male' | 'female'
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
}

function formatHours(h: number) {
  if (h < 1) return `${Math.round(h * 60)}min`
  return `${h.toFixed(1)}h`
}

function Input({ label, value, onChange, unit, min, max }: {
  label: string, value: string, onChange: (v: string) => void,
  unit: string, min: number, max: number
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', fontFamily: 'Space Grotesk' }}>
        {label}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '12px', padding: '10px 14px' }}>
        <input
          type="number" min={min} max={max}
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            color: 'white', fontSize: '16px', fontFamily: 'Space Grotesk', fontWeight: 600,
          }}
        />
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', fontFamily: 'Space Grotesk' }}>{unit}</span>
      </div>
    </div>
  )
}

function StatBox({ label, value, sub }: { label: string, value: string, sub?: string }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '16px', padding: '14px', textAlign: 'center' }}>
      <p style={{ fontSize: '20px', fontWeight: 700, color: 'white', fontFamily: 'Space Grotesk' }}>{value}</p>
      {sub && <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontFamily: 'Space Grotesk' }}>{sub}</p>}
      <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '2px', fontFamily: 'Space Grotesk' }}>{label}</p>
    </div>
  )
}

export function HistoryPanel({ isOpen, onClose, history, stats, unlockedIds, gender }: HistoryPanelProps) {
  const [tab, setTab] = useState<'perfil' | 'historial'>('perfil')
  const { profile, saveProfile } = useProfile()

  const [weight, setWeight] = useState(profile?.weight.toString() ?? '')
  const [height, setHeight] = useState(profile?.height.toString() ?? '')
  const [age, setAge] = useState(profile?.age.toString() ?? '')
  const [goalWeight, setGoalWeight] = useState(profile?.goalWeight.toString() ?? '')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    const w = parseFloat(weight), h = parseFloat(height), a = parseFloat(age), g = parseFloat(goalWeight)
    if (!w || !h || !a || !g) return
    saveProfile({ weight: w, height: h, age: a, goalWeight: g })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const computed = profile ? calcStats(profile, gender) : null

  const tabStyle = (active: boolean) => ({
    flex: 1, padding: '10px', borderRadius: '12px', border: 'none', cursor: 'pointer',
    fontFamily: 'Space Grotesk', fontSize: '13px', fontWeight: 600,
    background: active ? 'rgba(255,255,255,0.1)' : 'transparent',
    color: active ? 'white' : 'rgba(255,255,255,0.35)',
    transition: 'all 0.2s ease',
  })

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col"
          style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(16px)' }}
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '40px 20px 16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'white', fontFamily: 'Space Grotesk' }}>Mi Perfil</h2>
            <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '20px', cursor: 'pointer' }}>✕</button>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '4px', margin: '0 20px 16px', background: 'rgba(255,255,255,0.04)', borderRadius: '14px', padding: '4px' }}>
            <button style={tabStyle(tab === 'perfil')} onClick={() => setTab('perfil')}>Perfil</button>
            <button style={tabStyle(tab === 'historial')} onClick={() => setTab('historial')}>Historial</button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 40px' }}>

            {/* PERFIL TAB */}
            {tab === 'perfil' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                {/* Route summary */}
                {computed && profile && (
                  <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '20px', padding: '18px', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', fontFamily: 'Space Grotesk', marginBottom: '8px' }}>TU RUTA</p>
                    <p style={{ fontSize: '22px', fontWeight: 700, color: 'white', fontFamily: 'Space Grotesk' }}>
                      Semana {computed.currentWeek} de {computed.weeksTotal}
                    </p>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontFamily: 'Space Grotesk', marginTop: '4px' }}>
                      {computed.kgToLose.toFixed(1)} kg hacia tu meta · ~{computed.weeksTotal} semanas
                    </p>
                    <div style={{ marginTop: '12px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', height: '6px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', borderRadius: '99px', background: 'linear-gradient(to right, #00D4FF, #10B981)',
                        width: `${Math.min((computed.currentWeek / computed.weeksTotal) * 100, 100)}%`,
                        transition: 'width 0.6s ease',
                      }} />
                    </div>
                  </div>
                )}

                {/* Stats grid */}
                {computed && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <StatBox label="IMC" value={computed.imc.toFixed(1)} sub={computed.imc < 18.5 ? 'Bajo peso' : computed.imc < 25 ? 'Normal' : computed.imc < 30 ? 'Sobrepeso' : 'Obesidad'} />
                    <StatBox label="Grasa corporal" value={`${computed.fatPercent.toFixed(1)}%`} sub={`${computed.fatKg.toFixed(1)} kg`} />
                  </div>
                )}

                {/* Form */}
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', fontFamily: 'Space Grotesk', marginTop: '4px' }}>TUS DATOS</p>
                <Input label="Peso actual" value={weight} onChange={setWeight} unit="kg" min={30} max={300} />
                <Input label="Altura" value={height} onChange={setHeight} unit="cm" min={100} max={250} />
                <Input label="Edad" value={age} onChange={setAge} unit="años" min={10} max={100} />
                <Input label="Peso meta" value={goalWeight} onChange={setGoalWeight} unit="kg" min={30} max={300} />

                <button
                  onClick={handleSave}
                  style={{
                    width: '100%', padding: '16px', borderRadius: '16px', border: 'none', cursor: 'pointer',
                    background: saved ? '#10B981' : 'white', color: saved ? 'white' : '#000',
                    fontFamily: 'Space Grotesk', fontSize: '15px', fontWeight: 700,
                    transition: 'all 0.3s ease',
                  }}
                >
                  {saved ? '¡Guardado!' : 'Guardar perfil'}
                </button>
              </div>
            )}

            {/* HISTORIAL TAB */}
            {tab === 'historial' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                  {[
                    { label: 'Ayunos', value: stats.totalFasts },
                    { label: 'Récord', value: formatHours(stats.longestFastHours) },
                    { label: 'Racha', value: `${stats.currentStreakDays}d` },
                  ].map((s) => (
                    <div key={s.label} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '16px', padding: '12px', textAlign: 'center' }}>
                      <p style={{ fontSize: '20px', fontWeight: 700, color: 'white', fontFamily: 'Space Grotesk' }}>{s.value}</p>
                      <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontFamily: 'Space Grotesk' }}>{s.label}</p>
                    </div>
                  ))}
                </div>

                <AchievementGrid unlockedIds={unlockedIds} />

                <div>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', fontFamily: 'Space Grotesk', marginBottom: '12px' }}>AYUNOS COMPLETADOS</p>
                  {history.length === 0 && (
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>Aún no has completado ningún ayuno</p>
                  )}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {history.map((record) => (
                      <div key={record.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', borderRadius: '14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div>
                          <p style={{ fontSize: '14px', color: 'white', fontFamily: 'Space Grotesk' }}>{formatDate(record.endTime)}</p>
                          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontFamily: 'Space Grotesk' }}>{record.phaseReached}</p>
                        </div>
                        <p style={{ fontSize: '16px', fontWeight: 700, color: 'white', fontFamily: 'Space Grotesk' }}>{formatHours(record.durationHours)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
