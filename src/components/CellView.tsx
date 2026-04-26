import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phase } from '../data/phases'

const DEFINITIONS: Record<string, { title: string; desc: string }> = {
  'mTOR activo': {
    title: 'mTOR',
    desc: 'El "interruptor de crecimiento" de tus células. Cuando está activo (después de comer), le dice al cuerpo que crezca y almacene energía. Bloquea la autofagia.',
  },
  'Insulina alta': {
    title: 'Insulina',
    desc: 'Hormona que sube al comer. Le ordena a las células absorber glucosa de la sangre. Mientras está elevada, el cuerpo no quema sus propias reservas.',
  },
  'Glucogenólisis': {
    title: 'Glucogenólisis',
    desc: 'Tu hígado rompe el glucógeno (azúcar almacenado) y libera glucosa a la sangre. Es la primera reserva de energía que usa el cuerpo al iniciar el ayuno.',
  },
  'AMPK↑': {
    title: 'AMPK',
    desc: 'El "sensor de energía baja" de la célula. Al subir, activa la quema de grasa y enciende la autofagia. Es el opuesto al mTOR: cuando uno sube, el otro baja.',
  },
  'CPT1 activo': {
    title: 'CPT1',
    desc: 'La "puerta de entrada" de las grasas a las mitocondrias. Cuando está activo, tu cuerpo puede quemar grasa como combustible principal en lugar de glucosa.',
  },
  'BHB → neuronas': {
    title: 'BHB (Cetonas)',
    desc: 'El Beta-Hidroxibutirato es el combustible del ayuno. Viaja al cerebro y alimenta las neuronas más eficientemente que la glucosa. Por eso la mente se aclara al ayunar.',
  },
  'LC3-II activo': {
    title: 'LC3-II',
    desc: 'La proteína que "envuelve" los desechos celulares para destruirlos. Su presencia confirma que la autofagia está ocurriendo activamente dentro de tus células.',
  },
  'Beclin-1 libre': {
    title: 'Beclin-1',
    desc: 'El "interruptor de inicio" de la autofagia. Normalmente está bloqueado por otra proteína, pero el ayuno lo libera y activa todo el proceso de limpieza celular.',
  },
  'PINK1-Parkin': {
    title: 'PINK1 y Parkin',
    desc: 'Duo de proteínas que identifican mitocondrias dañadas y las marcan para eliminar. Mutaciones en ellas causan Parkinson; el ayuno las mantiene funcionando correctamente.',
  },
  'Mitofagia activa': {
    title: 'Mitofagia',
    desc: 'Autofagia específica de mitocondrias. El cuerpo elimina las "baterías viejas" para reemplazarlas por nuevas. Resultado: más energía y menos radicales libres.',
  },
  'FOXO3a activo': {
    title: 'FOXO3a',
    desc: 'El "gen de la longevidad". Cuando se activa, produce antioxidantes y repara el ADN dañado. Está relacionado directamente con personas que viven más de 100 años.',
  },
  'Células madre ↑': {
    title: 'Células madre',
    desc: 'Las células "comodín" del cuerpo capaces de convertirse en cualquier tejido. El ayuno prolongado las activa para regenerar órganos dañados. Es el nivel más profundo de renovación.',
  },
}

interface RendererProps {
  color: string
  onTermClick: (term: string) => void
}

function ClickableLabel({ x, y, text, color, onTermClick }: {
  x: number; y: number; text: string; color: string; onTermClick: (t: string) => void
}) {
  return (
    <g onClick={() => onTermClick(text)} style={{ cursor: 'pointer' }}>
      <rect x={x - 90} y={y - 16} width={180} height={24} fill="transparent" />
      <text
        x={x} y={y}
        textAnchor="middle"
        fill={color}
        fontSize="14"
        fontWeight="600"
        fontFamily="Space Grotesk, sans-serif"
        opacity={0.95}
        style={{ textDecoration: 'underline', textDecorationColor: `${color}80` }}
      >
        {text}
      </text>
    </g>
  )
}

function DigestingCell({ color, onTermClick }: RendererProps) {
  return (
    <>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.circle
          key={i}
          cx={160 + i * 25} cy={200} r="6"
          fill={color} opacity={0.9}
          animate={{ cx: [160 + i * 25, 200, 160 + i * 25], opacity: [0.9, 0.3, 0.9] }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}
      <ClickableLabel x={200} y={300} text="mTOR activo" color={color} onTermClick={onTermClick} />
      <ClickableLabel x={200} y={322} text="Insulina alta" color={color} onTermClick={onTermClick} />
    </>
  )
}

