import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";
import { UserUpdateInput } from "../../generated/prisma/models";

const getMyProfile = catchAsync(async (req: Request, res: Response) => {

  const result = await UserService.getMyProfile();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Profile retrieved successfully",
    data: result,
  });
});

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
     throw new Error("Unauthorized");
  }

  const file = req.file as Express.Multer.File;

  // Prepare update data
  const updateData: UserUpdateInput = {...req.body};

  if (file) {
    updateData.image = (file as any).path || (file as any).url;
  }

  const result = await UserService.updateMyProfile(userId, updateData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Profile updated successfully",
    data: result,
  });
});

export const UserController = {
  getMyProfile,
  updateMyProfile
};
