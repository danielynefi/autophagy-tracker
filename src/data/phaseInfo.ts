export interface PhaseInfo {
  phaseId: string
  bullets: string[]
  highlight: string
  highlightLabel: string
}

export const PHASE_INFO: PhaseInfo[] = [
  {
    phaseId: 'digestion',
    bullets: [
      'La insulina está alta, tus células reciben glucosa directamente',
      'El hígado almacena el exceso de azúcar como glucógeno',
      'Tu cuerpo está en modo "guardar energía"',
    ],
    highlight: '2–4h',
    highlightLabel: 'para vaciar el estómago',
  },
  {
    phaseId: 'glycogen',
    bullets: [
      'El glucagón sube y ordena al hígado liberar sus reservas',
      'Tus músculos y órganos queman esa glucosa almacenada',
      'El metabolismo empieza a mirar hacia las grasas',
    ],
    highlight: '~400 kcal',
    highlightLabel: 'de glucógeno disponibles',
  },
  {
    phaseId: 'ketosis',
    bullets: [
      'El glucógeno está casi agotado — el hígado produce cetonas',
      'Tu cerebro empieza a funcionar con BHB en vez de glucosa',
      'La quema de grasa corporal se acelera',
    ],
    highlight: '3× más',
    highlightLabel: 'de oxidación de grasas',
  },
  {
    phaseId: 'autophagy',
    bullets: [
      'mTOR está inhibido — la señal de limpieza está activa',
      'Las células reciclan proteínas dañadas y mitocondrias viejas',
      'Tu sistema inmune se fortalece eliminando células disfuncionales',
    ],
    highlight: '30%',
    highlightLabel: 'más eficiencia celular',
  },
  {
    phaseId: 'deep-autophagy',
    bullets: [
      'Mitofagia activa: mitocondrias viejas reemplazadas por nuevas',
      'FOXO3a y Sirtuinas — los genes de longevidad — están encendidos',
      'Tu ADN está siendo reparado activamente',
    ],
    highlight: 'Zona élite',
    highlightLabel: 'menos del 1% llega aquí',
  },
  {
    phaseId: 'regeneration',
    bullets: [
      'Las células madre se activan para regenerar tejidos dañados',
      'BDNF eleva la neurogénesis — tu cerebro forma nuevas neuronas',
      'El sistema inmune se renueva desde cero',
    ],
    highlight: '↑ BDNF',
    highlightLabel: 'nuevas conexiones neuronales',
  },
]

export function getPhaseInfo(phaseId: string): PhaseInfo | null {
  return PHASE_INFO.find(p => p.phaseId === phaseId) ?? null
}
