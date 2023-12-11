function LessonPageLayout({
  children,
  notes,
  lesson,
}: {
  children: React.ReactNode;
  notes: React.ReactNode;
  lesson: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-12">
      {children}
      {lesson}
      {notes}
    </section>
  );
}

export default LessonPageLayout;
