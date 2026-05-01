import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { EducationService } from "./education.service";

const createEducation = catchAsync(async (req: Request, res: Response) => {
  const result = await EducationService.createEducation(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Education created successfully",
    data: result,
  });
});

const getAllEducation = catchAsync(async (req: Request, res: Response) => {
  const result = await EducationService.getAllEducation();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Educations retrieved successfully",
    data: result,
  });
});

const getEducationById = catchAsync(async (req: Request, res: Response) => {
  const result = await EducationService.getEducationById(req.params.id as string);

  sendResponse(res, {
    statusCode: result ? 200 : 404,
    success: !!result,
    message: result ? "Education retrieved successfully" : "Education not found",
    data: result,
  });
});

const updateEducation = catchAsync(async (req: Request, res: Response) => {
  const result = await EducationService.updateEducation(req.params.id as string, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Education updated successfully",
    data: result,
  });
});

const deleteEducation = catchAsync(async (req: Request, res: Response) => {
  const result = await EducationService.deleteEducation(req.params.id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Education deleted successfully",
    data: result,
  });
});

export const EducationController = {
  createEducation,
  getAllEducation,
  getEducationById,
  updateEducation,
  deleteEducation,
};
