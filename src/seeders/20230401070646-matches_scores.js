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

        const matchScores = [...Array(361).keys()].map((key) => {
            return {
                matchId: key + 1,
                home_score: faker.datatype.number({ min: 1, max: 10 }),
                away_score: faker.datatype.number({ min: 1, max: 10 }),
            };
        });

        await queryInterface.bulkInsert("Matches_Scores", matchScores, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('Matches_Scores', null, {});
    },
};
