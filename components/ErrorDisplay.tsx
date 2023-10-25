function ErrorDisplay({ message }: { message: string }) {
  return (
    <div className="flex flex-col">
      <h1 className="my-0 text-5xl text-slate-100">Whoops!</h1>
      <h2>
        Something went wrong while trying to fetch your video. Sorry about that!
      </h2>
      <p className="my-">Details for the devs:</p>
      <pre className=" my-0 w-4/5 self-center overflow-hidden whitespace-pre-wrap border-2 border-red-500">
        {message}
      </pre>
    </div>
  );
}

export default ErrorDisplay;
