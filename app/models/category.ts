import sequelize from "@configs/database";
import { Sequelize } from "sequelize";
import { product } from "./product";

export interface CategoryAttributes {
  categoryName?: string;
}

export interface CategoryInstance {
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;

  categoryName: string;
}

export const category = sequelize.define("category", {
  categoryName: Sequelize.STRING,
});

export const associate = () => {
  category.hasMany(product,{
    foreignKey:"categoryId"
  });
};

export default {
  category,
  associate,
};
