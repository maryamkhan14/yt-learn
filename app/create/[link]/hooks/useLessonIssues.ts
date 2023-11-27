import { type ZodIssue } from "zod";
import { type CourseStore, useCourseStore } from "../hooks/useCourseStore";
import { CourseSchema, type Lesson } from "../schema";
function useLessonIssues(): ZodIssue[] | undefined | null {
  const lessons: Lesson[] = useCourseStore(
    (store: CourseStore) => store?.lessons,
  );
  const duration: number = useCourseStore(
    (store: CourseStore) => store?.duration,
  );
  const link: string = useCourseStore((store: CourseStore) => store?.link);
  if (!lessons) return null;
  const result = CourseSchema.safeParse({ lessons, duration, link });
  if (result.success === false) return result.error.issues;
}

export default useLessonIssues;
