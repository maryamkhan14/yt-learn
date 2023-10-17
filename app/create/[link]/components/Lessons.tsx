import { useFieldArray, useFormContext } from "react-hook-form";
import Lesson from "./Lesson";
import Button from "../../../../components/button/CircularIconOnlyButton";
function Lessons({ totalLength }: { totalLength: number }) {
  const { control } = useFormContext();
  const { fields, insert, remove, move } = useFieldArray({
    control,
    name: "lessons",
  });

  return (
    <div className=" flex flex-col items-center gap-7">
      {fields.map((lesson, id) => (
        <Lesson
          key={lesson.id}
          id={id}
          insert={insert}
          remove={remove}
          move={move}
          maxLength={totalLength}
        />
      ))}

      <Button
        icon="ri-check-fill"
        srCaption="Construct the course"
        type="submit"
        className="text-green-500 hover:bg-green-700/50 "
      />
    </div>
  );
}

export default Lessons;
