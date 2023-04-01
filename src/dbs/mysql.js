require("dotenv").config();

const Sequelize = require("sequelize");
const {
    db: { host, port, username, password, name },
} = require("../configs/config.mysqldb");

const self = module.exports;

let sequelize;

/**

   * Construct a singleton sequelize object to query the database

   *

   * @returns {object} - Sequelize object

   */

exports.initialize = () => {
    if (!sequelize) {
        return new Sequelize(name, username, password, {
            host,
            port,
            dialect: "mysql",
        });
    }

    return sequelize;
};

module.exports = self.initialize();
