import { useRef, useState } from 'react'
import { PHASES, Phase } from '../data/phases'

interface PhaseTimelineProps {
  currentPhase: Phase
  fastingHours: number
}

export function PhaseTimeline({ currentPhase, fastingHours }: PhaseTimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [leftOpacity, setLeftOpacity] = useState(0)
  const [rightOpacity, setRightOpacity] = useState(1)

  const handleScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const maxScroll = el.scrollWidth - el.clientWidth
    setLeftOpacity(Math.min(el.scrollLeft / 35, 1))
    setRightOpacity(maxScroll > 0 ? Math.min((maxScroll - el.scrollLeft) / 35, 1) : 0)
  }

  return (
    <div style={{
      borderRadius: '16px',
      border: `1px solid ${currentPhase.color}35`,
      background: `${currentPhase.color}0d`,
      padding: '14px 0 12px',
      transition: 'background 0.8s ease, border-color 0.8s ease',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Left fade */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '48px',
        background: 'linear-gradient(to right, rgba(5,8,15,0.92), transparent)',
        opacity: leftOpacity,
        pointerEvents: 'none',
        transition: 'opacity 0.12s ease',
        zIndex: 2,
      }} />

      {/* Right fade */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: '48px',
        background: 'linear-gradient(to left, rgba(5,8,15,0.92), transparent)',
        opacity: rightOpacity,
        pointerEvents: 'none',
        transition: 'opacity 0.12s ease',
        zIndex: 2,
      }} />

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          padding: '0 16px 2px',
        } as React.CSSProperties}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', minWidth: 'max-content' }}>
          {PHASES.map((phase) => {
            const isCurrent = phase.id === currentPhase.id
            const isPast = fastingHours >= phase.maxHours
            const isFuture = !isCurrent && !isPast
            const opacity = isFuture ? 0.45 : 1

            return (
              <div key={phase.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', minWidth: '58px' }}>
                <div style={{
                  width: isCurrent ? '13px' : '10px',
                  height: isCurrent ? '13px' : '10px',
                  borderRadius: '50%',
                  background: phase.color,
                  opacity,
                  boxShadow: isCurrent ? `0 0 12px ${phase.glowColor}` : 'none',
                  transition: 'all 0.4s ease',
                }} />
                <span style={{
                  fontSize: '11px',
                  textAlign: 'center',
                  lineHeight: 1.3,
                  color: phase.color,
                  opacity,
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: isCurrent ? 700 : 500,
                }}>
                  {phase.nameShort}
                </span>
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
