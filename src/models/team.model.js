const sequelize = require("#dbs/mysql");
const Match = require("./match.model");
const { Sequelize } = sequelize;

const Team = sequelize.define(
    "Teams",
    {
        teamId: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.DataTypes.INTEGER,
        },
        name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = Team;
