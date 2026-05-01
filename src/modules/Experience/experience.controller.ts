import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ExperienceService } from "./experience.service";

const createExperience = catchAsync(async (req: Request, res: Response) => {
  const result = await ExperienceService.createExperience(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Experience created successfully",
    data: result,
  });
});

const getAllExperience = catchAsync(async (req: Request, res: Response) => {
  const result = await ExperienceService.getAllExperience();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Experiences retrieved successfully",
    data: result,
  });
});

const getExperienceById = catchAsync(async (req: Request, res: Response) => {
  const result = await ExperienceService.getExperienceById(req.params.id as string);

  sendResponse(res, {
    statusCode: result ? 200 : 404,
    success: !!result,
    message: result ? "Experience retrieved successfully" : "Experience not found",
    data: result,
  });
});

const updateExperience = catchAsync(async (req: Request, res: Response) => {
  const result = await ExperienceService.updateExperience(req.params.id as string, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Experience updated successfully",
    data: result,
  });
});

const deleteExperience = catchAsync(async (req: Request, res: Response) => {
  const result = await ExperienceService.deleteExperience(req.params.id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Experience deleted successfully",
    data: result,
  });
});

export const ExperienceController = {
  createExperience,
  getAllExperience,
  getExperienceById,
  updateExperience,
  deleteExperience,
};
