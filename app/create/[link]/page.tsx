"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { type VideoLink } from "@/app/(landing-page)/schema";
import dynamic from "next/dynamic";
import HydrationLoader, {
  type PersistentStore,
} from "@/components/loader/HydrationLoader";
import Loading from "@/app/loading";
import { useCourseStore } from "./hooks/useCourseStore";
const CourseForm = dynamic(() => import("./components/CourseForm"));
const YouTubePlayer = dynamic(() => import("@/components/YouTubePlayer"), {
  ssr: false,
});
function CreateCourse({ params }: { params: { link: VideoLink } }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [, setPlayed] = useState(0);
  const { setDuration, setLink } = useCourseStore((store) => ({
    setDuration: store?.setDuration,
    setLink: store?.setLink,
  }));
  const handleError = () => {
    toast.error(
      "An unknown error occurred. Please check your link and try again!",
    );
    router.replace("/");
  };
  return (
    <HydrationLoader
      store={useCourseStore as PersistentStore}
      duringHydration={<Loading />}
      afterHydration={
        <div className="wrap max-h-[80%]  flex-wrap justify-center bg-slate-900/20 px-8 py-4 text-center">
          <div className="group flex flex-col gap-8">
            <span className="self-justify-center flex h-full justify-center self-center md:w-1/2">
              <YouTubePlayer
                url={decodeURIComponent(params.link)}
                onProgress={({ played }: { played: number }) => {
                  setPlayed(played);
                }}
                onDuration={(duration: number) => {
                  setDuration(duration);
                }}
                onError={handleError}
                onReady={() => {
                  setReady(true);
                  setLink(decodeURIComponent(params.link));
                }}
              />
            </span>
            {ready && <CourseForm />}
          </div>
        </div>
      }
    />
  );
}

export default CreateCourse;
