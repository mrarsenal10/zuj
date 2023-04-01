const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const definition = {
    info: {
        // API information (required)
        title: "Wayfarer", // Title (required)
        version: "1.0.0", // Version (required)
    },
    // securityDefinitions: {
    //     bearerAuth: {
    //         type: "apiKey",
    //         name: "Authorization",
    //         scheme: "bearer",
    //         in: "header",
    //     },
    // },
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
