"use client";
import { useForm, FormProvider, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ZodObject } from "zod";
import { type ReactNode } from "react";
type GenericOnSubmit = (
  data: Record<string, FieldValues>,
  event?: React.BaseSyntheticEvent,
) => void;
function Form<DataSchema extends Record<string, FieldValues>>({
  schema,
  onSubmit,
  children,
  defaultValues,
  className,
}: {
  schema: ZodObject<FieldValues>;
  onSubmit: (data: DataSchema, event?: React.BaseSyntheticEvent) => void;
  children: ReactNode;
  defaultValues?: Record<string, FieldValues>;
  arrayName?: string;
  className?: string;
}) {
  const methods = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });
  const handleSubmit = methods.handleSubmit;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit as GenericOnSubmit)}
        className={`flex w-full gap-3 ${className}`}
      >
        {children}
      </form>
    </FormProvider>
  );
}

export default Form;
