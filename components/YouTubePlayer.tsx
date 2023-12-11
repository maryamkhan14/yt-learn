"use client";
import ReactPlayer from "react-player";
import { type ReactPlayerProps } from "react-player";
import HamsterLoader from "./loader/HamsterLoader";
import { type ForwardedRef } from "react";
import { useReactPlayerStore } from "@/app/hooks/useReactPlayerStore";
function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex aspect-video w-full items-center justify-center self-center justify-self-center">
      {children}
    </div>
  );
}
type YouTubePlayerProps = Omit<ReactPlayerProps, "ref"> & {
  playerref?: ForwardedRef<ReactPlayer> | null;
};
function YouTubePlayer(props: YouTubePlayerProps) {
  const setTime = useReactPlayerStore((state) => state.setTime);
  const { onProgress, ...remainingProps } = props;
  const providedOnProgress = onProgress as ReactPlayerProps["onProgress"];
  return (
    <ReactPlayer
      {...remainingProps}
      ref={props.playerref}
      volume={50}
      fallback={<HamsterLoader />}
      controls={true}
      pip={false}
      style={{ zIndex: 0 }}
      progressInterval={100}
      onProgress={(progressInfo) => {
        setTime(~~progressInfo.playedSeconds);
        if (providedOnProgress) {
          providedOnProgress(progressInfo);
        }
      }}
      wrapper={Wrapper}
    />
  );
}

export default YouTubePlayer;
