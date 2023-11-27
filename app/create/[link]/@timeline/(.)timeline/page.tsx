"use client";
import Modal from "@/components/Modal";
import CourseTimeline from "../../components/CourseTimeline";
import { type CourseStore, useCourseStore } from "../../hooks/useCourseStore";
import { type Lesson } from "../../schema";
import "react-vertical-timeline-component/style.min.css";
import { useParams } from "next/navigation";
import { type ZodIssue } from "zod";
import useLessonIssues from "../../hooks/useLessonIssues";
function Timeline() {
  const { link } = useParams();
  const lessons: Lesson[] = useCourseStore(
    (store: CourseStore) => store?.lessons,
  );
  const issues: ZodIssue[] | undefined | null = useLessonIssues();

  return (
    <Modal size={"xl"}>
      <CourseTimeline link={link as string} issues={issues} lessons={lessons} />
    </Modal>
  );
}

export default Timeline;
