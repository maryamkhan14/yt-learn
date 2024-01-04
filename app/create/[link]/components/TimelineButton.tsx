"use client";

import { useParams } from "next/navigation";
import FilledButton from "@/components/button/FilledButton";
import { type Lesson } from "../schema";
import { type CourseStore, useCourseStore } from "../hooks/useCourseStore";
import Modal from "@/components/Modal";
import useLessonIssues from "../hooks/useLessonIssues";
import { type ZodIssue } from "zod";
import CourseTimeline from "./CourseTimeline";
import { useRef } from "react";

function TimelineButton() {
  const { link } = useParams();
  const lessons: Lesson[] = useCourseStore(
    (store: CourseStore) => store?.lessons,
  );
  const issues: ZodIssue[] | undefined | null = useLessonIssues();
  const ref = useRef(null);
  return (
    <Modal
      trigger={
        <FilledButton
          text="View Timeline"
          buttonStyles="self-center"
          ref={ref}
        />
      }
      size={"xl"}
    >
      <CourseTimeline link={link as string} issues={issues} lessons={lessons} />
    </Modal>
  );
}

export default TimelineButton;
