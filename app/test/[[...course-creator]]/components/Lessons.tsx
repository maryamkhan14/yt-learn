import { useFieldArray, useFormContext } from "react-hook-form";
import Lesson from "./Lesson";
import Button from "../../../../components/button/CircularIconOnlyButton";
function Lessons() {
  const { control } = useFormContext();
  const { fields, insert, remove } = useFieldArray({
    control,
    name: "lessons",
  });
  return (
    <div className=" flex flex-col items-center gap-7">
      {fields.map((lesson, idx) => (
        <Lesson key={lesson.id} idx={idx} insert={insert} remove={remove} />
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
