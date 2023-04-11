const sequelize = require("#dbs/mysql");
const { Sequelize } = sequelize;

const Tournament = sequelize.define(
    "Tournaments",
    {
        tournamentId: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.DataTypes.INTEGER,
        },
        name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        logo: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = Tournament;
