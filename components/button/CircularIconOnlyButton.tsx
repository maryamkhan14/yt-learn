import { BaseSyntheticEvent } from "react";

function CircularIconOnlyButton({
  icon,
  srCaption,
  className,
  onClick,
  type = "button",
}: {
  className: string;
  icon: string;
  srCaption: string;
  onClick?: (e: BaseSyntheticEvent) => void;
  type?: "submit" | "button";
}) {
  return (
    <button
      className={`${className} h-12 w-12 rounded-full border border-gray-200  p-1 text-2xl outline-none  active:border-blue-600  active:bg-white active:ring-0 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-400`}
      onClick={onClick}
      type={type}
    >
      <i className={`${icon} m-0 p-0`}></i>
      <span className="sr-only">{srCaption}</span>
    </button>
  );
}

export default CircularIconOnlyButton;
