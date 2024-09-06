"use strict";
exports.__esModule = true;
exports["default"] = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable("users", {
            userId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            fullName: {
                type: Sequelize.STRING
            },
            birthday: {
                type: Sequelize.DATE
            },
            address: {
                type: Sequelize.STRING
            },
            numberPhone: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING
            },
            avatar: {
                type: Sequelize.BLOB
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
        return queryInterface.dropTable("users");
    }
};
