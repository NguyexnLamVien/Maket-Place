import models from "@models";
import { Request, Response } from "express";
import { ApplicationController } from ".";

export class ProfileController extends ApplicationController {
  public async index(req: Request, res: Response) {
    // const user = await models.user.findById(req.session.userId);
    req.session.userId = 8;
    const user = await models.user.findById(req.session.userId);

    if (user) {
      res.render("userview/profile.view/index", { user });
    } else {
      req.flash("errors", { msg: "Vui lòng đăng nhập khi sử dụng trang này" });
      res.redirect("/auth/signin");
    }
  }
  public async update(req: Request, res: Response) {}
}
