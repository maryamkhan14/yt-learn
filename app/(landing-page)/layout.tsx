function HomepageLayout(props: {
  children: React.ReactNode;
  linkform: React.ReactNode;
}) {
  return (
    <div className="max-h-[80%] w-full justify-center bg-slate-900/20 p-8 text-center">
      {props.children}
      {props.linkform}
    </div>
  );
}

export default HomepageLayout;
