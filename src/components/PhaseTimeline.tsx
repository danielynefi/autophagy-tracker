import { PHASES, Phase } from '../data/phases'

interface PhaseTimelineProps {
  currentPhase: Phase
  fastingHours: number
}

export function PhaseTimeline({ currentPhase, fastingHours }: PhaseTimelineProps) {
  return (
    <div
      style={{
        borderRadius: '16px',
        border: `1px solid ${currentPhase.color}35`,
        background: `${currentPhase.color}0d`,
        padding: '14px 16px 12px',
        transition: 'background 0.8s ease, border-color 0.8s ease',
      }}
    >
      <div
        style={{
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        } as React.CSSProperties}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', minWidth: 'max-content', paddingBottom: '2px' }}>
          {PHASES.map((phase) => {
            const isCurrent = phase.id === currentPhase.id
            const isPast = fastingHours >= phase.maxHours
            const isFuture = !isCurrent && !isPast
            const opacity = isFuture ? 0.45 : 1

            return (
              <div key={phase.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', minWidth: '58px' }}>
                {/* Dot */}
                <div
                  style={{
                    width: isCurrent ? '13px' : '10px',
                    height: isCurrent ? '13px' : '10px',
                    borderRadius: '50%',
                    background: phase.color,
                    opacity,
                    boxShadow: isCurrent ? `0 0 12px ${phase.glowColor}` : 'none',
                    transition: 'all 0.4s ease',
                  }}
                />
                {/* Phase name */}
                <span style={{
                  fontSize: '11px',
                  textAlign: 'center',
                  lineHeight: 1.3,
                  color: phase.color,
                  opacity,
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: isCurrent ? 700 : 500,
                  transition: 'opacity 0.4s ease',
                }}>
                  {phase.nameShort}
                </span>
                {/* Hour */}
                <span style={{
                  fontSize: '10px',
                  color: 'rgba(255,255,255,0.4)',
                  fontFamily: 'Space Grotesk, sans-serif',
                }}>
                  {phase.minHours}h
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
