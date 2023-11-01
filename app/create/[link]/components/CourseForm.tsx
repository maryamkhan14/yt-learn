"use client";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { type SubmitHandler } from "react-hook-form";
import Form from "@/components/Form";
import { createCourseSchema } from "../schema";
import Lessons from "./Lessons";
import { toTimestamp } from "../../../../lib/time";
import { type z } from "zod";
import { useCourseStore } from "../hooks/useCourseStore";
import { useEffect } from "react";

function CourseForm({ duration }: { duration: number }) {
  const courseSchema = createCourseSchema(duration);
  type CourseSchema = z.infer<typeof courseSchema>;
  const updateDuration = useCourseStore((state) => state.updateDuration);
  const onSubmit: SubmitHandler<CourseSchema> = async (_data) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        alert("it worked!");
        resolve(undefined);
      }, 3000);
    });
  };
  const initialValues = {
    lessons: [
      {
        start: "00:00:00",
        end: toTimestamp(duration), ///YT vid length
        name: "",
      },
    ],
  };
  useEffect(() => {
    updateDuration(duration);
  }, [duration, updateDuration]);
  return (
    <DndProvider backend={HTML5Backend}>
      <Form<CourseSchema>
        schema={courseSchema}
        onSubmit={onSubmit}
        defaultValues={initialValues}
        arrayName="lessons"
        className="flex-col"
      >
        <Lessons totalLength={duration} />
      </Form>
    </DndProvider>
  );
}

export default CourseForm;
