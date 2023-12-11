"use client";
import onPromise from "@/lib/promise-handler";
import { useForm, FormProvider, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ZodEffects, type ZodObject } from "zod";
import { type ReactNode } from "react";
type GenericOnSubmit = (
  data: Record<string, FieldValues>,
  event?: React.BaseSyntheticEvent,
) => void;
function Form<DataSchema extends FieldValues>({
  schema,
  onSubmit,
  children,
  defaultValues,
  className,
}: {
  schema: ZodObject<FieldValues> | ZodEffects<ZodObject<FieldValues>>;
  onSubmit: (data: DataSchema, event?: React.BaseSyntheticEvent) => void;
  children: ReactNode;
  defaultValues?: FieldValues;
  arrayName?: string;
  className?: string;
}) {
  const methods = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });
  const handleSubmit = methods.handleSubmit;
  const submitFn = (data: DataSchema, event?: React.BaseSyntheticEvent) => {
    methods.reset(defaultValues);
    onSubmit(data, event);
  };
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={onPromise(handleSubmit(submitFn as GenericOnSubmit))}
        className={`space-between flex w-full gap-8 ${className}`}
      >
        {children}
      </form>
    </FormProvider>
  );
}

export default Form;
