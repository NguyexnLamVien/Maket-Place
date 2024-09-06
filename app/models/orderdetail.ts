import sequelize from "@configs/database";
import { Sequelize } from "sequelize";
import { order } from "./order";
import { product } from "./product";

export interface OrderdetailAttributes {
  productId?: number;
  quantity?: number;
  unitPrice?: number;
  orderId?: number;
}

export interface OrderdetailInstance {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  productId: number;
  quantity: number;
  unitPrice: number;
  orderId: number;
}

export const orderdetail = sequelize.define("orderdetail", {
  productId: Sequelize.INTEGER,
  quantity: Sequelize.INTEGER,
  unitPrice: Sequelize.DOUBLE,
  orderId: Sequelize.INTEGER,
});

export const associate = () => {
  orderdetail.belongsTo(product);
  orderdetail.belongsTo(order);
};

export default {
  orderdetail,
  associate,
};
