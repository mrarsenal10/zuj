const { z } = require("zod");

const dateString = (schema) =>
    z.preprocess((data) => {
        if (typeof data === "string") {
            return new Date(data);
        } else {
            return undefined;
        }
    }, schema);

const numericString = (schema) =>
    z.preprocess((data) => {
        if (typeof data === "string") {
            return parseInt(data, 10);
        } else if (typeof data === "number") {
            return data;
        } else {
            return undefined;
        }
    }, schema);

module.exports = { dateString, numericString };
