import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    APP_URL: z.string().url(),
    AUTH_GOOGLE_ID: z.string(),
    AUTH_GOOGLE_SECRET: z.string(),
    AUTH_SECRET: z.string(),
    DATABASE_URL: z.string().url(),
    EDGE_CONFIG: z.string(),
    LOGSNAG_API_KEY: z.string(),
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    AUTH_RESEND_KEY: z.string(),
    WAITLIST_AUDIENCE_ID: z.string()
  },
  client: {},
  runtimeEnv: {
    APP_URL: process.env.APP_URL,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    AUTH_SECRET: process.env.AUTH_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    EDGE_CONFIG: process.env.EDGE_CONFIG,
    LOGSNAG_API_KEY: process.env.LOGSNAG_API_KEY,
    NODE_ENV: process.env.NODE_ENV,
    AUTH_RESEND_KEY: process.env.AUTH_RESEND_KEY,
    WAITLIST_AUDIENCE_ID: process.env.WAITLIST_AUDIENCE_ID
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true
})
