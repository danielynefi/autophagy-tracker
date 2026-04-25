import { motion } from 'framer-motion'
import { formatDuration } from '../data/phases'
import { Phase } from '../data/phases'

interface FastingTimerProps {
  isRunning: boolean
  elapsedSeconds: number
  phase: Phase
  phaseProgress: number
  onStart: () => void
  onStop: () => void
}

export function FastingTimer({ isRunning, elapsedSeconds, phase, phaseProgress, onStart, onStop }: FastingTimerProps) {
  const circumference = 2 * Math.PI * 52

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
            stroke={phase.color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference * (1 - phaseProgress) }}
            transition={{ duration: 0.5 }}
          />
        </svg>
        <div className="text-center z-10">
          <div
            className="font-mono text-xl font-semibold tracking-tight"
            style={{ color: phase.color, fontFamily: 'Space Grotesk' }}
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
