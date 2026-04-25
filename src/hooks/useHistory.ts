import { useState, useCallback } from 'react'
import { ACHIEVEMENTS, Achievement, AchievementStats } from '../data/achievements'

export interface FastRecord {
  id: string
  startTime: string
  endTime: string
  durationHours: number
  phaseReached: string
}

const HISTORY_KEY = 'autophagy_history'
const ACHIEVEMENTS_KEY = 'autophagy_achievements'

function loadHistory(): FastRecord[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? '[]')
  } catch {
    return []
  }
}

function loadUnlocked(): string[] {
  try {
    return JSON.parse(localStorage.getItem(ACHIEVEMENTS_KEY) ?? '[]')
  } catch {
    return []
  }
}

function computeStats(history: FastRecord[]): AchievementStats {
  const totalFasts = history.length
  const longestFastHours = history.reduce((max, r) => Math.max(max, r.durationHours), 0)
  const totalHours = history.reduce((sum, r) => sum + r.durationHours, 0)

  // Simple streak: consecutive days with at least one fast
  let currentStreakDays = 0
  const today = new Date()
  for (let i = 0; i < 365; i++) {
    const day = new Date(today)
    day.setDate(today.getDate() - i)
    const dayStr = day.toISOString().split('T')[0]
    const hasFast = history.some((r) => r.endTime.startsWith(dayStr))
    if (hasFast) currentStreakDays++
    else if (i > 0) break
  }

  return { totalFasts, longestFastHours, currentStreakDays, totalHours }
}

export function useHistory() {
  const [history, setHistory] = useState<FastRecord[]>(loadHistory)
  const [unlockedIds, setUnlockedIds] = useState<string[]>(loadUnlocked)
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null)

  const saveFast = useCallback((startTime: Date, endTime: Date, phaseReached: string) => {
    const durationHours = (endTime.getTime() - startTime.getTime()) / 3_600_000
    const record: FastRecord = {
      id: Date.now().toString(),
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      durationHours,
      phaseReached,
    }

    setHistory((prev) => {
      const updated = [record, ...prev].slice(0, 100)
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))

      const stats = computeStats(updated)
      setUnlockedIds((prevUnlocked) => {
        const newlyUnlocked = ACHIEVEMENTS.filter(
          (a) => !prevUnlocked.includes(a.id) && a.condition(stats)
        )
        if (newlyUnlocked.length > 0) {
          setNewAchievement(newlyUnlocked[0])
          const updatedUnlocked = [...prevUnlocked, ...newlyUnlocked.map((a) => a.id)]
          localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(updatedUnlocked))
          return updatedUnlocked
        }
        return prevUnlocked
      })

      return updated
    })
  }, [])

  const dismissAchievement = useCallback(() => setNewAchievement(null), [])

  const stats = computeStats(history)
  const unlockedAchievements = ACHIEVEMENTS.filter((a) => unlockedIds.includes(a.id))

  return { history, stats, unlockedAchievements, unlockedIds, newAchievement, saveFast, dismissAchievement }
}
