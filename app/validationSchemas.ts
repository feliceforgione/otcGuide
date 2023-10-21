import { z } from "zod";

export const createDiseaseClassSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  aliasname: z.string().min(1).max(255).nullable(),
  description: z.string().min(1).max(255).nullable(),
  buttonimage: z.string().min(1).max(255).nullable(),
  order: z.number().int().nullable(),
});
