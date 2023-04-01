"use strict";

const express = require("express");
const router = express.Router();

const matchController = require("#controllers/match.controller");
const { asyncHandler } = require("#utils/index");
const validate = require("#middleware/validate.middleware");
const { filterQuery } = require("#validation/match.scheme");

/**
    * @swagger
    * /v1/api/matches:
    *  get:
    *     description: Find all matches
    *     responses:
    *      200:
    *        description: success
    *      400:
    *        description: Response invalid parameters
    *     parameters:
    *       - in: query
    *         name: limit
    *         schema:
    *           type: integer
    *           example: 10
    *       - in: query
    *         name: offset
    *         schema:
    *           type: integer
    *           example: 1
    *       - in: query
    *         name: date
    *         schema:
    *           type: string
    *           example: '2023-01-01'
*/
router.get(
    "/matches",
    validate(filterQuery),
    asyncHandler(matchController.getMatches)
);

module.exports = router;
