"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Matches", {
            matchId: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            roundId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            homeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            awayId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            status: {
                allowNull: true,
                type: Sequelize.ENUM,
                values: ['full_time','half_time'],
            },
            is_live: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Matches");
    },
};
