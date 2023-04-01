"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Matches", {
            matchId: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            homeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            awayId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            start_date: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            start_time: {
                allowNull: false,
                type: Sequelize.TIME,
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
        }).then(() => queryInterface.addIndex("Matches", ["start_date"]));
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Matches");
    },
};
