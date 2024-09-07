import models from "@models";
import { NextFunction, Request, Response } from "express";

export class ApplicationController {
  public async validateSignUp(req: Request, res: Response, next: NextFunction) {
    const { numberPhone, email } = req.body;

    const existingUser = await models.user.findOne({
      where: {
        $or: [{ numberPhone: numberPhone.trim() }, { email: email.trim() }],
      },
    });

    if (existingUser) {
      req.flash("errors", {
        msg: "User or number phone previously registered",
      });
      return res.redirect("/auth/signup");
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
