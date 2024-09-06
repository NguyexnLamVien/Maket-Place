"use strict";
exports.__esModule = true;
exports["default"] = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable("orders", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            recipientName: {
                type: Sequelize.STRING
            },
            recipientAddress: {
                type: Sequelize.STRING
            },
            recipientNumberPhone: {
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.INTEGER
            },
            promontionCode: {
                type: Sequelize.STRING
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
        return queryInterface.dropTable("orders");
    }
};
