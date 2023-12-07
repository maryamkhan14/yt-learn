import { create } from "zustand";
import type ReactPlayer from "react-player";
import { type RefObject } from "react";
interface State {
  playerRef: RefObject<ReactPlayer> | null;
}
interface Actions {
  getCurrentTime: () => number;
  setPlayerRef: (ref: State["playerRef"]) => void;
}
const INITIAL_STATE: State = {
  playerRef: null,
};

export const useReactPlayerStore = create<State & Actions>()((set, get) => ({
  playerRef: INITIAL_STATE.playerRef,
  getCurrentTime: () => get()?.playerRef?.current?.getCurrentTime() ?? 0,
  setPlayerRef: (playerRef: State["playerRef"]) =>
    set((_state) => ({
      playerRef,
      duration: playerRef?.current?.getDuration() ?? 0,
    })),
}));
export type { State as ReactPlayerStore };
