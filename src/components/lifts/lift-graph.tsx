'use client'

import * as Tooltip from '@radix-ui/react-tooltip'

import { api } from '~/trpc/react'
import { classNames } from '~/utils/core'

export const LiftGraph = () => {
  const { data } = api.activity.getAll.useQuery()

  if (!data) return null

  return (
    <div className='flex flex-1 animate-fade-in flex-col justify-center overflow-x-auto pl-8 pr-8 md:pl-32'>
      <Tooltip.Provider delayDuration={0}>
        <div className='flex items-end gap-2'>
          {data.map(({ day, lifts }, i) => {
            return (
              <Tooltip.Root key={i}>
                <Tooltip.Trigger
                  className={classNames('relative flex w-px shrink-0 flex-col gap-1 rounded-lg', {
                    'h-12 bg-orange-500 dark:bg-orange-600': day.isFirstOfMonth,
                    'h-8 bg-neutral-400 dark:bg-neutral-700': !day.isFirstOfMonth
                  })}
                >
                  {lifts.map((lift, i) => {
                    return (
                      <>
                        <div key={i} className={classNames('absolute bottom-0 left-0 h-20 w-px bg-white')} />
                        <Tooltip.Content
                          side='bottom'
                          className='mt-2 font-mono text-xs font-light text-neutral-700 radix-state-closed:animate-fade-out radix-state-delayed-open:animate-fade-in dark:text-neutral-400'
                        >
                          {lift.sets.length}
                        </Tooltip.Content>
                      </>
                    )
                  })}
                </Tooltip.Trigger>
              </Tooltip.Root>
            )
          })}
        </div>
      </Tooltip.Provider>
    </div>
  )
}