function GlycogenCell({ color, onTermClick }: RendererProps) {
  return (
    <>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2
        const x = 200 + Math.cos(angle) * 40
        const y = 200 + Math.sin(angle) * 40
        return (
          <motion.circle
            key={i} cx={x} cy={y} r="8"
            fill={color} opacity={0.8}
            animate={{ r: [8, 4, 8], opacity: [0.8, 0.3, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.25 }}
          />
        )
      })}
      <ClickableLabel x={200} y={308} text="Glucogenólisis" color={color} onTermClick={onTermClick} />
      <ClickableLabel x={200} y={330} text="AMPK↑" color={color} onTermClick={onTermClick} />
    </>
  )
}

function KetosisCell({ color, onTermClick }: RendererProps) {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <motion.ellipse
          key={i}
          cx={150 + i * 40} cy={190} rx="16" ry="12"
          fill={color} opacity={0.6}
          animate={{ ry: [12, 6, 12], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
        />
      ))}
      <motion.path
        d="M 155 220 Q 200 240 245 220"
        stroke={color} strokeWidth="2" fill="none" strokeDasharray="4 3"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      />
      <ClickableLabel x={200} y={275} text="CPT1 activo" color={color} onTermClick={onTermClick} />
      <ClickableLabel x={200} y={297} text="BHB → neuronas" color={color} onTermClick={onTermClick} />
    </>
  )
}

function AutophagyCell({ color, onTermClick }: RendererProps) {
  return (
    <>
      <motion.path
        d="M 200 160 Q 240 160 250 200 Q 240 240 200 240 Q 160 240 150 200 Q 160 160 200 160"
        stroke={color} strokeWidth="2.5" fill="none"
        animate={{ pathLength: [0, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
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
      <ClickableLabel x={200} y={290} text="LC3-II activo" color={color} onTermClick={onTermClick} />
      <ClickableLabel x={200} y={312} text="Beclin-1 libre" color={color} onTermClick={onTermClick} />
    </>
  )
}

function DeepAutophagyCell({ color, onTermClick }: RendererProps) {
  return (
    <>
      <motion.ellipse
        cx="200" cy="185" rx="32" ry="18"
        stroke={color} strokeWidth="2" fill="none"
        animate={{ rx: [32, 20, 32], opacity: [1, 0.3, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.ellipse
        cx="200" cy="185" rx="20" ry="10"
        stroke={color} strokeWidth="1.5" fill="none"
        animate={{ rx: [20, 12, 20], opacity: [0.8, 0.2, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
      />
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
      <ClickableLabel x={200} y={290} text="PINK1-Parkin" color={color} onTermClick={onTermClick} />
      <ClickableLabel x={200} y={312} text="Mitofagia activa" color={color} onTermClick={onTermClick} />
    </>
  )
}

function RegenerationCell({ color, onTermClick }: RendererProps) {
  return (
    <>
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
      <ClickableLabel x={200} y={300} text="FOXO3a activo" color={color} onTermClick={onTermClick} />
      <ClickableLabel x={200} y={322} text="Células madre ↑" color={color} onTermClick={onTermClick} />
    </>
  )
}

const CELL_RENDERERS: Record<string, React.FC<RendererProps>> = {
  digestion: DigestingCell,
  glycogen: GlycogenCell,
  ketosis: KetosisCell,
  autophagy: AutophagyCell,
  'deep-autophagy': DeepAutophagyCell,
  regeneration: RegenerationCell,
}

interface CellViewProps {
  phase: Phase
}

export function CellView({ phase }: CellViewProps) {
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null)
  const Renderer = CELL_RENDERERS[phase.id] ?? DigestingCell
  const def = selectedTerm ? DEFINITIONS[selectedTerm] : null

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <svg viewBox="0 0 400 380" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <motion.ellipse
          cx="200" cy="200" rx="170" ry="150"
          stroke={phase.color} strokeWidth="2.5" fill={`${phase.color}08`}
          strokeDasharray="8 4"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '200px 200px' }}
        />
        <ellipse cx="200" cy="200" rx="45" ry="38" stroke={phase.color} strokeWidth="1.5" fill={`${phase.color}12`} strokeDasharray="4 3" />
        <motion.circle
          cx="200" cy="200" r="10"
          fill={phase.color} opacity={0.5}
          animate={{ r: [8, 13, 8], opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <Renderer color={phase.color} onTermClick={setSelectedTerm} />
        <text x="200" y="360" textAnchor="middle" fill={phase.color} fontSize="13" fontFamily="Space Grotesk, sans-serif" opacity={0.6}>
          {phase.name}
        </text>
      </svg>

      <AnimatePresence>
        {def && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={() => setSelectedTerm(null)}
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'rgba(0,0,0,0.92)',
              border: `1px solid ${phase.color}40`,
              borderRadius: '16px',
              padding: '16px',
              cursor: 'pointer',
            }}
          >
            <p style={{ color: phase.color, fontWeight: 700, fontSize: '15px', marginBottom: '6px', fontFamily: 'Space Grotesk' }}>
              {def.title}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', lineHeight: '1.5' }}>
              {def.desc}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', marginTop: '8px' }}>Toca para cerrar</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
