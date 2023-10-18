import { z } from "zod";
export const LINK_REGEX =
  /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/g;

const link = z
  .string()
  .regex(LINK_REGEX, "Please enter a YouTube link to get started!");
export const LinkFormSchema = z.object({
  link,
});
export type LinkFormSchema = z.infer<typeof LinkFormSchema>;
export type Link = z.infer<typeof link>;
