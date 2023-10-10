import { useFieldArray, useFormContext, useFormState } from "react-hook-form";
import Lesson from "./Lesson";
function Lessons() {
  const { control } = useFormContext();
  const { fields, insert, remove } = useFieldArray({
    control,
    name: "lessons",
  });
  return (
    <div className=" flex flex-col gap-7">
      {fields.map((lesson, idx) => (
        <Lesson
          key={lesson.id}
          idx={idx}
          insert={insert}
          remove={remove}
          maxIdx={fields.length - 1}
        />
      ))}
    </div>
  );
}

export default Lessons;
