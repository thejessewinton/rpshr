import { createSafeActionClient } from 'next-safe-action'

import { auth } from '~/server/auth'

export const publicAction = createSafeActionClient()

export const protectedAction = createSafeActionClient({
  middleware: async (parsedInput) => {
    const session = await auth()

    if (!session) {
      throw new Error('Unauthorized')
    }

    return { id: session.user.id, ...parsedInput }
  }
})
