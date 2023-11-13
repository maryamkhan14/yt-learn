import { create } from "zustand";
import { type Lesson } from "../schema";
import { persist } from "zustand/middleware";
import { dayJsInstance as dayjs } from "@/lib/time";
interface State {
  lessons: Lesson[];
  duration: number;
  _hasHydrated: boolean;
  lastSaved: string;
}
interface Actions {
  updateLessons: (lessons: Lesson[]) => void;
  updateDuration: (duration: number) => void;
  updateLastSaved: () => void;
  setHasHydrated: (state: State | boolean) => void;
}
const INITIAL_STATE: State = {
  lessons: [],
  duration: 0,
  lastSaved: dayjs().toISOString(),
  _hasHydrated: false,
};

export const useCourseStore = create<State & Actions>()(
  persist(
    (set, _get) => ({
      lessons: INITIAL_STATE.lessons,
      duration: INITIAL_STATE.duration,
      lastSaved: INITIAL_STATE.lastSaved,
      _hasHydrated: false,
      updateLessons: (lessons: Lesson[]) => set((_state) => ({ lessons })),
      updateDuration: (duration: number) => set((_state) => ({ duration })),
      updateLastSaved: () =>
        set((_state) => ({ lastSaved: dayjs().toISOString() })),
      setHasHydrated: (state) => {
        set({
          _hasHydrated: !!state,
        });
      },
    }),
    {
      name: "course",
      skipHydration: true,
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
export type { State as CourseStore };
