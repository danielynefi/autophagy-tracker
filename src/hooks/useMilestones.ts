import { useState, useEffect, useRef } from 'react'
import { MILESTONES, Milestone } from '../data/milestones'

export function useMilestones(fastingHours: number, isRunning: boolean) {
  const [activeMilestone, setActiveMilestone] = useState<Milestone | null>(null)
  const shownRef = useRef<Set<number>>(new Set())

  useEffect(() => {
    if (!isRunning) {
      shownRef.current.clear()
      setActiveMilestone(null)
      return
    }

    for (const milestone of MILESTONES) {
      if (
        fastingHours >= milestone.hour &&
        fastingHours < milestone.hour + 0.1 &&
        !shownRef.current.has(milestone.hour)
      ) {
        shownRef.current.add(milestone.hour)
        setActiveMilestone(milestone)
        break
      }
    }
  }, [fastingHours, isRunning])

  const dismissMilestone = () => setActiveMilestone(null)

  return { activeMilestone, dismissMilestone }
}
