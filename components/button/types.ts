import { type BaseSyntheticEvent } from "react";
interface ButtonWithTextProps {
  text: string;
  srCaption?: never;
}

interface ButtonWithSrCaptionProps {
  text?: never;
  srCaption: string;
}
interface BaseButtonProps {
  buttonStyles: string;
  icon?: string;
  onClick?: (e: BaseSyntheticEvent) => void;
  type?: "submit" | "button";
  role?: "link";
}
export type ButtonProps = BaseButtonProps &
  (ButtonWithTextProps | ButtonWithSrCaptionProps);

export type CircularIconOnlyButtonProps = ButtonProps & { icon: string };
export type FilledButtonProps = ButtonProps & {
  fillStyles?: string;
  textStyles?: string;
};
