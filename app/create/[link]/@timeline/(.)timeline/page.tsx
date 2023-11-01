"use client";
import Modal from "@/components/Modal";
import { type CourseStore, useCourseStore } from "../../hooks/useCourseStore";
import { type Lesson } from "../../schema";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import TimelineElement from "@/components/timeline/TimelineElement";
import YouTubePlayer from "@/components/YouTubePlayer";
import { useParams } from "next/navigation";
import { toSeconds } from "@/lib/time";
import { type ZodIssue, type ZodError } from "zod";
import { type Course } from "../../schema";
function getAllErrors(schema: Course, lessons: Lesson[]): ZodError | null {
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

function Timeline() {
  const lessons: Lesson[] = useCourseStore(
    (store: CourseStore) => store?.lessons,
  );
  const schema: Course = useCourseStore((store: CourseStore) => store?.schema)!;
  const { link } = useParams();
  const issues = getAllErrors(schema, lessons)?.issues;

  return (
    <Modal size={"xl"}>
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
    </Modal>
  );
}

export default Timeline;
