import sequelize from "@configs/database";
import { Sequelize } from "sequelize";
import { cart } from "./cart";
import { category } from "./category";
import { comment } from "./comment";
import { image } from "./image";
import { orderdetail } from "./orderdetail";
import { user } from "./user";

export interface ProductAttributes {
  id: number;
  productName?: string;
  description?: string;
  infor?: string;
  price?: number;
  view?: number;
  sold?: number;
  inventory?: number;
  mainImage?: string;
  categoryId?: number;
  userId?: number;
}

export interface ProductInstance {
  id:number
  createdAt: Date;
  updatedAt: Date;

  productName: string;
  description: string;
  infor: string;
  price: number;
  view: number;
  sold: number;
  inventory: number;
  mainImage: string;
  categoryId: number;
  userId: number;
}

export const product = sequelize.define("product", {
  productName: Sequelize.STRING,
  description: Sequelize.STRING,
  infor: Sequelize.STRING,
  price: Sequelize.DOUBLE,
  view: Sequelize.INTEGER,
  sold: Sequelize.INTEGER,
  inventory: Sequelize.INTEGER,
  mainImage: Sequelize.BLOB,
  categoryId: Sequelize.INTEGER,
  userId: Sequelize.INTEGER,
});

export const associate = () => {
  product.hasMany(comment,{
    foreignKey:"productId"
  });
  product.belongsTo(category);
  product.hasMany(image,{
    foreignKey: "productId"
  });
  product.belongsTo(user);
  product.hasMany(cart,{
    foreignKey: "productId"
  });
  product.belongsToMany(user, {
    through: cart,
    as: "cartUsers",
  });
  product.hasMany(orderdetail,{
    foreignKey: "productId"
  });
};

export default {
  product,
  associate,
};
