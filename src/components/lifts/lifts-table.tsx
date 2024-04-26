'use client'

import Link from 'next/link'

import { TrashSimple } from '@phosphor-icons/react'
import { Bar, BarChart, ResponsiveContainer } from 'recharts'
import { sortBy } from 'remeda'
import { toast } from 'sonner'

import { api } from '~/trpc/react'
import { type RouterOutputs } from '~/trpc/shared'
import { classNames } from '~/utils/core'
import dayjs, { getDaysBetween } from '~/utils/date'
import { ContextMenu } from '../shared/context-menu'

export const LiftsTable = () => {
  const lifts = api.lifts.getAllLifts.useQuery()

  if (!lifts.data) return null

  return (
    <div className='mb-16 animate-fade-in overflow-x-auto'>
      {lifts.data.map((lift) => {
        return <LiftRow lift={lift} />
      })}
    </div>
  )
}

const LiftRow = ({ lift }: { lift: RouterOutputs['lifts']['getAllLifts'][number] }) => {
  const utils = api.useUtils()
  const deleteLift = api.lifts.deleteLift.useMutation({
    onSuccess: (data) => {
      toast.success(data.message)
      utils.lifts.getAllLifts.invalidate()
    }
  })

  return (
    <ContextMenu>
      <Link href={`/lift/${lift.slug}`}>
        <ContextMenu.Trigger asChild>
          <div className='flex items-center justify-between px-4 pb-2 pt-6'>
            <span className='w-fit self-end text-nowrap text-sm text-neutral-700 dark:text-neutral-400'>
              {lift.name}
            </span>
            <Chart lift={lift} key={lift.id} />
          </div>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item onSelect={() => deleteLift.mutate({ id: lift.id })}>
            <div className='flex items-center gap-3'>
              <TrashSimple className='size-4 text-neutral-700 dark:text-white' />
              <span className='max-w-[20ch] overflow-hidden text-ellipsis text-nowrap'>Delete lift</span>
            </div>
          </ContextMenu.Item>
        </ContextMenu.Content>
      </Link>
    </ContextMenu>
  )
}

type ChartProps = {
  lift: RouterOutputs['lifts']['getAllLifts'][number]
  className?: string
}

const Chart = ({ lift, className }: ChartProps) => {
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
    <ResponsiveContainer className={classNames('relative h-full min-h-16 max-w-[75%] pl-4', className)}>
      <BarChart defaultShowTooltip={false} data={data}>
        <Bar dataKey='weight' minPointSize={18} barSize={1} className='fill-neutral-400 dark:fill-neutral-700' />
      </BarChart>
    </ResponsiveContainer>
  )
}
