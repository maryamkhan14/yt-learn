"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import FilledButton from "@/components/button/FilledButton";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { type SubmitHandler } from "react-hook-form";
import Form from "@/components/Form";
import { type CourseSchemaType, CourseSchema } from "../schema";
import Lessons from "./Lessons";
import { toTimestamp } from "../../../../lib/time";
import CircularIconOnlyButton from "../../../../components/button/CircularIconOnlyButton";
import { type CourseStore, useCourseStore } from "../hooks/useCourseStore";
import HamsterLoader from "@/components/HamsterLoader";
import useHydrated from "../../../hooks/useHydrated";

function TimelineButton() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <FilledButton
      onClick={() => router.push(`${pathname}/timeline`)}
      text="View Timeline"
      buttonStyles=" self-center"
    />
  );
}
function LastSaved() {
  const hasHydrated = useHydrated();
  const relativeSaveTimestamp: string = useCourseStore(
    (store: CourseStore) => store?.relativeSaveTimestamp,
  );
  if (!hasHydrated)
    return (
      <div className="flex h-full w-full grow justify-center bg-slate-900/40">
        <HamsterLoader />
      </div>
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
  const setDuration = useCourseStore((state) => state.setDuration);
  const setLink = useCourseStore((state) => state.setLink);
  const onSubmit: SubmitHandler<CourseSchemaType> = (_data) => {
    router.push(`/create/${link as string}/confirm`);
  };
  const initialValues = {
    link,
    duration,
    lessons: [
      {
        start: "00:00:00",
        end: toTimestamp(duration), ///YT vid length
        name: "",
      },
    ],
  };
  setDuration(duration);
  setLink(decodeURIComponent(link as string));
  return (
    <DndProvider backend={HTML5Backend}>
      <Form<CourseSchemaType>
        schema={CourseSchema}
        onSubmit={onSubmit}
        defaultValues={initialValues}
        arrayName="lessons"
        className="flex-col"
      >
        <article className="flex w-full justify-center gap-3">
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
