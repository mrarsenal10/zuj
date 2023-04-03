"use strict";

const sequelize = require("sequelize");

const Match = require("#models/match.model");
const Match_Score = require("#models/match_score.model");
const Team = require("#models/team.model");
const { InternalServerError } = require("#core/error.response");

class MatchService {
    /**
     * Transforming matches with its team and match scores
     * @param {array} matches
     * @returns array
     */
    static transformMatches(matches) {
        let curDate = null;

        return matches.reduce((acc, { start_date, ...rest }) => {
            const startDate = new Date(start_date).getTime();

            if (curDate === null || curDate !== startDate) {
                curDate = startDate;

                acc.push({
                    start_date,
                    numMatches: 0,
                    matches: [],
                });
            }
            acc[acc.length - 1]['numMatches'] += 1;
            acc[acc.length - 1].matches.push({ ...rest });

            return acc;
        }, []);
    }

    /**
     * Get all matches using pagination
     * @param {int} limit
     * @param {int} offset - The last matchID
     * @param {string} activeStart
     * @param {string} activeEnd
     * @returns
     */
    static getAll = async ({ limit = 10, offset = 1, activeStart, activeEnd }) => {
        try {
            return await Match.findAll({
                attributes: [
                    [sequelize.col("Matches_Score.home_score"), "home_score"],
                    [sequelize.col("Matches_Score.away_score"), "away_score"],
                    [sequelize.col("home.name"), "home_team"],
                    [sequelize.col("away.name"), "away_team"],
                    "matchId",
                    "start_date",
                    "start_time",
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
                ],
                limit: parseInt(limit),
                where: {
                    [sequelize.Op.and]: {
                        [sequelize.Op.or]: {
                            [sequelize.Op.and]: {
                                ...(activeStart && {
                                    start_date: {
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
                                start_date: {
                                    [sequelize.Op.gt]: activeStart,
                                },
                            }),
                        },
                        ...(activeEnd && {
                            start_date: {
                                [sequelize.Op.lte]: activeEnd,
                            },
                        }),
                    },
                },
                order: [
                    ["start_date", "ASC"],
                    ["matchId", "ASC"],
                ],
                raw: true,
            }).then((matches) => this.transformMatches(matches));
        } catch (error) {
            throw new InternalServerError({ message: error.message });
        }
    };
}

module.exports = MatchService;
