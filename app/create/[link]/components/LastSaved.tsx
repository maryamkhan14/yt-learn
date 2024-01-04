"use client";
import { type CourseStore, useCourseStore } from "../hooks/useCourseStore";

function LastSaved() {
  const relativeSaveTimestamp: string = useCourseStore(
    (store: CourseStore) => store?.relativeSaveTimestamp,
  );
  return (
    <p className="text-sm italic text-gray-400">
      {" "}
      Last saved: {relativeSaveTimestamp}
    </p>
  );
}

export default LastSaved;
