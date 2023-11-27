import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/trpc";
import {
  CourseSchema,
  type CourseSchemaType,
} from "@/app/create/[link]/schema";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { toSeconds } from "@/lib/time";
export const coursesRouter = createTRPCRouter({
  post: publicProcedure.input(CourseSchema).mutation(async ({ ctx, input }) => {
    const { db } = ctx;
    const session = await getServerSession(authOptions);
    const course: CourseSchemaType = input;
    const createdCourse = await db.course.create({
      data: {
        duration: course.duration,
        link: course.link,
      },
    });
    course.lessons.map(async (lesson) => {
      await db.lesson.create({
        data: {
          start: toSeconds(lesson.start),
          end: toSeconds(lesson.end),
          name: lesson.name,
          courseId: createdCourse.id,
        },
      });
    });
    if (!!session) {
      void db.userCourse.create({
        data: {
          courseId: createdCourse.id,
          creatorId: session.user.id,
        },
      });
    }
    return createdCourse;
  }),
  get: publicProcedure.query(async ({ ctx }) => {
    const { db } = ctx;
    return await db.course.findMany();
  }),
  getById: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input: id }) => {
      const { db } = ctx;
      return await db.course.findUnique({
        where: {
          id,
        },
        include: {
          lessons: true,
        },
      });
    }),
});
