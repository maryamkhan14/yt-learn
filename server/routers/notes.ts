import { createTRPCRouter, privateProcedure } from "@/server/trpc";
import { CompletedNoteSchema } from "@/app/course/[courseId]/lesson/[lessonId]/@notes/schema";
export const notesRouter = createTRPCRouter({
  post: privateProcedure
    .input(CompletedNoteSchema)
    .mutation(async ({ ctx, input }) => {
      const { note, lessonId, time } = input;
      const { db, session } = ctx;

      return await db.note.create({
        data: {
          note,
          time,
          lessonId,
          userId: session.user.id,
        },
      });
    }),
});
