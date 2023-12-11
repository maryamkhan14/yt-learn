import { create } from "zustand";
import type ReactPlayer from "react-player";
import { type RefObject } from "react";
interface State {
  playerRef: RefObject<ReactPlayer> | null;
  time: number;
}
interface Actions {
  getCurrentTime: () => number;
  setPlayerRef: (ref: State["playerRef"]) => void;
  setTime: (time: number) => void;
}
const INITIAL_STATE: State = {
  playerRef: null,
  time: 0,
};

export const useReactPlayerStore = create<State & Actions>()((set, get) => ({
  playerRef: INITIAL_STATE.playerRef,
  time: INITIAL_STATE.time,
  getCurrentTime: () => get()?.playerRef?.current?.getCurrentTime() ?? 0,
  setTime: (time: number) => set((_state) => ({ time })),
  setPlayerRef: (playerRef: State["playerRef"]) =>
    set((_state) => ({
      playerRef,
      duration: playerRef?.current?.getDuration() ?? 0,
    })),
}));
export type { State as ReactPlayerStore };