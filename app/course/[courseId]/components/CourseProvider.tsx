"use client";
import { type Course } from "@prisma/client";
import * as React from "react";

type CourseInformationOnly = Omit<Course, "lessons">;
type Action =
  | { type: "SET_COURSE"; payload: CourseInformationOnly }
  | { type: "UNSET_COURSE"; payload: void };
type Dispatch = (action: Action) => void;
type State = CourseInformationOnly | null;
type CourseProviderProps = {
  children: React.ReactNode;
  course: CourseInformationOnly;
};

const CourseStateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function courseReducer(state: State, action: Action) {
  switch (action.type) {
    case "SET_COURSE": {
      return { ...action.payload };
    }
    case "UNSET_COURSE": {
      return null;
    }
    default: {
      throw new Error(`Unhandled action type.`);
    }
  }
}

function CourseProvider({ children, course }: CourseProviderProps) {
  const [state, dispatch] = React.useReducer(courseReducer, { ...course });
  const value = { state, dispatch };
  return (
    <CourseStateContext.Provider value={value}>
      {children}
    </CourseStateContext.Provider>
  );
}

function useCourse() {
  const context = React.useContext(CourseStateContext);
  if (context === undefined) {
    throw new Error("useCourse must be used within a CourseProvider");
  }
  return context;
}

export { CourseProvider, useCourse };
