import { z } from "zod";
export const TIMESTAMP_REGEX =
  /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/;
export const ParseFormSchema = z.object({
  lessons: z
    .array(
      z.object({
        end: z
          .string()
          .regex(TIMESTAMP_REGEX, "Timestamp must be in HH:MM:SS format"),
        name: z
          .string()
          .min(20, "Lesson name must contain at least 20 characters.")
          .max(50),
      }),
    )
    .superRefine((array, ctx) => {
      let currentMinimum = array[0].end;
      for (let i = 1; i < array.length; i++) {
        if (array[i].end <= currentMinimum) {
          ctx.addIssue({
            code: "custom",
            message: "Timestamps must be in increasing order",
            path: [i, "end"],
          });
        }
        currentMinimum = array[i].end;
      }
    }),
});
export type ParseFormSchema = z.infer<typeof ParseFormSchema>;
export const LessonSchema = z.object({
  end: z.string().regex(TIMESTAMP_REGEX),
  name: z.string().min(20).max(50),
});
export type LessonSchema = z.infer<typeof LessonSchema>;
