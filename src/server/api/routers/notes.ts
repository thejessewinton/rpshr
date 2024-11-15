import { eq } from 'drizzle-orm'
import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { note, tag } from '~/server/db/schema'

export const notesRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
        title: z.string().min(1),
        body: z.string().min(1),
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
  getAllByTag: protectedProcedure
    .input(z.object({ tag: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.tag.findFirst({
        where({ slug, user_id }, { eq, and }) {
          return and(eq(slug, input.tag), eq(user_id, ctx.session.user.id))
        },
        with: {
          notes: true,
        },
      })
    }),
  createTag: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .insert(tag)
        .values({
          name: input.name,
          slug: input.name.toLowerCase().replace(/\s+/g, '-'),
          user_id: ctx.session.user.id,
        })
        .returning({
          id: tag.id,
        })
    }),
})
