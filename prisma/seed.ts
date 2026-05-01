import config from "../src/config";
import { UserRole } from "../src/generated/prisma/enums";
import { auth } from "../src/lib/auth";
import { prisma } from "../src/lib/prisma";

export async function seedAdmin() {
  try {
    // Check required admin config
    if (!config.admin.email || !config.admin.name || !config.admin.password) {
      console.warn(
        "Admin credentials not set in .env. Skipping admin creation.",
      );
      return;
    }

    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: {
        email: config.admin.email,
      },
    });

    if (existingAdmin) {
      console.log("✓ Admin user already exists");
      return;
    }

    await auth.api.signUpEmail({
      headers: new Headers({
        origin: config.appUrl ?? "http://localhost:3000",
      }),
      body: {
        name: config.admin.name,
        email: config.admin.email,
        password: config.admin.password,
        role: UserRole.ADMIN,
      },
    });

    // Mark email as verified and set role to ADMIN
    await prisma.user.update({
      where: {
        email: config.admin.email,
      },
      data: {
        emailVerified: true,
        role: UserRole.ADMIN,
      },
    });

    console.log("Admin user created successfully");
  } catch (error: any) {
    console.error("Admin seeding error:", error.message || error);
    throw error;
  }
}

seedAdmin();
