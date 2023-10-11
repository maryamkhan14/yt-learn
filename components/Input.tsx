import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";
function Input<Model extends Record<string, any>>({
  name,
  displayName,
  type = "text",
  containerStyles,
  inputStyles,
  placeholder,
  maxLength,
  inputMode = "text",
  displayRemainingCharacters = false,
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
}) {
  const {
    register,
    formState: { isSubmitting, errors },
    watch,
    getFieldState,
  } = useFormContext();
  const inputClassName = twMerge(
    "w-full rounded-lg border-4 border-opacity-0 px-4 py-3 text-lg text-gray-900 outline-none invalid:border-4 invalid:border-red-500 focus:border-blue-600 focus:ring-0  disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-400",
    inputStyles,
  );
  const containerClassName = twMerge(
    "min-w-1/5 flex flex-col relative my-3 md:my-0",
    containerStyles,
  );
  const isInvalid = !!getFieldState(name as string).invalid;
  return (
    <div className={containerClassName}>
      <div
        className="absolute top-0 flex w-full -translate-y-[100%] transform items-end  justify-between p-0"
        role="label"
      >
        <p className="m-0 whitespace-nowrap p-0">{displayName}</p>

        {displayRemainingCharacters &&
          watch(name as string)?.length > 0 &&
          !!maxLength && (
            <span className=" text-end font-light">
              {maxLength - watch(name as string).length}
            </span>
          )}
      </div>
      <div>
        <input
          type={type}
          className={inputClassName}
          {...register(name as string)}
          disabled={isSubmitting}
          placeholder={placeholder}
          maxLength={maxLength}
          inputMode={inputMode}
        />
      </div>
      <ErrorMessage
        errors={errors}
        name={name as string}
        render={({ message }) => (
          <span className="rounded bg-gray-100/50 py-1 text-center  text-slate-700">
            {message as string}
          </span>
        )}
      />
    </div>
  );
}
export default Input;
