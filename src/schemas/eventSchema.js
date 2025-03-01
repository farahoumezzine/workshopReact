import { z } from "zod";

export const eventSchema = z.object({
  name: z.string().min(3, "Le nom doit contenir au moins 3 caractères"),
  price: z.coerce
    .number()
    .min(1, "Le prix doit être supérieur à 0")
    .max(1000, "Le prix ne peut pas dépasser 1000"),
  description: z
    .string()
    .min(10, "La description doit contenir au moins 10 caractères"),
  tickets: z.coerce
    .number()
    .min(1, "Le nombre de tickets doit être supérieur à 0")
    .max(100, "Le nombre de tickets ne peut pas dépasser 100"),
  image: z.string().url("L'URL de l'image n'est pas valide"),
  participants: z.coerce.number().default(0),
  isLiked: z.boolean().default(false),
});
