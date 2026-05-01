import { Router } from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { UserValidation } from "./user.validation";
import { auth_middleware } from "../../middleware/auth";
import { upload } from "../../config/multer.config";

const router = Router();

router.get("/me", UserController.getMyProfile);

router.patch(
  "/me",
  auth_middleware(),
  upload.single("image"),
  validateRequest(UserValidation.updateUserSchema as any),
  UserController.updateMyProfile
);

export const UserRoutes = router;
