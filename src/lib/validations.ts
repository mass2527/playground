import { z } from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .min(4, { message: "Title is too short" })
    .max(20, { message: "Title is too long" }),
  content: z
    .string()
    .min(8, { message: "Content is too short" })
    .max(200, { message: "Content is too long" }),
});

export const createCommentSchema = z.object({
  content: z.string().min(1),
});
