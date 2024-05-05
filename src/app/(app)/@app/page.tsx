'use client'

import Link from 'next/link'

import { AddLift } from '~/components/lifts/add-lift'
import { api } from '~/trpc/react'

export default function LiftsPage() {
  const lifts = api.lifts.getAllLifts.useQuery()

  if (!lifts.data) return null

  return (
    <div className='mx-auto w-full max-w-4xl flex-1 space-y-8 px-8'>
      <AddLift />

      <div className='mb-16 animate-fade-in'>
        <div className='mb-4 flex items-center justify-between border-b border-neutral-200/70 px-4 pb-4 text-xs dark:border-neutral-700/20'>
          <span>Lift</span>
          <span>PR</span>
        </div>
        <div className='-mx-[2px] flex flex-col gap-4'>
          {lifts.data.map((lift) => {
            return (
              <Link
                key={lift.id}
                href={`/lift/${lift.slug}`}
                className='flex items-center justify-between rounded p-4 text-sm font-light outline-none transition-colors hover:dark:bg-neutral-700/20 focus:dark:bg-neutral-700/20'
              >
                <div className='flex items-center gap-4'>
                  <span className='text-neutral-700 dark:text-white'>{lift.name}</span>
                </div>
                <span className='font-mono font-light text-neutral-700 dark:text-neutral-400'>
                  {lift.personal_records[0]?.weight}lbs
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
