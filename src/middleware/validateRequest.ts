import { ZodObject } from "zod";
import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";

const validateRequest = (schema: ZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Multipart forms may send a stringified JSON payload under `data`.
    if (req.body && req.body.data && typeof req.body.data === "string") {
      try {
        const parsedData = JSON.parse(req.body.data);
        req.body = { ...req.body, ...parsedData };
        delete req.body.data;
      } catch (e) {
        // let zod fail
      }
    }

    // Use the parsed result: this applies coercion/transforms (numbers,
    // booleans, skills string -> array) that the raw body would otherwise miss.
    const parsed = (await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    })) as { body: Record<string, unknown> };

    req.body = parsed.body;

    next();
  });
};

export default validateRequest;
