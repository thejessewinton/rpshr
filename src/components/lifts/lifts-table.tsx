'use client'

import { type ComponentPropsWithoutRef } from 'react'
import Link from 'next/link'

import { Barbell, BatteryCharging } from '@phosphor-icons/react'
import { Bar, BarChart, ResponsiveContainer, Tooltip, type TooltipProps } from 'recharts'
import { type NameType, type ValueType } from 'recharts/types/component/DefaultTooltipContent'
import { sortBy } from 'remeda'

import { api } from '~/trpc/react'
import { type RouterOutputs } from '~/trpc/shared'
import { classNames } from '~/utils/core'
import dayjs, { getDaysBetween } from '~/utils/date'

export const LiftsTable = () => {
  const lifts = api.lifts.getAll.useQuery()

  if (!lifts.data) return null

  return (
    <div className='mb-16 animate-fade-in divide-y divide-neutral-700/30 overflow-x-auto'>
      {lifts.data.map((lift) => {
        return <Chart lift={lift} key={lift.id} />
      })}
    </div>
  )
}

type ChartProps = {
  lift: RouterOutputs['lifts']['getAll'][number]
} & ComponentPropsWithoutRef<'div'>

const Chart = ({ lift, className, ...props }: ChartProps) => {
  const dates = getDaysBetween(dayjs().subtract(60, 'days'), dayjs())

  const data = dates.map((date) => {
    const sets = lift.sets.filter((set) => dayjs(set.date).isSame(dayjs(date), 'day'))
    const [setWithHighestWeight] = sortBy(sets, [(s) => s.weight, 'desc'])

    if (!setWithHighestWeight) return { day: dayjs(date).format('MMM, DD'), weight: 0, estimatedMax: 0 }

    const { weight } = setWithHighestWeight

    return {
      day: dayjs(date).format('MMM, DD'),
      weight,
      className: sets.length ? 'fill-orange-600' : undefined
    }
  })

  return (
    <div className={classNames('flex items-end justify-between pb-2 pt-6', className)} {...props}>
      <Link
        href={`/lift/${lift.slug}`}
        className='w-fit text-nowrap font-mono text-xs text-neutral-400 dark:text-neutral-200'
      >
        {lift.name}
      </Link>
      <ResponsiveContainer className='relative h-full min-h-16 w-full pl-4'>
        <BarChart defaultShowTooltip={false} data={data}>
          <Tooltip position={{ y: -20 }} cursor={false} content={<CustomTooltip />} />
          <Bar dataKey='weight' minPointSize={18} barSize={1} className='fill-neutral-400 dark:fill-neutral-700' />
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
