import { toTimestamp } from "@/lib/time";
import { type Lesson } from "../schema";

export const createDefaultLesson = (duration: number): Lesson =>
  ({
    start: toTimestamp(0),
    end: toTimestamp(duration),
    name: "",
  }) as Lesson;
