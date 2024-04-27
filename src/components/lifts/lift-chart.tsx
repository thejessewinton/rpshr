'use client'

import { type ComponentProps } from 'react'

import { type RouterOutputs } from '~/trpc/shared'
import { classNames } from '~/utils/core'
import { getAllDaysInYear } from '~/utils/date'

type LiftChartProps = { lift: RouterOutputs['lifts']['getLiftBySlug'] } & ComponentProps<'div'>

export const LiftChart = ({ lift, className, ...props }: LiftChartProps) => {
  if (!lift) return null

  const dates = getAllDaysInYear()

  return (
    <div className='flex flex-nowrap justify-self-center overflow-x-hidden'>
      {dates.map((date) => {
        return (
          <div
            key={date.date.toISOString()}
            className={classNames('group peer h-20 shrink-0 px-1 transition-colors', className)}
            {...props}
          >
            <div
              className={classNames('h-full w-px', {
                'bg-orange-700 group-hover:bg-orange-500': date.isFirstOfMonth,
                'group-hover:bg-neutral-500/70 dark:bg-neutral-700/70': !date.isFirstOfMonth
              })}
            />
          </div>
        )
      })}
    </div>
  )
}
