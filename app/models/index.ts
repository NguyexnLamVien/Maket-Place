import cartModel, { cart } from "./cart";
import categoryModel, { category } from "./category";
import commentModel, { comment } from "./comment";
import imageModel, { image } from "./image";
import orderModel, { order } from "./order";
import orderdetailModel, { orderdetail } from "./orderdetail";

import productModel, { product } from "./product";
import roleModel, { role } from "./role";
import searchhistoryModel from "./searchhistory";
import userModel, { user } from "./user";

userModel.associate();
roleModel.associate();
searchhistoryModel.associate();
commentModel.associate();
productModel.associate();
categoryModel.associate();
imageModel.associate();
cartModel.associate();
orderdetailModel.associate();
orderModel.associate();

export default {
  user,
  role,
  comment,
  product,
  category,
  image,
  cart,
  orderdetail,
  order,
};
