'use client'

import { LiftChart } from '~/components/lifts/lift-chart'
import { AddSet } from '~/components/sets/add-set'
import { api } from '~/trpc/react'

type LiftPageParams = {
  params: {
    slug: string
  }
}

export default function LiftPage({ params }: LiftPageParams) {
  const lift = api.lifts.getBySlug.useQuery({ slug: params.slug })

  if (!lift.data) return null

  return (
    <div className='flex animate-fade-in flex-col px-8 text-sm'>
      <div className='flex items-center justify-between gap-5'>
        <AddSet liftSlug={params.slug} liftId={lift.data.id} />
        <div className='space-y-2 text-right'>
          {lift.data.name}
          <div className='text-nowrap font-mono text-neutral-700 dark:text-neutral-400'>
            {lift.data.sets.length} Sets
          </div>
        </div>
      </div>
      <LiftChart lift={lift.data} />
    </div>
  )
}
