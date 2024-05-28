'use client'

import { useEffect } from 'react'

import { motion, useMotionValue, useSpring } from 'framer-motion'

import { useCursorStore } from '~/state/use-cursor-store'

export const Cursor = () => {
  const { x, y } = useCursor()
  const { text } = useCursorStore()

  return (
    <motion.div
      className='pointer-events-none fixed left-0 top-0 hidden size-12 items-center justify-center rounded-full bg-white mix-blend-difference md:block'
      style={{
        translateX: x,
        translateY: y
      }}
    />
  )
}

const useCursor = () => {
  const springConfig = { damping: 50, stiffness: 700 }

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }
    window.addEventListener('mousemove', moveCursor)
    return () => {
      window.removeEventListener('mousemove', moveCursor)
    }
  }, [])

  return { x: cursorXSpring, y: cursorYSpring }
}
