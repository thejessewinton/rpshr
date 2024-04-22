'use client'

import { type ComponentPropsWithoutRef } from 'react'

import { Barbell, BatteryCharging } from '@phosphor-icons/react'
import { Bar, BarChart, ResponsiveContainer, Tooltip, type TooltipProps } from 'recharts'
import { type NameType, type ValueType } from 'recharts/types/component/DefaultTooltipContent'
import { sortBy } from 'remeda'

import { api } from '~/trpc/react'
import { type RouterOutputs } from '~/trpc/shared'
import { classNames } from '~/utils/core'
import dayjs, { getDaysBetween } from '~/utils/date'
import { AddSet } from '../sets/add-set'

export const LiftChart = ({ slug }: { slug: string }) => {
  const lift = api.lifts.getBySlug.useQuery({ slug })

  if (!lift.data) return null

  return (
    <div className='flex flex-col px-8 text-sm'>
      <div className='flex items-center justify-between gap-5'>
        <AddSet liftSlug={slug} liftId={lift.data.id} />
        <div className='text-nowrap font-mono text-neutral-700 dark:text-neutral-400'>{lift.data.sets.length} Sets</div>
      </div>
      <div className='animate-fade-in divide-y divide-neutral-700/30 overflow-x-auto'>
        <Chart lift={lift.data} />
      </div>
    </div>
  )
}

type ChartProps = {
  lift: NonNullable<RouterOutputs['lifts']['getBySlug']>
} & ComponentPropsWithoutRef<'div'>

const Chart = ({ lift, className, ...props }: ChartProps) => {
  const dates = getDaysBetween(dayjs().subtract(90, 'days'), dayjs())

  const data = dates.map((date) => {
    const sets = lift.sets.filter((set) => dayjs(set.date).isSame(dayjs(date), 'date'))
    const [latestSet] = sortBy(sets, [(s) => s.date, 'desc'])

    if (!latestSet) return { day: dayjs(date).format('MMM, DD'), weight: 0, estimatedMax: undefined }

    return {
      day: dayjs(date).format('MMM, DD'),
      weight: latestSet.weight,
      className: sets.length ? 'fill-orange-600' : undefined
    }
  })

  return (
    <div className={classNames('flex items-end justify-between pb-2 pt-6', className)} {...props}>
      <div className='w-fit text-nowrap font-mono text-xs text-neutral-400 dark:text-neutral-200'></div>
      <ResponsiveContainer className='relative h-full min-h-32 w-full'>
        <BarChart defaultShowTooltip={false} data={data}>
          <Tooltip cursor={false} content={<CustomTooltip />} />
          <Bar dataKey='weight' minPointSize={32} barSize={1} className='fill-neutral-400 dark:fill-neutral-700' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

interface CustomTooltipProps extends TooltipProps<ValueType, NameType> {
  payload?: Array<{
    name: string
    value: number
    payload: { day: string; weight: number; estimatedMax: number; className?: string }
  }>
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (!active) return null

  return (
    <div className={classNames('flex flex-col gap-1 font-mono text-xs', 'text-neutral-700', 'dark:text-neutral-400')}>
      {payload?.map((p) => {
        return (
          <div key={p.name} className='flex flex-col gap-1'>
            <span>{p.payload.day}</span>
            <span>
              {p.payload.weight === 0 ? (
                <div className='flex gap-2'>
                  <BatteryCharging className='size-4' /> <span>Rest</span>
                </div>
              ) : (
                <div className='flex gap-2'>
                  <Barbell className='size-4' /> <span>{`${p.payload.weight}lbs.`}</span>
                </div>
              )}
            </span>
          </div>
        )
      })}
    </div>
  )
}
