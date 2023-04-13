"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Tournaments", {
            tournamentId: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            logo: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Tournaments");
    },
};
