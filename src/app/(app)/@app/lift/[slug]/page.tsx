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

  const totalSets = lift.data.dates.reduce((acc, date) => acc + date.numberOfSets, 0)
  const [currentPR] = lift.data.personal_records

  return (
    <div className='mx-auto w-full flex-1 animate-fade-in'>
      <div className='mx-auto w-full max-w-4xl space-y-8 px-8'>
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
        </div>
      </div>
      <div className='flex min-h-96 items-center overflow-x-auto'>
        <div className='flex flex-nowrap items-end px-4 md:pl-32'>
          {lift.data.dates.map((date) => {
            return (
              <div key={date.date} className='group min-h-8 shrink-0 px-1 transition-colors'>
                <div
                  className={classNames('flex min-h-8 w-px flex-col gap-1 rounded', {
                    'bg-neutral-700': dayjs(date.date).date() !== 1,
                    'bg-orange-600': dayjs(date.date).date() === 1
                  })}
                >
                  {date.groups.map(([key, values]) => {
                    return (
                      <div className='group relative' key={key}>
                        {values.map((set) => {
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
