import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
function Input<Model extends Record<string, any>>({
  name,
  displayName,
  type,
  className,
  placeholder,
  maxLength = 0,
  inputMode = "text",
  displayRemainingCharacters = false,
}: {
  name: keyof Model | string;
  displayName: string;
  type: string;
  className?: string;
  placeholder?: string;
  maxLength?: number;
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
  const isInvalid = !!getFieldState(name as string).invalid;
  return (
    <div className={`min-w-1/4 flex flex-col ${className} `}>
      <div
        className="m-0 flex w-full items-end  justify-between p-0"
        role="label"
      >
        <p className="m-0 whitespace-nowrap p-0">{displayName}</p>

        {displayRemainingCharacters && watch(name as string)?.length > 0 && (
          <span className=" text-end font-light">
            {maxLength - watch(name as string).length}
          </span>
        )}
      </div>
      <div className="relative flex">
        <input
          type={type}
          className={`w-full rounded-lg  ${
            isInvalid ? "border-4 border-red-500" : "border-4 border-opacity-0"
          } px-4 py-3 text-lg text-gray-900 outline-none focus:border-blue-600 focus:bg-white focus:ring-0  disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-400`}
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
