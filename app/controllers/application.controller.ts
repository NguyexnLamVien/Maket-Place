import models from "@models";
import { NextFunction, Request, Response } from "express";
import { Role } from "../models/user";

export class ApplicationController {
  public async validateSignUp(req: Request, res: Response, next: NextFunction) {
    const { username, email } = req.body;

    const existingUser = await models.user.findOne({
      where: {
        $or: [{ username }, { email }],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Cannot sign-up with the username or email already existed",
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
