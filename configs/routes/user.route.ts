import { Router } from "express";
import { BookController } from "../../app/controllers/book.controller";
import { UserController } from "../../app/controllers/user.controller";
export class UseRoute {
  private static path = Router();
  private static UserController = new UserController();
  private static BookController = new BookController();

  public static draw() {
    this.path.get("/", this.UserController.index);
    this.path.get("/:userId/books", this.BookController.index);
    this.path.post("/:userId/books", this.BookController.create);

    return this.path;
  }
}
