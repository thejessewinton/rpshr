import 'server-only';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { env } from '~/env';
import { db } from '~/server/db';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
});

export const getSessionData = async (requestHeaders: Headers) => {
  'use cache';
  return await auth.api.getSession({
    headers: requestHeaders,
  });
};
