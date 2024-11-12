import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { note } from "~/server/db/schema";

export const notesRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ title: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(note).values({
        title: input.title,
        user_id: ctx.session.user.id,
        body: "",
      });
    }),
});
