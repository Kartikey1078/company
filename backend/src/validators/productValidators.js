import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2).max(120),
  slug: z.string().max(160).optional(),
  description: z.string().max(1000).optional().default(""),
  price: z.number().min(0),
  imageUrl: z.string().url().optional().or(z.literal("")).default(""),
  category: z.string().max(60).optional().default("General"),
  stock: z.number().int().min(0).optional().default(0)
});

export const updateProductSchema = createProductSchema.partial();
