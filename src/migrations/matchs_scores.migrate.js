"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Matches_Scores", {
            match_scoreId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            matchId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            home_score: {
                type: Sequelize.SMALLINT,
                allowNull: false,
                defaultValue: 0,
            },
            away_score: {
                type: Sequelize.SMALLINT,
                allowNull: false,
                defaultValue: 0,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Matches_Scores");
    },
};
