"use client";
import { trpc } from "@/trpc/Provider";
import { type Lesson } from "@prisma/client";
import { redirect, useParams } from "next/navigation";
import toast from "react-hot-toast";

function CourseInformation() {
  const { id } = useParams();
  const { data: course, status } = trpc.courses.getById.useQuery(id as string);
  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (!course) {
    toast.error("We couldn't locate that course. Please try again!");
    redirect("/courses");
  }
  const { lessons }: { lessons: Lesson[] } = course;
  return (
    <section className="flex">
      0
      <article className="">
        <p>Something else</p>
      </article>
    </section>
  );
}

export default CourseInformation;
