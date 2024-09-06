import sequelize from "@configs/database";
import { Sequelize } from "sequelize";
import { user } from "./user";

export enum Role {
  ADMIN = 0,
  USER = 1,
  SELLER = 2,
}

export interface RoleAttributes {
  value?: Role;
  userId?: number;
}

export interface RoleInstance {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  value: Role;
  userId: number;
}

export const role = sequelize.define("role", {
  value: Sequelize.INTEGER,
  userId: Sequelize.INTEGER,
});

export const associate = () => {
  role.belongsTo(user);
};

export default {
  role,
  associate,
};
