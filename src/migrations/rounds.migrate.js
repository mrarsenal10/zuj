"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable("Rounds", {
                roundId: {
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                tournamentId: {
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
            })
            .then(() => queryInterface.addIndex("Rounds", ["start_date"]));
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Rounds");
    },
};
