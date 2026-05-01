import { z } from "zod";

export const createExperienceSchema = z.object({
  body: z.object({
    companyName: z.string({ message: "Company name is required" }),
    role: z.string({ message: "Role is required" }),
    description: z.string({ message: "Description is required" }),
    startDate: z.string({ message: "Start date is required" }).refine((val) => !isNaN(Date.parse(val)), "Invalid start date format"),
    endDate: z.string().optional().refine((val) => !val || !isNaN(Date.parse(val)), "Invalid end date format"),
    current: z.coerce.boolean().optional(),
  })
});

export const updateExperienceSchema = z.object({
  body: z.object({
    companyName: z.string().optional(),
    role: z.string().optional(),
    description: z.string().optional(),
    startDate: z.string().optional().refine((val) => !val || !isNaN(Date.parse(val)), "Invalid start date format"),
    endDate: z.string().optional().refine((val) => !val || !isNaN(Date.parse(val)), "Invalid end date format"),
    current: z.coerce.boolean().optional(),
  })
});

export const ExperienceValidation = {
  createExperienceSchema,
  updateExperienceSchema
};
