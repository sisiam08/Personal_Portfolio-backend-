import { Router } from "express";
import { ProjectController } from "./project.controller";
import validateRequest from "../../middleware/validateRequest";
import { ProjectValidation } from "./project.validation";
import { auth_middleware } from "../../middleware/auth";
import { upload } from "../../config/multer.config";

const router = Router();

router.post(
  "/",
  auth_middleware(),
  upload.single("image"),
  validateRequest(ProjectValidation.createProjectSchema as any),
  ProjectController.createProject
);

router.get("/", ProjectController.getAllProjects);

router.get("/:slug", ProjectController.getProjectBySlug);

router.patch(
  "/:id",
  auth_middleware(),
  upload.single("image"),
  validateRequest(ProjectValidation.updateProjectSchema as any),
  ProjectController.updateProject
);

router.delete(
  "/:id",
  auth_middleware(),
  ProjectController.deleteProject
);

export const ProjectRoutes = router;
