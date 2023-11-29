"use client";

import { useParams, useRouter } from "next/navigation";
import FilledButton from "@/components/button/FilledButton";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { type SubmitHandler } from "react-hook-form";
import Form from "@/components/Form";
import { type CourseSchemaType, CourseSchema, type Lesson } from "../schema";
import Lessons from "./Lessons";
import { toTimestamp } from "../../../../lib/time";
import CircularIconOnlyButton from "../../../../components/button/CircularIconOnlyButton";
import { type CourseStore, useCourseStore } from "../hooks/useCourseStore";
import Modal from "@/components/Modal";
import useLessonIssues from "../hooks/useLessonIssues";
import { type ZodIssue } from "zod";
import CourseTimeline from "./CourseTimeline";

function TimelineButton() {
  const { link } = useParams();
  const lessons: Lesson[] = useCourseStore(
    (store: CourseStore) => store?.lessons,
  );
  const issues: ZodIssue[] | undefined | null = useLessonIssues();
  return (
    <Modal
      trigger={<FilledButton text="View Timeline" buttonStyles="self-center" />}
      size={"xl"}
    >
      <CourseTimeline link={link as string} issues={issues} lessons={lessons} />
    </Modal>
  );
}
function LastSaved() {
  const relativeSaveTimestamp: string = useCourseStore(
    (store: CourseStore) => store?.relativeSaveTimestamp,
  );
  return (
    <p className="text-sm italic text-gray-400">
      {" "}
      Last saved: {relativeSaveTimestamp}
    </p>
  );
}
function CourseActions() {
  return (
    <div className=" flex flex-col items-center gap-7">
      <section className="group-save flex items-center gap-3">
        <CircularIconOnlyButton
          icon="ri-check-fill"
          srCaption="Construct the course"
          type="submit"
          buttonStyles="text-green-500 hover:bg-green-700/50 "
        />
      </section>
    </div>
  );
}
function CourseForm({ duration }: { duration: number }) {
  const router = useRouter();
  const { link } = useParams();
  const savedLessons: Lesson[] = useCourseStore(
    (store: CourseStore) => store?.lessons,
  );
  const setDuration = useCourseStore((state) => state.setDuration);
  const setLink = useCourseStore((state) => state.setLink);
  const onSubmit: SubmitHandler<CourseSchemaType> = (_data) => {
    router.push(`/create/${link as string}/confirm`);
  };
  const initialValues = {
    link: decodeURIComponent(link as string),
    duration,
    lessons: savedLessons?.length
      ? savedLessons
      : [
          {
            start: "00:00:00",
            end: toTimestamp(duration), ///YT vid length
            name: "",
          },
        ],
  };
  setLink(decodeURIComponent(link as string));
  setDuration(duration);

  return (
    <DndProvider backend={HTML5Backend}>
      <Form<CourseSchemaType>
        schema={CourseSchema}
        onSubmit={onSubmit}
        defaultValues={initialValues}
        arrayName="lessons"
        className="flex-col"
      >
        <article className="flex w-full items-center justify-center gap-3">
          <TimelineButton />
          <LastSaved />
        </article>
        <Lessons totalLength={duration} />
        <CourseActions />
      </Form>
    </DndProvider>
  );
}

export default CourseForm;
