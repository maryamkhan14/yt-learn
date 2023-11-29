function HomepageLayout(props: {
  children: React.ReactNode;
  linkform: React.ReactNode;
}) {
  return (
    <div className="flex max-h-[80%]  w-full grow flex-col justify-evenly bg-slate-900/20 p-8 text-center">
      {props.children}
      {props.linkform}
    </div>
  );
}

export default HomepageLayout;
