import { create } from "zustand";
import { type Lesson } from "../schema";
import { persist } from "zustand/middleware";
import { dayJsInstance as dayjs } from "@/lib/time";
import { createDefaultLesson } from "../utils/createDefaultLesson";
interface State {
  link: string;
  lessons: Lesson[];
  duration: number;
  _hasHydrated: boolean;
  relativeSaveTimestamp: string;
  isoSaveTimestamp: string;
}
interface Actions {
  setLink: (link: string) => void;
  updateLessons: (lessons: Lesson[]) => void;
  setDuration: (duration: number) => void;
  updateLastSaved: () => void;
  setHasHydrated: () => void;
  resetLessons: () => void;
}
const INITIAL_STATE: State = {
  link: "",
  lessons: [],
  duration: 0,
  relativeSaveTimestamp: "",
  isoSaveTimestamp: dayjs().toISOString(),
  _hasHydrated: false,
};

export const useCourseStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      link: INITIAL_STATE.link,
      lessons: INITIAL_STATE.lessons,
      duration: INITIAL_STATE.duration,
      relativeSaveTimestamp: INITIAL_STATE.relativeSaveTimestamp,
      isoSaveTimestamp: INITIAL_STATE.isoSaveTimestamp,
      _hasHydrated: false,
      setLink: (link: string) => set((_state) => ({ link })),
      updateLessons: (lessons: Lesson[]) => set((_state) => ({ lessons })),
      setDuration: (duration: number) => set((_state) => ({ duration })),
      resetLessons: () =>
        set((_state) => ({
          lessons: [createDefaultLesson(get().duration)],
        })),
      updateLastSaved: () =>
        set((state) => {
          if (
            dayjs(state.isoSaveTimestamp).fromNow() !==
            state.relativeSaveTimestamp
          )
            return {
              relativeSaveTimestamp: dayjs().fromNow(),
              isoSaveTimestamp: dayjs().toISOString(),
            };
          return { isoSaveTimestamp: dayjs().toISOString() };
        }),
      setHasHydrated: () => {
        set((state) => {
          return { _hasHydrated: !!state };
        });
      },
    }),
    {
      name: "course",
      skipHydration: true,
      onRehydrateStorage: (_state) => {
        // optional
        return (state, error) => {
          if (!error) {
            state?.setHasHydrated();
          }
        };
      },
    },
  ),
);
export type { State as CourseStore };
