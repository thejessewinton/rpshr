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
        <div className='-mx-[2px] grid gap-4'>
          {lifts.data.map((lift) => {
            return (
              <Link
                key={lift.id}
                href={`/lift/${lift.slug}`}
                className='group relative inline-flex max-w-fit cursor-help items-center justify-center text-sm font-light outline-none transition-colors'
              >
                <span className='text-3xl'>{lift.name}</span>

                <div className='absolute flex h-full w-full items-center justify-center font-mono font-light text-white opacity-0 backdrop-blur-sm transition-all duration-700 group-hover:visible group-hover:opacity-100'>
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
