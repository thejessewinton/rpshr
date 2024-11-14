'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ArrowLineRight } from '@phosphor-icons/react'
import { format, getMonth } from 'date-fns'
import { motion, type Variants } from 'framer-motion'
import { groupBy, sortBy } from 'remeda'

import { Tooltip } from '~/components/shared/tooltip'
import { RouterOutputs } from '~/trpc/react'
import { cn } from '~/utils/core'

const useShadow = () => {
  const [opacity, setOpacity] = useState(0)
  const shadowRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!shadowRef.current) return

      const { left, top, width, height } = shadowRef.current.getBoundingClientRect()

      const centerX = left + width / 10
      const centerY = top + height / 10

      const distance = Math.sqrt(Math.pow(centerX - e.clientX, 2) + Math.pow(centerY - e.clientY, 2))

      const maxDistance = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2))
      const newOpacity = Math.max(0, 1 - Math.min(distance / maxDistance))

      setOpacity(newOpacity)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return { opacity, shadowRef }
}

export const Shadow = () => {
  const { shadowRef, opacity } = useShadow()
  return (
    <div
      style={{
        opacity
      }}
      ref={shadowRef}
      className='pointer-events-none fixed inset-0 w-[24rem] bg-gradient-to-r from-black/30 to-transparent to-80%'
    />
  )
}

type SidebarProps = {
  notes: RouterOutputs['notes']['getAll']
}

export const Sidebar = ({ notes }: SidebarProps) => {
  const [isPinned, setIsPinned] = useState(false)
  const pathname = usePathname()
  const defaultVariant: keyof typeof variants = isPinned ? 'pinned' : 'unpinned'

  const groupedNotes = groupBy(notes, (note) => format(note.updated_at ?? note.created_at!, 'MMMM yyy'))

  const handlePinSidebar = () => {
    setIsPinned((p) => !p)
  }

  const variants = {
    unpinned: {
      transform: 'translateX(-15%)',
      opacity: 0,
      filter: 'blur(2px)'
    },
    pinned: {
      transform: 'translateX(0%)',
      opacity: 1,
      filter: 'blur(0px)'
    }
  } as const satisfies Variants

  return (
    <motion.nav
      className='fixed inset-0 left-0 z-20 h-screen max-md:pointer-events-none'
      animate='width'
      variants={{
        width: {
          width: isPinned ? '18rem' : '4.5rem'
        }
      }}
      initial='width'
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 40,
        ease: 'easeInOut',
        duration: 0.2
      }}
    >
      <motion.div
        className={cn(
          'fixed inset-0 z-[100] flex w-72 flex-col items-center border-r border-neutral-700/40 bg-neutral-900 p-4 backdrop-blur-md',
          {
            'bottom-1 top-1 rounded-r-xl border shadow-lg shadow-black/20': !isPinned
          }
        )}
        variants={variants}
        initial={defaultVariant}
        whileHover='pinned'
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 40,
          ease: 'easeInOut',
          duration: 0.2
        }}
      >
        <header className='flex w-full items-center justify-between'>
          <h2 className='text-xs text-white'>Notes</h2>
          <Tooltip>
            <Tooltip.Trigger onClick={handlePinSidebar} className='ml-auto mr-0'>
              <div className='flex items-center justify-center rounded-full p-2 transition-colors hover:bg-neutral-900'>
                <ArrowLineRight
                  className={cn('size-4 text-white transition-all duration-300 ease-in-out', {
                    'rotate-180': isPinned
                  })}
                />
              </div>
            </Tooltip.Trigger>
            <Tooltip.Content>Pin</Tooltip.Content>
          </Tooltip>
        </header>

        <div className='mt-10 flex flex-col gap-4'>
          {Object.entries(groupedNotes).map(([date, notes]) => {
            return (
              <div key={date} className='flex flex-col gap-2'>
                <h3 className='text-xs text-neutral-400'>{date}</h3>
                {notes.map((note) => {
                  return (
                    <Tooltip key={note.id}>
                      <Tooltip.Trigger>
                        <Link
                          href={`/${note.id}`}
                          className={cn('line-clamp-1 text-sm text-neutral-400 transition-colors hover:text-white', {
                            'text-white': pathname === `/${note.id}`
                          })}
                        >
                          {note.title}
                        </Link>
                      </Tooltip.Trigger>
                      <Tooltip.Content side='right' sideOffset={4}>
                        The {format(note.updated_at ?? note.created_at!, 'dd')}th
                      </Tooltip.Content>
                    </Tooltip>
                  )
                })}
              </div>
            )
          })}
        </div>
      </motion.div>
    </motion.nav>
  )
}
