import bookModel, { book } from "./book";
import userModel, { user } from "./user";
bookModel.associate();
userModel.associate();

export default {
  book,
  user,
};
