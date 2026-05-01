import { UserUpdateInput } from "../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

const getMyProfile = async () => {
  const result = await prisma.user.findFirst();
  return result;
};

const updateMyProfile = async (id: string, payload: UserUpdateInput) => {
  const result = await prisma.user.update({
    where: { id },
    data: payload
  });
  return result;
};

export const UserService = {
  getMyProfile,
  updateMyProfile
};
