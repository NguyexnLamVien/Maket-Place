import sequelize from "@configs/database";
import { Sequelize } from "sequelize";
import { product } from "./product";
import { user } from "./user";

export interface CommentAttributes {
  productId?: number;
  content?: string;
  image?: string;
  userId?: number;
  star?: number;
}

export interface CommentInstance {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  productId: number;
  content: string;
  image: string;
  userId: number;
  star: number;
}

export const comment = sequelize.define("comment", {
  productId: Sequelize.INTEGER,
  content: Sequelize.STRING,
  image: Sequelize.BLOB,
  userId: Sequelize.INTEGER,
  star: Sequelize.INTEGER,
});

export const associate = () => {
  comment.belongsTo(user);
  comment.belongsTo(product);
};

export default {
  comment,
  associate,
};
