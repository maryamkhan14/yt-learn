import { z } from "zod";
import { toSeconds } from "../../../lib/time";
export const TIMESTAMP_REGEX =
  /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/;

export const createCourseSchema = (duration: number) =>
  z.object({
    lessons: z
      .array(
        z
          .object({
            start: z
              .string()
              .regex(TIMESTAMP_REGEX, "Timestamp must be in HH:MM:SS format"),
            end: z
              .string()
              .regex(TIMESTAMP_REGEX, "Timestamp must be in HH:MM:SS format")
              .refine((end) => toSeconds(end) <= duration, {
                message: "Lesson end time may not exceed total video duration",
              }),
            name: z
              .string()
              .min(20, "Lesson name must contain at least 20 characters")
              .max(50),
          })
          .refine((lesson) => lesson.start < lesson.end, {
            message: "Lesson end time must be after its start time",
            path: ["end"],
          }),
      )
      .superRefine((array, ctx) => {
        if (array?.length > 0) {
          let currentMinimum = array[0]?.end ?? "0";
          for (let i = 1; i < array.length; i++) {
            if ((array[i]?.end ?? "0") <= currentMinimum) {
              ctx.addIssue({
                code: "custom",
                message: "Timestamps must be in increasing order",
                path: [i, "end"],
              });
            }
            currentMinimum = array[i]?.end ?? "0";
          }
        }
      }),
  });
export type Course = ReturnType<typeof createCourseSchema>;
export type Lesson = z.infer<Course>["lessons"][number];
