import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useFasting } from './hooks/useFasting'
import { useHistory } from './hooks/useHistory'
import { useMilestones } from './hooks/useMilestones'
import { AvatarScene } from './components/AvatarScene'
import { FastingTimer } from './components/FastingTimer'
import { BodyZoomOverlay } from './components/BodyZoomOverlay'
import { PhaseTimeline } from './components/PhaseTimeline'
import { MilestoneCard } from './components/MilestoneCard'
import { AchievementToast } from './components/AchievementToast'
import { HistoryPanel } from './components/HistoryPanel'

export function App() {
  const { isRunning, elapsedSeconds, fastingHours, phase, phaseProgress, startFast, stopFast } = useFasting()
  const { history, stats, unlockedAchievements, unlockedIds, newAchievement, saveFast, dismissAchievement } = useHistory()
  const { activeMilestone, dismissMilestone } = useMilestones(fastingHours, isRunning)

  const [overlayOpen, setOverlayOpen] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)

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
        className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
        style={{ width: '520px', height: '520px', background: phase.glowColor, filter: 'blur(60px)', opacity: 0.3 }}
        animate={{ opacity: [0.22, 0.58, 0.22] }}
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
        <button
          onClick={() => setHistoryOpen(true)}
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm transition-opacity hover:opacity-80"
          style={{ background: `${phase.color}15`, border: `1px solid ${phase.color}30`, color: phase.color }}
        >
          📊
        </button>
      </div>

      {/* 3D Avatar */}
      <div className="w-full max-w-sm h-80 z-10 relative">
        <AvatarScene
          phase={phase}
          fastingHours={fastingHours}
          isRunning={isRunning}
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
      />
    </div>
  )
}
