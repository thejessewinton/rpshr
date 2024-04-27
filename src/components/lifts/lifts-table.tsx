'use client'

import Link from 'next/link'

import { TrashSimple } from '@phosphor-icons/react'
import { toast } from 'sonner'

import { ContextMenu } from '~/components/shared/context-menu'
import { api } from '~/trpc/react'
import { type RouterOutputs } from '~/trpc/shared'

export const LiftsTable = () => {
  const lifts = api.lifts.getAllLifts.useQuery()

  if (!lifts.data) return null

  return (
    <div className='mb-16 animate-fade-in overflow-x-auto'>
      {lifts.data.map((lift) => {
        return <LiftRow key={lift.id} lift={lift} />
      })}
    </div>
  )
}

export const LiftRow = ({ lift }: { lift: RouterOutputs['lifts']['getAllLifts'][number] }) => {
  const utils = api.useUtils()
  const deleteLift = api.lifts.deleteLift.useMutation({
    onSuccess: async (data) => {
      toast.success(data.message)
      await utils.lifts.getAllLifts.invalidate()
    }
  })

  return (
    <ContextMenu>
      <Link href={`/lift/${lift.slug}`}>
        <ContextMenu.Trigger>{lift.name}</ContextMenu.Trigger>
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
