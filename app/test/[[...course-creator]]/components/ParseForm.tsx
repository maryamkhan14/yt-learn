"use client";
import { SubmitHandler, useFieldArray, useFormContext } from "react-hook-form";
import Form from "@/components/Form";
import { ParseFormSchema } from "../schema";
import Lessons from "./Lessons";
import { toTimestamp } from "../utils/TimestampParser";

function ParseForm({ totalLength }: { totalLength: number }) {
  const onSubmit: SubmitHandler<ParseFormSchema> = async (data) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        alert("it worked!");
        resolve(undefined);
      }, 3000);
    });
  };
  const initialValues = {
    lessons: [
      {
        end: toTimestamp(totalLength), ///YT vid length
        name: "",
      },
    ],
  };
  return (
    <div>
      <Form<ParseFormSchema>
        schema={ParseFormSchema}
        onSubmit={onSubmit}
        defaultValues={initialValues}
        arrayName="lessons"
        className="flex-col"
      >
        <Lessons />
      </Form>
    </div>
  );
}

export default ParseForm;
