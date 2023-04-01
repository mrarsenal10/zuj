const app = require("./src/app");

const PORT = port || 3000;

const server = app.listen(PORT, () => {
    console.log(`Football start with ${PORT}`);
});

process.on("SIGINT", () => {
    server.close(() => {
        console.log("Footbal closed");
    });
});
