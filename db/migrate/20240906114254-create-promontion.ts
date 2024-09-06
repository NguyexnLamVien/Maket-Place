import { QueryInterface, SequelizeStatic } from "sequelize";

export default {
  up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    return queryInterface.createTable("promontions", {
      promontionCode: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      value: {
        type: Sequelize.DOUBLE,
      },

      dateEffective: {
        type: Sequelize.DATE,
      },

      dateExpire: {
        type: Sequelize.DATE,
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
    return queryInterface.dropTable("promontions");
  },
};
