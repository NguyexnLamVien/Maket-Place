import { RestActions } from "@configs/enum";
import { AuthController } from "@controllers";
import { Router } from "express";
import { Route } from ".";

export class AuthRoute {
  private static path = Router();
  private static authController = new AuthController();

  public static draw() {
    this.path.route("/google").get(this.authController.loginWithGoogle);
    this.path
      .route("/google/callback")
      .get(this.authController.loginWithGoogleRedirect);
    this.path.route("/signin").get(this.authController.signin);
    this.path.route("/signup").get(this.authController.signup);
    this.path.route("/login").post(this.authController.login);
    this.path
      .route("/")
      .post(this.authController.validateSignUp, this.authController.create);

    Route.resource(this.path, this.authController, {
      only: [RestActions.Destroy],
    });

    return this.path;
  }
}
