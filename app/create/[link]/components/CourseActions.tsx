"use client";

import { useFormContext } from "react-hook-form";
import CircularIconOnlyButton from "../../../../components/button/CircularIconOnlyButton";
import { useCourseStore } from "../hooks/useCourseStore";
function CourseActions() {
  const { resetLessons } = useCourseStore((state) => ({
    resetLessons: state.resetLessons,
  }));
  const { reset } = useFormContext();
  const resetForm = () => {
    const lessons = resetLessons();
    reset({ lessons });
  };
  return (
    <div className=" flex flex-col items-center gap-7">
      <section className="group-save flex items-center gap-3">
        <CircularIconOnlyButton
          icon="ri-check-fill"
          srCaption="Construct the course"
          type="submit"
          buttonStyles="text-green-500 hover:bg-green-700/50 "
        />
        <CircularIconOnlyButton
          icon="ri-restart-line"
          srCaption="Reset the course"
          type="button"
          onClick={resetForm}
          buttonStyles="text-green-500 hover:bg-green-700/50 "
        />
      </section>
    </div>
  );
}

export default CourseActions;
