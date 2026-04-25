import { motion } from 'framer-motion'
import { ACHIEVEMENTS } from '../data/achievements'

interface AchievementGridProps {
  unlockedIds: string[]
}

export function AchievementGrid({ unlockedIds }: AchievementGridProps) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-white/30 mb-3">Logros</p>
      <div className="grid grid-cols-3 gap-3">
        {ACHIEVEMENTS.map((a, i) => {
          const unlocked = unlockedIds.includes(a.id)
          return (
            <motion.div
              key={a.id}
              className="flex flex-col items-center gap-1.5 p-3 rounded-2xl relative"
              style={{
                background: unlocked ? `${a.color}18` : 'rgba(255,255,255,0.04)',
                border: unlocked ? `1px solid ${a.color}50` : '1px solid rgba(255,255,255,0.06)',
                filter: unlocked ? 'none' : 'grayscale(1)',
                opacity: unlocked ? 1 : 0.45,
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: unlocked ? 1 : 0.45 }}
              transition={{ delay: i * 0.04 }}
            >
              {/* Badge glow ring when unlocked */}
              {unlocked && (
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{ border: `1px solid ${a.color}`, boxShadow: `0 0 12px ${a.color}40` }}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}

              {/* Emoji or lock */}
              <span className="text-2xl relative z-10">
                {unlocked ? a.emoji : '🔒'}
              </span>

              {/* Title */}
              <p
                className="text-center font-semibold leading-tight relative z-10"
                style={{
                  fontSize: '10px',
                  color: unlocked ? a.color : 'rgba(255,255,255,0.3)',
                }}
              >
                {unlocked ? a.title : '???'}
              </p>

              {/* Description on unlock */}
              {unlocked && (
                <p className="text-center leading-tight relative z-10" style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)' }}>
                  {a.description}
                </p>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
