"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import YouTubePlayer from "@/components/YouTubePlayer";
import toast from "react-hot-toast";
import { type VideoLink } from "@/app/(landing-page)/schema";
import dynamic from "next/dynamic";
import HydrationLoader from "@/components/HydrationLoader";
import Loading from "@/app/loading";
const CourseForm = dynamic(() => import("./components/CourseForm"));
function CreateCourse({ params }: { params: { link: VideoLink } }) {
  const router = useRouter();
  const [, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const handleError = () => {
    toast.error(
      "An unknown error occurred. Please check your link and try again!",
    );
    router.replace("/");
  };
  return (
    <div className="wrap max-h-[80%]  flex-wrap justify-center bg-slate-900/20 px-8 py-4 text-center">
      <div className="group flex flex-col gap-8">
        <span className="self-justify-center flex h-full justify-center self-center md:w-1/2">
          <YouTubePlayer
            url={decodeURIComponent(params.link)}
            onProgress={({ played }) => {
              setPlayed(played);
            }}
            onDuration={(duration) => {
              setDuration(duration);
            }}
            onError={handleError}
          />
        </span>

        {duration > 0 && (
          <HydrationLoader
            duringHydration={<Loading />}
            afterHydration={<CourseForm duration={duration} />}
          />
        )}
      </div>
    </div>
  );
}

export default CreateCourse;
