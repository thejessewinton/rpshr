import { LiftChart } from '~/components/lifts/lift-chart'

type LiftPageParams = {
  params: {
    slug: string
  }
}

export default function LiftPage({ params }: LiftPageParams) {
  return <LiftChart slug={params.slug} />
}
