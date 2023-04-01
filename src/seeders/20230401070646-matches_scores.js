"use strict";

const { faker } = require("@faker-js/faker");

const matchScores = [...Array(1000)].reduce((acc) => {
    acc.push({
        matchId: faker.datatype.number({ min: 1, max: 1000 }),
        home_score: faker.datatype.number({ min: 1, max: 10 }),
        away_score: faker.datatype.number({ min: 1, max: 10 }),
    });

    return acc;
}, []);

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

        await queryInterface.bulkInsert("Matches_Scores", matchScores, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
