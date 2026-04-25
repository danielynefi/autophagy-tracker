import React from 'react'
import { motion } from 'framer-motion'
import { Phase } from '../data/phases'

interface CellViewProps {
  phase: Phase
}

function DigestingCell({ color }: { color: string }) {
  return (
    <>
      {/* Glucose molecules */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.circle
          key={i}
          cx={160 + i * 25}
          cy={200}
          r="6"
          fill={color}
          opacity={0.9}
          animate={{ cx: [160 + i * 25, 200, 160 + i * 25], opacity: [0.9, 0.3, 0.9] }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}
      {/* mTOR active label */}
      <text x="200" y="300" textAnchor="middle" fill={color} fontSize="11" opacity={0.7}>mTOR activo</text>
      <text x="200" y="315" textAnchor="middle" fill={color} fontSize="11" opacity={0.7}>Insulina alta</text>
    </>
  )
}

function GlycogenCell({ color }: { color: string }) {
  return (
    <>
      {/* Glycogen granules breaking apart */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2
        const x = 200 + Math.cos(angle) * 40
        const y = 200 + Math.sin(angle) * 40
        return (
          <motion.circle
            key={i}
            cx={x} cy={y} r="8"
            fill={color} opacity={0.8}
            animate={{ r: [8, 4, 8], opacity: [0.8, 0.3, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.25 }}
          />
        )
      })}
      <text x="200" y="310" textAnchor="middle" fill={color} fontSize="11" opacity={0.7}>Glucogenólisis</text>
      <text x="200" y="325" textAnchor="middle" fill={color} fontSize="11" opacity={0.7}>AMPK↑</text>
    </>
  )
}

function KetosisCell({ color }: { color: string }) {
  return (
    <>
      {/* Fat droplets → ketone bodies */}
      {[0, 1, 2].map((i) => (
        <motion.ellipse
          key={i}
          cx={150 + i * 40} cy={190} rx="16" ry="12"
          fill={color} opacity={0.6}
          animate={{ ry: [12, 6, 12], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
        />
      ))}
      {/* Arrow suggesting conversion */}
      <motion.path
        d="M 155 220 Q 200 240 245 220"
        stroke={color} strokeWidth="2" fill="none" strokeDasharray="4 3"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      />
      <text x="200" y="270" textAnchor="middle" fill={color} fontSize="11" opacity={0.7}>CPT1 activo</text>
      <text x="200" y="285" textAnchor="middle" fill={color} fontSize="11" opacity={0.7}>BHB → neuronas</text>
    </>
  )
}

function AutophagyCell({ color }: { color: string }) {
  return (
    <>
      {/* Autophagosome forming */}
      <motion.path
        d="M 200 160 Q 240 160 250 200 Q 240 240 200 240 Q 160 240 150 200 Q 160 160 200 160"
        stroke={color} strokeWidth="2.5" fill="none"
        animate={{ pathLength: [0, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Cargo inside */}
      {[0, 1, 2].map((i) => (
        <motion.rect
          key={i}
          x={185 + i * 5} y={185 + i * 5} width="8" height="6" rx="2"
          fill={color} opacity={0.7}
          animate={{ opacity: [0.7, 0.1, 0.7], scale: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
          style={{ transformOrigin: `${189 + i * 5}px ${188 + i * 5}px` }}
        />
      ))}
      <text x="200" y="290" textAnchor="middle" fill={color} fontSize="11" opacity={0.7}>LC3-II activo</text>
      <text x="200" y="305" textAnchor="middle" fill={color} fontSize="11" opacity={0.7}>Beclin-1 libre</text>
    </>
  )
}

function DeepAutophagyCell({ color }: { color: string }) {
  return (
    <>
      {/* Mitochondria being engulfed */}
      <motion.ellipse
        cx="200" cy="185" rx="32" ry="18"
        stroke={color} strokeWidth="2" fill="none"
        animate={{ rx: [32, 20, 32], opacity: [1, 0.3, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      {/* Inner membrane */}
      <motion.ellipse
        cx="200" cy="185" rx="20" ry="10"
        stroke={color} strokeWidth="1.5" fill="none"
        animate={{ rx: [20, 12, 20], opacity: [0.8, 0.2, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
      />
      {/* PINK1 dots */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2
        return (
          <motion.circle
            key={i}
            cx={200 + Math.cos(angle) * 32}
            cy={185 + Math.sin(angle) * 18}
            r="4" fill={color}
            animate={{ r: [4, 2, 4], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
          />
        )
      })}
      <text x="200" y="290" textAnchor="middle" fill={color} fontSize="11" opacity={0.7}>PINK1-Parkin</text>
      <text x="200" y="305" textAnchor="middle" fill={color} fontSize="11" opacity={0.7}>Mitofagia activa</text>
    </>
  )
}

function RegenerationCell({ color }: { color: string }) {
  return (
    <>
      {/* Stem cell dividing */}
      <motion.circle
        cx="200" cy="190" r="30"
        stroke={color} strokeWidth="2" fill="none"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        style={{ transformOrigin: '200px 190px' }}
      />
      <motion.circle
        cx="200" cy="190" r="15"
        fill={color} opacity={0.4}
        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        style={{ transformOrigin: '200px 190px' }}
      />
      {/* New cells emerging */}
      {[0, 1, 2].map((i) => {
        const angle = (i / 3) * Math.PI * 2
        return (
          <motion.circle
            key={i}
            cx={200 + Math.cos(angle) * 55}
            cy={190 + Math.sin(angle) * 40}
            r="10" fill={color}
            animate={{ r: [0, 10, 0], opacity: [0, 0.8, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 1 }}
          />
        )
      })}
      <text x="200" y="300" textAnchor="middle" fill={color} fontSize="11" opacity={0.7}>FOXO3a activo</text>
      <text x="200" y="315" textAnchor="middle" fill={color} fontSize="11" opacity={0.7}>Células madre ↑</text>
    </>
  )
}

const CELL_RENDERERS: Record<string, React.FC<{ color: string }>> = {
  digestion: DigestingCell,
  glycogen: GlycogenCell,
  ketosis: KetosisCell,
  autophagy: AutophagyCell,
  'deep-autophagy': DeepAutophagyCell,
  regeneration: RegenerationCell,
}

export function CellView({ phase }: CellViewProps) {
  const Renderer = CELL_RENDERERS[phase.id] ?? DigestingCell

  return (
    <svg viewBox="0 0 400 380" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      {/* Cell membrane */}
      <motion.ellipse
        cx="200" cy="200" rx="170" ry="150"
        stroke={phase.color} strokeWidth="2.5" fill={`${phase.color}08`}
        strokeDasharray="8 4"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '200px 200px' }}
      />

      {/* Nucleus */}
      <ellipse cx="200" cy="200" rx="45" ry="38" stroke={phase.color} strokeWidth="1.5" fill={`${phase.color}12`} strokeDasharray="4 3" />
      <motion.circle
        cx="200" cy="200" r="10"
        fill={phase.color} opacity={0.5}
        animate={{ r: [8, 13, 8], opacity: [0.5, 0.2, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Phase-specific animation */}
      <Renderer color={phase.color} />

      {/* Phase label */}
      <text x="200" y="360" textAnchor="middle" fill={phase.color} fontSize="12" fontFamily="Space Grotesk, sans-serif" opacity={0.6}>
        {phase.name}
      </text>
    </svg>
  )
}
