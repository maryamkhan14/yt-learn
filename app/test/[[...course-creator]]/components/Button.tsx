import { BaseSyntheticEvent } from "react";

function Button({
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
      className={`${className} h-14 w-14 rounded-full border border-gray-200  p-1 text-3xl outline-none  active:border-blue-600  active:bg-white active:ring-0 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-400`}
      onClick={onClick}
      type={type}
    >
      <i className={`${icon} m-0 p-0`}></i>
      <span className="sr-only">{srCaption}</span>
    </button>
  );
}

export default Button;
