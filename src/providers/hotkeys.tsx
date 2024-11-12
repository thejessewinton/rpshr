'use client'

import { useRouter } from 'next/navigation'

import { useHotkeys } from 'react-hotkeys-hook'

export const Hotkeys = () => {
  const router = useRouter()

  useHotkeys('c', () => {
    router.push('/new')
  })

  return null
}
