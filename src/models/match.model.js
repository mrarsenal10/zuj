const sequelize = require("#dbs/mysql");
const { Sequelize } = sequelize;

const Match_Score = require("./match_score.model");
const Round = require("./round.model");
const Team = require("./team.model");

const Match = sequelize.define(
    "Matches",
    {
        matchId: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.DataTypes.INTEGER,
        },
        roundId: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
        },
        homeId: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
        },
        awayId: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            allowNull: true,
            type: Sequelize.DataTypes.ENUM,
            values: ["full_time", "half_time"],
        },
        is_live: {
            allowNull: false,
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        timestamps: false,
    }
);

Match.hasOne(Match_Score, {
    foreignKey: "matchId",
    targetKey: "matchId",
});
Match.belongsTo(Team, {
    foreignKey: "awayId",
    targetKey: "teamId",
    as: "away",
});
Match.belongsTo(Team, {
    foreignKey: "homeId",
    targetKey: "teamId",
    as: "home",
});
Match.belongsTo(Round, {
    foreignKey: "roundId",
    targetKey: "roundId",
    as: "round",
});

module.exports = Match;
