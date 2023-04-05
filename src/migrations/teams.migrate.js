"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Teams", {
            teamId: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            logo: {
                type: Sequelize.STRING,
                allowNull: true,
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Teams");
    },
};
