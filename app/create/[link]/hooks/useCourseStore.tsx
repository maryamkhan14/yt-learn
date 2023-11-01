import { create } from "zustand";
import { type Lesson } from "../schema";
import { type Course } from "../schema";
interface State {
  lessons: Lesson[];
  schema: Course | null;
}
interface Actions {
  updateLessons: (lessons: Lesson[]) => void;
  updateSchema: (schema: Course) => void;
}
const INITIAL_STATE: State = {
  lessons: [],
  schema: null,
};
export const useCourseStore = create<State & Actions>((set, _get) => ({
  lessons: INITIAL_STATE.lessons,
  schema: null,
  updateSchema: (schema: Course) => set((state) => ({ ...state, schema })),
  updateLessons: (lessons: Lesson[]) => set((state) => ({ ...state, lessons })),
}));

export type { State as CourseStore };
