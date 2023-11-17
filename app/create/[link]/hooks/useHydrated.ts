import { type CourseStore, useCourseStore } from "../hooks/useCourseStore";
import "react-vertical-timeline-component/style.min.css";
import { useEffect } from "react";
function useHydrated(): boolean {
  useEffect(() => {
    void useCourseStore.persist.rehydrate();
  }, []);
  const hasHydrated: boolean = useCourseStore(
    (store: CourseStore) => store?._hasHydrated,
  );
  return hasHydrated;
}

export default useHydrated;
