import { type LessonSchemaType } from "../schema";
import { toTimestamp, toSeconds } from "../utils/TimestampParser";
import { z } from "zod";

import {
  FieldValues,
  useFormContext,
  type UseFormWatch,
  type UseFieldArrayRemove,
  UseFieldArrayInsert,
} from "react-hook-form";
import Input from "@/app/components/Input";
import Button from "./Button";

function calculateStartTime(
  watch: UseFormWatch<FieldValues>,
  idx: number,
): { timestamp: string; startTime: number } {
  if (idx === 0) {
    return { timestamp: "00:00:00", startTime: 0 };
  }

  const previousEndingTimeStampInSeconds = toSeconds(
    watch(`lessons[${idx - 1}].end`),
  );
  return {
    timestamp: toTimestamp(previousEndingTimeStampInSeconds + 1),
    startTime: previousEndingTimeStampInSeconds,
  };
}
function Lesson({
  idx,
  insert,
  remove,
  maxIdx,
}: {
  idx: number;
  insert: UseFieldArrayInsert<FieldValues, "lessons">;
  remove: UseFieldArrayRemove;
  maxIdx: number;
}) {
  const {
    watch,
    formState: { defaultValues },
  } = useFormContext();
  const { timestamp: startTimestamp, startTime } = calculateStartTime(
    watch,
    idx,
  );
  const endTime = toSeconds(watch(`lessons[${idx}].end`));
  return (
    <div className="flex w-full flex-col gap-3 md:flex-row ">
      <div className="min-w-1/4 flex flex-col">
        <label>
          <span>Start</span>
          <input
            disabled={true}
            className={`w-full rounded-lg border-4 border-opacity-0 px-4 py-3 text-lg text-gray-900 outline-none focus:border-blue-600 focus:bg-white focus:ring-0  disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-400`}
            value={startTimestamp}
          />
        </label>
      </div>
      <Input<LessonSchemaType>
        displayName="End"
        name={`lessons[${idx}].end`}
        type="numeric"
        inputMode="numeric"
        maxLength={25}
        placeholder="00:00:01 - will be replaced by YT vid's length"
      ></Input>
      <Input<LessonSchemaType>
        displayName="Lesson name"
        name={`lessons[${idx}].name`}
        type="text"
        className="grow"
        placeholder="This lesson's name. Keep it short and sweet."
        maxLength={75}
        displayRemainingCharacters={true}
      ></Input>
      <div
        className={`w-1/8 } } flex  justify-between gap-2 
       md:flex-col md:justify-end`}
      >
        {endTime > 0 && (
          <Button
            icon="ri-add-fill "
            srCaption="Add a new lesson"
            onClick={() => {
              insert(idx + 1, defaultValues?.lessons?.[0]);
            }}
            className="text-gray-100 hover:bg-blue-700/50 active:text-slate-700 "
          />
        )}
        {idx < maxIdx ? (
          <Button
            icon="ri-subtract-fill "
            srCaption="Remove this lesson"
            onClick={() => {
              remove(idx);
            }}
            className="text-red-500 hover:bg-red-700/50 "
          />
        ) : (
          <Button
            icon="ri-check-fill"
            srCaption="Add this lesson"
            type="submit"
            className="text-green-500 hover:bg-green-700/50 "
          />
        )}
      </div>
    </div>
  );
}

export default Lesson;
