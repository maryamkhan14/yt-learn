"use client";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
type GenericOnSubmit = (
  data: Record<string, any>,
  event?: React.BaseSyntheticEvent,
) => void;
function Form<DataSchema extends Record<string, any>>({
  arrayName = "",
  schema,
  onSubmit,
  children,
  defaultValues,
  className,
}: {
  schema: any;
  onSubmit: (data: DataSchema, event?: React.BaseSyntheticEvent) => void;
  children: any;
  defaultValues?: Record<string, any>;
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
