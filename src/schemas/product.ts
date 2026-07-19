import z from "zod";

export const ProdectScema = z.object({
  id: z.number(),
  storeId: z.number(),
  storeName: z.string().min(1, "Store name is required"),
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().min(1, "Image URL is required"),
  type: z.string().min(1, "Product type is required"),
  price: z.number().min(1, "Price must be greater than 0"),
  images: z.array(z.string()).min(1, "Please select at least one images"),
});
