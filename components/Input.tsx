import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Input as BaseInput } from "@/components/ui/input";
import { Label } from "./ui/label";

function Input<Model extends Record<string, boolean | string | number>>({
  name,
  displayName,
  type = "text",
  containerStyles,
  inputStyles,
  placeholder,
  maxLength,
  inputMode = "text",
  displayRemainingCharacters = false,
  readOnly = false,
}: {
  name: keyof Model | string;
  displayName: string;
  type?: string;
  containerStyles?: string;
  inputStyles?: string;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  inputMode?:
    | "search"
    | "text"
    | "none"
    | "email"
    | "tel"
    | "url"
    | "numeric"
    | "decimal";
  displayRemainingCharacters?: boolean;
  readOnly?: boolean;
  defaultValue?: string | number;
}) {
  const {
    register,
    formState: { isSubmitting, errors },
    watch,
    getFieldState,
  } = useFormContext();

  const containerClassName = twMerge(
    "min-w-1/5 flex flex-col relative my-3 md:my-0",
    containerStyles,
  );
  const isInvalid = !!getFieldState(name as string).invalid;
  const nameValue: string = watch(name as string) as string;
  return (
    <div className={containerClassName}>
      <Label className="flex w-full justify-between pb-2">
        <p className="m-0 whitespace-nowrap p-0">{displayName}</p>

        {displayRemainingCharacters && nameValue?.length > 0 && !!maxLength && (
          <span className=" text-end font-light">
            {maxLength - nameValue.length}
          </span>
        )}
      </Label>
      <div>
        <BaseInput
          className={inputStyles}
          type={type}
          {...register(name as string)}
          disabled={isSubmitting}
          placeholder={placeholder}
          maxLength={maxLength}
          inputMode={inputMode}
          readOnly={readOnly}
        />
      </div>
      <ErrorMessage
        errors={errors}
        name={name as string}
        render={({ message }) => (
          <span className="rounded bg-gray-100/50 py-1 text-center  text-slate-700">
            {message}
          </span>
        )}
      />
    </div>
  );
}
export default Input;
