import { Router } from "express";
import { SkillController } from "./skill.controller";
import validateRequest from "../../middleware/validateRequest";
import { SkillValidation } from "./skill.validation";
import { auth_middleware } from "../../middleware/auth";
import { upload } from "../../config/multer.config";

const router = Router();

router.post(
  "/",
  auth_middleware(),
  upload.single("icon"),
  validateRequest(SkillValidation.createSkillSchema as any),
  SkillController.createSkill
);

router.get("/", SkillController.getAllSkills);

router.get("/:id", SkillController.getSkillById);

router.patch(
  "/:id",
  auth_middleware(),
  upload.single("icon"),
  validateRequest(SkillValidation.updateSkillSchema as any),
  SkillController.updateSkill
);

router.delete(
  "/:id",
  auth_middleware(),
  SkillController.deleteSkill
);

export const SkillRoutes = router;
