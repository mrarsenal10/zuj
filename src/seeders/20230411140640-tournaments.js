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
            "Tournaments",
            [
                {
                    name: "Premier league",
                    logo: faker.image.avatar(),
                },
                {
                    name: "Laliga",
                    logo: faker.image.avatar(),
                },
                {
                    name: "Bundesliga",
                    logo: faker.image.avatar(),
                },
                {
                    name: "Ligue 1",
                    logo: faker.image.avatar(),
                },
                {
                    name: "Serie A",
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
        await queryInterface.bulkDelete('Tournaments', null, {});
    },
};
