import { z } from "zod";

export const forumPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  fileId: z.string(),
});

export type ForumPostSchemaType = z.infer<typeof forumPostSchema>;
