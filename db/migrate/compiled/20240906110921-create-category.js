"use strict";
exports.__esModule = true;
exports["default"] = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable("categories", {
            cagegoryId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            categoryName: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable("categories");
    }
};
