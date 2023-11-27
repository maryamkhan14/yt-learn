import { z } from "zod";
import { toTimestamp } from "../../../lib/time";
export const TIMESTAMP_REGEX =
  /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/;

export const CourseSchema = z
  .object({
    duration: z.number().int().positive(),
    link: z.string().url(),
    lessons: z.array(
      z
        .object({
          start: z
            .string()
            .regex(TIMESTAMP_REGEX, "Timestamp must be in HH:MM:SS format"),
          end: z
            .string()
            .regex(TIMESTAMP_REGEX, "Timestamp must be in HH:MM:SS format"),
          name: z
            .string()
            .min(20, "Lesson name must contain at least 20 characters")
            .max(50),
        })
        .refine((lesson) => lesson.start < lesson.end, {
          message: "Lesson end time must be after its start time",
          path: ["end"],
        }),
    ),
  })
  .superRefine((course, ctx) => {
    const { lessons } = course;
    const { duration } = course;
    let currentMinimum = lessons[0]!.end;
    for (let i = 1; i < lessons.length; i++) {
      const currentLessonEnd = lessons[i]!.end;
      if (currentLessonEnd <= currentMinimum) {
        ctx.addIssue({
          code: "custom",
          message: "Timestamps must be in increasing order",
          path: ["lessons", i, "end"],
        });
      }

      currentMinimum = currentLessonEnd;
    }
    if (currentMinimum > toTimestamp(duration)) {
      ctx.addIssue({
        code: "custom",
        message: "Lesson ending timestamp cannot exceed course duration",
        path: ["lessons", lessons.length - 1, "end"],
      });
    }
  });
export type CourseSchemaType = z.infer<typeof CourseSchema>;

export type Lesson = z.infer<typeof CourseSchema>["lessons"][number];
