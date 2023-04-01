"use strict";

const express = require("express");
const router = express.Router();

// TODO adding api key, authentication here

router.use("/v1/api", require("./match"));
router.use("/v1/api", require("./calendar"));

module.exports = router;
