"use strict";
exports.__esModule = true;
exports["default"] = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable("promontions", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            value: {
                type: Sequelize.DOUBLE
            },
            dateEffective: {
                type: Sequelize.DATE
            },
            dateExpire: {
                type: Sequelize.DATE
            },
            userId: {
                type: Sequelize.INTEGER
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
        return queryInterface.dropTable("promontions");
    }
};
