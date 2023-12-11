import { coursesRouter } from "@/server/routers/courses";
import { createTRPCRouter } from "@/server/trpc";
import { lessonsRouter } from "./routers/lessons";
import { notesRouter } from "./routers/notes";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  courses: coursesRouter,
  lessons: lessonsRouter,
  notes: notesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
