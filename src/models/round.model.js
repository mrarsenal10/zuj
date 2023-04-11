const sequelize = require("#dbs/mysql");
const { Sequelize } = sequelize;

const Match = require("./match.model");
const Tournament = require("./tournament.model");

const Round = sequelize.define(
    "Rounds",
    {
        roundId: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.DataTypes.INTEGER,
        },
        tournamentId: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
        },
        start_date: {
            allowNull: false,
            type: Sequelize.DataTypes.DATEONLY,
        },
        start_time: {
            allowNull: false,
            type: Sequelize.DataTypes.TIME,
        },
    },
    {
        timestamps: false,
    }
);

Round.belongsTo(Tournament, {
    foreignKey: "tournamentId",
    targetKey: "tournamentId",
    as: "tournament",
});

module.exports = Round;
