import z from "zod";

export const CartItemSchema = z.object({
  productId: z.number(),
  quantity: z.number(),
  discount: z.number(),
  name: z.string().min(1, "Product name is required"),
  price: z.number().min(1, "Price must be greater than 0"),
  image: z.string(),
  color: z.string(),
});

export const CartCreateSchema = z.object({
  data: z.array(CartItemSchema),
  email: z.email(),
});

export const CartScema = z.object({
  data: z.array(CartItemSchema),
  email: z.email(),
  id: z.number().optional(),
  createdAt: z.string(),
});
