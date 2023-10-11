import { ParseFormSchema, type LessonSchema } from "../schema";
import { toSeconds, toTimestamp } from "../utils/TimestampParser";
import LessonActions from "./LessonActions";
("./LessonActions");
import {
  FieldValues,
  useFormContext,
  type UseFormWatch,
  type UseFieldArrayRemove,
  UseFieldArrayInsert,
} from "react-hook-form";
import Input from "@/components/Input";
import CircularIconOnlyButton from "@/components/button/CircularIconOnlyButton";

type LessonProps = {
  idx: number;
  insert: UseFieldArrayInsert<FieldValues, "lessons">;
  remove: UseFieldArrayRemove;
};

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
function Lesson({ idx, insert, remove }: LessonProps) {
  const {
    watch,
    formState: { defaultValues },
  } = useFormContext();
  const { timestamp: startTimestamp } = calculateStartTime(watch, idx);
  const endTime = toSeconds(watch(`lessons[${idx}].end`));
  return (
    <div className="my-3 flex w-full flex-col gap-3 md:flex-row ">
      <div className="relative my-3 flex flex-col md:my-0 md:w-1/6">
        <label className="absolute  top-0  -translate-y-[100%] transform ">
          <span>Start</span>
        </label>
        <input
          disabled={true}
          className="w-full rounded-lg border-4 border-opacity-0 px-4 py-3 text-lg text-gray-900 outline-none focus:border-blue-600 focus:bg-white focus:ring-0  disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-400"
          defaultValue={startTimestamp}
        />
      </div>
      <Input<LessonSchema>
        displayName="End"
        name={`lessons[${idx}].end`}
        type="numeric"
        inputMode="numeric"
        containerStyles="md:w-1/6"
        inputStyles="focus:bg-white"
        maxLength={25}
        placeholder="00:00:01 - will be replaced by YT vid's length"
      ></Input>
      <Input<LessonSchema>
        displayName="Lesson name"
        name={`lessons[${idx}].name`}
        type="text"
        containerStyles="grow"
        inputStyles="focus:bg-white"
        placeholder="This lesson's name. Keep it short and sweet."
        maxLength={75}
        displayRemainingCharacters={true}
      ></Input>
      <LessonActions
        endTime={endTime}
        insert={insert}
        remove={remove}
        defaultValues={defaultValues as ParseFormSchema}
        idx={idx}
      />
    </div>
  );
}

export default Lesson;
