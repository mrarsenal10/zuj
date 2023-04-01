"use strict";

const { OK } = require("#core/success.response");
const MatchService = require("#services/match.service");

class MatchController {
    getMatches = async (req, res, next) => {
        new OK({
            metadata: await MatchService.getAll(req.query),
        }).send(res);
    };
}

module.exports = new MatchController();
