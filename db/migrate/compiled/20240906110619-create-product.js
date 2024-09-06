"use strict";
exports.__esModule = true;
exports["default"] = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable("products", {
            productId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            productName: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.STRING
            },
            infor: {
                type: Sequelize.STRING
            },
            price: {
                type: Sequelize.DOUBLE
            },
            view: {
                type: Sequelize.INTEGER
            },
            sold: {
                type: Sequelize.INTEGER
            },
            inventory: {
                type: Sequelize.INTEGER
            },
            mainImage: {
                type: Sequelize.BLOB
            },
            categoryId: {
                type: Sequelize.INTEGER
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
        return queryInterface.dropTable("products");
    }
};
