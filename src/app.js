"use strict";
require("dotenv").config();

const compression = require("compression");
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");

const app = express();

app.use(morgan("dev")); // TODO
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

module.exports = app;
