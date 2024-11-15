'use client'

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { useHotkeys } from 'react-hotkeys-hook'

export const Hotkeys = () => {
  const router = useRouter()

  useHotkeys('c', () => {
    router.push('/')
  })

  useHotkeys('alt+q', () => {
    signOut()
  })

  return null
}
