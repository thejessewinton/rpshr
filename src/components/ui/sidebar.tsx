'use client'

import { format } from 'date-fns'
import { type Variants, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { KBD } from '~/components/shared/kbd'
import { Logo } from '~/components/shared/logo'
import { type RouterOutputs, api } from '~/trpc/react'
import { cn } from '~/utils/core'

const HamburgerMenu = ({
  isPinned,
  setIsPinned,
}: { isPinned: boolean; setIsPinned: () => void }) => {
  return (
    <button
      onClick={setIsPinned}
      type="button"
      className={cn(
        'absolute top-8 right-8 flex cursor-pointer flex-col md:hidden',
        {
          'items-end justify-end space-y-1': !isPinned,
          'items-center justify-center': isPinned,
        },
      )}
    >
      <span
        className={cn(
          'block h-px w-5 rounded-full bg-neutral-900 transition-all dark:bg-neutral-50',
          {
            'rotate-45': isPinned,
          },
        )}
      />
      <span
        className={cn(
          'block h-px rounded-full bg-neutral-900 transition-all dark:bg-neutral-50',
          {
            'w-4': !isPinned,
            '-rotate-45 -mt-px w-5': isPinned,
          },
        )}
      />
    </button>
  )
}

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
      className="pointer-events-none fixed inset-0 hidden w-[24rem] bg-linear-to-r from-black/30 to-80% to-transparent md:block"
    />
  )
}

type SidebarProps = {
  notes: RouterOutputs['notes']['getAll']
}

export const Sidebar = ({ notes }: SidebarProps) => {
  const [isPinned, setIsPinned] = useState(false)
  const pathname = usePathname()
  const defaultVariant: keyof typeof contentVariants = isPinned
    ? 'open'
    : 'closed'

  const { data } = api.notes.getAll.useQuery(undefined, {
    initialData: notes,
  })

  const handlePinSidebar = () => {
    console.log('pin')
    setIsPinned((p) => !p)
  }

  const sidebarVariants = {
    closed: {
      width: '4.5rem',
    },
    open: {
      width: '18rem',
    },
  } as const satisfies Variants

  const contentVariants = {
    closed: {
      transform: 'translateX(-50%)',
      opacity: 0,
      filter: 'blur(2px)',
    },
    open: {
      transform: 'translateX(0%)',
      opacity: 1,
      filter: 'blur(0px)',
    },
  } as const satisfies Variants

  return (
    <>
      <HamburgerMenu isPinned={isPinned} setIsPinned={handlePinSidebar} />
      <motion.nav
        className="fixed inset-0 left-0 z-100 h-screen"
        variants={sidebarVariants}
        initial={defaultVariant}
        animate={isPinned ? 'open' : 'closed'}
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
            'fixed inset-0 z-100 flex w-72 flex-col items-center border-neutral-300/40 border-r bg-neutral-50 p-4 backdrop-blur-md dark:border-neutral-700/40 dark:bg-neutral-900',
            {
              'top-1 bottom-1 rounded-r-xl border shadow-black/20 shadow-lg':
                !isPinned,
            },
          )}
          variants={contentVariants}
          initial={defaultVariant}
          animate={isPinned ? 'open' : 'closed'}
          whileHover="open"
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 40,
            ease: 'easeInOut',
            duration: 0.2,
          }}
        >
          <header className="flex w-full items-center justify-between">
            <Link href="/">
              <Logo className="text-neutral-900 dark:text-white" />
            </Link>
          </header>

          <div className="my-10 flex w-full flex-1 flex-col gap-4">
            {!data.length ? (
              <div className="flex flex-1 flex-col items-center justify-center rounded-md border border-neutral-400/70 border-dashed font-medium text-neutral-400 text-xs dark:border-neutral-700/70">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  className="fill-neutral-400/70 dark:fill-neutral-700/70"
                  viewBox="0 0 256 256"
                >
                  <path d="M92,96a4,4,0,0,1,4-4h64a4,4,0,0,1,0,8H96A4,4,0,0,1,92,96Zm4,36h64a4,4,0,0,0,0-8H96a4,4,0,0,0,0,8Zm32,24H96a4,4,0,0,0,0,8h32a4,4,0,0,0,0-8ZM220,48V156.69a11.9,11.9,0,0,1-3.52,8.48l-51.31,51.32a11.93,11.93,0,0,1-8.48,3.51H48a12,12,0,0,1-12-12V48A12,12,0,0,1,48,36H208A12,12,0,0,1,220,48ZM48,212H156V160a4,4,0,0,1,4-4h52V48a4,4,0,0,0-4-4H48a4,4,0,0,0-4,4V208A4,4,0,0,0,48,212Zm158.35-48H164v42.35Z" />
                </svg>
              </div>
            ) : (
              data.map((note) => {
                return (
                  <div key={note.id} className="flex flex-col gap-2">
                    <Link
                      key={note.id}
                      href={`/${note.id}`}
                      className={cn(
                        '-mx-2 flex flex-col justify-between gap-2 rounded-sm px-3 py-3 text-left text-neutral-900 text-sm transition-colors hover:bg-neutral-200 focus:bg-neutral-800 focus:text-white dark:text-neutral-400 dark:hover:bg-neutral-800',
                        {
                          'bg-neutral-100 dark:bg-neutral-950':
                            pathname === `/${note.id}`,
                        },
                      )}
                    >
                      <div className="flex w-full items-center justify-between">
                        <span className="line-clamp-1 max-w-[20ch]">
                          {note.title}
                        </span>
                        <span className="font-mono text-neutral-500 text-xs">
                          <KBD>
                            {format(
                              note.updated_at ?? note.created_at,
                              'MMM dd',
                            )}
                            th
                          </KBD>
                        </span>
                      </div>
                    </Link>
                  </div>
                )
              })
            )}
          </div>
        </motion.div>
      </motion.nav>
    </>
  )
}
