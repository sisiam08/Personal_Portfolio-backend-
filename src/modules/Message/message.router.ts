import { Router } from "express";
import { MessageController } from "./message.controller";
import validateRequest from "../../middleware/validateRequest";
import { MessageValidation } from "./message.validation";
import { auth_middleware } from "../../middleware/auth";

const router = Router();

// Public route for anyone to send a message
router.post(
  "/",
  validateRequest(MessageValidation.createMessageSchema as any),
  MessageController.createMessage,
);

// Admin route to view messages
router.get("/", auth_middleware(), MessageController.getAllMessages);

export const MessageRoutes = router;
