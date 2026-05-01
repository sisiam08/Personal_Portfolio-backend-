import { Router } from "express";
import { ExperienceController } from "./experience.controller";
import validateRequest from "../../middleware/validateRequest";
import { ExperienceValidation } from "./experience.validation";
import { auth_middleware } from "../../middleware/auth";

const router = Router();

router.post(
  "/",
  auth_middleware(),
  validateRequest(ExperienceValidation.createExperienceSchema as any),
  ExperienceController.createExperience
);

router.get("/", ExperienceController.getAllExperience);

router.get("/:id", ExperienceController.getExperienceById);

router.patch(
  "/:id",
  auth_middleware(),
  validateRequest(ExperienceValidation.updateExperienceSchema as any),
  ExperienceController.updateExperience
);

router.delete(
  "/:id",
  auth_middleware(),
  ExperienceController.deleteExperience
);

export const ExperienceRoutes = router;
