'use server'

import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { env } from '~/env'
import { publicAction } from '~/server/actions'
import { logsnag } from '~/server/logsnag'
import { resend } from '~/server/resend'

const schema = zfd.formData({
  email: z.string().email()
})

export const waitlist = publicAction(schema, async ({ email }) => {
  await resend.contacts.create({
    email: email,
    audienceId: env.WAITLIST_AUDIENCE_ID
  })

  await logsnag.track({
    channel: 'waitlist',
    event: 'New Waitlist Signup',
    user_id: email,
    icon: '🚀',
    notify: true
  })

  return {
    success: true,
    message: `You'll be notified when rpshr launches.`
  }
})
