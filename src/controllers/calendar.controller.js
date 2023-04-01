const { OK } = require("#core/success.response");
const MatchService = require("#services/match.service");

class CalendarController {
    countMatchesByDateRange = async (req, res, next) => {
        new OK({
            metadata: await MatchService.countMatchsByDateRange(req.query),
        }).send(res);
    };
}

module.exports = new CalendarController();
