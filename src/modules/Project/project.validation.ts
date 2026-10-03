import { z } from "zod";
import { ProjectStatus } from "../../generated/prisma/enums";

const optionalUrl = z.union([z.string().url(), z.literal("")]).optional();

// Multipart sends booleans as "true"/"false" strings; z.coerce.boolean() would
// turn "false" into true, so normalise explicitly.
const booleanField = z.preprocess((val) => {
  if (val === "true") return true;
  if (val === "false") return false;
  return val;
}, z.boolean().optional());

// Accepts: an array, a JSON string array (e.g. '["id1","id2"]'),
// a comma-separated string, or a single string. Returns string[] | undefined.
const skillsField = z.preprocess((val) => {
  if (val === undefined || val === null || val === "") return undefined;
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    const trimmed = val.trim();
    if (trimmed.startsWith("[")) {
      try {
        const parsed = JSON.parse(trimmed);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        return [trimmed];
      }
    }
    return trimmed
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return val;
}, z.array(z.string()).optional());

export const createProjectSchema = z.object({
  body: z.object({
    title: z.string({ message: "Title is required" }),
    description: z.string({ message: "Description is required" }),
    problem: z.string({ message: "Problem statement is required" }),
    solution: z.string({ message: "Solution statement is required" }),
    challenges: z.string().optional(),
    futurePlan: z.string().optional(),
    githubUrl: optionalUrl,
    liveUrl: optionalUrl,
    image: z.string().optional(),
    status: z.nativeEnum(ProjectStatus, { message: "Status is required" } as any),
    featured: booleanField,
    skills: skillsField,
  }),
});

export const updateProjectSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    problem: z.string().optional(),
    solution: z.string().optional(),
    challenges: z.string().optional(),
    futurePlan: z.string().optional(),
    githubUrl: optionalUrl,
    liveUrl: optionalUrl,
    image: z.string().optional(),
    status: z.nativeEnum(ProjectStatus).optional(),
    featured: booleanField,
    skills: skillsField,
  }),
});

export const reorderProjectsSchema = z.object({
  body: z
    .object({
      ids: z
        .array(z.string().min(1))
        .min(1, "At least one project id is required"),
    })
    .refine((data) => new Set(data.ids).size === data.ids.length, {
      message: "Duplicate project ids are not allowed",
      path: ["ids"],
    }),
});

export const ProjectValidation = {
  createProjectSchema,
  updateProjectSchema,
  reorderProjectsSchema,
};
