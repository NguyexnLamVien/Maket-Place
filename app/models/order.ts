import sequelize from "@configs/database";
import { Sequelize } from "sequelize";
import { orderdetail } from "./orderdetail";
import { product } from "./product";
import { promontion } from "./promontion";
import { user } from "./user";

export interface OrderAttributes {
  orderId?: number;
  recipientName?: string;
  recipientAddress?: string;
  recipientNumberPhone?: string;
  status?: number;
  promontionCode?: string;
  userId?: number;
}

export interface OrderInstance {
  createdAt: Date;
  updatedAt: Date;

  orderId: number;
  recipientName: string;
  recipientAddress: string;
  recipientNumberPhone: string;
  status: number;
  promontionCode: string;
  userId: number;
}

export const order = sequelize.define("order", {
  orderId: Sequelize.INTEGER,
  recipientName: Sequelize.STRING,
  recipientAddress: Sequelize.STRING,
  recipientNumberPhone: Sequelize.STRING,
  status: Sequelize.INTEGER,
  promontionCode: Sequelize.STRING,
  userId: Sequelize.INTEGER,
});

export const associate = () => {
  order.belongsTo(user);
  order.hasMany(orderdetail);
  order.belongsToMany(product, {
    through: orderdetail,
    as: "productOrderdetail",
  });
  order.hasOne(promontion);
};

export default {
  order,
  associate,
};
