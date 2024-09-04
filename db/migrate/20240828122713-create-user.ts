import { QueryInterface, SequelizeStatic } from "sequelize";

export = {
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
        validate: {
          len: [3, 25],
        },
      },

      userName: {
        type: Sequelize.STRING,
        validate: {
          len: [3, 12],
        },
      },

      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
        },
      },

      iam_role: {
        type: Sequelize.INTEGER,
      },

      hash_pwd: {
        type: Sequelize.STRING,
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
