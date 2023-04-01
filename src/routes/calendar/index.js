"use strict";

const express = require("express");
const router = express.Router();

const { asyncHandler } = require("#utils/index");
const calendarController = require("#controllers/calendar.controller");
const validate = require("#middleware/validate.middleware");
const { filterQuery } = require("#validation/calendar.scheme");

/**
    * @swagger
    * /v1/api/calendar/matches:
    *  get:
    *     description: Get all matches by a specific date range
    *     responses:
    *      200:
    *        description: Success
    *      400:
    *        description: Response invalid parameters
    *     parameters:
    *       - in: query
    *         name: activeStart
    *         schema:
    *           type: string
    *           example: 2023-01-01
    *       - in: query
    *         name: activeEnd
    *         schema:
    *           type: string
    *           example: 2023-01-01
*/
router.get(
    "/calendar/matches",
    validate(filterQuery),
    asyncHandler(calendarController.countMatchesByDateRange)
);

module.exports = router;
