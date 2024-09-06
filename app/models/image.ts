import sequelize from "@configs/database";
import { Sequelize } from "sequelize";
import { product } from "./product";

export interface ImageAttributes {
  imageAddress?: string;
  productId?: number;
  bannerId?: number;
}

export interface ImageInstance {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  imageAddress: string;
  productId: number;
  bannerId: number;
}

export const image = sequelize.define("image", {
  imageAddress: Sequelize.BLOB,
  productId: Sequelize.INTEGER,
  bannerId: Sequelize.INTEGER,
});

export const associate = () => {
  image.belongsTo(product);
};

export default {
  image,
  associate,
};
