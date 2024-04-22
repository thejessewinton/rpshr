'use server'

import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { db } from '~/server/db'
import { users, waitlist } from '~/server/db/schema'
import { logsnag } from '~/server/logsnag'

type FormState = {
  message: string
  success?: boolean
}

export const waitlistAction = async (prevState: FormState, formData: FormData) => {
  const schema = zfd.formData({
    email: z.string().email()
  })

  const { success, data } = await schema.safeParseAsync(formData)

  if (!success) return { success: true, message: 'Please enter a valid email.' }

  const emailCollisions = await db.query.waitlist.findMany({
    where: eq(users.email, data.email)
  })

  if (emailCollisions.length > 0) {
    return {
      success: true,
      message: 'You are already on the waitlist.'
    }
  }

  await logsnag.track({
    channel: 'waitlist',
    event: 'New Waitlist Signup',
    user_id: data.email,
    icon: '🚀',
    notify: true
  })

  await db.insert(waitlist).values({
    email: data.email
  })

  return {
    success: true,
    message: `You'll be notified when rpshr launches.`
  }
}
