import { AddLift } from '~/components/lifts/add-lift'
import { LiftsTable } from '~/components/lifts/lifts-table'

export default function LiftsPage() {
  return (
    <div className='mx-auto w-full max-w-4xl flex-1 px-8'>
      <AddLift />
      <LiftsTable />
    </div>
  )
}
