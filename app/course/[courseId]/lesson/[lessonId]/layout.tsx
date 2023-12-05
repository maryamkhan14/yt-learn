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
    <>
      {children}
      {lesson}
      {notes}
    </>
  );
}

export default LessonPageLayout;
