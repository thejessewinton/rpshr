import { LogSnag } from 'logsnag'

import { env } from '~/env'

export const logsnag = new LogSnag({
  token: env.LOGSNAG_API_KEY,
  project: 'rpshr'
})
