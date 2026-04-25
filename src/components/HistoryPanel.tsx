import { motion, AnimatePresence } from 'framer-motion'
import { FastRecord } from '../hooks/useHistory'
import { AchievementStats } from '../data/achievements'
import { AchievementGrid } from './AchievementGrid'

interface HistoryPanelProps {
  isOpen: boolean
  onClose: () => void
  history: FastRecord[]
  stats: AchievementStats
  unlockedIds: string[]
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
}

function formatHours(h: number) {
  if (h < 1) return `${Math.round(h * 60)}min`
  return `${h.toFixed(1)}h`
}

export function HistoryPanel({ isOpen, onClose, history, stats, unlockedIds }: HistoryPanelProps) {
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
          <div className="flex items-center justify-between px-5 pt-10 pb-4">
            <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>
              Mi Historial
            </h2>
            <button onClick={onClose} className="text-white/40 hover:text-white/80 text-xl">✕</button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 pb-10 space-y-6">
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Ayunos', value: stats.totalFasts },
                { label: 'Récord', value: formatHours(stats.longestFastHours) },
                { label: 'Racha', value: `${stats.currentStreakDays}d` },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <p className="text-xl font-bold text-white">{s.value}</p>
                  <p className="text-xs text-white/40 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Achievements - Duolingo style */}
            <AchievementGrid unlockedIds={unlockedIds} />

            {/* History list */}
            <div>
              <p className="text-xs uppercase tracking-widest text-white/30 mb-3">Ayunos completados</p>
              {history.length === 0 && (
                <p className="text-sm text-white/30 italic">Aún no has completado ningún ayuno</p>
              )}
              <div className="space-y-2">
                {history.map((record) => (
                  <div
                    key={record.id}
                    className="flex items-center justify-between p-3 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div>
                      <p className="text-sm text-white">{formatDate(record.endTime)}</p>
                      <p className="text-xs text-white/40">{record.phaseReached}</p>
                    </div>
                    <p className="text-base font-bold text-white">{formatHours(record.durationHours)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
