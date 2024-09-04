import { Router } from "express";
import { AuthController } from "../../app/controllers/auth.controller";

export class AuthRoute {
  private static path = Router();
  private static authController = new AuthController();

  public static draw() {
    this.path.route("/signup").get(this.authController.new);
    this.path
      .route("/signup")
      .post(this.authController.validateSignUp, this.authController.signup);
    this.path.route("/signin").get(this.authController.login);
    this.path.route("/signin").post(this.authController.signIn);
    return this.path;
  }
}
