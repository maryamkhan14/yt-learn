"use client";
import { useFieldArray, useFormContext } from "react-hook-form";
import Lesson from "./Lesson";
import { useCourseStore } from "../hooks/useCourseStore";
import { type Lesson as LessonType } from "../schema";
import { memo, useCallback, useEffect } from "react";

function Lessons({ totalLength }: { totalLength: number }) {
  const updateLastSaved = useCourseStore((state) => state.updateLastSaved);
  const updateLessons = useCourseStore((state) => state.updateLessons);
  const { control, setValue, getValues } = useFormContext();
  const { fields, insert, remove, move } = useFieldArray({
    control,
    name: "lessons",
  });
  const saveProgress = useCallback(() => {
    const { lessons } = getValues();
    updateLessons(lessons as LessonType[]);
    updateLastSaved();
  }, [getValues, updateLastSaved, updateLessons]);

  useEffect(() => {
    const interval = setInterval(saveProgress, 1 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, [saveProgress, setValue]);
  return (
    <section className="flex h-full flex-col gap-8">
      {fields.map((lesson, id) => (
        <Lesson
          key={lesson.id}
          id={id}
          insert={insert}
          remove={remove}
          move={move}
          maxLength={totalLength}
        />
      ))}
    </section>
  );
}

export default memo(Lessons);
