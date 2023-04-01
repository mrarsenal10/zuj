const { z } = require("zod");
const { dateString, numericString } = require("./utils");

const filterQuery = z.object({
    query: z.object({
        limit: numericString(z.number().default(10)),
        offset: numericString(z.number().default(1)),
        date: dateString(z.date().optional()),
    }),
});

module.exports = {
    filterQuery,
};
