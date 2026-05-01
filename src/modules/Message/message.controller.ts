import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { MessageService } from "./message.service";

const createMessage = catchAsync(async (req: Request, res: Response) => {
  const result = await MessageService.createMessage(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Message sent successfully",
    data: result,
  });
});

const getAllMessages = catchAsync(async (req: Request, res: Response) => {
  const result = await MessageService.getAllMessages();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Messages retrieved successfully",
    data: result,
  });
});

export const MessageController = {
  createMessage,
  getAllMessages
};
