"use client";
import { UNAUTHENTICATED } from "@/lib/constants/auth";
import { useParams, useRouter } from "next/navigation";
import CourseTimeline from "../components/CourseTimeline";
import { type CourseStore, useCourseStore } from "../hooks/useCourseStore";
import { type Lesson } from "../schema";
import { type ZodIssue } from "zod";
import useLessonIssues from "../hooks/useLessonIssues";
import useHydrated from "../hooks/useHydrated";
import FilledButton from "@/components/button/FilledButton";
import HamsterLoader from "@/components/HamsterLoader";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useEffect } from "react";
function Confirm() {
  const hasHydrated = useHydrated();
  const { link } = useParams();
  const router = useRouter();
  const lessons: Lesson[] = useCourseStore(
    (store: CourseStore) => store?.lessons,
  );
  const { status } = useSession();
  const issues: ZodIssue[] | undefined | null = useLessonIssues(hasHydrated);
  useEffect(() => {
    if (status === UNAUTHENTICATED)
      toast.success(
        "Pro-tip: if you want to be able to edit your course later on, you could sign up and continue from there!",
        { id: "signupReminder", duration: 2000, icon: "👋" },
      );
  }, [status]);

  if (!hasHydrated)
    return (
      <div className="flex h-full w-full grow justify-center bg-slate-900/40">
        <HamsterLoader />
      </div>
    );
  return (
    <section className="flex flex-col">
      <h1 className="my-4 text-center text-blue-200">How does this look?</h1>
      <CourseTimeline link={link as string} lessons={lessons} issues={issues} />
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
            onClick={() => router.push("./save")}
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

export default Confirm;
