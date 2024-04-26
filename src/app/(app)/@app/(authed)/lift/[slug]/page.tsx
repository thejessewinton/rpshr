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
  const lift = api.lifts.getLiftBySlug.useQuery({ slug: params.slug })

  if (!lift.data) return null

  return (
    <div className='relative flex animate-fade-in flex-col px-8 text-sm'>
      <AddSet liftSlug={params.slug} liftId={lift.data.id} />
      <LiftChart lift={lift.data} />
    </div>
  )
}
