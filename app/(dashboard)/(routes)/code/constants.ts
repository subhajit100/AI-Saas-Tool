import * as z from "zod";

// for storing form schema

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Code Prompt is required",
  }),
});
