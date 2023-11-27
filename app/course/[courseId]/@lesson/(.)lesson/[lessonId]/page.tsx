"use client";
import Loading from "@/app/loading";
import YouTubePlayer from "@/components/YouTubePlayer";
import { trpc } from "@/trpc/Provider";
import { type Lesson } from "@prisma/client";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

function Lesson({
  params,
}: {
  params: { courseId: string; lessonId: string };
}) {
  const { courseId, lessonId } = params;
  const { data: course, status } = trpc.courses.getById.useQuery(courseId);
  if (status === "loading") return <Loading />;
  const lesson = course!.lessons.find((lesson) => lesson.id === lessonId);
  if (!lesson) {
    toast.error("No such lesson found!");
    redirect("/404");
  }
  return (
    <>
      <h1>{lesson.name}</h1>
      <article className="self-center md:w-2/3">
        <YouTubePlayer
          url={course!.link}
          config={{
            youtube: {
              playerVars: {
                start: lesson.start,
                end: lesson.end,
              },
            },
          }}
        />
      </article>
    </>
  );
}

export default Lesson;
