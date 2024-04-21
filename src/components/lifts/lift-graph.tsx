'use client'

import * as Tooltip from '@radix-ui/react-tooltip'

import { classNames, getAllDaysInYear } from '~/utils/core'

export const LiftGraph = () => {
  const year = getAllDaysInYear()

  return (
    <div className='flex flex-1 flex-col justify-center overflow-x-auto pl-8 pr-8 md:pl-32'>
      <Tooltip.Provider delayDuration={0}>
        <div className='flex items-end gap-2'>
          {year.map((day) => {
            return (
              <Tooltip.Root key={day.date.date()}>
                <Tooltip.Trigger
                  className={classNames('relative flex w-px shrink-0 rounded-lg', {
                    'h-12 bg-orange-500 dark:bg-orange-600': day.isFirstOfMonth,
                    'h-8 bg-neutral-200 dark:bg-neutral-700': !day.isFirstOfMonth
                  })}
                />
                <Tooltip.Content
                  side='bottom'
                  className='mt-2 font-mono text-xs font-light text-neutral-700 radix-state-closed:animate-fade-out radix-state-delayed-open:animate-fade-in dark:text-neutral-400'
                >
                  {day.date.format('MMM D')}
                </Tooltip.Content>
              </Tooltip.Root>
            )
          })}
        </div>
      </Tooltip.Provider>
    </div>
  )
}
