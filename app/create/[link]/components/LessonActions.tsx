import {
  type FieldValues,
  useFormContext,
  type UseFieldArrayRemove,
  type UseFieldArrayInsert,
} from "react-hook-form";
import CircularIconOnlyButton from "@/components/button/CircularIconOnlyButton";
import { type LessonSchema } from "../schema";
import { toTimestamp } from "../../../../lib/time";
type LessonActionsProps = {
  endTime: number;
  insert: UseFieldArrayInsert<FieldValues, "lessons">;
  remove: UseFieldArrayRemove;
  maxLength: number;
  id: number;
};
function LessonActions({
  endTime,
  insert,
  remove,
  id,
  maxLength,
}: LessonActionsProps) {
  const { getValues } = useFormContext<{ lessons: Array<LessonSchema> }>();
  const { lessons } = getValues();
  return (
    <div
      className={`my-1 flex h-fit min-w-[10%] justify-evenly gap-2 self-start`}
    >
      {endTime > 0 && (
        <CircularIconOnlyButton
          icon="ri-add-fill "
          srCaption="Add a new lesson"
          onClick={() => {
            insert(id + 1, {
              start: toTimestamp(Math.min(endTime + 1, maxLength)),
              end: toTimestamp(Math.min(endTime + 2, maxLength)), // replace with min of maxLength & end
              name: "",
            });
          }}
          className={`text-gray-100 hover:bg-blue-700/50 active:text-slate-700`}
        />
      )}
      {lessons.length > 1 && (
        <CircularIconOnlyButton
          icon="ri-subtract-fill "
          srCaption="Remove this lesson"
          onClick={() => {
            remove(id);
          }}
          className="text-red-500 hover:bg-red-700/50 "
        />
      )}
    </div>
  );
}

export default LessonActions;
