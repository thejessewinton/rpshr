import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { type DefaultSession, type NextAuthConfig } from 'next-auth'
import Google from 'next-auth/providers/google'

import { db } from '~/server/db'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
    } & DefaultSession['user']
  }
}

export const authConfig = {
  callbacks: {
    session: async ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id
        }
      }
    },
    authorized({ auth }) {
      return !!auth?.user
    }
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login'
  },
  adapter: DrizzleAdapter(db),
  providers: [Google]
} satisfies NextAuthConfig
