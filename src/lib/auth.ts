import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { UserRole } from "../generated/prisma/enums";
import config from "../config";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: config.betterAuth.betterAuthUrl,
  trustedOrigins: [config.appUrl!, config.betterAuth.betterAuthUrl!],
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    useSecureCookies: true,
    defaultCookieAttributes: {
      secure: true,
      sameSite: "lax",
      httpOnly: true,
      path: "/",
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: UserRole.ADMIN,
      },
      designation: {
        type: "string",
        required: false,
      },
      bio: {
        type: "string",
        required: false,
      },
      about: {
        type: "string",
        required: false,
      },
      phone: {
        type: "string",
        required: false,
      },
      whatsapp: {
        type: "string",
        required: false,
      },
      github: {
        type: "string",
        required: false,
      },
      linkedin: {
        type: "string",
        required: false,
      },
      x: {
        type: "string",
        required: false,
      },
      resumeUrl: {
        type: "string",
        required: false,
      },
    },
  },
});
