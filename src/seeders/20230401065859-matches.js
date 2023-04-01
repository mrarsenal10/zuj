"use strict";

const { faker } = require("@faker-js/faker");

const matches = [...Array(1000)].reduce((acc) => {
    const homeId = faker.datatype.number({ min: 1, max: 20 });
    const awayId = faker.datatype.number({ min: 1, max: 20 });

    if (homeId === awayId) {
        return acc;
    }

    acc.push({
        homeId: faker.datatype.number({ min: 1, max: 20 }),
        awayId: faker.datatype.number({ min: 1, max: 20 }),
        start_date: new Date(faker.date.between("2023-01-01", "2023-12-31"))
            .toISOString()
            .split("T")[0],
        start_time: new Date(faker.date.recent()).toTimeString().slice(0, 8),
        status: faker.helpers.arrayElement(["full_time", "half_time"]),
        is_live: faker.datatype.number({ min: 0, max: 1 }),
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
