import { motion } from 'framer-motion'
import { formatDuration } from '../data/phases'
import { Phase } from '../data/phases'

interface FastingTimerProps {
  isRunning: boolean
  elapsedSeconds: number
  phase: Phase
  phaseProgress: number
  goalHours: number
  goalProgress: number
  remainingSeconds: number
  onStart: () => void
  onStop: () => void
  onGoalChange: (hours: number) => void
}

const GOAL_OPTIONS = [12, 16, 18, 24]

export function FastingTimer({
  isRunning, elapsedSeconds, phase, phaseProgress,
  goalHours, goalProgress, remainingSeconds,
  onStart, onStop, onGoalChange,
}: FastingTimerProps) {
  const circumference = 2 * Math.PI * 52
  const ringProgress = isRunning ? goalProgress : phaseProgress
  const goalReached = isRunning && remainingSeconds === 0

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Circular progress ring + timer */}
      <div className="relative flex items-center justify-center w-36 h-36">
        <svg className="absolute inset-0 -rotate-90" width="144" height="144" viewBox="0 0 144 144">
          {/* Track */}
          <circle cx="72" cy="72" r="52" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
          {/* Progress */}
          <motion.circle
            cx="72" cy="72" r={52}
            fill="none"
            stroke={goalReached ? '#10B981' : phase.color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference * (1 - ringProgress) }}
            transition={{ duration: 0.5 }}
          />
        </svg>
        <div className="text-center z-10">
          <div
            className="font-mono text-xl font-semibold tracking-tight"
            style={{ color: goalReached ? '#10B981' : phase.color, fontFamily: 'Space Grotesk' }}
          >
            {formatDuration(elapsedSeconds)}
          </div>
          <div className="text-xs opacity-50 text-white mt-0.5">ayuno</div>
        </div>
      </div>

      {/* Phase badge */}
      <div
        className="px-3 py-1 rounded-full text-xs font-medium tracking-wide"
        style={{ background: `${phase.color}20`, color: phase.color, border: `1px solid ${phase.color}40` }}
      >
        {phase.emoji} {phase.nameShort}
      </div>

      {/* Goal countdown (running) */}
      {isRunning && !goalReached && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center' }}
        >
          <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontFamily: 'Space Grotesk', letterSpacing: '0.08em', marginBottom: '3px' }}>
            FALTAN PARA TU META · {goalHours}H
          </p>
          <p style={{ fontSize: '20px', fontFamily: 'Space Grotesk', fontWeight: 700, color: phase.color, lineHeight: 1 }}>
            {formatDuration(remainingSeconds)}
          </p>
        </motion.div>
      )}

      {/* Goal reached */}
      {goalReached && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            textAlign: 'center',
            padding: '8px 16px',
            borderRadius: '12px',
            background: 'rgba(16,185,129,0.12)',
            border: '1px solid rgba(16,185,129,0.3)',
          }}
        >
          <p style={{ fontSize: '13px', color: '#10B981', fontFamily: 'Space Grotesk', fontWeight: 700 }}>
            ✓ ¡Meta de {goalHours}h alcanzada!
          </p>
        </motion.div>
      )}

      {/* Goal selector (not running) */}
      {!isRunning && (
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontFamily: 'Space Grotesk', letterSpacing: '0.08em', marginBottom: '10px' }}>
            META DE AYUNO
          </p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            {GOAL_OPTIONS.map(h => {
              const isSelected = goalHours === h
              return (
                <button
                  key={h}
                  onClick={() => onGoalChange(h)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    border: `1px solid ${isSelected ? phase.color : 'rgba(255,255,255,0.12)'}`,
                    background: isSelected ? `${phase.color}20` : 'transparent',
                    color: isSelected ? phase.color : 'rgba(255,255,255,0.35)',
                    fontSize: '13px',
                    fontFamily: 'Space Grotesk',
                    fontWeight: isSelected ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {h}h
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Start / Stop */}
      <motion.button
        onClick={isRunning ? onStop : onStart}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all"
        style={
          isRunning
            ? { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.12)' }
            : { background: phase.color, color: '#000', boxShadow: `0 0 24px ${phase.glowColor}` }
        }
      >
        {isRunning ? 'Terminar ayuno' : 'Iniciar ayuno'}
      </motion.button>
    </div>
  )
}
