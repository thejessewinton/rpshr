'use client'

import Link from 'next/link'

import { AddLift } from '~/components/lifts/add-lift'
import { api } from '~/trpc/react'

export default function LiftsPage() {
  const lifts = api.lifts.getAllLifts.useQuery()

  if (!lifts.data) return null

  return (
    <div className='mx-auto flex-1 space-y-2 px-8'>
      <AddLift />

      <div className='mb-16 animate-fade-in'>
        <div className='-mx-[2px] space-x-4 space-y-4'>
          {lifts.data.map((lift) => {
            return (
              <Link
                key={lift.id}
                href={`/lift/${lift.slug}`}
                className='group relative inline-flex cursor-help items-center justify-center overflow-hidden rounded-full border border-neutral-700/90 px-8 py-2 text-sm font-light outline-none transition-colors'
              >
                <span className='text-3xl'>{lift.name}</span>

                <div className='invisible absolute flex h-full w-full items-center justify-center bg-orange-800/80 font-mono font-light text-neutral-700 opacity-0 backdrop-blur-xl transition-all group-hover:visible group-hover:opacity-100'>
                  {lift.personal_records[0]?.weight}lbs
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
