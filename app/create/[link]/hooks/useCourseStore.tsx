import { create } from "zustand";
import { type Lesson } from "../schema";

interface State {
  lessons: Lesson[];
}
interface Actions {
  updateLessons: (lessons: Lesson[]) => void;
}
const INITIAL_STATE: State = {
  lessons: [],
};
export const useCourseStore = create<State & Actions>((set, _get) => ({
  lessons: INITIAL_STATE.lessons,
  updateLessons: (lessons: Lesson[]) => set((_state) => ({ lessons })),
}));

export type { State as CourseStore };
