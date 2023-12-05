"use client";
import { useReactPlayerStore } from "../hooks/useReactPlayerStore";
function Notes() {
  const playerRef = useReactPlayerStore((store) => store?.playerRef);
  if (playerRef?.current) {
    console.log(playerRef.current.getCurrentTime());
  }
  return <div>Enter</div>;
}

export default Notes;
