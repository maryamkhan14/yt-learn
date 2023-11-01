"use client";
import { type CourseStore, useCourseStore } from "../hooks/useCourseStore";
import { createCourseSchema, type Lesson } from "../schema";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import TimelineElement from "@/components/timeline/TimelineElement";
import YouTubePlayer from "@/components/YouTubePlayer";
import { useParams } from "next/navigation";
import { toSeconds } from "@/lib/time";
import { type ZodIssue, type ZodError } from "zod";
import { type Course } from "../schema";
import { useEffect } from "react";
import HamsterLoader from "@/components/HamsterLoader";

function getAllErrors(schema: Course, lessons: Lesson[]): ZodError | null {
  if (!schema || !lessons) return null;
  const result = schema.safeParse({ lessons });
  if (result.success === false) return result.error;
  return null;
}
function getIssue(
  issues: Array<ZodIssue> | undefined,
  id: number,
): ZodIssue | null {
  if (!issues) return null;
  return issues.find((issue) => issue.path.includes(id)) ?? null;
}

function CourseTimeline() {
  useEffect(() => {
    void useCourseStore.persist.rehydrate();
  }, []);
  const { link } = useParams();
  const hasHydrated: boolean = useCourseStore(
    (store: CourseStore) => store?._hasHydrated,
  );
  const lessons: Lesson[] = useCourseStore(
    (store: CourseStore) => store?.lessons,
  );
  const totalDuration: number = useCourseStore(
    (store: CourseStore) => store?.duration,
  );
  if (!hasHydrated)
    return (
      <div className="flex h-full w-full grow justify-center bg-slate-900/40">
        <HamsterLoader />
      </div>
    );
  const schema: Course = createCourseSchema(totalDuration);
  const issues = getAllErrors(schema, lessons)?.issues;

  return lessons?.length > 0 ? (
    <VerticalTimeline className="prose prose-invert" lineColor={"#60a5fa"}>
      {lessons.map((lesson, id) => (
        <TimelineElement
          date={lesson.end}
          key={id}
          error={!!getIssue(issues, id)}
        >
          <h3
            className={`vertical-timeline-element-title ${
              !lesson.name && "italic"
            } break-all`}
          >
            {!!lesson.name ? lesson.name : "No name provided."}
          </h3>

          <div className="my-4 border border-dashed">
            <YouTubePlayer
              url={decodeURIComponent(link as string) ?? ""}
              config={{
                youtube: {
                  playerVars: {
                    start: toSeconds(lesson.start),
                    end: toSeconds(lesson.end),
                  },
                },
              }}
            />
          </div>
          {!!getIssue(issues, id) && (
            <h4 className="text-sm  text-red-300">
              This lesson contains the following issue:{" "}
              <span className="italic">{getIssue(issues, id)?.message}</span>
            </h4>
          )}
        </TimelineElement>
      ))}
    </VerticalTimeline>
  ) : (
    <section className="flex max-h-[80%] w-full grow flex-col justify-center bg-slate-900/20 p-8 text-center">
      <h1 className="text-3xl font-bold">No lessons added yet.</h1>
      <p className="text-lg">Add a lesson to see it here.</p>
    </section>
  );
}

export default CourseTimeline;
