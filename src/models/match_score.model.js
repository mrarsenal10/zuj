const sequelize = require("#dbs/mysql");
const { Sequelize } = sequelize;

const Match_Score = sequelize.define(
    "Matches_Scores",
    {
        match_scoreId: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        matchId: {
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
        home_score: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        away_score: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = Match_Score;
