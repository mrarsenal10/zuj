"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert(
            "Teams",
            [
                {
                    name: "Arsenal",
                },
                {
                    name: "Aston Villa",
                },
                {
                    name: "Bournemouth",
                },
                {
                    name: "Brentford",
                },
                {
                    name: "Brighton & Hove Albion",
                },
                {
                    name: "Chelsea",
                },
                {
                    name: "Crystal Palace",
                },
                {
                    name: "Everton",
                },
                {
                    name: "Fulham",
                },
                {
                    name: "Leeds United",
                },
                {
                    name: "Leicester City",
                },
                {
                    name: "Liverpool",
                },
                {
                    name: "Manchester City",
                },
                {
                    name: "Manchester United",
                },
                {
                    name: "Newcastle United",
                },
                {
                    name: "Nottingham Forest",
                },
                {
                    name: "Southampton",
                },
                {
                    name: "Tottenham Hotspur",
                },
                {
                    name: "West Ham United",
                },
                {
                    name: "Wolverhampton Wanderers",
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('Teams', null, {});
    },
};
