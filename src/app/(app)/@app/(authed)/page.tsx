'use client'

import Link from 'next/link'

import dayjs from 'dayjs'

import { AddLift } from '~/components/lifts/add-lift'
import { LiftRow } from '~/components/lifts/lifts-table'
import { api } from '~/trpc/react'

export default function LiftsPage() {
  const lifts = api.lifts.getAllLifts.useQuery()

  return (
    <div className='mx-auto w-full max-w-4xl flex-1 px-8'>
      <AddLift />
      {!lifts.data ? null : (
        <div className='mb-16 animate-fade-in overflow-x-auto'>
          <div className='flex items-center justify-between border-b border-neutral-700/70 py-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100'>
            <span>Lift</span>
            <span>Last updated</span>
          </div>
          {lifts.data.map((lift) => {
            return (
              <Link
                href={`/lift/${lift.slug}`}
                className='flex items-center justify-between py-2 text-sm font-light text-neutral-700 dark:text-neutral-400'
              >
                <span>{lift.name}</span>
                <time dateTime={lift.updated_at ? lift.updated_at.toDateString() : lift.created_at?.toDateString()}>
                  {dayjs(lift.updated_at ? lift.updated_at : lift.created_at).format('MMM DD, YYYY')}
                </time>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
