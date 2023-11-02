"use client";
import { useFieldArray, useFormContext } from "react-hook-form";
import Lesson from "./Lesson";
import { usePathname, useRouter } from "next/navigation";
import { type CourseStore, useCourseStore } from "../hooks/useCourseStore";
import { type Lesson as LessonType } from "../schema";
import { memo, useCallback, useEffect, useRef } from "react";

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
      <button
        onClick={viewTimeline}
        className="group/tl-btn relative rounded-lg border-2 px-4 py-2 transition-all ease-in hover:px-6"
      >
        <div className="absolute inset-0 h-full w-0 rounded-lg bg-red-800 transition-all duration-[250ms]  ease-out group-hover/tl-btn:w-full" />
        <span className="relative rounded-lg text-white group-hover:text-white">
          View timeline
        </span>
      </button>
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
