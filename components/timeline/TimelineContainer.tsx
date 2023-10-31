import {
  VerticalTimeline,
  type VerticalTimelineProps,
} from "react-vertical-timeline-component";

function TimelineContainer(props: VerticalTimelineProps) {
  return <VerticalTimeline {...props}>{props.children}</VerticalTimeline>;
}

export default TimelineContainer;
