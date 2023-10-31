function Layout(props: {
  children: React.ReactNode;
  timeline: React.ReactNode;
}) {
  return (
    <>
      {props.children}
      {props.timeline}
    </>
  );
}

export default Layout;
