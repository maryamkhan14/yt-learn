import {
  VerticalTimelineElement,
  type VerticalTimelineElementProps,
} from "react-vertical-timeline-component";
function ErrorIcon() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <i className="ri-alert-line  text-2xl md:text-4xl"></i>
    </div>
  );
}
function TimelineElement(
  props: VerticalTimelineElementProps & { error: boolean },
) {
  const { error, ...timelineProps } = props;
  return (
    <VerticalTimelineElement
      visible={true}
      className="vertical-timeline-element--work "
      textClassName="border-2 border-blue-400 shadow-blue-400 shadow-glow"
      contentArrowStyle={{
        borderRight: "7px solid  rgb(33, 150, 243)",
      }}
      contentStyle={{
        background: "inherit",
        borderTop: "7px solid  rgb(33, 150, 243)",
      }}
      dateClassName="md:mx-2 md:-my-1"
      iconClassName={error ? "bg-red-600 " : `bg-blue-400`}
      icon={error && <ErrorIcon />}
      {...timelineProps}
    >
      {props.children}
    </VerticalTimelineElement>
  );
}

export default TimelineElement;
