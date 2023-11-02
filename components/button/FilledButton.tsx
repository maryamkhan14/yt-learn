import { type FilledButtonProps } from "./types";
import { twMerge } from "tailwind-merge";

function FilledButton({
  icon,
  buttonStyles,
  onClick,
  type = "button",
  role,
  text = "",
  fillStyles = "",
  textStyles = "",
  srCaption = "",
}: FilledButtonProps) {
  const outerButtonStyles = twMerge(
    "group/tl-btn relative rounded-lg border-2 px-4 py-2 transition-all ease-in hover:px-6",
    buttonStyles,
  );
  const innerDivStyles = twMerge(
    "absolute inset-0 h-full w-0 rounded-lg bg-red-800 transition-all duration-[250ms]  ease-out group-hover/tl-btn:w-full",
    fillStyles,
  );

  const buttonTextStyles = twMerge(
    "relative rounded-lg text-white group-hover:text-white",
    textStyles,
  );
  return (
    <button
      type={type}
      role={role}
      onClick={onClick}
      className={outerButtonStyles}
    >
      {icon && <i className={`${icon} mr-2 p-0`}></i>}

      <div className={innerDivStyles} />
      <span className={buttonTextStyles}>{text}</span>
      <span className="sr-only">{srCaption}</span>
    </button>
  );
}

export default FilledButton;
