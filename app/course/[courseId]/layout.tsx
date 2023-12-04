import { ScrollArea } from "@/components/ui/scroll-area";
import { trpc } from "@/trpc/server";
import { redirect } from "next/navigation";
import LessonLink from "./components/LessonLink";
import { CourseProvider } from "./components/CourseProvider";
async function CourseViewLayout(props: {
  params: { courseId: string };
  children: React.ReactNode;
}) {
  const { courseId } = props.params;
  const course = await trpc.courses.getById.query(courseId);
  if (!course) redirect("/404");
  const { lessons, createdAt, ...courseInformation } = course;
  return (
    <div className="flex max-h-[80%] w-full grow flex-col items-stretch bg-slate-900/20 p-8 text-center md:flex-row">
      <aside className="flex grow flex-col justify-stretch bg-slate-900/40 md:w-1/5 md:max-w-[20%]">
        <h2 className="m-4">Lessons</h2>
        <ScrollArea className="flex max-h-32  grow flex-col gap-6 rounded border md:max-h-full md:basis-0">
          {lessons.map((lesson) => (
            <LessonLink
              key={lesson.id}
              courseId={courseId}
              lessonId={lesson.id}
              lessonName={lesson.name}
            />
          ))}
        </ScrollArea>
      </aside>
      <CourseProvider course={{ ...courseInformation }}>
        <section className="flex grow flex-col justify-center p-8">
          {props.children}
        </section>
      </CourseProvider>
    </div>
  );
}

export default CourseViewLayout;
