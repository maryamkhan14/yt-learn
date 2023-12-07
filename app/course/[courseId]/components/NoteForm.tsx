"use client";
import Form from "@/components/Form";
import {
  NoteFormSchema,
  type NoteFormSchemaType,
} from "../lesson/[lessonId]/@notes/schema";
import { type SubmitHandler } from "react-hook-form";
import Input from "@/components/Input";
import CircularIconOnlyButton from "@/components/button/CircularIconOnlyButton";
import { useReactPlayerStore } from "../hooks/useReactPlayerStore";
import { useParams } from "next/navigation";

const initialValues = { note: "" };
function NoteFormActions() {
  return (
    <section className="flex w-full justify-center gap-16">
      <CircularIconOnlyButton
        icon="ri-check-fill"
        srCaption="Save this note"
        type="submit"
        buttonStyles="text-green-500 hover:bg-green-700/50 self-center"
      />
      <CircularIconOnlyButton
        icon="ri-restart-line"
        srCaption="Reset the note"
        type="reset"
        buttonStyles="text-red-500 hover:bg-red-700/50 "
      />
    </section>
  );
}
function NoteForm() {
  const getCurrentTime = useReactPlayerStore((state) => state.getCurrentTime);
  const { lessonId } = useParams();
  const onSubmit: SubmitHandler<NoteFormSchemaType> = (note) => {
    console.log({
      ...note,
      time: getCurrentTime(),
      lessonId,
    });

    // submit the note
  };
  return (
    <Form<NoteFormSchemaType>
      schema={NoteFormSchema}
      onSubmit={onSubmit}
      defaultValues={initialValues}
      className="flex-col"
    >
      <Input<NoteFormSchemaType>
        name="note"
        isTextarea
        displayName="Note"
        maxLength={1000}
        placeholder="Enter a note..."
      />
      <NoteFormActions />
    </Form>
  );
}

export default NoteForm;
