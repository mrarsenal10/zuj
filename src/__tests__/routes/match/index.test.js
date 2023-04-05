const request = require("supertest");
const app = require("../../../app");

describe("Matches API", () => {
    describe("Validating query", () => {
        it("Invalid limit", async () => {
            const res = await request(app)
                .get(`/v1/api/matches?limit=nan`)
                .send();

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty("code", 400);
            expect(res.body).toHaveProperty("status", "error");
            expect(res.body).toHaveProperty("message", "Bad Request");
            expect(res.body).toHaveProperty("errors");
        });

        it("Invalid offset", async () => {
            const res = await request(app)
                .get(`/v1/api/matches?offset=nan`)
                .send();

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty("code", 400);
            expect(res.body).toHaveProperty("status", "error");
            expect(res.body).toHaveProperty("message", "Bad Request");
            expect(res.body).toHaveProperty("errors");
        });

        it("Invalid active start", async () => {
            const res = await request(app)
                .get(`/v1/api/matches?activeStart=not_a_date`)
                .send();

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty("code", 400);
            expect(res.body).toHaveProperty("status", "error");
            expect(res.body).toHaveProperty("message", "Bad Request");
            expect(res.body).toHaveProperty("errors");
        });

        it("Invalid active end", async () => {
            const res = await request(app)
                .get(`/v1/api/matches?activeEnd=not_a_date`)
                .send();

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty("code", 400);
            expect(res.body).toHaveProperty("status", "error");
            expect(res.body).toHaveProperty("message", "Bad Request");
            expect(res.body).toHaveProperty("errors");
        });

        it("Valid limit", async () => {
            const res = await request(app)
                .get(`/v1/api/matches?limit=10`)
                .send();

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty("code", 200);
            expect(res.body).toHaveProperty("message", "Success");
            expect(res.body.metadata.length).toBeGreaterThan(0);
        });

        it("Valid offset", async () => {
            const res = await request(app)
                .get(`/v1/api/matches?offset=1`)
                .send();

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty("code", 200);
            expect(res.body).toHaveProperty("message", "Success");
            expect(res.body.metadata.length).toBeGreaterThan(0);
        });

        it("Valid active start", async () => {
            const res = await request(app)
                .get(`/v1/api/matches?activeStart=2023-01-01`)
                .send();

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty("code", 200);
            expect(res.body).toHaveProperty("message", "Success");
            expect(res.body.metadata.length).toBeGreaterThan(0);
        });

        it("Valid active end", async () => {
            const res = await request(app)
                .get(`/v1/api/matches?activeEnd=2023-12-31`)
                .send();

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty("code", 200);
            expect(res.body).toHaveProperty("message", "Success");
            expect(res.body.metadata.length).toBeGreaterThan(0);
        });

        it("Shoud return full of attributes with valid parameters", async () => {
            const res = await request(app)
                .get(
                    `/v1/api/matches?limit=10&offset=1&activeStart=2023-01-01&activeEnd=2023-12-31`
                )
                .send();

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty("code", 200);
            expect(res.body).toHaveProperty("message", "Success");
            expect(res.body.metadata.length).toBeGreaterThan(0);
            expect(res.body.metadata[0]).toHaveProperty(
                "start_date",
                "numMatches",
                "matches"
            );
            expect(res.body.metadata[0]["matches"][0]).toHaveProperty(
                "home_score",
                "away_score",
                "home_team",
                "away_team",
                "home_logo",
                "away_logo",
                "matchId",
                "start_date",
                "start_time",
                "status",
                "is_live"
            );
        });
    });
});
