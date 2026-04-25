import { motion, AnimatePresence } from 'framer-motion'
import { Milestone } from '../data/milestones'

interface MilestoneCardProps {
  milestone: Milestone | null
  onDismiss: () => void
}

export function MilestoneCard({ milestone, onDismiss }: MilestoneCardProps) {
  return (
    <AnimatePresence>
      {milestone && (
        <motion.div
          className="fixed bottom-28 left-4 right-4 z-50 max-w-sm mx-auto"
          initial={{ y: 80, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <div
            className="rounded-2xl p-4 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${milestone.color}18, ${milestone.color}08)`,
              border: `1px solid ${milestone.color}50`,
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Glow top */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${milestone.color}, transparent)` }}
            />

            <div className="flex items-start gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: `${milestone.color}20` }}
              >
                {milestone.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: milestone.color }}>
                    {milestone.title}
                  </p>
                  <button
                    onClick={onDismiss}
                    className="text-white/30 hover:text-white/60 transition-colors ml-2"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">{milestone.message}</p>
                <p className="text-xs mt-1.5 font-mono" style={{ color: milestone.color }}>
                  🧬 {milestone.molecule}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
