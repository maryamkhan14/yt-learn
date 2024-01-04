"use client";
import { useEffect } from "react";
import { type UseBoundStore, type StoreApi } from "zustand";
import type { StoreMutators } from "zustand/vanilla";
type PersistentStoreWrite = StoreMutators<
  StoreApi<unknown>,
  unknown
>["zustand/persist"];
export type PersistentStore = UseBoundStore<PersistentStoreWrite>;
interface HydrationLoaderProps {
  duringHydration: React.ReactNode;
  afterHydration: React.ReactNode;
  store: PersistentStore;
}
async function hydrate(store: HydrationLoaderProps["store"]) {
  await store.persist?.rehydrate();
}
function HydrationLoader({
  duringHydration,
  afterHydration,
  store,
}: HydrationLoaderProps) {
  useEffect(() => {
    console.log("hydrating...");
    void hydrate(store);
  }, [store]);
  if (!store.persist?.hasHydrated()) return duringHydration;
  return afterHydration;
}

export default HydrationLoader;
