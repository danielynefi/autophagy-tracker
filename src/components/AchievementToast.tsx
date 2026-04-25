import { motion, AnimatePresence } from 'framer-motion'
import { Achievement } from '../data/achievements'

interface AchievementToastProps {
  achievement: Achievement | null
  onDismiss: () => void
}

export function AchievementToast({ achievement, onDismiss }: AchievementToastProps) {
  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          className="fixed top-6 left-4 right-4 z-50 max-w-sm mx-auto"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          onClick={onDismiss}
        >
          <div
            className="rounded-2xl px-4 py-3 flex items-center gap-3"
            style={{
              background: `linear-gradient(135deg, ${achievement.color}25, ${achievement.color}10)`,
              border: `1px solid ${achievement.color}60`,
              backdropFilter: 'blur(20px)',
            }}
          >
            <span className="text-3xl">{achievement.emoji}</span>
            <div>
              <p className="text-xs uppercase tracking-widest font-bold" style={{ color: achievement.color }}>
                ¡Logro desbloqueado!
              </p>
              <p className="text-sm text-white font-semibold">{achievement.title}</p>
              <p className="text-xs text-white/50">{achievement.description}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
