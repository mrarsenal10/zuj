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
    *        description: Successfully
    *      400:
    *        description: Response invalid parameters
    *     parameters:
    *       - in: query
    *         name: limit
    *         description: The number of items to return
    *         schema:
    *           type: integer
    *           example: 10
    *       - in: query
    *         name: offset
    *         description: The last matchID
    *         schema:
    *           type: integer
    *           example: 0
    *       - in: query
    *         name: activeStart
    *         description: The date that used to filter the items
    *         schema:
    *           type: string
    *           example: '2023-01-01'
    *       - in: query
    *         name: activeEnd
    *         description: The date that used to filter the items
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
