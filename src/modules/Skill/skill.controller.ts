import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SkillService } from "./skill.service";
import { SkillCreateInput, SkillUpdateInput } from "../../generated/prisma/models";

const createSkill = catchAsync(async (req: Request, res: Response) => {
  const file = req.file as Express.Multer.File;

  if (!file) {
    throw new Error("Icon is required");
  }

  const skillData : SkillCreateInput = { ...req.body };

  skillData.icon = (file as any).path || (file as any).url;

  const result = await SkillService.createSkill(skillData);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Skill created successfully",
    data: result,
  });
});

const getAllSkills = catchAsync(async (req: Request, res: Response) => {
  const result = await SkillService.getAllSkills();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Skills retrieved successfully",
    data: result,
  });
});

const getSkillById = catchAsync(async (req: Request, res: Response) => {
  const result = await SkillService.getSkillById(req.params.id as string);

  sendResponse(res, {
    statusCode: result ? 200 : 404,
    success: !!result,
    message: result ? "Skill retrieved successfully" : "Skill not found",
    data: result,
  });
});

const updateSkill = catchAsync(async (req: Request, res: Response) => {

  const file = req.file as Express.Multer.File;

  const updateData: SkillUpdateInput = { ...req.body };

  if (file) {
    updateData.icon = (file as any).path || (file as any).url;
  }

  const result = await SkillService.updateSkill(req.params.id as string, updateData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Skill updated successfully",
    data: result,
  });
});

const deleteSkill = catchAsync(async (req: Request, res: Response) => {
  const result = await SkillService.deleteSkill(req.params.id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Skill deleted successfully",
    data: result,
  });
});

export const SkillController = {
  createSkill,
  getAllSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
};
