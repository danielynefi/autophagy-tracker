import { motion, AnimatePresence } from 'framer-motion'
import { Phase } from '../data/phases'
import { getPhaseInfo } from '../data/phaseInfo'

interface PhaseInfoCardProps {
  phase: Phase
  isRunning: boolean
}

export function PhaseInfoCard({ phase, isRunning }: PhaseInfoCardProps) {
  const info = getPhaseInfo(phase.id)

  return (
    <AnimatePresence mode="wait">
      {isRunning && info && (
        <motion.div
          key={phase.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{
            width: '100%',
            borderRadius: '18px',
            border: `1px solid ${phase.color}25`,
            background: `${phase.color}09`,
            padding: '16px 18px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Top glow line */}
          <div style={{
            position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
            background: `linear-gradient(90deg, transparent, ${phase.color}60, transparent)`,
          }} />

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <p style={{
              fontSize: '10px', letterSpacing: '0.1em', fontFamily: 'Space Grotesk',
              color: phase.color, fontWeight: 700,
            }}>
              QUÉ PASA EN TU CUERPO AHORA
            </p>
            <span style={{
              fontSize: '10px', fontFamily: 'Space Grotesk', fontWeight: 600,
              color: 'rgba(255,255,255,0.25)',
            }}>
              {phase.emoji} {phase.nameShort}
            </span>
          </div>

          {/* Bullets */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '14px' }}>
            {info.bullets.map((bullet, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '5px', height: '5px', borderRadius: '50%',
                  background: phase.color, flexShrink: 0, marginTop: '5px', opacity: 0.8,
                }} />
                <p style={{
                  fontSize: '12px', color: 'rgba(255,255,255,0.65)',
                  fontFamily: 'Space Grotesk', lineHeight: 1.5,
                }}>
                  {bullet}
                </p>
              </div>
            ))}
          </div>

          {/* Highlight pill */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: `${phase.color}18`, border: `1px solid ${phase.color}30`,
            borderRadius: '99px', padding: '5px 12px',
          }}>
            <span style={{ fontSize: '13px', fontWeight: 800, color: phase.color, fontFamily: 'Space Grotesk' }}>
              {info.highlight}
            </span>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontFamily: 'Space Grotesk' }}>
              {info.highlightLabel}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
