import { z } from "zod";
export const NoteFormSchema = z.object({
  note: z
    .string()
    .min(25, "Note must contain at least 25 characters")
    .max(1000, "Note cannot exceed 1000 characters"),
});
export type NoteFormSchemaType = z.infer<typeof NoteFormSchema>;
export const CompletedNoteSchema = NoteFormSchema.extend({
  lessonId: z.string(),
  time: z.number().int().positive(),
});
export type CompletedNoteSchemaType = z.infer<typeof CompletedNoteSchema>;
