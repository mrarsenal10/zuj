"use strict";

const sequelize = require("sequelize");

const Match = require("#models/match.model");
const Match_Score = require("#models/match_score.model");
const Team = require("#models/team.model");
const { InternalServerError } = require("#core/error.response");

class MatchService {
    static transformMatches(matches) {
        let curDate = null;

        return matches.reduce((acc, { start_date, ...rest }) => {
            const startDate = new Date(start_date).getTime();

            if (curDate === null || curDate !== startDate) {
                curDate = startDate;

                acc.push({
                    start_date,
                    matches: [],
                });
            }

            acc[acc.length - 1].matches.push({ ...rest });

            return acc;
        }, []);
    }

    static getAll = async ({ limit = 10, offset = 1, date }) => {
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
                    matchId: {
                        [sequelize.Op.gte]: parseInt(offset),
                    },
                    ...(date && {
                        start_date: {
                            [sequelize.Op.gte]: date,
                        },
                    }),
                },
                order: [["start_date", "ASC"]],
                raw: true,
            }).then((matches) => this.transformMatches(matches));
        } catch (error) {
            throw new InternalServerError({ message: error.message });
        }
    };

    static countMatchsByDateRange = async ({ activeStart, activeEnd }) => {
        try {
            const count = await Match.findAll({
                attributes: [
                    "start_date",
                    [
                        sequelize.fn("COUNT", sequelize.col("matchId")),
                        "numMatches",
                    ],
                ],
                where: {
                    start_date: {
                        [sequelize.Op.gte]: activeStart,
                        [sequelize.Op.lte]: activeEnd,
                    },
                },
                group: ["start_date"],
            });

            return count;
        } catch (error) {
            throw new InternalServerError({ message: error.message });
        }
    };
}

module.exports = MatchService;
