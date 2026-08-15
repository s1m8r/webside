import z from "zod";

export const colorsSchema = z.object({
  id: z.number().optional(),
  color: z.string(),
  path: z.string(),
});
