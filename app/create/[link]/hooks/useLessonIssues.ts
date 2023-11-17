import { type ZodIssue } from "zod";
import { type CourseStore, useCourseStore } from "../hooks/useCourseStore";
import { createCourseSchema, type Lesson } from "../schema";
import { type Course } from "../schema";
function useLessonIssues(hasHydrated: boolean): ZodIssue[] | undefined | null {
  const lessons: Lesson[] = useCourseStore(
    (store: CourseStore) => store?.lessons,
  );
  const duration: number = useCourseStore(
    (store: CourseStore) => store?.duration,
  );
  const schema: Course = createCourseSchema(duration);
  if (!hasHydrated || !schema || !lessons) return null;
  const result = schema.safeParse({ lessons });
  if (result.success === false) return result.error.issues;
}

export default useLessonIssues;
