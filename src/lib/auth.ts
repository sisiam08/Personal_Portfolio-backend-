import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { UserRole } from "../generated/prisma/enums";
import config from "../config";

const isProduction = process.env.NODE_ENV === "production";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: config.betterAuth.betterAuthUrl,
  trustedOrigins: [config.appUrl!, config.betterAuth.betterAuthUrl!],
  emailAndPassword: {
    enabled: true,
    // Public email/password sign-up is disabled by default. The one-time admin
    // seed opts in by setting BETTER_AUTH_ALLOW_SIGNUP=true before importing
    // this module (see prisma/seed.ts). This is NOT a public registration path.
    disableSignUp: process.env.BETTER_AUTH_ALLOW_SIGNUP !== "true",
  },
  advanced: {
    // Secure cookies only in production so local http://localhost dev works.
    useSecureCookies: isProduction,
    defaultCookieAttributes: {
      secure: isProduction,
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
