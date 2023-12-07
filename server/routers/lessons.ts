import { createTRPCRouter, publicProcedure } from "@/server/trpc";
import { z } from "zod";
export const lessonsRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ courseId: z.string(), lessonId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { lessonId, courseId } = input;
      const { db } = ctx;

      return await db.lesson.findUnique({
        where: {
          id: lessonId,
          courseId,
        },
      });
    }),
});
