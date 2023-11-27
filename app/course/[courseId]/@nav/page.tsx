import { trpc } from "@/trpc/server";
import Link from "next/link";
import { redirect } from "next/navigation";

async function LessonsNav({ params }: { params: { courseId: string } }) {
  const { courseId } = params;
  const course = await trpc.courses.getById.query(courseId);
  if (!course) redirect("/404");
  const { lessons } = course;
  return (
    <aside className="flex grow flex-col justify-stretch bg-slate-900/40 md:w-1/5 md:max-w-[20%]">
      <h2 className="m-4">Lessons</h2>
      <section className="flex grow flex-col gap-6 overflow-y-scroll md:basis-0">
        {lessons.map((lesson) => (
          <Link
            href={`/course/${courseId}/lesson/${lesson.id}`}
            className="hover-pointer text-ellipsis "
            key={lesson.id}
          >
            <article className="border-y border-red-700 p-4  hover:bg-red-700/30">
              {lesson.name}
            </article>
          </Link>
        ))}
      </section>
    </aside>
  );
}

export default LessonsNav;
