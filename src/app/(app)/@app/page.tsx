'use client'

import Link from 'next/link'

import { AddLift } from '~/components/lifts/add-lift'
import { useCursorStore } from '~/state/use-cursor-store'
import { api } from '~/trpc/react'
import { classNames } from '~/utils/core'

export default function LiftsPage() {
  const lifts = api.lifts.getAllLifts.useQuery()
  const { setText } = useCursorStore()

  if (!lifts.data) return null

  return (
    <div className='mx-auto flex-1 space-y-2 px-8'>
      <AddLift />

      <div className='mb-16 animate-fade-in'>
        <div className='group/parent -mx-[2px] grid max-w-fit gap-4 overflow-hidden' onMouseOut={() => setText('')}>
          {lifts.data.map((lift) => {
            return (
              <Link
                key={lift.id}
                href={`/lift/${lift.slug}`}
                className={classNames(
                  'group relative inline-flex w-full items-end font-light outline-none',
                  'after:absolute after:-right-1/2 after:h-full after:w-full'
                )}
                onMouseOver={() => setText(`${lift.personal_records[0]?.weight}`)}
              >
                <h2 className='text-3xl leading-tight transition-all group-hover/parent:opacity-40 group-hover:!opacity-100 group-hover/parent:blur-sm group-hover:!blur-none'>
                  {lift.name}
                </h2>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
