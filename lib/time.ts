import { TIMESTAMP_REGEX } from "../app/create/[link]/schema";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
export const dayJsInstance = dayjs;
export function toSeconds(timestamp: string): number {
  if (TIMESTAMP_REGEX.test(timestamp)) {
    const times = timestamp.split(":");
    let seconds = 0;
    let secondsMultiplier = 3600;

    times.map((time) => {
      seconds += parseInt(time) * secondsMultiplier;
      secondsMultiplier /= 60;
    });
    return seconds;
  }
  return 0;
}
export function toTimestamp(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const s = Math.floor((seconds % 3600) % 60);
  const hoursString = hours < 10 ? `0${hours}` : `${hours}`;
  const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const secondsString = s < 10 ? `0${s}` : `${s}`;
  return `${hoursString}:${minutesString}:${secondsString}`;
}
