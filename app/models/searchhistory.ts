import sequelize from "@configs/database";
import { Sequelize } from "sequelize";
import { user } from "./user";

export interface SearchhistoryAttributes {
  userId?: number;
  content?: string;
}

export interface SearchhistoryInstance {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  userId: number;
  content: string;
}

export const searchhistory = sequelize.define("searchhistory", {
  userId: Sequelize.INTEGER,
  content: Sequelize.STRING,
});

export const associate = () => {
  searchhistory.belongsTo(user);
};

export default {
  searchhistory,
  associate,
};
