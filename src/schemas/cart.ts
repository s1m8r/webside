import z from "zod";

export const CartItemSchema = z.object({
  productId: z.number(),
  quantity: z.number(),
  name: z.string().min(1, "Product name is required"),
  price: z.number().min(1, "Price must be greater than 0"),
  createdAt: z.string().optional(),
});
export const CartScema = z.object({
  data: z.array(CartItemSchema),
  email: z.email(),
  id: z.number().optional(),
});
