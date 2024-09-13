import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { ApplicationController } from ".";

const prisma = new PrismaClient();
export class ProfileController extends ApplicationController {
  public async index(req: Request, res: Response) {
    const user = await prisma.user.findFirst({
      where: {
        id: req.session.userId,
      },
    });

    if (user) {
      res.render("userview/profile.view/index", { user });
    } else {
      req.flash("errors", { msg: "Vui lòng đăng nhập khi sử dụng trang này" });
      res.redirect("/auth/signin");
    }
  }
  public async update(req: Request, res: Response) {}
}
