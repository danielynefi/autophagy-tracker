import { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useFasting } from './hooks/useFasting'
import { useHistory } from './hooks/useHistory'
import { useMilestones } from './hooks/useMilestones'
import { useProfile } from './hooks/useProfile'
import { AvatarScene } from './components/AvatarScene'
import { FastingTimer } from './components/FastingTimer'
import { BodyZoomOverlay } from './components/BodyZoomOverlay'
import { PhaseTimeline } from './components/PhaseTimeline'
import { MilestoneCard } from './components/MilestoneCard'
import { AchievementToast } from './components/AchievementToast'
import { HistoryPanel } from './components/HistoryPanel'
import { SettingsPanel } from './components/SettingsPanel'

export function App() {
  const { isRunning, elapsedSeconds, fastingHours, phase, phaseProgress, startFast, stopFast } = useFasting()
  const { history, stats, unlockedAchievements, unlockedIds, newAchievement, saveFast, dismissAchievement } = useHistory()
  const { activeMilestone, dismissMilestone } = useMilestones(fastingHours, isRunning)

  const { profile } = useProfile()

  const [overlayOpen, setOverlayOpen] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  useEffect(() => {
    if (!profile) setHistoryOpen(true)
  }, [])
  const [gender, setGender] = useState<'male' | 'female'>(() =>
    (localStorage.getItem('avatar-gender') as 'male' | 'female') || 'male'
  )

  const handleGenderChange = (g: 'male' | 'female') => {
    setGender(g)
    localStorage.setItem('avatar-gender', g)
  }

  const handleAvatarClick = useCallback(() => {
    if (isRunning) setOverlayOpen(true)
  }, [isRunning])

  const handleStop = useCallback(() => {
    if (isRunning) {
      saveFast(new Date(Date.now() - elapsedSeconds * 1000), new Date(), phase.name)
    }
    stopFast()
  }, [isRunning, elapsedSeconds, phase, saveFast, stopFast])

  return (
    <div
      className="min-h-screen flex flex-col items-center relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, #0a1628 0%, #050a12 60%, #000 100%)' }}
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
        style={{ top: '110px', width: '300px', height: '300px', background: phase.glowColor, filter: 'blur(70px)', opacity: 0.3 }}
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-sm px-5 pt-10 pb-2 z-10">
        <div>
          <h1 className="text-xl font-bold" style={{ fontFamily: 'Space Grotesk', color: phase.color }}>
            Autophagy Tracker
          </h1>
          <p className="text-xs opacity-40 text-white">Tu cuerpo como nunca lo habías visto</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setSettingsOpen(true)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
            style={{ background: `${phase.color}15`, border: `1px solid ${phase.color}30`, color: phase.color }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </button>
          <button
            onClick={() => setHistoryOpen(true)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm transition-opacity hover:opacity-80"
            style={{ background: `${phase.color}15`, border: `1px solid ${phase.color}30`, color: phase.color }}
          >
            📊
          </button>
        </div>
      </div>

      {/* 3D Avatar */}
      <div className="w-full max-w-sm h-80 z-10 relative">
        <AvatarScene
          phase={phase}
          fastingHours={fastingHours}
          isRunning={isRunning}
          gender={gender}
          onCanvasDoubleClick={handleAvatarClick}
        />
        {isRunning && (
          <motion.p
            className="absolute bottom-2 left-0 right-0 text-center text-xs opacity-40 text-white pointer-events-none"
            animate={{ opacity: [0.25, 0.5, 0.25] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            Toca para X-ray · Doble toque para ver tus células · Arrastra para rotar
          </motion.p>
        )}
        {!isRunning && (
          <p className="absolute bottom-2 left-0 right-0 text-center text-xs text-white/25 pointer-events-none">
            Inicia tu ayuno para comenzar
          </p>
        )}
      </div>

      {/* Timer + controls */}
      <div className="flex flex-col items-center gap-5 z-10 w-full max-w-sm px-5 pb-10">
        <FastingTimer
          isRunning={isRunning}
          elapsedSeconds={elapsedSeconds}
          phase={phase}
          phaseProgress={phaseProgress}
          onStart={startFast}
          onStop={handleStop}
        />

        {isRunning && (
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <PhaseTimeline currentPhase={phase} fastingHours={fastingHours} />
          </motion.div>
        )}

        {/* Stats summary when not running */}
        {!isRunning && stats.totalFasts > 0 && (
          <motion.div
            className="w-full flex justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-center">
              <p className="text-lg font-bold text-white">{stats.totalFasts}</p>
              <p className="text-xs text-white/30">ayunos</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-white">{stats.longestFastHours.toFixed(0)}h</p>
              <p className="text-xs text-white/30">récord</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-white">{unlockedAchievements.length}</p>
              <p className="text-xs text-white/30">logros</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Cell view overlay */}
      <BodyZoomOverlay
        isOpen={overlayOpen}
        phase={phase}
        fastingHours={fastingHours}
        onClose={() => setOverlayOpen(false)}
      />

      {/* 3h milestone card */}
      <MilestoneCard milestone={activeMilestone} onDismiss={dismissMilestone} />

      {/* Achievement toast */}
      <AchievementToast achievement={newAchievement} onDismiss={dismissAchievement} />

      {/* History panel */}
      <HistoryPanel
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        history={history}
        stats={stats}
        unlockedIds={unlockedIds}
        gender={gender}
      />

      {/* Settings panel */}
      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        gender={gender}
        onGenderChange={handleGenderChange}
        phase={phase}
      />
    </div>
  )
}
