import { z } from "zod";
import { getFetch } from "@trpc/client";
import { createTRPCRouter, publicProcedure } from "@/server/trpc";
export const coursesRouter = createTRPCRouter({
  getWithChapters: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const course = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails&id=${input.id}&key=${process.env.DEV_YT_API_KEY}`,
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
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails&id=${input.id}&key=${process.env.DEV_YT_API_KEY}`,
        {
          referrer: "http://localhost:3000 ",
        },
      );
      return course.json();
    }),
});
