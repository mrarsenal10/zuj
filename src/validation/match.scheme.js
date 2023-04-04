const { z } = require("zod");
const { dateString, numericString } = require("./utils");

const filterQuery = z.object({
    query: z.object({
        limit: numericString(z.number().optional()),
        offset: numericString(z.number().optional()),
        activeStart: dateString(z.date().optional()),
        activeEnd: dateString(z.date().optional()),
    }),
});

module.exports = {
    filterQuery,
};
