"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import YouTubePlayer from "@/components/YouTubePlayer";
import toast from "react-hot-toast";
import { type Link } from "@/app/(landing-page)/schema";
import VideoBar from "./components/VideoBar";

function Course({ params }: { params: { link: Link } }) {
  const router = useRouter();
  const [played, setPlayed] = useState(0);
  const handleError = () => {
    toast.error(
      "An unknown error occurred. Please check your link and try again!",
    );
    router.replace("/");
  };
  return (
    <div className="wrap max-h-[80%]  flex-wrap justify-center bg-slate-900/20 p-8 text-center">
      <div className="group flex flex-col gap-8">
        <YouTubePlayer
          url={decodeURIComponent(params.link)}
          onProgress={({ played }) => {
            setPlayed(played);
          }}
          onError={handleError}
        />
        <VideoBar currentPosition={played} />
      </div>
    </div>
  );
}

export default Course;
