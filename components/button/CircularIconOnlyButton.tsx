import { twMerge } from "tailwind-merge";
import { type CircularIconOnlyButtonProps } from "./types";
import { memo } from "react";
function CircularIconOnlyButton({
  icon,
  srCaption,
  buttonStyles,
  onClick,
  type = "button",
}: CircularIconOnlyButtonProps) {
  const circularIconOnlyButtonStyle = twMerge(
    "h-12 w-12 rounded-full border border-gray-200  p-1 text-2xl outline-none  active:border-blue-600  active:bg-white active:ring-0 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-400",
    buttonStyles,
  );
  return (
    <button
      className={circularIconOnlyButtonStyle}
      onClick={onClick}
      type={type}
    >
      <i className={`${icon} m-0 p-0`}></i>
      <span className="sr-only">{srCaption}</span>
    </button>
  );
}

export default memo(CircularIconOnlyButton);
