const sequelize = require("#dbs/mysql");
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
        logo: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = Team;
