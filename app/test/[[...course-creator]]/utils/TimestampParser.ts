import { TIMESTAMP_REGEX } from "../schema";

export function toSeconds(timestamp: string): number {
  if (TIMESTAMP_REGEX.test(timestamp)) {
    let times = timestamp.split(":");
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
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  let s = Math.floor((seconds % 3600) % 60);
  let hoursString = hours < 10 ? `0${hours}` : `${hours}`;
  let minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
  let secondsString = s < 10 ? `0${s}` : `${s}`;
  return `${hoursString}:${minutesString}:${secondsString}`;
}
