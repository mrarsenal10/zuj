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
        let roundId = null;

        const prev = {};

        for (let homeId of homeIds) {
            for (let awayId of awayIds) {
                if (homeId === awayId) {
                    continue;
                }

                while (1) {
                    roundId = faker.datatype.number({ min: 1, max: 38 });
                    if (
                        !prev[roundId] ||
                        (prev[roundId][0] !== homeId &&
                            prev[roundId][1] !== awayId)
                    ) {
                        break;
                    }
                }

                matches.push({
                    roundId,
                    homeId: homeId + 1,
                    awayId: awayId + 1,
                    status: faker.helpers.arrayElement([
                        "full_time",
                        "half_time",
                    ]),
                    is_live: faker.datatype.number({ min: 0, max: 1 }),
                });

                prev[roundId] = [homeId, awayId];
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
