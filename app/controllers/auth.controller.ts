import env from "@configs/env";
import models from "@models";
import { Role } from "@models/role";
import { UserInstance } from "@models/user";
import axios from "axios";
import { Request, Response } from "express";
import { Op } from "sequelize";
import * as yup from "yup";
import { ApplicationController } from ".";
const bcrypt = require("bcrypt");

export class AuthController extends ApplicationController {
  public async loginWithGoogle(req: Request, res: Response) {
    res.redirect(
      `https://accounts.google.com/o/oauth2/v2/auth?client_id=${env.googleClientId}&redirect_uri=${env.googleRedirectUri}&response_type=code&scope=profile email`
    );
  }

  public async loginWithGoogleRedirect(req: Request, res: Response) {
    const { code } = req.query;
    const {
      data: { access_token },
    } = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: env.googleClientId,
      client_secret: env.googleClientSecret,
      code,
      redirect_uri: env.googleRedirectUri,
      grant_type: "authorization_code",
    });

    const { data: googleUser } = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const loginUser = (await models.user.findOne({
      where: {
        email: googleUser.email,
      },
    })) as UserInstance;

    if (!loginUser) {
      const newUser = (await models.user.create({
        fullName: googleUser.name,
        birthday: googleUser.birthday,
        address: googleUser.address,
        numberPhone: googleUser.numberPhone,
        email: googleUser.email,
        password: null,
        avatar: googleUser.picture,
      })) as UserInstance;

      req.session.userId = newUser.id;
    } else {
      await models.user.update(
        {
          name: googleUser.name,
          email: googleUser.email,
          avatarUrl: googleUser.picture,
        },
        {
          where: {
            id: loginUser.id,
          },
        }
      );

      req.session.userId = loginUser.id;
    }

    req.flash("success", { msg: "Login successfully" });

    res.redirect("/");
  }

  public async signin(req: Request, res: Response) {
    res.render("userview/auth.view/signin");
  }
  public async signup(req: Request, res: Response) {
    res.render("userview/auth.view/signup");
  }

  public async create(req: Request, res: Response) {
    const { fullName, email, numberPhone, password, confirmPassword } =
      req.body;

    const data = {
      fullName,
      numberPhone,
      password,
    };
    if (password.trim() != confirmPassword.trim()) {
      req.flash("errors", { msg: "Confirm different password!" });
      return res.redirect("/auth/signup");
    }

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
      password: yup
        .string()
        .trim()
        .min(6, "Password must be at least 6 characters long")
        .max(30, "Password must be shorter than 30 characters"),
    });

    try {
      const check = await checkValSignup.validate(data);

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const newuser = await models.user.create({
        numberPhone: numberPhone,
        email: email,
        password: hash,
        address: null,
        avatar: null,
        birthday: null,
        fullName: fullName,
      });

      const user = (await models.user.findOne({
        where: {
          email,
        },
      })) as UserInstance;
      const addrole = await models.role.create({
        userId: user.id,
        value: Role.USER,
      });
      // req.session.userId = user.id;
      req.session.userId = user.id;

      req.flash("success", { msg: "Login success!!!" });
      res.redirect("/");
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        req.flash("errors", { msg: error.errors });
        res.redirect("/auth/signup");
      } else {
        req.flash("errors", { msg: "Unknown error" });
        res.redirect("/auth/signup");
      }
    }
  }

  public async destroy(req: Request, res: Response) {
    req.session.destroy((err) => {
      if (err) {
        req.flash("errors", { msg: "Unknown error" });
        res.redirect("/");
      } else {
        res.redirect("/"); 
      }
    });
  }

  public async login(req: Request, res: Response) {
    const { username, password } = req.body;

    const checkUser = (await models.user.findOne({
      where: {
        [Op.or]: [{ email: username.trim() }, { numberPhone: username.trim() }],
      },
    })) as UserInstance;
    if (!checkUser) {
      req.flash("errors", { msg: "username is not found." });
      res.redirect("/auth/signin");
    } else {
      if (await bcrypt.compare(password, checkUser.password)) {
        req.session.userId = checkUser.id;

        req.flash("success", { msg: "Login success!!!" });
        res.redirect("/");
      } else {
        req.flash("errors", { msg: "Password is not found." });
        res.redirect("/auth/signin");
      }
    }
  }
}
