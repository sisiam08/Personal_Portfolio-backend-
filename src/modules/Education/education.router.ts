import { Router } from "express";
import { EducationController } from "./education.controller";
import validateRequest from "../../middleware/validateRequest";
import { EducationValidation } from "./education.validation";
import { auth_middleware } from "../../middleware/auth";

const router = Router();

router.post(
  "/",
  auth_middleware(),
  validateRequest(EducationValidation.createEducationSchema as any),
  EducationController.createEducation
);

router.get("/", EducationController.getAllEducation);

router.get("/:id", EducationController.getEducationById);

router.patch(
  "/:id",
  auth_middleware(),
  validateRequest(EducationValidation.updateEducationSchema as any),
  EducationController.updateEducation
);

router.delete(
  "/:id",
  auth_middleware(),
  EducationController.deleteEducation
);

export const EducationRoutes = router;
