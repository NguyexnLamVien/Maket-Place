import { ProfileController } from "@controllers";
import { Router } from "express";
import { Route } from ".";
import { RestActions } from "../enum";

export class ProfileRoute {
  private static path = Router();
  private static profileController = new ProfileController();

  public static draw() {
    this.path.route("/:id").put(this.profileController.update);

    Route.resource(this.path, this.profileController, {
      only: [RestActions.Index],
    });

    return this.path;
  }
}
