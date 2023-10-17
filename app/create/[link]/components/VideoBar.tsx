function VideoBar({ currentPosition }: { currentPosition: number }) {
  return (
    <div className="flex w-full flex-col self-center  md:w-2/3">
      <div className="relative flex h-[0.5em] w-full items-center self-center rounded-full bg-red-800 transition-all">
        <button
          className={`adjust-margin-left absolute h-[1.5em] w-[1.5em] origin-center rounded-full bg-red-500 text-sm transition-all hover:scale-[175%] hover:bg-red-700 group-active:bg-red-900`}
          style={{ "--ml": currentPosition } as React.CSSProperties}
        >
          <i className="ri-add-fill" />
          <span className="sr-only">Add a lesson at this point</span>
        </button>
      </div>

      <div className="mt-1 flex w-full justify-between">
        <span>Start</span>
        <span>End</span>
      </div>
    </div>
  );
}

export default VideoBar;
