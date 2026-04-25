import { useState, useRef, useCallback } from 'react'
import { streamNarration } from '../api/claude'

export interface NarrationState {
  text: string
  isStreaming: boolean
  error: string | null
}

export function useNarration() {
  const [text, setText] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const narrate = useCallback(async (fastingHours: number, phaseName: string, keyProcess: string) => {
    if (abortRef.current) abortRef.current.abort()
    abortRef.current = new AbortController()

    setText('')
    setError(null)
    setIsStreaming(true)

    try {
      await streamNarration(
        fastingHours,
        phaseName,
        keyProcess,
        (chunk) => setText((prev) => prev + chunk),
        abortRef.current.signal
      )
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setError(err.message)
      }
    } finally {
      setIsStreaming(false)
    }
  }, [])

  const stop = useCallback(() => {
    abortRef.current?.abort()
    setIsStreaming(false)
  }, [])

  const clear = useCallback(() => {
    setText('')
    setError(null)
  }, [])

  return { text, isStreaming, error, narrate, stop, clear }
}
