import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phase } from '../data/phases'
import { CellView } from './CellView'
import { getCurrentMilestone, getNextMilestone } from '../data/milestones'
import { getRandomFact, PhaseFact } from '../data/phaseFacts'

interface BodyZoomOverlayProps {
  isOpen: boolean
  phase: Phase
  fastingHours: number
  onClose: () => void
}

export function BodyZoomOverlay({ isOpen, phase, fastingHours, onClose }: BodyZoomOverlayProps) {
  const currentMilestone = getCurrentMilestone(fastingHours)
  const nextMilestone = getNextMilestone(fastingHours)
  const hoursToNext = nextMilestone ? (nextMilestone.hour - fastingHours) : 0
  const [fact, setFact] = useState<PhaseFact | null>(null)

  const handleNewFact = () => setFact(getRandomFact(phase.id))

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-start overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ background: 'rgba(0,0,0,0.93)', backdropFilter: 'blur(14px)' }}
        >
          <motion.div
            className="w-full max-w-sm mx-auto flex flex-col items-center pt-8 pb-10 px-5"
            initial={{ scale: 0.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.15, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between w-full mb-5">
              <div>
                <span className="text-xs uppercase tracking-widest opacity-50" style={{ color: phase.color }}>
                  Vista celular
                </span>
                <h2 className="text-lg font-bold" style={{ color: phase.color, fontFamily: 'Space Grotesk' }}>
                  {phase.emoji} {phase.name}
                </h2>
                <p className="text-xs opacity-50 text-white">{fastingHours.toFixed(1)}h · {phase.keyProcess}</p>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-colors"
                style={{ border: `1px solid ${phase.color}40` }}
              >✕</button>
            </div>

            {/* Cell animation */}
            <motion.div
              className="w-64 h-64 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.12, type: 'spring', stiffness: 200, damping: 20 }}
            >
              <CellView phase={phase} />
            </motion.div>

            {/* Current milestone info */}
            {currentMilestone && (
              <motion.div
                className="w-full mt-5 rounded-2xl p-4"
                style={{ background: `${phase.color}12`, border: `1px solid ${phase.color}30` }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{currentMilestone.emoji}</span>
                  <p className="text-sm font-semibold" style={{ color: phase.color }}>{currentMilestone.title}</p>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">{currentMilestone.message}</p>
                <p className="text-xs mt-2 font-mono" style={{ color: phase.color }}>🧬 {currentMilestone.molecule}</p>
              </motion.div>
            )}

            {/* Dato del momento */}
            <motion.div className="w-full mt-3" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
              {fact ? (
                <div className="rounded-2xl p-4" style={{ background: `${phase.color}10`, border: `1px solid ${phase.color}30` }}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: phase.color }}>🔬 {fact.molecule}</p>
                    <button onClick={handleNewFact} className="text-xs px-2 py-0.5 rounded-full" style={{ color: phase.color, border: `1px solid ${phase.color}40` }}>
                      Otro dato
                    </button>
                  </div>
                  <p className="text-xs text-white/75 leading-relaxed">{fact.text}</p>
                </div>
              ) : (
                <button
                  onClick={handleNewFact}
                  className="w-full py-3 rounded-2xl text-sm font-semibold tracking-wide transition-all active:scale-95"
                  style={{ background: `${phase.color}20`, color: phase.color, border: `1px solid ${phase.color}40` }}
                >
                  🔬 Dato del momento
                </button>
              )}
            </motion.div>

            {/* Next milestone countdown */}
            {nextMilestone && (
              <motion.div
                className="w-full mt-3 rounded-xl px-4 py-3 flex items-center justify-between"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                <div>
                  <p className="text-xs text-white/30 uppercase tracking-widest">Próximo hito</p>
                  <p className="text-sm text-white/80 font-medium">{nextMilestone.emoji} {nextMilestone.title}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold" style={{ color: nextMilestone.color, fontFamily: 'Space Grotesk' }}>
                    {hoursToNext.toFixed(1)}h
                  </p>
                  <p className="text-xs text-white/30">restantes</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
