"use strict";

const { OK } = require("#core/success.response");
const MatchService = require("#services/match.service");

class MatchController {
    /**
     * Get matches with teams and score
     * @param {Object} req
     * @param {Object} res
     */
    getMatches = async (req, res) => {
        new OK({
            metadata: await MatchService.getAll(req.query),
        }).send(res);
    };
}

module.exports = new MatchController();
