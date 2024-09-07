import sequelize from "@configs/database";
import { Sequelize } from "sequelize";
import { cart } from "./cart";
import { comment } from "./comment";
import { order } from "./order";
import { product } from "./product";
import { role } from "./role";
import { searchhistory } from "./searchhistory";

export interface UserAttributes {
  id: number;
  fullName?: string;
  birthday?: Date;
  address?: string;
  numberPhone?: string;
  email?: string;
  password?: string;
  avatar?: string;
}

export interface UserInstance {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  fullName: string;
  birthday: Date;
  address: string;
  numberPhone: string;
  email: string;
  password: string;
  avatar: string;
}

export const user = sequelize.define("user", {
  fullName: Sequelize.STRING,
  birthday: Sequelize.DATE,
  address: Sequelize.STRING,
  numberPhone: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  avatar: Sequelize.BLOB,
});

export const associate = () => {
  user.hasMany(role, {
    foreignKey: "userId",
  });
  user.hasMany(searchhistory, {
    foreignKey: "userId",
  });
  user.hasMany(comment, {
    foreignKey: "userId",
  });
  user.hasMany(product, {
    foreignKey: "userId",
  });
  product.hasMany(cart);
  user.belongsToMany(product, {
    through: cart,
    as: "cartProducts",
  });
  user.hasMany(order, {
    foreignKey: "userId",
  });
};

export default {
  user,
  associate,
};
