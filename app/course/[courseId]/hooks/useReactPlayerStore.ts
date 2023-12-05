import { create } from "zustand";
import type ReactPlayer from "react-player";
import { type RefObject } from "react";
interface State {
  playerRef: RefObject<ReactPlayer> | null;
}
interface Actions {
  setPlayerRef: (ref: State["playerRef"]) => void;
}
const INITIAL_STATE: State = {
  playerRef: null,
};

export const useReactPlayerStore = create<State & Actions>()((set, _get) => ({
  playerRef: INITIAL_STATE.playerRef,
  setPlayerRef: (playerRef: State["playerRef"]) =>
    set((_state) => ({ playerRef })),
}));
export type { State as ReactPlayerStore };
