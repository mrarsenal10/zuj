"use strict";

const { faker } = require('@faker-js/faker');

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

        const rounds = [...Array(38).keys()].map((key) => {
            return {
                tournamentId: 1,
                start_date: new Date(
                    faker.date.between("2023-01-01", "2023-12-31")
                )
                    .toISOString()
                    .split("T")[0],
                start_time: new Date(faker.date.recent())
                    .toTimeString()
                    .slice(0, 8),
            };
        });

        await queryInterface.bulkInsert("Rounds", rounds, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */

        await queryInterface.bulkDelete('Rounds', null, {});
    },
};
