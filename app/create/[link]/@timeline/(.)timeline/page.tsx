"use client";
import Modal from "@/components/Modal";
import CourseTimeline from "../../components/CourseTimeline";
import { type CourseStore, useCourseStore } from "../../hooks/useCourseStore";
import { type Lesson } from "../../schema";
import "react-vertical-timeline-component/style.min.css";
import { useParams } from "next/navigation";
import { type ZodIssue } from "zod";
import useLessonIssues from "../../hooks/useLessonIssues";
import useHydrated from "../../hooks/useHydrated";
function Timeline() {
  const hasHydrated = useHydrated();
  const { link } = useParams();
  const lessons: Lesson[] = useCourseStore(
    (store: CourseStore) => store?.lessons,
  );
  const issues: ZodIssue[] | undefined | null = useLessonIssues(hasHydrated);

  return (
    <Modal size={"xl"}>
      <CourseTimeline link={link as string} issues={issues} lessons={lessons} />
    </Modal>
  );
}

export default Timeline;
