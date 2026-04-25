export interface Phase {
  id: string
  name: string
  nameShort: string
  minHours: number
  maxHours: number
  color: string
  glowColor: string
  bgGradient: string
  description: string
  organs: string[]
  emoji: string
  keyProcess: string
}

export const PHASES: Phase[] = [
  {
    id: 'digestion',
    name: 'Digestión Activa',
    nameShort: 'Digestión',
    minHours: 0,
    maxHours: 4,
    color: '#FF9F43',
    glowColor: 'rgba(255,159,67,0.4)',
    bgGradient: 'from-amber-900/30 to-orange-900/20',
    description: 'Glucosa absorbida, insulina alta, células alimentadas',
    organs: ['stomach', 'intestine', 'liver'],
    emoji: '🍽️',
    keyProcess: 'Glucólisis',
  },
  {
    id: 'glycogen',
    name: 'Quemando Glucógeno',
    nameShort: 'Glucógeno',
    minHours: 4,
    maxHours: 12,
    color: '#FF6B35',
    glowColor: 'rgba(255,107,53,0.4)',
    bgGradient: 'from-orange-900/30 to-red-900/20',
    description: 'Hígado libera glucosa desde reservas de glucógeno',
    organs: ['liver', 'muscles', 'pancreas'],
    emoji: '⚡',
    keyProcess: 'Glucogenólisis',
  },
  {
    id: 'ketosis',
    name: 'Inicio de Cetosis',
    nameShort: 'Cetosis',
    minHours: 12,
    maxHours: 16,
    color: '#A855F7',
    glowColor: 'rgba(168,85,247,0.4)',
    bgGradient: 'from-purple-900/30 to-violet-900/20',
    description: 'Grasas se convierten en cetonas, el cerebro cambia de combustible',
    organs: ['liver', 'brain', 'adipose'],
    emoji: '🔥',
    keyProcess: 'Cetogénesis',
  },
  {
    id: 'autophagy',
    name: 'Autofagia Activada',
    nameShort: 'Autofagia',
    minHours: 16,
    maxHours: 24,
    color: '#00D4FF',
    glowColor: 'rgba(0,212,255,0.4)',
    bgGradient: 'from-cyan-900/30 to-blue-900/20',
    description: 'Las células inician su proceso de limpieza y reciclaje interno',
    organs: ['cells', 'lysosomes', 'mitochondria'],
    emoji: '✨',
    keyProcess: 'Autofagia',
  },
  {
    id: 'deep-autophagy',
    name: 'Autofagia Profunda',
    nameShort: 'Auto. Profunda',
    minHours: 24,
    maxHours: 48,
    color: '#3B82F6',
    glowColor: 'rgba(59,130,246,0.4)',
    bgGradient: 'from-blue-900/30 to-indigo-900/20',
    description: 'Máxima limpieza celular, reparación de ADN, mitocondrias renovadas',
    organs: ['cells', 'dna', 'mitochondria', 'lysosomes'],
    emoji: '🧬',
    keyProcess: 'Mitofagia + Reparación ADN',
  },
  {
    id: 'regeneration',
    name: 'Regeneración Celular',
    nameShort: 'Regeneración',
    minHours: 48,
    maxHours: Infinity,
    color: '#10B981',
    glowColor: 'rgba(16,185,129,0.4)',
    bgGradient: 'from-emerald-900/30 to-teal-900/20',
    description: 'Células madre activadas, renovación profunda del organismo',
    organs: ['stem-cells', 'immune', 'brain'],
    emoji: '🌱',
    keyProcess: 'Regeneración de Células Madre',
  },
]

export function getCurrentPhase(hours: number): Phase {
  return PHASES.find((p) => hours >= p.minHours && hours < p.maxHours) ?? PHASES[0]
}

export function getPhaseProgress(hours: number, phase: Phase): number {
  if (phase.maxHours === Infinity) return 1
  return Math.min((hours - phase.minHours) / (phase.maxHours - phase.minHours), 1)
}

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}
