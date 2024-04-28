'use client'

import { AddSet } from '~/components/sets/add-set'
import { api } from '~/trpc/react'
import { classNames } from '~/utils/core'
import dayjs from '~/utils/date'

type LiftPageParams = {
  params: {
    slug: string
  }
}

export default function LiftPage({ params }: LiftPageParams) {
  const lift = api.lifts.getLiftBySlug.useQuery({ slug: params.slug })

  if (!lift.data) return null

  return (
    <div className='flex min-h-screen flex-col px-8'>
      <AddSet liftSlug={params.slug} liftId={lift.data.id} />
      <div className='flex flex-nowrap items-end justify-end overflow-x-hidden'>
        {lift.data.dates.map((date) => {
          return (
            <div key={date.date} className='group min-h-8 shrink-0 px-1 transition-colors'>
              <div
                className={classNames('flex min-h-8 w-px flex-col gap-1 rounded', {
                  'bg-neutral-700': dayjs(date.date).date() !== 1,
                  'bg-orange-800': dayjs(date.date).date() === 1
                })}
              >
                {date.sets.map((set) => {
                  return (
                    <div
                      key={set.id}
                      className='w-px flex-shrink-0 rounded bg-white'
                      style={{
                        height: `${(set.reps * set.weight) / 20}px`
                      }}
                    />
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
