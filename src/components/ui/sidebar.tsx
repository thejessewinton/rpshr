'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { ArrowLineRight } from '@phosphor-icons/react'
import { format } from 'date-fns'
import { type Variants, motion } from 'framer-motion'
import { groupBy } from 'remeda'

import { Tooltip } from '~/components/shared/tooltip'
import { type RouterOutputs, api } from '~/trpc/react'
import { cn } from '~/utils/core'
import { Button } from '../shared/button'
import { KBD } from '../shared/kbd'

const useShadow = () => {
  const [opacity, setOpacity] = useState(0)
  const shadowRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!shadowRef.current) return

      const { left, top, width, height } =
        shadowRef.current.getBoundingClientRect()

      const centerX = left + width / 10
      const centerY = top + height / 10

      const distance = Math.sqrt(
        (centerX - e.clientX) ** 2 + (centerY - e.clientY) ** 2,
      )

      const maxDistance = Math.sqrt((width / 2) ** 2 + (height / 2) ** 2)
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
        opacity,
      }}
      ref={shadowRef}
      className="pointer-events-none fixed inset-0 w-[24rem] bg-gradient-to-r from-black/30 to-80% to-transparent"
    />
  )
}

type SidebarProps = {
  notes: RouterOutputs['notes']['getAll']
}

export const Sidebar = ({ notes }: SidebarProps) => {
  const [isPinned, setIsPinned] = useState(true)
  const pathname = usePathname()
  const defaultVariant: keyof typeof contentVariants = isPinned
    ? 'pinned'
    : 'unpinned'

  const { data } = api.notes.getAll.useQuery(undefined, {
    initialData: notes,
  })

  const groupedNotes = groupBy(data, (note) =>
    format(note.updated_at ?? note.created_at!, 'MMMM yyy'),
  )

  const handlePinSidebar = () => {
    setIsPinned((p) => !p)
  }

  const contentVariants = {
    unpinned: {
      transform: 'translateX(-25%)',
      opacity: 0,
      filter: 'blur(2px)',
    },
    pinned: {
      transform: 'translateX(0%)',
      opacity: 1,
      filter: 'blur(0px)',
    },
  } as const satisfies Variants

  return (
    <motion.nav
      className="fixed inset-0 left-0 z-20 h-screen max-md:pointer-events-none"
      animate="width"
      variants={{
        width: {
          width: isPinned ? '18rem' : '4.5rem',
        },
      }}
      initial="width"
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 40,
        ease: 'easeInOut',
        duration: 0.2,
      }}
    >
      <motion.div
        className={cn(
          'fixed inset-0 z-[100] flex w-72 flex-col items-center border-neutral-700/40 border-r bg-neutral-900 p-4 backdrop-blur-md',
          {
            'top-1 bottom-1 rounded-r-xl border shadow-black/20 shadow-lg':
              !isPinned,
          },
        )}
        variants={contentVariants}
        initial={defaultVariant}
        whileHover="pinned"
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 40,
          ease: 'easeInOut',
          duration: 0.2,
        }}
      >
        <header className="flex w-full items-center justify-between">
          <h2 className="text-white text-xs">My notes</h2>
          <Tooltip>
            <Tooltip.Trigger
              onClick={handlePinSidebar}
              className="mr-0 ml-auto"
            >
              <div className="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-neutral-900">
                <ArrowLineRight
                  className={cn(
                    'size-4 text-white transition-all duration-300 ease-in-out',
                    {
                      'rotate-180': isPinned,
                    },
                  )}
                />
              </div>
            </Tooltip.Trigger>
            <Tooltip.Content side="right">Pin</Tooltip.Content>
          </Tooltip>
        </header>

        <div className="my-10 flex w-full flex-1 flex-col gap-4">
          {!Object.entries(groupedNotes).length ? (
            <div className="flex flex-1 flex-col items-center justify-center rounded-md border border-neutral-700/70 border-dashed text-sm" />
          ) : (
            Object.entries(groupedNotes).map(([date, notes]) => {
              return (
                <div key={date} className="flex flex-col gap-2">
                  <h3 className="text-neutral-400 text-xs">{date}</h3>
                  {notes.map((note) => {
                    return (
                      <Tooltip key={note.id}>
                        <Tooltip.Trigger>
                          <Link
                            href={`/${note.id}`}
                            className={cn(
                              '-mx-3 line-clamp-1 px-3 py-2 text-left text-neutral-400 text-sm transition-colors hover:bg-neutral-800 hover:text-white',
                              {
                                'text-white': pathname === `/${note.id}`,
                              },
                            )}
                          >
                            {note.title}
                          </Link>
                        </Tooltip.Trigger>
                        <Tooltip.Content
                          side="right"
                          sideOffset={4}
                          className="self-start"
                        >
                          The{' '}
                          {format(note.updated_at ?? note.created_at!, 'dd')}th
                        </Tooltip.Content>
                      </Tooltip>
                    )
                  })}
                </div>
              )
            })
          )}
        </div>
        <Button href="/" className="mt-auto mb-0 w-full justify-between">
          New <KBD>C</KBD>
        </Button>
      </motion.div>
    </motion.nav>
  )
}
