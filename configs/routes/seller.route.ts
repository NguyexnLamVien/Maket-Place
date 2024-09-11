import { SellerController } from "@controllers";
import { Router } from "express";
import { Route } from ".";
import { RestActions } from "../enum";

export class SellerRoute {
  private static path = Router();
  private static sellerController = new SellerController();

  public static draw() {
    // this.path.route("/:id").put(this.sellerController.create);

    Route.resource(this.path, this.sellerController, {
      only: [
        RestActions.Index,
        RestActions.Create,
        RestActions.New,
        RestActions.Edit,
        RestActions.Update,
      ],
    });

    return this.path;
  }
}
