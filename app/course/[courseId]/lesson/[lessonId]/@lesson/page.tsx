"use client";

const YouTubePlayer = dynamic(() => import("@/components/YouTubePlayer"), {
  ssr: false,
});
import dynamic from "next/dynamic";
import type ReactPlayer from "react-player";
import { trpc } from "@/trpc/Provider";
import { type Lesson } from "@prisma/client";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { useCourse } from "../../../components/CourseProvider";
import React, { useRef } from "react";
import { useReactPlayerStore } from "../../../hooks/useReactPlayerStore";

function Lesson({
  params: { courseId, lessonId },
}: {
  params: { courseId: string; lessonId: string };
}) {
  const playerRef = useRef<ReactPlayer>(null);
  const setPlayerRef = useReactPlayerStore((store) => store?.setPlayerRef);
  const { state: course } = useCourse();
  const { data: lesson, status } = trpc.lessons.getById.useQuery({
    lessonId,
    courseId,
  });
  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (!lesson) {
    toast.error("No such lesson found!");
    redirect("/404");
  }
  return (
    <>
      <h1>{lesson.name}</h1>
      <article className="self-center md:w-2/3">
        <YouTubePlayer
          url={course?.link}
          playerref={playerRef}
          config={{
            youtube: {
              playerVars: {
                start: lesson.start,
                end: lesson.end,
              },
            },
          }}
          onReady={() => {
            setPlayerRef(playerRef);
          }}
        />
      </article>
    </>
  );
}

export default Lesson;
