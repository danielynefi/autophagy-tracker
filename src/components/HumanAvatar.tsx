import { motion } from 'framer-motion'
import { Phase } from '../data/phases'

interface HumanAvatarProps {
  phase: Phase
  onClick: () => void
  isAnimating: boolean
}

const ORGAN_REGIONS: Record<string, { cx: number; cy: number; rx: number; ry: number }> = {
  stomach: { cx: 100, cy: 195, rx: 22, ry: 18 },
  intestine: { cx: 100, cy: 225, rx: 28, ry: 22 },
  liver: { cx: 115, cy: 185, rx: 18, ry: 14 },
  pancreas: { cx: 88, cy: 200, rx: 14, ry: 8 },
  muscles: { cx: 100, cy: 280, rx: 35, ry: 20 },
  cells: { cx: 100, cy: 200, rx: 40, ry: 50 },
  lysosomes: { cx: 100, cy: 195, rx: 25, ry: 25 },
  mitochondria: { cx: 100, cy: 210, rx: 30, ry: 20 },
  brain: { cx: 100, cy: 55, rx: 28, ry: 22 },
  adipose: { cx: 100, cy: 240, rx: 38, ry: 28 },
  dna: { cx: 100, cy: 200, rx: 20, ry: 30 },
  'stem-cells': { cx: 100, cy: 215, rx: 35, ry: 25 },
  immune: { cx: 100, cy: 170, rx: 30, ry: 15 },
}

export function HumanAvatar({ phase, onClick, isAnimating }: HumanAvatarProps) {
  const activeOrgans = phase.organs

  return (
    <motion.div
      className="cursor-pointer select-none"
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      animate={isAnimating ? { scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 0.4 }}
    >
      <svg
        viewBox="0 0 200 420"
        width="180"
        height="360"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: `drop-shadow(0 0 18px ${phase.glowColor})` }}
      >
        {/* Body outline */}
        <g stroke={phase.color} strokeWidth="2" fill="none">
          {/* Head */}
          <ellipse cx="100" cy="55" rx="28" ry="30" fill="rgba(255,255,255,0.05)" />
          {/* Neck */}
          <rect x="89" y="83" width="22" height="18" rx="4" fill="rgba(255,255,255,0.05)" />
          {/* Torso */}
          <path
            d="M65 100 Q55 105 52 130 L48 230 Q50 245 65 248 L135 248 Q150 245 152 230 L148 130 Q145 105 135 100 Z"
            fill="rgba(255,255,255,0.04)"
          />
          {/* Left arm */}
          <path d="M65 108 Q42 120 35 165 Q32 185 38 200" strokeLinecap="round" />
          {/* Right arm */}
          <path d="M135 108 Q158 120 165 165 Q168 185 162 200" strokeLinecap="round" />
          {/* Left leg */}
          <path d="M75 248 Q68 295 65 340 Q64 360 68 375" strokeLinecap="round" />
          {/* Right leg */}
          <path d="M125 248 Q132 295 135 340 Q136 360 132 375" strokeLinecap="round" />
        </g>

        {/* Organ highlights */}
        {activeOrgans.map((organ) => {
          const r = ORGAN_REGIONS[organ]
          if (!r) return null
          return (
            <motion.ellipse
              key={organ}
              cx={r.cx}
              cy={r.cy}
              rx={r.rx}
              ry={r.ry}
              fill={phase.color}
              opacity={0}
              animate={{
                opacity: [0, 0.35, 0.15, 0.35],
                scale: [1, 1.08, 1, 1.08],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ transformOrigin: `${r.cx}px ${r.cy}px` }}
            />
          )
        })}

        {/* Central energy pulse */}
        <motion.circle
          cx="100"
          cy="175"
          r="6"
          fill={phase.color}
          animate={{
            r: [4, 10, 4],
            opacity: [0.8, 0.2, 0.8],
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Tap hint ring */}
        <motion.circle
          cx="100"
          cy="175"
          r="45"
          fill="none"
          stroke={phase.color}
          strokeWidth="1"
          strokeDasharray="6 4"
          opacity={0.3}
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '100px 175px' }}
        />
      </svg>
    </motion.div>
  )
}
