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
import { TIMESTAMP_REGEX } from "../../schema";

function Timeline() {
  const lessons: Lesson[] = useCourseStore(
    (store: CourseStore) => store?.lessons,
  );
  const { link } = useParams();
  return (
    <Modal size={"xl"}>
      <VerticalTimeline className="prose prose-invert" lineColor={"#60a5fa"}>
        {lessons.map((lesson, id) => (
          <TimelineElement
            date={lesson.end}
            key={id}
            error={!TIMESTAMP_REGEX.test(lesson.end)}
          >
            <h3
              className={`vertical-timeline-element-title ${
                !lesson.name && "italic"
              }`}
            >
              {!lesson.name && "No name provided."}
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
            {!TIMESTAMP_REGEX.test(lesson.end) && (
              <h4 className="text-sm text-red-400">
                Ending timestamp must be in HH:MM:SS format. The course cannot
                be generated unless this lesson is fixed.
              </h4>
            )}
          </TimelineElement>
        ))}
      </VerticalTimeline>
    </Modal>
  );
}

export default Timeline;
