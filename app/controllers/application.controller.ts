import models from "@models";
import { NextFunction, Request, Response } from "express";

export class ApplicationController {
  public async validateSignUp(req: Request, res: Response, next: NextFunction) {
    const { numberPhone, email } = req.body;

    const existingUser = await models.user.findOne({
      where: {
        $or: [{ numberPhone }, { email }],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Cannot sign-up with the numberPhone or email already existed",
      });
    }
    next();
  }

  public verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["x-access-token"] as string;

    if (!token) {
      return res.status(403).json({
        message: "Forbidden! Requires a token to access.",
      });
    }
  }
}
