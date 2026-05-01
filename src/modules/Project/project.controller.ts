import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProjectService } from "./project.service";
import {
  ProjectCreateInput,
  ProjectUpdateInput,
} from "../../generated/prisma/models";

const createProject = catchAsync(async (req: Request, res: Response) => {
  const file = req.file as Express.Multer.File;

  if (!file) {
    throw new Error("Image is required");
  }

  const projectData: ProjectCreateInput = { ...req.body };

  projectData.image = (file as any).path || (file as any).url;

  const result = await ProjectService.createProject(projectData);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Project created successfully",
    data: result,
  });
});

const getAllProjects = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.getAllProjects(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Projects retrieved successfully",
    data: result,
  });
});

const getProjectBySlug = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.getProjectBySlug(
    req.params.slug as string,
  );

  sendResponse(res, {
    statusCode: result ? 200 : 404,
    success: !!result,
    message: result ? "Project retrieved successfully" : "Project not found",
    data: result,
  });
});

const updateProject = catchAsync(async (req: Request, res: Response) => {
  const file = req.file as Express.Multer.File;

  const projectData: ProjectUpdateInput = { ...req.body };

  if (file) {
    projectData.image = (file as any).path || (file as any).url;
  }

  const result = await ProjectService.updateProject(
    req.params.id as string,
    projectData,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project updated successfully",
    data: result,
  });
});

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.deleteProject(req.params.id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project deleted successfully",
    data: result,
  });
});

export const ProjectController = {
  createProject,
  getAllProjects,
  getProjectBySlug,
  updateProject,
  deleteProject,
};
