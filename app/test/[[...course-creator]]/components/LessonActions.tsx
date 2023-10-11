import {
  type FieldValues,
  useFormContext,
  type UseFieldArrayRemove,
  type UseFieldArrayInsert,
  type DefaultValues,
} from "react-hook-form";
import CircularIconOnlyButton from "@/components/button/CircularIconOnlyButton";
import { ParseFormSchema } from "../schema";
type LessonActionsProps = {
  endTime: number;
  insert: UseFieldArrayInsert<FieldValues, "lessons">;
  remove: UseFieldArrayRemove;
  defaultValues: DefaultValues<ParseFormSchema>;
  idx: number;
};
function LessonActions({
  endTime,
  insert,
  remove,
  defaultValues,
  idx,
}: LessonActionsProps) {
  const { getValues } = useFormContext();
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
            insert(idx + 1, defaultValues?.lessons?.[0]);
          }}
          className={`text-gray-100 hover:bg-blue-700/50 active:text-slate-700`}
        />
      )}
      {lessons.length > 1 && (
        <CircularIconOnlyButton
          icon="ri-subtract-fill "
          srCaption="Remove this lesson"
          onClick={() => {
            remove(idx);
          }}
          className="text-red-500 hover:bg-red-700/50 "
        />
      )}
    </div>
  );
}

export default LessonActions;
