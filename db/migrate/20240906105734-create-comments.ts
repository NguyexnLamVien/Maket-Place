import {
    QueryInterface,
    SequelizeStatic
} from 'sequelize';

export default {
    up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.createTable('comments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            productId: {
                type: Sequelize.INTEGER
            },

            content: {
                type: Sequelize.STRING
            },

            image: {
                type: Sequelize.BLOB
            },

            userId: {
                type: Sequelize.INTEGER
            },

            star: {
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

    down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.dropTable('comments');
    }
};
