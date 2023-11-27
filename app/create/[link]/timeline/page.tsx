"use client";
import "react-vertical-timeline-component/style.min.css";
import { useParams, useRouter } from "next/navigation";
import CourseTimeline from "../components/CourseTimeline";
import { type CourseStore, useCourseStore } from "../hooks/useCourseStore";
import { type Lesson } from "../schema";
import { type ZodIssue } from "zod";
import useLessonIssues from "../hooks/useLessonIssues";
import HydrationLoader from "@/components/HydrationLoader";
import Loading from "@/app/loading";
function TimelinePage() {
  const { link } = useParams();
  const router = useRouter();
  const lessons: Lesson[] = useCourseStore(
    (store: CourseStore) => store?.lessons,
  );
  const issues: ZodIssue[] | undefined | null = useLessonIssues();

  return (
    <>
      <CourseTimeline link={link as string} lessons={lessons} issues={issues} />
      <button
        onClick={() => router.replace(".")}
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
function Timeline() {
  return (
    <HydrationLoader
      duringHydration={<Loading />}
      afterHydration={<TimelinePage />}
    />
  );
}

export default Timeline;
