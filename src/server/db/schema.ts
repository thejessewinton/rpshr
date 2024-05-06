import { randomUUID } from 'crypto'

import type { AdapterAccount } from '@auth/core/adapters'
import { relations, sql } from 'drizzle-orm'
import {
  bigint,
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar
} from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'

// Necessary for Next Auth
export const users = pgTable('user', {
  id: varchar('id', { length: 255 }).notNull().primaryKey(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull(),
  emailVerified: timestamp('emailVerified', {
    mode: 'date'
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar('image', { length: 255 })
})

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  lifts: many(lift),
  sets: many(set)
}))

export const accounts = pgTable(
  'account',
  {
    userId: varchar('userId', { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar('type', { length: 255 }).$type<AdapterAccount['type']>().notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    providerAccountId: varchar('providerAccountId', { length: 255 }).notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: varchar('token_type', { length: 255 }),
    scope: varchar('scope', { length: 255 }),
    id_token: text('id_token'),
    session_state: varchar('session_state', { length: 255 })
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId]
    }),
    userIdIdx: index('account_userId_idx').on(account.userId)
  })
)
export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] })
}))

export const sessions = pgTable(
  'session',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => randomUUID()),
    sessionToken: text('sessionToken').notNull().unique(),
    userId: varchar('userId', { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    expires: timestamp('expires', { mode: 'date' }).notNull()
  },
  (session) => ({
    userIdIdx: index('session_userId_idx').on(session.userId)
  })
)

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] })
}))

export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: varchar('identifier', { length: 255 }).notNull(),
    token: varchar('token', { length: 255 }).notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull()
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] })
  })
)

const lifecycleDates = {
  created_at: timestamp('created_at', { mode: 'date' }).$defaultFn(() => new Date()),
  updated_at: timestamp('updated_at')
    .default(sql`CURRENT_TIMESTAMP(3)`)
    .$onUpdateFn(() => new Date())
}

// Units, Lifts, and Sets
export const units = ['kgs', 'lbs'] as const
export const unitEmum = pgEnum('value', units)

export const lift = pgTable(
  'lift',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).$default(randomUUID).notNull(),
    user_id: varchar('user_id', { length: 255 })
      .notNull()
      .references(() => users.id),
    ...lifecycleDates
  },
  (lift) => ({
    userIdIdx: index('lift_userId_idx').on(lift.user_id)
  })
)

export const liftInsertSchema = createInsertSchema(lift)

export const liftRelations = relations(lift, ({ one, many }) => ({
  user: one(users, { fields: [lift.user_id], references: [users.id] }),
  sets: many(set),
  personal_records: many(personalRecord)
}))

export const personalRecord = pgTable('personal_record', {
  id: serial('id').primaryKey(),
  user_id: varchar('user_id', { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  lift_id: bigint('lift_id', { mode: 'number' }).references(() => lift.id, { onDelete: 'cascade' }),
  weight: bigint('weight', { mode: 'number' }).notNull(),
  unit: unitEmum('unit').notNull().default('lbs'),
  date: timestamp('date', { mode: 'date' }).default(sql`CURRENT_TIMESTAMP`),
  ...lifecycleDates
})

export const personalRecordInsertSchema = createInsertSchema(personalRecord)

export const personalRecordRelations = relations(personalRecord, ({ one }) => ({
  user: one(users, { fields: [personalRecord.user_id], references: [users.id] }),
  lift: one(lift, { fields: [personalRecord.lift_id], references: [lift.id] })
}))

export const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const
export const dayEnum = pgEnum('day', days)

export const set = pgTable(
  'set',
  {
    id: serial('id').primaryKey(),
    user_id: varchar('user_id', { length: 255 })
      .notNull()
      .references(() => users.id),
    reps: bigint('reps', { mode: 'number' }).notNull(),
    weight: bigint('weight', { mode: 'number' }).notNull(),
    unit: unitEmum('unit').notNull().default('lbs'),
    date: timestamp('date', {
      mode: 'date'
    })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    notes: text('notes'),
    lift_id: bigint('lift_id', { mode: 'number' }).references(() => lift.id, { onDelete: 'cascade' }),
    ...lifecycleDates
  },
  (set) => ({
    userIdIdx: index('set_userId_idx').on(set.user_id),
    liftIdIdx: index('set_liftId_idx').on(set.lift_id)
  })
)

export const setInsertSchema = createInsertSchema(set)

export const setRelations = relations(set, ({ one }) => ({
  user: one(users, { fields: [set.user_id], references: [users.id] }),
  lift: one(lift, { fields: [set.lift_id], references: [lift.id] })
}))
