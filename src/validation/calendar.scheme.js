const { z } = require("zod");
const { dateString } = require("./utils");

const filterQuery = z.object({
    query: z.object({
        activeStart: dateString(z.date()),
        activeEnd: dateString(z.date()),
    }),
});

module.exports = { filterQuery };
