"use strict";

const { faker } = require("@faker-js/faker");

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
                    logo: faker.image.avatar(),
                },
                {
                    name: "Aston Villa",
                    logo: faker.image.avatar(),
                },
                {
                    name: "Bournemouth",
                    logo: faker.image.avatar(),
                },
                {
                    name: "Brentford",
                    logo: faker.image.avatar(),
                },
                {
                    name: "Brighton & Hove Albion",
                    logo: faker.image.avatar(),
                },
                {
                    name: "Chelsea",
                    logo: faker.image.avatar(),
                },
                {
                    name: "Crystal Palace",
                    logo: faker.image.avatar(),
                },
                {
                    name: "Everton",
                    logo: faker.image.avatar(),
                },
                {
                    name: "Fulham",
                    logo: faker.image.avatar(),
                },
                {
                    name: "Leeds United",
                    logo: faker.image.avatar(),
                },
                {
                    name: "Leicester City",
                    logo: faker.image.avatar(),
                },

                {
                    name: "Liverpool",
                    logo: faker.image.avatar(),
                },
                {
                    name: "Manchester City",
                    logo: faker.image.avatar(),
                },
                {
                    name: "Manchester United",
                    logo: faker.image.avatar(),
                },
                {
                    name: "Newcastle United",
                    logo: faker.image.avatar(),
                },
                {
                    name: "Nottingham Forest",
                    logo: faker.image.avatar(),
                },
                {
                    name: "Southampton",
                    logo: faker.image.avatar(),
                },
                {
                    name: "Tottenham Hotspur",
                    logo: faker.image.avatar(),
                },
                {
                    name: "West Ham United",
                    logo: faker.image.avatar(),
                },
                {
                    name: "Wolverhampton Wanderers",
                    logo: faker.image.avatar(),
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
        await queryInterface.bulkDelete("Teams", null, {});
    },
};
