const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const definition = {
    info: {
        title: "Football livescore", // Title (required)
        version: "1.0.0", // Version (required)
    },
};

const options = {
    definition,
    apis: [
        "./src/routes/match/*.js",
        "./src/routes/calendar/*.js"
    ],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get("docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
}

module.exports = swaggerDocs;
