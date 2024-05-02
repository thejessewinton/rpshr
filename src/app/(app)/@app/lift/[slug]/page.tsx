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

  const totalSets = lift.data.dates.reduce((acc, date) => acc + date.sets.length, 0)
  const [currentPR] = lift.data.personal_records

  return (
    <div className='mx-auto w-full max-w-4xl flex-1 animate-fade-in space-y-8 px-8'>
      <AddSet liftSlug={params.slug} liftId={lift.data.id} />
      <div className='h-full self-stretch'>
        <div className='flex items-center justify-between text-sm font-light'>
          <div className='flex flex-col gap-2 font-mono'>
            <span>{lift.data.name}</span>
            <time
              className='text-xs text-neutral-700 dark:text-neutral-400'
              dateTime={lift.data.updated_at?.toDateString()}
            >
              {dayjs(lift.data.updated_at).format('MMM DD')}
            </time>
          </div>
          <div className='flex flex-col gap-2 text-right font-mono'>
            <span>{totalSets} sets</span>
            <span className='text-xs text-neutral-700 dark:text-neutral-400'>
              Your latest PR is {currentPR?.weight}
              {currentPR?.unit}
            </span>
          </div>
        </div>
        <div className='mt-32 flex flex-nowrap items-end overflow-x-auto'>
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
                          height: `${(set.reps * set.weight) / 60}px`
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
    </div>
  )
}
