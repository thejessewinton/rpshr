import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    APP_URL: z.string().url(),
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    AUTH_SECRET: z.string(),
    AUTH_GOOGLE_ID: z.string(),
    AUTH_GOOGLE_SECRET: z.string(),
    RESEND_API_KEY: z.string(),
    LOGSNAG_API_KEY: z.string(),
    WAITLIST_AUDIENCE_ID: z.string()
  },
  client: {},
  runtimeEnv: {
    APP_URL: process.env.APP_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    LOGSNAG_API_KEY: process.env.LOGSNAG_API_KEY,
    WAITLIST_AUDIENCE_ID: process.env.WAITLIST_AUDIENCE_ID
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true
})
