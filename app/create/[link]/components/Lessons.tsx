"use client";
import { useFieldArray, useFormContext } from "react-hook-form";
import Lesson from "./Lesson";
import CircularIconOnlyButton from "../../../../components/button/CircularIconOnlyButton";
import { usePathname, useRouter } from "next/navigation";
import { useCourseStore } from "../hooks/useCourseStore";
import { type Lesson as LessonType } from "../schema";

function Lessons({ totalLength }: { totalLength: number }) {
  const { control, getValues } = useFormContext();
  const router = useRouter();
  const pathname = usePathname();
  const { fields, insert, remove, move } = useFieldArray({
    control,
    name: "lessons",
  });
  const updateLessons = useCourseStore((state) => state.updateLessons);

  function viewTimeline(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    const { lessons } = getValues();
    updateLessons(lessons as LessonType[]);
    router.push(`${pathname}/timeline`);
  }
  return (
    <div className=" flex flex-col items-center gap-7">
      <button
        onClick={viewTimeline}
        className="group/tl-btn relative rounded-lg border-2 px-4 py-2 transition-all ease-in hover:px-6"
      >
        <div className="absolute inset-0 h-full w-0 rounded-lg bg-red-800 transition-all duration-[250ms]  ease-out group-hover/tl-btn:w-full" />
        <span className="relative rounded-lg text-black group-hover:text-white">
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

      <CircularIconOnlyButton
        icon="ri-check-fill"
        srCaption="Construct the course"
        type="submit"
        className="text-green-500 hover:bg-green-700/50 "
      />
    </div>
  );
}

export default Lessons;
