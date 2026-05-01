import { z } from "zod";

export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    designation: z.string().optional(),
    bio: z.string().optional(),
    about: z.string().optional(),
    phone: z.string().optional(),
    whatsapp: z.string().optional(),
    github: z.string().url().optional().or(z.literal("")),
    linkedin: z.string().url().optional().or(z.literal("")),
    x: z.string().url().optional().or(z.literal("")),
    resumeUrl: z.string().url().optional().or(z.literal("")),
  })
});

export const UserValidation = {
  updateUserSchema
};
