'use client'

import { type RouterOutputs } from '~/trpc/shared'
import { classNames, getAllDaysInYear } from '~/utils/core'

export const LiftChart = ({ lift }: { lift: RouterOutputs['lifts']['getLiftBySlug'] }) => {
  if (!lift) return null

  const dates = getAllDaysInYear()

  return (
    <div className='flex flex-nowrap overflow-x-scroll'>
      {dates.map((date) => {
        return (
          <div key={date.date.toISOString()} className='group peer h-20 shrink-0 px-1 transition-colors'>
            <div
              className={classNames('h-full w-px', {
                'bg-orange-700 group-hover:bg-orange-500': date.isFirstOfMonth,
                'group-hover:bg-neutral-500/70 dark:bg-neutral-700/70': !date.isFirstOfMonth
              })}
            ></div>
          </div>
        )
      })}
    </div>
  )
}
