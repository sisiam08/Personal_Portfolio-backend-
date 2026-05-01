import { ZodObject } from "zod";
import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";

const validateRequest = (schema: ZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // If request has files (multipart/form-data), we might need to parse body manually if it comes as stringified JSON
    // but typically validating req.body is sufficient. For multer + zod, we only validate the text fields.
    if (req.body && req.body.data && typeof req.body.data === 'string') {
        try {
            const parsedData = JSON.parse(req.body.data);
            req.body = { ...req.body, ...parsedData };
            delete req.body.data;
        } catch(e) {
            // let zod fail
        }
    }
    await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });

    next();
  });
};

export default validateRequest;
