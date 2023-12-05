"use client";
import ReactPlayer from "react-player";
import { type ReactPlayerProps } from "react-player";
import HamsterLoader from "./HamsterLoader";
import { type ForwardedRef } from "react";
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
  return (
    <ReactPlayer
      {...props}
      ref={props.playerref}
      volume={50}
      fallback={<HamsterLoader />}
      controls={true}
      pip={false}
      style={{ zIndex: 0 }}
      progressInterval={100}
      wrapper={Wrapper}
    />
  );
}

export default YouTubePlayer;
