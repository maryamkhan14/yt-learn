"use client";
import CourseTimeline from "../components/CourseTimeline";
import { useParams, useRouter } from "next/navigation";

function Timeline() {
  const { link } = useParams();
  const router = useRouter();
  function viewCourseCreationPage(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    router.replace(`/create/${link as string}`);
  }
  return (
    <>
      <CourseTimeline />
      <button
        onClick={viewCourseCreationPage}
        role="link"
        className="group/tl-btn relative m-2  w-1/4 self-center rounded-lg border-2 px-4 py-2 transition-all ease-in hover:px-6"
      >
        <div className="absolute inset-0 h-full w-0 rounded-lg bg-red-800 transition-all duration-[250ms]  ease-out group-hover/tl-btn:w-full" />
        <span className="relative rounded-lg text-white group-hover:text-white">
          Modify course
        </span>
      </button>
    </>
  );
}

export default Timeline;
