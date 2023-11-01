import { create } from "zustand";
import { type Lesson } from "../schema";
import { type Course } from "../schema";
import { persist } from "zustand/middleware";
interface State {
  lessons: Lesson[];
  schema: Course | null;
  duration: number;
  _hasHydrated: boolean;
}
interface Actions {
  updateLessons: (lessons: Lesson[]) => void;
  updateSchema: (schema: Course) => void;
  updateDuration: (duration: number) => void;
  setHasHydrated: (state: State | boolean) => void;
}
const INITIAL_STATE: State = {
  lessons: [],
  schema: null,
  duration: 0,
  _hasHydrated: false,
};

export const useCourseStore = create<State & Actions>()(
  persist(
    (set, _get) => ({
      lessons: INITIAL_STATE.lessons,
      schema: INITIAL_STATE.schema,
      duration: INITIAL_STATE.duration,
      updateSchema: (schema: Course) => set((_state) => ({ schema })),
      updateLessons: (lessons: Lesson[]) => set((_state) => ({ lessons })),
      updateDuration: (duration: number) => set((_state) => ({ duration })),
      _hasHydrated: false,
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
