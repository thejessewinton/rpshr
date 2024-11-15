import type { AdapterAccountType } from '@auth/core/adapters'
import { relations, sql } from 'drizzle-orm'
import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

// Necessary for Next Auth
export const users = pgTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  email: text('email').unique(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
})

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  notes: many(note),
  tags: many(tag),
}))

export const accounts = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => [
    primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  ],
)

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}))

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
})

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}))

export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (verificationToken) => [
    primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  ],
)

const lifecycleDates = {
  created_at: timestamp('created_at', { mode: 'date' }).$defaultFn(
    () => new Date(),
  ),
  updated_at: timestamp('updated_at')
    .default(sql`CURRENT_TIMESTAMP(3)`)
    .$onUpdateFn(() => new Date()),
}

// Notes and tags
export const note = pgTable('note', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  user_id: varchar('user_id', { length: 255 })
    .notNull()
    .references(() => users.id),
  title: varchar('title', { length: 255 }).notNull(),
  body: text('body').notNull(),
  ...lifecycleDates,
})

export const noteRelations = relations(note, ({ one, many }) => ({
  user: one(users, { fields: [note.user_id], references: [users.id] }),
  tags: many(notesToTags),
}))

export const tag = pgTable('tag', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull(),
  user_id: varchar('user_id', { length: 255 }),
  ...lifecycleDates,
})

export const tagRelations = relations(tag, ({ many, one }) => ({
  notes: many(notesToTags),
  user: one(users, { fields: [tag.user_id], references: [users.id] }),
}))

export const notesToTags = pgTable('note_tags', {
  note_id: text('note_id')
    .notNull()
    .references(() => note.id, { onDelete: 'cascade' }),
  tag_id: integer('tag_id')
    .notNull()
    .references(() => tag.id, { onDelete: 'cascade' }),
})

export const notesToTagsRelations = relations(notesToTags, ({ one }) => ({
  notes: one(note, {
    fields: [notesToTags.note_id],
    references: [note.id],
    relationName: 'note',
  }),
  tags: one(tag, {
    fields: [notesToTags.tag_id],
    references: [tag.id],
    relationName: 'tag',
  }),
}))
