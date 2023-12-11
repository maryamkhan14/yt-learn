"use client";
import Form from "@/components/Form";
import {
  type CompletedNoteSchemaType,
  NoteFormSchema,
  type NoteFormSchemaType,
} from "../lesson/[lessonId]/@notes/schema";
import { type SubmitHandler } from "react-hook-form";
import Input from "@/components/Input";
import CircularIconOnlyButton from "@/components/button/CircularIconOnlyButton";
import { useReactPlayerStore } from "../../../hooks/useReactPlayerStore";
import { useParams } from "next/navigation";
import { trpc } from "@/trpc/Provider";
import toast from "react-hot-toast";
import BasicLoader from "@/components/loader/BasicLoader";
import { type DefaultErrorShape } from "@trpc/server";

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
  const { mutate, isLoading: isPosting } = trpc.notes.post.useMutation({
    onSuccess: ({ id: _id }) => {
      toast.success("Note saved!");
      // invalidate notes query
    },
    onError: (e) => {
      const message: DefaultErrorShape[] = JSON.parse(
        e.message,
      ) as DefaultErrorShape[];
      for (const error of message) {
        toast.error(`An error occurred: ${error.message}`);
      }
    },
  });
  const onSubmit: SubmitHandler<NoteFormSchemaType> = (note) => {
    const input: CompletedNoteSchemaType = {
      ...note,
      lessonId: lessonId as string,
      time: ~~getCurrentTime(),
    };
    mutate(input);
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

      {isPosting ? (
        <BasicLoader
          title="Saving note..."
          desc="Your note is being saved. Please wait."
          loaderStyles="h-12 w-12 self-center"
        />
      ) : (
        <NoteFormActions />
      )}
    </Form>
  );
}

export default NoteForm;
