"use client";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { type SubmitHandler } from "react-hook-form";
import Form from "@/components/Form";
import { createCourseSchema } from "../schema";
import Lessons from "./Lessons";
import { toTimestamp } from "../../../../lib/time";
import { type z } from "zod";
import { useEffect, useState } from "react";
import CircularIconOnlyButton from "../../../../components/button/CircularIconOnlyButton";
import { type CourseStore, useCourseStore } from "../hooks/useCourseStore";
import HamsterLoader from "@/components/HamsterLoader";
import { dayJsInstance as dayjs } from "@/lib/time";

function CourseActions() {
  useEffect(() => {
    void useCourseStore.persist.rehydrate();
  }, []);
  const hasHydrated: boolean = useCourseStore(
    (store: CourseStore) => store?._hasHydrated,
  );
  const lastSaved: string = useCourseStore(
    (store: CourseStore) => store?.lastSaved,
  );
  const [relativeTime, setRelativeTime] = useState(dayjs().fromNow());
  useEffect(() => {
    const interval = setInterval(() => {
      setRelativeTime(dayjs(lastSaved).fromNow());
    }, 1000 * 5);
    return () => {
      clearInterval(interval);
    };
  }, [lastSaved]);
  if (!hasHydrated)
    return (
      <div className="flex h-full w-full grow justify-center bg-slate-900/40">
        <HamsterLoader />
      </div>
    );

  return (
    <div className=" flex flex-col items-center gap-7">
      <section className="group-save flex items-center gap-3">
        <CircularIconOnlyButton
          icon="ri-check-fill"
          srCaption="Construct the course"
          type="submit"
          buttonStyles="text-green-500 hover:bg-green-700/50 "
        />
        <p className="text-sm italic text-gray-500">
          {" "}
          Last saved: {relativeTime}
        </p>
      </section>
    </div>
  );
}
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
        <CourseActions />
      </Form>
    </DndProvider>
  );
}

export default CourseForm;
