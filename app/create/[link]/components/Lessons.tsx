"use client";
import { useFieldArray, useFormContext } from "react-hook-form";
import Lesson from "./Lesson";
import { usePathname, useRouter } from "next/navigation";
import { type CourseStore, useCourseStore } from "../hooks/useCourseStore";
import { type Lesson as LessonType } from "../schema";
import { memo, useCallback, useEffect, useRef } from "react";
import FilledButton from "@/components/button/FilledButton";

function Lessons({ totalLength }: { totalLength: number }) {
  const loadedSavedLessons = useRef<boolean>(false);
  const savedLessons: LessonType[] = useCourseStore(
    (store: CourseStore) => store?.lessons,
  );
  const updateLastSaved = useCourseStore((state) => state.updateLastSaved);
  const updateLessons = useCourseStore((state) => state.updateLessons);
  const { control, setValue, getValues } = useFormContext();
  const router = useRouter();
  const pathname = usePathname();
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
    if (!loadedSavedLessons.current && savedLessons?.length) {
      setValue("lessons", savedLessons, { shouldValidate: true });
      loadedSavedLessons.current = true;
    }
    const interval = setInterval(saveProgress, 60 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, [saveProgress, savedLessons, setValue]);

  const viewTimeline = useCallback(
    (e: React.BaseSyntheticEvent) => {
      e.preventDefault();
      const { lessons } = getValues();
      updateLessons(lessons as LessonType[]);
      router.push(`${pathname}/timeline`);
    },
    [getValues, pathname, router, updateLessons],
  );
  return (
    <>
      <FilledButton
        onClick={viewTimeline}
        text="View Timeline"
        buttonStyles="w-1/4 self-center"
      />
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
    </>
  );
}

export default memo(Lessons);
