import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PostFastModalProps {
  isOpen: boolean
  onClose: () => void
  onAnswer: (delta: number) => void
  phase: { color: string }
}

const OPTIONS = [
  {
    emoji: '🥗',
    label: 'Saludable',
    desc: 'Comida limpia y balanceada',
    delta: -0.3,
    msg: '¡Excelente elección! Tu meta se acerca 2 días.',
    msgColor: '#10B981',
  },
  {
    emoji: '🍽️',
    label: 'Normal',
    desc: 'Comida regular, sin excesos',
    delta: 0,
    msg: 'Bien. Tu ruta sigue igual.',
    msgColor: '#A855F7',
  },
  {
    emoji: '🍔',
    label: 'Chatarra',
    desc: 'Procesada o en exceso',
    delta: 0.5,
    msg: 'Tu meta se extendió 3 días. ¡Mañana lo recuperas!',
    msgColor: '#FF6B35',
  },
]

export function PostFastModal({ isOpen, onClose, onAnswer, phase }: PostFastModalProps) {
  const [result, setResult] = useState<typeof OPTIONS[0] | null>(null)

  const handleSelect = (opt: typeof OPTIONS[0]) => {
    setResult(opt)
    onAnswer(opt.delta)
    setTimeout(() => {
      setResult(null)
      onClose()
    }, 2200)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(0,0,0,0.7)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 mx-auto"
            style={{ maxWidth: '384px', left: '50%', transform: 'translateX(-50%)' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
          >
            <div style={{
              background: '#0d1117',
              borderRadius: '24px 24px 0 0',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '24px 24px 40px',
            }}>
              <div style={{ width: '40px', height: '4px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px', margin: '0 auto 20px' }} />

              <AnimatePresence mode="wait">
                {!result ? (
                  <motion.div key="question" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', fontFamily: 'Space Grotesk', marginBottom: '8px' }}>
                      AYUNO COMPLETADO
                    </p>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'white', fontFamily: 'Space Grotesk', marginBottom: '20px' }}>
                      ¿Cómo vas a comer ahora?
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {OPTIONS.map((opt) => (
                        <button
                          key={opt.label}
                          onClick={() => handleSelect(opt)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '14px',
                            padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)',
                            background: 'rgba(255,255,255,0.04)', cursor: 'pointer', textAlign: 'left',
                            transition: 'all 0.15s ease',
                          }}
                          onMouseEnter={e => (e.currentTarget.style.background = `${phase.color}15`)}
                          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                        >
                          <span style={{ fontSize: '28px' }}>{opt.emoji}</span>
                          <div>
                            <p style={{ fontSize: '15px', fontWeight: 600, color: 'white', fontFamily: 'Space Grotesk' }}>{opt.label}</p>
                            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontFamily: 'Space Grotesk' }}>{opt.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ textAlign: 'center', padding: '20px 0' }}
                  >
                    <p style={{ fontSize: '48px', marginBottom: '12px' }}>{result.emoji}</p>
                    <p style={{ fontSize: '16px', fontWeight: 600, color: result.msgColor, fontFamily: 'Space Grotesk' }}>
                      {result.msg}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
