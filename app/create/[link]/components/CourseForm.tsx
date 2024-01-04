"use client";
import { useRouter } from "next/navigation";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { type SubmitHandler } from "react-hook-form";
import Form from "@/components/Form";
import { type CourseSchemaType, CourseSchema } from "../schema";
import Lessons from "./Lessons";
import { useCourseStore } from "../hooks/useCourseStore";
import TimelineButton from "./TimelineButton";
import CourseActions from "./CourseActions";
import LastSaved from "./LastSaved";
import { createDefaultLesson } from "../utils/createDefaultLesson";
function CourseForm() {
  const router = useRouter();
  const { savedLessons, link, duration } = useCourseStore((store) => ({
    savedLessons: store?.lessons,
    link: store?.link,
    duration: store?.duration,
  }));
  const onSubmit: SubmitHandler<CourseSchemaType> = (_data) => {
    router.push(`/create/${link}/confirm`);
  };
  const initialValues = {
    link,
    duration,
    lessons: savedLessons.length
      ? savedLessons
      : [createDefaultLesson(duration)],
  };
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
