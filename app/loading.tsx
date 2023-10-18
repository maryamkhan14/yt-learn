import HamsterLoader from "@/components/HamsterLoader";

function Loading() {
  return (
    <div className="flex h-full w-full grow justify-center bg-slate-900/40">
      <HamsterLoader />
    </div>
  );
}

export default Loading;
