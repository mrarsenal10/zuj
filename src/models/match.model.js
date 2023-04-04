const sequelize = require("#dbs/mysql");
const { Sequelize } = sequelize;

const Match_Score = require("./match_score.model");
const Team = require("./team.model");

const Match = sequelize.define(
    "Matches",
    {
        matchId: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.DataTypes.INTEGER,
        },
        homeId: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Team,
                key: "teamId",
            },
        },
        awayId: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Team,
                key: "teamId",
            },
        },
        start_date: {
            allowNull: false,
            type: Sequelize.DataTypes.DATEONLY,
        },
        start_time: {
            allowNull: false,
            type: Sequelize.DataTypes.TIME,
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
    foreignKey: 'awayId',
    targetKey: 'teamId',
    as: 'away'
})
Match.belongsTo(Team, {
    foreignKey: 'homeId',
    targetKey: 'teamId',
    as: 'home'
})

module.exports = Match;
