export interface Milestone {
  hour: number
  title: string
  molecule: string
  message: string
  emoji: string
  color: string
}

export const MILESTONES: Milestone[] = [
  {
    hour: 0,
    title: 'Ayuno iniciado',
    molecule: 'Insulina',
    message: 'Tu cuerpo empieza a procesar los últimos nutrientes. La insulina está alta y tus células reciben energía directa de la glucosa. Es el punto de partida de algo poderoso.',
    emoji: '🚀',
    color: '#FF9F43',
  },
  {
    hour: 3,
    title: '3 horas — Digestión completa',
    molecule: 'Glucagón',
    message: 'La digestión terminó. El glucagón empieza a subir y le dice a tu hígado que abra sus reservas de glucógeno. Tu cuerpo cambia de "recibir" a "gestionar".',
    emoji: '⏱️',
    color: '#FF9F43',
  },
  {
    hour: 6,
    title: '6 horas — Reservas activas',
    molecule: 'Glucógeno fosforilasa',
    message: 'Tu hígado está liberando glucosa desde los gránulos de glucógeno. La enzima glucógeno fosforilasa trabaja sin parar. Tienes reservas para varias horas más.',
    emoji: '🔋',
    color: '#FF6B35',
  },
  {
    hour: 9,
    title: '9 horas — Cambio metabólico',
    molecule: 'AMPK',
    message: 'AMPK, el sensor de energía de tus células, detecta la caída del ATP y enciende la alarma metabólica. Tu cuerpo empieza a mirar hacia las grasas como combustible.',
    emoji: '⚡',
    color: '#FF6B35',
  },
  {
    hour: 12,
    title: '12 horas — Glucógeno agotado',
    molecule: 'CPT1',
    message: 'Las reservas de glucógeno están casi vacías. CPT1, el portero de la mitocondria, abre las puertas a los ácidos grasos. Tu cuerpo está a punto de encender la cetosis.',
    emoji: '🏁',
    color: '#A855F7',
  },
  {
    hour: 15,
    title: '15 horas — Cetosis iniciando',
    molecule: 'Beta-hidroxibutirato (BHB)',
    message: 'Tu hígado produce BHB activamente. Tus neuronas están aprendiendo a usar cetonas como combustible. El cerebro que antes pedía glucosa, ahora acepta esta energía más limpia.',
    emoji: '🔥',
    color: '#A855F7',
  },
  {
    hour: 18,
    title: '18 horas — ¡Autofagia activada!',
    molecule: 'LC3-II + Beclin-1',
    message: 'mTOR está inhibido. LC3-II marca los desechos celulares y Beclin-1 forma los autofagosomas. Tus células están limpiando su interior como nunca. Este es el momento de la regeneración.',
    emoji: '✨',
    color: '#00D4FF',
  },
  {
    hour: 21,
    title: '21 horas — Limpieza profunda',
    molecule: 'p62/SQSTM1',
    message: 'El flujo autofágico es continuo. p62 identifica proteínas dañadas y las lleva al lisosoma. Tus células están reciclando mitocondrias viejas y construyendo versiones nuevas.',
    emoji: '🧹',
    color: '#00D4FF',
  },
  {
    hour: 24,
    title: '¡24 horas! Nivel élite',
    molecule: 'FOXO3a + Sirtuinas',
    message: 'FOXO3a, el gen de la longevidad, está activo. Las sirtuinas SIRT1-3 se han activado. Tu cuerpo está en modo de regeneración profunda. Muy poca gente llega hasta aquí. Eres extraordinario.',
    emoji: '🏆',
    color: '#3B82F6',
  },
  {
    hour: 36,
    title: '36 horas — Renovación inmune',
    molecule: 'IGF-1 + PKA',
    message: 'IGF-1 está bajo y PKA suprimida. Esto permite que las células madre hematopoyéticas se activen. Tu sistema inmune está literalmente renovando su ejército de células.',
    emoji: '🧬',
    color: '#3B82F6',
  },
  {
    hour: 48,
    title: '48 horas — Regeneración total',
    molecule: 'BDNF + PGC-1α',
    message: 'BDNF impulsa la neurogénesis hipocampal — tu cerebro está formando nuevas neuronas. PGC-1α activa la biogénesis mitocondrial. Estás en el nivel más profundo de renovación celular conocido.',
    emoji: '🌱',
    color: '#10B981',
  },
]

export function getNextMilestone(hours: number): Milestone | null {
  return MILESTONES.find((m) => m.hour > hours) ?? null
}

export function getCurrentMilestone(hours: number): Milestone | null {
  const passed = MILESTONES.filter((m) => m.hour <= hours)
  return passed[passed.length - 1] ?? null
}

export function getMilestoneAtHour(hour: number): Milestone | null {
  return MILESTONES.find((m) => m.hour === hour) ?? null
}
