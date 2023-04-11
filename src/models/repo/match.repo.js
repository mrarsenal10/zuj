"use strict";

const sequelize = require("sequelize");

const { InternalServerError } = require("#core/error.response");
const Match = require("#models/match.model");
const Match_Score = require("#models/match_score.model");
const Round = require("#models/round.model");
const Team = require("#models/team.model");
const Tournament = require("#models/tournament.model");

class MatchRepo {
    /**
     * Get all matches using pagination
     * @param {int} limit
     * @param {int} offset - The last matchID
     * @param {string} activeStart
     * @param {string} activeEnd
     * @param {int} tournamentId
     * @returns
     */
    static getMatchesWithDetail = async ({
        limit = 10,
        offset = 1,
        activeStart,
        activeEnd,
        tournamentId,
    }) => {
        try {
            return await Match.findAll({
                attributes: [
                    [sequelize.col("Matches_Score.home_score"), "home_score"],
                    [sequelize.col("Matches_Score.away_score"), "away_score"],
                    [sequelize.col("home.name"), "home_team"],
                    [sequelize.col("home.logo"), "home_logo"],
                    [sequelize.col("away.name"), "away_team"],
                    [sequelize.col("away.logo"), "away_logo"],
                    "matchId",
                    "round.start_date",
                    "round.start_time",
                    [
                        sequelize.col("round.tournament.tournamentId"),
                        "tournamentId",
                    ],
                    "status",
                    "is_live",
                ],
                include: [
                    {
                        model: Team,
                        as: "home",
                        required: false,
                        attributes: [],
                    },
                    {
                        model: Team,
                        as: "away",
                        required: false,
                        attributes: [],
                    },
                    {
                        model: Match_Score,
                        required: false,
                        attributes: [],
                    },
                    {
                        model: Round,
                        required: true,
                        attributes: [],
                        as: "round",
                        include: [
                            {
                                model: Tournament,
                                as: "tournament",
                                required: true,
                                attributes: [],
                            },
                        ],
                    },
                ],
                limit: parseInt(limit),
                where: {
                    [sequelize.Op.and]: {
                        [sequelize.Op.or]: {
                            [sequelize.Op.and]: {
                                ...(activeStart && {
                                    "$round.start_date$": {
                                        [sequelize.Op.gte]: activeStart,
                                    },
                                }),
                                ...(offset && {
                                    matchId: {
                                        [sequelize.Op.gt]: offset,
                                    },
                                }),
                            },
                            ...(activeStart && {
                                "$round.start_date$": {
                                    [sequelize.Op.gt]: activeStart,
                                },
                            }),
                        },
                        ...(activeEnd && {
                            "$round.start_date$": {
                                [sequelize.Op.lte]: activeEnd,
                            },
                        }),
                        ...(tournamentId && {
                            "$round.tournament.tournamentId$": {
                                [sequelize.Op.in]: [tournamentId],
                            },
                        }),
                    },
                },
                order: [
                    ["round", "tournamentId", "ASC"],
                    ["round", "start_date", "ASC"],
                    ["matchId", "ASC"],
                ],
                raw: true,
            });
        } catch (error) {
            throw new InternalServerError();
        }
    };

    /**
     * Get all matches using pagination
     * @param {string} activeStart
     * @param {string} activeEnd
     * @param {int} tournametId
     * @returns
     */
    static countMatchByDateRange = async ({
        activeStart,
        activeEnd,
        tournamentId,
    }) => {
        try {
            return await Match.findAll({
                attributes: [
                    "round.start_date",
                    [
                        sequelize.col("round.tournament.tournamentId"),
                        "tournamentId",
                    ],
                    [
                        sequelize.fn("COUNT", sequelize.col("matchId")),
                        "numMatches",
                    ],
                ],
                include: [
                    {
                        model: Round,
                        required: true,
                        attributes: [],
                        as: "round",
                        include: [
                            {
                                model: Tournament,
                                as: "tournament",
                                required: true,
                                attributes: [],
                            },
                        ],
                    },
                ],
                where: {
                    [sequelize.Op.and]: {
                        ...(activeStart && {
                            "$round.start_date$": {
                                [sequelize.Op.gte]: activeStart,
                            },
                        }),
                        ...(activeEnd && {
                            "$round.start_date$": {
                                [sequelize.Op.lte]: activeEnd,
                            },
                        }),
                        ...(tournamentId && {
                            "$round.tournament.tournamentId$": {
                                [sequelize.Op.in]: [tournamentId],
                            },
                        }),
                    },
                },
                order: [
                    ["round", "tournamentId", "ASC"],
                    ["round", "start_date", "ASC"],
                ],
                group: ["start_date", "round.tournamentId"],
                raw: true,
            });
        } catch (error) {
            throw new InternalServerError();
        }
    };
}

module.exports = MatchRepo;
