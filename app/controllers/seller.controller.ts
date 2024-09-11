import models from "@models";
import { Request, Response } from "express";
import moment from "moment";
import * as yup from "yup";
import { ApplicationController } from ".";
import { Role, RoleInstance } from "../models/role";
import { UserInstance } from "../models/user";

export class SellerController extends ApplicationController {
  public async index(req: Request, res: Response) {
    // const user = await models.user.findById(req.session.userId);
    req.session.userId = 8;
    const user = (await models.user.findById(
      req.session.userId
    )) as UserInstance;
    const createAt = user.updatedAt;
    const joinDate = moment(new Date(createAt)).format("DD/MM/YYYY");
    const userRole = (await models.role.findOne({
      where: {
        userId: req.session.userId,
        value: Role.SELLER,
      },
    })) as RoleInstance;
    if (user) {
      if (userRole) {
        res.render("userview/seller.view/index", { user, joinDate });
      } else {
        res.render("userview/seller.view/seller_create", { user });
      }
    } else {
      req.flash("errors", { msg: "Vui lòng đăng nhập khi sử dụng trang này" });
      res.redirect("/auth/signin");
    }
  }
  public async update(req: Request, res: Response) {}
  public async edit(req: Request, res: Response) {}
  public async new(req: Request, res: Response) {}
  public async create(req: Request, res: Response) {
    const { fullName, address, numberPhone, email } = req.body;
    const data = {
      fullName,
      address,
      numberPhone,
      email,
    };
    const checkValSignup = yup.object({
      fullName: yup
        .string()
        .trim()
        .min(5, "Full name must be more than 5 characters.")
        .max(50, "Full name cannot exceed 50 characters"),
      numberPhone: yup
        .string()
        .trim()
        .min(10, "Phone number has at least 10 digits")
        .max(11, "Phone number should not exceed 10 numbers")
        .matches(
          /^0\d{9,10}$/,
          "The first phone number must be 0 and the entire number must be a number"
        ),
    });

    try {
      const check = await checkValSignup.validate(data);

      const sellerInfor = await models.user.update(
        {
          numberPhone: numberPhone,
          email: email,
          address: address,
          fullName: fullName,
        },
        {
          where: {
            id: req.session.userId,
          },
        }
      );

      const user = (await models.user.findOne({
        where: {
          email,
        },
      })) as UserInstance;
      const addrole = await models.role.create({
        userId: user.id,
        value: Role.SELLER,
      });
      req.flash("success", {
        msg: "Bạn đã trở thành người bán .Chúc bạn buôn may bán đắt!!!",
      });
      res.redirect("/seller");
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        req.flash("errors", { msg: error.errors });
        res.redirect("/seller");
      } else {
        req.flash("errors", { msg: "Unknown error" });
        res.redirect("/seller");
      }
    }
  }
}
