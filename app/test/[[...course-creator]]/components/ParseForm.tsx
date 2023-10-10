"use client";
import { SubmitHandler } from "react-hook-form";
import Form from "@/app/components/Form";
import { ParseFormSchema, ParseFormSchemaType } from "../schema";
import Lessons from "./Lessons";
import { toTimestamp } from "../utils/TimestampParser";

function ParseForm({ totalLength }: { totalLength: number }) {
  const minLength = 0;

  const onSubmit: SubmitHandler<ParseFormSchemaType> = async (data) => {
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
      <Form<ParseFormSchemaType>
        schema={ParseFormSchema}
        onSubmit={onSubmit}
        defaultValues={initialValues}
        arrayName="lessons"
      >
        <Lessons />
      </Form>
    </div>
  );
}

export default ParseForm;
