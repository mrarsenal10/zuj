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
 *       - in: query
 *         name: tournamentId[]
 *         description: Filter by tournament (1 - Premier League, 2 - Laliga, 3- Bundesliga, 4- Ligue1, 5- Serie A)
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *           example: 1
 */
router.get(
    "/matches",
    validate(filterQuery),
    asyncHandler(matchController.getMatches)
);

/**
 * @swagger
 * /v1/api/match/count:
 *  get:
 *     description: Count matches by date range
 *     responses:
 *      200:
 *        description: Successfully
 *      400:
 *        description: Response invalid parameters
 *     parameters:
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
 *       - in: query
 *         name: tournamentId[]
 *         description: Filter by tournament (1 - Premier League, 2 - Laliga, 3- Bundesliga, 4- Ligue1, 5- Serie A)
 *         schema:
 *           type: integer
 *           example: 1
 */
router.get(
    "/match/count",
    validate(filterQuery),
    asyncHandler(matchController.countMatch)
);

module.exports = router;
