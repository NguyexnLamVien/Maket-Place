import { QueryInterface, SequelizeStatic } from "sequelize";

export default {
  up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    return queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      fullName: {
        type: Sequelize.STRING,
      },

      birthday: {
        type: Sequelize.DATE,
      },

      address: {
        type: Sequelize.STRING,
      },

      numberPhone: {
        type: Sequelize.STRING,
      },

      email: {
        type: Sequelize.STRING,
      },
      
      password:{
        type: Sequelize.STRING,
      },
      
      avatar: {
        type: Sequelize.BLOB,
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
    return queryInterface.dropTable("users");
  },
};
