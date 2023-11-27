"use client";
import { trpc } from "@/trpc/Provider";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { type ZodIssue } from "zod";
import toast from "react-hot-toast";
import { UNAUTHENTICATED } from "@/lib/constants/auth";
import FilledButton from "@/components/button/FilledButton";
import Loading from "@/app/loading";
import HydrationLoader from "@/components/HydrationLoader";
import CourseTimeline from "../components/CourseTimeline";
import { type CourseStore, useCourseStore } from "../hooks/useCourseStore";
import useLessonIssues from "../hooks/useLessonIssues";
import { type CourseSchemaType } from "../schema";
function ConfirmPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { mutate, isLoading: isPosting } = trpc.courses.post.useMutation({
    onSuccess: () => {
      //router.push(`${pathname}/save`);
      // invalidate the getCourses query
    },
    onError: (e) => {
      const zodError = e.data?.zodError?.fieldErrors.content;
      toast.error(
        zodError?.[0]
          ? zodError[0]
          : "Something went wrong. Please try again later!",
      );
    },
  });
  const course: CourseSchemaType = useCourseStore((store: CourseStore) => ({
    lessons: store?.lessons,
    link: store?.link,
    duration: store?.duration,
  }));
  const { status } = useSession();
  const issues: ZodIssue[] | undefined | null = useLessonIssues();
  if (status === UNAUTHENTICATED)
    toast.success(
      "Pro-tip: if you want to be able to edit your course later on, you could sign up and continue from there!",
      { id: "signupReminder", duration: 2000, icon: "👋" },
    );
  return (
    <section className="flex flex-col">
      <h1 className="my-4 text-center text-blue-200">How does this look?</h1>
      <CourseTimeline
        link={course.link}
        lessons={course.lessons}
        issues={issues}
      />
      <article className="flex w-full flex-col justify-evenly gap-4 self-center md:w-1/2 md:flex-row md:gap-0">
        <FilledButton
          onClick={() => router.replace(".")}
          text="Modify course"
          role="link"
          fillStyles={"bg-red-800"}
          buttonStyles={
            "self-center w-full md:w-2/3 m-2 border-red-300 border-2"
          }
        />
        {!!issues ? (
          <div className="px-3 text-center font-bold text-red-400">
            Your course cannot be created yet. Please fix existing errors.
          </div>
        ) : (
          <FilledButton
            onClick={() => mutate({ ...course })}
            text="Looks good!"
            role="link"
            fillStyles={"bg-blue-800"}
            buttonStyles={"self-center w-full md:w-2/3 m-2 border-blue-300"}
          />
        )}
      </article>
    </section>
  );
}
function Confirm() {
  return (
    <HydrationLoader
      duringHydration={<Loading />}
      afterHydration={<ConfirmPage />}
    />
  );
}

export default Confirm;
