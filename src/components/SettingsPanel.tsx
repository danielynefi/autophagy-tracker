import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phase } from '../data/phases'

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
  gender: 'male' | 'female'
  onGenderChange: (gender: 'male' | 'female') => void
  phase: Phase
  userName: string
  onUserNameChange: (name: string) => void
}

export function SettingsPanel({ isOpen, onClose, gender, onGenderChange, phase, userName, onUserNameChange }: SettingsPanelProps) {
  const [inputValue, setInputValue] = useState(userName)

  const handleNameBlur = () => {
    const trimmed = inputValue.trim()
    onUserNameChange(trimmed)
  }
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(0,0,0,0.6)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
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
              padding: '20px 24px 36px',
            }}>
              {/* Handle */}
              <div style={{ width: '40px', height: '4px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px', margin: '0 auto 20px' }} />

              <h2 style={{ color: 'white', fontSize: '18px', fontWeight: 700, fontFamily: 'Space Grotesk', marginBottom: '24px' }}>
                Ajustes
              </h2>

              {/* Name input */}
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', letterSpacing: '0.08em', fontFamily: 'Space Grotesk', marginBottom: '10px' }}>
                TU NOMBRE
              </p>
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onBlur={handleNameBlur}
                onKeyDown={e => e.key === 'Enter' && handleNameBlur()}
                placeholder="¿Cómo te llamas?"
                maxLength={24}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '14px',
                  border: `1px solid ${inputValue.trim() ? phase.color + '50' : 'rgba(255,255,255,0.08)'}`,
                  background: 'rgba(255,255,255,0.05)',
                  color: 'white',
                  fontFamily: 'Space Grotesk',
                  fontSize: '15px',
                  outline: 'none',
                  marginBottom: '24px',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s ease',
                }}
              />

              {/* Gender selector */}
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', letterSpacing: '0.08em', fontFamily: 'Space Grotesk', marginBottom: '12px' }}>
                AVATAR
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                {(['male', 'female'] as const).map((g) => {
                  const isSelected = gender === g
                  return (
                    <button
                      key={g}
                      onClick={() => onGenderChange(g)}
                      style={{
                        flex: 1,
                        padding: '16px 12px',
                        borderRadius: '16px',
                        border: `2px solid ${isSelected ? phase.color : 'rgba(255,255,255,0.08)'}`,
                        background: isSelected ? `${phase.color}15` : 'rgba(255,255,255,0.04)',
                        color: isSelected ? phase.color : 'rgba(255,255,255,0.4)',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <span style={{ fontSize: '28px' }}>{g === 'male' ? '♂' : '♀'}</span>
                      <span style={{ fontSize: '13px', fontFamily: 'Space Grotesk', fontWeight: 600 }}>
                        {g === 'male' ? 'Masculino' : 'Femenino'}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
