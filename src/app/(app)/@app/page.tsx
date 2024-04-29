'use client'

import Link from 'next/link'

import dayjs from 'dayjs'

import { AddLift } from '~/components/lifts/add-lift'
import { Marble } from '~/components/shared/marble'
import { api } from '~/trpc/react'

export default function LiftsPage() {
  const lifts = api.lifts.getAllLifts.useQuery()

  return (
    <div className='mx-auto w-full max-w-4xl flex-1 space-y-8 px-8'>
      <AddLift />
      {!lifts.data ? null : (
        <div className='mb-16 animate-fade-in overflow-x-auto'>
          <div className='flex items-center justify-between border-b border-neutral-200/70 py-2 text-sm font-light text-neutral-900 dark:border-neutral-700/30 dark:text-neutral-200'>
            <span>Lift</span>
            <span>Last updated</span>
          </div>
          <div className='flex flex-col'>
            {lifts.data.map((lift) => {
              return (
                <Link
                  key={lift.id}
                  href={`/lift/${lift.slug}`}
                  className='flex items-center justify-between py-3 text-sm font-light text-neutral-700 dark:text-neutral-400'
                >
                  <div className='flex items-center gap-4'>
                    <Marble>{lift.name}</Marble>
                    <span>{lift.name}</span>
                  </div>
                  <time dateTime={lift.updated_at ? lift.updated_at.toDateString() : lift.created_at?.toDateString()}>
                    {dayjs(lift.updated_at ? lift.updated_at : lift.created_at).format('MM/DD')}
                  </time>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
