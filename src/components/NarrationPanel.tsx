import { motion } from 'framer-motion'

interface NarrationPanelProps {
  text: string
  isStreaming: boolean
  phaseColor: string
  onRequestNarration: () => void
}

export function NarrationPanel({ text, isStreaming, phaseColor, onRequestNarration }: NarrationPanelProps) {
  return (
    <div
      className="rounded-2xl p-4 w-full"
      style={{ background: `${phaseColor}10`, border: `1px solid ${phaseColor}30` }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-widest opacity-50" style={{ color: phaseColor }}>
            Claude · Narración
          </span>
          {isStreaming && (
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: phaseColor }}
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          )}
        </div>
        {!isStreaming && (
          <button
            onClick={onRequestNarration}
            className="text-xs px-3 py-1 rounded-full transition-opacity hover:opacity-80"
            style={{
              color: phaseColor,
              border: `1px solid ${phaseColor}50`,
              background: `${phaseColor}15`,
            }}
          >
            {text ? 'Actualizar' : 'Narrar'}
          </button>
        )}
      </div>

      {text ? (
        <p className="text-sm leading-relaxed text-white/80">
          {text}
          {isStreaming && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              style={{ color: phaseColor }}
            >
              ▌
            </motion.span>
          )}
        </p>
      ) : (
        <p className="text-sm text-white/30 italic">
          {isStreaming ? 'Analizando tus células...' : 'Toca "Narrar" para descubrir qué está pasando en tus células ahora mismo.'}
        </p>
      )}
    </div>
  )
}
