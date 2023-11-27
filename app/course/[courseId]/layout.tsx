function CourseViewLayout(props: {
  nav: React.ReactNode;
  lesson: React.ReactNode;
  params: { courseId: string };
  children: React.ReactNode;
}) {
  return (
    <div className="flex max-h-[80%] w-full grow flex-col items-stretch bg-slate-900/20 p-8 text-center md:flex-row">
      {props.children}
      {props.nav}

      <section className="flex grow flex-col justify-center p-8">
        {props.lesson}
      </section>
    </div>
  );
}

export default CourseViewLayout;
