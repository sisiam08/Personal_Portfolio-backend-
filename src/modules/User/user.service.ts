import { UserUpdateInput } from "../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { deleteFileFromCloudinary } from "../../config/cloudinary.config";

const getMyProfile = async () => {
  const result = await prisma.user.findFirst();
  return result;
};

const updateMyProfile = async (id: string, payload: UserUpdateInput) => {
  const existing = await prisma.user.findUnique({ where: { id } });

  const result = await prisma.user.update({
    where: { id },
    data: payload
  });

  if (payload.image && existing?.image && existing.image !== payload.image) {
    deleteFileFromCloudinary(existing.image).catch(() => undefined);
  }

  if (
    payload.resumeUrl &&
    existing?.resumeUrl &&
    existing.resumeUrl !== payload.resumeUrl
  ) {
    deleteFileFromCloudinary(existing.resumeUrl).catch(() => undefined);
  }

  return result;
};

export const UserService = {
  getMyProfile,
  updateMyProfile
};
