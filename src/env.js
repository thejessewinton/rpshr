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
    RESEND_API_KEY: z.string(),
    STRIPE_SECRET_KEY: z.string(),
    STRIPE_WEBHOOK_SECRET: z.string(),
    WAITLIST_AUDIENCE_ID: z.string()
  },
  client: {
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: z.string()
  },
  runtimeEnv: {
    APP_URL: process.env.APP_URL,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    AUTH_SECRET: process.env.AUTH_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    EDGE_CONFIG: process.env.EDGE_CONFIG,
    LOGSNAG_API_KEY: process.env.LOGSNAG_API_KEY,
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
    NODE_ENV: process.env.NODE_ENV,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    WAITLIST_AUDIENCE_ID: process.env.WAITLIST_AUDIENCE_ID
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true
})
