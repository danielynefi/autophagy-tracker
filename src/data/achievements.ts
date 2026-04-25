export interface Achievement {
  id: string
  title: string
  description: string
  emoji: string
  color: string
  condition: (stats: AchievementStats) => boolean
}

export interface AchievementStats {
  totalFasts: number
  longestFastHours: number
  currentStreakDays: number
  totalHours: number
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_fast',
    title: 'Primer Paso',
    description: 'Completaste tu primer ayuno',
    emoji: '🌱',
    color: '#10B981',
    condition: (s) => s.totalFasts >= 1,
  },
  {
    id: 'glycogen',
    title: 'Quema Glucógeno',
    description: 'Llegaste a 12 horas de ayuno',
    emoji: '⚡',
    color: '#FF6B35',
    condition: (s) => s.longestFastHours >= 12,
  },
  {
    id: 'ketosis',
    title: 'Modo Cetosis',
    description: 'Llegaste a 15 horas de ayuno',
    emoji: '🔥',
    color: '#A855F7',
    condition: (s) => s.longestFastHours >= 15,
  },
  {
    id: 'autophagy',
    title: 'Autofagia Activada',
    description: 'Llegaste a 18 horas de ayuno',
    emoji: '✨',
    color: '#00D4FF',
    condition: (s) => s.longestFastHours >= 18,
  },
  {
    id: 'deep_mode',
    title: 'Modo Profundo',
    description: 'Completaste 24 horas de ayuno',
    emoji: '🧬',
    color: '#3B82F6',
    condition: (s) => s.longestFastHours >= 24,
  },
  {
    id: 'regeneration',
    title: 'Regeneración',
    description: 'Completaste 48 horas de ayuno',
    emoji: '🌟',
    color: '#10B981',
    condition: (s) => s.longestFastHours >= 48,
  },
  {
    id: 'streak_3',
    title: 'Racha x3',
    description: '3 ayunos consecutivos',
    emoji: '🔥',
    color: '#FF9F43',
    condition: (s) => s.currentStreakDays >= 3,
  },
  {
    id: 'streak_7',
    title: 'Semana de Fuego',
    description: '7 ayunos consecutivos',
    emoji: '💪',
    color: '#FF6B35',
    condition: (s) => s.currentStreakDays >= 7,
  },
  {
    id: 'veteran',
    title: 'Veterano',
    description: '30 ayunos completados',
    emoji: '👑',
    color: '#F59E0B',
    condition: (s) => s.totalFasts >= 30,
  },
  {
    id: 'centurion',
    title: 'Centurión',
    description: '100 horas totales de ayuno',
    emoji: '🏆',
    color: '#6366F1',
    condition: (s) => s.totalHours >= 100,
  },
]
