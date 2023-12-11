import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "@/server/trpc";
import { z } from "zod";
import { CompletedNoteSchema } from "@/app/course/[courseId]/lesson/[lessonId]/@notes/schema";
import { type Note } from "@prisma/client";
export const notesRouter = createTRPCRouter({
  getByLessonId: publicProcedure
    .input(z.object({ lessonId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { lessonId } = input;
      const { db } = ctx;
      const notes = await db.note.findMany({
        where: {
          lessonId,
        },
        orderBy: {
          time: "asc",
        },
      });
      return notes.reduce(
        (acc, note) => {
          const noteTime = ~~note.time;
          const existingNotes = acc?.[noteTime];
          return {
            ...acc,
            [noteTime]: existingNotes?.length
              ? ([...existingNotes, note] as Note[])
              : [note],
          };
        },
        {} as Record<string, Note[]>,
      );
    }),
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
