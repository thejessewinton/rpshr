import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '~/server/db'

import { note } from '~/server/db/schema'

const NoteInputSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  body: z.string(),
})

export const createOrUpdate = createServerFn({ method: 'POST' })
  .inputValidator(NoteInputSchema)
  .handler(async ({ data }) => {
    return await db
      .insert(note)
      .values({
        id: data.id,
        title: data.title,
        user_id: ctx.session.user.id,
        body: input.body,
      })
      .returning({
        id: note.id,
      })
  })

export const notesRouter = createTRPCRouter({
  createOrUpdate: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
        title: z.string(),
        body: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .insert(note)
        .values({
          id: input.id,
          title: input.title,
          user_id: ctx.session.user.id,
          body: input.body,
        })
        .returning({
          id: note.id,
        })
        .onConflictDoUpdate({
          target: [note.id],
          set: { title: input.title, body: input.body },
        })
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(note).where(eq(note.id, input.id))
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.note.findMany({
      where({ user_id }, { eq }) {
        return eq(user_id, ctx.session.user.id)
      },
      orderBy({ created_at }, { desc }) {
        return desc(created_at)
      },
    })
  }),
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.note.findFirst({
        where({ id, user_id }, { and, eq }) {
          return and(eq(id, input.id), eq(user_id, ctx.session.user.id))
        },
      })
    }),
})
