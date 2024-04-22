import { LiftChart } from '~/components/lifts/lift-chart'
import { AddSet } from '~/components/sets/add-set'

type LiftPageParams = {
  params: {
    slug: string
  }
}

export default function LiftPage({ params }: LiftPageParams) {
  return (
    <div className='px-8'>
      <LiftChart slug={params.slug} />
    </div>
  )
}
