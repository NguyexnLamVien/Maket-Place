import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import moment from "moment";
import * as yup from "yup";
import { ApplicationController } from ".";

const prisma = new PrismaClient();

export class SellerController extends ApplicationController {
  public async index(req: Request, res: Response) {
    const user = await prisma.user.findFirst({
      where: {
        id: req.session.userId,
      },
    });
    if (user) {
      const userRole = await prisma.roleUser.findFirst({
        where: {
          userId: req.session.userId,
          rolesId: 3,
        },
      });
      if (userRole) {
        const createAt = userRole.createdAt;
        const joinDate = moment(new Date(createAt)).format("DD/MM/YYYY");
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
    const id = req.session.userId;
    if (id) {
      const datacheck = {
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
        const check = await checkValSignup.validate(datacheck);

        const sellerInfor = await prisma.user.update({
          where: {
            id: req.session.userId,
          },
          data: {
            numberPhone: numberPhone,
            email: email,
            address: address,
            fullName: fullName,
          },
        });
        const addrole = await prisma.roleUser.create({
          data: {
            userId: id,
            rolesId: 3,
          },
        });
        req.flash("success", {
          msg: "Bạn đã trở thành người bán!",
        });
        res.redirect("/seller");
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          req.flash("errors", { msg: error.errors });
          res.redirect("/seller");
        } else {
          req.flash("errors", { msg: "lỗi không xác định" });
          res.redirect("/seller");
        }
      }
    } else {
    }
  }
}
