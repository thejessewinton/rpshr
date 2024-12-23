import { useCallback, useEffect, useRef, useState } from 'react'

interface Options {
  callback: () => void
  duration?: number
  onStart?: () => void
  onCancel?: () => void
}

interface HandlerEvents {
  onMouseDown: (e: React.MouseEvent) => void
  onMouseUp: (e: React.MouseEvent) => void
  onMouseLeave: (e: React.MouseEvent) => void
  onTouchStart: (e: React.TouchEvent) => void
  onTouchEnd: (e: React.TouchEvent) => void
}

interface LongPressReturn extends HandlerEvents {
  progress: number
}

export const useLongPress = ({
  callback,
  duration = 500,
  onStart,
  onCancel,
}: Options): LongPressReturn => {
  const [progress, setProgress] = useState<number>(0)
  const timerRef = useRef<NodeJS.Timeout>(
    setTimeout(() => {
      // noop
    }, 0),
  )
  const animationFrameRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)
  const isLongPress = useRef<boolean>(false)

  const clearTimers = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  const updateProgress = useCallback(() => {
    if (!startTimeRef.current) return

    const elapsedTime = Date.now() - startTimeRef.current
    const newProgress = Math.min((elapsedTime / duration) * 100, 100)
    setProgress(newProgress)

    if (newProgress < 100) {
      animationFrameRef.current = requestAnimationFrame(updateProgress)
    }
  }, [duration])

  const startPressTimer = useCallback(() => {
    isLongPress.current = false
    startTimeRef.current = Date.now()
    onStart?.()

    // Start progress animation
    updateProgress()

    // Set the completion timer
    timerRef.current = setTimeout(() => {
      isLongPress.current = true
      callback()
    }, duration)
  }, [callback, duration, updateProgress, onStart])

  const handleOnUp = useCallback(() => {
    clearTimers()
    startTimeRef.current = 0
    setProgress(0)
    if (!isLongPress.current) {
      onCancel?.()
    }
  }, [clearTimers, onCancel])

  const handleOnDown = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault()
      startPressTimer()
    },
    [startPressTimer],
  )

  // Cleanup on unmount
  const cleanup = useCallback(() => {
    clearTimers()
    setProgress(0)
  }, [clearTimers])

  useEffect(() => cleanup, [cleanup])

  return {
    onMouseDown: handleOnDown,
    onMouseUp: handleOnUp,
    onMouseLeave: handleOnUp,
    onTouchStart: handleOnDown,
    onTouchEnd: handleOnUp,
    progress,
  }
}
