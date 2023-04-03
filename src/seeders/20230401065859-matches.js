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

        const homeIds = [...Array(20).keys()];
        const awayIds = [...Array(20).keys()];

        const matches = [];

        for (let homeId of homeIds) {
            for (let awayId of awayIds) {
                if (homeId === awayId) {
                    continue;
                }

                matches.push({
                    homeId: homeId + 1,
                    awayId: awayId + 1,
                    start_date: new Date(
                        faker.date.between("2023-01-01", "2023-12-31")
                    )
                        .toISOString()
                        .split("T")[0],
                    start_time: new Date(faker.date.recent())
                        .toTimeString()
                        .slice(0, 8),
                    status: faker.helpers.arrayElement([
                        "full_time",
                        "half_time",
                    ]),
                    is_live: faker.datatype.number({ min: 0, max: 1 }),
                });
            }
        }

        await queryInterface.bulkInsert("Matches", matches, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("Matches", null, {});
    },
};
