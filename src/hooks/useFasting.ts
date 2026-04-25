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

export function useFasting() {
  const [isRunning, setIsRunning] = useState(false)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

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

  const fastingHours = elapsedSeconds / 3600
  const phase = getCurrentPhase(fastingHours)
  const phaseProgress = getPhaseProgress(fastingHours, phase)

  return {
    isRunning,
    elapsedSeconds,
    fastingHours,
    phase,
    phaseProgress,
    startTime,
    startFast,
    stopFast,
  }
}
