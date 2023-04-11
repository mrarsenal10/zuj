const request = require("supertest");
const app = require("../app");

describe("App", () => {
    describe("Not found", () => {
        it("Should return not found", async () => {
            const res = await request(app)
                .get('/v1/api/not-found')
                .send();

            expect(res.statusCode).toEqual(404);
            expect(res.body).toHaveProperty("code", 404);
            expect(res.body).toHaveProperty("status", "error");
            expect(res.body).toHaveProperty("message", "Not Found");
        });
    })
})