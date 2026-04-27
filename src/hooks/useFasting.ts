import { useState, useEffect, useCallback, useRef } from 'react'
import { getCurrentPhase, getPhaseProgress, Phase } from '../data/phases'

export interface FastingState {
  isRunning: boolean
  elapsedSeconds: number
  fastingHours: number
  phase: Phase
  phaseProgress: number
  startTime: Date | null
}

const STORAGE_KEY = 'autophagy_fast_start'
const GOAL_KEY = 'autophagy_goal_hours'

export function useFasting() {
  const [isRunning, setIsRunning] = useState(false)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [goalHours, setGoalHoursState] = useState<number>(() => {
    const stored = localStorage.getItem(GOAL_KEY)
    return stored ? parseFloat(stored) : 16
  })

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const start = new Date(stored)
      const elapsed = Math.floor((Date.now() - start.getTime()) / 1000)
      setStartTime(start)
      setElapsedSeconds(elapsed)
      setIsRunning(true)
    }
  }, [])

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1)
      }, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning])

  const startFast = useCallback(() => {
    const now = new Date()
    localStorage.setItem(STORAGE_KEY, now.toISOString())
    setStartTime(now)
    setElapsedSeconds(0)
    setIsRunning(true)
  }, [])

  const stopFast = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setIsRunning(false)
    setElapsedSeconds(0)
    setStartTime(null)
  }, [])

  const setGoalHours = (hours: number) => {
    localStorage.setItem(GOAL_KEY, hours.toString())
    setGoalHoursState(hours)
  }

  const fastingHours = elapsedSeconds / 3600
  const phase = getCurrentPhase(fastingHours)
  const phaseProgress = getPhaseProgress(fastingHours, phase)
  const goalSeconds = goalHours * 3600
  const remainingSeconds = Math.max(goalSeconds - elapsedSeconds, 0)
  const goalProgress = Math.min(elapsedSeconds / goalSeconds, 1)

  return {
    isRunning,
    elapsedSeconds,
    fastingHours,
    phase,
    phaseProgress,
    startTime,
    goalHours,
    goalProgress,
    remainingSeconds,
    setGoalHours,
    startFast,
    stopFast,
  }
}
