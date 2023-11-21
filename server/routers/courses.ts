import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/trpc";
import {
  CourseSchema,
  type CourseSchemaType,
} from "@/app/create/[link]/schema";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
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
  getWithChapters: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const course = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails&id=${input.id}&key=${process.env.YT_API_KEY}`,
        {
          referrer: "http://localhost:3000 ",
        },
      );
      return course.json();
    }),
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const course = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails&id=${input.id}&key=${process.env.YT_API_KEY}`,
        {
          referrer: "http://localhost:3000 ",
        },
      );
      return course.json();
    }),
});
