import { useState } from 'react'

export interface Profile {
  weight: number
  height: number
  age: number
  goalWeight: number
  startDate: string
}

function load(): Profile | null {
  try {
    const raw = localStorage.getItem('user-profile')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function save(p: Profile) {
  localStorage.setItem('user-profile', JSON.stringify(p))
}

export function calcStats(p: Profile, gender: 'male' | 'female') {
  const heightM = p.height / 100
  const imc = p.weight / (heightM * heightM)
  const fatPercent = 1.2 * imc + 0.23 * p.age - 10.8 * (gender === 'male' ? 1 : 0) - 5.4
  const fatKg = p.weight * (Math.max(fatPercent, 5) / 100)
  const kgToLose = Math.max(p.weight - p.goalWeight, 0)
  const weeksTotal = Math.ceil(kgToLose / 0.6)
  const msElapsed = Date.now() - new Date(p.startDate).getTime()
  const currentWeek = Math.min(Math.floor(msElapsed / (7 * 24 * 3600 * 1000)) + 1, weeksTotal)
  return { imc, fatPercent: Math.max(fatPercent, 5), fatKg, kgToLose, weeksTotal, currentWeek }
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(load)

  const saveProfile = (p: Omit<Profile, 'startDate'>) => {
    const existing = load()
    const full: Profile = { ...p, startDate: existing?.startDate ?? new Date().toISOString() }
    save(full)
    setProfile(full)
  }

  return { profile, saveProfile }
}
