"use client";
import { LinkSchema, LINK_REGEX } from "@/app/(landing-page)/schema";
import Form from "@/components/Form";
import Input from "@/components/Input";
import { type SubmitHandler } from "react-hook-form";
import Button from "@/components/button/CircularIconOnlyButton";
import { useRouter } from "next/navigation";

function LinkForm() {
  const router = useRouter();
  const onSubmit: SubmitHandler<LinkSchema> = (data: LinkSchema) => {
    let id;
    let match;
    LINK_REGEX.lastIndex = 0;
    while ((match = LINK_REGEX.exec(data.link)) !== null) {
      id = match[6];
    }
    if (!!id) router.push(`/create/${id}`);
  };
  return (
    <div className="flex  flex-col gap-3 ">
      <h1 className="mb-2 whitespace-nowrap p-0 text-center text-2xl text-yellow-400">
        Give it a spin! 👇
      </h1>
      <Form<LinkSchema>
        schema={LinkSchema}
        onSubmit={onSubmit}
        defaultValues={{ link: "" }}
        className="group flex items-stretch"
      >
        <Input<LinkSchema>
          name="link"
          displayName="Link"
          containerStyles="grow"
          inputStyles="rounded-none border-b-2 border-gray-100 border-opacity-full border-t-0 border-r-0 border-l-0 bg-transparent  text-slate-100 focus:bg-transparent focus:border-b-2"
          placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        />
        <Button
          icon="ri-arrow-right-s-line"
          srCaption="Load YouTube video"
          type="submit"
          className="h-16 w-16 text-5xl text-yellow-300 group-hover:animate-pulse"
        />
      </Form>
    </div>
  );
}

export default LinkForm;
