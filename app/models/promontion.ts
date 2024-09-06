import sequelize from "@configs/database";
import { Sequelize } from "sequelize";
import { order } from "./order";

export interface PromontionAttributes {
  promontionCode?: number;
  value?: number;
  dateEffective?: Date;
  dateExpire?: Date;
  userId?: number;
}

export interface PromontionInstance {
  createdAt: Date;
  updatedAt: Date;

  promontionCode: number;
  value: number;
  dateEffective: Date;
  dateExpire: Date;
  userId: number;
}

export const promontion = sequelize.define("promontion", {
  promontionCode: Sequelize.INTEGER,
  value: Sequelize.DOUBLE,
  dateEffective: Sequelize.DATE,
  dateExpire: Sequelize.DATE,
  userId: Sequelize.INTEGER,
});

export const associate = () => {
  promontion.hasOne(order);
};

export default {
  promontion,
  associate,
};
