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
import FilledButton from "@/components/button/FilledButton";
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

      <FilledButton
        onClick={() => router.replace(".")}
        role="link"
        text="Modify course"
        buttonStyles="self-center"
      />
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
