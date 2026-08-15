import { z } from "zod";

export const reviewScema = z.object({
  id: z.number().optional(),
  name: z.string(),
  reviewId: z.string(),
  rating: z.number(),
  textreview: z.string(),
  createdAt: z.string().optional(),
  email: z.email(),
});
