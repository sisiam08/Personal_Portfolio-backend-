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

// Must be declared before "/:id" so "hero" is not treated as an id.
router.put(
  "/hero",
  auth_middleware(),
  validateRequest(SkillValidation.setHeroSkillsSchema as any),
  SkillController.setHeroSkills
);

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
