import { z } from "zod";
export const LINK_REGEX =
  /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/g;
export const LinkSchema = z.object({
  link: z
    .string()
    .regex(LINK_REGEX, "Please enter a YouTube link to get started!"),
});
export type LinkSchema = z.infer<typeof LinkSchema>;
