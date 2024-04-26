'use client'

import { type RouterOutputs } from '~/trpc/shared'
import { classNames, getAllDaysInYear } from '~/utils/core'
import s from './lift-chart.module.css'

export const LiftChart = ({ lift }: { lift: RouterOutputs['lifts']['getLiftBySlug'] }) => {
  if (!lift) return null

  const dates = getAllDaysInYear()

  return (
    <div className='flex flex-nowrap'>
      {dates.map((date) => {
        return (
          <label
            key={date.date.toString()}
            className={classNames(
              'line h-20 shrink-0 px-1 transition-transform duration-200 hover:scale-y-125',
              s.line
            )}
          >
            <input type='radio' name='line' className='absolute m-0 h-0 w-0 p-0' />
            <div
              className={classNames('h-full w-px', {
                'bg-orange-700': date.isFirstOfMonth,
                'dark:bg-neutral-700/70': !date.isFirstOfMonth
              })}
            ></div>
          </label>
        )
      })}
    </div>
  )
}
