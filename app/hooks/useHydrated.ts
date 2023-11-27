import {
  type CourseStore,
  useCourseStore,
} from "../create/[link]/hooks/useCourseStore";
import "react-vertical-timeline-component/style.min.css";
import { useEffect } from "react";

async function hydrate() {
  await useCourseStore.persist.rehydrate();
}
function useHydrated(): boolean {
  useEffect(() => {
    void hydrate();
  }, []);
  const hasHydrated: boolean = useCourseStore(
    (store: CourseStore) => store?._hasHydrated,
  );
  return hasHydrated;
}

export default useHydrated;
