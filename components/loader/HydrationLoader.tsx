"use client";

import useHydrated from "@/app/hooks/useHydrated";
interface HydrationLoaderProps {
  duringHydration: React.ReactNode;
  afterHydration: React.ReactNode;
}
function HydrationLoader({
  duringHydration,
  afterHydration,
}: HydrationLoaderProps) {
  const hasHydrated = useHydrated();
  if (!hasHydrated) return duringHydration;
  return afterHydration;
}

export default HydrationLoader;
