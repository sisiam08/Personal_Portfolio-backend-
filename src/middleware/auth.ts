import { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth";
import { UserRole } from "../generated/prisma/enums";

export const auth_middleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers as any,
      });

      if (!session || !session.user) {
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
        return;
      }

      if (!session.user.emailVerified) {
        res.status(403).json({
          success: false,
          message: "You need to verify your email to access this resource",
        });
        return;
      }

      if ((session.user.role as UserRole) !== UserRole.ADMIN) {
        res.status(403).json({
          success: false,
          message: "You don't have permission to access this resource",
        });
        return;
      }

      req.user = {
        id: session.user.id as string,
        name: session.user.name as string,
        email: session.user.email as string,
        role: session.user.role as UserRole,
        emailVerified: session.user.emailVerified as boolean,
      };

      next();
    } catch (error) {
      next(error);
    }
  };
};
