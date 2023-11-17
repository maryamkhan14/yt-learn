"use client";
import { type Lesson } from "../schema";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import TimelineElement from "@/components/timeline/TimelineElement";
import YouTubePlayer from "@/components/YouTubePlayer";
import { toSeconds } from "@/lib/time";
import { type ZodIssue } from "zod";
import { useCallback } from "react";

function CourseTimeline({
  link,
  lessons,
  issues,
}: {
  link: string;
  lessons: Lesson[];
  issues: ZodIssue[] | undefined | null;
}) {
  const getIssue = useCallback(
    (id: number) => {
      if (!issues) return null;
      return issues.find((issue) => issue.path.includes(id)) ?? null;
    },
    [issues],
  );

  return lessons?.length > 0 ? (
    <VerticalTimeline className="prose prose-invert" lineColor={"#60a5fa"}>
      {lessons.map((lesson, id) => (
        <TimelineElement date={lesson.end} key={id} error={!!getIssue(id)}>
          <h3
            className={`vertical-timeline-element-title ${
              !lesson.name && "italic"
            } break-all`}
          >
            {!!lesson.name ? lesson.name : "No name provided."}
          </h3>

          <div className="my-4 border border-dashed">
            <YouTubePlayer
              url={decodeURIComponent(link) ?? ""}
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
          {!!getIssue(id) && (
            <h4 className="text-sm  text-red-300">
              This lesson contains the following issue:{" "}
              <span className="italic">{getIssue(id)?.message}</span>
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
