import { z } from "zod";

export const createMessageSchema = z.object({
  body: z.object({
    name: z.string({ message: "Name is required" }),
    email: z.string({ message: "Email is required" }).email("Invalid email format"),
    message: z.string({ message: "Message is required" }),
  })
});

export const MessageValidation = {
  createMessageSchema
};
