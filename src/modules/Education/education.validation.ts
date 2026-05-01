import { z } from "zod";

export const createEducationSchema = z.object({
  body: z.object({
    institute: z.string({ message: "Institute name is required" }),
    degree: z.string({ message: "Degree is required" }),
    field: z.string({ message: "Field of study is required" }),
    startYear: z.coerce.number().int().min(1950, "Valid start year required").max(new Date().getFullYear(), "Start year cannot be in the future"),
    endYear: z.coerce.number().int().optional(),
  })
});

export const updateEducationSchema = z.object({
  body: z.object({
    institute: z.string().optional(),
    degree: z.string().optional(),
    field: z.string().optional(),
    startYear: z.coerce.number().int().min(1950).max(new Date().getFullYear()).optional(),
    endYear: z.coerce.number().int().optional(),
  })
});

export const EducationValidation = {
  createEducationSchema,
  updateEducationSchema
};
