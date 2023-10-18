"use client";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { type SubmitHandler } from "react-hook-form";
import Form from "@/components/Form";
import { createCourseSchema } from "../schema";
import Lessons from "./Lessons";
import { toTimestamp } from "../../../../lib/time";
import { type z } from "zod";

function CourseForm({ duration }: { duration: number }) {
  const CourseSchema = createCourseSchema(duration);
  type CourseSchema = z.infer<typeof CourseSchema>;
  const onSubmit: SubmitHandler<CourseSchema> = async (data) => {
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
  return (
    <DndProvider backend={HTML5Backend}>
      <Form<CourseSchema>
        schema={CourseSchema}
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
