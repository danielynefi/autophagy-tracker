import { PHASES, Phase } from '../data/phases'

interface PhaseTimelineProps {
  currentPhase: Phase
  fastingHours: number
}

export function PhaseTimeline({ currentPhase, fastingHours }: PhaseTimelineProps) {
  return (
    <div
      className="w-full px-2"
      style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
    >
      <div className="flex items-end gap-5" style={{ minWidth: 'max-content', paddingBottom: '2px' }}>
        {PHASES.map((phase) => {
          const isCurrent = phase.id === currentPhase.id
          const isPast = fastingHours >= phase.maxHours
          const opacity = isPast ? 0.75 : isCurrent ? 1 : 0.55

          return (
            <div key={phase.id} className="flex flex-col items-center gap-1" style={{ minWidth: '56px' }}>
              {/* Dot */}
              <div
                className="w-2.5 h-2.5 rounded-full transition-all duration-500"
                style={{
                  background: isCurrent || isPast ? phase.color : 'rgba(255,255,255,0.2)',
                  boxShadow: isCurrent ? `0 0 10px ${phase.glowColor}` : 'none',
                  transform: isCurrent ? 'scale(1.5)' : 'scale(1)',
                }}
              />
              {/* Label */}
              <span
                className="text-[11px] text-center leading-tight"
                style={{ color: isCurrent || isPast ? phase.color : 'rgba(255,255,255,0.55)', opacity }}
              >
                {phase.nameShort}
              </span>
              {/* Hour label */}
              <span className="text-[10px] text-white" style={{ opacity: 0.45 }}>{phase.minHours}h</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
