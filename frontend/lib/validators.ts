import { z } from "zod";
export const CardSchema = z.object({
  id: z.string(),
  title: z.string().min(3),
  content_md: z.string().min(1),
  keywords: z.array(z.string()),
});
export type Card = z.infer<typeof CardSchema>;
export const FullCardSchema = CardSchema.extend({});
export type FullCard = z.infer<typeof FullCardSchema>;
