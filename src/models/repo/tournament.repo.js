"use strict";

const sequelize = require("sequelize");

const Tournament = require("#models/tournament.model");
const { InternalServerError } = require("#core/error.response");

class TournamentRepo {
    /**
     * Get all tournaments
     * @returns
     */
    static async getAll({ tournamentId }) {
        try {
            return await Tournament.findAll({
                order: ["tournamentId"],
                where: {
                    ...(tournamentId && {
                        tournamentId: {
                            [sequelize.Op.in]: tournamentId,
                        },
                    }),
                },
                raw: true,
            });
        } catch (_) {
            throw new InternalServerError();
        }
    }
}

module.exports = TournamentRepo;
