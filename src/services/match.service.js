"use strict";

const MatchRepo = require("../models/repo/match.repo");
const TournamentRepo = require("../models/repo/tournament.repo");

class MatchService {
    /**
     * Group the matches by date
     * @param {string} id
     * @param {array} matches
     * @returns array
     */
    static groupMatchesByDate(id, matches) {
        let curDate = null;

        return matches.reduce((acc, { start_date, tournamentId, ...rest }) => {
            if (id !== tournamentId) {
                return acc;
            }

            const startDate = new Date(start_date).getTime();

            if (curDate === null || curDate !== startDate) {
                curDate = startDate;

                acc.push({
                    start_date,
                    numMatches: 0,
                    matches: [],
                });
            }
            acc[acc.length - 1]["numMatches"] += 1;
            acc[acc.length - 1].matches.push({ ...rest });

            return acc;
        }, []);
    }

    /**
     * Get matches that grouped by tournament
     * @param {array} matches
     * @returns array
     */
    static makeTournamentMatches(tournaments, matches) {
        return tournaments.map(
            ({
                tournamentId,
                name: tournament_name,
                logo: tournament_logo,
            }) => ({
                tournament_name,
                tournament_logo,
                round: this.groupMatchesByDate(tournamentId, matches),
            })
        );
    }

    /**
     * Get all matches using pagination
     * @param {Request.body} body
     * @returns
     */
    static getAll = async (body) => {
        const matches = await MatchRepo.getMatchesWithDetail(body);
        const tournaments = await TournamentRepo.getAll(body);

        return this.makeTournamentMatches(tournaments, matches);
    };

    /**
     * Count match by specified date range
     * @param {Request.body} body
     * @returns
     */
    static countMatch = async (body) => {
        return await MatchRepo.countMatchByDateRange(body);
    };
}

module.exports = MatchService;
