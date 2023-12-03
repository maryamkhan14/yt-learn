"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

function LessonLink({
  courseId,
  lessonId,
  lessonName,
}: {
  courseId: string;
  lessonId: string;
  lessonName: string;
}) {
  const { lessonId: currentLessonId } = useParams();
  return (
    <Link
      href={`/course/${courseId}/lesson/${lessonId}`}
      className="hover-pointer text-ellipsis no-underline"
    >
      <article
        className={`border-y border-slate-600 p-4 hover:bg-red-700/30 ${
          currentLessonId === lessonId && "bg-red-700/20"
        }`}
      >
        {lessonName}
      </article>
    </Link>
  );
}

export default LessonLink;
