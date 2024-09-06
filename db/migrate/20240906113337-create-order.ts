import { QueryInterface, SequelizeStatic } from "sequelize";

export default {
  up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    return queryInterface.createTable("orders", {
      orderId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      recipientName: {
        type: Sequelize.STRING,
      },

      recipientAddress: {
        type: Sequelize.STRING,
      },

      recipientNumberPhone: {
        type: Sequelize.STRING,
      },

      status: {
        type: Sequelize.INTEGER,
      },

      promontionCode: {
        type: Sequelize.STRING,
      },

      userId: {
        type: Sequelize.INTEGER,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    return queryInterface.dropTable("orders");
  },
};
