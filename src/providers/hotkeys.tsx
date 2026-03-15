'use client'

import { useRouter } from '@tanstack/react-router'

import { useHotkeys } from 'react-hotkeys-hook'

export const Hotkeys = () => {
  const router = useRouter()

  useHotkeys('c', () => {
    router.navigate({ to: '/' })
  })

  return null
}
