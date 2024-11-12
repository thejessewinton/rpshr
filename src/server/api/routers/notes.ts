import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { note } from "~/server/db/schema";

export const notesRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ title: z.string().min(1), body: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .insert(note)
        .values({
          title: input.title,
          user_id: ctx.session.user.id,
          body: input.body,
        })
        .returning({
          id: note.id,
        });
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.note.findMany({
      where({ user_id }, { eq }) {
        return eq(user_id, ctx.session.user.id);
      },
      orderBy({ created_at }, { desc }) {
        return desc(created_at);
      },
    });
  }),
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.note.findFirst({
        where({ id, user_id }, { and, eq }) {
          return and(eq(id, input.id), eq(user_id, ctx.session.user.id));
        },
      });
    }),
});
