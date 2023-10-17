const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });
import { type ReactPlayerProps } from "react-player";
import dynamic from "next/dynamic";
import HamsterLoader from "./HamsterLoader";
function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex aspect-video self-center justify-self-center md:w-1/2">
      {children}
    </div>
  );
}
function YouTubePlayer(props: ReactPlayerProps) {
  return (
    <>
      <ReactPlayer
        {...props}
        volume={50}
        fallback={<HamsterLoader />}
        controls={true}
        pip={false}
        wrapper={Wrapper}
        style={{ zIndex: 0 }}
        progressInterval={100}
      />
    </>
  );
}

export default YouTubePlayer;