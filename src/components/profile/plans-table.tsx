'use client'

import { api } from '~/trpc/react'

export const PlansTable = () => {
  const plans = api.plans.getAllPlans.useQuery()

  if (!plans.data) return null

  return (
    <div className='animate-fade-in'>
      {plans.data.map((plan) => {
        return <div key={plan.id}>{plan.amount}</div>
      })}
    </div>
  )
}
